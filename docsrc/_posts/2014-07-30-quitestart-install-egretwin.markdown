---
layout: post
title:  "Windows 系统下安装"
permalink: post/quitestart/install/installwin.html
categories: installegret
type: quitestart
element: quitestartinstall
version: Egret引擎 v1.x
---

##概述

Egret基于<a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>开发的，而TypeScript编译工具tsc是基于<a href="http://nodejs.org/" target="_blank">Node.js</a>
开发的。所以在安装过程中，我们先需要对于基础支持工具进行安装。
需要安装的软件如下：

1. Node.js
2. TypeScript代码编辑器
3. HTTP服务器（可选）
4. Chrome（可选）
5. Egret

这篇文档中，我们主要介绍在Windows环境中安装Egret。其安装步骤如下。

###1.安装Node.js
---

####1.1下载Node.js

Node.js的安装方法非常简单，我们可以访问
<a href="http://nodejs.org/" target="_blank">Node.js官网</a>，然后进点击页面中的**INSTALL**按钮，可直接下载Node.js的msi安装文件包。

![Nodejs]({{site.baseurl}}/assets/img/egretinstallwin1.png)

>本教程撰写时，Node.js版本为0.10.29，如果你的版本高于此版本，我们会提供相关的版本兼容说明。如未提供任何版本兼容说明，则表示你的版本适用于Egret。

双击msi安装包，我们开始安装Node.js。安装过程如图：

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin3.png)

下载后的Node.js安装包

####1.2安装Node.js
![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin7.png)

开始安装界面

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin8.png)

许可证授权说明

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin9.png)

选择安装目录，我们保持默认选项

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin10.png)

选择安装内容，我们将所有工具包全部安装

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin11.png)

确认安装，点击“Install”按钮

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin12.png)

安装过程

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin13.png)

安装完成界面，你的Node.js被安装到 `C:\Program Files\nodejs\`目录下，同时该安装包还会为你安装<a href="http://zh.wikipedia.org/wiki/Npm" target="_blank">npm</a>工具。

####1.3验证Node.js

安装完成后，请启动你的**命令行工具**，输入`node -v`命令，来查看你当前的Node.js版本，同时验证你的Nodejs是否安装成功。如果安装正确，则应出现效果如下图。

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin5.png)

在**开始**——>**搜索**中输入`cmd`即可运行命令行工具。

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin6.png)

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin14.png)

如果出现`node 不是内部或外部命令，也不是可运行的程序或批处理文件`则表示安装失败，可以参考下面的[Node.js安装失败解决方案](#installError)或者在我们的<a href="http://bbs.egret-labs.org/" target="_blank">开发者社区</a>中求助。

####1.4验证npm
在命令行工具中执行`npm`，出现如下图内容，标明你的npm安装正确。

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin15.png)

如果出现`npm 不是内部或外部命令，也不是可运行的程序或批处理文件`则表示安装失败，可以参考下面的[Node.js安装失败解决方案](#installError)或者在我们的<a href="http://bbs.egret-labs.org" target="_blank">开发者社区</a>中求助。

<a name="installError" id="installError"></a>
####1.5Node.js安装失败解决方案
* 部分Windows安装完成后直接在cmd里输入node和npm，可能会提示找不到该命令。是由于新增的Path路径需要重启才能生效。重启或使用node和npm的绝对路径来运行命令即可。


###2.安装TypeScript代码编辑器
---

####2.1选择一个合适的代码编辑器

Egret可以使用任何支持脚本语言的代码编辑器，包括：

* WebStorm <a href="http://www.jetbrains.com/webstorm/" target="_blank">官方下载地址</a>【官方推荐】
* Microsoft Visual Studio 2012 + TypeScript插件
* Sublime Text + TypeScript插件

>详细的编辑器安装方法以及插件配置方法，可参考文档中工具相关章节。

###3.安装一个HTTP服务器
---
#####3.1选择一个合适的HTTP服务器
Windows用户推荐采用<a href="https://www.apachefriends.org/download.html" target="_blank">XMAPP</a>

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

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin2.png)

####5.2安装Egret

将下载后的Egret引擎压缩包解压到指定目录，该目录可以为任意磁盘中目录，如图：

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin4.png)

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin18.png)

在**命令行工具**中敲入命令进入解压后的目录。由于我们将解压后的文件放置于F:盘，因此我们先进入F盘，命令如下：

`f:`

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin19.png)

随后我们进入对应的目录中，如图

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin21.png)

进入该目录后，我们执行安装命令。

`npm install -g`

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin23.png)

>如果安装命令错误，请检查如下三项，查看是否正确。

>1. 命令中的当前的路径是否正确。

>2. 当前目录是否是Egret目录（该目录下存在一个名为 `package.json` 的文件）

>3. 系统当前用户是否有管理员权限,如果将Egret解压到C盘，可能会出现此问题。

####5.3Egret工具验证
---

安装完成后，我们执行`egret`命令，来查看当前Egret是否安装成功。如安装成功，应出现如下图所示。

![Nodejs install]({{site.baseurl}}/assets/img/egretinstallwin24.png)

如果安装失败，请在我们的<a href="http://bbs.egret-labs.org/" target="_blank">开发者社区</a>中寻求帮助。
