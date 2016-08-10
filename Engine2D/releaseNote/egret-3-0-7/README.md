Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的 2D 引擎及全新打造的 3D 引擎，它解决了 HTML5 性能问题及碎片化问题，灵活地满足开发者开发 2D 或 3D 游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 3.0.7 中，我们更新了 Egret Engine 3D 的内容，使得引擎更加完善，高效和易用。同时 Egret Engine 2D 支持在 WebGL 渲染模式下使用自动脏矩形。下面介绍 Egret Engine 3.0.6 到 Egret Engine 3.0.7 之间的更新详情。

### Egret Engine 3D

在 Egret Engine 3D 的本次更新中，我们增加了一些新功能并修复若干问题。下面列出的是 3.0.6 到 3.0.7 的更新详情。

#### 新增内容

* [增加 UV 滚动动画](http://edn.egret.com/cn/apidoc/index/name/egret3d.UVRollMethod)

	通过 Egret Engine 3D 新增的 UVRollMethod 类可以用来实现 UV 滚动效果。通过设置 UV 滚动动画可以实现流动的水或岩浆等效果。
	使用 UVRollMethod 制作 UV 滚动动画,参考：[UV 滚动动画效果示例](http://edn.egret.com/cn/portal/article/index/id/931)

* [增加 UV 精灵动画](http://edn.egret.com/cn/apidoc/index/name/egret3d.UVSpriteSheetMethod)

	新增的 UVSpriteSheetMethod 类用来实现UV精灵动画的渲染方法 。UV 精灵动画是将一整张贴图中用行列来分割帧动画，然后实现每帧播放。其行数 × 列数是总帧数。可以通过设置 frameNum 来控制只播放的帧数。
	使用 UVSpriteSheetMethod 制作 UV 精灵动画，参考：[UV 精灵动画效果示例](http://edn.egret.com/cn/portal/article/index/id/932)

* [新增AOMap贴图](http://edn.egret.com/cn/apidoc/index/name/egret3d.AOMapMethod)

	新增 AOMapMethod 类，可以使用渲染好的 AO 贴图进行渲染，增加渲染表现效果。

* [新增地形贴图混合](http://edn.egret.com/cn/apidoc/index/name/egret3d.TerrainARGBMethod)

	新增 TerrainARGBMethod 类，地形贴图混合渲染方法。使用一张贴图中的ARGB色来进行4张贴图进行混合。

* [新增 Exponential Height Fog（顶点雾）功能](http://edn.egret.com/cn/apidoc/index/name/egret3d.FogMethod)

	新增 FogMethod，使用新增的 FogMethod 类可以创建 Exponential Height Fog（顶点雾）渲染。

#### 修复问题

* 修复了检测碰撞没有作用的 BUG。
* 修复加载多个模型在场景中会出现异常的 BUG。
* 修复当场景中物体时摄像机会在一个位置看不到物体的 BUG。
* 修复渲染线框由于顶点过多导致无法渲染的 BUG。 

#### 教程文档

在更新引擎的同时我们提供了新的教程，并将逐步完善。

您可以从入门教程开始学习：[Egret3D入门](http://edn.egret.com/cn/docs/page/906)

更深入的API学习可以点击：[Egret3D API](http://edn.egret.com/cn/apidoc/index/name/egret3d.AudioManager)

### Egret Engine 2D
 
在 Egret Engine 2D 的本次更新中，我们吸收开发者的建议进一步稳定引擎并修复若干问题。下面列出的是 3.0.6 到 3.0.7 的更新详情。

#### WebGL 支持脏矩形渲染

在本次更新中，Egret Engine 2D 的 WebGL 渲染模式支持了对自动脏矩形渲染的支持。自动脏矩形脏矩形只重绘屏幕发生改变的区域，可以获得性能的提升。需要注意的是由于和 Canvas 模式的渲染机制不同，自动脏矩形对 WebGL 渲染的性能提升比较小，可以手动关闭脏矩形渲染。

#### 修复问题

* 修复一系列 WebGL 渲染异常问题。
* 修复 TextField 文字宽度过小时出错的 BUG。
* 修复 EUI 只能绑定一个数据的 BUG。
* 修复 Video 动态改变宽高，舞台上有残影问题。
* 修复 Tabbar 在某些情况下无法正常切换问题。

### 获取 Egret Engine

Windows 安装包下载地址：[点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.0.7.exe)
Mac 安装包下载地址：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.0.7.dmg)
Egret Engine 2D 源码地址：[点击这里](https://github.com/egret-labs/egret-core/tree/v3.0.7)
Egret Engine 3D 源码地址：[点击这里](https://github.com/egret-labs/egret-3d/releases/tag/v3.0.7)




