## 关于显示容器

所有的容器全部继承自 `DisplayObjectContainer` 类，这个名称为 `DisplayObjectContainer` 的类又继承自 `DisplayObject` 。也就是说，在Egret中，所有的容器其实也继承自 `DisplayObject`。

在Egret中,`DisplayObjectContainer` 封装了一些显示列表中常用的功能。在后面的内容中，我们将详细介绍显示列表的操作。这些常用操作主要分为四类：

* 添加、删除子对象

* 访问子对象

* 检测子对象

* 设置叠放次序

## 其他容器

在Egret中，我们还有一个其他的容器：`Sprite`。

如果你查看Sprite类的内容,你会发现，`Sprite`仅仅是继承 `DisplayObjectContainer`。同时添加了一个Graphics功能。

>关于Graphics功能我们会在矢量绘图部分进行详细讲解。

## 自定义容器

想要自定义一个容器非常容易，我们编写一个类，并且继承 DisplayObjectContainer 即可。当然，如果你想实现相关的Graphics绘图功能，你也可以继承 Sprite。

下面是一个自定义容器类的示例，这里我们定义了一个GridSprite。这个类默认会绘制一个红蓝相间的格子。

```
class GridSprite extends egret.Sprite
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
        this.graphics.endFill();
        
        this.graphics.beginFill( 0x0000ff );
        this.graphics.drawRect( 50, 50, 50, 50);
        this.graphics.endFill();
        
        this.graphics.beginFill( 0xff0000 );
        this.graphics.drawRect( 50, 0, 50,50 );
        this.graphics.endFill();
        
        this.graphics.beginFill( 0xff0000 );
        this.graphics.drawRect( 0, 50, 50,50 );
        this.graphics.endFill();
    }
}
```

在文档类中，我们实例化 `GridSprite` 即可。

```
var _myGrid:GridSprite = new GridSprite();  
this.addChild( _myGrid );
```

编译运行效果如下：

![](5565355e688c7.png)

