## WebSocket概述

WebSocket是基于H5规范的，WebSocket 类用于发送和接收数据。 在 H5 规范中，定义了客户端和服务器通讯的 WebSocket 方式，在得到浏览器支持以后，WebSocket 将会取代 Comet成为服务器推送的方法。 目前 Chrome、Firefox、Opera、Safari 等主流版本均支持，Internet Explorer从10开始支持。 WebSocket 标准在很大程度上简化了复杂的双向网络沟通和连接管理。

下图显示了一个基于 WebSocket 的基本结构，在这种结构中，浏览器使用全双工的WebSocket连接，直接与远程主机通信：

![](55657d85aef90.jpg)

Egret 的 WebSocket 即为 H5 的 WebSocket 封装。

## 用WebSocket进行通讯的基本过程

### 确保项目支持WebSocket

Egret 以官方扩展模块的形式支持 WebSocket。在现有的 Egret 项目中，修改 egretProperties.json 中的 modules 字段，在字段的最后添加 socket 模块：

```
 "name": "socket"
```

在项目所在目录内执行一次引擎编译：

```
egret build -e
```
本步骤已经完成，现在项目中既可以使用WebSocket相关的API了。

### WebSocket对象

所有的通讯都是基于一个WebSocket实例，首先创建WebSocket对象:

```
var sock:egret.WebSocket = new egret.WebSocket();
```

### 侦听事件

WebSocket对象主要有两个事件，一个是连接服务器成功，另一个是收到服务器数据:

```
sock.addEventListener( egret.ProgressEvent.SOCKET_DATA, onReceiveMessage, this );
sock.addEventListener( egret.Event.CONNECT, onSocketOpen, this );
```

### 连接服务器

加入侦听事件后，即可连接服务器。注意像所有的通讯协议一样，服务器需要支持WebSocket协议，为便于测试，WebSocket官方提供了一个专用于测试的服务器echo.websocket.org，连接其80端口即可测试:

```
sock.connect("echo.websocket.org", 80);
```

### 发送消息

连接成功后，即可发送消息，在前述的onSocketOpen处理函数中加入发送消息代码:
```
var cmd = '{"cmd":"uzwan_login","gameId":"0","from":"guzwan","userId":"3565526"}';
sock.writeUTF(cmd);
```
消息的具体格式都是根据情况自己定义的，通常是json格式，便于解析。当然可以自定义其他的字符串格式。

### 接收消息

服务器根据约定的格式返回消息，则会触发SOCKET_DATA事件，在其事件处理函数onReceiveMessage中即可读取消息:
```
var msg = sock.readUTF();
```
读取到字符串后，即可根据约定的格式解析。

## 使用示例

将上一节所述的各部分用法连接起来：

```
private webSocket:egret.WebSocket;
private createGameScene():void {    
    this.webSocket = new egret.WebSocket();        
    this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);                            
    this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);    
    this.webSocket.connect("echo.websocket.org", 80);
}
private onSocketOpen():void {    
	var cmd = "Hello Egret WebSocket";    
	console.log("连接成功，发送数据：" + cmd);    
	this.webSocket.writeUTF(cmd);
}
private onReceiveMessage(e:egret.Event):void {    
    var msg = this.webSocket.readUTF();    
    console.log("收到数据：" + msg);
}
```
访问 [这里](http://static.egret-labs.org/egret-game/example/html5/websocket/) 查看演示示例

## 注意事项

> 在 Native 下 websocket 单次消息长度不能超过 128*1024 字节。