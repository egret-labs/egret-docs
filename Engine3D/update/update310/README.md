Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的 2D 引擎及全新打造的 3D 引擎，它解决了 HTML5 性能问题及碎片化问题，灵活地满足开发者开发 2D 或 3D 游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 的本次更新中，提供了若干新的功能，同时我们吸收开发者的意见修复若干问题。下面介绍 Egret Engine 3.0.8 到 Egret Engine 3.1.0 之间的更新详情。

## Egret Engine 3D

在 Egret Engine 3D 的本次更新中，我们增加了一些新功能并修复若干问题。下面列出的是 3.0.8 到 3.1.0 的更新详情。

### 更新内容

* [LightMap](http://edn.egret.com/cn/apidoc/index/name/egret3d.LightmapMethod) 

	三维软件里实现打好光，然后渲染把场景各表面的光照输出到贴图上.然后使用模型的第 2UV，渲染出 Lightmap 效果。

* [AlphaMask](http://edn.egret.com/cn/apidoc/index/name/egret3d.AlphaMaskMethod)

	实现 Alpha 遮罩渲染方法。该贴图的 R 通道被用于赋值到 diffuse 数据的 Alpha 上面。

* [cutAlpha](http://edn.egret.com/cn/apidoc/index/name/egret3d.MaterialBase#cutAlpha)

	新增图片镂空，Alpha 剔除功能。通过设置材质的 cutAlpha 值设置带透明贴图的材质透明部分的阀值。

* 重置 Shader 结构

	增加着色 Phase。

### 修复问题

* 修复了3DMAX 模型导出插件读取 UV 的 BUG。
* 修复了模型使用 Alpha 贴图导致深度乱序的 BUG。
* 修复粒子系统生命周期的 BUG。
* 修复粒子系统跟随 BUG。
* 修复粒子系统较高的发射速率 BUG。
* 修复材质系统 gloss 值失效。 
* 修复材质系统 specularLevel 值失效。
* 修复材质系统 BlendModle.NORMAL 透明乱序。
* 修复 DirectLight 高光显示错误。
* 修复 PointLight 高光显示错误。

### 教程文档

在更新引擎的同时我们提供了新的教程，并将逐步完善。

您可以从入门教程开始学习：[Egret3D入门](http://edn.egret.com/cn/docs/page/906)

更深入的API学习可以点击：[Egret3D API](http://edn.egret.com/cn/apidoc/index/name/egret3d.AlphaMaskMethod)

