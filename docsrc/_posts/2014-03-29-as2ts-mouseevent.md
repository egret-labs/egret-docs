---
layout: codeonline
title:  "MouseEvent相关代码对比"
permalink: as2ts/eventcode/mouseevent.html
type: codeevent
version: Egret引擎 v1.x
---

鼠标事件相关。由于js的this是动态的，所以添加和删除事件的时候，需要传入this参数。

####ActionScript 3 Code

{% highlight java linenos %}
var sprite:Sprite = new Sprite();
sprite.addEventListener(MouseEvent.CLICK, onMouseHandler);
sprite.addEventListener(MouseEvent.MOUSE_DOWN, onMouseHandler);
sprite.addEventListener(MouseEvent.MOUSE_UP, onMouseHandler);
sprite.addEventListener(MouseEvent.MOUSE_MOVE, onMouseHandler, true);
sprite.removeEventListener(MouseEvent.MOUSE_MOVE,onMouseHandler, true);
function onMouseHandler(event:MouseEvent):void
{
	var stageX:Number = event.stageX;
	var stageY:Number = event.stageY;
	var localX:Number = event.localX;
	var localY:Number = event.localY;
	var target:Object = event.target;
	var currentTarget:Object = event.currentTarget;
}
{% endhighlight %}

####Egret Code

{% highlight java linenos %}
var sprite:egret.Sprite = new egret.Sprite();
sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, onMouseHandler, this);
sprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onMouseHandler, this);
sprite.addEventListener(egret.TouchEvent.TOUCH_END, onMouseHandler, this);
sprite.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMouseHandler, this, true);
sprite.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onMouseHandler,this, true);
function onMouseHandler(event:egret.TouchEvent):void
{
    var stageX:number = event.stageX;
    var stageY:number = event.stageY;
    var localX:number = event.localX;
    var localY:number = event.localY;
    var target:any = event.target;
    var currentTarget:any = event.currentTarget;
}
{% endhighlight %}