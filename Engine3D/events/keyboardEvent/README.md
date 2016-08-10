KeyEvent3D：按键事件，只能作用于 egret3d.Input。

示例：

```
private init():void {
    ///拣选事件注册
    egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_UP, this.onKeyUp, this);
    egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_CLICK, this.onClick, this);
}
private onKeyDown(e: egret3d.KeyEvent3D): void {
    console.log("OnKeyDown");
}
private onKeyUp(e: egret3d.KeyEvent3D): void {
    console.log("onKeyUp");
}
private onClick(code: egret3d.KeyEvent3D): void {
    console.log("onClick");
}
```
