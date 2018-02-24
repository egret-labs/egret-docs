# 微端中 JS 和 Java 之间通信方法

微端支持的游戏分为两种，一种是egret游戏，一种是非egret游戏。两种模式下均支持JS和Java之间的通讯，只是调用的函数接口略有不同。

### [示例 demo 下载](http://tool.egret-labs.org/microclient/doc/zip/jsToJava_v3.zip)

## JS 调用 Java 方法

实现从 JS 调用 Java 方法分为两步，一是在 Java 中注册相应的回调函数，二是在 JS 中调用该函数。具体步骤如下：

### 在 Java 中注册相应的回调函数

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

### 在 JS 中调用注册的函数

在JS中调用注册的函数需要分为两种情况，一种是在egret游戏中，一种是在非egret游戏中。在这两种不同的游戏中，需要使用不同的JS接口函数进行调用。

在egret游戏中，使用 egret.ExternalInterface.call 方法调用注册的原生函数：

```
egret.ExternalInterface.call("callNative", "message from JS");
```
在非egret游戏中，使用 window['ExternalInterface']['call'] 方法调用注册的原生函数:

```
window['ExternalInterface']['call']("callNative", "message from JS");
```

## Java 调用 JS 方法

实现从 Java 调用 JS 方法分为两步，一是在 JS 中注册相应的回调函数，二是在 Java 中调用该函数。具体步骤如下：

### 在 JS 中注册相应的回调函数


#### 1. 在egret游戏中使用addCallback()

在 JS 中使用 egret.ExternalInterface.addCallback 方法将函数名及其对应的回调函数接口注册到系统中。函数原型如下：

```
egret.ExternalInterface.addCallback(funcName, callback);
```

其中，funcName 表示要注册的函数的名字，callback 表示注册的函数的回调接口。callback 是接受一个字符串参数的函数。一个完整的注册示例如下：


```
function callJS(msg) {
    console.log(msg);
}

egret.ExternalInterface.addCallback("callJS", callJS);
```

之后，在 Java 中就可以调用名为 callJS 的方法了。

#### 2. 非egret游戏中定义全局的回调函数

全局的回调函数是指该函数可以通过 window 对象访问到，示例代码如下所示：

```
window.callJS = function(msg) {
  console.log(msg);
};
```

之后，在 Java 中就可以调用名为 callJS 的方法了。

### 在 Java 中调用注册的函数

在 Java 中使 NativeLauncher 类的 callExternalInterface 方法调用注册的 JS 函数。函数原型如下：

```
public void callExternalInterface(String funcName, String funcArg)；
```

其中，funcName 表示调用函数名字的字符串和 funcArg 是传递给被调用函数的参数字符串。经过上面两步，就实现了在 Java 中调用 JS 函数。调用前面注册的 callJS 函数的示例代码如下：


```
launcher.callExternalInterface("callJS", "message from native");
```

其中，launcher 变量仍然来自于 NativeActivity 类。
