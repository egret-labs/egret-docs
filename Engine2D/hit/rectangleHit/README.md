
碰撞检测，判断显示对象是否与一点相交。

矩形碰撞检测，是判断显示对象的包围盒是否与一点相交。

Egret 提供 `hitTestPoint()` 方法进行碰撞检测，矩形碰撞检测的用法为：

```
var isHit:boolean = shp.hitTestPoint( x: number, y:number );
```

`shp` 是待检测的显示对象，(x, y)是待检测的点的位置。如果发生碰撞，则方法返回 `true`,如果没有发生碰撞，则返回 `false`。

* 示例代码1：

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
       this.infoText.text = "isHit: " + isHit;

   }

   private infoText:egret.TextField;
   private drawText()
   {
       this.infoText = new egret.TextField();
       this.infoText.y = 200;
       this.infoText.text = "isHit";
       this.addChild( this.infoText );
   }
}
```

编译调试后，效果如下图：

![](5565345c3987a.png)

文本中返回碰撞的结果，显示为 `true`，表示发生了碰撞。

* 示例代码2：

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
       shp.graphics.drawCircle( 0, 0, 20);
       shp.graphics.endFill();
       shp.width = 100;
       shp.height = 100;
       this.addChild( shp );

       var isHit:boolean = shp.hitTestPoint( 25, 25 );
       this.infoText.text = "isHit: " + isHit;
   }

   private infoText:egret.TextField;
   private drawText()
   {
       this.infoText = new egret.TextField();
       this.infoText.y = 200;
       this.infoText.text = "isHit: ";
       this.addChild( this.infoText );
   }
}
```

编译调试后，效果如下图：

![](5565345c3d62d.png)

文本中返回碰撞的结果，显示为 `true`，表示发生了碰撞。

>注意：该点并未与红色圆形直接相交，而是与红色圆形的包围盒相交。
