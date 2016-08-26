Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的 2D 引擎及全新打造的 3D 引擎，它解决了 HTML5 性能问题及碎片化问题，灵活地满足开发者开发 2D 或 3D 游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 的本次更新中，我们队引擎的性能进行了优化，同时也提供了若干新功能。下面介绍 Egret Engine 3.0.7 到 Egret Engine 3.0.8 之间的更新详情。


## Egret Engine 2D
 
在 Egret Engine 2D 的本次更新中，我们关注引擎性能的优化，同时吸收开发者的意见提供了新的功能并修复一些问题。下面列出的是 3.0.7 到 3.0.8 的更新详情。

### 性能优化

#### 提升 WebGL 模式渲染性能

在本次更新中优化了 WebGL 渲染获得性能上的提升，特别是在 iOS 系统下性能提升很大。性能优化主要体现在使用大量矩形遮罩的场景中。下面的游戏实测图可以体现出优化前后的对比：

![](57285dc4bd92e.png)

可以看到在优化后同一场景从 23 帧升到了 57 帧，场景变得非常流畅。

#### 提升 Canvas 模式 Shape 遮罩性能

在本次更新中提升了 Canvas 模式 Shape 遮罩性能，在 Android 和 iOS 系统下都可以获得很大的性能提升。下面实测图展示优化前后的对比：

![](57285db024898.png)

在对比场景中，随机加入了 30 个大小相同的圆形遮罩。帧数从原来的 9 帧升到了 56 帧,获得了很大的性能提升。需要注意的是优化主要体现在使用 Shape 绘制的遮罩，使用其显示对象的遮罩不会获得性能提升。

#### 优化 Fast Armature 性能

在本次更新中我们优化了 DragonBones 库，使 FastArmature 的性能根据动画内容的不同会有不同的提升, 尤其对序列帧动画的性能提升明显, 最高可达到 200%。

![](57285db8011fb.png)

在上面的对比实测中绘制了 50 个序列帧动画并播放，可以看到动画的性能提升显著。

### 新增功能 

#### 全新的游戏项目模板

在本次更新中我们提供了新的游戏项目模板，新的模板长什么样呢?快创建个项目试试吧。

需要注意的是在新的模板中默认的舞台宽高是 640 × 1136，可以根据实际项目的需要进行修改。

> 大分辨率可以使游戏更为精美，但是绘制大图对性能压力很大，并且加载的图片体积也会提升。建议只发原生渠道的游戏使用。

#### 增加 TextField.setFocus 方法

在本次更新中新增了输入文本的 setFocus 方法。可以在用户操作下使输入文本获得焦点。需要注意的是 setFocus 方法需要在用户操作的事件中进行调用，比如下面这样：

```
var textIput:egret.TextField = new egret.TextField();
textIput.type = egret.TextFieldType.INPUT;
this.addChild(textIput);

var button:egret.Shape =  new egret.Shape();
button.graphics.beginFill(0x00cc00);
button.graphics.drawRect(0,0,100,40);
button.graphics.endFill();
button.y = 50;
this.addChild(button);
button.touchEnabled = true;
button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e) => {
        textIput.setFocus();
    }, this);
```

这里我们首先创建了一个输入文本和一个按钮，在按钮的触摸事件回调函数中调用输入文本的 setFocus 方法。不通过用户的操作触发直接调用 setFocus 会导致输入文本有问题，应避免这种使用方式。

[输入文本教程](http://edn.egret.com/cn/docs/page/292#获得焦点)

#### Video 增加 length 属性

本次更新中新增了 Video 的 length 属性，可以获得当前播放视频的长度。

[视频系统教程](http://edn.egret.com/cn/docs/page/657#获取视频长度)

### 修复问题

#### Egret Core 修复问题

* 修复 publish 过程中取消后，再次 build 报错问题
* 解决 BitmapText 在 WebGL 模式下绘制不出来问题
* 解决 WebGL 模式下内存泄露问题
* 修复 exml 不存在 className 属性编译错误问题

#### DragoneBones 库修复问题

* 修改 Fast Armature 缓存方式
* 修复 IK约束 在有些情况下计算结果不正确的问题

### 获取 Egret Engine

Windows 安装包下载地址：[点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.0.8.exe)
Mac 安装包下载地址：     [点击这里](http://tool.egret-labs.org/EgretEngine/EgretEngine-v3.0.8.dmg)
Egret Engine 2D 源码地址：[点击这里](https://github.com/egret-labs/egret-core/tree/v3.0.8)
Egret Engine 3D 源码地址：[点击这里](https://github.com/egret-labs/egret-3d)




