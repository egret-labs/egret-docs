![](56a5917e4a724.jpg)

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 3.0 中包含了 Egret Engine 3D 和 Egret Engine 2D 两部分，以后会融合在一起，形成完整统一的 Egret Engine。

下面介绍 Egret Engine 3.0.1 到 Egret Engine 3.0.2 之间的更新详情。


### Egret Engine 2D 

在 Egret Engine 2D 的 本次更新中，我们吸收开发者提供的反馈和建议，进一步稳定引擎并优化了一些体验。下面列出的是 3.0.1 到 3.0.2 的更新详情。 

#### Scroller

在 Egret Engine 3.0.2 优化了 Scroller 的体验，并新增了`stopAnimation()`方法，可以立即停止当前的滚动动画。比如像下面这样直接调用即可停止动画。

```
//停止滚动动画
myscroller.stopAnimation();
```

更多关于 `scroller` 的教程可以点击：[滚动控制容器](http://edn.egret.com/cn/docs/page/611)

同时我们修复了 Scroller 的一些问题：

* 优化按住 Scroller 后，设置 Scroller.viewport.scrollV 体验
* 修复 Scroller.throwSpeed 设置为0引发的bug
* 修复某些状况下 Scroller 的事件没有移除

#### 修复的其他问题

* tsconfig 中的 target 和 outDir 参数如果和引擎默认参数一致，编译时不再抛出不许修改的提示信息
* 修复文本测量bug
* 修复 eui 内存泄露问题
* 修复加载空文本文件导致报错问题

