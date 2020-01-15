# 使用 AssetsManager 灵活定制微信小游戏的缓存策略


---


# 背景知识

微信小游戏分为“游戏包”和“本地缓存”两个存储空间，当开发者将微信小游戏在微信开发者工具中发布时，微信开发者工具会将所有微信工程中的源码和资源进行压缩打包，既“游戏包”，该包体积不能超过4M。

高于4M的资源需要通过服务器进行动态下载，白鹭引擎之前已经提供了动态加载机制，将游戏资源放置在一个外部CDN服务器上。但是之前并没有提供文件缓存功能，所以每一次访问时，用户均会重复从网络下载文件，而不是从本地缓存加载。


微信小游戏提供了一套本地文件缓存接口，允许每个游戏最多 50M 资源在本地进行缓存。白鹭引擎在最新的 5.2 稳定版本中已经对此进行了适配，本文将为您讲解如何利用微信小游戏的缓存策略改善游戏的加载体验

# 准备工作

在使用这套机制之前，您需要确保以下几点：

* 您的项目使用的资源管理机制是 AssetsManager
* 您的项目的白鹭引擎版本大于等于 5.1.11，稳妥起见使用 5.2 为佳，更早版本的引擎存在一个BUG,纹理集图片的资源无法本地缓存。


# 步骤一：设置资源为外部读取

在进行缓存之前，您需要将您的游戏资源设置为从外部加载，而非从游戏包加载，如果您之前已经做完了这一步，可以忽略这个步骤。

* 修改您的 **script/config.wxgame.ts** 文件，在发布过程中添加 ResSplitPlugin 插件:

    ~~~javascript
     commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    new UglifyPlugin([{
                        sources: ["main.js"],
                        target: "main.min.js"
                    },{
                        sources: ["resource/default.thm.js"],
                        target: "default.thm.min.js"
                    }
                    ]),
                    new ResSplitPlugin({
                        matchers:[
                            {from:"resource/**",to:`../${projectName}_wxgame_remote`}
                        ]
                    }),
                    new ManifestPlugin({ output: 'manifest.js' })
    ~~~
    该插件的用意是，在您执行 egret publish 时，将 resource 文件夹的所有内容发布到 projectname_wxgame_remote 文件夹，而非 projectname_wxgame 文件夹中，这样游戏资源就不会被打包进微信项目。
* 修改您的**Main.ts**中的配置加载代码，修改为 **RES.loadConfig("default.res.json","http://localhost:8080/resource/");**
* 执行 **egret publish --target wxgame**，游戏的代码会发布到projectname_wxgame 文件夹，游戏资源会发布到 projectname_wxgame_remote 文件夹，发布之后在projectname_wxgame_remote 架设一台端口为 8080 的本地服务器。


这一步完成之后，您的项目就已经支持资源从外部读取。

# 步骤二：启动微信小游戏缓存

* 使用 EgretLauncher 重新发布一次微信小游戏，当您看到白鹭引擎的微信小游戏支持库已经升级至 1.1.0 时表示已经成功。
* 需要注意的是，由于本升级步骤会覆盖您微信项目的代码，请提前注意备份
* 如果您已经升级到 1.1.0 的微信小游戏支持库，会发现和之前相比多了一个名为library 的文件夹，其中包含 image.js 、 text.js 、 file-util.js 等几个文件，以及 game.js 中引用了这几个文件。
* 此时您加载的所有远程资源都会缓存至本地，第二次访问时会从本地加载，而非服务器加载

这一步完成之后，您已经初步完成了对缓存的支持，但是后续还有一些工作需要处理

# 步骤三：处理资源更新

* 由于游戏资源可能升级导致本地版本与服务器版本不一致，您需要处理资源升级的情况，您可以参考 image.js 和 text.js 中提供的 fileutil.fs.remove() 方法，当该方法被执行后，本地缓存目录就会清理。
* 您可以利用微信小游戏的 updateManager 回调函数，在版本更新时删除所有的微信小游戏缓存。
* 从更严格的角度来讲，应该设计一套更智能的，基于热更新版本 hash 的机制，但是由于一些技术实现上的细节问题，我们会和微信团队一起配合，在未来提供更简单的调用方式。


# 步骤四：处理超过50M的情况

部分游戏的资源可能大于 50M，您可以自由修改 image.js 和 text.js 中的 needCache 函数，编写自己的逻辑，将特定资源不存储于本地



# 总结

通过上述步骤，您就可以解决微信小游戏的本地缓存问题。从整个过程来看，引擎团队的核心设计思路在于：

* 考虑到不同开发团队有不同的定制需求和工作流，引擎不会将资源缓存这个功能直接写死在引擎代码中，而是放置于用户代码中
* 引擎会提供一个整体的资源加载框架，引擎的上层只关心加载资源的流程，不关心具体的加载细节（譬如是从网络加载还是先检查本地缓存），这些细节可以由开发者根据自己的需求自由扩展。












