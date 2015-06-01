---
layout: demopost
title:  TextField文本缩放
permalink: demo/textfieldscale.html
type: demo
element: demotext
version: Egret引擎 v1.x
codedes: TextField文本缩放操作
documentclass: TextFieldScaleTest
---

###Code

{% highlight java  %}
class TextFieldScaleTest extends  egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //默认字体样式
        var label:egret.TextField = new egret.TextField();
        label.width = 450;
        label.bold = true;
        label.text = "默认字体样式";
        this.addChild( label );

        //scaleX
        var label1:egret.TextField = new egret.TextField();
        label1.width = 450;
        label1.y = 50;
        label1.scaleX = 0.5;
        label1.text = "scaleX为0.5";
        this.addChild( label1 );

        //scaleY
        var label2:egret.TextField = new egret.TextField();
        label2.width = 450;
        label2.y = 100;
        label2.scaleY = 2;
        label2.text = "scaleY为2";
        this.addChild( label2 );
    }

}
{% endhighlight %}