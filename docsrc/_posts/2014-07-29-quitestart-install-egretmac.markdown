---
layout: post
title:  "Mac OS X 系统下安装"
permalink: post/quitestart/install/instalformac.html
type: quitestart
element: quitestartinstall
version: Egret引擎 v1.x
---

##概述

Egret基于<a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>开发的，而TypeScript编译工具tsc是基于<a href="http://nodejs.org/" target="_blank">Node.js</a>开发的。所以在安装过程中，我们先需要对于基础支持工具进行安装。
需要安装的软件如下：

1. Node.js
2. TypeScript代码编辑器
3. HTTP服务器（可选）
4. Chrome（可选）
5. Egret
6. Java

这篇文档中，我们主要介绍在Mac环境中安装Egret。其安装步骤如下。

###1.安装Node.js
---

####1.1下载Node.js
Node.js的安装方法非常简单，我们可以访问<a href="http://nodejs.org/" target="_blank">Node.js官网</a>，然后进点击页面中的**INSTALL**按钮，可直接下载Node.js的pkg安装文件包。

![Nodejs]({{site.baseurl}}/assets/img/nodejswebsite.png)

>本教程撰写时，Node.js版本为0.10.29，如果你的版本高于此版本，我们会提供相关的版本兼容说明。如未提供任何版本兼容说明，则表示你的版本适用于Egret。

双击pkg安装包，我们开始安装Node.js。安装过程如图：

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall1.png)

下载后的Node.js安装包

####1.2安装Node.js
![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall2.png)

开始安装界面

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall3.png)

许可证授权说明

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall4.png)

同意许可证授权

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall5.png)

安装类型说明

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall6.png)

提供管理员权限，这里your name是你的管理员账户名，同时提供账户密码。

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall7.png)

安装过程

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall8.png)

安装完成界面，你的Node.js被安装到 `/usr/local/bin/node`目录下，同时该安装包还会为你安装<a href="http://zh.wikipedia.org/wiki/Npm" target="_blank">npm</a>工具。

####1.3验证Node.js

安装完成后，请启动你的**终端**，输入`node -v`命令，来查看你当前的Node.js版本，同时验证你的Nodejs是否安装成功。如果安装正确，则应出现效果如下图。

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall9.png)

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall10.png)

如果出现`node: command not found`则表示安装失败，可以参考下面的[Node.js安装失败解决方案](#installError)或者在我们的[<a href="http://bbs.egret-labs.org/" target="_blank">开发者社区</a>中求助。

####1.4验证npm
在终端中执行`npm`，出现如下图内容，标明你的npm安装正确。

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall11.png)

如果出现`npm: command not found`则表示安装失败，可以参考下面的[Node.js安装失败解决方案](#installError)或者在我们的<a href="http://bbs.egret-labs.org/" target="_blank">开发者社区</a>中求助。

<a name="installError" id="installError"></a>
####1.5Node.js安装失败解决方案
* 部分MacOS 安装nodejs的pkg安装包时会显示安装失败，可以通过下载nodejs源代码手动编译解决。


###2.安装TypeScript代码编辑器
---

####2.1选择一个合适的代码编辑器

Egret可以使用任何支持脚本语言的代码编辑器，包括：

* WebStorm <a href="http://www.jetbrains.com/webstorm/" target="_blank">官方下载地址</a> 【官方推荐】
* Microsoft Visual Studio 2012 + TypeScript插件
* Sublime Text + TypeScript插件

>详细的编辑器安装方法以及插件配置方法，可参考文档中工具相关章节。

###3.安装一个HTTP服务器
---
#####3.1选择一个合适的HTTP服务器
Mac用户可以使用系统自带的服务器，Mac用户推荐采用<a href="https://www.apachefriends.org/download.html" target="_blank">XMAPP</a>

用户也可以跳过这个步骤，使用Egret内置的基于Node.js的简单HTTP服务器。但为了保证更好的开发体验，Egret建议用户安装上述较为成熟的HTTP服务器

>具体服务器软件安装，大家可以参考文档中工具相关章节。


###4.安装Chrome浏览器
---

Egret可以运行在绝大多数的现代浏览器上，但是 Egret 目前推荐开发者使用 Chrome 作为主要的开发和调试环境。

* 打开Chrome浏览器
* 设置->工具->JavaScript控制台
* 在JavaScript控制台（右下角）设置（齿轮图标）-> 常用 -> 禁用浏览器缓存

**当进行好上述设置之后，只要JavaScript控制台处于打开状态，就不会有浏览器缓存，方便调试。**

###5.下载并安装 Egret
---
####5.1从官网中下载Egret

Egret提供两个下载渠道，一个是<a href="http://www.egret-labs.org/download/index.html" target="_blank">Egret官方下载</a>，另外一个是<a href="https://github.com/egret-labs/egret-core" target="_blank">Egret Github下载</a>。

我们推荐大家从官方网站中下载，这里的版本是当前稳定版本。如果你从github中下载引擎的开发版本，该版本非稳定版，你可能在实际开发中遇到许多问题，这些问题通常不会在稳定版中出现。

我们打开<a href="http://www.egret-labs.org/download/index.html" target="_blank">官方下载页面</a>，找到“**Egret引擎**”产品项目，点击蓝色的下载按钮，下载最新版Egret引擎，如图。

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall13.png)

####5.2安装Egret

将下载后的Egret引擎压缩包解压到指定目录，该目录可以为任意磁盘中目录。在**终端**中敲入命令进入解压后的目录。

`cd ${egret_folder}`

其中`${egret_folder}`为Egret引擎解压的路径。

进入该目录后，我们执行安装命令。

`npm install -g`

>如果安装命令错误，请检查如下三项，查看是否正确。

>1. `cd ${egret_folder}`命令中的路径是否正确。

>2. 当前目录是否是 Egret目录（该目录下存在一个名为 `package.json` 的文件）

>3. 系统当前用户是否有管理员权限,如果不是管理员权限，请执行`sudo su`命令。

####5.3Egret工具验证
---

安装完成后，我们执行`egret`命令，来查看当前Egret是否安装成功。如安装成功，应出现如下图所示。

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall14.png)

###6.Java
---

在Egret项目的发布阶段需要使用Java 7以上环境，在打包成为Android APP时也会使用到。以下为大家演示Java的下载与安装。

####6.1下载
a.<a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html" target="_blank">Java官网的JDK7下载地址</a>

![jdk7]({{site.baseurl}}/assets/img/java00-jdk7-download-html.png)

b.<a href="http://pan.baidu.com/s/1bnaSPjT#dir/path=%2Fandroid%20tools%2FJAVA" target="_blank">百度镜像</a>

####6.2 安装


a.确认一下，JAVA版本必须为7以上

![确认一下]({{site.baseurl}}/assets/img/java06-jdk7-ok.png)

b.双击挂载安装包

![双击挂载安装包]({{site.baseurl}}/assets/img/java01-jdk7-package.png)

![挂载中]({{site.baseurl}}/assets/img/java02-jdk7-mount.png)

c.双击图标进行安装

![双击图标进行安装]({{site.baseurl}}/assets/img/java03-jdk7-install.png)

d.一路Next

![一路Next]({{site.baseurl}}/assets/img/java04-jdk7-next.png)

e.注意授权

![注意授权]({{site.baseurl}}/assets/img/java05-jdk7-password.png)

f.确认一下

![确认一下]({{site.baseurl}}/assets/img/java06-jdk7-ok.png)

如果安装失败，请在我们的<a href="http://bbs.egret-labs.org/" target="_blank">开发者社区</a>中寻求帮助。
