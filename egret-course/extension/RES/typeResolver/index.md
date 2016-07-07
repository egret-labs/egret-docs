## 一、RES内置文件类型解析器

RES内置支持的文件类型有：

RES.ResourceItem.TYPE_BIN(bin)：解析为原始的二进制文件

RES.ResourceItem.TYPE_IMAGE(image)：解析为egret.Texture对象

RES.ResourceItem.TYPE_TEXT(text)：解析为string变量

RES.ResourceItem.TYPE_JSON(json)：解析为json对象

RES.ResourceItem.TYPE_SHEET(sheet)：解析为egret.SpriteSheet对象

RES.ResourceItem.TYPE_FONT(font)：解析为egret.BitmapFont对象      (egret1.5.2新更名，即为之前版本的egret.BitmapTextSpriteSheet)

RES.ResourceItem.TYPE_SOUND(sound)：解析为egret.Sound对象

RES.ResourceItem.TYPE_XML(xml)：解析为egret.XML对象

## 二、配置九宫格参数

图片类型的解析器是支持九宫格参数的，只要在资源项上加上"scale9grid"属性即可，示例：

```
{"name":"button","scale9grid":"22,0,10,60","type":"image","url":"assets/button.png"}
```

其中scale9grid属性的四个值分别表示九宫格矩形的:x,y,width,height。 九宫格的详细配置方式请参考 [九宫格的使用](http://edn.egret.com/cn/index.php?g=&m=article&a=index&id=133&terms1_id=25&terms2_id=31)。

## 三、配置声音资源

声音资源需要配置soundType属性，在native和runtime上会根据soundType对声音进行不同的处理。

![](556563e7662ee.jpg)

其中music表示背景音乐，背景音乐在native上只能同时播放一个。effect表示音效，音效可以和背景音乐一起播放还可以多个音效一起播放。

值得注意的是：音效的播放时长尽量不要过长，采样频率不要过大。

## 四、读取并解析二进制文件

在游戏开发使用的资源中，除了常用的图片和文本格式，还有其他现有或自定义的二进制格式也被广泛使用。

本教程以jpg文件为例，来讲解如何以二进制解析文件。

使用二进制格式资源时，需要在资源清单中，设置type为bin：

```
{"name":"bg","type":"bin","url":"assets/wall.jpg"}
```
资源载入后，读取其前两个字节的内容，并打印为16进制，通过与jpg文件规范对比来证实可以成功读取该文件。

先查一下规范：[JPEG文件编/解码详解](http://blog.csdn.net/lpt19832003/article/details/1713718)

如文中所述SOI标记，即前两个字节的数据是："0xFFD8"。

接下来就是关键代码了，如何解析二进制数据：

```
var baImage:egret.ByteArray = new egret.ByteArray( RES.getRes("bg") );
console.log( "JPEG SOI:", baImage.readUnsignedShort().toString(16) );
```

对于bin方式读取，RES.getRes得到的数据其实是ArrayBuffer格式，需要作为ByteArray构造函数的参数来创建一个ByteArray。

接着用无符号短整型方式读取ByteArray数据，即可得到我们需要的SOI标记。

>注意，该方式暂不支持Runtime/Native环境。


