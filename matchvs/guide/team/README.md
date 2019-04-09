


[组队示例](http://demo.matchvs.com/RombBoy/)

当前页面是组队相关的API说明。我们同样是以 MatchvsEngine 和 MatchvsResponse 的对象 engine 和 response 来说明。

Response 是发起方在调用接口后，自己收到的回调；Notify是发起方调用接口后，小队其他成员收到的通知。

组队匹配信息可以使用getRoomDetail 接口查看房间是否有组队。请求接口返回码可以参考 [错误码说明](https://doc.matchvs.com/APIDoc/erroCode) 

## 名词概念

对函数和回调函数中函数做统一说明

| 属性                 | 类型          | 描述                  | 示例值    |
| -------------------- | ------------- | --------------------- | --------------------- |
| team/teaminfo | object | 队伍信息        |                       |
| team.teamID     | string        | 队伍ID                | "131113213211323121231" |
| team.password   | string        | 队伍权限值            | 1ab2                  |
| team.capacity   | number        | 队伍人数容量          | 3                     |
| team.mode   | number | 组队模式,匹配条件 | 由开发者自己定义,作为 |
| team.owner  | number | 队长   | 123456 |
| team.visibility  | number | 0-不可见 1-可见       | 1          |
| status               | number        | 加入队伍状态值        | 200  |
|    user    | object        |       玩家               |{userID:""}|
| userList  | array<object> | 队伍玩家列表          |         [{userID:""},{}] |
| userID | number        | 玩家ID                | 2356   |
| userProfile | string        | 玩家自定义信息        | 如玩家头像|

#### 函数返回码

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
| -13    | 队伍正在匹配中                     |





## 创建队伍

组队匹配需要调用这个接口先创建一支队伍。

- 请求接口：createTeam
- 回调接口：createTeamResponse



开发者可以创建一个带密码的小队，并指定小队的人数上限（如5v5，则小队人数上限为5，玩家可以再邀请4个好友一起组成小队）。

可以定义组队模式，比如基础模式，进阶模式等。在创建小队时，设置用户信息，之后有玩家加入小队时，可以直接获取到该用户信息。

玩家A创建小队成功后，A会收到小队ID，将小队ID分享给好友，好友即可通过ID+密码进入小队。（不需要密码可以全部默认设置为同一个值。）

每个小队会有一个队长，一般是创建小队的那个玩家，如果队长掉线/离开小队，则队长会随机转移给小队内其他玩家。新的队长信息可以在 `leaveTeamNotify`里获取。

#### createTeam

```typescript

    /**
     * 创建组队
     * @param {MVS.MsCreateTeamInfo} teaminfo
     * @returns {number}
     * @memberof MatchvsEngine
     */
    createTeam(teaminfo: MVS.MsCreateTeamInfo):number
```

#### createTeamResponse

```

    /**
     * 创建组队同步放回信息
     * @param {*} rps
     * @param {number} rps.status
     * @param {string} rps.teamID
     * @param {number} rps.owner
     * @memberof MatchvsResponse
     */
    createTeamResponse(rps:any):void
```



#### 示例代码

```javascript
var req = {
    password:"ok",
    capacity:2,
    mode:0,
    visibility:1,
    userProfile:"temamode"
};
engine.createTeam(req)
response.createTeamResponse = function(rsp){
    console.log("[RSP]createTeamResponse:"+JSON.stringify(rsp));
};
```



## 加入队伍

要邀请好友加入队伍，使用 createTeam 接口创建的队伍信息，调用 joinTeam 接口就可以加入指定的队伍。队伍中其他玩家会收到 joinTeamNotify 接口的通知。

- 请求接口：joinTeam
- 回调接口：joinTeamResponse, joinTeamNotify



加入小队时，可以携带头像、昵称等信息。

队员加入后，会收到已在小队里的所有成员列表信息以及小队信息。其他玩家会收到该队员加入的通知。

#### joinTeam

```typescript
    /**
     * 加入组队队伍，队伍必须是由 createTeam 接口创建的
     * @param {MVS.MsJoinTeamInfo} teaminfo
     * @returns {number}
     * @memberof MatchvsEngine
     */
    joinTeam(teaminfo:MVS.MsJoinTeamInfo):number
```



#### joinTeamResponse

调用加入队伍接口，自己会收到这个接口通知

```typescript
    /**
     * 加入队伍返回信息
     * @param {*} rsp
     * @param {*} rsp.team //队伍信息
     * @param {number} rsp.team.teamID 队伍号
     * @param {string} rsp.team.password 队伍验证信息
     * @param {number} rsp.team.capacity 队伍人数容量
     * @param {number} rsp.team.mode 模式-开发者自定义的值
     * @param {number} rsp.team.owner 队长
     * @param {number} rsp.status 加入队伍状态值
     * @param {Array<any>} rsp.userList [{userID:, userProfile:,}]
     * @memberof MatchvsResponse
     */
    joinTeamResponse(rsp:any):void
```

#### joinTeamNotify

有人加入队伍，队伍中其他玩家会收到 joinTeamNotify 接口的通知

```typescript
    /**
     *
     * @param {string} notify.teamID
     * @param {number} notify.status
     * @param {number} notify.userID
     * @param {String} notify.teamProperty
     */
    leaveTeamNotify (notify):void
```



#### 示例代码

```javascript
response.joinTeamResponse = function(rsp){
	console.log("[RSP]joinTeamResponse:"+JSON.stringify(rsp));
};

response.joinTeamNotify = function(rsp){
	console.log("[RSP]joinTeamNotify:"+JSON.stringify(rsp));
};
var req ={
    teamID: PutIn("teamID"),
    password: PutIn("teamPwd"),
    userProfile:"i come team 哈哈"
};
console.log("[REQ]STJoinTeam:"+engine.joinTeam(req));
```



## 离开队伍

在队伍中如果要离开队伍就调用 leaveTeam 接口，其他人会收到 leaveTeamNotify 接口通知，自己收到 leaveTeamResponse 通知

- 请求接口：leaveTeam
- 回调接口：leaveTeamResponse, leaveTeamNotify

#### leaveTeam

```typescript
    /**
     * 离开组队队伍
     * @returns {number}
     * @memberof MatchvsEngine
     */
    leaveTeam():number
```



#### leaveTeamResponse

```typescript

    /**
     * 离开队伍回调信息
     * @param {*} rsp
     * @param {number} rsp.userID 离开者ID
     * @param {number} rsp.teamID 离开的队伍号
     * @param {number} rsp.status 状态值 200 成功
     * @memberof MatchvsResponse
     */
    leaveTeamResponse(rsp:any):void
```



#### leaveTeamNotify

```typescript

    /**
     * 有人离开队伍，其他人收到的通知接口
     * @param {*} notify
     * @param {number} notify.teamID 离开的队伍
     * @param {number} notify.userID 离开者
     * @param {number} notify.owner 队长
     * @param {String} notify.teamProperty 队伍属性
     * @memberof MatchvsResponse
     */
    leaveTeamNotify(notify:any):void
```



#### 示例代码

```javascript
response.leaveTeamResponse = function(rsp){
	console.log("[RSP]leaveTeamResponse:"+JSON.stringify(rsp));
};
response.leaveTeamNotify = function(notify){
	console.log("[RSP]leaveTeamNotify:"+JSON.stringify(notify));
};
console.log("[REQ]STLeaveTeam:"+engine.leaveTeam());
```



##队伍与队伍匹配

加入了队伍后，可以发起队伍匹配，队伍匹配的队伍成员数和队伍数量可在调用匹配的时候调用，如需要做5v5对战，则队伍成员数设置5，队伍数量设置2。队伍匹配调用 teamMatch 接口。teamMatch 接口可以由队伍中任意一个人调用。

- 请求接口：teamMatch
- 回调接口：teamMatchResponse, teamMatchStartNotify, teamMatchResultNotify

说明

匹配规则：你可以为每个小队设置一个权值，这个权值代表该小队的实力水平，如段位等级为3。然后设置小队实力的匹配范围，如2，则在匹配时，会为该小队寻找 3±2 段位（即1--5）的其他小队进行匹配。如果是不同模式，可以用 mode 区分，相同 mode 的小队才会被匹配到一起。匹配时会以`mode`、`cond`为匹配依据。

权重规则`weightRule` 用于小队合成大队后计算大队的段位，目前默认为 0 ，即求平均。如，team1 段位为 2，team2 段位为4，则合成大队后，大队权重为平均值 3 。如相应支持更多的合成后计算规则，可以进入技术支持群QQ：450335262  进行反馈。

匹配时，会自动根据设置的队伍数量及每队人数进行小队间的组合，最终会尽量保障两边队伍段位均衡。如5v5，team1（playerA）、team2（player B C D E）、team3（player F G ）、team4（player H I J）发起匹配，最终结果可能是 A B C D E ，F G H I J 两队。

你可以设置一个等待超时时间，如10秒，如果10秒之内未匹配到合适的其他小队，会返回匹配失败。

发起匹配后，其他队员会收到开始匹配的通知，匹配成功/失败的通知也会相继收到。

小队匹配支持人满和人不满模式，人满即  5v5 ，则最终匹配结果肯定是 5v5 ,否则会匹配失败；人不满即 5v5 ,在超时之前可能只能匹配到 2v3 ,则依然匹配成功，你可以再自行添加机器人。

#### teamMatch

```typescript
    /**
     * 加入的队伍之后，可以由队伍中的任何一个人发起队伍匹配
     * @param {MVS.MsTeamMatchInfo} matchInfo
     * @returns {number}
     * @memberof MatchvsEngine
     */
    teamMatch(matchInfo:MVS.MsTeamMatchInfo):number
```

参数 info 属性

info 是 MVS.MsTeamMatchInfo 类型。

| 属性         | 类型                | 描述                                                         | 示例值     |
| ------------ | ------------------- | ------------------------------------------------------------ | ---------- |
| roomName     | string              | 房间名称                                                     | “matchvs”  |
| maxPlayer    | number              | 房间最大人数                                                 | 10         |
| canWatch     | number              | 是否可以观战 1-可以观战 02不可以观战。                       | 1          |
| mode         | number              | 玩家自定义数据                                               | 0          |
| visibility   | number              | 房间是否可见（是否可以被getRoomListEx查看到）。0-不可见 1- 可见 | 1          |
| roomProperty | string              | 房间自定义信息                                               | "房间信息" |
| watchSet     | MVS.MsWatchSet      | 观战设置，canWatch 设置为1的时候有效                         |            |
| cond         | MVS.MsTeamMatchCond | 匹配设置                                                     |            |

 参数 MVS.MsWatchSet属性

| 属性       | 类型    | 描述                 | 示例值          |
| ---------- | ------- | -------------------- | --------------- |
| cacheMS    | number  | 缓存多久的数据       | 6*1000（6分钟） |
| maxWatch   | number  | 最大人数             | 3               |
| delayMS    | number  | 观看延迟多久后的数据 | 2000            |
| persistent | boolean | 是否持久缓存         | false           |

参数 MVS.MsTeamMatchCond属性

| 属性          | 类型   | 描述                                                         | 示例值 |
| ------------- | ------ | ------------------------------------------------------------ | ------ |
| teamNum       | number | 需要的队伍的数量                                             | 2      |
| teamMemberNum | number | 每支队伍的队员数                                             | 5      |
| timeout       | number | 匹配的超时时间,指匹配多久就视为超时，没有匹配到。接口teamMatchResultNotify会报422错误 | 20     |
| weight        | number | 权值                                                         | 10     |
| weightRange   | number | 匹配范围                                                     | 5      |
| weightRule    | number | 匹配规则， 默认是0(求平均)                                   | 0      |
| full          | number | 是否人满匹配，0-人不满也可以匹配，1-人满匹配 (人不满匹配不到会超时报422错误码) | 0      |

#### teamMatchResponse

发送匹配的人会收到这个接口的回调，告诉自己队伍正在匹配中。其他人会收到 teamMatchStartNotify 的通知。

```typescript
    /**
     * 队伍中发起匹配者会收到这个回调，表示正在匹配中
     * @param {*} rsp
     * @param {number} rsp.status 匹配状态
     * @memberof MatchvsResponse
     */
    teamMatchResponse(rsp:any):void

```

#### teamMatchStartNotify

在队伍中有人调用了匹配接口，其他人就会收到这个接口的通知，队伍开始进入匹配啦。

```typescript
    /**
     * 队伍中如果有人发起匹配，其他人会收到这个开启匹配的通知
     * @param {*} rsp
     * @param {*} rsp.teamID 队伍号
     * @param {*} rsp.userID 发起匹配者ID
     * @memberof MatchvsResponse
     */
    teamMatchStartNotify(rsp:any):void
```



#### teamMatchResultNotify

队伍匹配结果通过这个接口通知队伍中的所有人。**注意：匹配成功但并不是加入了房间，收到匹配成功后，马上给其他玩家发送消息是不可行的。**匹配成功后SDK会自动处理加入房间的逻辑，开发者不用额外的调用加入房间接口，只需要处理，joinRoomResponse 接口和 joinRoomNotify 接口即可，通过这个两个接口判断是否所有人都加入了房间，如果需要检查谁掉线了可以处理 networkStateNotify 接口。

```typescript
    /**
     * 发起匹配后，队伍中所有人都会收到匹配结果通知
     * @param {*} rsp
     * @param {number} rsp.status 配置的状态，200 成功，422 超时
     * @param {Array<any>} rsp.brigades 配置到队伍，大队伍列表信息
     * @param {number} rsp.brigades.brigadeID 大队伍ID号
     * @param {Array<any>} rsp.brigades.playerList 小队伍玩家列表
     * @param {number} rsp.brigades.playerList.userID 小队伍玩家ID
     * @param {string} rsp.brigades.playerList.userProfile 小队伍玩家自定义数据
     * @memberof MatchvsResponse
     */
    teamMatchResultNotify(rsp:any):void
```



数据示例：

````json
{
  "status": 200,
  "brigades": [
    {
      "brigadeID": 1,
      "playerList": [
        {
          "userID": 388139,
          "userProfile": "temamode"
        },
        {
          "userID": 388138,
          "userProfile": "i come team 哈哈"
        }
      ]
    },
    {
      "brigadeID": 2,
      "playerList": [
        {
          "userID": 388149,
          "userProfile": "temamode"
        },
        {
          "userID": 388148,
          "userProfile": "i come team 哈哈"
        }
      ]
    }
  ],
  "roomInfo": {
    "roomID": "1722967918502744099",
    "roomProperty": "STTeamMatch",
    "ownerId": 388138,
    "owner": 388138,
    "state": 0
  }
} 
````

#### 示例代码

```javascript
response.teamMatchResponse = function(rsp){
    console.log("[RSP]teamMatchResponse:"+JSON.stringify(rsp));
};
response.teamMatchResultNotify = function(notify){
    console.log("[RSP]TeamMatchResultNotify:"+JSON.stringify(notify));
};
response.teamMatchStartNotify = function(notify){
    console.log("[RSP]TeamMatchStartNotify:"+JSON.stringify(notify));
};

var cond ={
    teamNum:2,
    MemberNum:2,
    timeout:15,
    weight:15,
    weightRange:5,
    weightRule:0,
    full:0
};
var info = new MVS.MsTeamMatchInfo("STTeamMatch", 10, 1, 0,1,"STTeamMatch",
           new MVS.MsTeamMatchCond(cond.teamNum, cond.MemberNum, cond.timeout, cond.weight, cond.weightRange, cond.weightRule, cond.full), 
           new MVS.MsWatchSet(600000, 3, 60000, true)
);
console.log("[REQ]STTeamMatch:"+engine.teamMatch(info));
```



#### cancelTeamMatch

开始匹配后，在还没有匹配到队伍的情况下可以取消当前匹配。这个时候所有小队伍内的玩家都会从匹配列表中移除，触发取消匹配的人收到 cancelTeamMatchResponse 回调，其他人收到 cancelTeamMatchNotify 的回调。

```typescript
    /**
     * 取消组队匹配，只有在组队匹配的时候才能调用这个接口
     * @param {object} args
     * @param {string} args.cpProto 取消组队匹配时携带的消息 长度不能超过 1024/B
     */
    cancelTeamMatch(args:object):number
```

#### cancelTeamMatchResponse

调用取消匹配接口 cancelTeamMatch 时会收到这个接口的回调。

```
    /**
     * 取消组队匹配返回，但调用 cancelTeamMatch 接口后，通过这个接口接收服务的结果
     * @param {number} rsp.status
     */
    cancelTeamMatchResponse(rsp:any);
```

#### cancelTeamMatchNotify

有队员调用取消匹配接口 cancelTeamMatch 时，其他队员会收到这个接口的回调

```typescript
    /**
     * 取消组队匹配时
     * @param {any} notify 
     * @param {number} notify.userID 取消组队匹配的玩家ID
     * @param {string} notify.teamID 当前的队伍号
     * @param {string} notify.cpProto 取消时附带的消息
     */
    cancelTeamMatchNotify(notify:any);
```

示例代码

```javascript
response.cancelTeamMatchResponse = function(rsp){
    console.log("[RSP]cancelTeamMatchResponse:"+JSON.stringify(rsp));
};
response.cancelTeamMatchNotify = function(notify){
    console.log("[RSP]cancelTeamMatchNotify:"+JSON.stringify(notify));
};
engine.cancelTeamMatch({cpProto:"cancel team match"});
```

## 组队对内管理

#### kickTeamMember

踢出内成员，在组队期间如果没有开始组队匹配可以使用这个接口踢出其他玩家，不可以踢出自己。

```typescript
    /**
     * 剔除队伍中的指定玩家，队伍中任何人都可以剔除任意人，但是不能剔除自己。
     * @param {object} args
     * @param {number} args.userID 要剔除的玩家
     * @param {number} args.cpProto 剔除玩家时携带的信息，长度不能超过 1024/B
     */
    kickTeamMember(args:object):number
```

#### kickTeamMemberResponse

调用踢人接口会收到这个接口的回调。

```typescript
    /**
     * 调用 kickTeamMember 接口后，通过这个接口获取服务的结果
     * @param {any} rsp
     * @param {number} rsp.status 状态 200 表示成功
     * @param {Array<number>} rsp.members 队伍内剩下的玩家
     * @param {number} rsp.owner 当前队伍中队长
     * @param {string} rsp.teamID 当前队伍号
     */
    kickTeamMemberResponse(rsp:any);
```

#### kickTeamMemberNotify

有别的玩家调用了踢人接口，那么另外其他玩家会收到这个接口的回调。

```typescript
    /**
     * 收到踢人通知，当队伍中有人触发踢人接口，其他人就会收到这个接口的通知
     * @param {any} notify 
     * @param {string} notify.teamID 当前队伍号
     * @param {number} notify.userID 当前发起踢人的玩家号
     * @param {number} notify.dstUserID 被踢的玩家号
     * @param {number} notify.owner 当前队伍的队长
     * @param {Array<number>} notify.members 队伍中剩下的玩家
     * @param {string} notify.cpProto 踢人时携带的消息
     */
    kickTeamMemberNotify(notify:any);
```

#### 示例代码

```javascript
response.kickTeamMemberResponse = function(rsp){
    console.log("[RSP]kickTeamMemberResponse:"+JSON.stringify(rsp));
};
response.kickTeamMemberNotify = function(notify){
    console.log("[RSP]kickTeamMemberNotify:"+JSON.stringify(notify));
};
engine.kickTeamMember({userID:userid, cpProto:"kick team member"});
```

## 小对内通信

#### sendTeamEvent

 在组队期间，可以使用这个接口发送消息给其他的队内成员，自己收到 sendTeamEvent 的回调，其他成员收到 sendTeamEventNotify的回调，类似 sendEvent接口的使用，这个接口有对消息发送的频率做了限定，目前限定每秒不能超过20次。同时消息长度也有限定不能超过 1KB。只有在队伍中才能发送消息。

```typescript
    /**
     * 组队时，进入到同一个队伍中的玩家，可以通过这个接口来发送消息。这个消息发送频率是有限制 50ms/条。
     * @param {object} args
     * @param {number} args.dstType 0-包含dstUids  1-排除dstUids
     * @param {number} args.msgType 0-只发client  1-只发gs  2-client和 gs 都发
     * @param {Array<number>} args.dstUserIDs 指定的用户列表 配合 dstType 使用
     * @param {string} args.data 发送的数据 长度不能超过 1024/B
     */
    sendTeamEvent(args:object):number
```

#### sendTeamEventResponse

发送队内消息回调，发送者收到的回调

```typescript
    /**
     * 在队伍中发送消息回调，调用sendTeamEvent 接口后，这个接口收到发送的结果
     * @param {any} rsp
     * @param {number} rsp.status 发送队伍消息的结果，200 成功。
     * @param {Array<number>} rsp.dstUserIDs 发送消息给了哪些玩家。
     */
    sendTeamEventResponse(rsp:any);
```

#### sendTeamEventNotify

有别的玩家调用了发送消息接口，那么另外其他玩家会收到这个接口的回调。

```typescript
    /**
     * 接收忘记发送队伍消息，当其他玩家在队伍中发送消息时，其他指定的玩家就能收到这个接口的回调
     * @param {any} notify
     * @param {any} notify.userID 发送消息的玩家ID
     * @param {any} notify.teamID 当前队伍号
     * @param {string} notify.cpProto 收到的数据
     */
    sendTeamEventNotify(notify:any);
```

#### 示例代码

```javascript
response.sendTeamEventResponse = function(rsp){
    console.log("[RSP]sendTeamEventResponse:"+JSON.stringify(rsp));
};
response.sendTeamEventNotify = function(notify){
    console.log("[RSP]sendTeamEventNotify:"+JSON.stringify(notify));
};
engine.sendTeamEvent({msgType:0, dstType:1, data:data, dstUserIDs:[]});
```



## 队伍属性

####  setTeamProperty

设置队伍属性,对全员可见,主体是小队

```typescript
    /**
     * 设置队伍属性,对全员可见,主体是小队
     * @see {string} setTeamUserProfile
     * @param teamProperty
     * @returns {number}
     */
    setTeamProperty(teamProperty:string):number;
```
#### setTeamPropertyResponse

```typescript
    /**
     * @see setTeamProperty
     * @param {number} rsp.status
     * @param {string} rsp.teamID
     * @param {number} rsp.userID
     * @param {String} rsp.teamProperty
     */
    setTeamPropertyResponse(rsp): void
```

#### setTeamUserProfileNotify

```typescript
 /**
     * @see setTeamProperty
     * @param {string} notify.teamID
     * @param {number} notify.userID
     * @param {String} notify.teamUserProfile
     */
    setTeamUserProfileNotify(notify): void
```

## 队伍成员属性

#### setTeamUserProfile

设置小队中自己的私有属性,主体是队伍成员,对其他成员可见

```typescript
    /**
     * 设置小队中自己的私有属性,主体是队伍成员,对其他成员可见
     * @see {string} setTeamProperty
     * @param userProfile
     * @returns {number}
     */
    setTeamUserProfile (userProfile:string):number;
```
#### setTeamUserProfileResponse

```typescript
    /**
     * @see setTeamUserProfile
     * @param {number} rsp.status
     * @param {string} rsp.teamID
     * @param {number} rsp.userID
     * @param {String} rsp.teamProperty
     */
    setTeamUserProfileResponse(rsp):void
```
#### setTeamPropertyNotify

```typescript
    /**
     * @see setTeamUserProfile
     * @param {string} notify.teamID
     * @param {number} notify.userID
     * @param {String} notify.teamProperty
     */
    setTeamPropertyNotify(notify): void
```
## 掉线异常处理

#### teamNetworkStateNotify

当队伍中有成员与服务器断开连接时回调

```typescript
/**
 * 当队伍中有成员与服务器断开连接时,回调
 * @param notify
 * @param {number} notify.userID 掉线的userID
 */
teamNetworkStateNotify(notify:any);
```

#### setTeamReconnectTimeout

有必要重连时, 在login后调用此函数

```typescript
    /**
     * 设置组队匹配断线后允许的重连进入小队的时间, 单位秒,范围(1~60)
     * @param {number} timeout 单位秒
     */
    setTeamReconnectTimeout (timeout:number):number;
    
    /**
     * @see setTeamReconnectTimeout
     * @param {number} status 200表示成功
     */
    setTeamReconnectTimeoutResponse(status:number);
```