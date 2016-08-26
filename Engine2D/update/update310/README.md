Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的 2D 引擎及全新打造的 3D 引擎，它解决了 HTML5 性能问题及碎片化问题，灵活地满足开发者开发 2D 或 3D 游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 的本次更新中，提供了若干新的功能，同时我们吸收开发者的意见修复若干问题。下面介绍 Egret Engine 3.0.8 到 Egret Engine 3.1.0 之间的更新详情。


## Egret Engine 2D
 
在 Egret Engine 2D 的本次更新中，提供了新的滤镜功能,组件实体系统,第三方库——微信扩展播放视频内容。同时吸收开发者的意见修复一些问题。下面列出的是 3.0.8 到 3.1.0 的更新详情。

### 滤镜

在 Egret Engine 3.1.0 开始提供 WebGL 渲染的颜色矩阵滤镜和模糊滤镜。颜色矩阵滤镜在游戏中常用来在战斗中将“怪物”“灰掉”等功能。模糊滤镜可以实现显示对象的模糊效果。

#### 颜色矩阵滤镜

在 Egret 中使用颜色转换矩阵比较简单，通过新增的 ColorMatrixFilter 即可实现。

```
var hero:egret.Bitmap = new egret.Bitmap();
hero.texture = RES.getRes("hero_png");
this.addChild(hero);
//颜色矩阵数组
var colorMatrix = [
    0.3,0.6,0,0,0,
    0.3,0.6,0,0,0,
    0.3,0.6,0,0,0,
    0,0,0,1,0
];

var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
hero.filters = [colorFlilter];
```

首先我们新建了一个显示对象，然后新建了一个颜色转换矩阵 `ColorMatrixFilter`,并通过显示对象的 `filters` 属性来设置滤镜。显示对象的 `filters` 属性包含当前与显示对象关联的每个滤镜对象的索引数组。

灰度效果对比：

![](573990c11bb31.png)

在 Egret 中使用滤镜功能还是很方便的，实现效果的关键主要是颜色转换矩阵的设置。

更多效果：[颜色矩阵滤镜](http://edn.egret.com/cn/docs/page/947#颜色矩阵滤镜)

#### 模糊滤镜

和颜色转换矩阵类似，使用模糊滤镜也比较简单。实例化一个 BlurFilter 并将其保存到显示对象的 filters 属性中即可。其中示例化 BlurFilter 有两个参数，即为 x 、y 方向的模糊度。

```
var hero:egret.Bitmap = new egret.Bitmap();
hero.texture = RES.getRes("hero_png");
this.addChild(hero);

var blurFliter = new egret.BlurFilter( 1 , 1);
hero.filters = [blurFliter];
```

模糊效果对比:

![](573990c0e636e.png)

需要注意的是模糊滤镜对性能的开销比较大,普通显示对象可以开启 cacheAsBitmap 提高性能。

使用教程：[模糊滤镜](http://edn.egret.com/cn/docs/page/947#模糊滤镜)

### 组件实体系统

Egret ECS 支持库是一套建立在 Egret 引擎之上的横跨游戏与应用的开发流框架,通过场景文件(.scene)组织静态资源构成运行时画面元素,通过编写组件脚本(.ts)扩展运行期间的行为。

Egret ECS 支持库正在完善中，更多详情请访问：[Egret ECS Support Library](https://github.com/egret-labs/Egret-ECS)

### 微信视频扩展库

通过[微信视频扩展库](https://github.com/egret-labs/egret-game-library/tree/master/weixinextension)可以在微信中播放带顶部栏的全屏视频。一般用于游戏过场或者广告营销。

[微信视频扩展库](https://github.com/egret-labs/egret-game-library/tree/master/weixinextension)使用起来也比较简单:

```
var video = new weixinextension.FullScreenVideo();
//载入视频
video.load('resource/video/mp4.mp4');
//设置封面图
video.poster = "resource/video/bg.jpg";
//显示视频
video.show();
video.addEventListener(egret.Event.COMPLETE,()=>{
    console.log('play complete');
    video.close();
},this)
```

具体教程：[微信视频扩展](http://edn.egret.com/cn/docs/page/948)

### 修复问题

* 解决 native 下 Shape 遮罩失效问题。
* 解决 webgl 下 Shape alpha 为0点击问题。
* 解决 RenderTexture 绘制子项有 scrollRect 的显示对象异常问题。
* 解决 RenderTexture 绘制有 mask 的显示对象异常问题。
* 解决 Shape scale 为0作为遮罩显示异常问题。

### 获取 Egret Engine

Windows 安装包下载地址：[点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.1.0.exe)
Mac 安装包下载地址：     [点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.1.0.dmg)
Egret Engine 2D 源码地址：[点击这里](https://github.com/egret-labs/egret-core/tree/v3.1.0)
Egret Engine 3D 源码地址：[点击这里](https://github.com/egret-labs/egret-3d)




