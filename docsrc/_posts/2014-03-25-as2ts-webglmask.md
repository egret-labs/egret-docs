---
layout: codeonline
title:  "Mask实例代码对比"
permalink: as2ts/webglcode/mask.html
type: codewebgl
version: Egret引擎 v1.x
---

webgl遮罩实现，<a href="http://egret-game.b0.upaiyun.com/webgl/mask/launcher/release.html" target="_blank">点击查看演示</a>。

####ActionScript 3 Code

{% highlight java linenos %}
private var ballContainer:Sprite;

private function createGameScene():void {
    this.ballContainer = new Sprite();
    this.addChild(this.ballContainer);

    for (var i:int = 0; i < 15; i++) {
        var ball:Bitmap = this.createBitmapByName("ball");
        ball.x = Math.floor(Math.random() * (stage.stageWidth - 80));
        ball.y = Math.floor(Math.random() * (stage.stageHeight - 80));
        ball.scaleX = ball.scaleY = 0.5;
        this.ballContainer.addChild(ball);
    }

    var mask:Shape = new Shape(0, 0, stage.stageWidth, stage.stageHeight);
    mask.graphics.beginFill(0xff0000);
    mask.graphics.drawRect(0,0,1,1);
    mask.graphics.endFill();
    this.ballContainer.addChild(mask);

    this.ballContainer.mask = mask;
    mask.width = stage.stageWidth;
    mask.height = stage.stageHeight;
    tweenSmall();
    function tweenSmall():void{
        TweenLite.to(mask, .5, {x:stage.stageWidth / 3, y:stage.stageHeight / 3,
            width:stage.stageWidth / 3, height:stage.stageHeight / 3, onComplete:tweenBig});
    }
    function tweenBig():void{
        TweenLite.to(mask, .5, {x:0, y:0, width:stage.stageWidth, height:stage.stageHeight, onComplete:tweenSmall});
    }
}
{% endhighlight %}

####Egret Code

{% highlight java linenos %}
private ballContainer:egret.DisplayObjectContainer;

private createGameScene():void {
    this.ballContainer = new egret.DisplayObjectContainer();
    this.addChild(this.ballContainer);

    var stage:egret.Stage = egret.MainContext.instance.stage;
    for (var i:number = 0; i < 15; i++) {
        var ball:egret.Bitmap = this.createBitmapByName("ball");
        ball.x = Math.floor(Math.random() * (stage.stageWidth - 80));
        ball.y = Math.floor(Math.random() * (stage.stageHeight - 80));
        ball.scaleX = ball.scaleY = 0.5;
        this.ballContainer.addChild(ball);
    }

    var mask:egret.Rectangle = new egret.Rectangle(0, 0, stage.stageWidth, stage.stageHeight);
    this.ballContainer.mask = mask;
    egret.Tween.get(mask, {loop:true})
        .to({x:stage.stageWidth / 3, y:stage.stageHeight / 3,
            width:stage.stageWidth / 3, height:stage.stageHeight / 3}, 500)
        .to({x:0, y:0, width:stage.stageWidth, height:stage.stageHeight}, 500);
}
{% endhighlight %}