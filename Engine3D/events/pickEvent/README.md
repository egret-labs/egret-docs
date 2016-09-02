PickEvent3D。拣选事件，作用于 Object3D 对象，并且该对象需要设置 enablePick 为 true 才会产生效果。类似于 2d 中的 TouchEvent。它封装了 MouseEvent3D（pc 下使用）、TouchEvent3D（mobile 下使用）。

示例：

```
private init():void {
    var object3D: egret3d.Object3D = new egret3d.Object3D();
    object3D.enablePick = true;
    object3D.addEventListener(egret3d.PickEvent3D.PICK_CLICK, this.OnPickClick, this);
    object3D.addEventListener(egret3d.PickEvent3D.PICK_DOWN, this.OnPickDown, this);
    object3D.addEventListener(egret3d.PickEvent3D.PICK_UP, this.OnPickUp, this);
    object3D.addEventListener(egret3d.PickEvent3D.PICK_MOVE, this.OnPickMove, this);
    object3D.addEventListener(egret3d.PickEvent3D.PICK_WHEEL, this.OnPickWheel, this);
}
private OnPickClick(e: egret3d.PickEvent3D) {
    console.log("OnPickClick");
}
private OnPickDown(e: egret3d.PickEvent3D) {
    console.log("OnPickDown");
}
private OnPickUp(e: egret3d.PickEvent3D) {
    console.log("OnPickUp");
}
private OnPickMove(e: egret3d.PickEvent3D) {
    console.log("OnPickMove");
}
private OnPickWheel(e: egret3d.PickEvent3D) {
    console.log("OnPickWheel");
}

```
