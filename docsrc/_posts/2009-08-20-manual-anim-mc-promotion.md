---
layout: post
title:  "MovieClip旧版升迁指南"
permalink: post/manual/displaycon/mc-promotion.html
type: manual
element: manualmoive
version: Egret引擎 v1.5.3
---
       
由于在Egret1.5.3版之前的MovieClip(以下称为旧版)实现使用方法完全与1.5.3开始的新版不同，因此这里讲一下升迁指南。

---
#### Egret1.5.3版MovieClip和之前版本功能上的区别

播放控制接口更加人性化，旧版只支持帧标签，先版支持传入帧序号和帧标签，可实现更自由的控制。

支持循环播放，在每次循环结束后会抛出Event.LOOP_COMPLETE事件，在播放完成后会抛出Event.COMPLETE事件。

为减少额外性能消耗，去掉了自定义事件的支持。

---
#### MovieClip升迁指南

#####1.升级数据文件
新的MovieClip不兼容老的数据格式，所以迁移的第一步是升级数据文件。您需要下载最新的TextureMerger,找到原始的swf文件并拖到TextureMerger中，重新导出数据文件和纹理文件，并替换工程中老的文件。

#####2.修改创建MovieClip的代码：
MovieClip改为通过接收MovieClipDataFactory生成的MovieClipData来创建。
请将类似如下的代码          
{% highlight java %}
 var mc = new egret.MovieClip(data, texture);
{% endhighlight %}
改为:          
{% highlight java %}
var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
var mc= new egret.MovieClip(mcDataFactory.generateMovieClipData());
{% endhighlight %}

#####3.将部分API调用修改为属性访问
请将类似如下的方法调用改为访问相应的属性:       
{% highlight java %}
mc.getCurrentFrameIndex() -> mc.currentFrame
mc.getTotalFrame() -> mc.totalFrames
mc.setInterval(value) -> mc.frameRate = value
mc.getIsPlaying() -> mc.isPlaying
{% endhighlight %}

#####4.删除dispose和release的方法调用
请将类似如下的代码删除：   
{% highlight java %}
mc.dispose();
mc.release();
{% endhighlight %}


