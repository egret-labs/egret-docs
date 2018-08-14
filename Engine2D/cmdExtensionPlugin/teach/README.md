# 插件使用案例教程

## 引言

本文不详细介绍各插件的细节，只展示使用方法，如果开发者对细节有兴趣可以参考 [API 文档](http://developer.egret.com/cn/github/egret-docs/Engine2D/cmdExtensionPlugin/api/index.html)。

为了让开发者以更简单的使用Egret内置的插件，我们将通过一个案例来展示插件的具体使用方法和注意事项。**本文基于引擎5.2.7，低于该版本的引擎可能部分功能无效**

本文案例从一个刚编写完成的[eui卡牌项目](http://bbs.egret.com/thread-50009-1-1.html)开始发布到微信小游戏，为了让代码包的**体积更小**，**更好管理**，逐步添加使用不同的插件，以实现不同的需求。[源文件下载地址](http://tool.egret-labs.org/DocZip/engine/plugin-egret-eui-demo2.zip)
### todos

* 使用UglifyPlugin将代码混淆压缩
* 使用ResSplitPlugin把部分资源分离出去
* 使用ZipPlugin把文件压缩成zip格式
* 使用TextureMergerPlugin将纹理合并，且用ConvertResConfigFilePlugin修改res.json配置文件



## 项目初始化

1. 把index.html中的`data-scale-mode`改成`fixedWidth`
2. 打开EgretLauncher，将本项目发布成微信小游戏
3. 打开微信开发者工具



## 使用UglifyPlugin压缩代码

在微信开发者工具可以看到，js文件夹中5个库文件和一个`main.js`。

现在需求是是要把库文件压缩到一个文件`lib.min.js`中。

回到EgretWing，编辑sctipts下的config.wxgame.ts：

```typescript
//***其他代码***
//

if (command == 'build') {
    return {
        outputDir,
        commands: [
            // 清理js，resource文件夹
            new CleanPlugin({ matchers: ["js", "resource"] }),
            new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
            new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
            new WxgamePlugin(),

            //  压缩插件
            new UglifyPlugin([
                {	
                    // 需要被压缩的文件
                    sources: [
                        "libs/modules/egret/egret.js",
                        "libs/modules/eui/eui.js",
                        "libs/modules/assetsmanager/assetsmanager.js",
                        "libs/modules/tween/tween.js",
                    ],
                    // 压缩后的文件
                    target: "lib.min.js"
                }
            ]),

            new ManifestPlugin({ output: 'manifest.js' })
        ]
    }
    }

//
// ***其他代码***
```

保存后在终端执行：

```shell
egret build
```

可以在微信开发者工具看到发布后的代码，js文件夹内的库文件已经被压缩到lib.min.js。

但是报错，找不到eui，这是因为自动生成的`manifest.js`里面对js的引用顺序出错，需要优先引用lib.min.js

打开根目录下的`manifest.js`， 修改一下引用顺序。

```javascript
require("js/lib.min.js")
require("js/main.js")
require("js/default.thm.js")
```

每次编译的时候`manifest.js`都会被重新生成，所以我们使用一个自定义脚本来修改他们的顺序

打开 scripts下的myPlugin.ts :

```typescript
/**
 * 示例自定义插件，您可以查阅 http://developer.egret.com/cn/2d/projectConfig/cmdExtensionPluginin/ 
 * 了解如何开发一个自定义插件
 */
export class CustomPlugin implements plugins.Command {
    private buffer
    constructor() {
    }

    async onFile(file: plugins.File) {
        // 保存manifest.js文件的内容
        if(file.basename.indexOf('manifest.js') > -1) {
            this.buffer = file.contents
        }
        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {
        // 把'lib.min.js'移到第一位
        
        if (this.buffer) {
            let contents: string = this.buffer.toString()
            let arr = contents.split('\n')
            let lib
            arr.forEach((item, index) => {
                if (item.indexOf('lib.min.js') > -1) {
                    lib = item
                    arr.splice(index, 1)
                }
            })
            if (lib != null) {
                arr.unshift(lib)
            }

            let newCont = arr.join('\n')
            commandContext.createFile('manifest.js', new Buffer(newCont))
        }
    }
}
```

这个文件就是用来自定义插件的，在config.wxgame.ts中已经默认引用，所以只需要调用即可，注意调用顺序

```typescript
new ManifestPlugin({ output: 'manifest.js' }),
// 在manifest.js生成之后调用
new CustomPlugin()
```





## 使用ResSplitPlugin分离资源文件

因为微信对代码包的大小是有限制的，总大小不能超过4M（使用分包功能可以提升到8M），所以我们需要通过ResSplitPlugin把某些游戏资源文件分离出去，将游戏资源放置在一个外部CDN服务器上，需要的时候动态加载即可。

编辑config.wxgame.ts：

```javascript
// ***其他代码***
//

new ResSplitPlugin({
    verbose: false, matchers:
    [
        // from 使用glob表达式来匹配文件，  projectName就是项目的名字
        { from: "resource/art/about/**.**", to: `${projectName}_wxgame_remote` },
        { from: "resource/art/heros_goods/**.**", to: `${projectName}_wxgame_remote` }
    ]
})

// ***其他代码***
```

保存后在终端执行：

```shell
egret build
```

微信开发者工具中resource > art 下的`about`和`heros_goods`已经不在了。

被分离出去的在 Egret 项目根目录中 `egret-eui-demo_wxgame_remote` 文件夹内。



* *注意 1：* 需要开发者自己写逻辑，判断一下如果是微信游戏时，哪些资源是从远程加载的，哪些是放在本地的
* *注意 2：* 为了便于调试，我们把资源放在了 Egret 项目根目录中 `egret-eui-demo_wxgame_remote` 文件夹内，正式发布的一般放在 CDN 上



## 使用ZipPlugin把文件压缩成zip格式

为了减少加载次数和传输量，我们可以把文件压缩成zip格式，使用的时候可以使用第三方库JSZip来读取使用zip文件。

使用ZipPlugin插件之前，需要安装cross-zip 和 cross-zip-cli ， 在终端中输入：

```shell
//全局安装
npm install cross-zip -g   
npm install cross-zip-cli -g
```
安装完成之后，在config.wxgame.ts添加代码：

```typescript
new ZipPlugin({
    mergeSelector: p => {
        // 如果文件是assets/路径下的， 压缩到assets.zip
        if (p.indexOf("assets/") >= 0) {
            return "assets.zip"
        }
    }
})
```

项目中其实assets里面的资源都是没有用到的，这里我们用它来演示压缩插件的使用。

保存后在终端执行：

```shell
egret build
```

执行之后可以在微信开发者工具看到，resource目录下原来的assets文件夹已经被压缩成了assets.zip。



## 使用TextureMergerPlugin，ConvertResConfigFilePlugin合并纹理集

项目中使用的图片资源都是单独的png文件，在加载的时候每张图片都会单独请求。我们可以通过合并纹理集的方式把这些图片合成一张图，以减少请求数量。
使用插件之前，我们需要有纹理集的配置文件`tmpropject`， 可以用两种方式生成：

1. 安装[TextureMerger工具](https://egret.com/downloads/texture.html)
2. 执行脚本生成

这里使用第二种方法，使用脚本autoMerger.js：

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var resjsons = ["resource/default.res.json"]; //要扫描的res.json文件
var targetDir = "resource/TextureMerger"; //输出目录
var pathNor = path.relative(targetDir, "resource"); //返回一个相对路径
var tempindex = 0;
//创建输出文件夹
if (resjsons.length > 0) {
    if (!fs.existsSync(targetDir)) {

        // var paths = path.normalize(targetDir).split("\\");   //windows 下使用
        var paths = path.normalize(targetDir).split("\/");   //mac linux 下使用

        var target = ".";
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var p = paths_1[_i];

            // target += ("\\" + p);  // windows 下使用
            target += ("\/" + p);  // mac linux 下使用

            if (!fs.existsSync(target))
                // 根据路径创建文件夹
                fs.mkdirSync(target);
        }
    }
}
var _loop_1 = function (resJson) {
    // 判断是否是res.json文件
    if (fs.existsSync(resJson) && resJson.indexOf("res.json") > -1) {
        var defaultJson = fs.readFileSync(resJson, "utf-8");
        // 解析res.json文件内容
        var defaultObject = JSON.parse(defaultJson);
        var groups = defaultObject.groups; //组
        var resources = defaultObject.resources; //资源
        var resourcesHash_1 = {}; // 用来存放resources的资源信息

        // 遍历resources
        for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
            var resource = resources_1[_i];
            resourcesHash_1[resource.name] = resource.url;
        }

        // 遍历groups
        for (var _a = 0, groups_1 = groups; _a < groups_1.length; _a++) {
            var group = groups_1[_a];
            var tmproject = {}; //用来存放tmproject文件的信息
            // tmproject文件配置
            tmproject["options"] = {
                "layoutMath": "2",
                "sizeMode": "2n",
                "useExtension": 1,
                "layoutGap": 1,
                "extend": 0
            };
            // projectName
            tmproject["projectName"] = group.name + "_" + tempindex; 
            // 版本
            tmproject["version"] = 5;
            tempindex++;

            // 获取res.json分组的keys, 并分割成数组
            var oldkeys = group.keys.split(","); 
            var oldkeysHash = {};
            // 遍历oldkeys
            for (var _b = 0, oldkeys_1 = oldkeys; _b < oldkeys_1.length; _b++) {
                var key = oldkeys_1[_b];
                // 保存到oldkeysHash对象中
                oldkeysHash[key] = true;
            }

            var newKeys = [];
            // 遍历oldkeys
            for (var _c = 0, oldkeys_2 = oldkeys; _c < oldkeys_2.length; _c++) {
                var key = oldkeys_2[_c];
                if (key.indexOf("json") == -1) {
                    if (!oldkeysHash[key.replace("png", "json")]) { //粒子和龙骨对应的图集不合图
                        if (!oldkeysHash[key.replace("png", "fnt")]) //位图字体
                            newKeys.push(key);
                    }
                    else if (key.indexOf("jpg") > -1) {
                        newKeys.push(key);
                    }
                }
            }
            oldkeysHash = {};
            oldkeys = [];
            // files路径
            var urls = newKeys.map(function (key) {
                return path.join(pathNor, resourcesHash_1[key]);
            });
            tmproject["files"] = urls;
            // 根据tmproject写入文件
            if (urls.length > 0) {
                fs.writeFileSync(path.join(targetDir, tmproject["projectName"] + ".tmproject"), JSON.stringify(tmproject));
            }
            tmproject = {};
        }
    }
};
//根据数组开始扫描
for (var _a = 0, resjsons_1 = resjsons; _a < resjsons_1.length; _a++) {
    var resJson = resjsons_1[_a];
    _loop_1(resJson);
}


```

把这个脚本放在scripts文件夹内，这个脚本是根据项目的`default.res.json`文件的内容来生成`tmpropject`文件

在终端中执行：

```shell
node scripts/autoMerger.js
```
执行成功之后可以在resource文件夹中看到多出了一个TextureMerger文件夹，里面就是根据`default.res.json`分组生成的`tmpropject`文件。

现在只需要执行TextureMergerPlugin插件就可以自动合并，这里需要注意TextureMergerPlugin依赖 TextureMerger 1.7 以上的版本，如果不符合请自行安装，并且在运行时TextureMerger需要处于关闭状态。

```typescript
new TextureMergerPlugin({textureMergerRoot:[ 'resource']})
```

保存后在终端执行：

```shell
egret build
```

执行完成后，在微信开发者工具可以看到，resource > TextureMerger 内新增了三个png文件，就是合并之后的纹理集。游戏运行的时候只需要加载这三个纹理集就可以，无需加载那些单独的png文件但是需要去res.json里面配置，把单独的资源引用都删除，加上纹理集的引用。

这些操作当然不需要手动去完成，现在只需要使用ConvertResConfigFilePlugin插件就可以实现这个功能。

编辑config.wxgame.ts：

```typescript
new TextureMergerPlugin({textureMergerRoot:[ 'resource']})

new ConvertResConfigFilePlugin({
    resourceConfigFiles: [{ filename: "resource/default.res.json", root: "resource/" }],
    nameSelector: (p) => {
         return path.basename(p).split(".").join("_")
    },
    TM_Verbose: true
})
```

保存后在终端执行：

```shell
egret build
```

在微信开发者工具中，打开调试器，在network面板可以看到加载的纹理集。

这里有个注意事项，在游戏中点击英雄按钮，切换到英雄场景时，会发现列表里面的图片加载不出来。

在network面板可以看到加载请求是单独的png文件，而不是纹理集。

这是因为列表中的图片地址是直接使用url。

```typescript
// 原始数组
let dataArr:any[] = [
    {image: 'resource/art/heros_goods/heros01.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
    {image: 'resource/art/heros_goods/heros02.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
    {image: 'resource/art/heros_goods/heros03.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: true},
    {image: 'resource/art/heros_goods/heros04.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
    {image: 'resource/art/heros_goods/heros05.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
    {image: 'resource/art/heros_goods/heros06.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false},
    {image: 'resource/art/heros_goods/heros07.png', name: '亚特伍德', value: '评价: 很特么厉害, 为所欲为', isSelected: false}
]
// 转成eui数据
let euiArr:eui.ArrayCollection = new eui.ArrayCollection(dataArr)
// 把list_hero数据源设置成euiArr
this.list_hero.dataProvider = euiArr
// 设置list_hero的项呈视器 (这里直接写类名,而不是写实例)
this.list_hero.itemRenderer = heroList_item
```

这种引用方式的图片，需要开发者手动在代码中修改，将图片地址修改成纹理集中的图片。



## 结语

本文通过使用UglifyPlugin，ResSplitPlugin，ZipPlugin，TextureMergerPlugin，ConvertResConfigFilePlugin插件，使项目发布到微信小程序之后的代码包体积减小，用户发起的请求数变少，且将代码混淆压缩。

使用Egret自带的插件，已经可以满足开发者的基本需求，如果有针对项目的特殊需求，可以选择[自定义插件](http://developer.egret.com/cn/github/egret-docs/Engine2D/cmdExtensionPlugin/plugin/index.html)。

