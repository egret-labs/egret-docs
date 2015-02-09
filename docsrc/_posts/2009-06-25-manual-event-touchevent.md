---
layout: post
title:  "触摸事件"
permalink: post/manual/event/touchevent.html
type: manual
element: manualevent
version: Egret引擎 v1.x
---


对于移动游戏，最常用的用户交互事件类型莫过于触摸事件。在Egret中使用触摸事件与其他事件方式相同。但你需要注意对接受触摸事件的对象设置`touchEnabled`属性。

我们来看一段代码片段


{% highlight java linenos %}
class TouchEventTest extends egret.DisplayObjectContainer
{

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //添加显示文本
        this.drawText();

        //绘制一个透明度为1的绿色矩形，宽高为100*80
        var spr1:egret.Sprite = new egret.Sprite();
        spr1.graphics.beginFill(0x00ff00, 1);
        spr1.graphics.drawRect(0, 0, 100, 80);
        spr1.graphics.endFill();
        spr1.width = 100;
        spr1.height = 80;
        this.addChild( spr1 );
        //开启spr1的Touch开关
        spr1.touchEnabled = true;

        //注册事件
        spr1.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTaps, this, true);
    }

    private onTouch( evt:egret.TouchEvent )
    {
        this.txt.text += "\n点击了spr1";
    }

    private onTouchTap( evt:egret.TouchEvent )
    {
        this.txt.text += "\n容器冒泡侦听\n---------";
    }

    private onTouchTaps( evt:egret.TouchEvent )
    {
        this.txt.text += "\n容器捕获侦听";
    }

    //绘制文本
    private  txt:egret.TextField;
    private drawText():void
    {
        this.txt = new egret.TextField();
        this.txt.size = 12;
        this.txt.x = 250;
        this.txt.width = 200;
        this.txt.height = 200;
        this.txt.text = "事件文字";
        this.addChild( this.txt );
    }

}
{% endhighlight %}

上面的代码片段中，我们设置了对象`Spr1`的`touchEnabled`属性，其值为true。此时即开启了`Spr1`的触摸接受机制。当前对象即可接收到来自用户的触摸。

