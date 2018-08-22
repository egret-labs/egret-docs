##	开启优化开关

**适用于Android和iOS support 3.2.2及以上。**

**功能：**开启support对部分功能的优化。这些优化项暂时是默认关闭的，稳定之后会直接添加到support中。

**使用方法：**在native_require.js的egretInit函数中，修改egret_native.featureEnable的参数。例如打开渲染效率的优化方法如下：
~~~
var feature = {
	cmdBatch : true
};
egret_native.featureEnable(feature);
~~~
**参数：**一个js对象，目前可用的属性有：

cmdBatch: 减少引擎与support的数据传输次数，提高渲染效率（3.2.2添加）。

pretreatTexture：提高一张纹理被多次使用时的渲染效率（3.2.4添加）。



##	热更新地址不能访问时启动最后一次更新的游戏包

**适用于iOS support 3.2.2及以上。**

**功能：**热更新地址不能访问时启动最后一次更新的游戏。

**使用方法：**在启动游戏之前，设置访问热更新地址的等待时间。修改ViewController的runGame方法，在启动EgretRuntime前调用：
 ![](p1.png)
**参数：**等待时间（秒）

##	切换音频解码方式

**适用于Android support 3.2.2及以上。**

**功能：**选择是否默认优先使用PCM解码。默认是开启的，在大多数情况下，使用PCM解码速度更快，但是有的音频的时间会很长。

**使用方法：**在调用play事件之前，使用egret_native.setPcmDecodeEnable来开启或关闭。

**参数：**true/false


##	设置游戏背景透明

**适用于Android support 3.2.1及以上，iOS support 3.2.4及以上。**

**功能：**设置游戏所在View的背景透明。

**使用方法：** 

Android：

在 getGameOptions 里添加属性：
~~~
options.put(EgretRuntime.OPTION_GAME_GLVIEW_TRANSPARENT, "true");
~~~
**说明：**背景设置为透明后，场景后面会有一个 EditText ，可以通过
~~~
((ViewGroup)gameEngineView).removeViewAt(0);
~~~
去掉。保留这个控件是为了兼容2.X 的引擎，默认是存在的，如果使用3.0以上的引擎版本则可以去掉。

iOS:

在 runGame 中为 _options 添加属性：
~~~
_options[@OPTION_GAME_GLVIEW_TRANSPARENT] = @"true";
~~~

##	设置游戏所在View在最顶层（Android）

**适用于Android support 3.2.1及以上。**

**功能：**修改游戏所在View的层级

**使用方法：**将获取 gameEngineView 的方法由 game_engine_get_view 改为 game_engine_get_view_set_top ，将游戏所在的 View 放到最顶层。


##  获取原生设备的电池电量信息

**适用于Android/iOS support 3.1.4及以上。**

**功能：**获取原生设备的电池电量信息。

**使用方法：**
```javascript
var json_listene = { action: "listenDeviceInfoChanged" };
var jsonStr_listene = JSON.stringify(json_listene);
egret.ExternalInterface.call("egret.deviceInfo", jsonStr_listene);
             
egret.ExternalInterface.addCallback("egret.deviceInfo", function (message) {
        console.log("message form native : " + message);
});
var json = { action: "getCurrentBatteryInfo" };
var jsonStr = JSON.stringify(json);
egret.ExternalInterface.call("egret.deviceInfo", jsonStr);
```

