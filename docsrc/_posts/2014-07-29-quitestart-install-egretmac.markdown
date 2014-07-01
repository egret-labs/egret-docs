---
layout: post
title:  "Mac OS X 系统下安装"
permalink: post/quitestart/install/instalformac.html
type: quitestart
element: quitestartinstall
version: Egret引擎 v1.x
---

##概述

Egret基于[TypeScript](http://www.typescriptlang.org/)开发的，而TypeScript编译工具tsc是基于[Node.js](http://nodejs.org/)开发的。所以在安装过程中，我们先需要对于基础支持工具进行安装。
在安装过程中，我们会以此安装如下软件

1. Node.js
2. TypeScript
3. TypeScript代码编辑器
4. HTTP服务器（可选）
5. Chrome（可选）
6. Egret

这篇文档中，我们主要介绍在Mac环境中安装Egret。其安装步骤如下。

###1.安装Node.js
---

####1.1下载Node.js
Node.js的安装方法非常简单，我们可以访问[Node.js官网](http://nodejs.org/)如图，然后进点击页面中的**INSTALL**按钮，可直接下载Node.js的pkg安装文件包。
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

安装完成界面，你的Node.js被安装到 `/usr/local/bin/node`目录下，同时该安装包还会为你安装[npm](http://zh.wikipedia.org/wiki/Npm)工具。

####1.3验证Node.js

安装完成后，请启动你的**终端**，输入`node -v`命令，来查看你当前的Node.js版本，同时验证你的Nodejs是否安装成功。如果安装正确，则应出现效果如下图。

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall9.png)

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall10.png)

如果出现`node: command not found`则表示安装失败，可以参考下面的[Node.js安装失败解决方案](#installError)或者在我们的[开发者社区](http://bbs.egret-labs.org/forum.php)中求助。

####1.4验证npm
在终端中执行`npm`，出现如下图内容，标明你的npm安装正确。

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall11.png)

如果出现`npm: command not found`则表示安装失败，可以参考下面的[Node.js安装失败解决方案](#installError)或者在我们的[开发者社区](http://bbs.egret-labs.org/forum.php)中求助。

<a name="installError" id="installError"></a>
####1.5Node.js安装失败解决方案
* 部分MacOS 安装nodejs的pkg安装包时会显示安装失败，可以通过下载nodejs源代码手动编译解决。
* 部分Windows安装完成后直接在cmd里输入node和npm，可能会提示找不到该命令。是由于新增的Path路径需要重启才能生效。重启或使用node和npm的绝对路径来运行命令即可。



###2.安装TypeScript
---

####2.1安装TypeScript
当 node.js安装成功后，`node` 和 `npm` 命令就可以使用了。TypeScript的安装可视直接使用`npm`命令直接安装。详细的安装方法可以参考[TypeScript官网](http://www.typescriptlang.org/)。

在终端中输入如下命令：`npm install -g typescript`
>`npm install`命令的作用是在开发者的系统中安装指定的Node.js库，TypeScript是库的名称，`-g`代表将这个库安装到全局路径

**MacOS用户如果安装失败，请使用 `sudo npm install -g typescript` 命令确保权限**

>如果由于网络问题导致的安装速度很慢，请使用 `npm install -g typescript --registry=http://r.cnpmjs.org` 命令，访问国内镜像版进行安装。

####2.2验证TypeScript

安装成功后，执行 `tsc` 命令，您应该看见如下界面

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall12.png)

###3.安装TypeScript代码编辑器
---

####3.1选择一个合适的代码编辑器

Egret可以使用任何支持脚本语言的代码编辑器，包括：

* WebStorm [官方下载地址](http://www.jetbrains.com/webstorm/) 【官方推荐】
* Microsoft Visual Studio 2012 + TypeScript插件
* Sublime Text + TypeScript插件

>详细的编辑器安装方法以及插件配置方法，可参考文档中工具相关章节。

###4.安装一个HTTP服务器
---
#####4.1选择一个合适的HTTP服务器
MacOS用户可以使用系统自带的服务器，Windows用户推荐采用[XMAPP](https://www.apachefriends.org/download.html)

用户也可以跳过这个步骤，使用Egret内置的基于Node.js的简单HTTP服务器。但为了保证更好的开发体验，Egret建议用户安装上述较为成熟的HTTP服务器

>具体服务器软件安装，大家可以参考文档中工具相关章节。


###5.安装Chrome浏览器
---

Egret可以运行在绝大多数的现代浏览器上，但是 Egret 目前推荐开发者使用 Chrome 作为主要的开发和调试环境。

* 打开Chrome浏览器
* 设置->工具->JavaScript控制台
* 在JavaScript控制台（右下角）设置（齿轮图标）-> 常用 -> 禁用浏览器缓存

**当进行好上述设置之后，只要JavaScript控制台处于打开状态，就不会有浏览器缓存，方便调试。**

###6.下载并安装 Egret
---
####6.1从官网中下载Egret

Egret提供两个下载渠道，一个是[Egret官方下载](http://www.egret-labs.org/download/index.html)，另外一个是[Egret Github下载](https://github.com/egret-labs/egret-core)。

我们推荐大家从官方网站中下载，这里的版本是当前稳定版本。如果你从github中下载引擎的开发版本，该版本非稳定版，你可能在实际开发中遇到许多问题，这些问题通常不会在稳定版中出现。

我们打开[官方下载页面](http://www.egret-labs.org/download/index.html)，找到“**Egret引擎**”产品项目，点击蓝色的下载按钮，下载最新版Egret引擎，如图。

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall13.png)

####6.2安装Egret

将下载后的Egret引擎压缩包解压到指定目录，该目录可以为任意磁盘中目录。在**终端**中敲入命令进入解压后的目录。

`cd ${egret_folder}`

其中`${egret_folder}`为Egret引擎解压的路径。

进入该目录后，我们执行安装命令。

`npm install -g`

>如果安装命令错误，请检查如下三项，查看是否正确。
1. `cd ${egret_folder}`命令中的路径是否正确。
2. 当前目录是否是 Egret目录（该目录下存在一个名为 `package.json` 的文件）
3. 系统当前用户是否有管理员权限,如果不是管理员权限，请执行`sudo su`命令。

####6.3Egret工具验证
---

安装完成后，我们执行`egret`命令，来查看当前Egret是否安装成功。如安装成功，应出现如下图所示。

![Nodejs install]({{site.baseurl}}/assets/img/nodejsinstall14.png)

如果安装失败，请在我们的[开发者社区](http://bbs.egret-labs.org/forum.php)中寻求帮助。

