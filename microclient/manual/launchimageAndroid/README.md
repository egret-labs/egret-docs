## 在微端中使用启动图

在应用启动之前，为了解决白屏体验不好的问题，一般会先显示一张图片，等应用启动后再关掉这个图片。微端中也有这个方法。

[示例demo下载地址](http://tool.egret-labs.org/microclient/doc/zip/launchimageAndroid.zip)

### 启动图的意义

启动图可以减少用户看到的黑屏、白屏或者花屏的可能性，是 APP 的启动流程更加的自然，给用户带来更好的体验。

### 启动图的使用方法

通过 NativeLauncher 类的 initViews 方法启用启动图功能，函数原型如下：


```
public void initViews(FrameLayout layout, int imageResId, int duration);
```

其中，layout 表示 View 的根节点，imageResId 表示启动图的图片资源 id，duration 表示启动图展示的时间，单位为毫秒。如果该时间等于 0，则表示启动图启动图会在游戏启动后自行关闭，如果大于 0，则表示启动图会在到达该时间之后关闭。

举例来说，假设 res 文件夹下面的 drawable 目录下有一个名为 background.jpg 的图片，该图片被用于启动图并且启动图的展示时间为 2 秒，那么示例代码如下：


```
launcher.initViews(rootLayout, R.drawable.background, 2000);
```

其中，launcher 来自于 NativeLauncher 类，rootLayout 是 View 的根节点，R.drawable.background 指向前面的 background.jpg 图片，2000 表示展示时间为 2 秒。

