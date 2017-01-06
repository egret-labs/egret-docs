首先从DragonBones Pro中导出一份骨骼动画数据。你可以点击下面的连接下载。

[Robot.zip](http://sedn.egret.com/ueditor/20150701/55937e0a59ba9.zip)

我们通过Res Depot工具将资源中的`texture.png`，`texture.json`和`RobotGame_1.json` 添加到项目组中。

使用RES模块加载资源完成后，可以创建基于DragonBones的骨骼动画。

实例化DragonBones所需要的数据。

```
var dragonbonesData = RES.getRes( "RobotGame_1_json" );  
var textureData = RES.getRes( "texture_json" );  
var texture = RES.getRes( "texture_png" );
```

DragonBones动画由工厂类进行管理，可以使用EgretFactory对象来处理所有的动画数据以及贴图。
步骤如下：

1. 创建EgretFactory类型对象
2. 解析外部数据，并添加至EgretFactory中
3. 设置动画中绑定的贴图

```
var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();  
dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));  
dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
```

数据准备好后，需要从数据中提取出需要的骨架系统。在DragonBones中，骨架有多个骨骼组成。每个骨架中绑定了当前骨架的动画数据。

`var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("robot");`

通过`buildArmature`方法，我们提取名称为`robot`的骨架。要想在舞台中看到该骨架，我们需要将其显性的添加到的舞台当中，可以使用下面语句。

```
this.addChild(armature.display);
armature.display.x = 200;
armature.display.y = 300;
armature.display.scaleX = 0.5;
armature.display.scaleY = 0.5;
```

`armature`是名称为`robot`的骨架对象，其中display为当前骨架的显示对象。将其添加到显示列表中，就可以在舞台中看到当前提取的机器人。效果如图：

![](56c3144fce23f.png)

dragonBones.EgretFactory中内置文件解析器，可以方便的设置骨骼动画数据，同时新增buildArmatureDisplay方法，快速获取骨骼动画所需要的显示对象。

```
//定义dragonBones.EgretFactory对象
private factory:dragonBones.EgretFactory;

this.factory = new dragonBones.EgretFactory();
this.factory.parseDragonBonesData(RES.getRes("man_json"));
this.factory.parseTextureAtlasData(RES.getRes("man_texture_json"), RES.getRes("man_texture_png"));

//直接生成骨骼动画显示对象，该对象实现IArmatureDisplay接口
var ar:dragonBones.EgretArmatureDisplay = this.factory.buildArmatureDisplay("man");
ar.animation.play("runFront",0);
ar.x = 200;
ar.y = 800;
this.addChild( ar );
```

需要播放的动画名称，可参考下图，在DragonBones Pro中，动画面板罗列了所有可播放的动画名称。

![](56c314504fd66.png)

