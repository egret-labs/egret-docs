# 在微端中使用启动图

在应用启动之前，为了解决白屏体验不好的问题，一般会先显示一张图片，等应用启动后再关掉这个图片。微端中也有这个方法。

[示例demo下载地址](http://tool.egret-labs.org/microclient/doc/zip/launchimageAndroid.zip)

## 1、启动图的意义

启动图可以减少用户看到的黑屏、白屏或者花屏的可能性，是APP的启动流程更加的自然，给用户带来更好的体验。

## 2、 启动图的使用方法

通过NativeLauncher类的initViews方法启用启动图功能，函数原型如下：


```
public void initViews(FrameLayout layout, int imageResId, int duration);
```

其中，layout表示View的根节点，imageResId表示启动图的图片资源id，duration表示启动图展示的时间，单位为毫秒。如果该时间等于0，则表示启动图启动图会在游戏启动后自行关闭，如果大于0，则表示启动图会在到达该时间之后关闭。

举例来说，假设res文件夹下面的drawable目录下有一个名为background.jpg的图片，该图片被用于启动图并且启动图的展示时间为2秒，那么示例代码如下：


```
launcher.initViews(rootLayout, R.drawable.background, 2000);
```

其中，launcher来自于NativeLauncher类，rootLayout是View的根节点，R.drawable.background指向前面的background.jpg图片，2000表示展示时间为2秒。

