---
layout: post
title:  "发布项目"
permalink: post/quitestart/helloworld/pushpro.html
type: quitestart
element: quitestarthelloworld
version: Egret引擎 v1.x
---

当我们制作完成一个项目后，我们需要把项目发布为正式版本，并放到网上提供给玩家。那么在egret中简单的使用`build`命令并非打包最终的正式版文件。你还需要进行最终的发布操作。在Egret中，使用发布功能也非常的简单。你只需要使用如下命令即可：

`egret publish HelloWorld`

此命令中`egret publish`为发布命令，`HelloWorld`是你当前项目的名称。

执行此命令后，egret会启动发布打包工作。此时的发布过程可能相对`build`功能耗时更长。因为Egret工具会对你的游戏代码做最终的发布工作，这个工作是非常严格的编译过程。其中的过程非常的复杂。我们只需要了解它的作用即可。

使用Egret的发布功能还需要安装Java7。你应该安装Java7或者更高版本来支持你的发布功能。

**执行发布功能后，Egret会对你的源码进行加密混淆，并且将所有的js代码全部放到 `game-min.js` 文件中，并且文件中的内容经过混淆与压缩。
这样你便可以将项目中的 `launcher` 文件夹和 `resource` 文件夹上传到你的服务器中，访问对应的网址即可打开游戏。**

**最终的游戏访问地址为 `launcher` 目录下的 `release.html` 文件。**