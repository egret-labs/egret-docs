---
layout: post
title:  "碰撞检测"
permalink: post/manual/displayobj/hittest.html
type: manual
element: manualdisplayobj
version: Egret引擎 v1.x
---

碰撞检测在游戏中是非常重要的功能，例如我们制作一款打飞机游戏，当子弹与飞机发生碰撞的时候我们可以认为游戏结束。此时碰撞的过程需要进行碰撞检测操作。

在Egret中，我们提供了碰撞检测的功能，同时该功能提供两种不同的碰撞检测方式。

####第一种检测方法
---

我们来看一下具体代码：

{% highlight java linenos %}
class HitTest extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        this.drawText();

        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0xff0000 );
        shp.graphics.drawRect( 0,0,100,100);
        shp.graphics.endFill();
        shp.width = 100;
        shp.height = 100;
        this.addChild( shp );

        var isHit:boolean = shp.hitTestPoint( 10, 10 );
        this.infoText.text = "碰撞结果" + isHit;

    }

    private infoText:egret.TextField;
    private drawText()
    {
        this.infoText = new egret.TextField();
        this.infoText.y = 200;
        this.infoText.text = "碰撞结果";
        this.addChild( this.infoText );
    }
}
{% endhighlight %}

编译并测试上面的代码后，我们可以看到效果如图：

![hittest]()

文本中返回碰撞的结果，显示为 `true`，表示发生了碰撞。这里示例中执行碰撞检测的语句是

`var isHit:boolean = shp.hitTestPoint( 10, 10 );`

`hitTestPoint` 这个方法是执行一次碰撞检测，检测的对象是当前 `shp` 是否与坐标为（10, 10）的点发生了碰撞。如果发生碰撞，则方法返回 `true`，如果没有发生碰撞，则返回 `false`。


####第二种检测方法
---

另外一种检测方法依然使用的是 `hitTestPoint` 这个方法，但我们需要使用该方法的第三个参数。在刚才的示例中，我们看到检测代码使用了这样的语句。

`shp.hitTestPoint( 10, 10 );`

这样是可以检测一个点与DisplayObject最小范围值的碰撞判断。但如果我们想更加精确的检测图像是否与一个点发生了碰撞，我们需要将第三个参数设置为 `true`。

我们来看一下具体代码：


{% highlight java linenos %}
var shp:egret.Shape = new egret.Shape();
shp.graphics.beginFill( 0xff0000 );
shp.graphics.drawRect( 0,0,100,100);
shp.graphics.endFill();
shp.width = 100;
shp.height = 100;
this.addChild( shp );

var isHit:boolean = shp.hitTestPoint( 10, 10, true );
this.infoText.text = "碰撞结果" + isHit;
{% endhighlight %}

这段代码运行后效果与上面的效果相同，如图：

![hittest]()

我们稍微修改一下代码，将原来宽高为100的正方形修改为一个半径为20的圆形。代码如下：

{% highlight java linenos %}
var shp:egret.Shape = new egret.Shape();
shp.graphics.beginFill( 0xff0000 );
shp.graphics.drawCircle( 0, 0, 20);
shp.graphics.endFill();
shp.width = 100;
shp.height = 100;
this.addChild( shp );

var isHit:boolean = shp.hitTestPoint( 25, 25, true );
this.infoText.text = "碰撞结果" + isHit;
{% endhighlight %}

编译运行后我们可以看到效果如下：

![hittest]()

这样修改后，Egret则执行精确碰撞检测，精确的碰撞检测并非测量DisplayObject包围盒是否和某一点相交，而是测量DisplayObject中的图案是否和制定的点相交。

>官方推荐不要大量使用精确碰撞检测，精确碰撞检测会消耗更多的性能。