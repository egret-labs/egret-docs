在 Egret Engine 2.5.5 中，提供了一些新的特性，下面我们来逐一看以下吧。

### 脏矩形开关

当 Egret 项目只有部分区域需要渲染时，自动脏矩形可以很好的提升项目的渲染性能。可是当某些特殊场景里渲染的区域很大，开启自动脏矩形也要消耗一些运算的性能，这时就需要关闭自动脏矩形。在 Egret 2.5.5 中提供了动态开关自动脏矩形的功能。

通过`Stage` 的 `dirtyRegionPolicy` 属性可以设置自动脏矩形的开关。比如像下面这样(伪代码):

```
//关闭自动脏矩形
显示对象.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;
//开启自动脏矩形
显示对象.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.ON;
```
> 这里的显示对象已经添加到舞台。

### 优化九宫格设置

设置图片的九宫格是个常用的功能，不过如果不小心设置错了，很容易导致显示的异常。 在 Egret 2.5.5 中对这一异常进行了控制，当九宫格设置参数错误的情况下，会发出警告并且不显示这个错误的九宫格图片。并且以前的移动端浏览器是不会显示错误的九宫格设置的，这样可以统一移动端和PC端的表现。

在正常情况下，九宫格的区域的宽度和高度要小于图片的宽度和高度，位置在图片内部。如果设置的九宫格位置或者宽度和高度异常的情况下会报如下错误：

```
Warning #1018: 9宫格设置错误
```

具体来讲正确的九宫格设置为:
```
x + w < 图片宽度;
y + h < 图片高度;
```
其中`x`和`y`是设置九宫格的位置，w和h为设置九宫格的宽和高。并且x,y,w,h这四个数值都要大于 0。

更多关于九宫格的使用:[九宫格的使用](http://edn.egret.com/cn/index.php/article/index/id/133)

### 优化FPS面板

在 FPS 面板上新增了一个参数，用来显示Ticker和EnterFrame阶段的耗时显示。

![](56459a2345f6a.png)

上图中Cost 的第一个参数就是新增的Ticker和EnterFrame阶段的耗时显示。

更多关于 FPS 面板请参考:[显示脏矩形和帧频信息](http://edn.egret.com/cn/index.php/article/index/id/605)

### 动态设置分辨率

现在可以通过`Stage`的`setContentSize`来动态设置分辨率。可以通过下面方法来动态设置舞台分辨率(伪代码):

```
显示对象.stage.setContentSize(400,800);
```

> 这里的显示对象已经添加到舞台。

### EUI 中绘制矩形

EUI 中新增了一个组件:`Rect`,可以绘制矩形。通过下面代码可以绘制一个红色矩形.

```
var rect = new eui.Rect(100,50,0xcc1122);
```

>跟其他组价一样，上面的rect也需要添加到舞台才能显示出来。

[点击查看更多关于Rect的信息](http://edn.egret.com/cn/index.php/apidoc/egret243/name/eui.Rect)

### native版本号参数

现在可以通过 `egret.Capabilities.supportVersion` 来获取 Native 的版本号参数，其默认值为 `Unknown`。

>查阅 Egret 2.5.0 更新详解： [Egret 2.5 更新详解](http://edn.egret.com/cn/index.php/article/index/id/628)

>EgretEngine2.5升级相关问题请到论坛交流：[EgretEngine2.5升级相关问题](http://bbs.egret.com/forum.php?mod=viewthread&tid=11702&extra=&page=1)
