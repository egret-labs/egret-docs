碰撞检测在游戏中是非常重要的功能，例如我们制作一款打飞机游戏，当子弹与飞机发生碰撞的时候我们可以认为游戏结束。此时碰撞的过程需要进行碰撞检测操作。

在Egret中，我们提供了碰撞检测的功能。


## 精确碰撞检测

> 在 Egret Engine 2.5.6 中开始支持精确碰撞检测

另外一种检测方法依然使用的是 `hitTestPoint` 这个方法，但我们需要使用该方法的第三个参数。在刚才的示例中，我们看到检测代码使用了这样的语句。

`shp.hitTestPoint( 10, 10 );`

这样是可以检测一个点与DisplayObject最小范围值的碰撞判断。但如果我们想更加精确的检测图像是否与一个点发生了碰撞，我们需要将第三个参数设置为 `true`。

我们来看一下具体代码：

```
var shp:egret.Shape = new egret.Shape();
shp.graphics.beginFill( 0xff0000 );
shp.graphics.drawRect( 0,0,100,100);
shp.graphics.endFill();
shp.width = 100;
shp.height = 100;
this.addChild( shp );

var isHit:boolean = shp.hitTestPoint( 10, 10, true );
this.infoText.text = "碰撞结果" + isHit;
```

这段代码运行后效果与上面的效果相同，如图：

![](5565345c3987a.png)

我们稍微修改一下代码，将原来宽高为100的正方形修改为一个半径为20的圆形。代码如下：

```
var shp:egret.Shape = new egret.Shape();
shp.graphics.beginFill( 0xff0000 );
shp.graphics.drawCircle( 0, 0, 20);
shp.graphics.endFill();
shp.width = 100;
shp.height = 100;
this.addChild( shp );

var isHit:boolean = shp.hitTestPoint( 25, 25, true );
this.infoText.text = "碰撞结果" + isHit;
```

编译运行后我们可以看到效果如下：

![](5565345c3d61d.png)  

这样修改后，Egret则执行精确碰撞检测，精确的碰撞检测并非测量DisplayObject包围盒是否和某一点相交，而是测量DisplayObject中的图案是否和指定的点相交。

>大量使用精确碰撞检测，会消耗更多的性能