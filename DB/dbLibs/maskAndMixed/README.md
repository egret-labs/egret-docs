在制作拥有复杂灵活的动画角色时，可以通过 DragonBones 提供的动画遮罩和动画混合功能，大幅的降低设计师的动画开发工作量，从程序的角度灵活控制动画。例如一个人物上半身可以直立、弯腰、开火。下半身可以直立、下蹲、跑动。并且上下半身的动作可以灵活组合，例如角色可以站立开火、下蹲开火、跑动开火。而所有的这些动作都是由玩家的操控实时控制的。如果要设计师设计所有的这些动画，需要排列组合的制作 3x3 共 9 种动画，其中包含了大量的重复劳动，通过 DragonBones 的动画遮罩和动画融合的功能，设计师只需为上下半身分别设计 3 种动画，也就是一共 6 种动画，剩下的事交给程序实现就可以了。

下面分别介绍动画混合和动画遮罩这两个功能。

* 动画混合
动画混合是指一个骨架同时可以播放多个动画。例如下面的代码,可以让角色同时播放跑步和开火的动画。

```
armatureDisplay.animation.fadeIn("run", 0.2, 0, 0, "NORMAL_ANIMATION_GROUP");
armatureDisplay.animation.fadeIn("fire", 0.1, 1, 0, "ATTACK_ANIMATION_GROUP");
```

* 动画遮罩
动画遮罩就是只将动画的一部分呈现出来，例如下面的代码，将只播放head和body两个骨头的跑步动画，其他骨头将维持原姿势不动。

```
let animationState = armatureDisplay.animation.fadeIn("run");
animationState.addBoneMask("head");
animationState.addBoneMask("body_u");
```

这个功能就是通过 AnimationState 的 addBoneMask 这个 API 来实现的。

这里需要解释的一点就是 DragonBones 骨骼动画在运行时有一个组的概念，我们可以让动画在一个组中播放，当另一个动画被设置为在相同组中播放时，之前播放的同组动画就会停止，所以我们可以把希望同时播放的动画放在不同的组里。就像上面的代码中，我们可以把开火放到上半身组，跑步放到下半身组，这样角色就可以同时开火和跑步了。

最后将动画遮罩和动画混合一起使用，代码如下

```
armatureDisplay.animation.fadeIn("run", 0.2, 0, 0, "NORMAL_ANIMATION_GROUP");

let animationState = armatureDisplay.animation.fadeIn("fire", 0.1, 1, 0, "ATTACK_ANIMATION_GROUP");
animationState.addBoneMask("body_u");
```
