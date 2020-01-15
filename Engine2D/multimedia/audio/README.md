
## 1.创建Sound
### 1.1.通过Sound加装音频

* 通过 ```var sound:egret.Sound = new egret.Sound()``` 创建 `Sound` 对象，再通过 ```sound.load(url)```加载，`Sound` 类支持的事件类型有两个：`egret.Event.COMPLETE` 音频加载完成时抛出；`egret.IOErrorEvent.IO_ERROR` 音频加载失败时抛出.

```javascript
var sound:egret.Sound = new egret.Sound();
sound.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
    sound.play();
}, this);
sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
    console.log("loaded error!");
}, this);
sound.load("resource/sound/sound.mp3");
```

### 1.2.通过 URLLoader 加装音频。

* 具体调用如下。
```javascript
var loader:egret.URLLoader = new egret.URLLoader();
loader.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
    var sound:egret.Sound = loader.data;
    sound.play();
}, this);
loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
loader.load(new egret.URLRequest("resource/sound/sound.mp3"));
```
### 1.3.通过 res 加装音频。

* 具体调用如下。
```javascript
var sound:egret.Sound = RES.getRes("sound_mp3");
sound.play();
```     
## 2.播放Sound

### 2.1.播放方法

* `play()` 方法播放音频，有2个参数。`startTime`：声音开始播放的位置，默认为0。`loops`：声音播放的次数，小于等于0均为无限循环播放，大于0按照对应的值播放次数。

* 运行 `play()` 之后，会返回一个 `SoundChannel` 对象，开发者可以直接对 `SoundChannel` 进行操作，比如设置音量等。

* `SoundChannel` 对象的 `egret.Event.SOUND_COMPLETE` 事件是播放完成事件。

* 根据 `SoundChannel` 返回的 `position` 属性和 `Sound` 的 `play()` 方法可实现暂停和重播功能。

* `stop()` 方法停止播放。

### 2.2.播放类型

目前引擎内提供了4种声音的兼容模式，分别是 Audio、 WebAudio、QQAudio（qzone提供的声音解决方案）、以及 NativeAudio（打包方案Audio）


* WebAudio：IOS系统版本大于等于7的所有IOS版本的浏览器，Egret 3.2.0 以后 Android 默认也使用 WebAudio，如果不支持 WebAudio 的 app 则会自动改成 Audio 方式。

* QQAudio：在html页面指定了 “ https://qzonestyle.gtimg.cn/qzone/hybrid/lib/jsbridge.js ” （Qzone使用的js api）并且运行在`qq空间`的 android 机型。

* Audio：除使用 WebAudio 以及 QQAudio 外的其他所有的 Web 浏览器或者平台。可能出现的问题是声音播放有延迟，同一时间只能有一个音频的存在。

* NativeAudio：打包方案使用的audio。


设置播放类型在项目根目录下的 index.html 模板文件中进行： 

```javascript
/**
* {
* "renderMode":, //引擎渲染模式，"canvas" 或者 "webgl"
* "audioType": 0 //使用的音频类型，0:默认，1:qq audio，2:web audio，3:audio
* "antialias": //WebGL模式下是否开启抗锯齿，true:开启，false:关闭，默认为false
* "retina": //是否基于devicePixelRatio缩放画布
* }
**/
egret.runEgret({renderMode:"webgl", audioType:0});
```

## 3.音频示例

播放音频的简单示例代码如下 :

```javascript
class SoundExample extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onAddtoStage,this);
    }

    private onAddtoStage() {
        this.startLoad();
    }

    private startLoad():void {
        //创建 URLLoader 对象
        var loader:egret.URLLoader = new egret.URLLoader();
        //设置加载方式为声音
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
		//音频资源放在resource文件夹下
        var url:string = "resource/soundtest.mp3";
        var request:egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    }

    private onLoadComplete(event:egret.Event):void {
        var loader:egret.URLLoader = <egret.URLLoader>event.target;
        //获取加载到的 Sound 对象
        var sound:egret.Sound = <egret.Sound>loader.data;
        this.sound = sound;
        //一个简单的播放按钮
        var btn = new egret.Sprite();
        btn.graphics.beginFill(0x18f7ff);
        btn.graphics.drawRoundRect(0,0,80,40,5,5);
        btn.graphics.endFill();
        btn.touchEnabled = true;

        btn.anchorOffsetX = btn.width / 2;
        btn.x = this.stage.stageWidth / 2;
        btn.anchorOffsetY = btn.height / 2;
        btn.y = this.stage.stageHeight / 2;
        //监听按钮的触摸事件
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);

        this.addChild(btn);
    }
    private sound:egret.Sound;
    private soundChannel:egret.SoundChannel;

    private onTouch(event:egret.Event){

        var sound = this.sound;
        var channel:egret.SoundChannel = this.soundChannel;
        if(channel){
            //调用soundChannel对象的stop方法停止播放音频
            console.log(channel);
            channel.stop();
            this.soundChannel = null;
            return;
        }
        //使用SoundChannel播放音频
        channel = sound.play(0,-1);
        //Egret 3.0.4 新增获取音频长度 length 属性。
        console.log(sound.length);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        //保存soundChannel对象
        this.soundChannel = channel;
    }

    private onSoundComplete(event:egret.Event):void {
        console.log("onSoundComplete");
    }
}
```

首先使用 `URLLoader` 来载入音频，也可以使用上面的其他两种方式载入音频。监听这个音频的加载完成事件，当加载完成之后获取到音频的数据并新建`sound`对象。
调用`play()`方法来播放音频，本例中，开始时间的单位为0秒，循环播放。
这里`play`方法会返回一个`SoundChannel`对象，通过控制`SoundChannel`的`volume`属性来设置音量大小,音量范围从 0（静音）至 1（最大音量）。`SoundChannel`对象的`position`属性可以获取到当前播放的时间，单位为秒。需要注意的是`position`属性是一个只读的属性，不能通过设置`position`来设置当前的播放时间。
如果需要停止声音，可以调用`SoundChannel`对象的 `stop()` 方法。


## 4.注意事项

* 声音资源的格式生成请严格按照此步骤来，不然会影响兼容性。

1. 使用格式工厂。选择 44100Hz，96kbps 转换。

2. 如果还有问题，请再转一次。

3. 如果还有问题，请裁减音频长度再次转换。

4. 如果还有问题，请到论坛联系我们 [开发者论坛](http://bbs.egret.com/portal.php)，并提供对应的音频文件。

> 如果有问题，请尝试多转几次。
 
> 对于更专业的转换工具比如 audition，在测试中发现转换后的文件并不能解决在所有的浏览器中的播放问题，所以不推荐大家使用。

> 在 iOS 系统（所有设备，包括IPAD）中，使用者在可能付费的网络环境中需要等待用户交互操作后才能播放媒体。为了获得在 iOS 系统中最大的兼容性，请避免使用自动播放音频（载入完成即播放），应添加合适的触发条件（比如播放按钮）。

> 如果使用 WebAudio 方式还不能自动播放的话，那么目前来说没有其他方式来解决自动播放的问题。

* iOS 游戏的域名必须要在玩吧指定的域名下才可以使用上面提到的Qzone的js api(jsBridge)。

* 由于一些浏览器不支持直接加载后播放，因此建议先预加载音乐文件，并在点击事件时直接调用 `sound.play()`。

* 非 WebAudio 方式播放的音频，很有可能在浏览器只能同时播放一种声音（这个也是为什么qzone单独提供了声音解决方案）。
