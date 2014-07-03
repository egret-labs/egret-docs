---
layout: codeonline
title:  "Sprite硬件渲染代码对比"
permalink: as2ts/webglcode/sprite.html
type: codewebgl
version: Egret引擎 v1.x
---

使用WebGL绘制图片，<a href="hhttp://egret-game.b0.upaiyun.com/webgl/sprite/launcher/release.html" target="_blank">点击查看演示</a>。

####ActionScript 3 Code

{% highlight java linenos %}
private var ball:Sprite;
private function createGameScene():void {
    //flash中没有锚点属性
    var bitmap:Bitmap = this.createBitmapByName("ball");
    bitmap.x = -bitmap.width >> 1;
    bitmap.y = -bitmap.height >> 1;
    this.ball = new Sprite();
    this.ball.x = 200;
    this.ball.y = 200;
    this.ball.addChild(bitmap);
    this.addChild(this.ball);
    this.ball.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
}
private function onEnterFrame(event:Event):void {
    this.ball.rotation += 3;
}
{% endhighlight %}

####Egret Code

{% highlight java linenos %}
private var ball:egret.Bitmap;
private createGameScene():void {
    egret.Profiler.getInstance().run();
    this.ball = this.createBitmapByName("ball");
    this.ball.x = 200;
    this.ball.y = 200;
    this.ball.anchorX = .5;
    this.ball.anchorY = .5;
    this.addChild(this.ball);
    this.ball.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
}
private onEnterFrame(event:egret.Event):void {
    this.ball.rotation += 3;
}
{% endhighlight %}