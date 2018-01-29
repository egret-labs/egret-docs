# 微端中 JS 和 Object-C 之间通信方法

微端的运行模式分为两种，分别是 Runtime 模式和 WebView 模式，两种模式下可以使用同样的方式进行通讯。

### [示例 demo 下载](http://tool.egret-labs.org/microclient/doc/zip/jsToOC_2.zip)

## JS 调用 Objective-C 方法

实现从JS调用 Objective-C 方法分为两步，一是在Objective-C中注册相应的回调函数，二是在JS中调用该函数。具体步骤如下：

### 在Objective-C中注册相应的回调函数


在Objective-C中使用NativeLauncher类的setExternalInferface方法将函数名及其对应的回调函数接口注册到系统中。函数原型如下：

```
- (void)setExternalInterface:(NSString*)funcName Callback:(void(^)(NSString*))callback;
```

其中，funcName表示要注册的函数的名字，callback表示注册的函数的回调接口。继承了NativeViewController的自定义类可以直接使用NativeViewController中的类型为NativeLauncher的成员变量launcher。一个完整的注册示例如下：


```
[super.launcher setExternalInterface:@"callNative" Callback:^(NSString* msg) {
    NSLog(@"Egret Launcher %@", msg);
}];
```

之后，在JS中就可以调用名为callNative的方法了。

### 在JS中调用注册的函数

在JS中使用 window['ExternalInterface']['call'] 方法调用注册的原生函数。函数原型如下：


```
window['ExternalInterface']['call'](funcName, funcArg);
```

其中，funcName表示调用函数名字的字符串和funcArg是传递给被调用函数的参数字符串。经过上面两步，就实现了在JS中调用Objective-C函数。调用前面注册的callNative函数的示例代码如下：


```
window['ExternalInterface']['call']("callNative", "message from JS");
```

## Objective-C 调用 JS 方法

实现从Objective-C调用JS方法分为两步，一是在JS中注册相应的回调函数，二是在Objective-C中调用该函数。具体步骤如下：

### 在JS中注册相应的回调函数

注册回调函数的方式有两种：使用addCallback() 或 定义全局的回调函数。

Runtime模式只支持addCallback()方式；Webview模式下支持addCallback()方式和定义全局的回调函数方式。

#### 1. 使用 addCallback（）

在JS中使用 window['ExternalInterface']['addCallback'] 方法将函数名及其对应的回调函数接口注册到系统中。函数原型如下：

```
window['ExternalInterface']['addCallback'](funcName, callback);
```

其中，funcName表示要注册的函数的名字，callback表示注册的函数的回调接口。callback是接受一个字符串参数的函数。一个完整的注册示例如下：


```
function callJS(msg) {
    console.log(msg);
}

window['ExternalInterface']['addCallback']("CallJS", callJS);
```

之后，在Objective-C中就可以调用名为callJS的方法了。

#### 2. 在 JS 中定义全局的回调函数（Runtime模式不支持）

全局的回调函数是指该函数可以通过window对象访问到，示例代码如下所示：


```
window.callJS = function(msg) {
  console.log(msg);  
};
```


之后，在Objective-C中就可以调用名为callJS的方法了。

### 在 Objective-C 中调用注册的函数


在Objective-C中使NativeLauncher类的callExternalInterface方法调用注册的JS函数。函数原型如下：

```
- (void)callExternalInterface:(NSString*)funcName Value:(NSString*)value;
```

其中，funcName表示调用函数名字的字符串和value是传递给被调用函数的参数字符串。经过上面两步，就实现了在Objective-C中调用JS函数。调用前面注册的callJS函数的示例代码如下：


```
[super.launcher callExternalInterface:@"callJS" Value:@"message from native"];
```

其中，launcher变量仍然来自于NativeViewController类。


