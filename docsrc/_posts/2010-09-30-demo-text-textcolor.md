---
layout: demopost
title:  TextField文本颜色
permalink: demo/textfieldcolor.html
type: demo
element: demotext
version: Egret引擎 v1.x
codedes: TextField文本创建，以及更改文本颜色
documentclass: TextFieldColorTest
---

###Code

{% highlight java  %}
class TextFieldColorTest extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //红色文本
        var label1:egret.TextField = new egret.TextField();
        label1.width = 450;
        label1.textColor = 0xff0000;
        label1.text = "这是一段红色的文本";
        this.addChild( label1 );

        //绿色文本
        var label2:egret.TextField = new egret.TextField();
        label2.width = 450;
        label2.y = 50;
        label2.textColor = 0x00ff00;
        label2.text = "这是一段绿色的文本";
        this.addChild( label2 );

        //蓝色文本
        var label3:egret.TextField = new egret.TextField();
        label3.width = 450;
        label3.y = 100;
        label3.textColor = 0x0000ff;
        label3.text = "这是一段蓝色的文本";
        this.addChild( label3 );

        //灰色文本
        var label4:egret.TextField = new egret.TextField();
        label4.width = 450;
        label4.y = 150;
        label4.textColor = 0xcccccc;
        label4.text = "这是一段灰色的文本";
        this.addChild( label4 );
    }

}
{% endhighlight %}