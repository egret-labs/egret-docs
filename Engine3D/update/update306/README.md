![](5704e709845a4.JPG)

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 3.0.6 中，我们大幅度更新了 Egret Engine 3D 的内容，使得引擎更加完善，高效和易用。同时在 Egret Engine 2D 中推出 WebGL 渲染支持，可以灵活选用渲染模式。下面介绍 Egret Engine 3.0.5 到 Egret Engine 3.0.6 之间的更新详情。

### Egret Engine 3D

为了让egret3D更加强大，故收集大多数意见，在稳定版来临之时，我们将修改更高级层次的引擎，性能更高，api更简易，功能更强大。

#### 新增特性

* 优化渲染框架，提升至少30%性能。

* 优化shader使用方式。

* 增加Egret3DCnavas 支持多View3D显示方式，意味着你可以多窗口显示模型。

* geometry 支持多子模型，多材质ID。

* material 支持多维材质，并支持多pass渲染（比如 normal，depth 渲染）。

* skeleton animation 支持46+骨骼动画。

* shader 内加载方式，减少HTTP请求数量。

* 增加 billboard 公告板 , 永远面对摄像机的显示面片。

* 增加优化 材质特效使用方式。

* 增加 材质 Blender。

* 增加 材质 透明剔除阈值。

* 与egret2D较好支持混合。

#### 新增教程

在更新引擎的同时我们提供了新的教程，并将逐步完善。

您可以从入门教程开始学习：[Egret3D入门](http://edn.egret.com/cn/docs/page/906)

更深入的API学习可以点击：[Egret3D API](http://edn.egret.com/cn/apidoc/index/name/egret3d.AudioManager)


