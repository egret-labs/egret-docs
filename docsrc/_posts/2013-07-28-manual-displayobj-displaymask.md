---
layout: post
title:  "遮罩的使用"
permalink: post/manual/displayobj/displaymask.html
type: manual
element: manualdisplayobj
version: Egret引擎 v1.x
---

遮罩是游戏中非常常用的一种视觉处理手段。例如，游戏中滚动的玩家列表就使用了遮罩这一技术。所谓遮罩就是指定一个显示对象哪些部分可以显示，哪些部分不可以显示。

Egret启用遮罩功能非常的简单，在DisplayObject中，我们暴露了一个名称为 `mask` 的属性，该属性就是用来指定遮罩部分的。

下面一个示例中绘制了两个Shape对象，我们对其中一个Shape使用遮罩，另外一个Shape当做参考。

代码如下：


{% highlight java  %}
class Test extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0xff0000 );
        shp.graphics.drawRect( 0,0,100,100);
        shp.graphics.endFill();
        this.addChild( shp );

        var shp2:egret.Shape = new egret.Shape();
        shp2.graphics.beginFill( 0x00ff00 );
        shp2.graphics.drawCircle( 0,0, 20);
        shp2.graphics.endFill();
        this.addChild( shp2 );
        shp2.x = 20;
        shp2.y = 20;
    }
}
{% endhighlight %}

编译运行后我们可以在浏览器中看到如下效果：

![mask]({{site.baseurl}}/assets/img/mask1.png)

现在对 `shp` 添加遮罩，具体代码如下：

{% highlight java  %}
var rect:egret.Rectangle = new egret.Rectangle(20,20,30,50);
shp.mask = rect;
{% endhighlight %}

我们创建了一个Rectangle类型对象，同时设置他的x为20，y为20，width为30，height为50。将rect赋值给 `shp` 的 `mask` 属性。

编译并运行，我们可以在浏览器中看到如下效果：

![mask]({{site.baseurl}}/assets/img/mask2.png)

可以从上图中看到效果，原先红色的正方形添加了遮罩后只显示了(20,20,30,50)这部分的图像，其他地方的图像都被隐藏掉了。而未添加遮罩的 `shp2` 依然显示完整。