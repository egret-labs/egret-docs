---
layout: codeonline
title:  "BlendMode实例代码对比"
permalink: as2ts/webglcode/blendMode.html
type: codewebgl
version: Egret引擎 v1.x
---

BlendMode叠加效果，<a href="http://static.egret-labs.org/egret-game/webgl/blendMode/launcher/release.html" target="_blank">点击查看演示</a>。

####ActionScript 3 Code

{% highlight java  %}
private function createGameScene():void {
    this.laserList = [];
    this.p1 = new Point();
    this.p2 = new Point();
    this.tick = 0;
    this.speed = 80;
    this.gameWidth = 480;
    this.gameHeight = 800;

    var bg:Bitmap = this.createBitmapByName("laserBG");
    bg.width = this.gameWidth;
    bg.height = this.gameHeight;
    this.addChild(bg);

    this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
}
private function onEnterFrame(event:Event):void {
    this.tick++;
    if (this.speed > 2) {
        if (this.tick >= this.speed) {
            this.addLaser(Math.random() > 0.5 ? 0 : 1);
            this.speed *= 0.9;
            this.tick = 0;
        }
    }
    else if (this.tick % 2 == 0) {
        this.addLaser(1);
    }
    else {
        this.addLaser(0);
    }
}

private function addLaser(type:int):void {
    var laser:Bitmap = this.getLaser(Math.floor(Math.random() * 5) + 1);
    if (type == 0) {
        this.p1.x = -20;
        this.p1.y = Math.random() * this.gameHeight;
        this.p2.x = this.gameWidth + 20;
        this.p2.y = Math.random() * this.gameHeight;
    }
    else {
        this.p1.x = Math.random() * this.gameWidth;
        this.p1.y = -20;
        this.p2.x = Math.random() * this.gameWidth;
        this.p2.y = this.gameHeight + 20;
    }
    laser.width = Point.distance(this.p1, this.p2);
    laser.x = this.p1.x;
    laser.y = this.p1.y;
    var range:int = Math.atan2(this.p2.y - this.p1.y, this.p2.x - this.p1.x);
    laser.rotation = range * 180 / Math.PI;
    this.addChild(laser);
    laser.alpha = 1;
    laser.scaleY = 1 + Math.random();
    TweenLite.to(laser, 0.2, {onComplete:waitComplete});

    function waitComplete():void {
    	TweenLite.to(laser, 0.3, {alpha: 0.2, scaleY: 0.2, onComplete:complete});
    }

    function complete():void {
    	this.removeChild(laser);
    	this.laserList.push(laser);
    }
}
{% endhighlight %}

####Egret Code

{% highlight java  %}
private createGameScene():void {
    this.laserList = [];
    this.p1 = new egret.Point();
    this.p2 = new egret.Point();
    this.tick = 0;
    this.speed = 80;
    this.gameWidth = 480;
    this.gameHeight = 800;

    var bg:egret.Bitmap = this.createBitmapByName("laserBG");
    bg.width = this.gameWidth;
    bg.height = this.gameHeight;
    this.addChild(bg);

    this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
}
private onEnterFrame(event:egret.Event):void {
    this.tick++;

    if (this.speed > 2) {
        if (this.tick >= this.speed) {
            this.addLaser(Math.random() > 0.5 ? 0 : 1);
            this.speed *= 0.9;
            this.tick = 0;
        }
    }
    else if (this.tick % 2 == 0) {
        this.addLaser(1);
    }
    else {
        this.addLaser(0);
    }
}

private addLaser(type:number):void {
    var laser:egret.Bitmap = this.getLaser(Math.floor(Math.random() * 5) + 1);
    if (type == 0) {
        this.p1.x = -20;
        this.p1.y = Math.random() * this.gameHeight;
        this.p2.x = this.gameWidth + 20;
        this.p2.y = Math.random() * this.gameHeight;
    }
    else {
        this.p1.x = Math.random() * this.gameWidth;
        this.p1.y = -20;
        this.p2.x = Math.random() * this.gameWidth;
        this.p2.y = this.gameHeight + 20;
    }
    laser.width = egret.Point.distance(this.p1, this.p2);
    laser.x = this.p1.x;
    laser.y = this.p1.y;
    var range:number = Math.atan2(this.p2.y - this.p1.y, this.p2.x - this.p1.x);
    laser.rotation = range * 180 / Math.PI;
    this.addChild(laser);
    laser.alpha = 1;
    laser.anchorY = 0.5;
    laser.scaleY = 1 + Math.random();
    egret.Tween.get(laser).wait(200).to({alpha: 0.2, scaleY: 0.2}, 300).call(function (laser) {
        this.removeChild(laser);
        this.laserList.push(laser);
    }, this, [laser]);
}
{% endhighlight %}