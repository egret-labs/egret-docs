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

## Egret Engine 2D

下面汇总了 Egret Engine 2D 在 3.0.1 中的更新详情。

### 修复声音播放问题

声音播放在实际应用中是非常重要的功能，在本次更新中，经过反复测试解决了声音播放延时、重复加载、不能循环播放、火狐浏览器卡住等在移动设备上有可能出现的兼容性问题。

为解决声音的兼容性问题，我们进行了多重测试。为得到最大的兼容性，播放的声音资源也需要处理。请严格按照我们提供的教程来处理音频资源。更多的兼容格式我们正在测试，以得到最佳的兼容体验。

解决音频系统的问题请参考教程：[音频系统](http://edn.egret.com/cn/docs/page/156)

### 新增取消触摸事件

在事件系统中新增了`TOUCH_CANCEL`事件，某个事件取消了触摸时会触发该事件。比如 eui.Scroller 在开始滚动后会触发 `TOUCH_CANCEL` 事件，不再触发后续的 `TOUCH_END` 和 `TOUCH_TAP` 事件。

需要注意到的是,`eui.Scroller` 中 `eui.UIEvent.CHANGE_START` 只在滚动开始时抛出，滚动中不再抛出。滚动中抛出 `egret.Event.CHANGE` 事件。

使用 `TOUCH_CANCEL` 请参考教程：[取消触摸事件](http://edn.egret.com/cn/docs/page/798)

### 新增UI事件派发参数

在 `eui.UIEvent`的`dispatchUIEvent()`方法中，新增了`bubbles`和`cancelable`两个参数， 统一了设计。其中`bubbles`确认是否在事件流冒泡阶段参与，`cancelable`确认事件是否可以被取消，他们的默认值都是`false`。

关于`dispatchUIEvent`的API：[dispatchUIEvent](http://edn.egret.com/cn/apidoc/index/name/eui.UIEvent#dispatchUIEvent)

### 修复的其他问题

* 修复 IOS 工程不能自动修改入口文件的问题。
* 修复报错信息重复累积显示的问题。
* create_app 创建项目跟随H5项目的版本。
* 修复 MovieClipData 获取到的纹理对象 offset 属性异常。
* 修复文本缩放后脏矩形区域异常问题。



