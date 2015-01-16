---
# layout: post
# title:  "配置WebStorm开发环境"
# permalink: post/manual/debug/webstorm.html
# type: manual
# element: manualdebug
# version: Egret引擎 v1.x
---

####前期准备

1. 准备 WebStorm 开发环境
2. 安装 egret
3. 执行 egret create HelloEgret ，创建一个名为 HelloEgret 的项目

>文本目前为草稿，只支持 MacOS WebStorm 8.0 环境，欢迎使用其他操作系统的开发者在开发者论坛中提出改进意见

####配置自动编译环境

1. 打开 WebStorm ， 选择 Open Dictionary ， 选择 HelloEgret 文件夹，打开该项目
2. 打开 菜单栏中的 WebStorm -> Preferences (MacOS) / Settings ( Windows ) ，在左侧菜单搜索输入框中输入 File Watchers，类型选择 custom
3. 在右侧出现的 FileWatchers 面板中点击 + 号，添加一个 FileWatcher
4. 在弹出的 New Watcher 面板中进行以下设置

---
    Name: Egret // 或者任意名称
    
    FileType: TypeScript files
    
    Program: {egret_global_path} // 这里的文件名指的是 `egret` 命令的绝对路径
    
    Arguments: build
    
    Working directory: $ProjectFileDir$   // 此名称可以复制粘贴，也可以通过 insert macro 按钮来添加
---

>**egret_global_path 在 windows 系统上一般是**

>`C:\Users\{username}\AppData\Roaming\npm\egret.cmd`

>**在MacOS系统上一般是**

>`/usr/local/bin/egret`

开发者可以通过 egret info 命令来获取egret 在npm上的安装路径。注意，安装路径并非可执行文件路径
当上述命令完成后，只要修改 TypeScript 文件，就会自动运行 egret build 命令，实现自动编译

####使用 WebStorm 调试 egret 项目

如果开发者不习惯使用 Chrome 浏览器进行调试，而是更希望在 IDE 里直接调试，可以遵循如下步骤进行设置

* 右键单击 launcher/index.html
* 单击 Debug "index.html"
* 如果是首次打开，会进入配置界面，默认设置即可
* 在弹出Chrome 浏览器后会提示安装一个 WebStorm 调试插件，遵循 WebStorm 向导在 Chrome Web Store 上安装即可
* 此时 WebStorm 就会接管 Chrome 的调试环境。但是此时调试的是 JavaScript 代码，无法进行 TypeScript断点调试
* 修改上述教程的 FileWatcher ，将参数修改为 build -sourcemap ，这样的话会在 bin-debug文件夹中生成 .js.map 文件。
* 映射文件生成之后，就可以在 WebStorm里直接对 TypeScript 代码进行断点调试了

>由于众所周知的原因，请调整好您的网络环境，再进行 WebStorm 插件的安装。此问题 Egret 官方团队会想办法解决。
