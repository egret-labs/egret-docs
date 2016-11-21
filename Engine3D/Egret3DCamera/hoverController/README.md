
`HoverController`相机控制器与`LookAtController`非常相似。你可以通过`HoverController`进行摄像机的绕点旋转功能。但与`LookAtController`不同点在于`HoverController`允许你对绕点旋转的角度和缓动速度进行控制。

`HoverController`使用方法如下：

```
private ctl:egret3d.HoverController;
this.ctl = new egret3d.HoverController(this._view.camera3D, this.cube);
this.ctl.distance = 300;
```

```
this.canvas.addEventListener(egret3d.Event3D.ENTER_FRAME,this.update,this);
private update(evt:egret3d.Event3D)
{
	this.ctl.update();
}
```

在创建`HoverController`时，你有多个参数可以调节控制。

`targetObject`：控制目标，你当前需要控制的摄像机

`lookAtObject`：被观察对象。

`panAngle`：相机旋转时，当前Y轴的旋转角度。

`tiltAngle`：相机旋转时，当前X轴的旋转角度。

`distance`：被观察目标与相机之间的距离。

`minTiltAngle`：相机最小的X轴旋转角度。

`maxTiltAngle`：相机旋转时最大的X轴旋转角度。

`minPanAngle`：相机旋转时最小的Y轴旋转角度。

`maxPanAngle`：相机旋转时最大的Y轴旋转角度。

`steps`：移动结束时，平滑步数。数值越大，最后缓动越加缓慢。

`yFactor`：旋转时Y轴的一个相对变化值。

`wrapPanAngle`：是否开启PanAngle角度限制。