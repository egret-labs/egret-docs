## 发布工程

### 发布设置前的准备工作

- Hybrid 方案目前仅支持 iOS 系统
- 安装最新版本的launcher
- 安装Xcode
    - 最低版本: 9.0
    - 后续需要在Xcode中完成发布项目的修改和功能接入

### 发布项目
- 在launcher的项目面板找到需要发布iOS工程的Egret项目，点击发布设置

![](p0.png)

- 点击左侧的iOS按钮，在右侧页面中，输入应用名称、应用包名，点击确定。**勾选使用Hybrid方案**

![](p1.png)

### 注意

- 双击xcworkspace文件打开工程
- 创建的工程默认打开示例游戏，需要自行修改游戏地址

## 工程模版说明

工程模版展示了两种启动方式。

### 直接启动游戏

```objective-c
[EgretWebViewLib startGame: SuperView:];
```

### 下载游戏资源到本地，从本地启动游戏

- 检查本地游戏资源版本（根据文件名判断是否加载过）

```objective-c
[EgretWebViewLib checkLoaded:];
```

- 下载游戏资源

```objective-c
ZipFileLoader* loader = [EgretWebViewLib createZipFileLoader: Delegate:];
[loader start];
```

- 启动本地服务器和游戏

```objective-c
[EgretWebViewLib startLocalServer];
[EgretWebViewLib startGame: SuperView:];
```

## 使用本地游戏资源

- 检查当前游戏资源版本（根据文件名判断是否加载过）

```objective-c
[EgretWebViewLib checkLoaded: Host:];
```

- 下载游戏资源

```objective-c
ZipFileLoader* loader = [EgretWebViewLib createZipFileLoader: Host: Delegate:];
[loader start];
```

- 启动本地服务器和游戏

```objective-c
[EgretWebViewLib startLocalServer];
[EgretWebViewLib startGame: SuperView:];
```

## JS与OC通信

逻辑和Android Native相同，只是原生工程的API不同。

注册接收消息的方法：

```objective-c
[EgretWebViewLib setExternalInterface:@"sendToNative" Callback:^(NSString* msg) {
    NSLog(@"message: %@", msg);
}];
```

发送消息：

```objective-c
[EgretWebViewLib callExternalInterface:@"sendToJS" Value:@"message from OC"];
```
