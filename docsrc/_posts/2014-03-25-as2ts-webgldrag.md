---
layout: codeonline
title:  "Drag实例代码对比"
permalink: as2ts/webglcode/drag.html
type: codewebgl
version: Egret引擎 v1.x
---

拖拽移动小球，使用了精确的碰撞检测，<a href="http://egret-game.b0.upaiyun.com/webgl/drag/launcher/release.html" target="_blank">点击查看演示</a>。

####ActionScript 3 Code

{% highlight java linenos %}
private var currentBall:Bitmap;
private var localX:int;
private var localY:int;
private var ballList:Array;

private function createGameScene():void {
    this.ballList = [];
    for (var i:int = 0; i < 15; i++) {
        var ball:Bitmap = this.createBitmapByName("ball");
        ball.x = Math.floor(Math.random() * (stage.stageWidth - 80));
        ball.y = Math.floor(Math.random() * (stage.stageHeight - 80));
        ball.scaleX = ball.scaleY = 0.5;
        this.addChild(ball);
        this.ballList.push(ball);
    }
    stage.addEventListener(MouseEvent.MOUSE_DOWN, this.onTouchBegin, this);
    stage.addEventListener(MouseEvent.MOUSE_MOVE, this.onTouchMove, this);
    stage.addEventListener(MouseEvent.MOUSE_UP, this.onTouchEnd, this);
    stage.addEventListener(Event.MOUSE_LEAVE, this.onTouchEnd, this);
}

private function onTouchBegin(event:MouseEvent):void {
    for (var i:int = this.ballList.length - 1; i >= 0; i--) {
        var ball:Bitmap = this.ballList[i];
        if (ball.hitTestPoint(event.stageX, event.stageY, true)) {
            this.currentBall = ball;
            var p:Point = ball.globalToLocal(event.stageX, event.stageY);
            this.localX = p.x * this.currentBall.scaleX;
            this.localY = p.y * this.currentBall.scaleY;
            return;
        }
    }
}

private function onTouchMove(event:MouseEvent):void {
    if (this.currentBall) {
        this.currentBall.x = event.stageX - this.localX;
        this.currentBall.y = event.stageY - this.localY;
    }
}

private function onTouchEnd(event:MouseEvent):void {
    this.currentBall = null;
}
{% endhighlight %}

####Egret Code

{% highlight java linenos %}
private currentBall:egret.Bitmap;
private localX:number;
private localY:number;
private ballList:Array<egret.Bitmap>;

private createGameScene():void {
    this.ballList = [];
    var stage:egret.Stage = egret.MainContext.instance.stage;
    for (var i:number = 0; i < 15; i++) {
        var ball:egret.Bitmap = this.createBitmapByName("ball");
        ball.x = Math.floor(Math.random() * (stage.stageWidth - 80));
        ball.y = Math.floor(Math.random() * (stage.stageHeight - 80));
        ball.scaleX = ball.scaleY = 0.5;
        this.addChild(ball);
        this.ballList.push(ball);
    }
    stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin);
    stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove);
    stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd);
    stage.addEventListener(egret.Event.LEAVE_STAGE, this.onTouchEnd);
}

private onTouchBegin(event:egret.TouchEvent):void {
    for (var i:number = this.ballList.length - 1; i >= 0; i--) {
        var ball:egret.Bitmap = this.ballList[i];
        if (ball.hitTestPoint(event.stageX, event.stageY, true)) {
            this.currentBall = ball;
            var p:egret.Point = this.currentBall.globalToLocal(event.stageX, event.stageY);
            this.localX = p.x * this.currentBall.scaleX;
            this.localY = p.y * this.currentBall.scaleY;
            return;
        }
    }
}

private onTouchMove(event:egret.TouchEvent):void {
    if (this.currentBall) {
        this.currentBall.x = event.stageX - this.localX;
        this.currentBall.y = event.stageY - this.localY;
    }
}

private onTouchEnd(event:egret.TouchEvent):void {
    this.currentBall = null;
}
{% endhighlight %}