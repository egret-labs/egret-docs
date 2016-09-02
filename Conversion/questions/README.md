* EgretConversion适用范围

使用Flash工具actionscript3.0语言开发的页游项目。

通过EgretConversion的转换，可以把项目中as3代码转换为基于egret的typescript代码，把swf资源文件转换为egret项目可以使用的资源类型。

* EgretConversion不适用范围

暂不支持3D内容。

暂不支持Starling项目。

不支持flex组件及flash原生组件（fl下的组件）。

不支持blendMode，遮罩。

* EgretConversion需要的Egret Engine版本

EC2.3.0支持egret2.0.5之前的版本，EC2.5+支持egret2.5+

* 是否支持骨骼动画

暂不支持

* 可否使用第三方库

必须使用开源的第三方，不支持第三方以SWC的方式使用。需要将三方库的源码放入项目中作为项目代码的一部分，如果SWC中有资源，需要提取出来改为用loader的方式加载使用。

* 是否支持链接类，链接类命名有什么限制

支持链接类，链接类命名规则无限制。

* 是否支持中文路径和文件名

支持。

* 是否支持加密 

不支持加密过的swf文件解析，或者其他方式改写过swf。

* 为什么swf中的矢量图在转换为Egret后有锯齿？

swf中的矢量图在Egret端以位图的形式呈现，如果缩放则会出现模糊有锯齿的现象。现已默认开启图片的smoothing效果来抗锯齿。

* 是否支持转换swf中的音频

部分支持，可以导出库里的音频文件，暂不支持时间轴上的音频

* 是否支持转换swf中的视频

不支持

* 是否支持swf中的帧代码

不支持

* 是否支持滤镜Filter

不支持

* 是否支持九切

支持位图九切，支持矢量图形九切。

* 是否支持文档类

不支持swf的文档类。如果有文档类，把文档类与swf分离。

* 是否支持embed标签

支持嵌入图片和文本文件，不支持嵌入swf、字体、音频等。

* 对文本的字体支持

swf中的文本在转换之后都会使用设备字体来显示。不支持嵌入字，要使用嵌入字需要在egret项目中通过TextureMerger工具来制作。

* 无法导入示例Demo？

现象：点击欢迎界面的“导入示例项目”，选择示例项目，但工具卡住无法创建Egret项目。

解决办法：1.检查是否安装了Egret。2.以管理员方式重新打开工具。

* 是否支持as1、as2时代的项目

大部分此类项目未经过测试。as1、as2时代的项目可以尝试转换，但是建议改写为as3项目再转

* 是否支持老版swf资源（flash8以前avm1格式）

一般支持，可以像使用avm2的swf那样使用。不过对于avm1编译的的swf（flash8以前版本），最好用Flash Pro或者CC重新导出为avm2格式，否则有可能无法分析其中一些资源。

* 转换的swf文件在H5项目中使用

转换swf得到的资源只能在egret项目中使用，不支持其他H5项目


EgretConversion联系方式：

官方QQ群：Egret Conversion VIP 249685517

官方论坛：http://bbs.egret.com/forum.php?mod=forumdisplay&fid=70