在 Egret Engine 2.5.6 的更新中，我们吸取了开发者提供的建议，提供了新的屏幕旋转缩放模式。同时也提供了其他一些新的 API ，下面将详细介绍。

### 新增屏幕缩放模式

通过开发者的反馈，希望得到能更加方便布局 UI 的一种屏幕缩放模式。在新增的屏幕缩放模式下，首先会填满屏幕不留黑边，缩放后可以保持原始的宽高比例不变，等比的缩放程序内容，缩放后应用程序向设定的方向来填满播放器窗口。舞台的高度和宽度由当前的缩放比例与播放器视口决定，可以根据舞台的高度和宽度来自适应布局。具体来讲在 Egret Engine 2.5.6 中新增了 fixedNarrow 和 fixedWide 两种缩放模式。

#### fixedNarrow 模式

保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，应用程序内容的较窄方向可能会不够宽而填充。
在此模式下，舞台高度(Stage.stageHeight)和舞台宽度(Stage.stageWidth)由当前的缩放比例与播放器视口宽高决定。

#### fixedWide 模式

保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，应用程序内容的较宽方向的两侧可能会超出播放器视口而被裁切。
在此模式下，舞台高度(Stage.stageHeight)和舞台宽度(Stage.stageWidth)由当前的缩放比例与播放器视口宽高决定。

更多关于屏幕缩放模式可以参考，请点击:[缩放模式和旋转模式说明](http://edn.egret.com/cn/docs/page/553)

### 位图文本的对齐方式

在 Egret Engine 2.5.6 中我们新增了位图的水平对齐方式和垂直对齐方式。访问位图文本的`textAlign`和`verticalAlign`可以分别设置位图文本的水平和垂直对齐方式。同`TextField`的`textAlign`和`verticalAlign`属性一样，可以使用`egret.HorizontalAlign` 和 `egret.VerticalAlign`给这两个属性供值。

更多关于位图文本可以参考:[BitmapText](http://edn.egret.com/cn/apidoc/index/name/egret.BitmapText#textAlign)

### EUI 的滚动视口组件回弹功能

`Scroller` 的 `bounces`启用回弹功能是一个很方便的属性，表示当用户拖拽操作结束后，`Scroller`的内容区域会回弹到边界位置。默认的情况下是启用回弹的，如果需要的话可以将其关闭。

更多关于滚动视口组件可以参考:[Scroller](http://edn.egret.com/cn/apidoc/index/name/eui.Scroller#bounces)

### EUI 设置可编辑文本的默认颜色

现在通过`EditableText`的`promptColor`属性可以设置它的默认颜色。

更多关于可编辑文本组件可以参考:[EditableText](http://edn.egret.com/cn/apidoc/index/name/eui.EditableText#promptColor)

### 获取参数的全局函数

现在可以通过 `egret.getOption()` 来获取 浏览器或者 Runtime 的参数，传入的参数`key:string `,将在返回值获得参数。在浏览器中相当于获取url中参数，在Runtime获取对应setOption参数。

更多关于Egret 全局函数可以参考:[全局函数](http://edn.egret.com/cn/apidoc/index/name/egret.globalFunction#getOption)

>查阅 Egret 2.5.0 更新详解： [Egret 2.5 更新详解](http://edn.egret.com/cn/index.php/docs/page/628)

>EgretEngine2.5升级相关问题请到论坛交流：[EgretEngine2.5升级相关问题](http://bbs.egret.com/forum.php?mod=viewthread&tid=11702&extra=&page=1)
