通过使用[鼠标支持库](https://github.com/egret-labs/egret-game-library/tree/master/mouse)可以监听 PC 上的鼠标事件。

### 引入鼠标库

引入鼠标支持库与引入其他第三方库过程相同，首先[下载](https://github.com/egret-labs/egret-game-library/tree/master/mouse)该库，在 egretProperties.json 中引入该库并编译引擎。需要注意库的位置应放在项目外。

```
{
    "name": "mouse",
    "path": "../libsrc"
}
```

引入到项目中之后编译引擎即可使用鼠标库。

### 支持事件

在鼠标支持库中支持以下事件。

| 名称 | 说明 |
|---|---|
| MOUSE_MOVE | 当用户鼠标移动时被调用。|
| MOUSE_OVER | 当鼠标正在对象所在区域内（没有被其他对象覆盖）时调用。|
| MOUSE_OUT | 当鼠标移出对象所在区域内（没有被其他对象覆盖）时调用。|
| ROLL_OVER | 当鼠标进入对象所在区域内调用。|
| ROLL_OUT | 当鼠标移出对象所在区域内时调用。|

### 使用方法

使用鼠标支持库时需要开启鼠标支持。

```
//启用舞台的鼠标支持
mouse.enable(this.stage);
```

调用 enable 方法开启舞台对鼠标事件的支持。开启支持之后即可监听鼠标事件了。使用鼠标事件的方法与其他触摸事件是相同的，下面是基本的调用方法：

```
mouse.enable(this.stage);
//绘制外层容器
this.outContainer = new egret.Sprite();
this.outContainer.name = "outContainer";
this.outContainer.graphics.beginFill(0x00ff00);
this.outContainer.graphics.drawRect(0, 0, 300, 300);
this.outContainer.graphics.endFill();
this.addChild(this.outContainer);
this.outContainer.x = (this.stage.stageWidth - this.outContainer.width) / 2;
this.outContainer.y = (this.stage.stageHeight - this.outContainer.height) / 2;
//绘制里层显示对象
this.inShape = new egret.Sprite();
this.inShape.name = "inShape";
this.inShape.graphics.beginFill(0xff0000);
this.inShape.graphics.drawCircle(0, 0, 50);
this.inShape.graphics.endFill();
this.inShape.x = this.outContainer.width / 2;
this.inShape.y = this.outContainer.height / 2;
this.outContainer.addChild(this.inShape);
//开启显示对象的触摸
this.outContainer.touchEnabled = true;
this.inShape.touchEnabled = true;
//分别监听外层容器的 MouseEvent
this.outContainer.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
this.outContainer.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
this.outContainer.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
this.outContainer.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
//分监听内层显示对象的 MouseEvent
this.inShape.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver2, this);
this.inShape.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut2, this);
this.inShape.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver2, this);
this.inShape.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut2, this);
```

其中回调函数如下：

```
private onRollOver(e: egret.TouchEvent): void {
    console.log("roll over " + e.target.name + "  " + e.bubbles);
}

private onRollOut(e: egret.TouchEvent): void {
    console.log("roll out " + e.target.name + "  " + e.bubbles);
}

private onMouseOver(e: egret.TouchEvent): void {
    console.log("mouse over " + e.target.name + "  " + e.bubbles);
}

private onMouseOut(e: egret.TouchEvent): void {
    console.log("mouse out " + e.target.name + "  " + e.bubbles);
}

private onRollOver2(e: egret.TouchEvent): void {
    console.log("roll over2 " + e.target.name + "  " + e.bubbles);
}

private onRollOut2(e: egret.TouchEvent): void {
    console.log("roll out2 " + e.target.name + "  " + e.bubbles);
}

private onMouseOver2(e: egret.TouchEvent): void {
    console.log("mouse over2 " + e.target.name + "  " + e.bubbles);
}

private onMouseOut2(e: egret.TouchEvent): void {
    console.log("mouse out2 " + e.target.name + "  " + e.bubbles);
}
```

上面代码中我们绘制了两个 Sprite ，一个当做外层的容器，一个当做内部的显示对象。编译运行观察输出的结果：

* 鼠标移入容器和内层显示对象时都会抛出 MOUSE_OVER 和 ROLL_OVER。
* 鼠标在容器移动到内层显示对象时容器会抛出 MOUSE_OUT 但不会抛出 ROLL_OUT。
* 鼠标从内层显示对象移动到容器时容器会抛出 MOUSE_OVER ，内层会抛出 ROLL_OUT 和 MOUSE_OUT。
* 鼠标完全移动到容器外面时容器才会抛出 ROLL_OUT。 

简单比较可以看出 MOUSE 和 ROLL 的区别，MOUSE_OVER 和 MOUSE_OUT 在显示对象的可见区域上触发，而 ROLL_OUT 和 ROLL_OUT 在显示对象的整体上触发。


#### 设置鼠标手型

一般我们希望鼠标移动到可点击区域上时改变鼠标的形状为手型，我们可以通过 setButtonMode 来设置。

```
//设置内层显示对象为鼠标手型
mouse.setButtonMode(this.inShape, true);
```

setButtonMode 接收两个参数，分别是显示对象和是否开启手型显示。开启之后当鼠标移动到该显示对象上时即可显示为手的形状。


#### 监听鼠标移动事件

监听鼠标的移动事件需要单独开启，调用 setMouseMoveEnabled() 方法即可。

```
//设置开启鼠标移动事件
mouse.setMouseMoveEnabled(true);
```

开启鼠标移动事件的监听之后接口监听该事件:

```
this.outContainer.addEventListener(mouse.MouseEvent.MOUSE_MOVE, function () { 
    console.log("mouse move"); 
}, this);
```

> 需要注意的是监听鼠标移动事件会消耗更多的性能。



