有时在游戏的运行过程中，需要动态的改变动画的播放速度。DragonBones提供了几种不同的方式，可以在不同的场景下，实现动画的变速效果。

* 第一种：调节动画速度

对时钟的调节一般是要影响一组动画。如果要直接调节某个动画的播放速度，DragonBones提供了更加直接的接口。直接调节animation中的timeScale属性即可。

```
var armature = factory.buildArmature("Dragon");
armature.animation.timeScale = 0.5;
```

* 第二种：调节动作速度

对动画速度的调节会影响到所有的动作，如果你只想调节角色动画中某一个动作的速度，则需要对gotoAndPlay之后产生的AnimationState示例进行操作。

```
var armature = factory.buildArmature("Dragon");
armature.gotoAndPlay("walk").setTimeScale(0.5);
```

可以访问示例中心查看参考示例的效果和下载源码：
[DragonBones 高级特性](http://edn.egret.com/cn/index.php/article/index/id/713)

 
   
