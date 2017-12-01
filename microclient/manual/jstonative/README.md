# 微端中JS和Java之间通信方法

微端的运行模式分为两种，分别是Runtime模式和WebView模式,这两种模式的通讯方式有所不同，下面分别说一下。

[示例demo下载](http://tool.egret-labs.org/microclient/doc/zip/jsToJava.zip)

## Runtime 模式
### Runtime 模式 JS 调用 Java 方法

实现从JS调用Java方法分为两步，一是在Java中注册相应的回调函数，二是在JS中调用该函数。具体步骤如下：

#### 1 在Java中注册相应的回调函数

在Java中使用NativeLauncher类的setExternalInferface方法将函数名及其对应的回调函数接口注册到系统中。函数原型如下：

```
public void setExternalInterface(String funcName, INativePlayer.INativeInterface callback)；
```

其中，funcName表示要注册的函数的名字，callback表示注册的函数的回调接口。callback的类型INativePlayer.INativeInterface的接口定义如下：

```
public interface INativePlayer {
    interface INativeInterface {
        public void callback(String message);
    }
}
```

其中，继承了NativeActivity的自定义类可以直接使用NativeActivity中的类型为NativeLauncher的受保护成员变量launcher。一个完整的注册示例如下：


```
launcher.setExternalInterface("callNative", new INativePlayer.INativeInterface() {
    @Override
    public void callback(String s) {
        Log.d("Egret Launcher", s);
    }
});
```

之后，在JS中就可以调用名为callNative的方法了。

#### 2 在JS中调用注册的函数

在JS中使用egret.ExternalInterface.call方法调用注册的原生函数。函数原型如下：

```
egret.ExternalInterface.call(funcName, funcArg);
```

其中，funcName表示调用函数名字的字符串和funcArg是传递给被调用函数的参数字符串。经过上面两步，就实现了在JS中调用Java函数。调用前面注册的callNative函数的示例代码如下：


```
egret.ExternalInterface.call("callNative", "message from JS");
```

### Runtime 模式 Java 调用 JS 方法

实现从Java调用JS方法分为两步，一是在JS中注册相应的回调函数，二是在Java中调用该函数。具体步骤如下：

#### 1 在JS中注册相应的回调函数

在JS中使用egret.ExternalInterface.addCallback方法将函数名及其对应的回调函数接口注册到系统中。函数原型如下：

```
egret.ExternalInterface.addCallback(funcName, callback);
```

其中，funcName表示要注册的函数的名字，callback表示注册的函数的回调接口。callback是接受一个字符串参数的函数。一个完整的注册示例如下：


```
function callJS(msg) {
    console.log(msg);
}

egret.ExternalInterface.addCallback("CallJS", callJS);
```

之后，在Java中就可以调用名为callJS的方法了。

#### 2 在Java中调用注册的函数

在Java中使NativeLauncher类的callExternalInterface方法调用注册的JS函数。函数原型如下：

```
public void callExternalInterface(String funcName, String funcArg)；
```

其中，funcName表示调用函数名字的字符串和funcArg是传递给被调用函数的参数字符串。经过上面两步，就实现了在Java中调用JS函数。调用前面注册的callJS函数的示例代码如下：


```
launcher.callExternalInterface("callJS", "message from native");
```

其中，launcher变量仍然来自于NativeActivity类。

## WebView 模式

在WebView模式下可以运行两种类型的游戏，一种是Egret Engine开发的游戏，另一种是非Egret Engine开发的游戏。使用Egret Engine开发的游戏在JS和Java之间通信的机制与Runtime模式下是一样的。也就是说使用 Egret Engine 开发的游戏可以无缝地运行在微端的 Runtime 模式和WebView模式中。

下面的部分主要说明在微端的WebView模式下运行非Egret Engine开发的游戏时如何实现JS和Java之间的通信。

### WebView 模式 JS 调用 Java 方法

实现从JS调用Java方法分为两步，一是在Java中注册相应的回调函数，二是在JS中调用该函数。具体步骤如下：

#### 1 在Java中注册相应的回调函数

在Java中使用NativeLauncher类的setExternalInferface方法将函数名及其对应的回调函数接口注册到系统中。函数原型如下：

```
public void setExternalInterface(String funcName, INativePlayer.INativeInterface callback)；
```

其中，funcName表示要注册的函数的名字，callback表示注册的函数的回调接口。callback的类型INativePlayer.INativeInterface的接口定义如下：

```
public interface INativePlayer {
    interface INativeInterface {
        public void callback(String message);
    }
}
```

其中，继承了NativeActivity的自定义类可以直接使用NativeActivity中的类型为NativeLauncher的受保护成员变量launcher。一个完整的注册示例如下：


```
launcher.setExternalInterface("callNative", new INativePlayer.INativeInterface() {
    @Override
    public void callback(String s) {
        Log.d("Egret Launcher", s);
    }
});
```

之后，在JS中就可以调用名为callNative的方法了。

#### 2 在JS中调用注册的函数

在JS中使用window.ExternalInterface.call方法调用注册的原生函数。函数原型如下：

```
window.ExternalInterface.call(funcName, funcArg);
```

其中，funcName表示调用函数名字的字符串和funcArg是传递给被调用函数的参数字符串。经过上面两步，就实现了在JS中调用Java函数。调用前面注册的callNative函数的示例代码如下：
```
window.ExternalInterface.call("callNative", "message from JS");
```

### WebView 模式 Java 调用 JS 方法

实现从Java调用JS方法分为两步，一是在JS中将要回调的函数定义为全局函数，二是在Java中调用该函数。具体步骤如下：

#### 1 在JS中定义全局的回调函数

全局的回调函数是只该函数可以通过window对象访问到，示例代码如下所示：


```
window.CallJS = function(msg) {
  console.log(msg);  
};
```


之后，在Java中就可以调用名为callJS的方法了。

#### 2 在Java中调用全局的回调函数

在Java中使NativeLauncher类的callExternalInterface方法调用注册的JS函数。函数原型如下：

```
public void callExternalInterface(String funcName, String funcArg)；
```

其中，funcName表示调用函数名字的字符串和funcArg是传递给被调用函数的参数字符串。经过上面两步，就实现了在Java中调用JS函数。调用前面注册的callJS函数的示例代码如下：


```
launcher.callExternalInterface("callJS", "message from native");
```

其中，launcher变量仍然来自于NativeActivity类。

