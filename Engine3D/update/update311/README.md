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

