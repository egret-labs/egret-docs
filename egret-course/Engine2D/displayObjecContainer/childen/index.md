想要获取一个容器的子对象，我们有两种方式可以选择，第一种是通过子对象的深度值来获取子对象，第二种是通过子对象的 name 属性来获取。

## 通过深度值获取子对象

通过深度值获取子对象可以使用 `getChildAt` 方法，具体使用方式如下：

`容器.getChildAt( 深度值 );`

我们来看一段示例代码，这段代码中我们向一个容器中存放了两个方块，通过深度来获取其中一个方块，并调整他的透明度。

```
var sprcon:egret.Sprite = new egret.Sprite();
this.addChild( sprcon );
sprcon.x = 10;

var spr1:egret.Sprite = new egret.Sprite();
spr1.graphics.beginFill( 0xff0000 );
spr1.graphics.drawRect( 0, 0, 100, 100 );
spr1.graphics.endFill();
spr1.x = 50;
spr1.name = "sprite1";
sprcon.addChild( spr1 );

var spr2:egret.Sprite = new egret.Sprite();
spr2.graphics.beginFill( 0x00ff00 );
spr2.graphics.drawRect( 0, 0, 100, 100 );
spr2.graphics.endFill();
spr2.x = 100;
spr2.y = 50;
spr2.name = "sprite2";
sprcon.addChild( spr2 );

var _spr:egret.DisplayObject = sprcon.getChildAt( 1 );
_spr.alpha = 0.5;
```

编译并运行代码，效果如图：

![](566143a3d8886.jpg)

## 通过Name属性获取

第二种方式是通过显示对象的 `name` 属性来获取，这种方式更加直接简单。我们来看一下示例代码：

```
var sprcon:egret.Sprite = new egret.Sprite();
this.addChild( sprcon );
sprcon.x = 10;

var spr1:egret.Sprite = new egret.Sprite();
spr1.graphics.beginFill( 0xff0000 );
spr1.graphics.drawRect( 0, 0, 100, 100 );
spr1.graphics.endFill();
spr1.x = 50;
spr1.name = "sprite1";
sprcon.addChild( spr1 );

var spr2:egret.Sprite = new egret.Sprite();
spr2.graphics.beginFill( 0x00ff00 );
spr2.graphics.drawRect( 0, 0, 100, 100 );
spr2.graphics.endFill();
spr2.x = 100;
spr2.y = 50;
spr2.name = "sprite2";
sprcon.addChild( spr2 );

var _spr:egret.DisplayObject = sprcon.getChildByName( "sprite2" );
_spr.alpha = 0.5;
```

编译并运行代码，效果如图：

![](566143a4018b9.jpg)

## 两种获取子对象方式的比较

我们通过深度值和name属性获取子对象的作用是相同的，但Egret在内部事项原理却大大不同。

使用深度值获取子对象，Egret会根据当前容器的显示列表查找指定深度的显示对象，并作为返回值返回给用户。这种检索方式是快速的，不需要进行大量运算。

通过name属性来获取子对象，Egret内部首先会对当前容器的所有子对象进行编译，同时匹配相同的name属性值，当发现相同name属性的时候，则将该子对象作为返回值返回给用户。虽然在Egret内部进行了相关算法优化，但还是在一定程度上消耗了一些性能。

官方推荐使用第一种方法，通过深度值来获取子对象。