---
layout: codeonline
title:  "URLLoader相关代码对比"
permalink: as2ts/networkcode/urlloader.html
type: codenetwork
version: Egret引擎 v1.x
---

URLLoader 类以文本、二进制数据或 URL 编码变量的形式从 URL 下载数据。在下载文本文件、XML 或其他用于动态数据驱动应用程序的信息时，它很有用。

####ActionScript 3 Code

{% highlight java  %}
var loader:URLLoader = new URLLoader();
loader.addEventListener(Event.COMPLETE, onLoadComplete);
loader.load(new URLRequest(url));
function onLoadComplete(event:Event):void
{
    var loader:URLLoader = event.currentTarget as URLLoader;
    var data:* = loader.data;
}
{% endhighlight %}

####Egret Code

{% highlight java  %}
var loader:egret.URLLoader = new egret.URLLoader();
loader.addEventListener(egret.Event.COMPLETE, onLoadComplete, this);
loader.load(new egret.URLRequest(url));
function onLoadComplete(event:egret.Event):void
{
    var loader:egret.URLLoader = <egret.URLLoader>event.currentTarget;
    var data:any = loader.data;
}
{% endhighlight %}