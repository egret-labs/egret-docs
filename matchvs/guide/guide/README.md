## 接入前说明

`MatchvsSDK` 使用是以简单的接口调用和接口返回的方式实现相关联网操作。比如随机加入房间只需要调用`joinRandRoom接口`，加入房间结果就以接口 `joinRoomResponse` 返回。在整个使用过程中，开发者只需要关心`MatchvsEngine`(接口请求调用对象)和 `MatchvsResponse`(接口调用返回对象)。接口请求使用 `MatchvsEngine`对象实例，接口返回使用 `MatchvsResponse` 对象实例。后面后介绍这两个对象的使用方法。此文档只是用于引导开发者接入SDK，需要接口口详细的参数说明请看 [API手册](http://developer.egret.com/cn/github/egret-docs/matchvs/api/index.html)  

#### SDK游戏交互时序图

发起请求的是 `MatchvsEngine` 对象实例，返回结果是 `MatchvsResponse` 对象实例。图中接口名称只供参考，以 [API手册](http://developer.egret.com/cn/github/egret-docs/matchvs/api/index.html)  为准。

![](http://imgs.matchvs.com/static/时序图.jpg)

## 获取实例

在使用 MatchvsSDK 过程中需要确保 `MatchvsEngine`(接口请求调用对象)实例 和 `MatchvsResponse`(接口调用返回对象) 实例全局唯一。

```javascript
var engine = new MatchvsEngine();
var response = new MatchvsResponse();
```

> 可以使用全局变量，也可以使用单例模式开发者自己封装。

## 初始化

获取到对象实例后，需要开发者把 `MatchvsResponse` 实例注册到 `MatchvsEngine` 用于注册、登录、加入房间等接口请求后的异步回调。调用 `init` 接口初始化SDK。

示例调用如下：

```javascript
engine.init(response, "Matchvs", "alpha", 201016);
```

- Matchvs 提供了两个环境，alpha 调试环境和 release 正式环境。游戏开发调试阶段请使用 alpha 环境，即 platform 传参"alpha"。

参数说明:

| 参数     | 含义                                          |
| :------- | --------------------------------------------- |
| response | 回调对象(`MatchvsResponse` 实例)              |
| channel  | 渠道，填“Matchvs”即可                         |
| platform | 平台，调试环境填“alpha” ，正式环境填“release” |
| gameId   | 游戏ID，来自官网控制台游戏信息                |


**注意** 在整个应用全局，开发者只需要对引擎做一次初始化。

## 注册

Matchvs提供的 `userID` 被用于在各个服务中校验连接的有效性，调试前开发者需要先获取到一个合法的`userID`。
```javascript
engine.registerUser();
```

调用成功后会收到注册成功的回调 ：
```javascript
response.registerUserResponse = function(userInfo) {
	// 用户ID
	console.log("userID: ", userInfo.userID);
	// token
	console.log("token: ", userInfo.token);
}
```


**注意** `userID`和 `token` 有需要的可以缓存起来，在之后的应用启动中不必重复获取。如果你有自己的用户系统，可以将Matchvs 提供的 userID 和用户系统进行映射。调用 registerUser 接口的返回数据会暂存在浏览器中。所以使用同一个浏览器调用 registerUser 接口会返回相同的 userID信息。


## 登录

成功获取 `userID` 后即可连接Matchvs服务：

```javascript
engine.login(userID, token, gameID, gameVersion, appkey, secret, deviceID, gatewayID);
```

参数说明:

| 参数        | 含义                                     |
| ----------- | ---------------------------------------- |
| userID      | 用户ID，调用注册接口后获取               |
| token       | 用户token，调用注册接口后获取            |
| gameID      | 游戏ID，来自Matchvs官网控制台游戏信息    |
| gameVersion | 游戏版本，自定义，用于隔离匹配空间       |
| appkey      | 游戏Appkey，来自Matchvs控制台游戏信息    |
| serect      | secret key，来自Matchvs控制台游戏信息    |
| deviceID    | 设备ID，用于多端登录检测，请保证是唯一ID |
| gatewayID   | 服务器节点ID，默认为0                    |

- 其中，appKey，secret，gameID是你在Matchvs官网创建游戏后获取的信息，可以[前往控制台](http://www.matchvs.com/manage/gameContentList)查看。appkey和secret是校验游戏合法性的关键信息，请妥善保管secret信息。  
- userID 和 token 是调用 registerUser 接口 **注册成功** 的回调信息。
- deviceId 用于检测是否存在多个设备同时登录同一个用户的情况，如果一个账号在两台设备上登录，则后登录的设备会连接失败。
- Matchvs默认将相同游戏版本的用户匹配到一起。如果开发者对游戏进行了版本升级，不希望两个版本的用户匹配到一起，此时可以在登录的时候通过`gameVersion`区分游戏版本。 

登录成功会收到回调 ：

```javascript
response.loginResponse = function(loginRsp) {
	// 返回值
	var status = loginRsp.status;
	// 房间号
	var roomID = loginRsp.roomID;
}
```

> SDK支持房间断线重连，掉线重新登录后可以选择加入原来的房间，loginResponse里的`roomID` 即为上次异常退出的房间ID。如果登录时没有异常退出的房间，则`roomID` 为0。[断线重连说明](http://www.matchvs.com/service?page=reconnect)

## 加入房间

登录成功后，可以调用Matchvs加入房间逻辑将用户匹配至一个房间开始一局游戏（如：《荒野行动》的开始匹配、《球球大作战》的开始比赛等）

Matchvs默认提供了随机加入房间的模式，调用加入房间逻辑后，Matchvs服务器会自动帮助用户寻找当前可用房间，只有在同一个房间里的用户才可以互相通信。

随机加入房间的模式下，Matchvs服务器能够快速找到合适的房间，开发者只需要自定义房间人数上限，Matchvs服务端会根据当前房间人数判断是否可继续加入。  

加入房间后，服务器会指定一个房主，当房主离开房间后，服务器会随机指定下一个房主，并通过`leaveRoomNotify` 通知房间内其他成员。

**注意**  随机匹配不能匹配到客户端主动创建的房间里，即通过`createRoom()`（见联网扩展）创建的房间。

随机加入一个房间：

```javascript
engine.joinRandomRoom(maxPlayer, userProfile);
```


参数说明:

| 参数         | 含义                |
| ---------- | ----------------- |
| maxPlayer  | 最大玩家数，不超过20       |
| uerProfile | 玩家简介，可以填写昵称、段位等信息 |

加入房间的回调：

```javascript
response.joinRoomResponse = function(status, roomUserInfoList, roomInfo) {
	console.log("加入房间结果：", status);
	console.log("房间用户列表：", roomUserInfoList);
	console.log("房间信息：", roomInfo);
}
```

如果当前没有可用房间，Matchvs会自动创建一个房间并将该用户加入到服务端创建的房间。当其他用户加入时，Matchvs会通知开发者新加入的用户信息。

其他玩家加入房间的回调：

```javascript
reponse.joinRoomNotify = function(roomUserInfo) {
	console.log("房间新加的用户的信息：", roomUserInfo);
}
```

**注意** 如果开发者想用户匹配成功后可查看对方信息，可以通过填充`userProfile`的方式，将当前用户的头像昵称信息填充至`userProfile`，Matchvs会在匹配成功时将`userProfile`广播给所有用户。 

如果用户已经在房间里，此时再次调用加入房间：如果房间未JoinOver，则玩家会退出房间然后随机加入房间；如果房间已经JoinOver，则SDK会返回重复加入的错误提示。

## 停止加入

如果房间内游戏人数已经满足开始条件，此时客户端需要通知Matchvs无需再向房间里加人。（如原本设置的房间人数上限为6，而开发者在房间人数满足4个即可开始游戏，开发者就需调用停止加入接口。） 

停止加入 ：

```javascript
engine.joinOver(cpProto);
```


参数说明:

| 参数    | 含义     |
| ------- | -------- |
| cpProto | 负载数据 |

停止加入的回调 ：

```javascript
response.joinOverResponse = function(joinOverRsp) {
	// 返回值
	console.log("加入房间结果：", joinOverRsp.status);
	// 负载数据
	console.log("负载信息：", joinOverRsp.cpProto);
}
```

**注意**  Matchvs服务器会判断房间是人满状态或者已停止加入状态，根据状态判断房间是否还可加人。为避免房间人满后开始游戏，在游戏过程中有人退出后，Matchvs判断人不满可继续向房间加人，建议在任何不希望中途加入的游戏里，只要满足开始游戏条件则向Matchvs服务端发送停止加入。

`cpProto` 为开发者自定义的协议内容，如果没有自定义协议可填`''`。`cpProto`的内容会伴随消息的广播以Notify的方式发给房间所有成员。其他接口里的`cpProto`机制均是如此。

## 游戏数据传输

当玩家在同一个房间时，即可互相通信。开发者可用该接口将数据发送给其他玩家，Matchvs默认将数据广播给当前房间内除自己以外的所有用户。

默认广播数据：

```javascript
engine.sendEvent(msg)
```
参数说明:

| 参数   | 含义   |
| ---- | ---- |
| msg  | 消息内容 |

返回结果为一个对象，该对象的属性为：

| 参数       | 含义               |
| -------- | ---------------- |
| result   | 错误码，0表示成功，其他表示失败 |
| sequence | 事件序号，作为事件的唯一标识   |

数据传输回调 ：

```javascript
response.sendEventResponse = function(sendEventRsp) {
	console.log("返回状态：", sendEventRsp.status);
	console.log("事件序号：", sendEventRsp.sequence);
}
```


收到其他人发的数据：

```javascript
response.sendEventNotify = function(eventInfo) {
    console.log("推送方用户ID：", eventInfo.srcUserID);
    console.log("消息内容：", eventInfo.cpProto);
}
```

## 离开房间

在成功加入房间后，开发者可调用离开房间使得用户退出当前房间，退出房间后将不能再与房间内的成员进行通信。  

- 当房间内有用户离开时，剩余用户也会收到离开的消息。
- 如果用户已经离开房间，此时可以随时再次加入其他房间。


离开房间 ：

```javascript
engine.leaveRoom(cpProto);
```

参数说明:

| 参数      | 含义   |
| ------- | ---- |
| cpProto | 负载信息 |

自己离开房间回调 ：

```javascript
response.leaveRoomResponse = function(leaveRoomRsp) {
	console.log("状态返回：", leaveRoomRsp.status);
	console.log("房间ID：", leaveRoomRsp.roomID);
	console.log("用户ID：", leaveRoomRsp.userID);
	console.log("负载信息：", leaveRoomRsp.cpProto);
}
```


其他成员离开房间回调 ：

```javascript
response.leaveRoomNotify = function(roomID, roomUserInfo) {;
	console.log("房间号：", roomID);
	console.log("离开房间的用户的信息：", roomUserInfo);
}
```


## 游戏登出

如果用户不会再加入游戏，此时可以调用登出与Matchvs服务端断开连接。  

**注意** 游戏退出时，务必要调用登出。

```javascript
engine.logout();
```

登出成功的回调 ：

```javascript
response.logoutResponse = function(status) {
	console.log("状态返回值：", status);
}
```


## 反初始化

在登出后，调用反初始化对资源进行回收。  

```javascript
engine.uninit();
```


