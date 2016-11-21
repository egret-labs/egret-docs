
Channel3d 类控制应用程序中 在三维空间中播放的声音。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。

> 注：因为channel3d继承自channel，所以channel3d也包含channel的属性方法。

## 1、Channel3D属性

* `listener : egret3d.Vector3D` 返回监听者位置
* `maxDistance` 最大距离
* `minDistance` 最小距离
* `position` 三维空间中的位置
* `rollOffFactor rollOff` 系数
* `velocity` 传播方向

注意以上是Channel的属性，可以直接设置如下：
> `channel3d.maxDistance = 10;`

但是必须在初始化的时候设置，或者在play之前设置。通过对这些属性的设置，能够产生具有空间属性的声音效果。

## 2、Channel3D方法

* `Channel3d ( sound :egret3d.Sound, options :any )` 创建一个新的 Channel3d 对象，和channel构造方法一样
* `getDuration ( ):number` 音频持续时间
* `isPlaying ( ):boolean` 是否正在播放

## 3、代码示例
我们对channel的示例稍作修改
```
    private _sound:egret3d.Sound;
    // 加载声音文件成功
    private loadSoundSuccess(e): void {
        var channel3d:egret3d.Channel3d = new egret3d.Channel3d(e,{"volume":1,"loop":true});
        
        channel3d.volume = 1;
        channel3d.position = new egret3d.Vector3D(0,0,0);
        channel3d.velocity = new egret3d.Vector3D(0,0,0);
        channel3d.play();
        
    }
        
```
使用`F5`调试即可播放。
