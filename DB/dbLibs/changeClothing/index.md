# DragonBones局部换装与全局换装

DragonBones 4.7中增加一些全新API，并提供全新的局部换装与整体换装功能。

### 创建DragonBones动画新API

`dragonBones.EgretFactory`中内置文件解析器，可以方便的设置骨骼动画数据，同时新增`buildArmatureDisplay`方法，快速获取骨骼动画所需要的显示对象。

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

`dragonBones.EgretArmatureDisplay`对象会自动绑定`WorkClock`，无需手动添加。

运行后效果如图：

![](db1.png)

### 局部换装

原有换装方案，可以替换对应slot中的图片实现，但会存在图片位置错位问题。新版本局部换装功能，可通过DragonBones预设置替换内容实现此功能。

原始动画如下：

![](db2.png)

我们可以替换其头发的内容，新建一个DragonBones项目，将新头发加入其资源库，然后放入场景中。

具体替换创建新项目的原因在于获取图片轴点与骨骼原点的相对位置。

在新项目中调整好头发的位置后，导出数据。

![](db3.png)

在上面的代码中继续添加如下代码。

```
this.factory.parseDragonBonesData(RES.getRes("new_json"));
this.factory.parseTextureAtlasData(RES.getRes("new_texture_json"), RES.getRes("new_texture_png"));

this.factory.replaceSlotDisplay( "NewProject", "Armature", "ti", "bb", ar.armature.getSlot("Atoufa"));
```

通过`replaceSlotDisplay`方法来替换其中头发的内容，其中第一个参数为DragonBonesName，如果你在解析DragonBones数据时为添加其参数，那么该参数可以填写`null`或者填写项目名称。

后面三个参数均为数据源标记，最后一个参数则是要替换的目标slot。

编译后运行效果如图：

![](db4.png)

**你可以在新项目中放置多个即将替换的纹理素材，然后在局部替换时，选择你所需要的贴图纹理。**

### 全局换装

全局换装可实现将一个骨骼动画的骨架中全部贴图替换，如果使用全局换装功能，则新骨骼动画纹理集与源骨骼动画纹理集必须尺寸以及内部元素尺寸相同。

你可以使用如下代码来进行全局换装

```
ar.armature.replaceTexture(RES.getRes("new_db_texture_png"));
```

 
