---
layout: post
title:  "运行项目"
permalink: post/quitestart/helloworld/runpro.html
type: quitestart
element: quitestarthelloworld
version: Egret引擎 v1.x
---

这是一个令人兴奋的小结，因为在这个小结中你终于能够看到你的第一个Demo的运行效果。

###1.使用Egret工具运行游戏
运行Egret项目，我们需要一个已运行的HTTP服务器。在前面安装Egret的教程中，我们已经为大家推荐了一款HTTP服务器。现在我们来看一下如何使用我们egret提供的最简单的HTTP服务器来运行我们的项目。

和前面的教程一样，我们首相在终端中定位我们的项目，使用`cd`命令。

然后我们执行一个简单的命令来启动Egret的HTTP服务器，命令如下：

`egret startserver HelloWorld`

这个命令中`egret startserver`为启动egret内部服务器的命令，而后面的`HelloWorld`则是我们的项目名称。

当命令运行后，你会看到如图中的效果。

![Egret Run Pro]({{site.baseurl}}/assets/img/egrethelloworld1.png)

随后，egret工具会启动你的浏览器，启动的浏览器为当前操作系统的默认浏览器。egret工具启动Chrome后，会打开指定的网页，默认网页为**http://localhost:3000/HelloWorld/launcher/index.html**

此时你会在Chrome中看到一个带有简单动画的Hello World效果，效果如下图：

![Egret Run Pro]({{site.baseurl}}/assets/img/egrethelloworld2.png)

这里我们简单对服务器地址进行以下是说明，默认提供的服务器地址为`http://localhost:3000/HelloWorld/launcher/index.html`。egret为我们启动的HTTP服务器访问地址为`http://localhost:3000/`，其中`http://localhost`为本机访问地址，`3000`为我们使用的<a href="http://zh.wikipedia.org/wiki/TCP/UDP%E7%AB%AF%E5%8F%A3%E5%88%97%E8%A1%A8" target="_blank">端口号</a>，egret默认使用的端口号为“**3000**”。请确保在启动服务器之前，3000端口为未使用状态。

**如果您想关闭当前服务器，可以使用`Control + c`快捷键退出。**

###2.使用第三方HTTP服务器工具运行游戏
如果你安装了其他HTTP工具，那么现在你可以将其打开并运行

将游戏项目中的`bin-debug`、`launcher`、`resources`文件夹拷贝到HTTP服务器的根目录或同级目录下。访问你的服务器地址即可运行游戏。

访问地址规则为 `http://你的服务器地址/launcher/index.html`