
AudioManager 类允许您在应用程序中 播放 HTML5 Audio 和 Web Audio。它集合了加载声音文件、播放2D或者3D效果方法，可以使我们方便的控制声音播放。

## 1、AudioManager属性


* `context : any` AudioContext 上下文
egret3d.AudioManager
* `instance : egret3d.AudioManager` [静态] [只读] AudioManager类的单例模式，返回一个 AudioManager 对象
egret3d.AudioManager
* `volume : number` 音量，范围从 0（静音）至 1（最大幅度）

注意以上是Channel的属性，可以直接设置如下：
> `AudioManager.maxDistance = 10;`

但是必须在初始化的时候设置，或者在play之前设置。通过对这些属性的设置，能够产生具有空间属性的声音效果。

## 2、AudioManager方法

* `AudioManager ()` 创建一个新的 AudioManager 对象
* `createSound ( url :string, success :Function, error :Function ):egret3d.Sound` 生成一个新的 Sound 对象 ，将声音数据加载到 Sound 对象中
* `hasAudio ( ):boolean` 是否支持 HTML5 Audio tag API
* `hasAudioContext ( ):boolean` 是否支持 Web Audio API
* `isSupported ( url :string, audio :HTMLAudioElement ):boolean` 浏览器是否可以播放这种音频类型
* `playSound ( sound :egret3d.Sound, options :any )` 生成一个新的 Channel 对象来播放该声音
* `playSound3d ( sound :egret3d.Sound, position :egret3d.Vector3D, options :any ):egret3d.Channel3d` 生成一个新的 Channel3d 对象来播放该声音

## 3、代码示例
```
    public constructor() {
        super();
        
        this._sound = egret3d.AudioManager.instance.createSound("resource/ccnn.mp3", this.loadSoundSuccess);
    }
    
    // 加载声音文件成功
    private loadSoundSuccess(e): void {
        this._manager = new egret3d.AudioManager();
        
        // 生成一个新的 Channel 对象来播放该声音。
        this._channel = this._manager.playSound(e, { "volume": 0.5, "loop": true });

        // 生成一个新的 Channel3d 对象来播放该声音。
        this._channel3d = this._manager.playSound3d(e, new egret3d.Vector3D(0, 0, 10), { "volume": 0.5, "loop": true });

        //Channel 可停止声音并监控音量。
        // this._channel.pause();
    }
```
使用`F5`调试即可播放。