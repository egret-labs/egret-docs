## API 说明
MatchvsSDK 主要是由 MatchvsEngine（接口请求） 类，和 MatchvsResponse（接口回调） 类控制。先new这两个类的对象作为全局使用。例如：

```typescript
let engine = new MatchvsEngine();
let response = new MatchvsResponse();
```




## 初始化

在连接至 Matchvs前须对SDK进行初始化操作。此时选择连接测试环境（alpha）还是正式环境（release）。[环境说明](../guide/sys/README.md) 。初始化请求接口有两个，如果你是使用 Matchvs 官网账号在 Matchvs 控制台创建的游戏（简称Matchvs云服务）使用 init 接口初始化，如果是使用 Matchvs 服务端引擎代码在自己自定的服务器上部署的游戏服务就使用（简称 [Matchvs独立部署]() ） premiseInit 接口初始化。

**如果 Matchvs 服务正在升级，init 接口会放回 510 错误码，开发者可以选择是否需要展示“服务升级”的提示。**

如果游戏属于调试阶段则连接至测试环境，游戏调试完成后即可发布到正式环境运行。  

- 请求接口：init、premiseInit
- 回调接口：initResponse

### init

初始化请求接口。

```typescript
engine.init(pResponse: MatchvsResponse, pChannel: string, pPlatform: string, gameID: number, appKey: string, gameVersion: number, threshold ?:number): number
```

#### 参数：

| 参数        | 类型            | 描述                                                         | 示例值    |
| ----------- | --------------- | ------------------------------------------------------------ | --------- |
| response    | MatchvsResponse | 回调类型MatchvsResponse的对象                                | response  |
| channel     | string          | 渠道，固定值                                                 | "Matchvs" |
| platform    | string          | 平台，选择测试(alpha)or正式环境(release)                     | "alpha"   |
| gameID      | number          | 游戏ID，在引擎官网创建游戏给出的ID                           | 200103    |
| appKey      | string          | 游戏 App Key 官网生成                                        |           |
| gameVersion | number          | 游戏版本，自定义，用于隔离匹配空间                           |           |
| threshold   | number          | 延迟容忍,在有多个节点的情况下使用，如果使用默认节点请可以不传该值 | 0 或 不传 |

response 中设置一些回调方法，在执行注册、登录、发送事件等操作对应的方法之后，reponse中的回调函数会被SDK异步调用。

> **注意** 发布之前须到官网控制台申请“发布上线”，申请通过后在调用init方法时传“release”才会生效，否则将不能使用release环境。

#### 错误码：

| 错误码 | 含义                                                     |
| ------ | -------------------------------------------------------- |
| 0      | 成功                                                     |
| -1     | 失败                                                     |
| -25    | channel 非法，请检查是否正确填写为 “Matchvs”             |
| -26    | platform 非法，请检查是否正确填写为 “alpha” 或 “release” |

### premiseInit

使用独立部署的游戏调用此接口初始化SDK。

```typescript
function engine.premiseInit(response:MatchvsResponse, endPoint:string, gameID:number, appKey: string):number
```

#### 参数

| 参数     | 类型            | 描述                          | 示例值         |
| -------- | --------------- | ----------------------------- | -------------- |
| response | MatchvsResponse | 回调类型MatchvsResponse的对象 | response       |
| endPoint | string          | 服务配置的域名地址            | test.xxxxx.com |
| gameID   | number          | 服务配置的游戏ID              | 123456         |
| appKey   | string          | 游戏 App Key 官网生成         |                |

#### 返回值

| 错误码 | 含义         |
| ------ | ------------ |
| 0      | 接口调用成功 |
| -1     | 接口调用失败 |

### initResponse

initResponse是 MatchvsResponse对象属性，在 engine.init 方法中传入的对象，init初始化完成之后，会异步回调 initResponse方法。

```typescript
response.initResponse(status:number);
```

#### 参数

| 参数   | 类型   | 描述                            | 示例值 |
| ------ | ------ | ------------------------------- | ------ |
| status | number | 状态返回，200表示成功，其他失败 | 200    |

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
        this.engine.init(this.response, "Matchvs", "alpha", 123456, "xxxxappkey", 1);
    }
}
```



## 反初始化

SDK反初始化工作，反初始化会让 init 中的 response 回调失效，也就是收不到任何的回调了。只有请求，没有回调。

- 请求接口： uninit
- 回调接口：  无

### uninit

```
engine.uninit()
```

#### 错误码

| 错误码 | 含义 |
| ------ | ---- |
| 0      | 成功 |
| -1     | 失败 |

## 注册用户

Matchvs提供的 `userID` 被用于在各个服务中校验连接的有效性，调试前开发者需要先获取到一个合法的`userID`。调用registerUser接口获取，在registerResponse回调返回。

每次调用 registerUser 接口都会生成新的 `userID` 为了节省资源消耗， `userID`和 `token` 有需要的可以缓存起来，在之后的应用启动中不必重复获取。如果你有自己的用户系统，可以将Matchvs 提供的 userID 和用户系统进行映射。可以参考 [Matchvs 第三方账号绑定](../Advanced/ThirdAccount)，让您的用户唯一对应一个userID，以节省资源。

为了资源节省，我们在registerUserResponse 回调前把userID信息缓存在本地，数据会暂存在浏览器中。所以使用同一个浏览器调用 registerUser 接口会返回相同的 userID信息。如果需要清除缓存的用户信息请调用 `LocalStore_Clear()` 接口。

- 请求接口：registerUser
- 回调接口：registerUserResponse

### registerUser

```
engine.registerUser()
```

#### 返回值

| 错误码 | 含义     |
| ------ | -------- |
| 0      | 成功     |
| -1     | 失败     |
| -2     | 未初始化 |

###  registerUserResponse

```
registerUserResponse(userInfo:MsRegistRsp);
```

#### 参数MsRegistRsp类的属性

| 属性   | 类型   | 描述                               | 示例值                                                 |
| ------ | ------ | ---------------------------------- | ------------------------------------------------------ |
| userID | number | 用户ID                             | 123456                                                 |
| token  | string | 用户Token                          | "XGBIULHHBBSUDHDMSGTUGLOXTAIPICMT"                     |
| name   | string | 用户名称                           | "张三"                                                 |
| avatar | string | 头像                               | "<http://pic.vszone.cn/upload/head/1416997330299.jpg>" |
| status | number | 接口回调状态码,0表示成功，其他失败 | 0 成功                                                 |

> 注意：如果需要同时调试多个客户端，则需要打开多个不同的浏览器进行调试。
>

### 示例代码

```typescript
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
engine.login(userID: number, token: string, deviceID: string, nodeID?:number): number
```

#### 参数

| 参数     | 类型   | 描述                                                         | 示例值 |
| -------- | ------ | ------------------------------------------------------------ | ------ |
| userID   | number | 用户ID，调用注册接口后获取                                   | 123546 |
| token    | string | 用户token，调用注册接口后获取                                | ""     |
| deviceID | string | 设备ID，用于多端登录检测，请保证是唯一ID                     | ""     |
| nodeID   | number | 节点ID，有多节点的时候，使用getNodeList 获取有效节点，多节点情况[说明](MultNode) |        |

#### 返回值

| 错误码 | 含义                         |
| ------ | ---------------------------- |
| 0      | 成功                         |
| -1     | 失败                         |
| -2     | 未初始化，请先调用初始化接口 |
| -3     | 正在初始化                   |
| -5     | 正在登录                     |
| -6     | 已经登录，请勿重复登录       |
| -11    | 正在登出                     |

### loginResponse

```typescript
response.loginResponse(login:MsLoginRsp);
```

#### 参数 MsLoginRsp 类的属性

| 属性   | 类型   | 描述                                                         | 示例值 |
| ------ | ------ | ------------------------------------------------------------ | ------ |
| status | number | 状态返回 ：200 成功 ；402 应用校验失败，确认是否在未上线时用了release环境，并检查gameID、appkey 和 secret ；403 检测到该账号已在其他设备登录 ； 404 无效用户 ；500 服务器内部错误 | 200    |
| roomID | string | 房间号（预留断线重连）                                       | 210039 |

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
        this.engine.login(1234, "xxxxxtoken", "v");
    }
}
````



## 登出

退出登录，断开与Matchvs的连接。

- 请求接口：logout
- 回调接口：logoutResponse

### logout

```typescript
engine.logout(cpProto:string):number
```

#### 参数

| 参数    | 类型   | 描述     | 示例值 |
| ------- | ------ | -------- | ------ |
| cpProto | string | 负载信息 | ""     |

#### 返回值

| 错误码 | 含义   |
| ------ | ------ |
| 0      | 成功   |
| -1     | 失败   |
| -4     | 未登录 |

### logoutResponse

```typescript
response.logoutResponse(status:number);
```

#### 参数

| 参数   | 类型   | 描述                            | 示例值 |
| ------ | ------ | ------------------------------- | ------ |
| status | number | 状态返回，200表示成功 ；500 服务器内部错误 | 200    |



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

当房间里人数等于maxPlayer时，房间人满。系统会将玩家随机加入到人未满且没有 [joinOver](../APIDoc/JavaScript#joinOver) 的房间。如果不存在人未满且没有joinOver的房间，则系统会再创建一个房间，然后将玩家加入到该房间。玩家 `userProfile` 的值可以自定义，接下来会通过回调函数（如 `joinRoomResponse ` ）传给其他客户端。

```typescript
engine.joinRandomRoom(maxPlayer:number, userProfile:string):number
```

#### 参数

| 参数        | 类型   | 描述             | 示例值 |
| ----------- | ------ | ---------------- | ------ |
| maxPlayer   | number | 房间内最大玩家数 | 3      |
| userProfile | string | 玩家简介         | ""     |

#### 返回值

| 错误码 | 含义                                   |
| ------ | -------------------------------------- |
| 0      | 成功                                   |
| -1     | 失败                                   |
| -2     | 未初始化                               |
| -3     | 正在初始化                             |
| -4     | 未登录                                 |
| -7     | 正在创建或者进入房间                   |
| -8     | 已经在房间中                           |
| -20    | 1 <maxPlayer超出范围 ，maxPlayer须≤100 |
| -21    | userProfile 过长，不能超过512个字符    |

#### joinRoomWithProperties

```typescript
joinRoomWithProperties(matchinfo:MsMatchInfo, userProfile:string, watchSet?: MVS.MsWatchSet ):number
```

#### 参数

| 参数        | 类型           | 描述     | 示例值 |
| ----------- | -------------- | -------- | ------ |
| matchinfo   | MsMatchInfo    | 配置信息 |        |
| userProfile | string         | 玩家简介 | ""     |
| watchSet    | MVS.MsWatchSet | 观战信息 |        |

#### MsMatchInfo 的属性

| 属性         | 类型   | 描述                         | 示例值                        |
| ------------ | ------ | ---------------------------- | ----------------------------- |
| maxPlayer    | number | 玩家最大人数                 | 3                             |
| mode         | number | 模式可 默认填0               | 0                             |
| canWatch     | number | 是否可以观战 1-可以 2-不可以 | 1                             |
| tags         | object | 匹配属性值                   | {title:"Matchvs",name:"demo"} |
| visibility   | number | 是否可见 0-不可见 1-可见     | 1                             |
| roomProperty | string | 自定义房间附加信息           | “roomProperty”                |

#### MVS.MsWatchSet 的属性

| 属性       | 类型    | 描述                 | 示例值          |
| ---------- | ------- | -------------------- | --------------- |
| cacheMS    | number  | 缓存多久的数据       | 6*1000（6分钟） |
| maxWatch   | number  | 最大人数             | 3               |
| delayMS    | number  | 观看延迟多久后的数据 | 2000            |
| persistent | boolean | 是否持久缓存         | false           |

> ags为匹配标签，开发者通过设置不同的标签进行自定义属性匹配，相同MsMatchInfo的玩家将会被匹配到一起。

#### 返回值

| 错误码 | 含义                                   |
| ------ | -------------------------------------- |
| 0      | 成功                                   |
| -1     | 失败                                   |
| -2     | 未初始化                               |
| -3     | 正在初始化                             |
| -4     | 未登录                                 |
| -7     | 正在创建或者进入房间                   |
| -8     | 已经在房间中                           |
| -21    | userProfile 过长，不能超过512个字符    |
| -20    | 1 <maxPlayer超出范围 ，maxPlayer须≤100 |

### createRoom

开发者可以在客户端主动创建房间，创建成功后玩家会被自动加入该房间，创建房间者即为房主，如果房主离开房间则Matchvs会自动转移房主并通知房间内所有成员，开发者通过设置CreateRoomInfo创建不同类型的房间。创建房间成功，如果需要再次创建房间需要调用离开房间接口(leaveRoom)先离开当前房间。

```typescript
engine.createRoom(createRoomInfo:MsCreateRoomInfo, userProfile:string, watchSet?:MVS.MsWatchSet): number
```

#### 参数

| 参数           | 类型                   | 描述                                                         | 示例值 |
| -------------- | ---------------------- | ------------------------------------------------------------ | ------ |
| createRoomInfo | MsCreateRoomInfo       | 创建房间的信息                                               |        |
| userProfile    | string                 | 玩家简介                                                     | ""     |
| watchSet       | object | 观战服务参数,创建房间时，如果没有设置 watchSet 参数，则默认是不可观战的， watchSet 参数要与MsCreateRoomInfo的canWatch参结合使用，如果没有设置观战参数，再获取房间列表的时候 canWatch参数需要设置0或者2。 |        |

#### MsCreateRoomInfo 的属性

| 属性         | 类型   | 描述                         | 示例值         |
| ------------ | ------ | ---------------------------- | -------------- |
| roomName     | string | 房间名称                     | “MatchvsRoom”  |
| maxPlayer    | number | 最大玩家数                   | 3              |
| mode         | number | 模式                         | 1              |
| canWatch     | number | 是否可以观战 1-可以 2-不可以 | 2              |
| visibility   | number | 是否可见默认0不可见 1可见    | 1              |
| roomProperty | string | 房间属性                     | “roomProperty” |

#### MVS.MsWatchSet

| 属性       | 类型   | 描述                 | 示例值          |
| ---------- | ------ | -------------------- | --------------- |
| cacheMS    | number | 缓存多久的数据       | 6*1000（6分钟） |
| maxWatch   | number | 最大人数             | 3               |
| delayMS    | number | 观看延迟多久后的数据 | 2000            |
| persistent | number | 是否持久缓存         | false           |

#### 返回值

| 错误码 | 含义                          |
| ------ | ----------------------------- |
| 0      | 成功                          |
| -1     | 失败                          |
| -2     | 未初始化                      |
| -3     | 正在初始化                    |
| -4     | 未登录                        |
| -7     | 正在创建或者进入房间          |
| -8     | 已在房间                      |
| -21    | userProfile 过长，不能超过512 |

### createRoomResponse

```typescript
response.createRoomResponse(rsp:MsCreateRoomRsp);
```

#### MsCreateRoomRsp 属性

| 参数   | 类型   | 描述                                                         | 示例值   |
| ------ | ------ | ------------------------------------------------------------ | -------- |
| status | number | 状态返回，200表示成功 ；400 客户端参数错误 ；500 服务器内部错误 | 200      |
| roomID | string | 房间号                                                       | "210039" |
| owner  | number | 房主                                                         | 210000   |

#### joinRoom

客户端可以通过调用该接口加入指定房间，roomID为加入指定房间的房间号，指定房间号必须是由 createRoom接口创建的房间。

```typescript
engine.joinRoom(roomID:string,userProfile:string):number
```

#### 参数

| 参数        | 类型   | 描述     | 示例值    |
| ----------- | ------ | -------- | --------- |
| roomID      | string | 房间号   | "1344333" |
| userProfile | string | 玩家简介 | ""        |

#### 返回值

- 同 joinRandomRoom

| 错误码 | 含义                                |
| ------ | ----------------------------------- |
| 0      | 成功                                |
| -1     | 失败                                |
| -2     | 未初始化                            |
| -3     | 正在初始化                          |
| -4     | 未登录                              |
| -7     | 正在创建或者进入房间                |
| -8     | 已经在房间中                        |
| -21    | userProfile 过长，不能超过512个字符 |

### joinRoomResponse

```typescript
response.joinRoomResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo);
```

#### 参数

| 参数             | 类型                  | 描述                            | 示例值 |
| ---------------- | --------------------- | ------------------------------- | ------ |
| status           | number                | 状态返回，200表示成功 ；400 客户端参数错误 ；404 指定房间不存在 ；405 房间已满 ；406 房间已joinOver ；500 服务器内部错误       | 200    |
| roomUserInfoList | Array | 房间内玩家信息列表              |        |
| roomInfo         | MsRoomInfo            | 房间信息构成的对象              |        |

#### MsRoomUserInfo 的属性

| 属性        | 类型   | 描述     | 示例值 |
| ----------- | ------ | -------- | ------ |
| userID      | number | 用户ID   | 32322  |
| userProfile | string | 玩家简介 | ""     |

#### MsRoomInfo 的属性	

| 属性         | 类型   | 描述               | 示例值 |
| ------------ | ------ | ------------------ | ------ |
| roomID       | string | 房间号             | 238211 |
| roomProperty | string | 房间属性           | ""     |
| owner        | number | 房间创建者的用户ID | 0      |

- 如果本房间是某个玩家调用joinRandomRoom随机加入房间时创建的，那么roomInfo中的owner为服务器随机指定的房主ID。在调用engine.createRoom主动创建房间时owner为创建房间者（即房主）的ID。以上两种情况下，如果房主离开房间，服务器均会指定下一个房主，并通过`leaveRoomNotify`通知房间其他成员。
- roomUserInfoList 用户信息列表是本玩家加入房间前的玩家信息列表，不包含本玩家。
- roomUserInfoList中的玩家的userProfile的值来自于其他客户端调用joinRandomRoom时传递的userProfile的值。

### joinRoomNotify

```typescript
response.joinRoomNotify(roomUserInfo:MsRoomUserInfo);
```

#### 参数 

| 参数         | 类型           | 描述                 | 示例值 |
| ------------ | -------------- | -------------------- | ------ |
| roomUserInfo | MsRoomUserInfo | 房间新加的用户的信息 |        |

- 某个玩家加入房间之后，如果该房间后来又有其他玩家加入，那么将会收到回调通知，response.joinRoomNotify方法会被SDK调用，调用时传入的roomUserInfo是新加入的其他玩家的信息，不是本玩家的信息。
- roomUserInfo的属性与response.joinRoomResponse中的[roomUserInfoList中的元素包含的属性](../APIDoc/JavaScript#roomUserInfo)相同。

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

#### 参数

| 参数    | 类型   | 描述     | 示例值 |
| ------- | ------ | -------- | ------ |
| cpProto | string | 负载信息 | ""     |

#### 返回值

| 错误码 | 含义                            |
| ------ | ------------------------------- |
| 0      | 成功                            |
| -1     | 失败                            |
| -2     | 未初始化                        |
| -3     | 正在初始化                      |
| -4     | 未登录                          |
| -7     | 正在创建或者进入房间            |
| -6     | 不在房间                        |
| -21    | cpProto过长，不能超过 1024 字符 |

### joinOverResponse

客户端调用engine.joinOver发送关闭房间的指令之后，SDK异步调用reponse.joinOverResponse方法告诉客户端joinOver指令的处理结果。

```typescript
response.joinOverResponse(rsp:MsJoinOverRsp);
```

#### MsJoinOverRsp的属性

| 属性    | 类型   | 描述                            | 示例值 |
| ------- | ------ | ------------------------------- | ------ |
| status  | number | 状态返回，200表示成功；400 客户端参数错误 ；404 用户或房间不存在；403 该用户不在房间 ；500 服务器内部错误 | 200    |
| cpProto | string | 负载信息                        |        |

### joinOverNotify

当有人调用了 joinOver 接口，同一房间的其他用户就会收到这个 回调信息。

```typescript
response.joinOverNotify(notifyInfo:MsJoinOverNotifyInfo);
```

#### 参数 MsJoinOverNotifyInfo 的属性 

| 属性      | 类型   | 描述               | 示例值 |
| --------- | ------ | ------------------ | ------ |
| roomID    | string | 房间ID             |        |
| srcUserID | number | 发起关闭房间玩家ID |        |
| cpProto   | string | 负载信息           |        |

### 示例代码

````typescript
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
````



## 离开房间

客户端调用该接口通知服务端该客户端对应的用户要离开房间。当所有玩家离开房间后，房间会被自动销毁。

- 请求接口：leaveRoom
- 返回接口：
  - leaveRoomResponse：自己离开房间回调
  - leaveRoomNotify:  其他玩家离开房间回调

### leaveRoom

```typescript
engine.leaveRoom(cpProto:string):number
```

#### 参数

| 参数    | 类型   | 描述     | 示例值 |
| ------- | ------ | -------- | ------ |
| cpProto | string | 负载信息 | ""     |

#### 返回值

| 错误码 | 含义                           |
| ------ | ------------------------------ |
| 0      | 成功                           |
| -1     | 失败                           |
| -2     | 未初始化                       |
| -3     | 正在初始化                     |
| -4     | 未登录                         |
| -7     | 正在创建或者进入房间           |
| -21    | userProfile 过长，不能超过1024 |

### leaveRoomResponse

客户端调用engine.leaveRoom发送关闭房间的指令之后，SDK异步调用reponse.leaveRoomResponse方法告诉客户端leaveRoom指令的处理结果。

```typescript
response.leaveRoomResponse(rsp:MsLeaveRoomRsp);
```

#### 参数MsLeaveRoomRsp的属性

| 属性    | 类型   | 描述                                                         | 示例值 |
| ------- | ------ | ------------------------------------------------------------ | ------ |
| status  | number | 状态返回，200表示成功；400 客户端参数错误 ；404 房间不存在 ；500 服务器内部错误 | 200    |
| roomID  | string | 房间号                                                       | 317288 |
| userID  | number | 用户ID                                                       | 317288 |
| cpProto | string | 负载信息                                                     |        |

### leaveRoomNotify

当同房间中的其他玩家调用leaveRoom发送离开房间的指令之后，本客户端将会收到回调通知，response.leaveRoomNotify方法会被SDK调用，调用时传入的roomUserInfo是离开房间的玩家的信息。

```typescript
response.leaveRoomNotify(leaveRoomInfo:MsLeaveRoomNotify);
```

#### 参数 MsLeaveRoomNotify 属性

| 参数    | 类型   | 描述                     | 示例值 |
| ------- | ------ | ------------------------ | ------ |
| userID  | number | 房间号                   | 200    |
| roomID  | string | 刚刚离开房间的用户的信息 |        |
| owner   | number | 房主                     |        |
| cpProto | string | 附加信息                 |        |

- roomUserInfo 的属性与response.joinRoomResponse中的[roomUserInfoList中的元素包含的属性](../APIDoc/JavaScript#roomUserInfo)相同。

### 示例代码

````typescript
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
````



## 获取房间列表

调用`createRoom`创建房间可以使用 `getRoomList` 或者 `getRoomListEx` 接口获取房间列表，由系统创建的房间是不能被获取的。`getRoomList`  接口参数要简单一些，对应的 `getRoomListResponse` 回调信息也少很多。 `getRoomListEx` 接口请求返回的信息要多一些，支持房间信息排序等功能。

- 请求接口：getRoomList，getRoomListEx

- 回调接口：getRoomListResponse , getRoomListExResponse

### getRoomList

获取主动创建房间的列表信息，简单版。

```typescript
engine.getRoomList(filter:MsRoomFilter):number
```

#### MsRoomFilter 的属性

| 参数         | 类型   | 描述                         | 示例值                        |
| ------------ | ------ | ---------------------------- | ----------------------------- |
| maxPlayer    | number | 最大玩家数                   | maxPlayer:3;mode:0;canWatch:0 |
| mode         | number | 模式                         | 0                             |
| canWatch     | number | 是否可以观战 1-可以 2-不可以 | 2                             |
| roomProperty | string | 房间属性                     | “roomProperty”                |

#### 返回值

| 错误码 | 含义                            |
| ------ | ------------------------------- |
| 0      | 成功                            |
| -1     | 失败                            |
| -2     | 未初始化                        |
| -3     | 正在初始化                      |
| -4     | 未登录                          |
| -7     | 正在创建或者进入房间            |
| -8     | 已在房间                        |
| -21    | filter 过长，总字节不能超过1024 |

### getRoomListResponse

```
response.getRoomListResponse(status:number, roomInfos:Array<MsRoomInfoEx>);
```

#### 参数

| 参数      | 类型                | 描述                            | 示例值 |
| --------- | ------------------- | ------------------------------- | ------ |
| status    | number              |状态返回，200表示成功；500 服务器内部错误 | 200    |
| roomInfos | Array | 房间信息列表                    |        |

#### MsRoomInfoEx 的属性

| 属性         | 类型   | 描述                         | 示例值         |
| ------------ | ------ | ---------------------------- | -------------- |
| roomID       | string | 房间ID                       | "123456786"    |
| roomName     | string | 房间名称                     | “matchvsRoom”  |
| maxPlayer    | number | 最大人数                     | 3              |
| mode         | number | 模式                         | 0              |
| canWatch     | number | 是否可以观战 1-可以 2-不可以 | 2              |
| roomProperty | string | 房间属性                     | “roomProperty” |
|              |        |                              |                |

### getRoomListEx

获取房间列表信息扩展版，可获得更多的房间信息。

```typescript
engine.getRoomListEx(filter:MsRoomFilterEx);
```

#### 参数 MsRoomFilterEx 属性

| 参数          | 类型   | 描述                                                      | 示例值         |
| ------------- | ------ | --------------------------------------------------------- | -------------- |
| maxPlayer     | number | 房间最大人数 (0-全部)                                     | 3              |
| mode          | number | 模式（0-全部）*创建房间时，mode最好不要填0                | 2              |
| canWatch      | number | 是否可以观战（0-全部 1-可以 2-不可以）                    | 1              |
| roomProperty  | string | 房间属性                                                  | “roomProperty” |
| full          | number | 0-全部 1-满 2-未满                                        | 0              |
| state         | number | 0-全部 1-开放 2-关闭                                      | 0              |
| sort          | number | 0-不排序 1-创建时间排序 2-玩家数量排序 3-状态排序         | 0              |
| order         | number | 0-ASC  1-DESC                                             | 0              |
| pageNo        | number | 页码                                                      | 0              |
| pageSize      | number | 每一页的数量                                              | 10             |
| getSystemRoom | number | 是否获取系统创建的房间,0玩家创建,1系统创建,2玩家+系统创建 | 2              |

#### 返回值

| 错误码 | 含义                            |
| ------ | ------------------------------- |
| 0      | 成功                            |
| -1     | 失败                            |
| -2     | 未初始化                        |
| -3     | 正在初始化                      |
| -4     | 未登录                          |
| -7     | 正在创建或者进入房间            |
| -21    | filter 过长，总字节不能超过1024 |

获取房间列表参数必须和 `createRoom` 接口创建的房间参数一致而且 `createRoom` 中的参数 `visibility`  必须设置为1(可见)。比如：`createRoom` 参数结构 如下：

```typescript
var createRoomInfo = new MsCreateRoomInfo("Matchvs",3, 0, 0, 1, "mapA")
```

那么getRoomList 参数结构应该如下：

```typescript
var filter = new MsRoomFilterEx(
	    createRoomInfo.maxPlayer, 		//maxPlayer
        createRoomInfo.mode,		    //mode
        createRoomInfo.canWatch,		//canWatch
        createRoomInfo.roomProperty,    //roomProperty
        0, 	//full 0-未满
        1,  //state 0-全部，1-开放 2-关闭
        0,  //sort 0-不排序 1-创建时间排序 2-玩家数量排序 3-状态排序 都可以
        0,  //order 0-ASC  1-DESC 都可以
        0,  //pageNo 从0开始 0为第一页
        3,  //pageSize 每页数量 大于0
        );
```

### getRoomListExResponse

```typescript
response.getRoomListExResponse(rsp:MsGetRoomListExRsp);
```

#### 参数 MsGetRoomListExRsp 的属性

| 参数      | 类型                   | 描述          | 示例值 |
| --------- | ---------------------- | ------------- | ------ |
| status    | number                 | 状态 200 成功 ；500 服务器内部错误 | 200    |
| total     | number                 | 房间总数量    | 2      |
| roomAttrs | Array | 房间信息列表  | []     |

#### 参数 MsRoomAttribute 的属性 

| 参数         | 类型   | 描述                         | 示例值         |
| ------------ | ------ | ---------------------------- | -------------- |
| roomID       | string | 房间号                       | “”             |
| roomName     | string | 房间名称                     | “roomName”     |
| maxPlayer    | number | 最大人数                     | 3              |
| gamePlayer   | number | 游戏人数                     | 2              |
| watchPlayer  | number | 观战人数                     | 1              |
| mode         | number | 模式                         | 0              |
| canWatch     | number | 是否可以观战 1-可以 2-不可以 | 2              |
| roomProperty | string | 房间属性                     | “roomProperty” |
| owner        | number | 房主                         | 326541         |
| state        | number | 房间状态  1-开放 2-关闭      | 1              |
| createTime   | string | 创建时间                     |                |

参数total  与 roomAttrs 列表length 可能会不同，但是 total 会 >= roomAttrs 列表的 length。

### 示例代码

```typescript
class MsEgine {
    ......
    private getRoomListEx():void{
        this.response.getRoomListExResponse = (rsp:MsGetRoomListExRsp)=>{
            if(status == 200){
                //获取成功
            }else{
                //获取失败
            }
        };
        let filter = new MsRoomFilterEx(3, 0, 0, "matchvs", 0, 1, 0, 0, 0, 3);
       	this.engine.getRoomListEx(filter);
    }
}
```



## 获取房间详情

在获取房间列表扩展接口会返回房间一些信息，但是在房间里面后房间信息可能会有变动，或者在显示房间列表后想查看更多信息，可以使用获取房间详情接口。只可获取 createRoom 接口创建的房间。

- 请求接口：getRoomDetail
- 回调接口：getRoomDetailResponse

## getRoomDetail

```typescript
engine.getRoomDetail(roomID:string)
```

#### 参数

| 参数   | 类型   | 描述   | 示例值                 |
| ------ | ------ | ------ | ---------------------- |
| roomID | string | 房间ID | “16323532544156875354” |

#### 返回值

| 错误码 | 含义         |
| ------ | ------------ |
| 0      | 调用成功     |
| -1     | 调用失败     |
| -2     | 未初始化     |
| -4     | 未登陆       |
| -7     | 正在加入房间 |
| -3     | 正在初始化   |


## getRoomDetailResponse

```typescript
response.getRoomDetailResponse(rsp:MsGetRoomDetailRsp);
```

#### 参数 MsGetRoomDetailRsp 的属性

| 参数         | 类型                  | 描述                                                        | 示例值 |
| ------------ | --------------------- | ----------------------------------------------------------- | ------ |
| status       | number                | 接口状态 200 成功 ；404 房间不存在 ；500 服务器内部错误 |        |
| state        | number                | 房间状态 1-开放 2-关闭                                      |        |
| maxPlayer    | number                | 最大人数                                                    |        |
| mode         | number                | 模式                                                        |        |
| canWatch     | number                | 是否可以观战 1-可以 2-不可以                                |        |
| roomProperty | string                | 房间属性                                                    |        |
| owner        | number                | 房主                                                        |        |
| createFlag   | number                | 创建方式 0-未知 1-系统创建 2-玩家创建                       |        |
| userInfos    | Array | 用户列表信息                                                |        |
| watchinfo    | object                | 观战信息                                                    |        |
| brigades     | Array        | 组队列表信息                                                |        |

#### MsRoomUserInfo 的属性

| 属性        | 类型   | 描述     | 示例值 |
| ----------- | ------ | -------- | ------ |
| userID      | number | 用户ID   | 32322  |
| userProfile | string | 玩家简介 | ""     |

#### watchinfo 属性

| 属性       | 类型    | 描述                                         | 示例值 |
| ---------- | ------- | -------------------------------------------- | ------ |
| curWatch   | number  | 房间当前观战者人数                           | 3      |
| persistent | boolean | 观战信息是否持久保存                         | false  |
| maxWatch   | number  | 最大观战人数                                 | 6      |
| delayMS    | number  | 延迟时间，可观看延迟多久的数据（单位毫秒）   | 6000   |
| cacheTime  | number  | 缓存时间，游戏最大能缓存多久的数据(单位毫秒) | 60000  |

#### brigades 属性

| 属性      | 类型          | 描述           | 示例值 |
| --------- | ------------- | -------------- | ------ |
| brigadeID | number        | 大队伍的ID     | 1      |
| teamList  | Array | 小队伍信息列表 |        |

#### teamList 数据项属性

| 属性       | 类型          | 描述       | 示例值                |
| ---------- | ------------- | ---------- | --------------------- |
| teamID     | string        | 小队伍ID号 | 131113213211323121231 |
| capacity   | number        | 小队伍人数 | 5                     |
| mode       | number        | 自定义参数 | 0                     |
| owner      | number        | 队长       | 123456                |
| playerList | Array | 队伍成员   |                       |



## 设置房间属性

创建房间时需要传入房间属性参数，当房间创建好后可以调用 `setRoomProperty` 接口修改房间的属性。比如：房间地图，房间人员的等级要求等等。

- 请求接口：setRoomProperty 
- 回调接口：setRoomPropertyResponse，setRoomPropertyNotify

### setRoomProperty 

```typescript
engine.setRoomProperty(roomID:string, roomProperty:string):number
```

#### 参数

| 参数         | 类型   | 描述             | 示例值               |
| ------------ | ------ | ---------------- | -------------------- |
| roomID       | string | 房间号           | "654354323413134354" |
| roomProperty | string | 要修改的房间属性 | “changeRoomProperty” |

#### 返回值

| 错误码 | 含义                                    |
| ------ | --------------------------------------- |
| 0      | 调用成功                                |
| -1     | 调用失败                                |
| -2     | 未初始化                                |
| -3     | 正在初始化                              |
| -4     | 未登陆                                  |
| -7     | 正在加入房间                            |
| -10    | 正在登出                                |
| -11    | 正在离开房间                            |
| -21    | roomProperty 长度过长，不能超过1023字符 |

### setRoomPropertyResponse

```typescript
response.setRoomPropertyResponse(rsp:MsSetRoomPropertyRspInfo);
```

#### 参数 MsSetRoomPropertyRspInfo 的属性

| 参数         | 类型   | 描述            | 示例值               |
| ------------ | ------ | --------------- | -------------------- |
| status       | number | 状态值，200成功；400 客户端参数错误 ；404 房间不存在 ；500 服务器内部错误| 200                  |
| roomID       | string | 房间号          | "654354323413134354" |
| userID       | number | 玩家            | 123                  |
| roomProperty | string | 修改后的属性值  | “changeRoomProperty” |

### setRoomPropertyNotify

房间有人调用 setRoomProperty 接口，其他人就会收到 setRoomPropertyNotify接口的回调。

```typescript
response.setRoomPropertyNotify(notify:MsRoomPropertyNotifyInfo);
```

#### 参数 MsRoomPropertyNotifyInfo 的属性

| 参数         | 类型   | 描述           | 示例值               |
| ------------ | ------ | -------------- | -------------------- |
| roomID       | string | 房间号         | "654354323413134354" |
| userID       | number | 玩家           | 123                  |
| roomProperty | string | 修改后的属性值 | “changeRoomProperty” |

### 示例代码

```typescript
class MsEngine{
    ......
    private setRoomProperty(roomID){
        this.response.setRoomPropertyResponse = (rsp:MsSetRoomPropertyRspInfo)=>{
            if(rsp.status == 200){
                //设置成功
            }else{
                //设置失败
            }
        }
        this.response.setRoomPropertyNotify = (notify:MsRoomPropertyNotifyInfo)=>{
            //notify.userID 有人修改了房间的属性，属性值为 notify.roomProperty
        }
        
        this.engine.setRoomProperty(roomID,"属性A");
    }
    ......
}
```



## 消息发送

在游戏中，玩家之间相互同步信息，把自己的位置，得分等情况发送给其他玩家，让其他玩家能够同步修改自己的信息。一个房间消息的总传递速率是每秒500次，500次是指房间 **所有人接收和发送的总次数** 。

**注意** 给GameServer发送消息调用sendEventEx()。

- 请求接口：sendEvent、sendEventEx
- 回调接口：sendEventResponse、sendEventNotify、gameServerNotify (gameServer 推送的消息回调)

### sendEvent

```typescript
    /**
     * 发送消息，retuen 值 sequence 与接口回调 sendEventResponse 收到的 sequence 对应
     * 网络消息传递存在延时，不确定 sendEventResponse 是再哪一次 sendEvent 发送的，通过 sequence 确定。
     * @param {string|Uint8Array} data 要发送的数据
     * @param {boolean} isBinary 是否以二进制发送,如果是,data必须是Uint8Array类型
     * @returns {{sequence: number, result: number}}
     */
    sendEvent(data:string|Uint8Array,isBinary?:boolean):any
```



#### 返回值

- 返回值为一个对象，该对象包含以下属性：

| 属性     | 类型   | 描述                                                         | 示例值 |
| -------- | ------ | ------------------------------------------------------------ | ------ |
| result   | number | 错误码，0表示成功，其他表示失败                              | 0      |
| sequence | number | 事件序号，作为事件的唯一标识。客户端发送消息后收到的sendEventResponse 也会收到 sequence 标识，通过此标识来确定这个sendEventResponse 是由哪次sendEvent 发送的。主要用于在游戏中做信息同步的时候，网络传输都有延迟会出现sendEvent与sendEventResponse 收到顺序不同。 | 231212 |

#### result 说明

| 返回码 | 含义                                  |
| ------ | ------------------------------------- |
| 0      | 成功                                  |
| -1     | 失败                                  |
| -2     | 未初始化                              |
| -3     | 正在初始化                            |
| -4     | 未登录                                |
| -7     | 正在创建或者进入房间                  |
| -6     | 未加入房间                            |
| -21    | data 过长, data长度不能超过1024个字符 |

消息会发给房间里**除自己外** 其他所有成员。同一客户端多次调用 `sendEvent` 方法时，每次返回的 `sequence`都是唯一的。但同一房间的不同客户端调用 `sendEven` t时生成的 `sequence` 之间会出现重复。可以发送二进制数据，开发者可以将数据用json、pb等工具先进行序列化，然后将序列化后的数据通过SendEvent的一系列接口发送。

### sendEventEx

 `sendEvent` 是 `sendEventEx` 接口的二次封装，只是 `sendEvent` 接口默认把消息发送给了房间其他人。如果需要把消息发送房间指定人员，或者只想把消息发送给 `gameServer` 那么就需要使用 `sendEventEx` 这个接口。想了解 `gameServer` 查看 [gameServer 文挡](https://doc.matchvs.com/QuickStart/gsQuickStart) 

```typescript
engine.sendEventEx(msgType:number, data:string, destType:number, userIDs:Array <number> ):any
```



> 提示：senEventEx 参数示例说明
>
> //发送给房间中的全部玩家，destType = 1, userIDs = []
> var data = mvs.engine.sendEventEx(0,msg,1,[]);
> ​	console.log("发送信息 result"+ data.result);
> }
> //发送指定玩家 123456，destType = 0, userIDs = [123456]
> var data = mvs.engine.sendEventEx(0,msg,0,[123456]);
> ​	console.log("发送信息 result"+ data.result);
> }
> //发送 排除 123456 玩家，destType = 1, userIDs = []
> var data = mvs.engine.sendEventEx(0,msg, 1,[123456]);
> ​	console.log("发送信息 result"+ data.result);
> }

#### 返回值

- 返回值为一个对象，该对象包含以下属性：

| 属性     | 类型   | 描述                            | 示例值 |
| -------- | ------ | ------------------------------- | ------ |
| result   | number | 错误码，0表示成功，其他表示失败 | 0      |
| sequence | number | 事件序号，作为事件的唯一标识    | 231212 |

#### result 说明

| 返回码 | 含义                                   |
| ------ | -------------------------------------- |
| 0      | 成功                                   |
| -1     | 失败                                   |
| -2     | 未初始化                               |
| -3     | 正在初始化                             |
| -4     | 未登录                                 |
| -7     | 正在创建或者进入房间                   |
| -6     | 未加入房间                             |
| -21    | data 过长， data长度不能超过1024个字符 |
| -23    | msgType 非法                           |
| -24    | desttype 非法                          |

同一客户端多次调用engine.sendEvent方法时，每次返回的sequence都是唯一的。但同一房间的不同客户端调用sendEvent时生成的sequence之间会出现重复。

### sendEventResponse

```typescript
response.sendEventResponse(rsp:MsSendEventRsp);
```

#### MsSendEventRsp 的属性

| 属性     | 类型   | 描述                                                         | 示例值 |
| -------- | ------ | ------------------------------------------------------------ | ------ |
| status   | number | 状态返回，200表示成功；521 gameServer不存在，请检查是否已开启本地调试或在正式环境发布运行gameServer | 200    |
| sequence | number | 事件序号，作为事件的唯一标识，可以参考sendEvent，对这个字段的详细说明 | 231212 |

#### 说明

- 客户端调用engine.sendEvent或engine.sendEventEx 发送消息之后，SDK异步调用reponse.sendEventResponse 方法告诉客户端消息是否发送成功。

### sendEventNotify

```typescript
response.sendEventNotify(eventInfo:MsSendEventNotify);
```

#### MsSendEventNotify的属性

| 参数      | 类型   | 描述                                                         | 示例值  |
| --------- | ------ | ------------------------------------------------------------ | ------- |
| srcUserID | number | 推送方用户ID，表示是谁发的消息                               | 321     |
| cpProto   | string | 消息内容，对应[sendEvent](../APIDoc/JavaScript#sendEvent)中的msg参数 | "hello" |

### gameServerNotify

开发者有使用 gameServer 的时候，如果有gameServer发送消息到客户端就会收到这个回调，回调的 srcUserID 是固定为0。

```typescript
response.gameServerNotify(eventInfo:MsGameServerNotifyInfo);
```

#### 参数 MsGameServerNotifyInfo属性

| 参数      | 类型   | 描述                       | 示例值       |
| --------- | ------ | -------------------------- | ------------ |
| srcUserID | number | gameServer推送时 这个值为0 | 0            |
| cpProto   | string | 推送的消息内容             | “gameServer” |

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
        this.response.gameServerNotify = (eventInfo:MsSendEventNotify)=>{
            //gameServer 推送了消息 eventInfo.cpProto
        };
    }
    public sendEventEx(){
        //这里发给其他用户和 gameServer
        this.engine.sendEventEx(0, data, 2, [123.456.789]);
    }
    ......
}
```



## 玩家断线错误提示

在游戏中如果自己断线了就会收到 errorResponse 的错误码为1001的消息，如果是其他玩家掉线了就会收到 networkStateNotify 的回调消息。通过这个接口就可以知道其他玩家的网络状态啦。断线后会有20秒内还可以调用 reconnect 接口重新连接进入房间。

> 注意：不要在 errorResponse 接口内直接调用 reconnect 接口，不然会出现死循环问题。

### errorResponse

在调用Matchvs SDK 所有接口是，如果服务有异常就会触发 errorResponse 接口。通过错误码判断是属于哪一个类型的错误，比如 1001 是网络错误。

```typescript
response.errorResponse(errCode:number, errMsg:string)
```

#### 参数 

| 参数    | 类型   | 描述     | 示例值   |
| ------- | ------ | -------- | -------- |
| errCode | number | 错误码   | 1001     |
| errMsg  | string | 错误描述 | 网络错误 |

### networkStateNotify

其他用户断线了会触发 networkStateNotify 接口。根据接口参数 state 判断其他玩家当前的状态。

```typescript
response.networkStateNotify(netnotify:MsNetworkStateNotify);
```

#### 参数 MsNetworkStateNotify 的属性

| 参数   | 类型   | 描述                                                         | 示例值 |
| ------ | ------ | ------------------------------------------------------------ | ------ |
| roomID | string | 房间ID                                                       |        |
| userID | number | 断开网络的玩家ID                                             |        |
| state  | number | 网络断开状态1-网络异常，正在重连  2-重连成功 3-重连失败，退出房间 |        |
| owner  | number | 房主ID                                                       |        |

### 示例代码

```typescript
class MsEngine{
    ......
    public constructor(){
        this.response.networkStateNotify = ( netnotify:MsNetworkStateNotify )=>{
            if(state == 1){
                //netnotify.userID 用户掉线
            }else if(state == 2){
                //netnotify.userID 用户重新登录了游戏，但是还没有重连进房间
            }else{
                //netnotify.userID 用户已经退出房间了
            }
        };
        
        this.response.errorResponse = (errCode:number, errMsg:string)=>{
            //发生错误 errCode + errMsg
        };
    }
}
```



## 踢除玩家

在房间没有关闭状态下，在房间中的任何人都可以把其他人踢出房间。参数 userID 可以是房间内任意一个，自己也可以剔除自己。主要剔除方式由开发者自己制定。

- 请求接口：kickPlayer
- 回调接口：kickPlayerResponse

### kickPlayer

```typescript
engine.kickPlayer(userID:number, cpProto:string);
```

#### 参数

| 参数    | 类型   | 描述         | 示例值 |
| ------- | ------ | ------------ | ------ |
| userID  | number | 被踢除玩家ID | 655444 |
| cpProto | string | 附加消息     | “kick” |

#### 返回值

| 错误码 | 含义                          |
| :----- | ----------------------------- |
| 0      | 成功                          |
| -1     | 失败                          |
| -2     | 未初始化                      |
| -3     | 正在初始化                    |
| -4     | 未登录                        |
| -7     | 正在创建或者进入房间          |
| -6     | 未加入房间                    |
| -21    | data 过长，不能超过1024个字符 |

### kickPlayerResponse

```typescript
response.kickPlayerResponse(rsp:MsKickPlayerRsp);
```

#### 参数 MsKickPlayerRsp 的属性

| 参数   | 类型   | 描述              | 示例值 |
| ------ | ------ | ----------------- | ------ |
| status | number | 接口状态 200 成功 ；  400 客户端参数错误 ；404 用户或房间不存在  |        |
| owner  | nunber | 房主ID            |        |
| userID | number | 被踢玩家ID        |        |

### kickPlayerNotify

```typescript
response.kickPlayerNotify(knotify:MsKickPlayerNotify)
```

#### 参数 MsKickPlayerNotify 的属性

| 参数      | 类型   | 描述           | 示例值 |
| --------- | ------ | -------------- | ------ |
| userID    | number | 被踢玩家ID     |        |
| srcUserID | number | 发起踢人玩家ID |        |
| cpProto   | string | 附加消息       |        |
| owner     | number | 房主ID         |        |

### 示例代码

````typescript
class MsEngine{
    ......
    public constructor(){
        this.response.kickPlayerResponse = ( rsp:MsKickPlayerRsp )=>{
            if(rsp.status == 200){
                //rsp.userID 用户被踢掉
            }else{
                //用户踢除失败
            }
        };
        
        this.response.kickPlayerNotify = (knotify:MsKickPlayerNotify)=>{
            //srcUserID 把userID 踢掉了
        };
    }

    public kickPlayer(){
        this.engine.kickPlayer(123,"不想和你一起玩")
    }
}
````



## 分组订阅

分组订阅功能就是群组功能，使用 subscribeEventGroup 接口加入订阅组 。一个玩家可以订阅多个分组。

- 请求接口：subscribeEventGroup
- 回调接口：subscribeEventGroupResponse

### subscribeEventGroup

```typescript
engine.subscribeEventGroup(confirms:Array<string>, cancles:Array<string>):number
```

#### 参数

| 参数     | 类型          | 描述             | 示例值                 |
| -------- | ------------- | ---------------- | ---------------------- |
| confirms | Array | 要订阅的组名     | ["1344333","matchvs1"] |
| cancles  | Array | 要取消订阅的组名 | ["matchvs","4654"]     |

#### 返回值

| 错误码 | 含义                           |
| ------ | ------------------------------ |
| 0      | 成功                           |
| -1     | 失败                           |
| -2     | 未初始化                       |
| -3     | 正在初始化                     |
| -4     | 未登录                         |
| -7     | 正在创建或者进入房间           |
| -6     | 未加入房间                     |
| -20    | confirms 和 cancles 不能都为空 |

### subscribeEventGroupResponse

```typescript
response.subscribeEventGroupResponse(status:number, groups:Array<string>);
```

#### 参数

| 参数   | 类型          | 描述                      | 示例值      |
| ------ | ------------- | ------------------------- | ----------- |
| status | number        | 状态值：成功200，其他失败 | 200         |
| groups | Array | 订阅的组                  | ["MatchVS"] |

### 示例代码

```typescript
class MsEngine{
    ......
    public constructor(){
        this.response.subscribeEventGroupResponse = ( status:number, groups:Array <string> )=>{
            if(status == 200){
                //订阅成功
            }else{
                //订阅失败
            }
        };
    }

    public subscribeEventGroup(){
        this.engine.subscribeEventGroup(["MatchVS"],[]);
    }
}
```



## 分组订阅消息发送

加入同一个组的玩家是可以相互广播消息，其他没有加入该组的玩家是收不到组消息的。发送组消息使用 sendEventGroup 接口。消息分组发送可以根据 groups 参数发送多个分组。

- 请求接口：sendEventGroup
- 回调接口：sendEventGroupResponse

### sendEventGroup

```typescript
engine.sendEventGroup(groups:Array<string>, data:string):number
```

#### 参数

| 参数   | 类型          | 描述       | 示例值          |
| ------ | ------------- | ---------- | --------------- |
| data   | string        | 发送的数据 | “hello matchvs” |
| groups | Array | 发送的分组 | ["MatchVS"]     |

#### 返回值

| 错误码 | 含义                 |
| ------ | -------------------- |
| 0      | 成功                 |
| -1     | 失败                 |
| -2     | 未初始化             |
| -3     | 正在初始化           |
| -4     | 未登录               |
| -7     | 正在创建或者进入房间 |
| -6     | 未加入房间           |
| -20    | groups 不能都为空    |
| -21    | data 过长（1K）      |

### sendEventGroupResponse

调用 sendEventGroup 接口发送消息成功会收到sendEventGroupResponse的回调。dstNum表示这个分组消息会有多少个人收到。

```typescript
response.sendEventGroupResponse(status:number);
```

#### 参数

| 参数   | 类型   | 描述                     | 示例值 |
| ------ | ------ | ------------------------ | ------ |
| status | number | 状态值 200成功，其他失败 | 200    |
| dstNum | number | 将被发送给多少个客户端   | 3      |

### sendEventGroupNotify

多个用户在同一个分组时，有一个用户发送消息，那么其他用户就会收到 sendEventGroupNotify 的异步回调。

```typescript
response.sendEventGroupNotify(srcUid:number, groups:Array<string>, cpProto:string);
```

#### 参数

| 参数      | 类型          | 描述         | 示例值      |
| --------- | ------------- | ------------ | ----------- |
| srcUserID | number        | 消息来源用户 | 277773      |
| groups    | Array | 消息来源分组 | ["MatchVS"] |
| cpProto   | string        | 负载消息     | "test"      |

### 示例代码

```typescript
class MsEngine{
    ......
    public constructor(){
        this.response.sendEventGroupResponse = ( status:number)=>{
            if(status == 200){
                //成功
            }else{
                //失败
            }
        };
        this.response.sendEventGroupNotify = (srcUserID:number, groups:Array<string>, cpProto:string)=>{
            //有人发送组消息
        };
    }

    public sendEventGroup(){
        this.engine.sendEventGroup(["MatchVS"], "hello matchvs");
    }
}
```



## 帧同步

Matchvs提供了帧同步的功能，开发者可以让房间内的玩家保持帧同步。 Matchvs 所提供的帧同步能力，让您可以根据游戏需要，直接设置同步帧率，比如10帧每秒，然后您可以调用发送帧同步数据的接口来发送逻辑帧数据。 Matchvs 会缓存每100毫秒的数据，将这100毫秒的数据作为一帧发给各个客户端。

- 请求设置帧同步：setFrameSync
- 帧同步设置回调：setFrameSyncResponse
- 设置帧同步异步回调：setFrameSyncNotify
- 发送帧同步请求：sendFrameEvent
- 发送帧同步回调：sendFrameEventResponse
- 帧数据更新回调：frameUpdate

### setFrameSync

设置帧同步速率，发送帧同步消息之前一定要先设置帧同步。帧同步最大值为20。也就是 50ms 发送一次数据。

```typescript
engine.setFrameSync(frameRate:number，enableGS?:number, other?:any ):number
```

#### 参数

| 参数      | 类型   | 描述                                                         | 示例值               |
| --------- | ------ | ------------------------------------------------------------ | -------------------- |
| frameRate | number | 帧率: 0关闭。其他值表示帧率                                  | 10                   |
| enableGS  | number | 是否启用gameServer帧同步 0-启用 1-不启用                     | 0                    |
| other     | object | 其他数，目前包含一个值：cacheFrameMS断线后缓存帧数据的时间，只有帧同步有效，单位毫秒，最多有效一个小时 | {cacheFrameMS:10000} |

#### 返回值

| 错误码 | 含义                             |
| ------ | -------------------------------- |
| 0      | 成功                             |
| -1     | 失败                             |
| -2     | 未初始化                         |
| -3     | 正在初始化                       |
| -4     | 未登录                           |
| -7     | 正在创建或者进入房间             |
| -6     | 未加入房间                       |
| -20    | frameRate 不能超过 20，不能小于0 |

setFrameSync 设置帧率，参数值设置 0表示关闭，参数值大于0表示打开，不调用为关闭。帧率须能被1000整除

### setFrameSyncResponse

```typescript
response.setFrameSyncResponse(rsp:MsSetChannelFrameSyncRsp);
```

#### 参数 MsSetChannelFrameSyncRsp的属性

| 参数   | 类型   | 描述                                                       | 示例值 |
| ------ | ------ | ---------------------------------------------------------- | ------ |
| status | number | 状态：200 成功；519 重复设置；500 帧率需被1000整除 | 200    |

### setFrameSyncNotify

设置帧同步异步回调同时会回调给自己。可能是gameServer 设置的帧同步，也可以是玩家设置的帧同步。

```typescript
response.setFrameSyncNotify(rsp:MVS.MsSetFrameSyncNotify);
```

#### 参数 MsSetFrameSyncNotify属性

| 参数         | 类型   | 描述                                                         | 示例值 |
| ------------ | ------ | ------------------------------------------------------------ | ------ |
| frameRate    | number | 帧率                                                         | 10     |
| startIndex   | number | 序号                                                         | 1      |
| timestamp    | string | 时间戳                                                       |        |
| enableGS     | number | 是否启用gameServer帧同步 0-启用 1-不启用                     | 0      |
| cacheFrameMS | number | 断线后缓存帧数据的时间，只有帧同步有效，单位毫秒，最多有效一个小时 | 10000  |



### sendFrameEvent

发送帧同步数据，调用 sendFrameEvent 接口之前一定要先设置帧率。

```typescript
    /**
     * 发送帧同步消息
     * @param {string|Uint8Array} cpProto
     * @param {MVS.FrameOpt} op  0-只发送客户端 1-只发送GS 2-客户端和GS
     * @param {boolean} isBinary 是否以二进制发送,如果是,cpProto必须是Uint8Array类型
     * @returns {number}
     */
    sendFrameEvent(cpProto:string|Uint8Array, op?:number, isBinray?:boolean):number
```

#### 返回值

| 错误码 | 含义                           |
| ------ | ------------------------------ |
| 0      | 成功                           |
| -1     | 失败                           |
| -2     | 未初始化                       |
| -3     | 正在初始化                     |
| -4     | 未登录                         |
| -7     | 正在创建或者进入房间           |
| -6     | 未加入房间                     |
| -21    | cpProto 过长，不能超过1024字符 |

### sendFrameEventResponse

帧消息发送回调，用来检测帧消息是否发送成功。

```typescript
response.sendFrameEventResponse(rsp:MsSendFrameEventRsp);
```

#### MsSendFrameEventRsp 的属性

| 参数   | 类型   | 描述           | 示例值 |
| ------ | ------ | -------------- | ------ |
| status | number | 状态值 200成功 | 200    |

### frameUpdate

帧消息下发，根据设置的帧率来下发玩家发送的帧消息，比如设置的帧率为10(100ms/次) ，那么frameUpdate接口会 100ms 触发一次，把在这段时间缓存的所有数据一次性下发（包括自己发送的帧消息）。

```typescript
response.frameUpdate(data:MsFrameData);
```

#### 参数 MsFrameData 的属性

| 参数           | 类型               | 描述                     | 示例值 |
| -------------- | ------------------ | ------------------------ | ------ |
| frameIndex     | number             | 帧序号                   |        |
| frameItems     | Array | 同步帧内的数据包数组     |        |
| frameWaitCount | number             | 同步帧内的数据包数组数量 |        |

#### MsFrameItem 的属性

| 参数      | 类型   | 描述     | 示例值 |
| --------- | ------ | -------- | ------ |
| srcUserID | number | 用户ID   |        |
| cpProto   | string | 附加消息 |        |
| timestamp | string | 时间戳   |        |

### 示例代码

````typescript
class MsEngine{
    ......
    public constructor(){
        this.response.setFrameSyncResponse = ( rsp:MsSetChannelFrameSyncRsp)=>{
            if(rsp.status == 200){
                //设置帧率成功
            }else{
                //设置帧率失败
            }
        };
        this.response.sendFrameEventResponse = (rsp:MsSendFrameEventRsp)=>{
            if(rsp.status == 200){
                //发送帧消息成功
            }else{
                //发送帧消息失败
            }
        };
        this.response.frameUpdate = (data:MsFrameData)=>{
            //收到帧数据，这里处理
        };
    }
    public setFrameSync(){
        this.engine.setFrameSync(10,0, {cacheFrameMS:10000});
    }

    public sendFrameEvent(){
        this.engine.sendFrameEvent("hello matchvs");
    }
}
````



## 断线重连

用户断线后可以调用次接口进行重连，重连具体教程可以参考 [断线重连详细文档](../Advanced/reconnect) 。

- 请求重连接口：reconnect, setReconnectTimeout，getOffLineDataResponse
- 重连回调接口：reconnectResponse, setReconnectTimeoutResponse，getOffLineDataResponse

### reconnect

- 用户在中途断线后服务器会默认保存用户20秒在房间状态，20秒内用户可以重新登录连接到原来的房间里面。
- 在游戏里面如果网络断开，可以调用 reconnect 函数重新连接，断线重新连接分为两种情况，第一种没有重新启动程序：在游戏进行时网络断开，直接调用 reconnect 重新连接到游戏。第二种重新加载程序：先调用login 然后判断 loginResponse 中的参数 roomID 是否为0 如果不为 0 就调用reconnect 重连到房间
- reconnect 接口调用，其他玩家收到 netWorkStateNotify 接口信息，接口详情请看netWorkStateNotify的接口说明。

```typescript
engine.reconnect():number;
```

#### 参数

无

#### 返回值

| 错误码 | 含义     |
| ------ | -------- |
| 0      | 成功     |
| -1     | 其他错误 |
| -2     | 未初始化 |
| -9     | 正在重连 |

### reconnectResponse

```typescript
response.reconnectResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo);
```

#### 参数

| 参数             | 类型                  | 描述                                                         | 示例值 |
| ---------------- | --------------------- | ------------------------------------------------------------ | ------ |
| status           | number                | 状态返回，200表示成功， 201-重连房间失败但是处于登录状态，其他失败 | 200    |
| roomUserInfoList | Array | 房间内玩家信息列表                                           |        |
| roomInfo         | MsRoomInfo            | 房间信息构成的对象                                           |        |

#### MsRoomUserInfo 的属性

| 属性        | 类型   | 描述     | 示例值 |
| ----------- | ------ | -------- | ------ |
| userID      | number | 用户ID   | 32322  |
| userProfile | string | 玩家简介 | ""     |

#### MsRoomInfo 的属性

| 属性         | 类型   | 描述               | 示例值 |
| ------------ | ------ | ------------------ | ------ |
| roomID       | string | 房间号             | 238211 |
| roomProperty | string | 房间属性           | ""     |
| owner        | number | 房间创建者的用户ID | 0      |

### setReconnectTimeout

用户进入房间后默认断线20秒会被剔除，在用户加入房间之前调用这个接口，服务就会从新设置断线重连时间，设置范围为 `-1到600 秒` 如果设置的值为-1, 则在用户断开就马上被踢出房间;设置为0则20秒后踢出。

```typescript
setReconnectTimeout(timeout:number):number
```

#### 参数

| 参数    | 类型   | 描述             | 示例值 |
| ------- | ------ | ---------------- | ------ |
| timeout | number | 断线重连超时时间 | 60     |

#### 返回值

| 返回码 | 说明                                |
| ------ | ----------------------------------- |
| 0      | 接口调用成功                        |
| -2     | 未初始化                            |
| -3     | 正在初始化                          |
| -4     | 未登录                              |
| -5     | 正在登录                            |
| -7     | 正在创建房间，或者正在加入游戏房间  |
| -6     | 没有进入房间                        |
| -10    | 正在离开房间                        |
| -11    | 正在登出                            |
| -12    | 正在加入观战房间                    |
| -27    | timeout 超出范围  0=< timeout <=600 |
| -30    | 设置的 rType 值与当前模式冲突。     |


### setReconnectTimeoutResponse

设置重连时间回调

```typescript
response.setReconnectTimeoutResponse(status:number):void
```

#### 参数

| 参数   | 类型   | 描述                | 示例值 |
| ------ | ------ | ------------------- | ------ |
| status | number | 状态值 200 设置成功 | 200    |

## getOffLineData

获取断线期间的帧数据，只有在开启了帧同步的时候使用，调用这个接口后，在断线期间游戏的数据会通过 frameUpdate 接口返回指定时间内的数据。
```typescript
engine.getOffLineData(cacheFrameMS:number)
```

#### 参数

| 参数         | 类型   | 描述                                                         | 示例值 |
| ------------ | ------ | ------------------------------------------------------------ | ------ |
| cacheFrameMS | number | 获取断线多久之内的缓存数据，上限为1个小时与setFrameSync 接口中的参数同步最好，cacheFrameMS 为-1 代表获取缓存这个房间里面所有的缓存帧数据，同时 setFrameSync 接口也要设置为 -1 | 10000  |

#### 返回码

- 略 可参考其他接口的返回码。

## getOffLineDataResponse

调用 getOffLineData 接口获取断线期间的帧数据，这个接口会返回是否调用成功通知和，缓存的帧数据数量。

```javascript
response.getOffLineDataResponse(rsp)
```

#### 参数 rsp 属性

| 属性       | 类型   | 描述             | 示例值 |
| ---------- | ------ | ---------------- | ------ |
| status     | number | 状态值           | 200    |
| frameCount | number | 当前游戏帧索引号 | 10     |
| msgCount   | number | 消息数量         | 20     |



## 重新打开房间

- 请求接口：joinOpen
- 回调接口：joinOpenNotify、joinOpenResponse

### joinOpen

设置房间重新打开,允许他人匹配加入当前房间, 注意 `在房间的情况才可以调用,否则函数直接返回错误码`

```typescript
	/**
     * 设置允许房间加人
     * @param {number} cpProto
     * @returns {number}
     */
    joinOpen(cpProto:string):number
```
#### 参数

cpProto: 附带信息,会通过joinOpenNotify广播给其他人

#### 返回值

0为正确,其他请参考错误码

### joinOpenNotify&joinOpenResponse

#### 参数

```javascript
//数据结构
declare class MsReopenRoomResponse {
    public status  : number;
    public cpProto : string;
	constructor(status:number, cpProto:string)
}
declare class MsReopenRoomNotify{
    public roomID  : string;
    public userID  : number;
    public cpProto : string;
	constructor(roomID:string,userID:number, cpProto:string)
}

	
 /**
 * 允许房间加人的通知
 * @param {MsReopenRoomNotify} data
 */
joinOpenNotify(data:MsReopenRoomNotify);
	
 /**
 * 设置允许房间加人的结果
 * @param {MsReopenRoomResponse} data
 */
joinOpenResponse(data:MsReopenRoomResponse);
```

#### MsReopenRoomResponse

| 属性    | 类型   | 描述                             | 示例值 |
| ------- | ------ | -------------------------------- | ------ |
| status  | number | 接口调用的服务器返回码,200为正确 | 200    |
| cpProto | string | 调用者附带的信息                 | ""     |

#### MsReopenRoomNotify

| 属性    | 类型   | 描述             | 示例值      |
| ------- | ------ | ---------------- | ----------- |
| roomID  | string | 房间号           | "123123123" |
| cpProto | string | 调用者附带的信息 | ""          |
| userID  | number | 调用者用户ID     | 0           |

#### 示例代码
```javascript
 		var checkbox = new eui.CheckBox();
        checkbox.label = "允许加入";
        checkbox.addEventListener(egret.Event.CHANGE, e => {
            checkbox.label = checkbox.selected ? "允许加入" : "不允许加入";
            checkbox.selected ? GameData.engine.joinOpen("x") : GameData.engine.joinOver("x");
        }, this);
        checkbox.x = 50;
        checkbox.y = 50;
        this.addChild(checkbox);

        GameData.response.joinOpenNotify = function (d) {
            Toast.show(d.userID + " 设置了允许房间加人");
            checkbox.selected = true;
        }
        GameData.response.joinOpenResponse = function (d) {
            Toast.show(" 设置允许房间加人 " + (d.status == 200 ? "success" : "fail"));
            checkbox.selected = ((d.status == 200)?true:checkbox.selected);
        }
        GameData.response.joinOverNotify = function (d) {
            Toast.show(d.srcUserID + " 设置了不允许房间加人");
            checkbox.selected = false;
        }
        GameData.response.joinOverResponse = function (d) {
            Toast.show(" 设置不允许房间加人 " + (d.status == 200 ? "success" : "fail"));
            checkbox.selected = ((d.status == 200)?false:checkbox.selected);
        }
```

## 获取观战房间列表

- 请求接口：getWatchRoomList
- 回调接口：getWatchRoomsResponse

### getWatchRoomList

获取可以观战房间的列表信息。可观战的房间是由 createRoom 接口创建，并且 canWatch 参数配置为可观战模式。

```typescript
engine.getWatchRoomList(filter:MsRoomFilterEx)
```

#### 参数 MsRoomFilterEx

| 参数         | 类型   | 描述                                              | 示例值         |
| ------------ | ------ | ------------------------------------------------- | -------------- |
| maxPlayer    | number | 房间最大人数 (0-全部)                             | 3              |
| mode         | number | 模式（0-全部）*创建房间时，mode最好不要填0        | 0              |
| canWatch     | number | 是否可以观战 0-全部 1-可以 2-不可以               | 1              |
| roomProperty | string | 房间属性                                          | “roomProperty” |
| full         | number | 0-全部 1-满 2-未满                                | 0              |
| state        | number | 0-全部 1-开放 2-关闭                              | 0              |
| sort         | number | 0-不排序 1-创建时间排序 2-玩家数量排序 3-状态排序 | 0              |
| order        | number | 0-ASC  1-DESC                                     | 0              |
| pageNo       | number | 页码，0为第一页                                   | 0              |
| pageSize     | number | 每一页的数量应该大于 0                            | 10             |

#### 返回值

| 返回码 | 说明                               |
| ------ | ---------------------------------- |
| 0      | 接口调用成功                       |
| -2     | 未初始化                           |
| -3     | 正在初始化                         |
| -4     | 未登录                             |
| -5     | 正在登录                           |
| -7     | 正在创建房间，或者正在加入游戏房间 |
| -11    | 正在登出                           |
| -12    | 正在加入观战房间                   |

### getWatchRoomsResponse

获取观战列表房间回调

```typescript
getWatchRoomsResponse(rooms:MsGetRoomListExRsp);
```

#### 参数

| 参数  | 类型               | 说明                     | 示例值 |
| ----- | ------------------ | ------------------------ | ------ |
| rooms | MsGetRoomListExRsp | 获取观战房间列表回调信息 |        |

#### MsGetRoomListExRsp

| 参数      | 类型                   | 说明                                                         | 示例值 |
| --------- | ---------------------- | ------------------------------------------------------------ | ------ |
| status    | number                 | 接口调用状态 200 成功，其他值请看 [错误码说明](https://doc.matchvs.com/APIDoc/erroCode) |        |
| total     | number                 | 房间                                                         |        |
| roomAttrs | Array| 房间信息列信息                                               |        |

MsRoomAttribute 属性可以参考 getRoomListExResponse 接口。

#### 示例代码

```javascript
class MsEngine {
    public GetWatchRooms(){
        this.response.getWatchRoomsResponse = (rooms)=>{
            if(status == 200){
                console.log("当前房间数量："，total);
                roomAttrs.forEach((e)={
                    console.log("房间信息："，JSON.stringify(e));
                });
            }
        }
        
        var filter = new MsRoomFilterEx(3, 0, 1, "roomProperty", 0, 1, 0, 0, 0, 3);
        engine.getWatchRoomList(filter);
    }
}

```

## 加入观战房间

- 请求接口：joinWatchRoom
- 回调接口：joinWatchRoomResponse, joinWatchRoomNotify

### joinWatchRoom

加入观战房间请求接口，观战房间必须是在 getWatchRoomsResponse 接口中获取到的房间。

```typescript
joinWatchRoom(roomID:string, userProfile:string):number
```

#### 参数

| 参数        | 类型   | 说明                                                         | 示例值 |
| ----------- | ------ | ------------------------------------------------------------ | ------ |
| roomID      | string | 有效的房间号 (房间必须是可观战房间)在调用createRoom的时候设置 |        |
| userProfile | string | 附加信息                                                     |        |

#### 返回值

| 返回码 | 说明                               |
| ------ | ---------------------------------- |
| 0      | 接口调用成功                       |
| -2     | 未初始化                           |
| -3     | 正在初始化                         |
| -4     | 未登录                             |
| -5     | 正在登录                           |
| -7     | 正在创建房间，或者正在加入游戏房间 |
| -8     | 已经在(观战)房间                   |
| -10    | 正在离开房间                       |
| -11    | 正在登出                           |
| -12    | 正在加入观战房间                   |
| -14    | 正在观战离开房间                   |

### joinWatchRoomResponse

加入观战房间回调函数，调用 joinWatchRoom 接口后通过这个接口告知加入结果

```typescript
joinWatchRoomResponse(rsp:MVS.MsJoinWatchRoomRsp):void
```

#### 参数

| 参数 | 类型                   | 说明 | 示例值 |
| ---- | ---------------------- | ---- | ------ |
| rsp  | MVS.MsJoinWatchRoomRsp |      |        |

#### MVS.MsJoinWatchRoomRsp

| 参数       | 类型                | 说明                                                         | 示例值 |
| ---------- | ------------------- | ------------------------------------------------------------ | ------ |
| status     | number              | 状态值 200 成功，其他错误值请看 [错误码文档](https://doc.matchvs.com/APIDoc/erroCode) | 200    |
| roomStatus | number              | 当前房间状态                                                 |        |
| reserved   |                     |                                                              |        |
| wathchInfo | MVS.MsLiveWatchInfo | 观战房间信息                                                 |        |
|            |                     |                                                              |        |

#### MVS.MsLiveWatchInfo

| 参数          | 类型               | 说明                                             | 示例值 |
| ------------- | ------------------ | ------------------------------------------------ | ------ |
| roomID        | string             | 房间ID                                           |        |
| startTS       | string             | 游戏开始时间                                     |        |
| delayMS       | number             | 延迟时间（观战延缓的时间，不与游戏当前进度同步） |        |
| cacheMS       | number             | 缓存时间                                         |        |
| maxAudiences  | number             | 最大观战                                         |        |
| curAudiences  | number             | 当前观战                                         |        |
| peakAudiences | number             |                                                  |        |
| lastAudiences | MVS.MsLiveAudience | 观战列表信息                                     |        |

#### MVS.MsLiveAudience

| 参数      | 类型   | 说明         | 示例值  |
| --------- | ------ | ------------ | ------- |
| userID    | number | 用户ID       | 123456  |
| profile   | string | 用户附带消息 | “hello” |
| enterTime | string | 进入时间     |         |

### joinWatchRoomNotify

加入观战房间异步回调

```typescript
joinWatchRoomNotify(user:MsRoomUserInfo):void
```

#### 参数

| 参数 | 类型           | 说明     | 示例值 |
| ---- | -------------- | -------- | ------ |
| user | MsRoomUserInfo | 用户信息 |        |

#### MsRoomUserInfo

| 属性        | 类型   | 描述     | 示例值 |
| ----------- | ------ | -------- | ------ |
| userID      | number | 用户ID   | 32322  |
| userProfile | string | 玩家简介 | ""     |

#### 示例代码

```javascript
class MsEngine{
    public JoinWatch(){
        this.response.joinWatchRoomResponse = (status)=>{
            if(status == 200){
                console.log("加入观战房间成功");
            }
        }
        this.response.joinWatchRoomNotify = (user)=>{
            console.log("用户加入观战：",user.userID);
            console.log("用户加入观战时附带的信息：",user.userProfile);
        }
        
        let resNo = this.engine.joinWatchRoom("12345678900000000", "nickName+avatar");
        if(resNo = 0){
            console.log("OK");
        }
    }
}

```

## 获取观战数据

- 请求接口：setLiveOffset
- 回调接口：setLiveOffsetResponse, liveFrameUpdate

### setLiveOffset

设置观战数据偏移位置，指定从哪里开始播放。

```typescript
setLiveOffset(offsetMS:number):number
```

#### 参数

| 参数     | 类型   | 说明                                                   | 示例值 |
| -------- | ------ | ------------------------------------------------------ | ------ |
| offsetMS | number | 偏移时间，-1 表示从头， 0 表示不追， >0 表示最近多少ms | -1     |

#### 返回值

| 返回码 | 说明                               |
| ------ | ---------------------------------- |
| 0      | 接口调用成功                       |
| -2     | 未初始化                           |
| -3     | 正在初始化                         |
| -4     | 未登录                             |
| -5     | 正在登录                           |
| -7     | 正在创建房间，或者正在加入游戏房间 |
| -6     | 不在观战房间                       |
| -10    | 正在离开房间                       |
| -11    | 正在登出                           |
| -12    | 正在加入观战房间                   |

### setLiveOffsetResponse

设置观战数据偏移位置接口请求回调函数。

```typescript
setLiveOffsetResponse(status:number):void
```

#### 参数

| 参数   | 类型   | 说明                                                         | 示例值 |
| ------ | ------ | ------------------------------------------------------------ | ------ |
| status | number | 200 成功，其他错误值请看 [错误码文档](https://doc.matchvs.com/APIDoc/erroCode) | 200    |

### liveFrameUpdate

设置观战数据偏移值后，在游戏中对战的数据就会通过这个接口根据游戏的帧率返回数据。游戏帧率设置是 setFrameSync 接口。

```typescript
liveFrameUpdate(data:MsFrameData):void
```

#### 参数

| 参数 | 类型        | 说明       | 示例值 |
| ---- | ----------- | ---------- | ------ |
| data | MsFrameData | 游戏帧数据 |        |

#### MsFrameData

| 参数           | 类型               | 描述                     | 示例值 |
| -------------- | ------------------ | ------------------------ | ------ |
| frameIndex     | number             | 帧序号                   |        |
| frameItems     | Array | 同步帧内的数据包数组     |        |
| frameWaitCount | number             | 同步帧内的数据包数组数量 |        |

#### MsFrameItem 的属性

| 参数      | 类型   | 描述     | 示例值 |
| --------- | ------ | -------- | ------ |
| srcUserID | number | 用户ID   |        |
| cpProto   | string | 附加消息 |        |
| timestamp | string | 时间戳   |        |

#### 示例代码

```javascript
class MsEngine{
    public SetLiveOffset(){
        this.response.setLiveOffsetResponse = (status)=>{
            if(status == 200){
                console.log("设置观战数据偏移位置成功");
            }
        }
        
        this.response.liveFrameUpdate = (data)=>{
            var i = 0;
            while ( i < data.frameItems.length){
                console.log("[Rsp]liveFrameUpdate cpProto:"+ data.frameItems[i++].cpProto );
            }
        }
        
        var resNo = this.engine.setLiveOffset(-1);
        if(resNo == 0){
            console.log("OK");
        }
    }
}


```

## 角色游戏与观战切换

- 请求接口：changeRole
- 回调接口：changeRoleResponse

### changeRole

游戏角色与观战者角色的身份转换请求接口。在游戏中，如果需要转换为观战者就需要调用该接口，反之如果观战者需要加入游戏中也要调用此接口。切换角色的时候会 在产生changeRole 回调后，根据不同的模式分别触发 joinRoomResponse 和joinWatchRoomResponse 回调接口。

```typescript
changeRole(userProfile:string, rType:number):number
```

#### 参数

| 参数        | 类型   | 描述                                                         | 示例值 |
| ----------- | ------ | ------------------------------------------------------------ | ------ |
| userProfile | string | 附带消息，默认填空值                                         | ""     |
| rType       | number | 要转换的模式，0-切换到游戏模式，1-切换到观战模式，这是一个可选参数，如果不填该参数，接口会根据你当前处于什么模式自动转换。 | 1      |

#### 返回值

| 返回码 | 说明                               |
| ------ | ---------------------------------- |
| 0      | 接口调用成功                       |
| -2     | 未初始化                           |
| -3     | 正在初始化                         |
| -4     | 未登录                             |
| -5     | 正在登录                           |
| -7     | 正在创建房间，或者正在加入游戏房间 |
| -6     | 没有进入房间                       |
| -10    | 正在离开房间                       |
| -11    | 正在登出                           |
| -12    | 正在加入观战房间                   |
| -30    | 设置的 rType 值与当前模式冲突。    |
| -1     | 其他错误                           |

### changeRoleResponse

切换角色游戏模式与观战模式请求接口回调

```typescript
changeRoleResponse(status:MVS.MsChangeRoleRsp):void
```

#### 参数

| 参数 | 类型                | 描述             | 示例值 |
| ---- | ------------------- | ---------------- | ------ |
| rsp  | MVS.MsChangeRoleRsp | 角色切换回调信息 |        |

#### MVS.MsChangeRoleRsp

| 参数           | 类型   | 描述                                                         | 示例值 |
| -------------- | ------ | ------------------------------------------------------------ | ------ |
| status         | number | 200 成功，其他错误值请看 [错误码文档](https://doc.matchvs.com/APIDoc/erroCode) | 200    |
| targetRoomType | number | 当前的模式 0-游戏模式 1-观战模式                             | 0      |

#### 示例代码

```typescript
class MsEngine{
    pbulic ChangeRole(){
        this.response.changeRoleResponse = (rsp)=>{
            if(rsp.status == 200){
                console.log("成功切换到");
            }
        }
        var resNo = this.engine.changeRole("ChangeRole",1);
        if(resNo == 0){
            console.log("OK");
        }
    }
}

```

## 离开观战房间

- 请求接口：leaveWatchRoom
- 回调接口：leaveWatchRoomResponse

### leaveWatchRoom

离开观战房间请求接口。

```typescript
leaveWatchRoom(cpProto:string):number
```

#### 参数

| 参数    | 类型   | 描述              | 示例值 |
| ------- | ------ | ----------------- | ------ |
| cpProto | string | 附加值默认填 空值 | “”     |

#### 返回值

| 返回码 | 说明                               |
| ------ | ---------------------------------- |
| 0      | 接口调用成功                       |
| -2     | 未初始化                           |
| -3     | 正在初始化                         |
| -4     | 未登录                             |
| -5     | 正在登录                           |
| -7     | 正在创建房间，或者正在加入游戏房间 |
| -10    | 正在离开房间                       |
| -11    | 正在登出                           |
| -12    | 正在加入观战房间                   |

### leaveWatchRoomResponse

离开观战房间回调

```typescript
leaveWatchRoomResponse(status:number):void
```

#### 参数

| 参数   | 类型   | 描述                                                         | 示例值 |
| ------ | ------ | ------------------------------------------------------------ | ------ |
| status | number | 200 成功，其他错误值请看 [错误码文档](https://doc.matchvs.com/APIDoc/erroCode) | 200    |

### leaveWatchRoomNotify

离开观战房间请求异步回调，其他观战者可收到这个回调。

```typescript
leaveWatchRoomNotify(user:MVS.MsExitLiveRoomNotify):void
```

#### 参数

| 参数 | 类型                     | 描述               | 示例值 |
| ---- | ------------------------ | ------------------ | ------ |
| user | MVS.MsExitLiveRoomNotify | 离开房间的用户信息 |        |

#### MVS.MsExitLiveRoomNotify

| 属性        | 类型   | 描述     | 示例值 |
| ----------- | ------ | -------- | ------ |
| userID      | number | 用户ID   | 32322  |
| userProfile | string | 玩家简介 | ""     |

#### 代码示例

```typescript
class MsEngine{
    public LeaveWatchRoom(){
        this.response.leaveWatchRoomNotify = (user)=>{
            console.log("用户离开观战：",user.userID)；
            console.log("用户离开时附带的信息：",user.userProfile)
        }
        
        this.response.leaveWatchRoomResponse = (status)=>{
            if(status == 0){
                console.log("退出观战房间成功");
            }
        }
        
        let resNo = this.engine.leaveWatchRoom("leaveWatchRoom");
        if(resNo == 0){
            console.log("ok");
        }
    }
}
```



## 日志开关

####  MatchvsLog.closeLog()

关闭Matchvs日志输出。

#### MatchvsLog.openLog()

打开Matchvs日志输出。



## 

## CHANGELOG

时间：2018.08.20

版本：v.3.7.4.0

```javascript
1、QQ玩一玩适配
2、新增503、504等错误码描述。
3、新增cocos、egret渠道游戏账号区分。
```

时间：2018.07.13

TSSDK版本：v3.7.3.0+

```
1. 新增 joinRoomResponse 接口参数 state
2. 所有包含userId参数的数据类型都新增了一个userID字段，原来userId也存在，建议使用userID。
```

时间：2018.05.29

TSSDK版本：v1.6.202

```
1. 新增joinOpen 房间重新打开功能
2. 修复微信小游戏真机断线问题
3. 调整微信小游戏适配机制,只需引用matchvs.all.js,不再引用matchvs.all.weixin.js
4. 修复Egret打包H5平台 `找不到 wx define` 的问题
5. 修复uninit后不能后登录的问题
6. 修复被kickPlayer后不能进入房间,返回-8或-10的问题.
7. 代码优化,减少代码体积
```


时间：2018.05.02

TSSDK版本：v1.6.1+

```
1、新增日志控制类型 MatchvsLog,用于打开或者关闭 sdk 的日志输出
```

时间：2018.05.29

TSSDK版本：v1.6.202

```
1. 新增joinOpen 房间重新打开功能
2. 修复微信小游戏真机断线问题
3. 调整微信小游戏适配机制,只需引用matchvs.all.js,不再引用matchvs.all.weixin.js
4. 修复Egret打包H5平台 `找不到 wx define` 的问题
5. 修复uninit后不能后登录的问题
6. 修复被kickPlayer后不能进入房间,返回-8或-10的问题.
7. 代码优化,减少代码体积
```

时间：2018.04.17
TSSDK版本：JSSDK_v1.6.x

```
1、新增断线重连接口 reconnect 和回调接口 reconnectResponse
```

时间：2018.04.13

TSSDK版本：JSSDK_v1.5.X

内容：

```
1、新增 功能接口 setRoomProperty 和回调 setRoomPropertyResponse、setRoomPropertyNotify 。
```

时间：2018.03.30

TSSDK版本：JSSDK_v1.4.x

内容：

```
1、新增 getRoomListEx 和 getRoomListExResponse接口
2、新增 getRoomDetail 和 getRoomDetailResponse接口
3、新增 joinOverNotify 接口
4、优化 kickPlayerResponse 接口，添加参数 被踢者userID
5、添加 netWorkStateNotify 异步回调接口说明
6、添加 gameServerNotify 接收gameServer 推送消息接口
7、优化 .d.ts 文件 中 sendEventGroupNotify 返回参数与 js文件不一致问题。
8、新增接口调用错误码返回
```


