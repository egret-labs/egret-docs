---
layout: demopost
title:  Display类
permalink: demo/display.html
type: demo
element: demodisplay
version: Egret引擎 v1.x
codedes: Display创建以及绘图方法的使用
documentclass: Game
---

###Code

{% highlight java linenos %}
class Game extends egret.DisplayObjectContainer {

public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
}
    
    private rr:egret.Shape;
    public addStage(event:egret.Event):void
    {
        this.rr = new egret.Shape();
        this.rr.graphics.beginFill(0x00ff00);
        this.rr.graphics.drawRect(0,0,100,100);
        this.rr.graphics.endFill();
        this.addChild(this.rr);

        this.startAnimation();
    }

    private startAnimation():void
    {
        var tw = egret.Tween.get(this.rr);
        tw.to({x:280,y:0},500).to({x:280,y:300},500).to({x:0,y:300},500).to({x:0,y:0},500);
        tw.call(this.startAnimation, this);
    }
}
{% endhighlight %}