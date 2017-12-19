## 在微端中使用启动图

在应用启动之前，为了解决白屏体验不好的问题，一般会先显示一张图片，等应用启动后再关掉这个图片。微端中也有这个方法。

### [安卓示例demo下载地址](http://tool.egret-labs.org/microclient/doc/zip/launchimageAndroidV1.2.zip)

### [iOS示例demo下载地址](http://tool.egret-labs.org/microclient/doc/zip/launchimageIOS.zip)

### 启动图的意义

启动图可以减少用户看到的黑屏、白屏或者花屏的可能性，是 APP 的启动流程更加的自然，给用户带来更好的体验。

### 安卓启动图的使用方法

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


### iOS启动图的使用方法
通过NativeLauncher类的setLaunchScreenImagePathAndDuration方法启用启动页功能，函数原型如下：


```
- (void)setLaunchScreenImagePathAndDuration:(NSString*)imagePath Duration:(int)duration;
```

其中，imagePath表示启动页的图片资源路径，duration表示启动页展示的时间，单位为毫秒。如果该时间等于0，则表示启动页会在游戏启动后自行关闭，如果大于0，则表示启动页会在到达该时间之后关闭。

举例来说，假设程序中有一个名为background.jpg的图片，该图片被用于启动页并且启动页的展示时间为2秒，那么示例代码如下：


```
[super.launcher setLaunchScreenImagePathAndDuration:@"background.jpg" Duration:2000];
```

其中，launcher来自于NativeViewController类，@"background.jpg"指向前面的background.jpg图片，2000表示展示时间为2秒。

