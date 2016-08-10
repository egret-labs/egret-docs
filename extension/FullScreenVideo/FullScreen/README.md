使用[FullScreenVideo](https://github.com/egret-labs/egret-game-library/tree/master/weixinextension)扩展可实现微信中带顶部栏的全屏视频，一般用于游戏过场或者广告营销。 

>只在微信中可用，手机浏览器和 runtime 中无效。
点击屏幕后会播放，不会显示播放控制条。 ios 系统一般没问题，安卓系统少量手机不支持。

### 引入

引入 FullScreenVideo 与引入其他第三方库过程相同，获取 weixinextension 之后， 在 egretProperties.json 中引入该库并编译引擎。需要注意库的位置应放在项目外。

```
{
  "name": "weixinextension",
  "path": "../libsrc"
}
```

### 使用

使用 FullScreenVideo 比较简单，包含以下 API：

**方法：**

* load(url);

	加载视频,传入加载视频的地址。

* show()

	显示视频。

* close()

	关闭视频。

**属性：**

* poster

	预览图的地址。

* loop
	是否设置为循环播放。

----

 使用 weixinextension 如下 ：

```
var video = new weixinextension.FullScreenVideo();
//载入视频
video.load('resource/video/mp4.mp4');
//设置封面图
video.poster = "resource/video/bg.jpg";
//显示视频
video.show();
video.addEventListener(egret.Event.COMPLETE,()=>{
    console.log('play complete');
    video.close();
},this)
```

首先调用 load 方法载入视频，并设置视频的封面图。调用 show 方法显示视频，当视频播放完成是调用 close 方法结束视频。

### 其他注意事项

下列为测试过的正常播放的设备 iphone6+ iOS 9.3.1 ipad2 iOS 8.4 魅族MX5 Android 5.1 Flayme 5.1.4 小米2s Android 5.0.2 MIUI 7 6.5.5 华为G621-TL00 Android 4.4.4 emotion2.3

另外，如果 loop = true 设置为循环播放以后，安卓系统会有异常现象出现，比如在重播的时候可能会有一个播放按钮闪现，底部可能有播放控制栏出现。 就一个ts文件，可以拷贝到项目里直接使用。


