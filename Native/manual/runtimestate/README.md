
# 运行过程中 runtime 的事件回调

## state

- 消息类型

```
{"state”:”starting”}  index加载成功
{"state”:”running”}  js加载成功，开始运行游戏
```

- 注册监听（以Android为例）

```java
private void setExternalInterfaces() {
    // handle the state change Event during the running
    nativeAndroid.setExternalInterface("@onState", new INativePlayer.INativeInterface() {
        @Override
        public void callback(String message) {
            String str = "Native get onState message: ";
    
            str += message;
            Log.e(TAG, str);
        }
    });
}
```

## error

- 消息类型

```
{"error":"load"}  index加载失败
{"error":"start"}  js加载失败
{"error”:”stopRunning”}  运行过程中出现异常，中断了引擎的心跳（一般会先抛出jsError）
```

- 注册监听（以Android为例）

```java
private void setExternalInterfaces() {
    // handle the error Event during the running
    nativeAndroid.setExternalInterface("@onError", new INativePlayer.INativeInterface() {
        @Override
        public void callback(String message) {
            String str = "Native get onError message: ";
    
            str += message;
            Log.e(TAG, str);
        }
});
```

## jsError

- 注册监听（以Android为例）

```java
private void setExternalInterfaces() {
    // handle the error Event during the running
    nativeAndroid.setExternalInterface("@onJSError", new INativePlayer.INativeInterface() {
        @Override
        public void callback(String message) {
            // 参数为堆栈信息
            String str = "Native get onJSError message: ";
    
            str += message;
            Log.e(TAG, str);
        }
});
```
