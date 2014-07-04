---
layout: demopost
title:  TextField文本斜切
permalink: demo/textfieldskew.html
type: demo
element: demotext
version: Egret引擎 v1.x
codedes: TextField文本斜切操作
documentclass: TextFieldSkewTest
---

###Code

{% highlight java linenos %}
class TextFieldSkewTest extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {

        //加粗
        var label1:egret.TextField = new egret.TextField();
        label1.width = 450;
        label1.x = 50;
        label1.y = 50;
        label1.skewX = 50;
        label1.text = "加粗";
        this.addChild( label1 );

        //斜体
        var label2:egret.TextField = new egret.TextField();
        label2.width = 450;
        label2.x = 100;
        label2.y = 100;
        label2.skewY = 50;
        label2.text = "斜体";
        this.addChild( label2 );

    }

}
{% endhighlight %}