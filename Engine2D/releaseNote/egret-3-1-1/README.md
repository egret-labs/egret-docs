Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的 2D 引擎及全新打造的 3D 引擎，它解决了 HTML5 性能问题及碎片化问题，灵活地满足开发者开发 2D 或 3D 游戏的需求，并有着极强的跨平台运行能力。

## Egret Engine 3D

在 Egret Engine 3D 的本次更新中，我们增加了一些新功能并修复若干问题。下面列出的是 3.1.0 到 3.1.1 的更新详情。

### 更新内容

* 增加材质球 [UV repat](http://edn.egret.com/cn/apidoc/index/name/egret3d.MaterialBase#repeat)

	设置材质 repeat 值。设置材质 是否进行纹理重复采样的方式开关。

* 增加渲染 [RenderToTexture](http://edn.egret.com/cn/apidoc/index/name/egret3d.RenderTexture)

	RenderToTexture 可以渲染到内容到一张贴图。

* 增加 [View3D 背景贴图](http://edn.egret.com/cn/apidoc/index/name/egret3d.View3D#backImage)

* 增加 MatCap 材质球系列

### 工具

* 增加 Unity3D 模型导出插件

	下载 Unity3D 模型导出插件：[Unity Export tool](https://github.com/egret-labs/egret-3d/tree/rc/3.1.1/ExportTools/unity%20Export%20tool)

	使用说明:[Unity3D 插件使用说明](https://github.com/egret-labs/egret-3d/blob/rc/3.1.1/ExportTools/unity%20Export%20tool/%E6%8F%92%E4%BB%B6%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.md)

### 修复问题

* 修复正交相机渲染错误的 BUG。
* 修复HUD宽高渲染不正常的 BUG。
* 修复材质不给贴图时渲染异常的 BUG。
* 修复同一个物体多次渲染异常的 BUG。

### 教程文档

在更新引擎的同时我们提供了新的教程，并将逐步完善。

您可以从入门教程开始学习：[Egret3D入门](http://edn.egret.com/cn/docs/page/906)

更深入的API学习可以点击：[Egret3D API](http://edn.egret.com/cn/apidoc/index/name/egret3d.AlphaMaskMethod)

## Egret Engine 2D

继大幅提升了WebGL渲染能力，优化了重度化3D HTML5游戏开发性能之后，白鹭引擎（Egret  Engine）3.1.1版本将给开发者带来新的惊喜——新增了对Mesh功能的支持。

这意味着Egret开发者们创作大型重度游戏时，可以引用柔体动画制作的素材，大大缩短美术动画设计的时间，同时在跨平台运行中更加顺畅。

### 新增 Mesh 功能

在本次更新中新增 WebGL 模式下支持 Mesh 渲染。使用柔体动画技术，上图中的小熊披风和表情相比传统骨骼动画而言更为逼真，所需的素材体积也更小。

开发者可以根据自己项目需求结合DragonBones Pro等骨骼动画制作工具，自定义各种变形效果（柔体动画）进行显示。

![](574c05d2113e5.png)

仅需上图中简单的素材，就可以创作出下图中的动画，大大节省美术设计时间。

![](574c05d22e811.gif)

使用 DragonBones Pro 制作 Mesh 动画参考教程：[DragonBones Pro用户手册：网格](http://edn.egret.com/cn/docs/page/874)

使用 DragonBones Pro 导出动画参考教程:[导出](http://edn.egret.com/cn/docs/page/386)

#### 播放 Mesh 动画

在 Egret Engine 中使用 DragonBones 的 Mesh 动画与其动画的使用方式基本相同。以 DragonBones Pro 导出的纹理集为例，如下：

``` 
//获取动画数据
var dragonbonesData = RES.getRes( "Ubbie_json" );
//获取纹理集数据
var textureData = RES.getRes( "texture_json" ); 
//获取纹理集图片
var texture = RES.getRes( "texture_png" );

//创建一个工厂，用来创建Armature
var dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();  
//把动画数据添加到工厂里
dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
//把纹理集数据和图片添加到工厂里
dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
//从工厂里创建出Armature
var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("ubbie");

armature.display.x = 200;
armature.display.y = 400;
armature.display.scaleX = 0.5;
armature.display.scaleY = 0.5;

this.addChild(armature.display);

dragonBones.WorldClock.clock.add( armature );.
//播放动画
armature.animation.gotoAndPlay("turn face");  

var time:number;

egret.startTick(this.onTicker, this);
```

其中的 onTicker 代码如下:

```
private _time:number;

private onTicker(timeStamp:number) {

    if(!this._time) {
        this._time = timeStamp;
    }

    var now = timeStamp;
    var pass = now - this._time;
    this._time = now;
    //心跳时钟开启
    dragonBones.WorldClock.clock.advanceTime(pass / 1000);

    return false;
}
```

> 需要注意的是 Mesh 动画功能还在完善中，未来会支持 DragonBones 的急速模式。
> 在 Web 的 Canvas 渲染模式下和 Native 下暂不支持 Mesh 动画。
> 考虑性能的影响应尽量控制 Mesh 动画的点。

### AndroidSupport 支持 Video 播放

引擎打包Android原生应用以及runtime环境下已全面支持视频播放，开发者可以将视频完美的嵌入到游戏之中，同时对外的API和h5一致，无需开发者写平台兼容性代码

> 需要注意的是暂不支持通过 url 载入视频。Android 原生下视频需要打包到 APK 中， Runtime 需要手动放入 zip (代码包) 中才能正常播放。

### 修复问题

* 修复 REMOVED_FROM_STAGE 事件可能会重复调用问题。
* 修复 ProgressBar 重复设置方向导致错误问题。
* 修复使用 Graphics 做遮罩显示异常问题。
* 修复 ColorMatrixFilter 显示异常问题。

### 获取 Egret Engine

Windows 安装包下载地址：[点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.1.1.exe)

Mac 安装包下载地址：     [点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.1.1.dmg)

Egret Engine 2D 源码地址：[点击这里](https://github.com/egret-labs/egret-core/tree/v3.1.1)

Egret Engine 3D 源码地址：[点击这里](https://github.com/egret-labs/egret-3d/tree/rc/3.1.1)




