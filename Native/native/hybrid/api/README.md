# iOS API文档
```
所有文件大小的单位都是byte
```

## EgretWebViewLib

### 初始化
```
+ (void)initialize:(NSString*)preloadPath;
preloadPath: 缓存根目录(缓存目录放在Documents下，需要以'/'开始和结束)
```

### 监听游戏回调
```
+ (void)setExternalInterface:(NSString*)funcName Callback:(ExternalInterfaceBlock)block;
funcName: 回调名称
block: 回调方法

游戏调用方法: window["ExternalInterface"].call(funcName, value)
```

### 调用游戏中注册的方法
```
+ (void)callExternalInterface:(NSString*)funcName Value:(NSString*)value;
+ funcName: 方法名称
value: 参数

游戏注册回调方法: window["ExternalInterface"].addCallback(funcName, callback)
```

### 启动本地服务器
```
+ (bool)startLocalServer;
返回值: 是否成功
```

### 启动游戏
```
+ (void)startGame:(NSString*)gameUrl SuperView:(UIView*)superView;
gameUrl: 游戏地址
superView: 父级View
```

### 停止游戏
```
+ (void)stopGame;
```

> 如果开启了本地服务器：启动游戏会从预缓存目录加载游戏，停止游戏时会同时停止本地服务器。

### 获取缓存目录大小
```
+ (long long)getCacheSize;
返回值: 目录大小
```

### 清理缓存目录
```
+ (void)cleanPreloadDir;
```

### 检查是否加载过某个资源
```
+ (bool)checkLoaded:(NSString*)resUrl;
resUrl: 资源链接

+ (bool)checkLoaded:(NSString*)zipPath Host:(NSString*)host;
zipPath: zip文件的绝对路径
host: zip文件中的资源映射到哪个url路径下，以"/"结尾。示例： "https://www.game.com/egret/"
```

### 创建下载任务
```
+ (ListFileLoader*)createListFileLoader:(NSString*)resUrl Delegate:(id)delegate;
+ (ZipFileLoader*)createZipFileLoader:(NSString*)resUrl Delegate:(id)delegate;
resUrl: 资源链接
delegate: 监听回调的对象

+ (ZipFileLoader*)createZipFileLoader:(NSString*)zipPath Host:(NSString*)host Delegate:(id)delegate;
zipPath: zip文件的绝对路径
host: zip文件中的资源映射到哪个url路径下，以"/"结尾。示例： "https://www.game.com/egret/"
delegate: 监听回调的对象
```

### 停止所有下载任务
```
+ (void)stopAllLoader;
```

### 销毁
```
+ (void)destroy;
```

## ZipFileLoader, ListFileLoader

### 启动
```
- (void)start;
```

## FileLoaderProtocol

### 开始下载
```
- (void)onStart:(long)fileCount Size:(long)totalSize;
fileCount: 文件数量
totalSize: 下载总大小
```
> onStart是第一个回调

### 下载进度
```
- (void)onProgress:(NSString*)filePath Loaded:(long)loaded Error:(long)error Total:(long)total;
filePath: 文件路径
loaded: 已下载文件数量(json方式)；已下载大小(zip方式)
error: 已下载失败的文件数量(json方式)
total: 总文件数量(json方式)；zip文件大小(zip方式)
```

### 错误
```
- (void)onError:(NSString*)urlStr Msg:(NSString*)errMsg;
urlStr: 文件地址
errMsg: 错误信息
```

### 下载结束
```
- (void)onStop;
```
> onStop是最后一个回调

### 解压缩
```
- (bool)onUnZip:(NSString*)zipFilePath DstDir:(NSString*)dstDir;
zipFilePath: zip文件路径
dstDir: 目标目录
返回值: 是否解压成功
```
> 考虑到不同开发者可能有自己的解压缩库，没有集成解压缩功能
