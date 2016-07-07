### 准备工作

1、了解通过 egret-ios-support 打包为原生项目的方案，这里可以参考：

[iOS APP打包方案](http://edn.egret.com/cn/index.php/article/index/id/169) 

[Win中Android APP打包](http://edn.egret.com/cn/index.php/article/index/id/648) 

[Mac中Android APP打包](http://edn.egret.com/cn/index.php/article/index/id/649)

2、了解 Egret 项目内的基本操作和 IOS 和 Android 编程基本技巧。

了解上面的基本知识之后可以通过建立一个新的 HelloWorld 项目来测试。

在 Egret 内，通过全局类`ExternalInterface`来与`native`进行通讯。

3、获得示例项目

下载好 Egret Android Support 和 Egret IOS Support 后可以在其相应目录下找到 HelloEgret 的模板项目。

Egret Android Support 可以在 `proj.android\src\org\egret\java\HelloEgret`路径下找到源码。

Egret IOS Support 可以在 `egret_ios_template\proj.ios\HelloEgret`路径下找到源码。

## Native 向 Egret 发送消息

### Egret 监听消息

通过`ExternalInterface`的`addCallback`方法来监听`Native`端发送来的消息。

```
// TypeScript 代码
egret.ExternalInterface.addCallback("sendToJS", function (message:string) {
    console.log("message form native : " + message);//message form native : message from native
});
```

上面我们调用`addCallback`,他的第一个参数"sendToJS",表示`Native`端发送的函数名。另外一个参数是回调函数，当 `Native` 端发送消息来时将调用回调函数，其中`message`就是`Native`端发送过来的值了。

### Native 发送消息 

在原生代码中向 Egret 发送消息也比较简单，通过调用相应 API 向 Egret 发送消息。这里的参数都是两个，第一个是发送消息的`ID`,第二个为发送消息的值。当 Egret 内监听了同样 `ID`的消息，将收到该消息，并触发回调。这里我们使用上面 Egret 内监听的 `sendToJS` 为发送消息的 `ID`。

Android 对应发送消息代码:
```
// Java 代码
// gameEngine 在 onCreate 实例化出来。 
gameEngine.callEgretInterface("sendToJS", "message from Android");
```

IOS 对应发送消息代码：

```
/// Objective-C 代码 
[[EgretRuntime getInstance] callEgretInterface:@"sendToJS" value:@"message from IOS"];
```

## Egret 向 Native 发送消息

### Native 监听消息

##### Android 内监听消息

在 Android 内监听消息通过调用`EgretGameEngine`实例的`setRuntimeInterface`方法来实现。第一个参数仍然是需要监听的 ID,第二个参数需要实例化一个`IRuntimeInterface`,并重写他的`callback`方法。在其中接收回调的字符串。

首先要实现`IRuntimeInterface`:

```
private interface IRuntimeInterface {
    public void callback(String message);
}
```

Android 对应的监听消息的代码：
```
// Java 代码
//gameEngine 在 onCreate 实例化出来。
gameEngine.setRuntimeInterface("sendToNative", new IRuntimeInterface() {
           @Override
            public void callback(String message) {
                Log.d("externalInterface", "message : " + message);
            }
        });
```

#### IOS 内监听消息

IOS 部分对应接收代码,IOS部分监听回调也比较简单，同样调用`setRuntimeInterface`,两个参数分别是监听的ID  `sendToNative` 和回调函数.

IOS 对应的监听消息的代码：
```
/// Objective-C 代码 
[[EgretRuntime getInstance] setRuntimeInterface:@"sendToNative" 
    block:^(NSString * message) {
        NSLog(@"message :%@", message);
    }];
```

### Egret 发送消息 

在`ExternalInterface`中，通过`call`方法向`native`发送消息。`call`中的两个参数分别是`functionName`和`value`,需要注意的是这两个参数都是字符串类型。`functionName`表示在 Native 端调用的函数回调名。也可以将此参数看成是函数回调的 ID ，有多个函数需要在 Native 端回调的时候可以通过此名称来区分。而`value`参数则比较好理解，表示要传给 Native 端的具体值。

```
// TypeScript 代码
egret.ExternalInterface.call("sendToNative", "message from js");   
```
比如上面代码发送了一段消息`message from js`给`Native`,当`Native`端添加了`sendToNative`的监听的时候，就可以在其回调函数中收到这个消息了。