在做大型游戏项目时，我们可能会为不同的角色设计相同的动画。这种情况下，可以利用DragonBones的动画复用功能，轻松实现这个需求。
DragonBones的动画复用功能能够把同名骨骼的动画数据从一个骨架拷贝到另一个骨架中。

正常播放两个骨骼动画代码如下：

```
//载入骨骼一dragonbonesData的资源
var dragonbonesData = RES.getRes( "RobotGame_1_json" );
var textureData = RES.getRes( "texture_json" );
var texture = RES.getRes( "texture_png" );
//载入骨骼二dbdata的资源
var dbdata = RES.getRes("Dragon_json");
var dbtexturedata = RES.getRes("dragontexture_json");
var dbtexture = RES.getRes("dragontexture_png");

var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
//骨骼一
dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
//骨骼二
dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dbdata));
dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(dbtexture,dbtexturedata));
//显示骨骼一
var armature:dragonBones.Armature = dragonbonesFactory.buildArmature("robot");
this.addChild(armature.display);
armature.display.x = 200;
armature.display.y = 300;
armature.display.scaleX = 0.5;
armature.display.scaleY = 0.5;
//显示骨骼二
var arm:dragonBones.Armature = dragonbonesFactory.buildArmature("Dragon");
this.addChild( arm.display );
arm.display.x = 250;
arm.display.y = 350;
arm.display.scaleX = 0.5;
arm.display.scaleY = 0.5;
//开始动画
dragonBones.WorldClock.clock.add( armature );
dragonBones.WorldClock.clock.add( arm );
armature.animation.gotoAndPlay("Run");
arm.animation.gotoAndPlay("walk");
egret.Ticker.getInstance().register(
  function(frameTime:number){dragonBones.WorldClock.clock.advanceTime(0.01)},
  this
);
```

可使用动画拷贝工具，将Robot骨架中得动画数据拷贝到Dragon骨架中。使用`EgretFactory`中的`copyAnimationsToArmature`方法可实现该效果。

`copyAnimationsToArmature`方法第一个参数为接收动画数据的骨架，第二个参数为被拷贝动画数据的骨架名称。上例中，我们需要再第一个参数填写`arm`，第二个参数填写`Robot`。代码如下：

```
dragonbonesFactory.copyAnimationsToArmature(arm,"Robot");
```

通过以上代码，可以把工厂中armatureSource的动画赋予armatureTarget中。这个功能是通过工厂类的copyAnimationsToArmature方法实现的。

可以访问示例中心查看参考示例的效果和下载源码：
[DragonBones 高级特性](http://edn.egret.com/cn/index.php/article/index/id/713)