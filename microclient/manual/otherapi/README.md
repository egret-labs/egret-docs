## 强制刷新页面

```
window.location.reload()
```
通过该方法，可以在微端里强制刷新页面，重新加载游戏

## 设置游戏地址入口页面的超时时间
该 API 在微端版本 v0.1.5 之后支持。

```
iOS 在 AppDelegate.mm 中设置
_launcher.homePageTimeout = xx;
```
![](a7.png)

```
安卓 在 AppDelegate.mm 中设置
_launcher.homePageTimeout = xx;
```
![](a8.png)


## 关闭本地配置文件
微端默认从网络读取配置信息，您也可以在 Launcher 创建项目的时候把配置信息放在本地。
如果您不想使用本地的配置文件，可以在工程中关闭。

![](a1.png)

安卓如上图所示，在 `setExternalInterfaces();` 下面增加一行`launcher.disableConfig();`

![](a2.png)

iOS如上图所示，在 `[self setExternalInterfaces];` 下面增加一行`[super.launcher disableConfig];`

## 关闭C++渲染
如果您使用 5.1.2 版本以上的引擎，在微端里会使用 C++ 渲染列表进行加速渲染，如果您不想使用该功能，可以在工程中关闭。

![](a3.png)

安卓如上图所示，在 `setExternalInterfaces();` 下面增加一行`launcher.disableNativeRender();`

![](a4.png)

iOS如上图所示，在 `[self setExternalInterfaces];` 下面增加一行`[super.launcher disableNativeRender];`

## 设置 webview 是否透明

![](a5.png)

安卓如上图所示，在 `setExternalInterfaces();` 下面增加一行`launcher.setWebViewBackgroundTransparent(true);`

![](a6.png)

iOS如上图所示，在 `[self setExternalInterfaces];` 下面增加一行`[self.launcher setWebViewBackgroundTransparent:YES];`



