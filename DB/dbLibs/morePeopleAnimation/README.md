DragonBones 系统中允许创建多个骨骼动画，用户可以创建多个 Factory 来管理不同的骨骼动画，也可使用同一个 Factory 来管理多个骨骼动画。
* 当使用一个 Factory 时，需要注意避免龙骨数据或骨架数据重名。
* 如果没有特殊需求，建议不要使用多个 Factory 实例

使用多个EgretFactory方法可参考**创建骨骼动画**一节。
范例如下：

```
let dragonbonesData = RES.getRes( "RobotGame_1_json" );
let textureData = RES.getRes( "texture_json" );
let texture = RES.getRes( "texture_png" );

// 
let egretFactoryA = new dragonBones.EgretFactory();
egretFactoryA.parseDragonBonesData(dragonbonesData);  
egretFactoryA.parseTextureAtlasData(textureData, texture);

let armatureDisplayA = egretFactoryA.buildArmatureDisplay("robot");
this.addChild(armatureDisplayA);
armatureDisplayA.x = 200;
armatureDisplayA.y = 300;
armatureDisplayA.scaleX = 0.5;
armatureDisplayA.scaleY = 0.5;

// 
let egretFactoryB = new dragonBones.EgretFactory();
egretFactoryB.parseDragonBonesData(dragonbonesData);  
egretFactoryB.parseTextureAtlasData(textureData, texture);

let armatureDisplayB = egretFactoryB.buildArmatureDisplay("robot");
this.addChild(armatureDisplayB);
armatureDisplayB.x = 250;
armatureDisplayB.y = 350;
armatureDisplayB.scaleX = 0.5;
armatureDisplayB.scaleY = 0.5;
```

效果如图：

![](56c314eb7853f.png)

使用同一 Factory 方法如下：

```
let dragonbonesDataA = RES.getRes( "RobotGame_1_json" );
let textureDataA = RES.getRes( "texture_json" );
let textureA = RES.getRes( "texture_png" );

let dragonbonesDataB = RES.getRes("Dragon_json");
let textureDataB = RES.getRes("dragontexture_json");
let textureB = RES.getRes("dragontexture_png");

let egretFactory = dragonBones.EgretFactory.factory;
egretFactory.parseDragonBonesData(dragonbonesDataA);  
egretFactory.parseTextureAtlasData(textureDataA, textureA);
egretFactory.parseDragonBonesData(dragonbonesDataB);  
egretFactory.parseTextureAtlasData(textureDataB, textureB);

let armatureDisplayA = dragonbonesFactory.buildArmatureDisplay("robot");
this.addChild(armatureDisplayA);
armatureDisplayA.x = 200;
armatureDisplayA.y = 300;
armatureDisplayA.scaleX = 0.5;
armatureDisplayA.scaleY = 0.5;

let armatureDisplayB = dragonbonesFactory.buildArmatureDisplay("Dragon");
this.addChild(armatureDisplayB);
armatureDisplayB.x = 250;
armatureDisplayB.y = 350;
armatureDisplayB.scaleX = 0.5;
armatureDisplayB.scaleY = 0.5;
```

效果如图：

![](56c314eba5994.png)
