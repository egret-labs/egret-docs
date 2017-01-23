

![xx](./pic0.png)

《守卫我的塔》游戏使用egret 4.0.1，采用全新方式在egret2D项目中构建3D场景。

本教程将着重展示如何基于egret引擎及其3D功能开发3D游戏。

在egret 4.0.1中创建的3D项目，有如下变化。


原来的代码：

````
let stage3d = new egret3d.Egret3DCanvas();

// ...

let view = new egret3d.View3D(0, 0, width, height);
stage3d.addView(view);
````

现在的代码：

````
// 创建一个Stage3D对象，并传入当前的Stage2D
let stage3d = new egret3d.Stage3D(this.stage);

// 在引擎中插入Stage3D
egret.setRendererContext(stage3d);

// ...

let view = new egret3d.View3D(0, 0, width, height);
stage3d.addView(view);
````

另外，与原来的Egret3DCanvas相比，对Stage3D的x，y，width，height赋值将不再起作用，Stage3D的这些属性将与egret引擎设置的适配策略自动同步。所以，用户不再需要关心适配问题。（View3D对象的x，y，width，height用法不变）

在后续的教程中，将介绍：

1. 3D场景美术资源的导出与使用方法
2. 3D人物美术资源的导出与使用方法
3. 3D特效美术资源的导出与使用方法
4. 2D UI与3D场景的互动。

...
