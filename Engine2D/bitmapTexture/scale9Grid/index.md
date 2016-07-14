# 九宫格的使用

通常情况下为了游戏画面中的美观程度，我们或多或少都会使用一些圆角矩形或者边缘不规则的矩形。 在游戏中，我们经常会对这些图形进行拉伸。那么拉伸后的图形会发生变形。为了让边缘不会因为拉伸而变形，我们需要一个解决办法。 这个办法就是“九宫格”。

九宫格在使用的时候有两种方法，这里我们仅仅介绍其中一种，另外一种会在GUI系统中进行介绍。

先来看一下一个圆角矩形的样子。

![](556564e1ddd8d.png)

上图中我们绘制了一个简单的圆角矩形，如果此时我们将这个圆角矩形横向拉伸，那么我们可以看到，边缘的拉伸变化如下图：

![](556564e1e524c.png)

上面的效果是我们不希望看到的，我们希望能够最终效果像下图一样。无论我的图片如何拉伸，他的圆角始终不会变形。

![](556564e1e5d41.png)

有了这个思路，我们就可以使用九宫格系统了，我们来看一下，九宫格到底包含哪些东西。

![](556564e1e68d5.png)

上图中，我们用四条虚线将圆角矩形分割为9个区域，其中四个区域(图中区域编号1，3，7，9)包含了我们圆角矩形的四个圆角。 那么在设置这样的九宫格参数后，我们再次拉伸我们的图像就不会发生变形的现象。

设置九宫格的属性是 Bitmap 类中的 scale9Grid 属性。

我们来看一个完整的示例，这个示例中，我们显示一个圆角矩形，同时放置两个Bitmap对象，两个Bitmap对象都将 width 设置 为原来的2倍。 但其中一个添加九宫格数据，另外一个不添加九宫格数据。具体代码如下：

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
        this.addChild(img);
        var img2:egret.Bitmap = new egret.Bitmap();
        img2.texture = RES.getRes("box");
        var rect:egret.Rectangle = new egret.Rectangle(30,31,40,41);
        img2.scale9Grid =rect;
        img2.width *= 2;
        img2.y = 150;
        this.addChild(img2);
    }
}
```

编译后运行，效果如图：

![](556564e1e68d5.png)

大家注意，我们上面的代码中创建了一个类型为 Rectangle 的对象。该对象就是用来存放九宫格数据的。 初始化时候我们填入了四个参数。这四个参数分表表示什么呢？下面做一个解答，你需要对照着上面的九宫格区域图来理解。

30：区域1 的宽度值。

31：区域1 的高度值

40：区域2 的宽度值

41：区域4 的高度值

>注意：设置九宫宽高的时候尽量使用整数，否则有些浏览器可能会出现“黑线”。


### 错误处理

设置图片的九宫格是个常用的功能，不过如果不小心设置错了，很容易导致显示的异常。 在 Egret 2.5.5 中对这一异常进行了控制，当九宫格设置参数错误的情况下，会发出警告并且不显示这个错误的九宫格图片。并且以前的移动端浏览器是不会显示错误的九宫格设置的，这样可以统一移动端和PC端的表现。

在正常情况下，九宫格的区域的宽度和高度要小于图片的宽度和高度，位置在图片内部。如果设置的九宫格位置或者宽度和高度异常的情况下会报如下错误：

```
Warning #1018: 9宫格设置错误
```

具体来讲正确的九宫格设置为:
```
x + w < 图片宽度;
y + h < 图片高度;
```
其中`x`和`y`是设置九宫格的位置，w和h为设置九宫格的宽和高。其中 x,y,w,h 应大于等于 0。

> 在 Egret 3.0.3 之前的版本中 x,y,w,h 是不能设置为 0 的。
