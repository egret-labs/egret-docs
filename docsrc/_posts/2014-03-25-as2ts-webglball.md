---
layout: codeonline
title:  "Ball实例代码对比"
permalink: as2ts/webglcode/ball.html
type: codewebgl
version: Egret引擎 v1.x
---

持续Touch来添加小球，<a href="http://static.egret-labs.org/egret-game/webgl/ball/launcher/release.html" target="_blank">点击查看演示</a>。

####ActionScript 3 Code

{% highlight java linenos %}
private var isTouching:Boolean = false;
private function onTouchBegin(event:MouseEvent):void {
    this.isTouching = true;
}
private function onTouchEnd(event:MouseEvent):void {
    this.isTouching = false;
}
private var bitmapDataList:Array = [];
private function onEnterFrame(event:Event):void {
    var bitmap:Bitmap;
    if (this.isTouching) {
        for (var j:int = 0; j < 3; j++) {
            bitmap = this.createBitmapByName("ball");
            this.spriteContainer.addChild(bitmap);
            this.bitmapDataList.push({display: bitmap, 
                vx: Math.random() * 3, vy: Math.random() * 3});
            this.ballNumTxt.text = "当前" + this.bitmapDataList.length + "个Bitmap";
        }
    }
    var stage:Stage = this.stage;
    var stageWidth = stage.stageWidth;
    var stageHeight = stage.stageHeight;
    var l:int = this.bitmapDataList.length;
    for (var i:int = 0; i < l; i++) {
        var bitmapData = this.bitmapDataList[i];
        bitmap = bitmapData.display;
        bitmap.x += bitmapData.vx;
        bitmap.y += bitmapData.vy;
        if (bitmap.x < 0 || bitmap.x > stageWidth - 20) {
            bitmapData.vx = -bitmapData.vx;
        }
        if (bitmap.y < 0 || bitmap.y > stageHeight - 20) {
            bitmapData.vy = -bitmapData.vy;
        }
    }
}
{% endhighlight %}

####Egret Code

{% highlight java linenos %}
private isTouching:boolean = false;
private onTouchBegin(event:egret.TouchEvent):void {
    this.isTouching = true;
}
private onTouchEnd(event:egret.TouchEvent):void {
    this.isTouching = false;
}
private bitmapDataList:Array= [];
private onEnterFrame(event:egret.Event):void {
    var bitmap:egret.Bitmap;
    if (this.isTouching) {
        for (var j:number = 0; j < 3; j++) {
            bitmap = this.createBitmapByName("ball");
            this.spriteContainer.addChild(bitmap);
            this.bitmapDataList.push({display: bitmap, 
                vx: Math.random() * 3, vy: Math.random() * 3});
            this.ballNumTxt.text = "当前" + this.bitmapDataList.length + "个Bitmap";
        }
    }
    var stage:egret.Stage = egret.MainContext.instance.stage;
    var stageWidth = stage.stageWidth;
    var stageHeight = stage.stageHeight;
    var l:number = this.bitmapDataList.length;
    for (var i:number = 0; i < l; i++) {
        var bitmapData = this.bitmapDataList[i];
        bitmap = bitmapData.display;
        bitmap.x += bitmapData.vx;
        bitmap.y += bitmapData.vy;
        if (bitmap.x < 0 || bitmap.x > stageWidth - 20) {
            bitmapData.vx = -bitmapData.vx;
        }
        if (bitmap.y < 0 || bitmap.y > stageHeight - 20) {
            bitmapData.vy = -bitmapData.vy;
        }
    }
}

{% endhighlight %}