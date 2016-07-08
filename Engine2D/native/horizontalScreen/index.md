## 准备工作

Eget 的 H5 项目通过 Egret Android Suppord 或 Egret IOS Support 可以生成相应的 Native 项目。如果需要设置项目的横竖屏等信息，需要在相应的 Native 项目中进行设置。

生成 Native 项目的基本过程是相同的，可以参考以下文档：

* Android APP打包：[Win中Android APP打包](http://edn.egret.com/cn/docs/page/648) [Mac中Android APP打包](http://edn.egret.com/cn/docs/page/649)
* IOS APP 打包: [iOS APP打包方案](http://edn.egret.com/cn/docs/page/169)

### Android 横竖屏设置

#### 在 Java 代码中设置

在 Java 代码中可以像下面这样设置屏幕的旋转方向强制为横屏：

```
setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE)
```

其中 ActivityInfo 可以是以下值：

```
ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED,//未指定，此为默认值。由Android系统自己选择合适的方向。
ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE,//横屏
ActivityInfo.SCREEN_ORIENTATION_PORTRAIT,//竖屏
ActivityInfo.SCREEN_ORIENTATION_USER,//用户当前的首选方向
ActivityInfo.SCREEN_ORIENTATION_BEHIND,//继承Activity堆栈中当前Activity下面的那个Activity的方向
ActivityInfo.SCREEN_ORIENTATION_SENSOR,//由物理感应器决定显示方向
ActivityInfo.SCREEN_ORIENTATION_NOSENSOR,//忽略物理感应器——即显示方向与物理感应器无关
```

#### 在 AndroidManifest.xml 中设置

在我们生成的 Android 项目的 proj.android 目录下可以找到 AndroidManifest.xml 配置文件,它是每个 Android 项目都必须的配置文件，提供了各项属性来详细描述应用程序的元数据。当然，在程序中修改的屏幕方向时要比在配置文件中的优先级要高的。

在 AndroidManifest.xml 可以找到 `android:screenOrientation` 字段，这个是我们配置项目横竖屏的字段。它可以有下列参数,与上面的基本一一对应：

* "unspecified": 由系统来判断显示方向.判定的策略是和设备相关的，所以不同的设备会有不同的显示方向.

* "landscape": 横屏显示(宽比高要长).

* "portrait": Android Support 模板设置的默认值，竖屏显示(高比宽要长).

* "user":用户当前首选的方向

* "behind": 与 Activity 堆栈中的下一个设置一致.

* "sensor":由物理的感应器来决定。如果用户旋转设备这屏幕会横竖屏切换.

* "nosensor":忽略物理感应器，这样就不会随着用户旋转设备而更改了("unspecified"设置除外)。

** 设置横屏 **

设置项目的横屏可以这样配置:

```
android:screenOrientation="landscape"
```

这样项目将横屏显示。

** 设置竖屏 **

设置项目的竖屏可以这样配置:

```
android:screenOrientation="portrait"
```

### iOS 项目设置横竖屏

#### 在 ViewController 中进行设置

iOS 项目内的屏幕方向可以使用 ViewController 或者 info.plist 来设置屏幕的旋转方向。ViewController 这种方法优先级要比在 info.plist 中直接设置高。推荐在 ViewController 中设置。

在 Egret IOS Support 提供的模板项目中可以找到相关的设置,在 HelloEgret 项目中找到 ViewController.mm ,如下图所示：

![](569cc4287e852.jpg)

其中代码如下：

```
- (BOOL)isLandscape {
    // 横屏返回YES，竖屏返回NO
    return NO;
}
```

#### 在 info.plist 中进行设置

还可以在 info.plist 中进行设置，找到 **Supported Interface Orientations** ，在 iOS APP 默认支持四种屏幕方向即：

* Portrait:正常的竖屏(top home button)

* PortraitUpsideDown:反向的竖屏(bottom home button)

* LandscapeLeft:左上角开始的横屏(left home button)

* LandscapeRight:右上角开始的横屏(right home button)


也可以在项目目录下直接找到 info.plist 文件，在 info.plist 可以找到`UISupportedInterfaceOrientations`和`UISupportedInterfaceOrientations~ipad`字段。

如果要设置横屏，可以将竖屏的两种模式删除，反之同理。

一般情况下不推荐修改 info.plist。 






