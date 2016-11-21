![](569369d1afb0a.jpg)

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 3.0 中包含了 Egret Engine 3D 和 Egret Engine 2D 两部分，以后会融合在一起，形成完整统一的 Egret Engine。

下面介绍 Egret Engine 3.0.0 到 Egret Engine 3.0.1 之间的更新详情。

## Egret Engine 3D

Egret Engine 3D 在本次更新中主要关注于以下方面：

* 完善3D引擎功能及修复已有问题
* 完善3D功能示例
* 完善API描述

### 更新内容

Egret Engine 3.0是全新的3D渲染引擎，在本次更新中我们吸收了开发者提供的建议，修改了以下内容

* 显示列表优化 新增 Scene3D 
	新增Scene3D 场景显示列表管理类，方便拓展场景渲染树
* billbord 公告板
	新增的BillBoard 是一个永远面对摄像机的显示对象
* object3D 按轴旋转
	让所有继承于Object3D 的对象可以自定义偏移的旋转轴
* Directlight 增加背光
	DirectLight新增背光及背光强度的接口，提高实时渲染灯光效果
* 新增AOMapMethod 环境光吸收贴图 材质球方法
	添加的AOMapMethod可以将使用渲染工具烘焙的AO贴图添加到材质球上，极大地优化显示效果

### 新增五款示例

* [场景加载](http://edn.egret.com/cn/article/index/id/805)
* [地形融合](http://edn.egret.com/cn/article/index/id/812)
* [模型材质](http://edn.egret.com/cn/article/index/id/814)
* [360全景照片](http://edn.egret.com/cn/article/index/id/813)
* [高级角色材质渲染](http://edn.egret.com/cn/article/index/id/804)

### 联系我们

获取 Egret Engine 3D 的源码: [Egret Engine 3D](https://github.com/egret-labs/egret-3d)。

查阅 Egret Engine 3D API: [Egret Engine 3D API](http://edn.egret.com/cn/apidoc/index/name/egret3D.AnimaNodeCollection)。

更多关于 Egret Engine 3D 的教程欢迎关注 EDN [Egret Engine 3D 分类](http://edn.egret.com/cn/docs/page/775)。

在体验的过程中如果遇到任何问题希望您能留下宝贵意见，更欢迎大家在 Egret Engine 3D 论坛交流:[Egret3D 交流贴](http://bbs.egret.com/forum.php?mod=viewthread&tid=15653)。

Egret Engine 3D 官方交流群: 180593985 。

