---
layout: codeonline
title:  "EnterFrame相关代码对比"
permalink: as2ts/eventcode/enterframe.html
type: codeevent
version: Egret引擎 v1.x
---

所有显示对象都可以添加EnterFrame侦听器，用于处理帧事件。

####ActionScript 3 Code

{% highlight java  %}
var sprite:Sprite = new Sprite();
sprite.addEventListener(Event.ENTER_FRAME, onEnterFrame);
function onEnterFrame()
{
}
{% endhighlight %}

####Egret Code

{% highlight java  %}
var sprite:egret.Sprite = new egret.Sprite();
sprite.addEventListener(egret.Event.ENTER_FRAME, onEnterFrame, this);
function onEnterFrame()
{
}
{% endhighlight %}