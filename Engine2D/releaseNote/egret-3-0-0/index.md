![](567d1701cfd0f.jpg)

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 3.0 中包含了 Egret Engine 3D 和 Egret Engine 2D 两部分，以后会融合在一起，形成完整统一的 Egret Engine。

## Egret Engine 3D

现在 Egret Engine3D 开放体验，可以通过[Egret Engine 3D](https://github.com/egret-labs/egret-3d)获取到 Egret Engine 3D 的源码。也可以在 EDN 上查阅 [Egret Engine 3D API](http://edn.egret.com/cn/apidoc/index/name/egret3d.AudioManager)。更多关于 Egret Engine 3D 的教程欢迎关注 EDN [Egret Engine 3D 分类](http://edn.egret.com/cn/docs/page/775)。

在体验的过程中如果遇到任何问题希望您能留下宝贵意见，更欢迎大家在 Egret 论坛交流:[Egret3D 交流贴](http://bbs.egret.com/forum.php?mod=viewthread&tid=15653)。

Egret Engine 3D 官方交流群: 180593985 。

### Egret Engine 3D  新功能
---- ------------------------
#### •	模型系统
Egret Engine 3D，并提供了 [3Dmax 导出插件](https://github.com/egret-labs/egret-3d/tree/master/3Dmax%20Export%20tool)，也就是说支持任意3D模型格式。

#### •	材质系统
可以根据自己的渲染风格，灵活的通过调整参数或增加材质特效的方式对材质进行编辑。

#### •	灯光系统
支持 TBN 直接光照系统，未来还会支持间接光照，提高光影效果。

#### •	动画系统
支持了 3Dmax 中高级骨骼动画及相机动画，满足绝大部分游戏需要。

#### •	shadow系统（阴影系统）
支持 shadowmaping 的方式投射纹理,可自定义阴影颜色,透明度,提高渲染质量,增强视觉效果

#### •	shader系统
基于OpenGL ES2.0 标准的原生 WebGL shader，并与引擎功能紧密结合及拓展。为未来的shader编辑器做好了铺垫。

## Egret Engine 2D

使用 Egret Engine 3.0 的 2D 部分和 Egret Engine 2.5.x 版本的引擎相同。在本次更新中，我们吸收了开发者提供的建议，下面将详细介绍。

### 自定义编译参数

现在可以使用 `tsconfig.json` 文件来自定义编译的参数。比如像下面这样使用:

```
{
    "compilerOptions": {
        "sourceMap": true,
        "removeComments": true
    }
}
```

这个例子里有2个编译属性：

* "sourceMap": true 把 ts 文件编译成 js 文件的时候，同时生成对应的 map 文件
* "removeComments": true 编译 js 的时候，删除掉注释

使用`tsconfig.json`自定义编译参数参考: [使用 tsconfig 配置文件](http://edn.egret.com/cn/docs/page/773)

### 位图的平滑处理

新增了`Bitmap`的`defaultSmoothing`属性,用来设置`smoothing`属性的默认值。现在除了`Bitmap`类以外,新增了`BitmapText`和`MovieClip`的`smoothing`用来控制缩放时是否使用平滑处理。

需要注意的是，已经创建的对象`smooting`属性不会被自动修改。

参考`Bitmap`的API : [defaultSmoothing](http://edn.egret.com/cn/apidoc/index/name/egret.Bitmap#defaultSmoothing)

### 解析`Itemrenderer`状态变化

EXML 现在可以解析 `Itemrenderer` 的状态变化。比如可以在`Itemrenderer`的皮肤中添加下面的状态：

```
<e:Image source.up="{data.up}"  source.down="{data.down}"/>```

### RES 获得版本控制器

现在可以通过`RES.getVersionController()`获取到版本控制器。

使用`RES`进行版本控制参考:[RES版本控制](http://edn.egret.com/cn/docs/page/671)

`getVersionController`详细 API: [getVersionController](http://edn.egret.com/cn/apidoc/index/name/RES.globalFunction#getVersionController)

### 优化项目编译体验

项目中 egretProperties.json 不是 json 文件，会有提示信息。第三方库配置发生变化，build 时会自动把新的库拷贝进项目，不需要 build -e 命令。

### 其他

* 修复 `EditableText` 设置的`prompt`，可以用`text`属性获取到的问题。
* 修复`RenderTexture`在绘制设置`mask`显示对象之后会错位的问题。
* 修复`eui.Button`设置`enabled`属性之后点击事件`target`不对的问题。
* 修复销毁之后的纹理赋值给`Bitmap`可能会导致报错的问题。
* 修正了某些情况下默认主题皮肤比自定义皮肤的优先级高的问题。

