## API 说明

MatchvsSDK 主要是由 MatchvsEngine（接口请求） 类，和 MatchvsResponse（接口回调） 类控制。先new这两个类的对象作为全局使用。例如：

```typescript
let engine = new MatchvsEngine();
let response = new MatchvsResponse();
```

## init

```typescript
engine.init(response: MatchvsResponse, channel: string, platform: string, gameID: string): number
```

#### 参数：

| 参数     | 类型            | 描述                                     | 示例值    |
| -------- | --------------- | ---------------------------------------- | --------- |
| response | MatchvsResponse | 回调类型MatchvsResponse的对象            | response  |
| channel  | string          | 渠道，固定值                             | "Matchvs" |
| platform | string          | 平台，选择测试(alpha)or正式环境(release) | "alpha"   |
| gameID   | number          | 游戏ID，在引擎官网创建游戏给出的ID       | 2001003   |

#### 说明

- response中设置一些回调方法，在执行注册、登录、发送事件等操作对应的方法之后，reponse中的回调函数会被SDK异步调用。
- 在连接至 Matchvs前须对SDK进行初始化操作。此时选择连接测试环境（alpha）还是正式环境（release）。
- 如果游戏属于调试阶段则连接至测试环境，游戏调试完成后即可发布到正式环境运行。  

> **注意** 发布之前须到官网控制台申请“发布上线”，申请通过后在调用init方法时传“release”才会生效，否则将不能使用release环境。

#### 错误码：

| 错误码 | 含义                                                     |
| ------ | -------------------------------------------------------- |
| 0      | 成功                                                     |
| -1     | 失败                                                     |
| -25    | channel 非法，请检查是否正确填写为 “Matchvs”             |
| -26    | platform 非法，请检查是否正确填写为 “alpha” 或 “release” |

## initResponse

```typescript
response.initResponse(status:number);
```

#### 参数

| 参数   | 类型   | 描述                            | 示例值 |
| ------ | ------ | ------------------------------- | ------ |
| status | number | 状态返回，200表示成功，其他失败 | 200    |

#### 说明

- response 是 engine.init 方法中传入的对象，init初始化完成之后，会异步回调initResponse方法

## uninit

```
engine.uninit()
```

#### 说明

SDK反初始化工作

#### 错误码

| 错误码 | 含义 |
| ------ | ---- |
| 0      | 成功 |
| -1     | 失败 |

## registerUser

```
engine.registerUser()
```

#### 返回值

| 错误码 | 含义     |
| ------ | -------- |
| 0      | 成功     |
| -1     | 失败     |
| -2     | 未初始化 |

## registerUserResponse

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

#### 说明

- response是engine.init方法中传入的对象，调用engine.registerUser注册成功之后，response对象的registerUserResponse方法如果存在则会被调用，调用时传入一个封装了用户信息的参数userInfo。
- 注册用户信息，用以获取一个合法的userID，通过此ID可以连接至Matchvs服务器。一个用户只需注册一次。

> 需要注意：调用此接口成功注册用户后，SDK会缓存用户信息。即使再次调用`regist()`会返回相同的UserID,如需重新注册新的用户须调用SDK的 `LocalStore_Clear()` 函数以清除缓存的用户信息。
>
> 如果需要同时调试多个客户端，则需要打开多个不同的浏览器进行调试。

## login

```typescript
engine.login(userID: number, token: string, gameID: number, gameVersion: number, appKey: string, secretKey: string, deviceID: string, gatewayID: number): number
```

#### 参数

| 参数        | 类型   | 描述                                     | 示例值 |
| ----------- | ------ | ---------------------------------------- | ------ |
| userID      | number | 用户ID，调用注册接口后获取               | 123546 |
| token       | string | 用户token，调用注册接口后获取            | ""     |
| gameID      | number | 游戏ID，来自Matchvs控制台游戏信息        | 210329 |
| gameVersion | number | 游戏版本，自定义，用于隔离匹配空间       | 1      |
| appKey      | string | 游戏App key，来自Matchvs控制台游戏信息   | ""     |
| secretKey   | string | secret key，来自Matchvs控制台游戏信息    | ""     |
| deviceID    | string | 设备ID，用于多端登录检测，请保证是唯一ID | ""     |
| gatewayID   | number | 服务器节点ID，默认为0                    | 0      |

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

## loginResponse

```typescript
response.loginResponse(login:MsLoginRsp);
```

#### 参数 MsLoginRsp 类的属性

| 属性   | 类型   | 描述                            | 示例值 |
| ------ | ------ | ------------------------------- | ------ |
| status | number | 状态返回 <br>200 成功<br>402 应用校验失败，确认是否在未上线时用了release环境，并检查gameId、appkey 和 secret<br>403 检测到该账号已在其他设备登录<br>404 无效用户 <br>500 服务器内部错误 | 200 |
| roomID | string | 房间号（预留断线重连）          | 210039 |

#### 说明

- 登录Matchvs服务端，与Matchvs建立连接。
- 服务端会校验游戏信息是否合法，保证连接的安全性。
- 如果一个账号在两台设备上登录，则后登录的设备会连接失败。
- 如果用户加入房间之后掉线，再重新登录进来，则roomID为之前加入的房间的房间号。

## logout

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

#### 说明

- 退出登录，断开与Matchvs的连接。

## logoutResponse

```typescript
response.logoutResponse(status:number);
```

#### 参数

| 参数   | 类型   | 描述                            | 示例值 |
| ------ | ------ | ------------------------------- | ------ |
| status | number | 状态返回，200表示成功 <br>500 服务器内部错误 | 200    |

## joinRandomRoom

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

#### 说明

- 当房间里人数等于maxPlayer时，房间人满。系统会将玩家随机加入到人未满且没有[joinOver](http://cn.matchvs.com/service?page=APIJavaScript#joinOver)的房间。
- 如果不存在人未满且没有joinOver的房间，则系统会再创建一个房间，然后将玩家加入到该房间。
- 玩家userProfile的值可以自定义，接下来会通过回调函数（如joinRoomResponse）传给其他客户端。

## joinRoomWithProperties（自定义属性匹配）

```
joinRoomWithProperties(matchinfo:MsMatchInfo, userProfile:string):number
```

#### 参数

| 参数        | 类型        | 描述     | 示例值 |
| ----------- | ----------- | -------- | ------ |
| matchinfo   | MsMatchInfo | 配置信息 |        |
| userProfile | string      | 玩家简介 | ""     |

#### MsMatchInfo的属性

| 属性      | 类型   | 描述                         | 示例值                        |
| --------- | ------ | ---------------------------- | ----------------------------- |
| maxPlayer | number | 玩家最大人数                 | 3                             |
| mode      | number | 模式可 默认填0               | 0                             |
| canWatch  | number | 是否可以观战 1-可以 2-不可以 | 1                             |
| tags      | object | 匹配属性值                   | {title:"Matchvs",name:"demo"} |

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

#### 说明

> 同 joinRandomRoom，对应的回调接口也是 joinRoomResponse
>
> tags为匹配标签，开发者通过设置不同的标签进行自定义属性匹配，相同MsMatchInfo的玩家将会被匹配到一起。
> 

## joinRoom（加入指定房间）

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

#### 说明

- 客户端可以通过调用该接口加入指定房间，roomID为加入指定房间的房间号
- 指定房间号必须是由 createRoom接口创建的房间。


## joinRoomResponse

```typescript
response.joinRoomResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo);
```

#### 参数

| 参数             | 类型                  | 描述                            | 示例值 |
| ---------------- | --------------------- | ------------------------------- | ------ |
| status           | number                | 状态返回，200表示成功 <br>400 客户端参数错误 <br>404 指定房间不存在 <br>405 房间已满 <br>406 房间已joinOver <br>500 服务器内部错误       | 200    |
| roomUserInfoList | Array<MsRoomUserInfo> | 房间内玩家信息列表              |        |
| roomInfo         | MsRoomInfo            | 房间信息构成的对象              |        |

#### MsRoomUserInfo 的属性

| 属性        | 类型   | 描述     | 示例值 |
| ----------- | ------ | -------- | ------ |
| userId      | number | 用户ID   | 32322  |
| userProfile | string | 玩家简介 | ""     |

#### MsRoomInfo 的属性	

| 属性         | 类型   | 描述               | 示例值 |
| ------------ | ------ | ------------------ | ------ |
| roomID       | string | 房间号             | 238211 |
| roomProperty | string | 房间属性           | ""     |
| owner        | number | 房间创建者的用户ID | 0      |

#### 说明

- 如果本房间是某个玩家调用joinRandomRoom随机加入房间时创建的，那么roomInfo中的owner为服务器随机指定的房主ID。在调用engine.createRoom主动创建房间时owner为创建房间者（即房主）的ID。以上两种情况下，如果房主离开房间，服务器均会指定下一个房主，并通过`leaveRoomNotify`通知房间其他成员。
- roomUserInfoList用户信息列表是本玩家加入房间前的玩家信息列表，不包含本玩家。
- roomUserInfoList中的玩家的userProfile的值来自于其他客户端调用joinRandomRoom时传递的userProfile的值。

## joinRoomNotify

```typescript
response.joinRoomNotify(roomUserInfo:MsRoomUserInfo);
```

#### 参数 

| 参数         | 类型           | 描述                 | 示例值 |
| ------------ | -------------- | -------------------- | ------ |
| roomUserInfo | MsRoomUserInfo | 房间新加的用户的信息 |        |

#### 说明

- 某个玩家加入房间之后，如果该房间后来又有其他玩家加入，那么将会收到回调通知，response.joinRoomNotify方法会被SDK调用，调用时传入的roomUserInfo是新加入的其他玩家的信息，不是本玩家的信息。
- roomUserInfo的属性与response.joinRoomResponse中的[roomUserInfoList中的元素包含的属性](http://cn.matchvs.com/service?page=APIJavaScript#roomUserInfo)相同。

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

#### 说明

- 客户端调用该接口通知服务端：房间人数已够，不要再向房间加人。

## joinOverResponse

```typescript
response.joinOverResponse(rsp:MsJoinOverRsp);
```

#### MsJoinOverRsp的属性

| 属性    | 类型   | 描述                            | 示例值 |
| ------- | ------ | ------------------------------- | ------ |
| status  | number | 状态返回，200表示成功<br>400 客户端参数错误 <br>404 用户或房间不存在 <br>403 该用户不在房间 <br>500 服务器内部错误 | 200    |
| cpProto | string | 负载信息                        |        |

#### 说明

- 客户端调用engine.joinOver发送关闭房间的指令之后，SDK异步调用reponse.joinOverResponse方法告诉客户端joinOver指令的处理结果。



### joinOverNotify

```typescript
response.joinOverNotify(notifyInfo:MsJoinOverNotifyInfo);
```

#### 参数 MsJoinOverNotifyInfo 的属性 

| 属性      | 类型   | 描述               | 示例值 |
| --------- | ------ | ------------------ | ------ |
| roomID    | string | 房间ID             |        |
| srcUserID | number | 发起关闭房间玩家ID |        |
| cpProto   | string | 负载信息           |        |

#### 说明

- 当有人调用了 joinOver 接口，同一房间的其他用户就会收到这个 回调信息。


## leaveRoom

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
| -6     | 不在房间                       |
| -21    | userProfile 过长，不能超过1024 |

#### 说明

- 客户端调用该接口通知服务端该客户端对应的用户要离开房间。

## leaveRoomResponse

```typescript
response.leaveRoomResponse(rsp:MsLeaveRoomRsp);
```

#### 参数MsLeaveRoomRsp的属性

| 属性    | 类型   | 描述                            | 示例值 |
| ------- | ------ | ------------------------------- | ------ |
| status  | number | 状态返回，200表示成功<br>400 客户端参数错误 <br>404 房间不存在 <br>500 服务器内部错误 | 200    |
| roomID  | string | 房间号                          | 317288 |
| userId  | number | 用户ID                          | 317288 |
| cpProto | string | 负载信息                        |        |

#### 说明

- 客户端调用engine.leaveRoom发送关闭房间的指令之后，SDK异步调用reponse.leaveRoomResponse方法告诉客户端leaveRoom指令的处理结果。

## leaveRoomNotify

```typescript
response.leaveRoomNotify(leaveRoomInfo:MsLeaveRoomNotify);
```

#### 参数 MsLeaveRoomNotify 属性

| 参数    | 类型   | 描述                     | 示例值 |
| ------- | ------ | ------------------------ | ------ |
| userId  | number | 房间号                   | 200    |
| roomID  | string | 刚刚离开房间的用户的信息 |        |
| owner   | number | 房主                     |        |
| cpProto | string | 附加信息                 |        |

#### 说明

- 当同房间中的其他玩家调用leaveRoom发送离开房间的指令之后，本客户端将会收到回调通知，response.leaveRoomNotify方法会被SDK调用，调用时传入的roomUserInfo是离开房间的玩家的信息。
- roomUserInfo的属性与response.joinRoomResponse中的[roomUserInfoList中的元素包含的属性](http://cn.matchvs.com/service?page=APIJavaScript#roomUserInfo)相同。

## createRoom

```typescript
engine.createRoom(createRoomInfo:MsCreateRoomInfo, userProfile:string): number
```

#### 参数

| 参数           | 类型             | 描述           | 示例值 |
| -------------- | ---------------- | -------------- | ------ |
| createRoomInfo | MsCreateRoomInfo | 创建房间的信息 |        |
| userProfile    | string           | 玩家简介       | ""     |

#### MsCreateRoomInfo 的属性

| 属性         | 类型   | 描述                         | 示例值         |
| ------------ | ------ | ---------------------------- | -------------- |
| roomName     | string | 房间名称                     | “MatchvsRoom”  |
| maxPlayer    | number | 最大玩家数                   | 3              |
| mode         | number | 模式                         | 1              |
| canWatch     | number | 是否可以观战 1-可以 2-不可以 | 2              |
| visibility   | number | 是否可见默认0不可见 1可见    | 1              |
| roomProperty | string | 房间属性                     | “roomProperty” |

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

#### 说明

- 开发者可以在客户端主动创建房间，创建成功后玩家会被自动加入该房间，创建房间者即为房主，如果房主离开房间则Matchvs会自动转移房主并通知房间内所有成员，开发者通过设置CreateRoomInfo创建不同类型的房间

## createRoomResponse

```typescript
response.createRoomResponse(rsp:MsCreateRoomRsp);
```

#### MsCreateRoomRsp 属性

| 参数   | 类型   | 描述                            | 示例值   |
| ------ | ------ | ------------------------------- | -------- |
| status | number | 状态返回，200表示成功<br>400 客户端参数错误 <br>500 服务器内部错误| 200      |
| roomId | string | 房间号                          | "210039" |
| owner  | number | 房主                            | 210000   |

#### 说明

- response是engine.createRoom方法中传入的对象，createRoom完成之后，会异步回调createRoomResponse方法


## getRoomList

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

## getRoomListResponse

```
response.getRoomListResponse(status:number, roomInfos:Array<MsRoomInfoEx>);
```

#### 参数

| 参数      | 类型                | 描述                            | 示例值 |
| --------- | ------------------- | ------------------------------- | ------ |
| status    | number              |状态返回，200表示成功<br>500 服务器内部错误 | 200    |
| roomInfos | Array<MsRoomInfoEx> | 房间信息列表                    |        |

#### MsRoomInfoEx 的属性

| 属性         | 类型   | 描述                         | 示例值         |
| ------------ | ------ | ---------------------------- | -------------- |
| roomID       | string | 房间ID                       | "123456786"    |
| roomName     | string | 房间名称                     | “matchvsRoom”  |
| maxPlayer    | number | 最大人数                     | 3              |
| mode         | number | 模式                         | 0              |
| canWatch     | number | 是否可以观战 1-可以 2-不可以 | 2              |
| roomProperty | string | 房间属性                     | “roomProperty” |

#### 说明

- response是engine.getRoomList方法中传入的对象，getRoomList完成之后，会异步回调getRoomListResponse方法


## getRoomListEx

```typescript
engine.getRoomListEx(filter:MsRoomFilterEx);
```

#### 参数 MsRoomFilterEx 属性

| 参数         | 类型   | 描述                                              | 示例值         |
| ------------ | ------ | ------------------------------------------------- | -------------- |
| maxPlayer    | number | 房间最大人数 (0-全部)                             | 3              |
| mode         | number | 模式（0-全部）*创建房间时，mode最好不要填0        | 2              |
| canWatch     | number | 是否可以观战（0-全部 1-可以 2-不可以）            | 1              |
| roomProperty | string | 房间属性                                          | “roomProperty” |
| full         | number | 0-全部 1-满 2-未满                                | 0              |
| state        | number | 0-全部 1-开放 2-关闭                              | 0              |
| sort         | number | 0-不排序 1-创建时间排序 2-玩家数量排序 3-状态排序 | 0              |
| order        | number | 0-ASC  1-DESC                                     | 0              |
| pageNo       | number | 页码                                              | 0              |
| pageSize     | number | 每一页的数量                                      | 10             |

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

#### 说明

- getRoomListEx 是 getRoomList 接口的扩展功能接口，只能获取调用 createRoom 接口创建的房间，获取房间列表参数必须和createRoom接口创建的房间参数一致而且 createRoom中的参数 visibility 必须设置为1(可见)。比如：createRoom 参数结构 如下

```
var createRoomInfo = new MsCreateRoomInfo("Matchvs",3, 0, 0, 1, "mapA")
```

那么getRoomList 参数结构应该如下：

```
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




## getRoomListExResponse

```typescript
response.getRoomListExResponse(rsp:MsGetRoomListExRsp);
```

#### 参数 MsGetRoomListExRsp 的属性

| 参数      | 类型                   | 描述          | 示例值 |
| --------- | ---------------------- | ------------- | ------ |
| status    | number                 | 状态 200 成功 <br>500 服务器内部错误 | 200    |
| total     | number                 | 房间总数量    | 2      |
| roomAttrs | Array<MsRoomAttribute> | 房间信息列表  | []     |

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

#### 说明

- 是接口 getRoomListEx 的回调，参数total  与 roomAttrs 列表length 可能会不同，但是 total 会 >= roomAttrs 列表的 length。


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

#### 说明

- 获取房间详细信息，可获取的时候 createRoom 接口创建的房间。


## getRoomDetailResponse

```typescript
response.getRoomDetailResponse(rsp:MsGetRoomDetailRsp);
```

#### 参数 MsGetRoomDetailRsp 的属性

| 参数         | 类型                  | 描述                                  | 示例值 |
| ------------ | --------------------- | ------------------------------------- | ------ |
| status       | number                | 接口状态 200 成功 <br>404 房间不存在 <br>500 服务器内部错误                   |        |
| state        | number                | 房间状态 1-开放 2-关闭                |        |
| maxPlayer    | number                | 最大人数                              |        |
| mode         | number                | 模式                                  |        |
| canWatch     | number                | 是否可以观战 1-可以 2-不可以          |        |
| roomProperty | string                | 房间属性                              |        |
| owner        | number                | 房主                                  |        |
| createFlag   | number                | 创建方式 0-未知 1-系统创建 2-玩家创建 |        |
| userInfos    | Array<MsRoomUserInfo> | 用户列表信息                          |        |

#### MsRoomUserInfo 的属性

| 属性        | 类型   | 描述     | 示例值 |
| ----------- | ------ | -------- | ------ |
| userId      | number | 用户ID   | 32322  |
| userProfile | string | 玩家简介 | ""     |

#### 说明

- 是 getRoomDetail 接口的回调。

## setRoomProperty 

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

#### 说明

- 在进入房间后，可以调用 `setRoomProperty` 修改房间的属性。

## setRoomPropertyResponse

```typescript
response.setRoomPropertyResponse(rsp:MsSetRoomPropertyRspInfo);
```

#### 参数 MsSetRoomPropertyRspInfo 的属性

| 参数         | 类型   | 描述            | 示例值               |
| ------------ | ------ | --------------- | -------------------- |
| status       | number | 状态值，200成功<br>400 客户端参数错误 <br>404 房间不存在 <br>500 服务器内部错误| 200                  |
| roomID       | string | 房间号          | "654354323413134354" |
| userID       | number | 玩家            | 123                  |
| roomProperty | string | 修改后的属性值  | “changeRoomProperty” |

#### 说明

- 开发者调用 setRoomProperty 接口，服务器会回调 setRoomPropertyResponse 接口。


## setRoomPropertyNotify

```typescript
response.setRoomPropertyNotify(notify:MsRoomPropertyNotifyInfo);
```

#### 参数 MsRoomPropertyNotifyInfo 的属性

| 参数         | 类型   | 描述           | 示例值               |
| ------------ | ------ | -------------- | -------------------- |
| roomID       | string | 房间号         | "654354323413134354" |
| userID       | number | 玩家           | 123                  |
| roomProperty | string | 修改后的属性值 | “changeRoomProperty” |

#### 说明

- 调用 `setRoomProperty ` 接口后，其他玩家会收到 这个setRoomPropertyNotify 接口的回调。

## sendEvent

```typescript
engine.sendEvent(data:string):any
```

#### 参数

| 参数 | 类型   | 描述     | 示例值  |
| ---- | ------ | -------- | ------- |
| data | string | 消息内容 | "hello" |

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

#### 说明

- 在进入房间后即可调用该接口进行消息发送，消息会发给房间里除自己外其他所有成员。
- 同一客户端多次调用engine.sendEvent方法时，每次返回的sequence都是唯一的。但同一房间的不同客户端调用sendEvent时生成的sequence之间会出现重复。
- 可以发送二进制数据，开发者可以将数据用json、pb等工具先进行序列化，然后将序列化后的数据通过SendEvent的一系列接口发送。

## sendEventEx

```typescript
engine.sendEventEx(msgType:number, data:string, desttype:number, userids:Array<number>):any
```

#### 参数

| 属性     | 类型          | 描述                                                         | 示例值      |
| -------- | ------------- | ------------------------------------------------------------ | ----------- |
| msgType  | number        | 0-包含destUids用户  1-排除destUids的用户                     | 0           |
| data     | string        | 要发送的数据                                                 | “hello”     |
| desttype | number        | 消息发送的地方：0-发客户端不发gameServer  1-不发客户端+发gameServer   2-发客户端 发gameServer | 2           |
| userids  | Array<number> | 玩家ID集合                                                   | [1234,4567] |

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

#### 说明

- 在进入房间后即可调用该接口进行消息发送，消息会发给房间里所有成员。
- 同一客户端多次调用engine.sendEvent方法时，每次返回的sequence都是唯一的。但同一房间的不同客户端调用sendEvent时生成的sequence之间会出现重复。


## sendEventResponse

```typescript
response.sendEventResponse(rsp:MsSendEventRsp);
```

#### MsSendEventRsp 的属性

| 属性     | 类型   | 描述                                                         | 示例值 |
| -------- | ------ | ------------------------------------------------------------ | ------ |
| status   | number | 状态返回，200表示成功<br>521 gameServer不存在，请检查是否已开启本地调试或在正式环境发布运行gameServer | 200    |
| sequence | number | 事件序号，作为事件的唯一标识，可以参考sendEvent，对这个字段的详细说明 | 231212 |

#### 说明

- 客户端调用engine.sendEvent或engine.sendEventEx 发送消息之后，SDK异步调用reponse.sendEventResponse 方法告诉客户端消息是否发送成功。

## sendEventNotify

```typescript
response.sendEventNotify(eventInfo:MsSendEventNotify);
```

#### MsSendEventNotify的属性

| 参数      | 类型   | 描述                                                         | 示例值  |
| --------- | ------ | ------------------------------------------------------------ | ------- |
| srcUserId | number | 推送方用户ID，表示是谁发的消息                               | 321     |
| cpProto   | string | 消息内容，对应[sendEvent](http://cn.matchvs.com/service?page=APIJavaScript#sendEvent)中的msg参数 | "hello" |

#### 说明

- 在其他客户端调用 engine.sendEvent 或engine.sendEventEx 方法之后，本客户端的response.sendEventNotify会被SDK调用，调用时传入其他玩家的用户ID和发送的消息。




## networkStateNotify

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

#### 说明

- 在房间中如果有其他玩家网络断开就会收到这个异步回调的接口，通过这个接口就可以知道其他玩家的网络状态啦。

## gameServerNotify

```typescript
response.gameServerNotify(eventInfo:MsGameServerNotifyInfo);
```

#### 参数 MsGameServerNotifyInfo属性

| 参数      | 类型   | 描述                       | 示例值       |
| --------- | ------ | -------------------------- | ------------ |
| srcUserId | number | gameServer推送时 这个值为0 | 0            |
| cpProto   | string | 推送的消息内容             | “gameServer” |

#### 说明

- 开发者有使用 gameServer 的时候，如果有gameServer发送消息到客户端就会收到这个回调，回调的 srcUserID 是固定为0。


## kickPlayer

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

#### 说明

- kickPlayer 用于剔除玩家，房间任何人都可以调用这个接口，参数userID 可以是房间内任意一个，自己也可以剔除自己。主要剔除方式由开发者自己制定。


## kickPlayerResponse

```typescript
response.kickPlayerResponse(rsp:MsKickPlayerRsp);
```

#### 参数 MsKickPlayerRsp 的属性

| 参数   | 类型   | 描述              | 示例值 |
| ------ | ------ | ----------------- | ------ |
| status | number | 接口状态 200 成功 <br>  400 客户端参数错误 <br>404 用户或房间不存在  |        |
| owner  | nunber | 房主ID            |        |
| userID | number | 被踢玩家ID        |        |

#### 说明

- 玩家调用 kickPlayer 接口就会收到 kickPlayerResponse 接口的回调。而其他玩家会收到 kickPlayerNotify 接口的回调。


## kickPlayerNotify

```typescript
response.kickPlayerNotify(knotify:MsKickPlayerNotify)
```

#### 参数 MsKickPlayerNotify 的属性

| 参数      | 类型   | 描述           | 示例值 |
| --------- | ------ | -------------- | ------ |
| userId    | number | 被踢玩家ID     |        |
| srcUserId | number | 发起踢人玩家ID |        |
| cpProto   | string | 附加消息       |        |
| owner     | number | 房主ID         |        |

#### 说明

- 有玩家调用 kickPlayer 接口踢人，其它玩家就会收到 kickPlayerNotify的回调。



## subscribeEventGroup

```typescript
engine.subscribeEventGroup(confirms:Array<string>, cancles:Array<string>):number
```

#### 参数

| 参数     | 类型          | 描述             | 示例值                 |
| -------- | ------------- | ---------------- | ---------------------- |
| confirms | Array<string> | 要订阅的组名     | ["1344333","matchvs1"] |
| cancles  | Array<string> | 要取消订阅的组名 | ["matchvs","4654"]     |

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

#### 说明

- 订阅分组，分组属性可以自行设置，比如两个人需要组队，可以给他们加入到一个订阅分组里就可以相互发送消息，而其他人无感知。



## subscribeEventGroupResponse

```typescript
response.subscribeEventGroupResponse(status:number, groups:Array<string>);
```

#### 参数

| 参数   | 类型          | 描述                      | 示例值      |
| ------ | ------------- | ------------------------- | ----------- |
| status | number        | 状态值：成功200，其他失败 | 200         |
| groups | Array<string> | 订阅的组                  | ["MatchVS"] |

#### 说明

- 进行分组消息订阅接口，订阅相同组的用户是可以发送消息的，一个用户可以订阅多个消息组。

## sendEventGroup

```typescript
engine.sendEventGroup(groups:Array<string>, data:string):number
```

#### 参数

| 参数   | 类型          | 描述       | 示例值          |
| ------ | ------------- | ---------- | --------------- |
| data   | string        | 发送的数据 | “hello matchvs” |
| groups | Array<string> | 发送的分组 | ["MatchVS"]     |

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

#### 说明

- 消息分组发送可以根据 groups 参数发送多个分组。

## sendEventGroupResponse

```typescript
response.sendEventGroupResponse(status:number);
```

#### 参数

| 参数   | 类型   | 描述                     | 示例值 |
| ------ | ------ | ------------------------ | ------ |
| status | number | 状态值 200成功，其他失败 | 200    |
| dstNum | number | 将被发送给多少个客户端   | 3      |

#### 说明

- 调用 sendEventGroup 接口发送消息成功会收到sendEventGroupResponse的回调。dstNum表示这个分组消息会有多少个人收到。



## sendEventGroupNotify

```typescript
response.sendEventGroupNotify(srcUid:number, groups:Array<string>, cpProto:string);
```

#### 参数

| 参数      | 类型          | 描述         | 示例值      |
| --------- | ------------- | ------------ | ----------- |
| srcUserID | number        | 消息来源用户 | 277773      |
| groups    | Array<string> | 消息来源分组 | ["MatchVS"] |
| cpProto   | string        | 负载消息     | "test"      |

#### 说明

- 多个用户在同一个分组时，有一个用户发送消息，那么其他用户就会收到 sendEventGroupNotify 的异步回调。



## setFrameSync

```typescript
engine.setFrameSync(frameRate:number):number
```

#### 参数

| 参数      | 类型   | 描述          | 示例值 |
| --------- | ------ | ------------- | ------ |
| frameRate | number | 帧率: 0关闭。 | 10     |

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

#### 说明

- setFrameSync 设置帧率，参数值设置 0表示关闭，参数值大于0表示打开，不调用为关闭。
- 帧率须能被1000整除



## setFrameSyncResponse

```typescript
response.setFrameSyncResponse(rsp:MsSetChannelFrameSyncRsp);
```

#### 参数 MsSetChannelFrameSyncRsp的属性

| 参数    | 类型   | 描述                                                       | 示例值 |
| ------- | ------ | ---------------------------------------------------------- | ------ |
| mStatus | number | 状态：<br>200 成功<br>519 重复设置<br>500 帧率需被1000整除 | 200    |

#### 说明

- response是engine.setFrameSyncResponse方法中传入的对象，setFrameSync完成之后，会异步回调engine.setFrameSyncResponse方法



## sendFrameEvent

```typescript
engine.sendFrameEvent(cpProto:string):number
```

#### 参数

| 参数    | 类型   | 描述           | 示例值    |
| ------- | ------ | -------------- | --------- |
| cpProto | string | 帧同步消息内容 | ”message“ |

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

#### 说明

- 开发者可以通过该接口发送帧同步消息

## sendFrameEventResponse

```typescript
response.sendFrameEventResponse(rsp:MsSendFrameEventRsp);
```

#### MsSendFrameEventRsp 的属性

| 参数    | 类型   | 描述           | 示例值 |
| ------- | ------ | -------------- | ------ |
| mStatus | number | 状态值 200成功 | 200    |

#### 说明

- response是engine.sendFrameEventResponse方法中传入的对象，sendFrameEvent完成之后，会异步回调engine.sendFrameEventResponse方法

## frameUpdate

```typescript
response.frameUpdate(data:MsFrameData);
```

#### 参数 MsFrameData 的属性

| 参数           | 类型               | 描述                     | 示例值 |
| -------------- | ------------------ | ------------------------ | ------ |
| frameIndex     | number             | 帧序号                   |        |
| frameItems     | Array<MsFrameItem> | 同步帧内的数据包数组     |        |
| frameWaitCount | number             | 同步帧内的数据包数组数量 |        |

#### MsFrameItem 的属性

| 参数      | 类型   | 描述     | 示例值 |
| --------- | ------ | -------- | ------ |
| srcUserID | number | 用户ID   |        |
| cpProto   | string | 附加消息 |        |
| timestamp | string | 时间戳   |        |

#### 说明

- frameUpdate是engine.frameUpdate 方法中传入的对象，收到帧同步推送之后，会异步回调engine.frameUpdate 方法


## reconnect

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

#### 说明

- 用户在中途断线后服务器会保存用户20秒在房间状态，20秒内用户可以重新登录连接到原来的房间里面。
- 在游戏里面如果网络断开，可以调用 reconnect 函数重新连接，断线重新连接分为两种情况，第一种没有重新启动程序：在游戏进行时网络断开，直接调用 reconnect 重新连接到游戏。第二种重新加载程序：先调用login 然后判断 loginResponse 中的参数 roomID 是否为0 如果不为 0 就调用reconnect 重连到房间
- reconnect 接口调用，其他玩家收到 netWorkStateNotify 接口信息，接口详情请看netWorkStateNotify的接口说明。

## reconnectResponse

```typescript
response.reconnectResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo);
```

#### 参数

| 参数             | 类型                  | 描述                                                         | 示例值 |
| ---------------- | --------------------- | ------------------------------------------------------------ | ------ |
| status           | number                | 状态返回，200表示成功， 201-重连房间失败但是处于登录状态，其他失败 | 200    |
| roomUserInfoList | Array<MsRoomUserInfo> | 房间内玩家信息列表                                           |        |
| roomInfo         | MsRoomInfo            | 房间信息构成的对象                                           |        |

#### MsRoomUserInfo 的属性

| 属性        | 类型   | 描述     | 示例值 |
| ----------- | ------ | -------- | ------ |
| userId      | number | 用户ID   | 32322  |
| userProfile | string | 玩家简介 | ""     |

#### MsRoomInfo 的属性

| 属性         | 类型   | 描述               | 示例值 |
| ------------ | ------ | ------------------ | ------ |
| roomID       | string | 房间号             | 238211 |
| roomProperty | string | 房间属性           | ""     |
| owner        | number | 房间创建者的用户ID | 0      |

#### 说明

- 玩家掉线后调用reconnect接口重新连接会收到此接口的回调。

## joinOpen

设置房间重新打开,允许他人匹配加入当前房间, 注意 `在房间的情况才可以调用,否则函数直接返回错误码`

```javascript
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

## joinOpenNotify&joinOpenResponse

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

MsReopenRoomResponse:

| 属性    | 类型   | 描述                             | 示例值 |
| ------- | ------ | -------------------------------- | ------ |
| status  | number | 接口调用的服务器返回码,200为正确 | 200    |
| cpProto | string | 调用者附带的信息                 | ""     |



MsReopenRoomNotify:

| 属性    | 类型   | 描述             | 示例值      |
| ------- | ------ | ---------------- | ----------- |
| roomID  | string | 房间号           | "123123123" |
| cpProto | string | 调用者附带的信息 | ""          |
| userID  | number | 调用者用户ID     | 0           |



#### 返回值

无

#### 示例代码片段
Egret 代码示例
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

## 错误码

```typescript
response.errorResponse = function(errCode, errMsg) {
	console.log("错误信息：", errMsg);
}

```

**注意** Matchvs相关的异常信息可通过该接口获取

| 错误码 | 含义             |
| ------ | ---------------- |
| 1001   | 网络错误         |
| 500    | 服务器内部错误   |
| 406    | 房间已经关闭     |
| 405    | 房间人已经满了   |
| 404    | 找不到您要的信息 |
| 500    | 游戏服务器错误   |
| 402    | 用户信息验证错误 |
|        |                  |

## CHANGELOG

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


