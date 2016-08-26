Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的 2D 引擎及全新打造的 3D 引擎，它解决了 HTML5 性能问题及碎片化问题，灵活地满足开发者开发 2D 或 3D 游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 3.0.7 中，我们更新了 Egret Engine 3D 的内容，使得引擎更加完善，高效和易用。同时 Egret Engine 2D 支持在 WebGL 渲染模式下使用自动脏矩形。下面介绍 Egret Engine 3.0.6 到 Egret Engine 3.0.7 之间的更新详情。


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




