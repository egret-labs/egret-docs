
## 遮罩显示对象

在Egret 2.5 版本开始提供了不规则遮罩的功能。

可以通过将一个显示对象用作遮罩来创建一个孔洞，透过该孔洞使另一个显示对象的内容可见。

### 定义遮罩

若要指明一个显示对象将是另一个显示对象的遮罩，请将遮罩对象设置为被遮罩的显示对象的 mask 属性：
```  TypeScript
//将maskSprite设置为mySprite的遮罩
mySprite.mask = maskSprite;
```
被遮罩的显示对象显示在用作遮罩的显示对象的全部不透明区域之内。例如，下面的代码将创建一个包含 100 x 100 个像素的红色正方形的 Shape 实例和一个包含半径为 25 个像素的蓝色圆的 Sprite 实例。它被设置为正方形的遮罩，所以显示的正方形部分只是由圆完整部分覆盖的那一部分。换句话说，只有红色圆可见。
```  TypeScript
//画一个红色的正方形
 var square:egret.Shape = new egret.Shape();
 square.graphics.beginFill(0xff0000);
 square.graphics.drawRect(0,0,100,100);
 square.graphics.endFill();
 this.addChild(square);

//画一个蓝色的圆形
var circle:egret.Shape = new egret.Shape();
circle.graphics.beginFill(0x0000ff);
circle.graphics.drawCircle(25,25,25);
circle.graphics.endFill();
this.addChild(circle);

square.mask = circle;
```
最终效果如图所示

![](55a32cdb75779.png)

用作遮罩的显示对象可设置动画、动态调整大小。遮罩显示对象不一定需要添加到显示列表中。但是，如果希望在缩放舞台时也缩放遮罩对象，或者如果希望支持用户与遮罩对象的交互（如调整大小），则必须将遮罩对象添加到显示列表中。

通过将 mask 属性设置为 null 可以删除遮罩：
```  TypeScript
mySprite.mask = null;
```
>>> 不能使用一个遮罩对象来遮罩另一个遮罩对象。

当 mask 为 Rectangle 时，如果修改过 mask 的值，必须对显示对象重新赋值 mask。当 mask 为 DisplayObject 时，不需要重复赋值 mask，但是 mask 必须是显示列表里元素。



