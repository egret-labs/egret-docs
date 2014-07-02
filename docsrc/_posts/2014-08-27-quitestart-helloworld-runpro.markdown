---
layout: post
title:  "运行项目"
permalink: post/quitestart/helloworld/runpro.html
type: quitestart
element: quitestarthelloworld
version: Egret引擎 v1.x
---

这是一个令人兴奋的小结，因为在这个小结中你终于能够看到你的第一个Demo的运行效果。

运行Egret项目，我们需要一个已运行的HTTP服务器。在前面安装Egret的教程中，我们已经为大家推荐了一款HTTP服务器。现在我们来看一下如何使用我们egret提供的最简单的HTTP服务器来运行我们的项目。

和前面的教程一样，我们首相在终端中定位我们的项目，使用`cd`命令。

然后我们执行一个简单的额命令来启动Egret的HTTP服务器，命令如下：

`egret startserver HelloWorld`

当命令运行后，你会看到如图中的效果。

![Egret Run Pro]({{site.baseurl}}/assets/img/egrethelloworld1.png)

随后，egret工具会呼出你的浏览器，这里以Chrome为例。egret工具会自动启动Chrome，同时打开指定的网页，默认网页为**http://localhost:3000/HelloWorld/launcher/index.html**

此时你会在Chrome中看到一个带有简单动画的Hello World效果，效果如下图：

![Egret Run Pro]({{site.baseurl}}/assets/img/egrethelloworld2.png)

这里我们简单对服务器地址进行以下是说明，默认提供的服务器地址为`http://localhost:3000/HelloWorld/launcher/index.html`。那么egret为我们启动的HTTP服务器访问地址为`http://localhost:3000/`，其中`http://localhost`为本地访问地址，`3000`为我们使用的[端口号](http://zh.wikipedia.org/wiki/TCP/UDP%E7%AB%AF%E5%8F%A3%E5%88%97%E8%A1%A8)，egret默认使用的端口号为“**3000**”。请确保在启动服务器之前，3000端口为未使用状态。

如果你安装了其他HTTP工具，那么现在你可以将其打开运行，同时将你的文件拷贝到对应目录中进行访问即可。
#相关HTTP服务器操作，未完待续