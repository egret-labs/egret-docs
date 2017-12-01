# 微端中 JS 和 Java 之间通信方法

微端的运行模式分为两种，分别是 Runtime 模式和 WebView 模式,这两种模式的通讯方式有所不同，下面分别说一下。

[示例 demo 下载](http://tool.egret-labs.org/microclient/doc/zip/jsToJava.zip)

## Runtime 模式

### Runtime 模式 JS 调用 Java 方法

实现从 JS 调用 Java 方法分为两步，一是在 Java 中注册相应的回调函数，二是在 JS 中调用该函数。具体步骤如下：

#### 在 Java 中注册相应的回调函数

在 Java 中使用 NativeLauncher 类的 setExternalInferface 方法将函数名及其对应的回调函数接口注册到系统中。函数原型如下：

```
public void setExternalInterface(String funcName, INativePlayer.INativeInterface callback)；
```

其中，funcName 表示要注册的函数的名字，callback 表示注册的函数的回调接口。callback 的类型 INativePlayer.INativeInterface 的接口定义如下：

```
public interface INativePlayer {
    interface INativeInterface {
        public void callback(String message);
    }
}
```

其中，继承了 NativeActivity 的自定义类可以直接使用 NativeActivity 中的类型为 NativeLauncher 的受保护成员变量 launcher。一个完整的注册示例如下：

```
launcher.setExternalInterface("callNative", new INativePlayer.INativeInterface() {
    @Override
    public void callback(String s) {
        Log.d("Egret Launcher", s);
    }
});
```

之后，在 JS 中就可以调用名为 callNative 的方法了。

#### 在 JS 中调用注册的函数

在 JS 中使用 egret.ExternalInterface.call 方法调用注册的原生函数。函数原型如下：

```
egret.ExternalInterface.call(funcName, funcArg);
```

其中，funcName 表示调用函数名字的字符串和 funcArg 是传递给被调用函数的参数字符串。经过上面两步，就实现了在 JS 中调用 Java 函数。调用前面注册的 callNative 函数的示例代码如下：

```
egret.ExternalInterface.call("callNative", "message from JS");
```

### Runtime 模式 Java 调用 JS 方法

实现从 Java 调用 JS 方法分为两步，一是在 JS 中注册相应的回调函数，二是在 Java 中调用该函数。具体步骤如下：

#### 在 JS 中注册相应的回调函数

在 JS 中使用 egret.ExternalInterface.addCallback 方法将函数名及其对应的回调函数接口注册到系统中。函数原型如下：

```
egret.ExternalInterface.addCallback(funcName, callback);
```

其中，funcName 表示要注册的函数的名字，callback 表示注册的函数的回调接口。callback 是接受一个字符串参数的函数。一个完整的注册示例如下：


```
function callJS(msg) {
    console.log(msg);
}

egret.ExternalInterface.addCallback("CallJS", callJS);
```

之后，在 Java 中就可以调用名为 callJS 的方法了。

#### 在 Java 中调用注册的函数

在 Java 中使 NativeLauncher 类的 callExternalInterface 方法调用注册的 JS 函数。函数原型如下：

```
public void callExternalInterface(String funcName, String funcArg)；
```

其中，funcName 表示调用函数名字的字符串和 funcArg 是传递给被调用函数的参数字符串。经过上面两步，就实现了在 Java 中调用 JS 函数。调用前面注册的 callJS 函数的示例代码如下：


```
launcher.callExternalInterface("callJS", "message from native");
```

其中，launcher 变量仍然来自于 NativeActivity 类。

## WebView 模式

在 WebView 模式下可以运行两种类型的游戏，一种是 Egret Engine 开发的游戏，另一种是非 Egret Engine 开发的游戏。使用 Egret Engine 开发的游戏在 JS 和 Java 之间通信的机制与 Runtime 模式下是一样的。也就是说使用 Egret Engine 开发的游戏可以无缝地运行在微端的 Runtime 模式和 WebView 模式中。

下面的部分主要说明在微端的 WebView 模式下运行非 Egret Engine 开发的游戏时如何实现 JS 和 Java 之间的通信。

### WebView 模式 JS 调用 Java 方法

实现从 JS 调用 Java 方法分为两步，一是在 Java 中注册相应的回调函数，二是在 JS 中调用该函数。具体步骤如下：

#### 在 Java 中注册相应的回调函数

在 Java 中使用 NativeLauncher 类的 setExternalInferface 方法将函数名及其对应的回调函数接口注册到系统中。函数原型如下：

```
public void setExternalInterface(String funcName, INativePlayer.INativeInterface callback)；
```

其中，funcName 表示要注册的函数的名字，callback 表示注册的函数的回调接口。callback 的类型 INativePlayer.INativeInterface 的接口定义如下：

```
public interface INativePlayer {
    interface INativeInterface {
        public void callback(String message);
    }
}
```

其中，继承了 NativeActivity 的自定义类可以直接使用 NativeActivity 中的类型为 NativeLauncher 的受保护成员变量 launcher。一个完整的注册示例如下：


```
launcher.setExternalInterface("callNative", new INativePlayer.INativeInterface() {
    @Override
    public void callback(String s) {
        Log.d("Egret Launcher", s);
    }
});
```

之后，在 JS 中就可以调用名为 callNative 的方法了。

#### 2 在 JS 中调用注册的函数

在 JS 中使用 window.ExternalInterface.call 方法调用注册的原生函数。函数原型如下：

```
window.ExternalInterface.call(funcName, funcArg);
```

其中，funcName 表示调用函数名字的字符串和 funcArg 是传递给被调用函数的参数字符串。经过上面两步，就实现了在 JS 中调用 Java 函数。调用前面注册的 callNative 函数的示例代码如下：
```
window.ExternalInterface.call("callNative", "message from JS");
```

### WebView 模式 Java 调用 JS 方法

实现从 Java 调用 JS 方法分为两步，一是在 JS 中将要回调的函数定义为全局函数，二是在 Java 中调用该函数。具体步骤如下：

#### 在 JS 中定义全局的回调函数

全局的回调函数是只该函数可以通过 window 对象访问到，示例代码如下所示：


```
window.CallJS = function(msg) {
  console.log(msg);  
};
```


之后，在 Java 中就可以调用名为 callJS 的方法了。

#### 在 Java 中调用全局的回调函数

在 Java 中使 NativeLauncher 类的 callExternalInterface 方法调用注册的 JS 函数。函数原型如下：

```
public void callExternalInterface(String funcName, String funcArg)；
```

其中，funcName 表示调用函数名字的字符串和 funcArg 是传递给被调用函数的参数字符串。经过上面两步，就实现了在 Java 中调用 JS 函数。调用前面注册的 callJS 函数的示例代码如下：


```
launcher.callExternalInterface("callJS", "message from native");
```

其中，launcher 变量仍然来自于 NativeActivity 类。

