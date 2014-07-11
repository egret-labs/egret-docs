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

####0、预备知识
---

首先建立一个文件夹，以便管理。比如："D:\Labs"。如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-create_labs_fold.png)

在当前目录下，按住shift键，然后右击，如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-open_cm_0.png)

在弹出列表中选中“在此处打开命令窗口”以启动命令行窗口。如图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-open_cm_1.png)

接下来，为我们的游戏建立一个projects文件夹，执行命令

```
D:\Labs>mkdir projects
```

如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-projects.png)

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-projects-finder.png)

####1、安装Egret
---

请按照教程<a href="{{site.baseurl}}/post/quitestart/install/instalformac.html" target="_blank">Windows系统下安装Egret</a>将Egret安装到“labs/”下
，如图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-egret-core-finder.png)

接下来，安装Egret到npm，之后进入“labs/projects/”文件夹

```
D:\Lables>cd egret-core
D:\Lables\egret-core>npm install -g
D:\Lables\egret-core>cd ../projects
```

如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-cd-projects.png)

####2、创建一个Egret项目
---


这里创建一个名称为`ACoolHtmlGame`的项目，使用命令如下：

```
D:\Lables\projects>egret create ACoolHtmlGame
```

如图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-egret-create.png)

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-egret-create-finder.png)

#如何使用Egret实现一个Android游戏应用

####3、编写你的游戏项目
---

接下来要做的事情就是编写你的游戏项目逻辑。这里我们不进行操作，使用默认的项目来进行演示。

####4、安装Android开发环境
---


#####4.1 安装JDK

首先确定系统中是否已经安装JDK，具体操作过程如下：

打开命令行窗口。执行以下命令

```
C:\>java -version
``` 
如果出现下图的提示，说明系统已经安装JDK，具体版本号可能有差异。请跳转至安装ADT Bundle，否则，请继续。

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-check_jkd_win.png)


1）<a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html" target="_blank">进官网下载JDK</a> 如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-jdk_win.png)

2） 下载并安装好JDK以后。再次执行如下命令，检测是否安装正确。

```
C:\>java -version
```

3） 如果执行以上命令。仍然看不到JDK的信息。则需要手动配置JDK的环境变量。<a href="http://wenku.baidu.com/view/59375e6da98271fe910ef946.html?re=view" target="_blank">点我查看JDK配置教程</a>。

#####4.2 安装Android开发工具包

我们需要两个工具ADT bundle和NDK。以下提供了两种下载安装方式：

a） 从官方进行下载

<a href="http://developer.android.com/sdk/index.html" target="_blank">ADT bundle官方下载</a>

<a href="http://developer.android.com/tools/sdk/ndk/index.html" target="_blank">Android NDK官方下载</a>

b） ADT bundle+NDK整合包-<a href="http://pan.baidu.com/s/1bnaSPjT#dir/path=%2Fandroid%20tools%2Fadt-bundle-windows" target="_blank">百度云镜像。</a>

ADT bundle+NDK整合包名为：

1、对应32位操作系统的：adt-bundle-windows-x86-20140624_and_ndk_r9d.zip；

2、对应64位操作系统的：adt-bundle-windows-x86_64-20140624_and_ndk_r9d.zip

以64位为例。下载完毕后解压到“labs/”目录下，如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-adt-ndk.png)


接下来关联ndk到eclipse。找到adt-bundle-windows-x86_64-20140624_and_ndk_r9d->eclipse文件夹下eclipse.exe，启动Eclipse，选择“Windows->Preferences...”。如图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-ndk_set_0.png)

展开**“Android”**标签，然后选择“NDK”子标签，点击Browse...然后选取NDK的目录。并Apply,确认。如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-ndk_set_1.png)

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-ndk_set_2.png)



####5、创建你的Android项目工程
---

#####Labls文件夹下创建Egret Support文件夹

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-mkdir-egret-support-finder.png)

#####下载Egret Android支持包

下载<a href="http://www.egret-labs.org/download/egret-android-packager-download.html)" target="_blank">egret-android-support</a>，并解压到你喜欢的文件目录，演示中，我们将`egret-android-support`放置在“labs/egret-support/”文件夹下，如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-egret-support-finder.png)

##### 从你的HTML5游戏创建android项目工程

回到我们的游戏工程文件夹“labs/projects/”下，我们通过一个新的命令来创建适用于Android的项目，该命令创建项目时，需要制定原有HTML5工程和你的egret-android-support路径。命令如下：

```
D:\Labs\projects>egret create_app ACoolAndroidGame -f ACoolHtmlGame -t ..\egret-
support\egret-android-support
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

####6、编译Android游戏
---

#####6.1 导入项目

打开Eclipse，选择菜单项“File”->“Import...”,如下图：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-file-import.png)

#####6.2 选择工程类型

选择"Android"标签下的子标签“Existing Android Code Into Workspace”
![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-import-android.png)

#####6.3 指定项目路径

指定生成的Android项目路径：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-choose-project.png)

#####6.4 载入项目并编译

载入项目成功后，Eclipse会自动执行编译工作。等待Eclipse编译完成后进行下一步，编译完成后，控制台会提示**“Builde Finished”**。

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-build-project.png)

#####6.5 手动编译

如果Eclipse没有自动编译。可以选中项目。然后选择菜单"Project"->"Build Project"

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-build_project.png)


####7、测试项目
---

#####7.1 选择测试环境

我们推荐大家使用真机进行调试，右击项目，选择“Debug As” -> "1 Android Application"

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-debug.png)


#####7.2 运行效果

![img]({{site.baseurl}}/assets/img/egret-android-support-win-3.jpg)


#####7.3 查看生成的APK

编译和测试通过之后，我们可以在eclipse工程环境中的bin目录夹中发现生成的apk文件，如下：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-apk_positin.png)

在磁盘中的位置如下：

![img]({{site.baseurl}}/assets/img/egrentandroidsupportwin-apk-finder.png)

此时的apk已经可以发布到国内的无需签名的应用市场，如需发布到Google Play，请查看<a href="https://play.google.com/store" target="_blank">发布到Google Play的官方文档</a>

自此，完成了使用Egret实现一个Android游戏应用的全过程。

####8、项目开发的整体流程
---

我们推荐的开发方式：在原有的HTML5游戏项目中进行开发，开发测试ok，再编译到Android平台。下面为大家演示一下流程：

1.创建一个HTML5游戏：
 
`egret create ACoolHtmlGame`

2.创建对应的iOS游戏：
 
`egret create_app ACoolAndroidGame -f ACoolHtmlGame -t ../egret-support/egret-android-support`

3.测试一下各个平台游戏

4.在ACoolHtmlGame中开发游戏，一个小步进的开发后，我们要开始编译我们的游戏并在浏览器上测试，这是使用

`egret build ACoolHtmlGame -e`

这行命令执行了两项任务：1.编译TypeScript到JavaScript（此时HTML5的部分ok），2.将编译出的文件同步到Android项目中。这里需要注意的有两点：1.编译的项目是**HTML5项目**，2.**不要更改Android项目的位置**，项目位置的设置将在高级教程给出。

5.此时可以使用`egret startserver ACoolHtmlGame` 启动游戏服务，这样浏览器就能观察到实现的游戏逻辑了。

6.接下来回到ACoolAndroidGame的Eclipse程中，使用Eclipse来清除、重新编译、调试项目，这样就可以在手机上得到和HTML项目的游戏逻辑了。 

7.返回4，不断的迭代。