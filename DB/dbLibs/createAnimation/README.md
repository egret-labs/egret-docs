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

1. 解析外部数据，并添加至EgretFactory中
2. 设置动画中绑定的贴图

```
let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
egretFactory.parseDragonBonesData(dragonbonesData);  
egretFactory.parseTextureAtlasData(textureData, texture);
```

数据准备好后，需要从数据中提取出需要的骨架系统。在DragonBones中，骨架有多个骨骼组成。每个骨架中绑定了当前骨架的动画数据。

`let armatureDisplay: dragonBones.EgretArmatureDisplay = dragonbonesFactory.buildArmatureDisplay("robot");`

通过`buildArmatureDisplay`方法，我们提取名称为`robot`的骨架。要想在舞台中看到该骨架，我们需要将其显性的添加到的舞台当中，可以使用下面语句。

```
this.addChild(armatureDisplay);
armatureDisplay.x = 200;
armatureDisplay.y = 300;
armatureDisplay.scaleX = 0.5;
armatureDisplay.scaleY = 0.5;

armatureDisplay.animation.play("Walk");
```

`armatureDisplay`是名称为`robot`的骨架对象的显示对象。将其添加到显示列表中，就可以在舞台中看到当前提取的机器人。效果如图：

![](56c3144fce23f.png)

需要播放的动画名称，可参考下图，在DragonBones Pro中，动画面板罗列了所有可播放的动画名称。

![](56c314504fd66.png)

