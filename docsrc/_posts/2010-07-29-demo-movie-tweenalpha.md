---
layout: demopost
title:  Tween透明度
permalink: demo/tweenalpha.html
type: demo
element: demomovie
version: Egret引擎 v1.x
codedes: Tween透明度操作
documentclass: TweenAlphaTest
---

###Code

{% highlight java  %}
class TweenAlphaTest extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //绘制一个透明度为1的红色矩形，宽高为200*200
        var spr1:egret.Sprite = new egret.Sprite();
        spr1.graphics.beginFill(0xff0000, 1);
        spr1.graphics.drawRect(0, 0, 200, 200);
        spr1.graphics.endFill();
        spr1.width = 100;
        spr1.height = 80;
        spr1.x = 50;
        spr1.y = 50;
        this.addChild( spr1 );

        //执行alpha从0到1的动画，并且循环执行
        egret.Tween.get(spr1, { loop: true }).to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
    }

}
{% endhighlight %}