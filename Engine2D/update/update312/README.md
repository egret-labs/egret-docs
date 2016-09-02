Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的 2D 引擎及全新打造的 3D 引擎，它解决了 HTML5 性能问题及碎片化问题，灵活地满足开发者开发 2D 或 3D 游戏的需求，并有着极强的跨平台运行能力。


## Egret Engine 2D

在本次更新 Egret Engine 2D 中，调整了 FPS 面板样式，输入文本支持设置弹出键盘类型，HttpRequest 支持发送 ArrayBuffer 类型数据,并增加了鼠标事件支持扩展库。同时也修复了若干问题，下面是 3.1.1 到 3.1.2 的更新详情。 

### 调整 FPS 面板样式

工欲善其事必先利其器，在 Egret 项目开发过程中 FPS 面板一直是非常重要的调试工具。在 Egret Engine 最新发布的 3.1.2 中提供了新的调试面板。可以更加直观方便的显示调试信息。

![](575e7da5ac883.gif)

#### 图形显示--更加直观方便

新的 FPS 面板最直观的改变时提供了 FPS 图形显示。与之前的纯数字显示不同，FPS 和 Cost 信息提供了曲线面板的显示。

先来回顾一下 FPS 和 Cost 值所代表的含义。FPS 即帧频，每帧屏幕刷新的次数。在游戏中 FPS 是一个动态的值，帧频的高低反应着游戏的流畅度，比如一直保持 60 帧每秒的帧频，游戏是非常流畅的，如果在某个场景或某个时刻帧频突然降低，说明这里存在问题需要优化。新的 FPS 面板能很好的体现出帧频的变化曲线，曲线的纵轴显示的是帧频的高低，横轴表示时间，FPS 窗口表示时间段内帧率的变化，而原有的 FPS 面板只能显示当前时刻数据。

Cost 的三个值分别表示 Ticker 和 EnterFrame 阶段显示的耗时,每帧舞台所有事件处理和矩阵运算耗时和绘制显示对象耗时（单位是ms），在新的 FPS 面板中也使用图形表示，可以查看当前窗口内消耗的变化。

#### 更详细的信息

在新的 FPS 面板中提供了更丰富的调试信息。首先除了原有的帧率显示外提供了渲染模式的显示，可以看到当前的渲染模式时 Canvas 还是 WebGL 模式。

提供了 FPS 的最大，最小和平均信息。可以很好的获得当前 FPS 信息的简单统计，对游戏中帧数变化有更明确的显示。

#### 其他

新的面板是绘制在一个单独的 div 标签内，不再随引擎的缩放模式而改变大小，这样就可以保证文字的清晰度始终是一致的。

需要注意的是在老项目中使用性能监控面板，建议您在 index.html 中修改一下文字大小和配色方案。

在 IE11 以下的浏览器中，FPS 面板会遮挡舞台，触摸事件无法穿透，建议您调试的时候使用 Chrome 浏览器。

更多关于调试面板的教程参考：[新的 FPS 面板](http://edn.egret.com/cn/docs/page/1024) 和 [如何开启 FPS 面板](http://edn.egret.com/cn/docs/page/605)

### 输入文本支持设置弹出键盘类型

在 Egret 3.1.2 中更新了设置输入文本样式，现在支持 3 中输入样式即普通文本（默认），密码和电话号。设置不同的类型输入的样式和手机上弹出面板是不同的。设置密码样式输入时显示密码，设置电话号样式输入时在手机上弹出数字输入面板。

设置输入文本样式首先要设置 TextField 的 TextFieldType 为 INPUT 类型。然后设置 TextField 的 inputType 即可。

```
var text:egret.TextField = new egret.TextField();
//设置输入文本
text.type = egret.TextFieldType.INPUT;
//设置输入类型为 TEXT，还可设置为密码（PASSWORD）或电话号(TEL)
text.inputType = egret.TextFieldInputType.TEXT;
text.text = "输入文本:";
text.width = 300;
this.addChild(text);
```

![](575e7da5c32aa.png)

设置不同的输入文本样式，不同效果如上图所示，可以看到在文本样式下弹出默认输入法，在密码样式下弹出英文输入法，在电话号样式下弹出数字输入。

更多关于输入文本的教程：[输入文本](http://edn.egret.com/cn/docs/page/292)

### HttpRequest 支持发送 ArrayBuffer 类型数据

HttpRequest 新增支持发送 ArrayBuffer 类型的数据，在 POST 请求中可以直接发送 ArrayBuffer 类型的数据。

```
var buffer = new ArrayBuffer(12);
var x = new Int32Array(buffer);
x[1] = 1234;
var httpRequest = new egret.HttpRequest();
httpRequest.open("http://httpbin.org/post",egret.HttpMethod.POST);
httpRequest.send(buffer);
```

发送 ArrayBuffer 类型数据与其他数据相同，直接将数据传入 send() 方法内即可。

更多关于 HttpRequest 的教程：[发送HTTP请求](http://edn.egret.com/cn/docs/page/589)

### 增加 PC 鼠标事件支持第三方库

随着新版本的引擎发布，[Egret Game Library](https://github.com/egret-labs/egret-game-library)更新了鼠标事件支持库，[鼠标事件支持库](https://github.com/egret-labs/egret-game-library/tree/master/mouse)，引用鼠标支持库即可监听 PC 上的鼠标事件。鼠标支持库支持鼠标移动，悬停，移出等多个事件。同时也可设置鼠标手型。

获取鼠标事件支持库:[鼠标事件支持库](https://github.com/egret-labs/egret-game-library/tree/master/mouse)

关于鼠标事件支持库的使用教程:[鼠标支持库](http://edn.egret.com/cn/docs/page/1026)

### 修复问题

* 修复 WebGL 绘制矢量图形可能错乱问题。
* 修复对容器设置滤镜引发脏矩形绘制错误问题。
* 修复不规则遮罩在 native 显示异常问题。
* 修复 ProgressBar 布局错误问题。
* 修复在 Wing 中构件项目经常报错问题。
* 修复 RenderTexture 绘制之后显示对象属性设置无效问题。
* 优化对容器设置滤镜渲染。

### 获取 Egret Engine

Windows 安装包下载地址：[点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.1.2.exe)

Mac 安装包下载地址：[点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.1.2.dmg)

Egret Engine 2D 源码地址：[点击这里](https://github.com/egret-labs/egret-core/tree/v3.1.2)

Egret Engine 3D 源码地址：[点击这里](https://github.com/egret-labs/egret-3d/tree/rc/3.1.2)




