在移动设备中，一般支持获取设备本身的旋转角度的变化。`egret.DeviceOrientation` 可以监听设备方向的变化。

#### 获取设备旋转角度

演示了如何监听旋转的变化并获得旋转的值：

```
class DeviceOrientationExample extends egret.DisplayObjectContainer {
    private label: egret.TextField;
    public constructor() {
        super();
        this.label = new egret.TextField();
        this.label.y = 50;
        this.label.x = 50;
        this.addChild(this.label);
        //创建 DeviceOrientation 类
        var orientation = new egret.DeviceOrientation();
        //添加事件监听器
        orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
        //开始监听设备方向变化
        orientation.start();
    }
    private onOrientation(e:egret.OrientationEvent){
        this.label.text =
            "方向: nalpha:"+e.alpha
            +",nbeta:"+e.beta
            +",ngamma:"+e.gamma;
    }
}
```

上面代码首先创建了`DeviceOrientation`的实例`orientation`。并给他添加了一个事件侦听器，监听它的`CHANGE`事件。然后调用了他的`start()`方法来开始监听设备方向的变化。

当系统监听到了方向的变化后，将回调函数 `onOrientation`。然后通过`egret.OrientationEvent`事件的三个属性来获取设备的方向变化信息。

需要注意的是`OrientationEvent`的三个属性，`alpha`,`beta`和`gamma`。

* `alpha`表示设备绕 Z 轴的角度，单位是 角度 范围是 0 到 360。

* `beta` 表示设备绕 X 轴的角度，单位是 角度 范围是 -180 到 180.这个值表示设备从前向后的旋转状态。

* `gamma` 表示设备绕 Y 轴的角度，单位是 角度 范围是 -90 到 90.这个值表示设备从左到右的旋转状态。

更完整应用代码可以参考示例：[获取硬件信息](http://edn.egret.com/cn/index.php/article/index/id/659)

