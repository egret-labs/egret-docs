每一个显示对象都包含一个锚点,该锚点默认位于显示对象的左上角。

当设置一个显示对象的坐标位置时,我们会以锚点为参照改变显示对象绘图位置。同时,锚点相对于显示对象的位置也是可以改变的，我们来看一个示例。

```
class AnchorTest extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0x00ff00 );
        shp.graphics.drawRect( 0, 0, 100, 100 );
        shp.graphics.endFill();
        shp.x = 100;
        shp.y = 100;
        this.addChild( shp );
    }
}
```

上面的代码中，我们绘制了一个绿色的正方形，锚点默认在正方形的左上角位置，我们通过设置 `shp` 的 `x`、`y`属性来改变正方形的位置，效果如图：

![](556535128a4a2.png)

现在我们来修改锚点的位置，让锚点居于正方形左上角x轴 50 像素的位置，代码如下：

```
shp.anchorOffsetX = 50;
```

再次编译项目并测试，我们可以从浏览器中看到效果如下：

![](556535128b8ba.png)

我们可以看到，这个绿色的正方形位置依然是x：100，y：100。但实际效果中，正方形的位置和上一张图中的位置有明显的差异。这是因为我们修改了锚点的位置所导致的。

