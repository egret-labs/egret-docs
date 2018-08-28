## JS与Java通信

### JS向Java发送消息

Java注册接收消息的方法：

```java
nativeAndroid.setExternalInterface("sendToNative", new INativePlayer.INativeInterface() {
    @Override
    public void callback(String message) {
        String str = "Native get message: ";
        str += message;
        Log.d(TAG, str);
    }
});
```

JS发送消息：

```javascript
egret.ExternalInterface.call("sendToNative", "message from JS");
```

### Java向JS发送消息

JS注册接收消息的方法：

```javascript
egret.ExternalInterface.addCallback("sendToJS", function(msg) {
    console.log(msg);
});
```

Java发送消息：

```java
nativeAndroid.callExternalInterface("sendToJS", "message from Java");
```

### 注意
需要先注册接收消息的方法，才能接收到另一端发送的消息。

在应用刚启动时，JS可能没有加载完，这是向JS发送消息是不能接收到的。可以在游戏代码中先向Java发送消息通知Java端接收方法已经注册完成，再向JS发送消息。

## JS与OC通信

逻辑和Android相同，只是原生工程的API不同。

### Native

注册接收消息的方法：

```objective-c
[_native setExternalInterface:@"sendToNative" Callback:^(NSString* message) {
    NSString* str = @"Native get message: ";
    str = [str stringByAppendingString:message];
    NSLog(@"%@", str);
}];
```

发送消息：

```objective-c
[_native callExternalInterface:@"sendToJS" Value:@"message from OC"];
```
