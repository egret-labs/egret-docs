很多原生应用和游戏通过移动设备的硬件支持来获取用户的位置信息，现在 Egret 也支持获取位置信息了。

通过 Egret 的 `Geolocation`类来获取设备的当前位置。当开始监听位置改变信息时将派发`CHANGE`事件，并将改变的位置信息传递给回调函数。通过`GeolocationEvent`类型的回调参数可以获取到相应的经纬度，速度，海拔等信息。

#### 获取位置信息 

先来看以下使用的整体代码：

```
/**
 * 获取地理位置信息并显示出来
 */
class GeolocationTest extends egret.DisplayObjectContainer {
    private label: egret.TextField;
    public  constructor() {
        super();
        //显示信息的label
        this.label = new egret.TextField();
        this.label.x = STAGEWIDTH / 2;
        this.addChild(this.label);
        this.label.size = 20;
        this.label.fontFamily = "楷体";
        this.label.text = "暂未获取到经纬度信息";
        this.label.anchorOffsetX = this.label.width / 2;

        var gps = new egret.Geolocation();
        //监听经纬度变化的事件
        gps.addEventListener(egret.Event.CHANGE,this.onGotLocation,this);
        //开始监听变化
        gps.start();
    }
    private onGotLocation(e:egret.GeolocationEvent){
        this.label.text = "纬度: "+e.latitude.toFixed(4)+
            " 海拔: "+e.altitude+
            "n经度:"+e.longitude.toFixed(4)
            +" 速度: "+e.speed;
        this.label.anchorOffsetX = this.label.width / 2;
    }
}
```

这里实例化了一个`Geolocation`对象，并给它添加了一个监听器。这里当个`gps`执行`start()`方法后就开始监听位置变化。如果需要关闭监听可以使用它的`stop()`方法。
如果可以获取到位置信息的改变，将调用`onGotLocation()`。这里通过下面属性来获取位置的具体值。

* latitude  纬度信息
* longitude 经度信息
* altitude  海拔信息
* speed     速度信息

这里需要注意的是`altitude`和`speed`可能是null

#### 获取信息失败的处理

要获得用户的位置信息时需要用户允许的。如果当用户选择了不共享当前的位置信息,将抛出`GeolocationEvent`的`PERMISSION_DENIED`事件。

在我们上面的构造函数里添加gps的监听：
```
//监听用户拒绝事件
gps.once(egret.GeolocationEvent.PERMISSION_DENIED,this.userDenied,this);
```
并给在 `GeolocationTest` 里添加处理函数，将该信息提示给用户：

```
private userDenied(e:egret.GeolocationEvent){
    this.label.text = "用户拒绝访问位置信息，获取位置信息失败";
    this.label.anchorOffsetX = this.label.width / 2;
}
```

如果由于其他原因未能获取位置信息，将抛出`GeolocationEvent`的`UNAVAILABLE`事件。这里完善上面的程序，添加不能获取信息时的处理：

```
//监听失败事件
gps.addEventListener(egret.GeolocationEvent.UNAVAILABLE,this.unAvailable,this);
```

在`GeolocationTest` 里添加处理函数，将该信息提示给用户：

```
private unAvailable (e:egret.GeolocationEvent) {
    this.label.text = "获取位置信息失败: " + e.errorMessage + "n"
        + "错误类型: " + e.errorType;
    this.label.anchorOffsetX = this.label.width / 2;
}
```

这里的`errorMessage`表示获取位置信息失败的具体信息，`errorType`表示错误的类型。

上面代码的完整应用可以参考示例：[获取硬件信息](http://edn.egret.com/cn/index.php/article/index/id/659)
