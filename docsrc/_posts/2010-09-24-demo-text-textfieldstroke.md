---
layout: demopost
title:  TextField文本描边
permalink: demo/textfieldstroke.html
type: demo
element: demotext
version: Egret引擎 v1.x
codedes: TextField文本描边操作
documentclass: TextFieldStrokeTest
---

###Code

{% highlight java  %}
class TextFieldStrokeTest extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //绘制一个绿色文字，同时带有红色描边
        var strokeLabel:egret.TextField = new egret.TextField();
        strokeLabel.width = 450;
        strokeLabel.height = 450;
        strokeLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
        strokeLabel.textAlign = egret.HorizontalAlign.CENTER;
        strokeLabel.textColor = 0x00ff00;//设置文本颜色
        strokeLabel.text = "描边";
        strokeLabel.strokeColor = 0xFF0000;//设置描边颜色
        strokeLabel.stroke = 2;//设置描边的宽度
        this.addChild(strokeLabel);
    }

}
{% endhighlight %}