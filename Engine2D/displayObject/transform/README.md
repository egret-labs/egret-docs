
## 1.锚点的操作
每个显示对象都包含一个锚点,锚点默认位于显示对象的左上角。

当设置一个显示对象的坐标位置时,会以锚点为参照改变显示对象的绘图位置。同时,锚点相对于显示对象的位置也是可以改变的。

### 默认锚点

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

上面的代码中，绘制了一个绿色的正方形，锚点默认在正方形的左上角位置，通过设置 `shp` 的 `x`、`y`属性来改变正方形的位置。

效果如下图：

![](556535128a4a2.png)

### 修改锚点

可通过`anchorOffsetX`和 `anchorOffsetY`属性访问修改锚点的位置。

修改上例锚点的位置，让锚点居于正方形左上角x轴 50 像素的位置，代码如下：

```
shp.anchorOffsetX = 50;
```

再次编译项目并测试，效果如下：

![](556535128b8ba.png)

可以看到，绿色正方形位置依然是x：100，y：100。但实际效果中，正方形的位置和上一张图中的位置有明显的差异。这是因为修改了锚点的位置。

## 2.位置和平移

### 位置
通过的 x 和 y 属性可访问修改显示对象的位置。

``` 
container.x = 17;
container.y = 212;
```

显示对象定位系统将舞台视为一个笛卡尔坐标系（带有水平 x 轴和垂直 y 轴的常见网格系统）。坐标系的原点（x 和 y 轴相交的 0,0 坐标）位于舞台的左上角。从原点开始，x 轴的值向右为正，向左为负，而 y 轴的值向下为正，向上为负（与典型的图形系统相反）。例如，通过前面的代码行可以将对象 container 移到 x 轴坐标 17（原点向右 17 个像素）和 y 轴坐标 212（原点向下 212 个像素）。

默认创建显示对象时，x 和 y 属性均设置为 0，对象在其父容器的左上角。

### 本地坐标和舞台坐标

x 和 y 属性始终是指显示对象相对于其父显示对象坐标轴的 (0,0) 坐标的位置。因此，对于包含在 DisplayObjectContainer 实例内的 Shape 实例（如圆），如果将 Shape 对象的 x 和 y 属性设置为 0，会将圆放在 DisplayObjectContainer 的左上角，但该位置不一定是舞台的左上角。若要确定对象相对于全局舞台坐标的位置，可以使用任何显示对象的 globalToLocal() 方法将坐标从全局（相对于舞台）坐标转换为本地（相对于显示对象容器）坐标，如下所示：
 
```
//创建一个空的 DisplayObjectContainer，把它的 x 和 y 坐标都改为
var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
container.x = 200;
container.y = 200;
this.addChild(container);

//画一个红色的圆，添加到 container 中
var circle: egret.Shape = new egret.Shape();
circle.graphics.beginFill(0xff0000);
circle.graphics.drawCircle(25,25,25);
circle.graphics.endFill();
container.addChild(circle);

//给圆增加点击事件
circle.touchEnabled = true;
circle.addEventListener(egret.TouchEvent.TOUCH_TAP,onClick,this);

function onClick():void{
    //把舞台左上角的坐标(0,0)转换为 container 内部的坐标
    var targetPoint: egret.Point = container.globalToLocal(0,0);
    //重新定位圆，可以看到圆形移到了屏幕的左上角
    circle.x = targetPoint.x;
    circle.y = targetPoint.y;
    }
}
```

同样，也可以使用 DisplayObject 类的 localToGlobal() 方法将本地坐标转换为舞台坐标。

### 平移

通过触摸移动显示对象，示例代码如下：

当手指按到屏幕时监听 TOUCH_MOVE 事件，每次手指移动时调用`onMove()`函数，使拖动的对象跳到手指所在的x,y坐标。当手指离开屏幕后取消监听，对象停止跟随。

```
//设定2个偏移量
var offsetX:number;
var offsetY:number;

//画一个红色的圆
var circle: egret.Shape = new egret.Shape();
circle.graphics.beginFill(0xff0000);
circle.graphics.drawCircle(25,25,25);
circle.graphics.endFill();
this.addChild(circle);

//手指按到屏幕，触发 startMove 方法
circle.touchEnabled = true;
circle.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);

//手指离开屏幕，触发 stopMove 方法
circle.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);

function startMove(e:egret.TouchEvent):void{
  //计算手指和圆形的距离
  offsetX = e.stageX - circle.x;
  offsetY = e.stageY - circle.y;
  //手指在屏幕上移动，会触发 onMove 方法
  this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
}

function stopMove(e:egret.TouchEvent) {console.log(22);
   //手指离开屏幕，移除手指移动的监听
   this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
}
function onMove(e:egret.TouchEvent):void{
   //通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
   circle.x = e.stageX - offsetX;
   circle.y = e.stageY - offsetY;
}
```
 
## 3.尺寸和缩放

有两种方式可测量和操作显示对象的大小：尺寸属性（width 和 height）或缩放属性（scaleX 和 scaleY）。

### 尺寸
尺寸属性 `width` 和 `height` 最初设置为对象的大小，以像素为单位。可以通过读取这些属性的值来确定显示对象的大小,也可以指定新值来更改对象的大小，如下所示：

```  TypeScript
//设定对象的大小
mySprite.width = 50;
mySprite.height = 100;
```
更改显示对象的 height 或 width 会导致缩放对象。

### 缩放

通过缩放属性 `scaleX` 和 `scaleY` 可以等比更改显示对象的大小，如下面代码:

```
//设定对象的大小
mySprite.scaleX = 2;
mySprite.scaleY = 2;
```

将显示对象的宽和高同时放大了2倍。缩放是相对于显示对象的锚点进行的。

## 4.旋转

使用 `rotation` 属性可以旋转显示对象，将其设置为一个数字（以度为单位），表示要应用于该对象的旋转量，正数为顺时针，负数为逆时针。旋转是相对于显示对象的锚点进行的。

下面代码使 `mySprit` 以锚点为圆心，顺时针旋转45°。

```
//把对象旋转 45 度（一整周旋转的 1/8）
mySprite.rotation = 45;
```

## 5.斜切

斜切是对图像在2D空间进行的一种平行矩阵变形。

斜切可从两个方向进行控制，对X方向的斜切将导致矩形的底边在X方向发生相应的偏移。

![skewX_compare][]    

如上图所示，是对白鹭小鸟进行X方向斜切10所达到的结果。左边是未变形的原始图片，右边是变形后的图片。  

```
//设定对象的X方向斜切
mySprite.skewX = 10;
```

同理，对Y方向的斜切将导致矩形的右侧边在Y方向发生相应的偏移。

![skewY_compare][]    

如上图所示，是对白鹭小鸟进行Y方向斜切10所达到的结果。   

[skewX_compare]: skewX_compare.png
[skewY_compare]: skewY_compare.png

```
//设定对象的Y方向斜切
mySprite.skewY = 10;
```

在适当的动画呈现场合使用斜切变形，可以在不增加图片资源的前提下实现灵活而有趣的效果。   
