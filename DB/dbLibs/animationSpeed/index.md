有时在游戏的运行过程中，需要动态的改变动画的播放速度。DragonBones提供了几种不同的方式，可以在不同的场景下，实现动画的变速效果。
* 第一种：调节世界时钟

DragonBones动画库中有个WorldClock类，提供了世界时钟的功能。一般情况下，我们推荐开发者将所有创建的骨架都加到一个世界时钟中去，然后在引擎的Ticker中注册一个回调函数调用世界时钟的advanceTime方法，这样所有加到这个世界时钟的骨架就都能够正确的运行了。
如果想要实现像黑客帝国中的全局变慢躲子弹的效果，只需要调节世界时钟的timeScale属性，所有加到该时钟的骨骼动画就都会同步变速。值越大动画越快，只越小动画越慢。

```
var armature = factory.buildArmature("Dragon");
dragonBones.WorldClock.clock.add(armature);
egret.Ticker.getInstance().register(function (advancedTime) {
    dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
}, this);
dragonBones.WorldClock.clock.timeScale = 0.5;
```

另外游戏中是可以存在多个速度不同的世界时钟的。例如你想做一个人低头缓慢的行走，思考人生，同时他周围的人快速的移动，时光飞逝，以这种夸张的手法实现某些艺术效果，就可以通过两个世界时钟来实现。
我们可以将原来的世界时钟调快4被，然后新创建一个世界时钟把调慢8倍，并添加到原来的世界时钟中。然后把需要慢速行走的人加到慢时钟中，把其他角色加到原始的时钟中，就能实现这种一个世界两种速度播放动画的效果了。

```
var slowClock:dragonBones.WorldClock = new dragonBones.WorldClock();
dragonBones.WorldClock.clock.add(slowClock);
dragonBones.WorldClock.clock.add(armature);
dragonBones.WorldClock.clock.timeScale = 4;
slowClock.timeScale = 0.125;
slowClock.add(slowArmature);
```

* 第二种：调节动画速度

对时钟的调节一般是要影响一组动画。如果要直接调节某个动画的播放速度，DragonBones提供了更加直接的接口。直接调节animation中的timeScale属性即可。

```
var armature = factory.buildArmature("Dragon");
armature.animation.timeScale = 0.5;
```

* 第三种：调节动作速度

对动画速度的调节会影响到所有的动作，如果你只想调节角色动画中某一个动作的速度，则需要对gotoAndPlay之后产生的AnimationState示例进行操作。

```
var armature = factory.buildArmature("Dragon");
armature.gotoAndPlay("walk").setTimeScale(0.5);
```

可以访问示例中心查看参考示例的效果和下载源码：
[DragonBones 高级特性](http://edn.egret.com/cn/index.php/article/index/id/713)