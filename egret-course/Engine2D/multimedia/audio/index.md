在 Egret 3.0.1 版本中，解决了大家一直以来对声音问题的烦恼。包括声音不能播放、播放有延迟、播放会重新加载、火狐加载卡住、进入游戏破音爆音等在 Android 手机浏览器上会出现的问题。另外一个部分浏览器声音只能同时播放一个声音的问题，由于浏览器底层的实现，引擎暂时无法解决。

### 注意事项

声音资源的格式生成请严格按照此步骤来，不然兼容性会小很多。

1、使用格式工厂。选择 44100Hz，96kbps 转换。其他具体的格式，测试团队还在测试中。

2、如果还有问题，请再转一次。

3、如果还有问题，请裁减音频再次转换。

4、如果还有问题，请到论坛联系我们 [开发者论坛](http://bbs.egret.com/portal.php)，并提供对应的音频文件。

> 说这么多其实就是一句话，如果有问题，请多转几次。
 
> 对于更专业的转换工具比如 audition，在测试中发现转换后的文件并不能解决在所有的浏览器中的播放问题，所以以目前的测试结果不推荐大家使用。

> 在 iOS 系统（所有设备，包括IPAD）中，使用者在可能付费的网络环境中需要等待用户交互操作后才能播放媒体。为了获得在 iOS 系统中最大的兼容性，请避免使用自动播放音频（载入完成即播放），应添加合适的触发条件（比如播放按钮）。

----

在 Egret 2.5 版本中，我们对 Sound 进行了重新设计，解决了可以不能同时播放多个同一个音频的问题（手机必须得支持同时播放多个音频）。另外 Sound 类本身不再支持对音频的 stop 以及声音的大小设置，这些将会在 play 之后创建的 SoundChannel 中去设置。

下面我们来讲下具体的使用方法。

### 创建Sound
1、通过Sound加装音频。

* 通过 ```var sound:egret.Sound = new egret.Sound()``` 创建 Sound 对象，再通过 ```sound.load(url)```来加载，Sound 类支持的事件类型只有加载的2个事件结果：egret.Event.COMPLETE 音频加载完成时抛出；egret.IOErrorEvent.IO_ERROR 音频加载失败时抛出.

		var sound:egret.Sound = new egret.Sound();
        sound.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
			sound.play();
		}, this);
        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
			console.log("loaded error!");
		}, this);
        sound.load("resource/sound/sound.mp3");


2、通过 URLLoader 加装音频。

* 具体调用如下。

		var loader:egret.URLLoader = new egret.URLLoader();
		loader.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
			var sound:egret.Sound = loader.data;
			sound.play();
		}, this);
		loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
		loader.load(new egret.URLRequest("resource/sound/sound.mp3"));

3、通过 res 加载获取。

* 具体调用如下。
 	
		var sound:egret.Sound = RES.getRes("sound_mp3");
		sound.play();
        
### 播放Sound

* play 的2个参数。startTime：声音开始播放的位置，默认为0。loops：声音播放的次数，小于等于0均为无限循环播放，大于0按照对应的值播放次数。

* 和之前不一样的是，新版Sound play 之后，会创建一个 SoundChannel 对象，开发者可以直接对 SoundChannel 进行操作，比如设置音量。

* 对于声音的播放完成的事件监听，从原来对 Sound 进行监听，变成对 play 后创建的 SoundChannel 进行监听，并且去掉了 Sound 的 pause 和 resume方法。如果想要实现此方法，可以根据 SoundChannel 返回的 position 和 Sound 的 play 来实现。

### 播放类型

目前引擎内提供了4种声音的兼容模式，分别是 Audio、 WebAudio、QQAudio（qzone提供的声音解决方案）、以及 NativeAudio（打包方案Audio）


* WebAudio：IOS系统版本大于等于7的所有IOS版本的浏览器。

* QQAudio：在html页面指定了 “http://qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js” （Qzone使用的js api）并且运行在 qq空间的 的android机型。

* Audio：除使用WebAudio以及QQAudio外的其他所有的Web浏览器或者平台。可能出现的问题是声音播放有延迟，同一时间只能有一个音频的存在。

* NativeAudio：打包方案使用的audio。



### 其他

* 新版不再需要手动调用 Sound 的 preload 以及 destroy 来将资源从本地加载到内存以及销毁，这些都会在内部自动实现。

* 需要注意的是 iOS 游戏的域名必须要在玩吧指定的域下才可以使用上面提到的Qzone的js api(jsBridge)。参考链接：[玩吧js api接口说明](http://qzs.qzone.qq.com/qzone/qzact/act/game/wanba/index.html)。（玩吧需要登录才可以查看说明文档）。

### 其他注意事项

1. 由于一些浏览器不支持直接加载后播放，因此建议大家先预加载音乐文件，再在点击事件时直接调用 sound.play()（是直接调用，不要增加时间延迟或者加载什么的）。

1. 由于 webAudio 对声音的格式有特定要求，在 ios 系统上如果测试碰到音频文件解码失败的情况，请使用具体来转换下格式（码率 44100Hz 96kbs ；工具推荐 格式工厂）。

1. 在 android 系统中，不是所有的浏览器都能支持同时播放2种及以上的声音（这个也是为什么qzone单独提供了声音解决方案）。

### 音频示例

播放音频的简单示例代码如下 :

```
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

首先使用`URLLoader`来载入音频，当然也可以使用上面的其他两种方式来载入音频。并监听这个音频的加载完成事件。当加载完成之后获取到音频的数据并新建`sound`对象。调用`play`方法来播放音频。

`play`方法有两个参数，分别是开始时间`startTime`和播放次数`loops`。其中开始时间的单位为秒。第二个参数播放次数，默认值是 0，循环播放。 大于 0 为播放次数，如 1 为播放 1 次,小于等于 0 , 为循环播放。

这里`play`方法会返回一个`SoundChannel`对象，通过控制`SoundChannel`的`volume`属性来设置音量大小,音量范围从 0（静音）至 1（最大音量）。`SoundChannel`对象的`position`属性可以获取到当前播放的时间，单位为秒。需要注意的是`position`属性是一个只读的属性，不能通过设置`position`来设置当前的播放时间。

如果需要停止声音，可以调用`SoundChannel`对象的`stop`方法。

##### 获取声音长度
 
在 Egret Engine 2D 3.0.4 中，新增了一个 API ，用以获取当前播放声音的长度。通过获取 `egret.Sound`的 length 属性来获取当前播放声音的长度。需要注意的是该属性是只读的，我们并不能改变播放声音的长度。上面例子中的代码：

```
console.log(sound.length);
```

用来获取音频的长度。

#### 更多参考

查看 Egret 2.5 的 Sound 类 API 以及其示例：[egret.Sound](http://edn.egret.com/cn/apidoc/index/name/egret.Sound)

查看 Egret 2.5 音频示例: [音频播放器](http://edn.egret.com/cn/article/index/id/663)

查看 Egret 2.0 音频示例: [声音示例](http://edn.egret.com/cn/article/index/id/41)