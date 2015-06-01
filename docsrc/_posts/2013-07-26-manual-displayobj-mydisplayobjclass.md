---
layout: post
title:  "创建自己的显示对象类"
permalink: post/manual/displayobj/selfdisplayclass.html
type: manual
element: manualdisplayobj
version: Egret引擎 v1.x
---

自定义显示对象类需要继承自DisplayObject的具体子类，例如Shape或者TextField。

下面我们来创建一个自己的显示对象。我们把这个显示对象称之为 `MyGrid` 。

创建一个名称为 `MyGrid` 的类，并且继承自 `Shape` 。具体代码如下：

{% highlight java  %}
class MyGrid extends egret.Shape
{
    public constructor()
    {
        super();
        this.drawGrid();
    }

    private drawGrid()
    {
        this.graphics.beginFill( 0x0000ff );
        this.graphics.drawRect( 0, 0, 50,50 );
        this.graphics.drawRect( 50, 50, 50, 50);
        this.graphics.beginFill( 0xff0000 );
        this.graphics.drawRect( 50, 0, 50,50 );
        this.graphics.drawRect( 0, 50, 50,50 );
        this.graphics.endFill();
    }
}
{% endhighlight %}

在 `MyGrid` 我们绘制了一个红蓝相间的2*2格子，然后我们创建一个新的文档类，名称为 `GridMain` ，在文档类中创建并显示我们的 `MyGrid`，具体代码如下：

{% highlight java  %}
class GridMain extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        var _myGrid:MyGrid = new MyGrid();
        this.addChild( _myGrid );
    }
}
{% endhighlight %}

编写保存后，在 `egretProperties.json` 文件中将文档类改为 `GridMain`，编译并测试，你会在浏览器中看到如下图效果。

![grid]({{site.baseurl}}/assets/img/mygrid.png)