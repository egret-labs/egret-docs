## 更新内容

### 概述

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的[3D引擎](https://github.com/egret-labs/egret-3d)，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。


本次更新内容汇总了从引擎 3.1.8 到 3.2.0 的改动。

* 新增 canvas 模式支持发光和投影滤镜
* 新增更高效的 DragonBones 动画
* 修复 RES.hasRes 判断异常问题
* 修复滤镜和遮罩同时使用显示异常问题
* 修复 BitmapText 字间距测量不准确问题


### DragonBones 白鹭极速格式
DragonBones 4.7 引入了一套精简的动画模式 **白鹭极速格式**，目的在进一步优化骨骼动画（元件动画，区别与序列帧动画）在 H5 上的性能和内存问题。

* DragonBones 的 Armature 能够支持非常细腻的动画补间和动画融合，还有酷炫的网格动画，同时这些功能也会在每帧消耗大量的 CPU 计算，Movie 削减了这些功能，保留核心功能提供的 90% 的动画需求维持原有效果。

* **白鹭极速格式** 的原理是将复杂的动画直接缓存到二进制数据中，这样就不需要在运行时缓存，也不需要复杂的解析数据过程，更不需要创建中间数据结构，优化了动画初始化的性能和内存的开支，相应的将不支持融合动画、混合动画、网格动画，由于运行时没有皮肤、骨骼、插槽的概念，所以不支持获取骨骼或插槽的位置，无法修改骨骼或插槽的任何属性，也就不支持换装。

* **白鹭极速格式** 适用于那些完全不需要在播放中改变的动画（或称之为静态动画），可以理解为动画设计师把动画制作成什么样子，动画在程序中播放就是什么样子，程序没有办法动态的改变动画中的任何元素。

#### 性能测试对比
* [Armature](http://developer.egret.com/cn/article/index/id/1044)
* [白鹭极速格式](http://developer.egret.com/cn/article/index/id/1045)

#### Armature 和 白鹭极速格式 的使用对比
* 使用 Armature ： 

```
dragonBones.EgretFactory.factory.parseDragonBonesData(RES.getRes("dragonBonesData")); // 解析骨骼动画数据
dragonBones.EgretFactory.factory.parseTextureAtlasData(RES.getRes("textureData"), RES.getRes("texture")); // 解析贴图数据
var armatureDisplay:EgretArmatureDisplay = dragonBones.EgretFactory.factory.buildArmatureDisplay("DragonBoy"); // 创建 Armature
armatureDisplay.animation.play("walk"); // 播放动画
this.addChild(armatureDisplay); // 添加 Armature 到显示列表
```

* 使用 白鹭极速格式 ：

```
dragonBones.addMovieGroup(RES.getRes("movie"), RES.getRes("texture")); // 添加动画数据和贴图
var movie:dragonBones.Movie = dragonBones.buildMovie("DragonBoy"); // 创建 白鹭极速格式 的动画
movie.play("walk"); // 播放动画
this.addChild(movie); // 添加 Movie 到显示列表
```

### 事件
 **白鹭极速格式**使用 MovieEvent 事件，支持开始、循环、结束、帧、声音等事件，对 Movie 的更多了解可以参考 [API 文档](http://developer.egret.com/cn/apidoc/)和[例子代码](http://developer.egret.com/cn/portal/article/index/id/1046)。

### 导出二进制数据
使用 DragonBonesPro(4.8版本以后) 支持导出**白鹭极速格式**使用的二进制数据格式。


#### 路线图
* 优化滤镜性能
