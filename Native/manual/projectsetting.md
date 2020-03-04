---
title: 如何发布原生项目
---


通过 `Egret` 引擎制作的游戏，不仅可以发布成 `Html5` 网页项目，还可以发布成原生项目。

## 发布设置前的准备工作

- 安装最新版本的launcher
- 确认引擎版本
    - 引擎版本必须为***5.1.6及以上***
- 发布 iOS 需要安装Xcode
    - 建议版本: 9.0或以上
    - 后续需要在 Xcode 中完成发布项目的修改和功能接入
- 发布安卓需要安装 Android Studio
	- 建议版本: 3.0或以上
	- 后续需要在 Android Studio 中完成发布项目的修改和功能接入

## 发布Android工程

### 发布项目

- 在launcher的项目面板找到需要发布Android工程的Egret项目，点击发布设置

![](/native/img/docs/manual/projectsetting/p0.png)

- 点击左侧的Android按钮，在右侧页面中，输入应用名称、应用包名，点击确定。

![](/native/img/docs/manual/projectsetting/p1.png)


## 发布iOS工程

### 发布项目

- 在launcher的项目面板找到需要发布iOS工程的Egret项目，点击发布设置

![](/native/img/docs/manual/projectsetting/p0.png)

- 点击左侧的iOS按钮，在右侧页面中，输入应用名称、应用包名，点击确定。

![](/native/img/docs/manual/projectsetting/p2.png)


## 工程设置

### 设置游戏地址
Android：

```java
nativeAndroid.initialize(gameUrl);
```

iOS:

```objective-c
[_native startGame:gameUrl];
```

launcher创建的默认工程会将游戏资源放到assets/game目录下，这时会从assets目录加载游戏。如果不需要将游戏放到应用里，请删除assets/game目录。

### 其它设置

可以通过修改nativeAndroid.config或_native.config的属性更改工程设置。

属性说明：

- showFPS 是否显示fps面板
- fpsLogTime log在屏幕上停留时间，单位是秒，-1为永久显示
- disableNativeRender 是否禁用原生渲染加速
- clearCache 是否清理缓存，设置为true时每次启动都会清理缓存，方便调试
- loadingTimeout 加载index的超时时间。默认为0，不设置超时
- preloadPath 设置预加载目录，详见“热更新方案说明”
- immersiveMode 开启沉浸模式，默认不占用安全区（刘海区域）。（0.1.16添加，部分机型需要用户手动在设置中开启"应用全屏显示"）
- useCutout 占用安全区。（0.1.16添加，如果没有开启沉浸模式，该设置无效；部分机型横屏模式不能占用安全区）

## 5.1.6以下引擎版本发布原生工程

5.1.6以下引擎没有支持发布原生工程的脚本，不能通过launcher直接发布原生工程。

### 解决方案

1. 通过launcher创建引擎版本为5.1.6或以上的egret工程，创建原生工程。
2. 将需要打包原生应用的游戏发布为h5版本。
3. 将发布结果替换到原生工程的assets/game目录下。

## 注意

Native 仅支持 webgl 渲染模式。
