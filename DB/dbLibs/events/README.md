DragonBones 本身并不实现事件派发，动画事件和自定义事件的派发与接收都依赖引擎的事件系统，这样可以使得 DragonBones 的事件融合到所支持的各个引擎的事件系统之中。

在 Egret 中，DragonBones 是依赖 EgretArmatureDisplay 来派发和接收事件的，所以通过对其进行事件监听，就可以收到所有来自骨架的动画事件和自定义事件（更多关于 Egret 的事件知识请参考 Egret 的相关教程和文档）。

[dragonBones.EventObject](http://developer.egret.com/cn/apidoc/index/name/dragonBones.EventObject) 定义了 DragonBones 中相关的事件类型，同时他也会做为一个事件参数通过 [dragonBones.EgretEvent](http://developer.egret.com/cn/apidoc/index/name/dragonBones.EgretEvent) 传递给事件监听器。

代码如下：

```
let armatureDisplay = factory.buildArmatureDisplay("armatureName");
this.addChild(armatureDisplay);

// Event listener.
function animationEventHandler(event: dragonBones.EgretEvent): void {
    let eventObject = event.eventObject;
    console.log(eventObject.animationState.name, event.type, eventObject.name ? eventObject.name : "");
}

// Add animation event listener.
armatureDisplay.addEventListener(dragonBones.EventObject.START, animationEventHandler, this);
armatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, animationEventHandler, this);
armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, animationEventHandler, this);
armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN, animationEventHandler, this);
armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, animationEventHandler, this);
armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT, animationEventHandler, this);
armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, animationEventHandler, this);

// Add animation custom event listener.
armatureDisplay.addEventListener(dragonBones.EventObject.FRAME_EVENT, animationEventHandler, this);

// Add animation sound event listener.
factory.soundEventManager.addEventListener(dragonBones.EventObject.SOUND_EVENT, animationEventHandler, this);
```

* 自定义事件可以在 DragonBones Pro 中的事件时间轴添加。（[视频教程](http://developer.egret.com/cn/article/index/id/1091)）
* 自定义事件可以配置自定义参数。
* 声音事件可以通过 factory 的 soundEventManager 实例统一监听，而不必为每个骨架单独监听。

可以访问示例中心查看参考示例的效果和下载源码：
* [DragonBones 在线演示](http://www.dragonbones.com/demo/egret/animation_base_test/index.html)
* [DragonBones 事例源码](https://github.com/DragonBones/DragonBonesJS/blob/master/Egret/Demos/src/demo/AnimationBaseTest.ts)