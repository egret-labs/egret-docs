---
layout: codeonline
title:  "Bitmap相关代码对比"
permalink: as2ts/displaycode/bitmap.html
type: codedisplay
version: Egret引擎 v1.x
---

Bitmap类表示用于位图图像的显示对象。用法和as一样，创建之后设置纹理即可。

####ActionScript 3 Code

{% highlight java linenos %}
var bitmap:Bitmap = new Bitmap();
bitmap.bitmapData = bitmapData;
bitmap.x = 100;
bitmap.y = 200;
stage.addChild(bitmap);
{% endhighlight %}

####Egret Code

{% highlight java linenos %}
var bitmap:egret.Bitmap = new egret.Bitmap();
//设置纹理，类似bitmapData
bitmap.texture = texture;
bitmap.x = 100;
bitmap.y = 200;
stage.addChild(bitmap);
{% endhighlight %}