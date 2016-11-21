Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的 2D 引擎及全新打造的 3D 引擎，它解决了 HTML5 性能问题及碎片化问题，灵活地满足开发者开发 2D 或 3D 游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 的本次更新中，我们队引擎的性能进行了优化，同时也提供了若干新功能。下面介绍 Egret Engine 3.0.7 到 Egret Engine 3.0.8 之间的更新详情。

## Egret Engine 3D

在 Egret Engine 3D 的本次更新中，我们增加了一些新功能并修复若干问题。下面列出的是 3.0.7 到 3.0.8 的更新详情。

### 更新内容

* [HUD](http://edn.egret.com/cn/apidoc/index/name/egret3d.HUD)

	[HUD](http://edn.egret.com/cn/apidoc/index/name/egret3d.ParticleAnimation)直接渲染在屏幕上的一张贴图，可直接指定2维坐标，贴图的宽度和高度。

* 场景中可以进行用四叉树裁剪

	场景中静止不动的对象，可以使用四叉树裁剪，提高进入视锥渲染的效率。

* [粒子系统](http://edn.egret.com/cn/apidoc/index/name/egret3d.ParticleAnimation)

	新增粒子系统。通过 [ParticleAnimation](http://edn.egret.com/cn/apidoc/index/name/egret3d.ParticleAnimation) 类可以添加 3D 粒子效果。

* [陀螺仪事件](http://edn.egret.com/cn/apidoc/index/name/egret3d.OrientationEvent3D)

	通过 [OrientationEvent3D](http://edn.egret.com/cn/apidoc/index/name/egret3d.OrientationEvent3D) 监听陀螺仪事件。

* [寻路系统](http://edn.egret.com/cn/apidoc/index/name/egret3d.Navi3DEdge)

### Bug列表

* 修复了 UV 贴图反向 BUG

#### 教程文档

在更新引擎的同时我们提供了新的教程，并将逐步完善。

您可以从入门教程开始学习：[Egret3D入门](http://edn.egret.com/cn/docs/page/906)

更深入的API学习可以点击：[Egret3D API](http://edn.egret.com/cn/apidoc/index/name/egret3d.AudioManager)
