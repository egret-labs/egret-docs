---
layout: codeonline
title:  "Graphics实例代码对比"
permalink: as2ts/webglcode/graphics.html
type: codewebgl
version: Egret引擎 v1.x
---

webgl的graphics示例，<a href="http://static.egret-labs.org/egret-game/webgl/graphics/launcher/release.html" target="_blank">点击查看演示</a>。

####ActionScript 3 Code

{% highlight java  %}
private function createGameScene():void {
    this.shape = new Shape();
    this.addChild(this.shape);
    this.shape.width = 480;
    this.shape.height = 800;

    this.count = 0;

    this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
}

private function onEnterFrame(event:Event):void {
    this.count += 0.1;
    var graphics = this.shape.graphics;
    graphics.clear();
    graphics.lineStyle(30, 0xff0000, 1);
    graphics.beginFill(0xffff00, 0.4);

    graphics.moveTo(100 + Math.sin(this.count) * 20, 200 + Math.cos(this.count) * 20);
    graphics.lineTo(360 + Math.cos(this.count) * 20, 200 + Math.sin(this.count) * 20);
    graphics.lineTo(360 + Math.sin(this.count) * 20, 420 + Math.cos(this.count) * 20);
    graphics.lineTo(100 + Math.cos(this.count) * 20, 420 + Math.sin(this.count) * 20);
    graphics.lineTo(100 + Math.sin(this.count) * 20, 200 + Math.cos(this.count) * 20);
    graphics.endFill();
}
{% endhighlight %}

####Egret Code

{% highlight java  %}
private createGameScene():void {
    this.shape = new egret.Shape();
    this.addChild(this.shape);
    this.shape.width = 480;
    this.shape.height = 800;

    this.count = 0;

    this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
}

private onEnterFrame(event:egret.Event):void {
    this.count += 0.1;
    var graphics = this.shape.graphics;
    graphics.clear();
    graphics.lineStyle(30, 0xff0000, 1);
    graphics.beginFill(0xffff00, 0.4);

    graphics.moveTo(100 + Math.sin(this.count) * 20, 200 + Math.cos(this.count) * 20);
    graphics.lineTo(360 + Math.cos(this.count) * 20, 200 + Math.sin(this.count) * 20);
    graphics.lineTo(360 + Math.sin(this.count) * 20, 420 + Math.cos(this.count) * 20);
    graphics.lineTo(100 + Math.cos(this.count) * 20, 420 + Math.sin(this.count) * 20);
    graphics.lineTo(100 + Math.sin(this.count) * 20, 200 + Math.cos(this.count) * 20);
    graphics.endFill();

    //webgl需要cacheAsBitmap才能显示
    this.shape.cacheAsBitmap = true;
}
{% endhighlight %}