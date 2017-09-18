在做大型游戏项目时，我们可能会为不同的角色设计相同的动画。这种情况下，可以利用 DragonBones 的动画复用功能，轻松实现这个需求。
DragonBones 的动画复用功能够把同名骨骼的动画数据从一个骨架拷贝到另一个骨架中。

正常播放两个骨骼动画代码如下：

```
let egretFactory = dragonBones.EgretFactory.factory;

egretFactory.parseDragonBonesData(RES.getRes("DragonBonesDataA"));
egretFactory.parseTextureAtlasData(RES.getRes("TextureAtlasDataA"), RES.getRes("TextureAtlasA"));

egretFactory.parseDragonBonesData(RES.getRes("DragonBonesDataB"));
egretFactory.parseTextureAtlasData(RES.getRes("TextureAtlasDataB"), RES.getRes("TextureAtlasB"));

// let armatureDisplayA = egretFactory.buildArmatureDisplay("armatureA");
// this.addChild(armatureDisplayA);
// armatureDisplayA.x = 200;
// armatureDisplayA.y = 300;
// armatureDisplayA.scaleX = 0.5;
// armatureDisplayA.scaleY = 0.5;

let armatureDisplayB = egretFactory.buildArmatureDisplay("armatureB");
this.addChild(armatureDisplayB);
armatureDisplayB.x = 200;
armatureDisplayB.y = 300;
armatureDisplayB.scaleX = 0.5;
armatureDisplayB.scaleY = 0.5;

egretFactory.copyAnimationsToArmature(armatureDisplayB, "armatureA");

armatureDisplayB.animation.play("animationName");
```

使用 `Factory` 中的 `copyAnimationsToArmature` 方法可实现该效果。
`copyAnimationsToArmature` 方法第一个参数为接收动画数据的骨架，第二个参数为被拷贝动画数据的骨架名称。

可以访问示例中心查看参考示例的效果和下载源码：
* [DragonBones 在线演示](http://www.dragonbones.com/demo/egret/animation_copy_test/index.html)
* [DragonBones 事例源码](https://github.com/DragonBones/DragonBonesJS/blob/master/Egret/Demos/src/demo/AnimationCopyTest.ts)