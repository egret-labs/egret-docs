---
layout: post
title:  Android APP打包方案 Windows
permalink: post/tools/native/androidforwindows.html
type: manual
element: manualnative
version: egret-android-support v1.x
---

**egret-android-support**是Egret打包为原生Android APP的解决方案，你可以使用egret-android-support将你的HTML5游戏打包为APK文件，并提供给用户安装。

具体使用方法如下：
####-1、预备知识
---

为了顺利完成本教程，请确认您已熟练掌握以下知识：

- 了解**文件**、**文件夹**的概念，以及创建，移动、复制、重命名和删除等知识。
- 了解**终端**、**命令行**、**Shell**其中之一，会启动她，并能通过命令行执行的方式完成上一条的相关操作
- 了解如何下载文件并解压缩文件
- 了解以下术语：
  - 编写游戏逻辑需要：JavaScript、TypeScript、nodejs、npm
  - 打包Android App需要：XML、Java、JRE、ADT-Bundle、Android SDK
- 尽管本文由部分内容覆盖<a href="{{site.baseurl}}/post/quitestart/helloworld/helloworld.html" target="_blank">HelloWorld</a>，但是还是强烈建议在阅读本文之前先阅读<a href="{{site.baseurl}}/post/quitestart/helloworld/helloworld.html" target="_blank">HelloWorld</a>


####0、文档概述
---
本文会完整的展示如何在一个已经安装npm管理包的环境中全新安装Egret核心包、Egret的Android支持包，最终在模拟机中运行Demo的过程。

本文分为三部分：第一部分为Android开发环境的安装、第二部分为Egret游戏框架的安装、第三部分创建一个完整Android App的示例。

###第一部分、安装Android开发环境
Android开发环境的运行需要Java运行时环境（JRE）支持，一个常见的Android App的编写只需要Android SDK（需要Java），最后还有一个集成开发环境（IDE），下面为大家演示一下整个安装过程。


首先打开我们的工作目录"D:\Labs"，该文件夹目前为空文件夹，后续的所有操作会这里执行。如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-create_labs_fold.png)

在当前目录下，**按住shift键右击鼠标**，如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-open_cm_0.png)

在弹出列表中选中“在此处打开命令窗口”以启动命令行窗口。如图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-open_cm_1.png)



####1、安装Java运行时
请确保Java被正确安装，请参考[Windows中安装Egret第6节]({{site.baseurl}}/post/quitestart/install/instalformac.html)


####2 安装Android开发工具包
---
因为Android开发工具包是绿色软件，所以我们直接放置在我们的工作目录“D:\Labs\”中，工作目录为空文件夹，如下图：

我们需要两个工具ADT bundle和NDK。以下提供了两种下载安装方式：

a） 从官方进行下载

<a href="http://developer.android.com/sdk/index.html" target="_blank">ADT bundle官方下载</a>

<a href="http://developer.android.com/tools/sdk/ndk/index.html" target="_blank">Android NDK官方下载</a>

b） (**推荐**)ADT bundle+NDK整合包
-<a href="http://pan.baidu.com/s/1bnaSPjT#dir/path=%2Fandroid%20tools%2Fadt-bundle-windows" target="_blank">百度云镜像。</a>

ADT bundle整合包名为：

1、对应32位操作系统的：`adt-bundle-windows-x86-20140624_and_ndk_r9d.zip`；

2、对应64位操作系统的：`adt-bundle-windows-x86_64-20140624_and_ndk_r9d.zip`

以64位为例。下载完毕后解压到“D:\Labs\”目录下，如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-adt-ndk.png)


#####关于另外的安装Android开发工具
a. **Intellij IDEA**。 Intellij IDEA 现在支持两种编译模式Ant(ADT的模式)和Gradle(Android Studio的模式)，所以IDEA直接无缝的导入Eclipse项目，再ADT停止更新后，可以完美的使用Gradle编译方式，所以更推荐Intellij IDEA。

b. **Android Studio**。因为Android Studio只使用新的Gradle模式，因为Gradle要求实时联网编译，暂时不太建议一般用户试用。

###第二部分、安装Egret游戏框架
####3、预备知识
---
为方便管理游戏项目，首先我们建立一个projects文件夹用于集中存放游戏项目，执行命令

```
D:\Labs>mkdir projects
```

如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-projects.png)

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-projects-finder.png)

####4、安装Egret
---

请将[最新的Egret安装包](http://www.egret-labs.org/download/egret-download.html)下载到本地的“D:\Labs\”，解压并重命名为“egret-core”
，如图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-egret-core-finder.png)

接下来，安装Egret到npm，之后进入“labs\projects\”文件夹

```
D:\Labs>cd egret-core
D:\Labs\egret-core>npm install -g
D:\Labs\egret-core>cd ../projects
如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-cd-projects.png)
```

####5、安装Egret的Android支持包

---
#####创建Egret Support文件夹用于集中存放所有egret支持包

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-mkdir-egret-support-finder.png)

#####下载Egret Android支持包

下载<a href="http://www.egret-labs.org/download/egret-android-packager-download.html" target="_blank">最新的Egret的Android支持包</a>解压并重命名为`egret-android-support`，然后放置在“labs/egret-support/”文件夹下，如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-egret-support-finder.png)



###第三部分、创建一个Android打包示例

####6、创建一个Egret项目

---


这里创建一个名称为`ACoolHtmlGame`的项目，注意我们的当前目录为“labs/projects/”下，使用命令如下：

```
D:\Labs\projects> egret create ACoolHtmlGame
```

如图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-egret-create.png)

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-egret-create-finder.png)


####7、编写你的游戏项目
---

接下来要做的事情就是编写你的游戏项目逻辑。这里我们不进行操作，使用默认的项目来进行演示。



####8、创建你的Android项目工程
---


###### 从你的HTML5游戏创建android项目工程

回到我们的游戏工程文件夹“labs/projects/”下，我们通过一个新的命令来创建适用于Android的项目，该命令创建项目时，需要制定原有HTML5工程和你的egret-android-support路径。命令如下：

```
D:\Labs\projects>egret create_app ACoolAndroidGame -f ACoolHtmlGame -t ..\egret-support\egret-android-support
```


>`create_app`命令可用来创建适用于Android的项目工程。`ACoolAndroidGame`则是该工程的工程名。

>`-f`参数则指定我们的HTML5游戏项目，我们直接将刚刚创建的HTML5项目路径填写进入即可。

>`-t`参数则是Android项目工程的模板，我们需要指定**“egret-android-support”**项目路径。

下图为运行命令演示：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-egret-create-app.png)

运行命令后，你将看到新生成的ACoolAndroidGame项目文件夹，该文件夹结构如下：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-egret-create-app-finder.png)

自此，我们已经创建了一个完整的android工程，我们来看一下当前的文件层级：

```
labs/-+
      +-- adt-bundle-..../-+
      |                    +-- android-ndk-r9d/     # android ndk
      |                    +-- eclipse/             # eclipse
      |                    +-- sdk/                 # android sdk
      +-- egret-core/-+                             # egret
      +-- egret-support/-+                          # egret 支持库
      |                  +-- egret-android-support/ # android支持
      +-- projects/-+
      |             +-- ACoolAndroidGame            # android应用
      |             +-- ACoolHtmlGame               # html应用
      ...
```

####9、编译Android游戏
---

#####9.1 导入项目

打开Eclipse，选择菜单项“File”->“Import...”,如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-file-import.png)

#####9.2 选择工程类型

选择"Android"标签下的子标签“Existing Android Code Into Workspace”
![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-import-android.png)

#####9.3 指定项目路径

指定生成的Android项目路径：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-choose-project.png)

#####9.4 载入项目并编译

载入项目成功后，等待Eclipse解析项目。

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-build-project.png)

#####9.5 手动编译

右键点击项目，在弹出的菜单中选择"Build Project"，执行项目编译。

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-build_project.png)


####10、测试项目
---

#####10.1 选择测试环境

我们推荐大家使用真机进行调试，右击项目，选择“Debug As” -> "1 Android Application"

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-debug.png)


#####10.2 运行效果

![img]({{site.baseurl}}/assets/img/egret-android-support-win-3.jpg)


#####10.3 查看生成的APK

编译和测试通过之后，我们可以在eclipse工程环境中的bin目录夹中发现生成的apk文件，如下：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-apk_positin.png)

在磁盘中的位置如下：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-apk-finder.png)

此时的apk已经可以发布到国内的无需签名的应用市场，如需发布到Google Play，请查看<a href="https://play.google.com/store" target="_blank">发布到Google Play的官方文档</a>

自此，完成了使用Egret实现一个Android游戏应用的全过程。

###总结
---
这里我们总结一下项目开发的整体流程：

我们推荐的开发方式：在原有的HTML5游戏项目中进行开发，开发测试ok，再编译到Android平台。下面为大家演示一下流程：

1.创建一个HTML5游戏：
 
`egret create ACoolHtmlGame`

2.创建对应的iOS游戏：
 
`egret create_app ACoolAndroidGame -f ACoolHtmlGame -t ../egret-support/egret-android-support`

3.测试一下各个平台游戏

4.在ACoolHtmlGame中开发游戏，一个小步进的开发后，我们要开始编译我们的游戏并在浏览器上测试，这是使用

`egret build ACoolHtmlGame --runtime native -e`

这行命令执行了两项任务：1.编译TypeScript到JavaScript（此时HTML5的部分ok），2.将编译出的文件同步到Android项目中。这里需要注意的有两点：1.编译的项目是**HTML5项目**，2.**不要更改Android项目的位置**，项目位置的设置将在高级教程给出, 3.此时HTML5项目会失效，想查看HTML5项目，请使用

`egret build ACoolHtmlGame -e`

来使得HTML5项目生效, 此时Android项目失效。

5.此时可以使用`egret startserver ACoolHtmlGame` 启动游戏服务，这样浏览器就能观察到实现的游戏逻辑了。

6.接下来回到ACoolAndroidGame的Eclipse程中，使用Eclipse来清除、重新编译、调试项目，这样就可以在手机上得到和HTML项目的游戏逻辑了。 

7.返回4，不断的迭代。
