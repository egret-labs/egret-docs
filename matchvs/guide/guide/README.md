


## 阅读前

在阅读我们文档之前，请确保你已经阅读了我们的 [新手入门](../../demo/duck) 文档，并且了解了我们 Matchvs SDK的 使用流程，SDK 接口调用是需要安装相应的顺序才能成功调用。下面是介绍一个普通的游戏如何接入我们Matchvs SDK 。

#### 接口调用时序图

![](http://imgs.matchvs.com/static/%E6%97%B6%E5%BA%8F%E5%9B%BE.jpg)

MatcvhsSDK 库文件可到 [官网下载](http://www.matchvs.com/serviceDownload) 

MatcvhsSDK库 `matchvs`文件夹包括以下三个文件：

- matchvs.js： MatchvsSDK  JavaScript 源代码代码文件。
- matchvs.d.ts：MatchvsSDK  TypScript 定义文件。
- matchvs.min.js：MatchvsSDK  JavaScript 源码压缩文件。 

Matchvs SDK 接口服务分为 **请求服务** 和 **回调服务** ， 使用是以简单的接口调用和接口返回的方式实现相关联网操作。比如随机加入房间只需要调用`joinRandRoom接口`，加入房间结果就以接口 `joinRoomResponse` 返回。在整个使用过程中，开发者只需要关心`MatchvsEngine`(接口请求调用对象)和 `MatchvsResponse`(接口调用返回对象)。接口请求使用 `MatchvsEngine`对象实例，接口返回使用 `MatchvsResponse` 对象实例。先获取这两个类的对象作为全局使用。例如：

```typescript
class MsEngine {
    private static engine = new MatchvsEngine();
    private static response = new MatchvsResponse();
}

```

##初始化

在连接至 Matchvs前须对SDK进行初始化操作。此时选择连接测试环境（alpha）还是正式环境（release）。[环境说明](../Advanced/EnvGuide) 。

如果游戏属于调试阶段则连接至测试环境，游戏调试完成后即可发布到正式环境运行。  

- 请求接口：init
- 回调接口：initResponse

### init

初始化请求接口。

```typescript
engine.init(response: MatchvsResponse, channel: string, platform: string, gameID: string, appKey: string, gameVersion: number): number
```

response 中设置一些回调方法，在执行注册、登录、发送事件等操作对应的方法之后，reponse中的回调函数会被SDK异步调用。

> **注意** 发布之前须到官网控制台申请“发布上线”，申请通过后在调用init方法时传“release”才会生效，否则将不能使用release环境。


### initResponse

initResponse是 MatchvsResponse对象属性，在 engine.init 方法中传入的对象，init初始化完成之后，会异步回调 initResponse方法。

```typescript
response.initResponse(status:number);
```

### 示例代码

```typescript
class MsEngine {
    private static engine = new MatchvsEngine();
	private static response = new MatchvsResponse();
    
    private init(){
        this.response.initResponse = (status:number)=>{
            if(status == 200){
                //成功
            }else{
                //失败
            }
        }
        this.engine.init(this.response, "Matchvs", "alpha", 123456,"xxxxappkey", 1);
    }
}
```


## 注册用户

Matchvs提供的 `userID` 被用于在各个服务中校验连接的有效性，调试前开发者需要先获取到一个合法的`userID`。调用registerUser接口获取，在registerResponse回调返回。

每次调用 registerUser 接口都会生成新的 `userID` 为了节省资源消耗， `userID`和 `token` 有需要的可以缓存起来，在之后的应用启动中不必重复获取。如果你有自己的用户系统，可以将Matchvs 提供的 userID 和用户系统进行映射。可以参考 [Matchvs 第三方账号绑定](../Advanced/ThirdAccount)，让您的用户唯一对应一个userID，以节省资源。[可参考多开说明](../Advanced/MultipleIdentities) 

为了资源节省，我们在registerUserResponse 回调前把userID信息缓存在本地，数据会暂存在浏览器中。所以使用同一个浏览器调用 registerUser 接口会返回相同的 userID信息。如果需要清除缓存的用户信息请调用 。`LocalStore_Clear()` 接口。

- 请求接口：registerUser
- 回调接口：registerUserResponse

### registerUser

```
engine.registerUser()
```

###  registerUserResponse

```
registerUserResponse(userInfo:MsRegistRsp);
​```                                       |

> 注意：如果需要同时调试多个客户端，则需要打开多个不同的浏览器进行调试。
>

### 示例代码

​```typescript
class MsEngine {
	......
    private registerUser(){
        this.response.registerUserResponse = (userInfo:MsRegistRsp)=>{
            if(userInfo.status == 0){
                //成功
            }else{
                //失败
            }
        }
        this.engine.registerUser();
    }
}
```



## 登录

登录Matchvs服务端，与Matchvs建立连接。服务端会校验游戏信息是否合法，保证连接的安全性。如果一个账号在两台设备上登录，则后登录的设备会连接失败，提示403错误。如果用户加入房间之后掉线，再重新登录进来，则roomID为之前加入的房间的房间号。

- 请求接口：login
- 回调接口：loginResponse

### login

```typescript
engine.login(userID: number, token: string, deviceID: string): number
```

### loginResponse

```typescript
response.loginResponse(login:MsLoginRsp);
```

### 示例代码

````typescript
class MsEngine {
	......
    private login(){
        this.response.registerUserResponse = (login:MsLoginRsp)=>{
            if(userInfo.status == 200){
                //成功
            }else{
                //失败
            }
        }
        this.engine.login(1234, "xxxxxtoken", "deviceID");
    }
}
````

## 加入房间

登录游戏后，需要与其他在线玩家一起对战，先要进行进入房间，类似英雄联盟这样的匹配功能将若干用户匹配至一个房间开始一局游戏，Matchvs 提供4中加入房间的方法。

- 请求接口：
  - joinRandomRoom：随机接入房间。
  - joinRoomWithProperties：自定义属性匹配。
  - createRoom：创建房间。
  - joinRoom: 指定由createRoom接口创建房间的房间号加入房间。
- 回调接口：
  - joinRoomResponse：自己加入房间收到回调。
  - joinRoomNotify：其他人加入房间收到回调。
  - crateRoomResponse：调用 createRoom 接口收到的回调。

### joinRandomRoom

当房间里人数等于maxPlayer时，房间人满。系统会将玩家随机加入到人未满且没有 joinOver 的房间。如果不存在人未满且没有joinOver的房间，则系统会再创建一个房间，然后将玩家加入到该房间。玩家 `userProfile` 的值可以自定义，接下来会通过回调函数（如 `joinRoomResponse ` ）传给其他客户端。

```typescript
engine.joinRandomRoom(maxPlayer:number, userProfile:string):number
```

### joinRoomResponse

```typescript
response.joinRoomResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo);
```

- 如果本房间是某个玩家调用joinRandomRoom随机加入房间时创建的，那么roomInfo中的owner为服务器随机指定的房主ID。在调用engine.createRoom主动创建房间时owner为创建房间者（即房主）的ID。以上两种情况下，如果房主离开房间，服务器均会指定下一个房主，并通过`leaveRoomNotify`通知房间其他成员。
- roomUserInfoList 用户信息列表是本玩家加入房间前的玩家信息列表，不包含本玩家。
- roomUserInfoList中的玩家的userProfile的值来自于其他客户端调用joinRandomRoom时传递的userProfile的值。

### joinRoomNotify

```typescript
response.joinRoomNotify(roomUserInfo:MsRoomUserInfo);
```
- 某个玩家加入房间之后，如果该房间后来又有其他玩家加入，那么将会收到回调通知，response.joinRoomNotify方法会被SDK调用，调用时传入的roomUserInfo是新加入的其他玩家的信息，不是本玩家的信息。
- roomUserInfo的属性与response.joinRoomResponse中的 roomUserInfoList 中的元素包含的属性相同。

### 示例代码

```typescript
class MsEngine {
	......
    private joinRoom(){
        this.response.joinRoomResponse = (status:number, roomUserInfoList: Array <MsRoomUserInfo>, roomInfo:MsRoomInfo)=>{
            if(status == 200){
                //成功
            }else{
                //失败
            }
        }
        this.response.joinRoomNotify = (roomUserInfo:MsRoomUserInfo)=>{
            //roomUserInfo.userID 加入房间
        }
        this.engine.joinRandRoom(3, "hello matchvs");
    }
}
```

## 关闭房间

一般在匹配到用户，开始游戏之前要关闭房间，防止有其他玩家中途加入。

- 请求接口：joinOver
- 返回接口：
  - joinOverResponse ：自己关闭房间回调
  - joinOverNotify : 别人关闭房间回调

### joinOver

```typescript
engine.joinOver(cpProto:string):number
```

### joinOverResponse

客户端调用engine.joinOver发送关闭房间的指令之后，SDK异步调用reponse.joinOverResponse方法告诉客户端joinOver指令的处理结果。

```typescript
response.joinOverResponse(rsp:MsJoinOverRsp);
```

### joinOverNotify

当有人调用了 joinOver 接口，同一房间的其他用户就会收到这个 回调信息。

```typescript
response.joinOverNotify(notifyInfo:MsJoinOverNotifyInfo);
```

### 示例代码

```typescript
class MsEngine {
	......
    private joinOver(){
        this.response.joinOverResponse = (rsp:MsJoinOverRsp)=>{
            if(rsp.status == 200){
                //成功
            }else{
                //失败
            }
        }
        this.response.joinOverNotify = (notifyInfo:MsJoinOverNotifyInfo)=>{
            //notifyInfo.srcUserID 关闭房间 notifyInfo.roomID
        }
        this.engine.joinOver("hello matchvs");
    }
}
```

## 消息发送

开始游戏后，玩家之间相互同步信息，把自己的位置，得分等情况发送给其他玩家，让其他玩家能够同步修改自己的信息。一个房间消息的总传递速率是每秒500次，500次是指房间 **所有人接收和发送的总次数** 。

- 请求接口：sendEvent、sendEventEx
- 回调接口：sendEventResponse、sendEventNotify

### sendEvent

```typescript
engine.sendEvent(data:string):any
```
sendEventResponse 也会收到 sequence 标识，通过此标识来确定这个sendEventResponse 是由哪次sendEvent 发送的。主要用于在游戏中做信息同步的时候，网络传输都有延迟会出现sendEvent与sendEventResponse 收到顺序不同。 


消息会发给房间里**除自己外** 其他所有成员。同一客户端多次调用 `sendEvent` 方法时，每次返回的 `sequence`都是唯一的。但同一房间的不同客户端调用 `sendEven` t时生成的 `sequence` 之间会出现重复。可以发送二进制数据，开发者可以将数据用json、pb等工具先进行序列化，然后将序列化后的数据通过SendEvent的一系列接口发送。

同一客户端多次调用engine.sendEvent方法时，每次返回的sequence都是唯一的。但同一房间的不同客户端调用sendEvent时生成的sequence之间会出现重复。

### sendEventResponse

```typescript
response.sendEventResponse(rsp:MsSendEventRsp);
```

- 客户端调用engine.sendEvent或engine.sendEventEx 发送消息之后，SDK异步调用reponse.sendEventResponse 方法告诉客户端消息是否发送成功。

### sendEventNotify

```typescript
response.sendEventNotify(eventInfo:MsSendEventNotify);
```

### 示例代码

```typescript
class MsEngine{
    ......
    public constructor(){
        this.response.sendEventResponse = (rsp:MsSendEventRsp)=>{
            if(rsp.status == 200){
                //发送成功
            }else{
                //发送失败
            }
        };
        
        this.response.sendEventNotify = (eventInfo:MsSendEventNotify)=>{
            //eventInfo.srcUserID 发送数据 eventInfo.cpProto
        };
    }
    public sendEventEx(){
        //这里发给其他用户和 gameServer
        this.engine.sendEventEx(0, data, 2, [123.456.789]);
    }
    ......
}
```

## 离开房间

游戏结束后，客户端调用该接口通知服务端该客户端对应的用户要离开房间。

- 请求接口：leaveRoom
- 返回接口：
  - leaveRoomResponse：自己离开房间回调
  - leaveRoomNotify:  其他玩家离开房间回调

### leaveRoom

```typescript
engine.leaveRoom(cpProto:string):number
```

### leaveRoomResponse

客户端调用engine.leaveRoom发送关闭房间的指令之后，SDK异步调用reponse.leaveRoomResponse方法告诉客户端leaveRoom指令的处理结果。

```typescript
response.leaveRoomResponse(rsp:MsLeaveRoomRsp);
```

### leaveRoomNotify

当同房间中的其他玩家调用leaveRoom发送离开房间的指令之后，本客户端将会收到回调通知，response.leaveRoomNotify方法会被SDK调用，调用时传入的roomUserInfo是离开房间的玩家的信息。

```typescript
response.leaveRoomNotify(leaveRoomInfo:MsLeaveRoomNotify);
```
### 示例代码

```typescript
class MsEngine {
	......
    private leaveRoom(){
        this.response.leaveRoomResponse = (rsp:MsLeaveRoomRsp)=>{
            if(rsp.status == 200){
                //成功
            }else{
                //失败
            }
        }
        this.response.leaveRoomNotify = (leaveRoomInfo:MsLeaveRoomNotify)=>{
            //leaveRoomInfo.srcUserID 离开房间 leaveRoomInfo.roomID
        }
        this.engine.leaveRoom("hello matchvs");
    }
}
```


## 登出

退出游戏时要退出登录，断开与Matchvs的连接。

- 请求接口：logout
- 回调接口：logoutResponse

### logout

```typescript
engine.logout(cpProto:string):number
```

### logoutResponse

```typescript
response.logoutResponse(status:number);
```

### 错误码说明:[错误码](https://doc.matchvs.com/APIDoc/erroCode)

### 更多接口调用和说明请看 [接口使用说明](../APIDoc/TypeScript) 
