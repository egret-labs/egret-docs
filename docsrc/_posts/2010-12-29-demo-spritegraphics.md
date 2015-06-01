---
layout: demopost
title:  Sprite绘制矢量图
permalink: demo/spritegraphics.html
type: demo
element: demodisplay
version: Egret引擎 v1.x
codedes: Sprite创建以及简单几何形状适量绘图
documentclass: SpriteGraphicsTest
---

###Code

{% highlight java  %}
class SpriteGraphicsTest extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        var spr1:egret.Sprite = new egret.Sprite();
        spr1.graphics.beginFill(0x00ff00, 1);
        spr1.graphics.drawRect(0, 0, 100, 80);
        spr1.graphics.endFill();
        this.addChild( spr1 );

        //绘制一个透明度为0.5的红色圆形, 半径为100，同时x轴为160，y轴为170
        var spr2:egret.Sprite = new egret.Sprite();
        spr2.graphics.beginFill(0xff0000, 0.5);
        spr2.graphics.drawCircle( 0, 0, 50 );
        spr2.graphics.endFill();
        spr2.x = 160;
        spr2.y = 170;
        this.addChild( spr2 );

        //绘制一个透明度为0.7的蓝色直线
        var  spr3:egret.Sprite = new egret.Sprite();
        spr3.graphics.lineStyle( 3, 0x0000ff, 0.7, true );
        spr3.graphics.moveTo( 320, 200 );
        spr3.graphics.lineTo( 380, 300 );
        spr3.graphics.endFill();
        this.addChild( spr3 );

    }

}
{% endhighlight %}