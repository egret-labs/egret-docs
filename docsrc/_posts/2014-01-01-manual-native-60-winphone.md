---
layout: post
title:  WinPhone打包方案
permalink: post/tools/native/winphone.html
type: manual
element: manualnative
version: Egret v1.x
---

使用Egret开发的HTML5游戏，可以被轻松的打包成为WinPhone原生APP程序。

####1.创建Egret项目
--

具体创建方法请参考 <a href="{{site.baseurl}}/post/quitestart/helloworld/createpro.html" target="_blank">创建项目</a>

由于WinPhone打包支持的编码格式为 UTF-8+，而egret提供的为UTF-8，因此需要开发者在拷贝文件后将 bin-debug（如果js代码压缩过，则换成压缩文件而不需要bin-debug文件夹） 和 launcher下的文件转成UTF-8+的格式。（大家可以使用 批量转文件格式的 软件。如 GB2UTF8 批量文件编码转换工具 v1.3）
如果软件中不让UTF-8转UTF-8+或者UTF-8（带BOM）的，大家可以通过 gb转UTF-8（带BOM）的方式转换

####2.在VS中运行 egret 项目
---

>egret在VS中运行最低配置： Windows8.1和VS2013。

下面将介绍如何创建出一个支持egret项目的VS工程，以及VS项目的结构图。

![img]({{site.baseurl}}/assets/img/winphone1.png)

![img]({{site.baseurl}}/assets/img/winphone2.png)

![img]({{site.baseurl}}/assets/img/winphone22.png)

![img]({{site.baseurl}}/assets/img/winphone21.png)


生成VS工程后，我们需要将egret项目中的bin-debug（如果js代码压缩过，则换成压缩文件而不需要bin-debug文件夹）、launcher、resources三个文件（夹）拷贝到EgretWinExample.Shared/js文件夹下面

选取egret实际运行的代码以及素材，并拷贝

![img]({{site.baseurl}}/assets/img/winphone3.png)

将上面拷贝的文件夹放置到VS工程的EgretWinExample.Shared/js下面

![img]({{site.baseurl}}/assets/img/winphone4.png)


展开所有的文件

![img]({{site.baseurl}}/assets/img/winphone5.png)


将刚加的文件夹包括到项目中，即VS中可以直接访问

![img]({{site.baseurl}}/assets/img/winphone6.png)


打开配置文件

![img]({{site.baseurl}}/assets/img/winphone7.png)


根据下图层级 修改起始地址，这里就写在egret项目中所运行的起始文件就行。

![img]({{site.baseurl}}/assets/img/winphone8.png)

![img]({{site.baseurl}}/assets/img/winphone9.png)


VS中支持2种运行模式，一种windows，一种wphone。

![img]({{site.baseurl}}/assets/img/winphone10.png)


windows的运行结果。 大家也可以用wphone的模拟器运行。

![img]({{site.baseurl}}/assets/img/winphone11.png)


####3.打包
---


在打包开始之前，大家需要提供图中所需要的图片并修改对应的素材地址 
另外由于 发布的时候还需要其他规格的图片

Logo： 71 * 71
			150 * 150
			310 * 150
			44 * 44
			58 * 58
			120 * 120
300 * 300 //上传用
			358 * 358//上传用
			358 * 173//上传用
	背景图：
			1152 * 1920
1000*800//上传用

游戏内图：		1280 * 768 或者 7868 * 1280//上传用

![img]({{site.baseurl}}/assets/img/winphone12.png)


点击生成，再点击应用商店->创建应用程序

![img]({{site.baseurl}}/assets/img/winphone13.png)

![img]({{site.baseurl}}/assets/img/winphone14.png)


在应用名称中填写名称后点击保留将会在上面的列表中显示

![img]({{site.baseurl}}/assets/img/winphone15.png)


![img]({{site.baseurl}}/assets/img/winphone16.png)

![img]({{site.baseurl}}/assets/img/winphone17.png)

打包所生成需要的文件

![img]({{site.baseurl}}/assets/img/winphone18.png)


以下两步是测试 生成的包 是否有问题，如果有问题把问题解决完后重新打包次。

![img]({{site.baseurl}}/assets/img/winphone19.png)

![img]({{site.baseurl}}/assets/img/winphone20.png)


####4.上传
---

至此，你就可以将自己打包后的APP上传到WinPhone的官方商城了。