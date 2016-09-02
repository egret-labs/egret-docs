位图的填充方式有两种，第一种是拉伸图像以填充区域，第二种是重复图像以填充区域。 当你创建一个 Bitmap 对象时会默认选择第一种填充方式。我们看下面一个示例代码，这个示例中，我们使用默认的 填充方式，使用的纹理图片为一张100*100的图片。我们将图像宽度设置为2倍，高度设置为3倍。

```
class BitmapTest extends egret.DisplayObjectContainer{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("preload");
    }
    private onGroupComp()
    {
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("box");
        img.width *= 2;
        img.height *= 3;
        this.addChild(img);
    }
}
```

编译后运行，效果如图：

![](56614f986ab98.png)

如果我们在游戏中制作一些不停重复排列的地图，那么我们可使用第二种填充方法，依然是这张图片，我们将填充方法设置为重复排列。

设置填充方法需要改变 `Bitmap` 中的 `fillMode` 属性。具体示例代码如下：

```
class BitmapTest extends egret.DisplayObjectContainer{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("preload");
    }
    private onGroupComp()
    {
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("box");
        img.fillMode = egret.BitmapFillMode.REPEAT;
        img.width *= 2;
        img.height *= 3;
        this.addChild(img);
    }
}
```

编译后运行，效果如图：

![](56614f988d39e.png)

我们可以看到，原来一头被拉伸的猪变成了三行两列共六头猪。

