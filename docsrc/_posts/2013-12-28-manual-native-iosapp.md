---
layout: post
title:  iOS APP打包方案
permalink: post/tools/native/iosapp.html
type: manual
element: manualnative
version: egret-android-support v1.x
---

**egret-ios-support**是Egret打包为原生ios APP的方案，你可以使用egret-ios-support将你的HTML5游戏打包为ipa文件，并提供给用户安装。

具体使用方法如下：
####0、预备知识
---

运行Mac OS X的Terimal应用：在Finder中打开Applications文件夹，再打开Utilities文件夹，找到Termial应用，双击运行。如下图：

![img]({{site.baseurl}}/assets/img/egret-ios-support-terminal.png)

进入你的工作目录，在演示中，我们的的工作目录为“labs/”，工作目录为空文件夹，如下图：

![img]({{site.baseurl}}/assets/img/egret-ios-support-pwd.png)

![img]({{site.baseurl}}/assets/img/egret-ios-support-labs.png)

接下来，为我们的游戏建立一个projects文件夹，运行

```
$ mkdir projects
```

如下图：

![img]({{site.baseurl}}/assets/img/egret-ios-support-projects.png)

![img]({{site.baseurl}}/assets/img/egret-ios-support-projects-finder.png)

####1、安装Egret
---

请按照教程<a href="{{site.baseurl}}/post/quitestart/install/instalformac.html" target="_blank">Mac OS X 系统下安装Egret</a>将Egret安装到“labs/”下
，如图：

![img]({{site.baseurl}}/assets/img/egret-ios-support-egret-core-finder.png)

接下来，安装Egret到npm，之后进入“labs/projects/”文件夹

```
$ cd egret-core
$ sudo npm install -g
$ cd ../projects
```
如下图：

![img]({{site.baseurl}}/assets/img/egret-ios-support-cd-projects.png)

####2、创建一个Egret项目
---


这里创建一个名称为`ACoolHtmlGame`的项目，使用命令如下：

```
$ egret create ACoolHtmlGame
```

如图：

![img]({{site.baseurl}}/assets/img/egret-ios-support-egret-create.png)

![img]({{site.baseurl}}/assets/img/egret-ios-support-egret-create-finder.png)

#如何使用Egret实现一个ios游戏应用

####3、编写你的游戏项目
---

接下来要做的事情就是编写你的游戏项目逻辑。这里我们不进行操作，使用默认的项目来进行演示。

####4、安装ios开发环境——Xcode
---

运行App Store，在搜索项查找“Xcode”，下载并安装即可

![img]({{site.baseurl}}/assets/img/egret-ios-support-install-xcode.png)


####5、创建你的ios项目工程
---

#####创建Egret Support文件夹

![img]({{site.baseurl}}/assets/img/egret-ios-support-mkdir-egret-support-ios.png)

#####下载Egret ios支持包

下载<a href="http://www.egret-labs.org/download/egret-ios-packager-download.html" target="_blank">egret-ios-support</a>，并解压到你喜欢的文件目录，演示中，我们将`egret-ios-support`放置在“labs/egret-support/”文件夹下，如下图：

![img]({{site.baseurl}}/assets/img/egret-ios-support-egret-support-ios.png)

##### 从你的HTML5游戏创建ios项目工程

回到我们的游戏工程文件夹“labs/projects/”下，我们通过一个新的命令来创建适用于ios的项目，该命令创建项目时，需要指定原有HTML5工程和你的egret-ios-support路径。命令如下：

```
$ cd projects/
$ egret create_app ACoolIosGame -f ACoolHtmlGame -t ../egret-support/egret-ios-support
```


>`create_app`命令可用来创建适用于ios的项目工程。`ACoolIosGame`则是该工程的工程名。

>`-f`参数则指定我们的HTML5游戏项目，我们直接将刚刚创建的HTML5项目路径填写进入即可。

>`-t`参数则是ios项目工程的模板，我们需要指定**“egret-ios-support”**项目路径。

下图为运行命令演示：

![img]({{site.baseurl}}/assets/img/egret-ios-support-egret-create-app-ios.png)

运行命令后，你将看到新生成的ACooliosGame项目文件夹，该文件夹结构如下：

![img]({{site.baseurl}}/assets/img/egret-ios-support-egret-create-app-finder-ios.png)

自此，我们已经创建了一个完整的ios工程，我们来看一下当前的文件层级：

```
labs/-+
      +-- egret-core/-+                         # egret
      +-- egret-support/-+                      # egret 支持库
      |                  +-- egret-ios-support/ # ios支持
      +-- projects/-+
      |             +-- ACoolIosGame            # ios工程
      |             +-- ACoolHtmlGame           # html应用
      ...
```

####6、编译ios游戏
---

#####6.1 导入项目

打开ACoolIosGame文件夹，双击“ACoolIosGame.xcodeproj”，等待Xcode加载完成

![img]({{site.baseurl}}/assets/img/egret-ios-support-import-xcode-proj.png)


####7、测试项目
---

点击Xcode的Run命令，直接进入ios模拟器运行

![img]({{site.baseurl}}/assets/img/egret-ios-support-xcode-proj.png)


下图为运行效果

![img]({{site.baseurl}}/assets/img/egret-ios-support-ios-run.png)

如需生成ipa包，请访问<a href="http://developer.apple.com" target="_blank">苹果开发网站</a>，注册开发者账号，阅读相关设置即可。

自此，完成了使用Egret实现一个ios游戏应用的全过程。