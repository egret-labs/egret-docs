【第二代原生项目迁移说明】

在 Egret Launcher 1.0.51 里，我们内置了白鹭第二代的原生打包方案，添加了新的 NativeRenderer 机制，大幅提升了打包后 App 的渲染性能。


此文档旨在帮助用户顺利的完成老项目的迁移：

> * 更改依赖库文件
> * 需要变更的代码

---

`注：第一代打包方案，简称 rt1。第二代打包方案，简称 rt2`

## 更改依赖库文件

- 将原本项目中依赖的`rt1`库文件更换为`rt2`库文件
    
---

## 需要变更的代码

### 1. AppDelegate部分

- 将AppDelegate的后缀名，从 `.m` 变更为 `.mm`，防止出现编译错误。
- 添加以下头文件。

```
#import "ViewController.h"
#import <EgretNativeIOS.h>
```
- 添加成员变量。

```
EgretNativeIOS* _native;
```

- 添加设置ExternalInterface的方法。
```
- (void)setExternalInterfaces {
    __block EgretNativeIOS* support = _native;
    [_native setExternalInterface:@"sendToNative" Callback:^(NSString* message) {
        NSString* str = @"Native get message: ";
        str = [str stringByAppendingString:message];
        NSLog(@"%@", str);
        [support callExternalInterface:@"sendToJS" Value:str];
    }];
}
```

- 将以下 `rt2` 的初始化代码，加入`didFinishLaunchingWithOptions` 函数中。

```
// Override point for customization after application launch.
NSString* gameUrl = @"http://....gameLink....";

_native = [[EgretNativeIOS alloc] init];
_native.config.showFPS = true;
_native.config.fpsLogTime = 30;
_native.config.disableNativeRender = false;
_native.config.clearCache = false;

UIViewController* viewController = [[ViewController alloc] initWithEAGLView:[_native createEAGLView]];
if (![_native initWithViewController:viewController]) {
    return false;
}
[self setExternalInterfaces];

NSString* networkState = [_native getNetworkState];
if ([networkState isEqualToString:@"NotReachable"]) {
    __block EgretNativeIOS* native = _native;
    [_native setNetworkStatusChangeCallback:^(NSString* state) {
        if (![state isEqualToString:@"NotReachable"]) {
            dispatch_async(dispatch_get_main_queue(), ^{
                [native startGame:gameUrl];
            });
        }
    }];
    return true;
}

[_native startGame:gameUrl];

return true;
```

- 添加暂停/恢复事件。
```
- (void)applicationDidEnterBackground:(UIApplication *)application {
    [_native pause];
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    [_native resume];
}
```

- 退出rt2需要调用destroy方法。
```
[_native destroy];
```

### 2. ViewController 部分

- 实现函数`initWithEAGLView`，并调用JS和原生通信的绑定函数`setExternalInterfaces`。

```
- (instancetype)initWithEAGLView:(UIView*)eaglView {
    if (self = [super init]) {
        self.view = eaglView;
        [self setExternalInterfaces];
    }
    return self;
}
```

- 移除不必要的生命周期函数

```
- (void)viewDidLoad {}
- (void)viewWillAppear:(BOOL)animated {}
- (void)viewDidAppear:(BOOL)animated {}
- (void)enterBackground:(NSNotification *)notification {}
- (void)enterForeground:(NSNotification *)notification {}
- (void)viewWillDisappear:(BOOL)animated {}
- (void)viewDidDisappear:(BOOL)animated {}
```

- 移除 `rt1` 相关的函数

```
- (void)createEgretNative {}
- (void)pauseEgretNative {}
- (void)resumeEgretNative {}
- (void)destroyEgretNative {}
- (BOOL)addSkipBackupAttributeToItemAtPath:(NSString *) filePathString{}
- (void)runGame {}
- (void)runGameWithUpdateUrl:(NSString *)updateUrl {}
# pragma mark - Game Opitons
- (BOOL)isLandscape {}
- (void)setLoaderUrl:(int)mode {}
```

- 最终保留的函数
    - `rt2` 初始化必须的函数
    - js调用原生的具体函数实现
```
- (instancetype)initWithEAGLView:(UIView*)eaglView {
    if (self = [super init]) {
        self.view = eaglView;
        [self setExternalInterfaces];
    }
    return self;
}

- (BOOL)prefersStatusBarHidden {
    return YES;
}

- (BOOL)shouldAutorotate {
    return YES;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait|UIInterfaceOrientationMaskLandscape;
}
```
 