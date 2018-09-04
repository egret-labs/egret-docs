## 使用示例项目

学习EUI扩展库的第一步，就是运行示例项目，在 github 的 egret-examples 项目下有一个[EUIExamples](https://github.com/egret-labs/egret-examples/tree/rc/v2.5/EUIExample)项目。将示例项目克隆到本地，然后您在命令行进入相应的目录，执行 
```
egret build -e
``` 
然后执行
```
egret run
``` 
查看该项目的运行效果。或者直接在这个项目基础上开始修改学习。

另外，可以访问我们的 [在线API文档](http://developer.egret.com/cn/apidoc/)，查看eui扩展库每个类页面下方的示例，这些示例覆盖到了每个类的常见用法。

>可以使用 `egret run` 来查看项目运行效果。 

## 创建一个新的eui项目

在Egret命令行中，为您准备好了包含eui扩展库的项目模板，您只需要按照以下步骤，创建一个标准的eui项目，在模板项目基础上开始编写自己的代码即可。

首先打开命令行，进入工作目录，执行 `egret create HelloEUI --type eui`, Egret 会创建一个 HelloEUI 目录作为项目的根目录 ( 如果您想要在当前目录创建项目，可以直接执行 `Egret create --type eui` )。

执行`egret run HelloEUI`

命令行工具会自动打开一个浏览器窗口，如下图：

![](5600f2bad03a3.png)


接下来您只需删除模板项目 `Main.ts` 里创建按钮的那部分代码，即可开始编写一个全新的项目。模板项目中已经自带了一套默认的皮肤主题。
