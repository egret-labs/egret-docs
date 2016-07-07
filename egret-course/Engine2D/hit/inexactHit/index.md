碰撞检测在游戏中是非常重要的功能，例如我们制作一款打飞机游戏，当子弹与飞机发生碰撞的时候我们可以认为游戏结束。此时碰撞的过程需要进行碰撞检测操作。

在Egret中，我们提供了碰撞检测的功能。

## 非精确碰撞检测

我们来看一下具体代码：

```
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
```

编译并测试上面的代码后，我们可以看到效果如图：

![](5565345c3987a.png)

文本中返回碰撞的结果，显示为 `true`,表示发生了碰撞。这里示例中执行碰撞检测的语句是

`var isHit:boolean = shp.hitTestPoint( 10, 10 );`

`hitTestPoint` 这个方法是执行一次碰撞检测,检测的对象是当前 `shp` 是否与坐标为（10, 10）的点发生了碰撞。如果发生碰撞，则方法返回 `true`,如果没有发生碰撞，则返回 `false`。

