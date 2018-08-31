## 1.系统信息
Egret 项目可以运行在支持HTML5的桌面浏览器和各种移动浏览器中。也可以运行在 Egret Runtime 的加速和原生系统环境中。若要获得不同系统的系统信息可以通过`egret.Capabilities `类来获取。需要注意的是它的值都是静态的，可以读取但是不能更改。

### 1.1.系统常量

#### egret.Capabilities.isMobile
通过`egret.Capabilities.isMobile`可以知道程序是否运行在移动系统中。它的值是一个静态的布尔型值，当获取到的值为`true`时表示在移动系统中。

#### egret.Capabilities.language
`egret.Capabilities.language`表示运行内容的系统的语言代码。它的值是ISO 639-1中的小写双字母语言代码。可以参考[ISO 639-1](http://baike.baidu.com/link?url=me8UVbWB-oLjVT_fyxTqPwzf4cagZroNFfbiZy0Meo3VnACeZOup5vabLqoRaDwozxGm-dx600XBZRRV34pkca#2)

其中可能遇到的比价特殊是是以下几项：

* 简体中文 zh-CN
* 繁体中文 zh-TW
* 英语 en
* 日语 ja
* 韩语 ko

#### egret.Capabilities.os
`egret.Capabilities.os`属性表示当前操作系统，具体可能值如下：

* 苹果手机操作系统 "iOS"
* 安卓手机操作系统 "Android"
* 微软手机操作系统 "Windows Phone"
* 微软桌面操作系统 "Windows PC"
* 苹果桌面操作系统 "Mac OS"
* 未知操作系统 "Unknown"

#### egret.Capabilities.runtimeType
`egret.Capabilities.runtimeType`属性可以获取的项目运行类型。

| 属性值  |对应的常量 |对应的类型 |
|:-------------|-------------|-------------:|
|web| egret.RuntimeType.WEB | 运行在浏览器上|
|native| egret.RuntimeType.NATIVE | 运行在第一代原生项目上|
|runtime2| egret.RuntimeType.RUNTIME2 | 运行在第二代原生项目上|
|wxgame| egret.RuntimeType.WXGAME | 运行在微信小游戏上|



### 1.2.示例
获得系统信息可以参考下面的代码：

```
/**
 * 获取系统信息类
 */
class CapabilitiesTest extends egret.Sprite {

    public constructor () {

        super();

        var capabilites:Array<egret.ITextElement> = [
            {text:"移动设备: " + egret.Capabilities.isMobile + "n",style:{size:17,"fontFamily": "楷体"}} ,
            {text:"语言代码: " + egret.Capabilities.language + "n",style:{size:17,"fontFamily": "楷体"}},
            {text:"操作系统: " + egret.Capabilities.os + "n",style:{size:17,"fontFamily": "楷体"}},
            {text:"运行类型: " + egret.Capabilities.runtimeType + "n",style:{size:17,"fontFamily": "楷体"}}
        ];

        var showCapabilities:egret.TextField = new egret.TextField();

        showCapabilities.textFlow = capabilites;

        this.addChild(showCapabilities);

    }
}
```

## 2.陀螺仪

在移动设备中，一般支持获取设备本身的旋转角度。`egret.DeviceOrientation` 可以监听设备方向的变化。

### 2.1.获取设备旋转角度

如下示例演示了如何监听旋转的变化并获得旋转的值：

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

`OrientationEvent`的三个属性：`alpha`,`beta`和`gamma`。

* `alpha`表示设备绕 Z 轴的角度，单位是 角度 范围是 0 到 360。

* `beta` 表示设备绕 X 轴的角度，单位是 角度 范围是 -180 到 180.这个值表示设备从前向后的旋转状态。

* `gamma` 表示设备绕 Y 轴的角度，单位是 角度 范围是 -90 到 90.这个值表示设备从左到右的旋转状态。


## 3.地理位置

很多原生应用和游戏通过移动设备的硬件支持来获取用户的位置信息，Egret 也支持获取位置信息。

通过 Egret 的 `Geolocation`类来获取设备的当前位置。当开始监听位置改变信息时将派发`CHANGE`事件，并将改变的位置信息传递给回调函数。通过`GeolocationEvent`类型的回调参数可以获取到相应的经纬度，速度，海拔等信息。

### 3.1.获取位置信息 

示例代码如下：

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

这里实例化了一个`Geolocation`对象，并给它添加了一个监听器。当`gps`执行`start()`方法后就开始监听位置变化。如果需要关闭监听可以使用它的`stop()`方法。
如果可以获取到位置信息的改变，将调用`onGotLocation()`。这里通过下面属性来获取位置的具体值。

* latitude  纬度信息
* longitude 经度信息
* altitude  海拔信息
* speed     速度信息

需要注意的是`altitude`和`speed`可能是null

### 3.2.获取信息失败的处理

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

