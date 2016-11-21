Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的 2D 引擎及全新打造的 3D 引擎，它解决了 HTML5 性能问题及碎片化问题，灵活地满足开发者开发 2D 或 3D 游戏的需求，并有着极强的跨平台运行能力。

## Egret Engine 3D

在 Egret Engine 3D 的本次更新中，我们增加了一些新功能并修复若干问题。下面列出的是 3.1.1 到 3.1.2 的更新详情。

### 更新内容

* 增加 [VideoTexture](http://developer.egret.com/cn/apidoc/index/name/egret3d.VideoTexture)
    
	使用 VideoTexture 可以通过 Video 标签采集视频。使用时需要注意设置贴图的宽度和高度必须为2的N次方。

* 增加 HUD 可自定义 shader

* 增加 [Streamer](http://developer.egret.com/cn/apidoc/index/name/egret3d.StreamerMethod) 材质特效

    使用 StreamerMethod 可以实现UV流光滚动效果的渲染方法。

* 增加 MRT post effect 框架

	离屏渲染框架，GPU 在当前屏幕缓冲区以外新开辟一个缓冲区进行渲染操作。

* 增加多 [Pass](http://developer.egret.com/cn/apidoc/index/name/egret3d.MaterialPass) 混合渲染框架.
   
   材质渲染 Pass 根据 Mesh 数据、模型的材质还有灯光数据的不同。以不同的渲染方法，会组成相应的 shader 内容，然后渲染出不同的效果。

### 工具

* Unity3d 插件可以导出骨骼动画

下载 Unity3D 模型导出插件：[Unity Export tool](https://github.com/mebiusashan/egret-3d/tree/master/ExportTools)

使用说明:[Unity3D 模型导出插件](../../../Engine3D/Egret3DExport/Unity3d/README.md)

### 教程文档

在更新引擎的同时我们更新了 [Egret Engine 3D 的系列教程](../../../Engine3D/getStarted/getStarted/README.md)。

您可以从入门教程开始学习：[Get Started](../../../Engine3D/getStarted/getStarted/README.md)

更深入的API学习可以点击：[Egret3D API](http://developer.egret.com/cn/apidoc/index/name/egret3d.AlphaMaskMethod)

### 修复问题

* 修复 TGA 贴图不能正常使用 BUG。
* 修复 ColorMaterial 不能使用的 BUG。
* 修复 CubeMaterial 不能使用的 BUG。
* 修复 Sound 设置监听者位置没有作用的 BUG。
* 修复 normal 空间错误问题，导致灯光错误。
