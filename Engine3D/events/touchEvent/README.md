MouseEvent3D（pc 使用）：是引擎中所有可操作鼠标事件节点的事件类型标记。只能作用于 egret3d.Input。

示例：

```
private init():void {}
    egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_DOWN, this.onMouseDown, this);
    egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_UP, this.onMouseUp, this);
    egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_CLICK, this.onClick, this);
    egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_MOVE, this.onMouseMove, this);
    egret3d.Input.addEventListener(egret3d.MouseEvent3D.MOUSE_WHEEL, this.onMouseWheel, this);
}

private onMouseDown(code: egret3d.MouseEvent3D): void {
    console.log("OnMouseDown");
}

private onMouseWheel(e: egret3d.MouseEvent3D): void {
    console.log("onMouseWheel：" + egret3d.Input.wheelDelta);
}

private onMouseUp(code: egret3d.MouseEvent3D): void {
    console.log("onMouseUp");
}

private onClick(code: egret3d.MouseEvent3D): void {
    console.log("onClick");
}

private onMouseMove(e: egret3d.MouseEvent3D): void {
    console.log("onMouseMove" + this.moveIndex++);
}
```

* TouchEvent3D（mobile 使用）：是所有引擎中可操作触摸事件节点的事件类型标记。只能作用于 egret3d.Input。      

示例：

```
private init() {}
    egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_START, this.onTouchDown, this);
    egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_END, this.onTouchUp, this);
    egret3d.Input.addEventListener(egret3d.TouchEvent3D.TOUCH_MOVE, this.onTouchMove, this);
}

private onTouchDown(code: egret3d.TouchEvent3D): void {
    console.log("OnTouchDown");
}

private onTouchWheel(e: egret3d.TouchEvent3D): void {
    console.log("onTouchWheel：" + egret3d.Input.wheelDelta);
}

private onTouchUp(code: egret3d.TouchEvent3D): void {
    console.log("onTouchUp");
}

```
