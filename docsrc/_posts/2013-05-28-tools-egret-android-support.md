---
layout: post
title:  egret-android-support
permalink: post/tools/egrettools/egretandroidsupport.html
type: tools
element: egrettools
version: egret-android-support v1.x
---
egret-android-support是Egret打包为原生Android APP的方案，你可以使用egret-android-support将你的HTML5游戏打包为APK文件，并提供给用户安装。

具体使用方法如下：

####1、安装Egret
---

Windows系统请参考：[Windows 系统下安装]({{site.baseurl}}/post/quitestart/install/installwin.html)

Mac OS X请参考：[Mac OS X 系统下安装]({{site.baseurl}}/post/quitestart/install/instalformac.html)

####2、创建一个Egret项目
---

创建Egret项目请参考：[创建项目]({{site.baseurl}}/post/quitestart/helloworld/createpro.html)

这里创建一个名称为`ACoolHtmlGame`的项目，使用命令如下：

`egret create ACoolHtmlGame`

#如何使用Egret实现一个Android游戏应用

####3、编写你的游戏项目
---

接下来要做的事情就是编写你的游戏项目逻辑。这里我们不进行操作，使用默认的项目来进行演示。

####4、安装Android开发环境
---

#####4.1 安装Java运行时（Java Runtime Environment）

Java运行时是Android开发依赖，你应先确定系统中是否已经安装Java运行时，具体操作过程如下：

确认你的系统中安装了jre，运行命令：`java -version`。如果系统中存在Java运行环境，则应出现如下提示：

![egret-android-support]({{site.baseurl}}/assets/img/egret-android-support1.png)

如果没有提示任何Java版本，则表明你的系统中不存在Java运行时，需要对其进行安装。安装过程如下：

1. 下载[适用于OS X的Java](http://support.apple.com/kb/DL1572?viewlocale=zh_CN), 如下图：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-java-mac.png)

2. 安装jre包

a. 找到jre安装包，如下图：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-java-package-mac.png)

b. 双击jre包，系统会自动挂载安装包，此时会打开pkg文件，如下图：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-open-dmg.png)

c. 双击JavaForOSX.pkg，系统自动进入包安装过程，如下图：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-install-pkg.png)

d. 之后按安装引导完成安装即可

e. 安装完毕后，请运行命令`java -version`，检测Java运行环境是否安装成功。

#####4.2 安装Android开发工具包（ADT Bundle）

1. 下载Android开发工具包

官方站点：[android官方下载](http://developer.android.com/sdk/index.html)

国内镜像：[百度云镜像](http://pan.baidu.com/s/1bnaSPjT#dir/path=%2Fandroid%20tools)

下图为国内镜像演示：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-adt-bundle-mac.png)

2. 解压后放置你喜欢的目录$(adt_path)下，如下图：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-adt-path.png)

3. 下载Android Native开发工具包（NDK）

官方站点：[android官方下载](http://developer.android.com/tools/sdk/ndk/index.html)

国内镜像：[百度云镜像](http://pan.baidu.com/s/1bnaSPjT#dir/path=%2Fandroid%20tools)

4. 将下载的ndk解压，并放置到$(adt_path)目录，如下图：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-ndk-mac.png)

5. 关联ndk。双击Eclipse，启动Eclipse，选择 ADT——>Preferences...，展开**“Android”**标签，然后选择**“NDK”**子标签，在“NDK Location”中填写NDK的目录，如下图：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-link-ndk-mac.png)


####5、创建你的Android项目工程
---

#####下载Egret Android支持包

下载[egret-android-support](http://www.egret-labs.org/download/egret-android-packager-download.html)，并解压到$(egret-android)，如下图：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-egret-android.png)

##### 从你的HTML5游戏创建android项目工程

我们通过一个新的命令来创建适用于Android的项目，该命令创建项目时，需要制定原有HTML5工程和你的egret-android-support路径。命令如下：

`egret create_app ACoolAndroidApp -f ACoolHtmlGame -t ../egret_support/egret-android-support`

>`create_app`命令可用来创建适用于Android的项目工程。`ACoolAndroidApp`则是该工程的工程名。

>`-f`参数则指定我们的HTML5游戏项目，我们直接将刚刚创建的HTML5项目路径填写进入即可。

>`-t`参数则是Android项目工程的模板，我们需要指定刚刚下载解压后的**“egret-android-support”**项目路径。

运行命令后，你将看到新生成的Android项目文件夹，该文件夹结构如下：

```
#
# 主要的目录结构
# .../-+
#      +-- test/-+                                    # 当前工作目录
#      |         +-- ACoolHtmlGame/                   # 之前的Html游戏
#      |         +-- ACoolAndroidGame/                # 生成的Android应用工程
#      +-- egret_support/-+
#                         +-- egret-android-support/  # Egret android 支持包
#                         +-- ...
#
```

具体的命令行示例如下图：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-create-app.png)

####6、编译Android游戏

#####6.1 导入项目

打开Eclipse，选择菜单项“File”->“Import...”,如下图：

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-file-import.png)

#####6.2 选择工程类型

选择"Android"标签下的子标签“Existing Android Code Into Workspace”

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-import-android.png)

#####6.3 指定项目路径

指定生成的Android项目路径，当前路径为“./ACoolAndroidApp”

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-import-project.png)

#####6.4 载入项目并编译

载入项目成功后，Eclipse会自动执行编译工作。

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-build-project.png)

####7、测试项目

#####7.1 选择测试环境

我们推荐大家使用真机进行调试，右击项目，选择“Debug As” -> "1 Android Application"

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-debug.png)

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-debug-app.png)

使用真机尝试Debug运行应用

![egret-android-support]({{site.baseurl}}/assets/img/egrentandroidsupport-android-device.png)

到此，您已经把HTML5游戏编译为Android原生游戏，并安装到手机中。

![egret-android-support]({{site.baseurl}}/assets/img/egret-android-support3.jpg)

运行效果