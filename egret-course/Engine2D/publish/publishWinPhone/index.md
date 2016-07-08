使用Egret开发的HTML5游戏，可以被轻松的打包成为WinPhone原生APP程序。

1.创建Egret项目

----

具体创建方法请参考[创建项目](http://edn.egret.com/cn/docs/page/639)

由于WinPhone打包支持的编码格式为 UTF-8+，而egret提供的为UTF-8，因此需要开发者在拷贝文件后将 bin-debug（如果js代码压缩过，则换成压缩文件而不需要bin-debug文件夹） 和 launcher下的文件转成UTF-8+的格式。（大家可以使用 批量转文件格式的 软件。如 GB2UTF8 批量文件编码转换工具 v1.3） 如果软件中不让UTF-8转UTF-8+或者UTF-8（带BOM）的，大家可以通过 gb转UTF-8（带BOM）的方式转换。

2.在VS中运行 egret 项目

----

>egret在VS中运行最低配置： Windows8.1和VS2013。

下面将介绍如何创建出一个支持egret项目的VS工程，以及VS项目的结构图。

![](568a5ce05b0cb.png)

![](568a5ce0830b5.png)

![](568a5ce0a11b6.png)

![](568a5ce0bd793.png)

生成VS工程后，我们需要将egret项目中的bin-debug（如果js代码压缩过，则换成压缩文件而不需要bin-debug文件夹）、launcher、resources三个文件（夹）拷贝到EgretWinExample.Shared/js文件夹下面

选取egret实际运行的代码以及素材，并拷贝

![](568a5ce0d1a2b.png)

将上面拷贝的文件夹放置到VS工程的EgretWinExample.Shared/js下面

![](568a5ce0e2c9d.png)

展开所有的文件

![](568a5ce0f10f1.png)

将刚加的文件夹包括到项目中，即VS中可以直接访问

![](568a5ce10ea36.png)

打开配置文件

![](568a5cd2d99f7.png)

根据下图层级 修改起始地址，这里就写在egret项目中所运行的起始文件就行。

![](568a5cd3025b1.png)

![](568a5cd317280.png)

VS中支持2种运行模式，一种windows，一种wphone。

![](568a5cd335b3e.png)

windows的运行结果。 大家也可以用wphone的模拟器运行。

![](568a5cd344e70.png)

3.打包

----

在打包开始之前，大家需要提供图中所需要的图片并修改对应的素材地址  另外由于 发布的时候还需要其他规格的图片

Logo： 71 * 71            150 * 150            310 * 150            44 * 44            58 * 58            120 * 120 300 * 300 //上传用             358 * 358//上传用             358 * 173//上传用    背景图：             1152 * 1920 1000*800//上传用

游戏内图：     1280 * 768 或者 7868 * 1280//上传用

![](568a5cd369c53.png)

点击生成，再点击应用商店->创建应用程序

![](568a5cd37f08f.png)

![](568a5cd39a795.png)

在应用名称中填写名称后点击保留将会在上面的列表中显示

![](568a5cd403ef5.png)

![](568a5cd46914f.png)

![](568a5cd52ac6a.png)

打包所生成需要的文件

![](568a5cd54f36e.png)

以下两步是测试 生成的包 是否有问题，如果有问题把问题解决完后重新打包次。

![](568a5cd5b850c.png)

![](568a5cd5cdb3e.png)

4.上传

----

至此，你就可以将自己打包后的APP上传到WinPhone的官方商城了。
    




