![](5704e709845a4.JPG)

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 3.0.6 中，我们大幅度更新了 Egret Engine 3D 的内容，使得引擎更加完善，高效和易用。同时在 Egret Engine 2D 中推出 WebGL 渲染支持，可以灵活选用渲染模式。下面介绍 Egret Engine 3.0.5 到 Egret Engine 3.0.6 之间的更新详情。


### Egret Engine 2D
 
在 Egret Engine 2D 的本次更新中，新增了 WebGL 渲染器，可以方便的使用 WebGL 渲染模式。同时我们吸收开发者的建议，进一步提升引擎的性能，并修复若干问题。下面列出的是 3.0.5 到 3.0.6 的更新详情。

#### WebGL 渲染器

我们知道 WebGL 通过增加 OpenGL ES 2.0 的一个 JavaScript 绑定，可以为 HTML5 Canvas 提供硬件 3D 加速渲染。 Egret Engine 2D 在最新的 3.0.6 版本中提供了新的 WebGL 渲染模式。只需方便的开启 WebGL 渲染就能让我们的程序获得硬件加速。

WebGL 提供了底层的渲染 API，对于传统 Web 开发者来说使用 WebGL API 是比较复杂的，需要补充大量的 OpenGL ES 相关知识。 但在 Egret Engine 中使用 WebGL 却十分方便， 只需在程序开始时选择开启 WebGL 渲染即可。在最新的 Egret Engine 2D 中可以选择使用 Canvas 或 WebGL 渲染。使用完全相同的 API。

同时也无需担心 WebGL 标准的兼容性问题。在开启 WebGL 渲染模式下，如果浏览器不支持将自动切换到 Canvas 渲染模式下。

##### 开启 WebGL 渲染

开启 WebGL 渲染模式只需要在 Egret 启动时指定渲染模式即可。在 Egret 项目根目录中我们可以找到 index.html 文件。

在 index.html 中找到第 58 行。可以看到 Egret 的启动函数。如果要开启 WebGL 渲染只需要在其中传入参数即可。

```
egret.runEgret({renderMode:"webgl"});
```

当然我们也可以指定渲染模式为 Canvas (Egret 3.0.6 版本开始的默认参数):

```
egret.runEgret({renderMode:"canvas"});
```

在 index.html 中的启动函数简单指定渲染模式即可开启 WebGL 渲染模式。如果我们不指定任何参数将仍然使用 Canvas 渲染。

教程参考： [WebGL渲染](http://edn.egret.com/cn/docs/page/905)

#### 提升性能

* 略微提升绘制图片性能。

* 提升绘制混合模式性能。

#### 修复问题

本次更新中，我们吸收开发者提供的反馈，修复了若干问题：

* 修复 drawcall 显示不准确问题

* 修复 RenderTexture 绘制不规则遮罩对象错误问题

* 解决QQ浏览器 6.4 版本会闪屏的问题

### 获取 Egret Engine

Windows 安装包下载地址：[点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.0.6.exe)
Mac 安装包下载地址：     [点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.0.6.dmg)
Egret Engine 2D 源码地址：[点击这里](https://github.com/egret-labs/egret-core/tree/v3.0.6)
Egret Engine 3D 源码地址：[点击这里](https://github.com/egret-labs/egret-3d)




