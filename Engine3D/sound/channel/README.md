
Channel 类控制应用程序中的声音，对声音执行更精细的控制。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。

## 1、Channel属性

* `loop : boolean` 是否循环播放 使声音播放结束时重新开始播放
* `pitch : number` 当前播放速度,当前播放速度。1.0 正常速度。0.5 半速（更慢）。2.0 倍速（更快）。-1.0 向后。正常速度。-0.5 向后，半速。
* `volume : number` 音量，范围从 0（静音）至 1（最大幅度）

注意以上是Channel的属性，可以直接设置如下：
> `channel.volume = 1;`

但是必须在初始化的时候设置，或者在play之前设置。
## 2、Channel方法

	
* `Channel ( sound :egret3d.Sound, options :any )` 创建一个新的 Channel 对象
* `getDuration ( ):number` 音频持续时间
* `isPlaying ( ):boolean` 是否正在播放
* `pause ( )` 暂时停止在该声道中播放声音
* `play ( )` 开始在该声道中播放声音
* `stop ( )` 停止在该声道中播放声音
* `unpause ( )` 从暂停的位置继续在该声道中播放声音

## 3、代码示例

接下来我们修改`Hello Sound`代码
在onLoad最后新增这句代码
> `this._sound = new egret3d.Sound("resource/ccnn.mp3",this.loadSoundSuccess);`

并新建方法`loadSoundSuccess`
```
    private _sound:egret3d.Sound;
    // 加载声音文件成功
    private loadSoundSuccess(e): void {
        var channel:egret3d.Channel = new egret3d.Channel(e,{"volume":1,"loop":true});
        channel.play();
    }
```
使用`F5`调试即可播放。

