Matchvs 提供注册、登录、随机匹配、发送消息、离开房间、登出等基础的联网游戏服务功能。还提供自定义属性匹配、主动创建房间、加入指定房间、获取房间列表、查看房间详情、踢人、修改房间属性等扩展功能。

## 自定义属性匹配

Matchvs提供了属性匹配功能，开发者可以利用该功能实现各种自定义的规则匹配。

- 属性匹配机制：开发者可以将需要使用的匹配参数例如 “等级：5-10 ” “地图 ： A” 以 key-value 的方式填至 `matchInfo`，Matchvs 将会严格对比各个玩家携带的 `matchInfo`，然后将`matchInfo`一致的用户匹配到一起。如果用户当前匹配不到合适的对象，Matchvs 会创建一个房间给该用户。如果开发者想扩大范围再次进行匹配，可以退出当前房间，修改`matchInfo`，然后发起匹配。如果开发者希望将用户的个人信息（比如：昵称、等级）广播给成功匹配到的房间成员，可以将这些信息填至`userProfile` 。Matchvs会在每一个成员加入房间时将成员信息广播给当前房间成员，同时将已有成员的信息通知给新加入成员。

> **注意** 属性匹配不会匹配到客户端主动创建（通过`createRoom()`创建）的房间里。

在登录以后进行自定义属性匹配：

```javascript
engine.joinRoomWithProperties(MsMatchInfo, userProfile);
```

参数说明:

| 参数        | 含义                                                         |
| ----------- | ------------------------------------------------------------ |
| MsMatchInfo | maxPlayer:最大玩家数;<br />mode:模式;<br />canWatch:是否可以观战<br>tags:匹配属性值 |
| userProfile | 玩家简介，可以填写昵称、段位等信息                           |

tags: 匹配时的标签，值的格式为 key:value 形式，例如：{title:"matchvs", map:"mapA", grade:20}。

`mode`代表同一个游戏里的不同模式，如”3V3模式“，”5V5模式“，携带不同`mode`的玩家将不会被匹配到一起。

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
reponse.joinRoomNotify = function(roomId, roomUserInfo) {
	console.log("房间号：", roomId);
	console.log("房间新加的用户的信息：", roomUserInfo);
}
```

> **注意** 如果开发者想用户匹配成功后可查看对方信息，可以通过填充`userProfile`的方式，将当前用户的头像昵称信息填充至`userProfile`，Matchvs会在匹配成功时将`userProfile`广播给所有用户。 

## 创建房间

Matchvs提供了创建房间的功能，开发者可以从客户端主动创建一个房间。

玩家创建房间后，Matchvs 会将该玩家自动加入此房间，该玩家即是房主。如果房主离开了房间，Matchvs会随机指定下一个房主并通知给房间所有成员。

在创建房间的时候可以指定该房间的属性，比如房间地图、房间人数等，根据属性匹配相同属性的用户。

> **注意**  玩家主动创建的房间和Matchvs 创建的房间是分开的。玩家通过随机匹配或者属性匹配无法匹配到主动创建的房间里。

```javascript
engine.createRoom(CreateRoomInfo, userProfile);
```

参数说明:

| 参数             | 含义                                       |
| -------------- | ---------------------------------------- |
| CreateRoomInfo | name:房间名;<br />maxPlayer:最大玩家数;<br />mode:模式;<br />canWatch:是否可以观战;<br />visibility:是否可见;<br />roomProperty:房间属性 |
| userProfile    | 玩家简介，可以填写昵称、段位等信息                        |

创建房间的回调：

```javascript
response.createRoomResponse = function(rsp) {
	console.log("创建房间结果：", rsp.status);
	console.log("创建的房间号：", rsp.roomId);
}
```

> **注意** 如果开发者想用户匹配成功后可查看对方信息，可以通过填充`userProfile`的方式，将当前用户的头像昵称信息填充至`userProfile`，Matchvs会在匹配成功时将`userProfile`广播给所有用户。 

## 查看房间列表

Matchvs提供了获取房间列表的功能，该列表为用户主动创建的房间列表。

开发者可以通过房间属性过滤获取房间列表。比如只想获取地图为A的所有房间列表，可以将地图A作为过滤条件来获取列表。

```javascript
engine.getRoomList(RoomFilter);
```

参数说明:

| 参数         | 含义                                       |
| ---------- | ---------------------------------------- |
| RoomFilter | maxPlayer:最大玩家数;<br />mode:模式;<br />canWatch:是否可以观战 |

查看房间列表的回调：

```javascript
response.getRoomListResponse = function(status, roomInfos) {
	console.log("查看房间列表结果：", status);
    for (var i = 0 ; i < roomInfos.length; i++) {
      console.log("房间列表：", roomInfos[i].roomId);
    }
}
```

## 查看房间列表-扩展

Matchvs提供了获取房间列表的功能，该列表为用户主动创建（通过调用`createRoom()` 创建）的房间列表。

房间列表里会提供房间的部分信息：房间最大人数、房间当前已有人数、房间状态（开放或关闭）等信息。

房间状态指的是该房间有没有被`JoinOver` ，如果房间内调用过`JoinOver()` ，则房间状态为关闭；否则房间为开放状态（即使此时房间已满）。

你可以定义获取房间的类型和序列，比如获取 “未满且未关闭的所有房间，按照当前人数降序排列”。

你也可以通过房间属性过滤获取房间列表。比如只想获取地图为A的所有房间列表，可以将包含地图A的完整房间属性作为过滤条件来获取列表。

## 获取房间详情

Matchvs 提供了获取房间详情的接口，你可以在加入房间之后随时获取房间当前的各种状态：房间成员列表、成员简介、房间状态等。

每次调用接口获取的是该房间的全部信息，该接口在客户端和gameServer均可以被调用。

房间状态指的是该房间有没有被`JoinOver` ，如果房间内调用过`JoinOver()` ，则房间状态为关闭；否则房间为开放状态（即使此时房间已满）。

## 修改房间属性

当玩家进入房间后，可以通过“房间属性”来记录共享信息，比如玩家序列、房间地图等。

修改房间属性后，其他玩家会收到修改通知。

当新玩家进入房间时，修改后的房间属性也会通知给他。

修改房间属性后，获取到的房间列表里的属性也会随之相应修改。

## 加入指定房间

Matchvs提供了加入指定房间的功能，在获取到房间ID后即可以通过此接口加入该房间。

**例如** 如果玩家希望和好友一起游戏，则可以创建一个房间后，将该房间ID发给好友，好友通过该ID进入房间。

```javascript
engine.joinRoom(roomId, userProfile);
```

参数说明:

| 参数          | 含义                |
| ----------- | ----------------- |
| roomId      | 房间号               |
| userProfile | 玩家简介，可以填写昵称、段位等信息 |

加入房间的回调：

```javascript
response.joinRoomResponse = function(status, roomUserInfoList, roomInfo) {
	console.log("加入房间结果：", status);
	console.log("房间用户列表：", roomUserInfoList);
	console.log("房间信息：", roomInfo);
}
```

其他玩家加入房间的回调：

```javascript
reponse.joinRoomNotify = function(roomId, roomUserInfo) {
	console.log("房间号：", roomId);
	console.log("房间新加的用户的信息：", roomUserInfo);
}
```

> **注意** 如果开发者想用户匹配成功后可查看对方信息，可以通过填充`userProfile`的方式，将当前用户的头像昵称信息填充至`userProfile`，Matchvs会在匹配成功时将`userProfile`广播给所有用户。 

## 踢人

Matchvs提供了踢人的功能，玩家可以把房间内的玩家踢出房间。

**例如** 如果玩家希望和好友一起游戏，则可以创建一个房间后，把非好友踢出房间。

```
engine.kickPlayer(userID, cpProto);
```

参数说明:

| 参数      | 含义    |
| ------- | ----- |
| userId  | 用户id  |
| cpProto | 自定义数据 |

踢人的应答：

```
response.kickPlayerResponse = function (rsp) {
	this.labelLog('kickPlayerResponse:' + JSON.stringify(rsp));
	var status = rsp.status;
	if (status !== 200) {
	return this.labelLog('踢人失败,异步回调错误码: ' + status);
	} else {

	}
}
```

通知房间内其它玩家踢人的回调：

```
response.joinRoomNotify = function (rsp) {
    this.labelLog('joinRoomNotify:' + JSON.stringify(rsp));
    if (this.labelUserID1.string === '') {
        this.labelUserID1.string = rsp.userID;
    } else if (this.labelUserID2.string === '') {
        this.labelUserID2.string = rsp.userID;
    } else if (this.labelUserID3.string === '') {
        this.labelUserID3.string = rsp.userID;
    }
}
```

> **注意** 如果开发者想让房间内的其他玩家知道谁被踢了，可以通过joinRoomNotify来通知。

## 订阅组

Matchvs提供了订阅组的功能，开发者可以给订阅指定组的玩家发消息。

**例如** 如果开发者只想给地图上的某部分玩家发消息，可以让这部分玩家订阅组即可。

```
engine.subscribeEventGroup([subscribe], [unsubscribe])
```

参数说明:

| 参数          | 含义    |
| ----------- | ----- |
| subscribe   | 订阅组   |
| unsubscribe | 取消订阅组 |

订阅组的应答：

```
response.subscribeEventGroupResponse = function (status,groups) {
	this.labelLog("[Rsp]subscribeEventGroupResponse:status="+ status+" groups="+ groups);
},
```

> **注意** 开发者可以通过该接口同时订阅和取消订阅组，只需在subscribe和unsubscribe填入正确的参数即可。

## 发送组消息

Matchvs提供了发送组消息的功能，开发者可以给订阅指定组的玩家发消息。

**例如** 如果开发者只想给地图上的某部分玩家发消息，可以让这部分玩家订阅组并根据组给这部分玩家发消息即可。

```
engine.sendEventGroup(cpProto, [group])
```

参数说明:

| 参数      | 含义     |
| ------- | ------ |
| cpProto | 自定义消息  |
| group   | 发送的组列表 |

发送组消息的应答：

```
response.sendEventGroupResponse = function (status, dstNum) {
	this.labelLog("[Rsp]sendEventGroupResponse:status="+ status+" dstNum=" + dstNum);
}
```

其他玩家收到组消息的回调：

```
response.sendEventNotify = function (info) {
    this.labelLog("[Rsp]sendEventNotify:message="+ info.cpProto);
}
```

> **注意** 开发者可以通过该接口给多个组发消息，只需在group数组里添加多个组即可。

## 帧同步

Matchvs提供了帧同步的功能，开发者可以让房间内的玩家保持帧同步。
Matchvs 所提供的帧同步能力，让您可以根据游戏需要，直接设置同步帧率，比如10帧每秒，然后您可以调用发送帧同步数据的接口来发送逻辑帧数据。
Matchvs 会缓存每100毫秒的数据，将这100毫秒的数据作为一帧发给各个客户端。

![](http://imgs.matchvs.com/static/frame.png)


```
engine.setFrameSync(frameRate)
```

参数说明:

| 参数        | 含义       |
| --------- | -------- |
| frameRate | 每秒钟同步的帧数 |

设置帧同步的应答：

```
response.setFrameSyncResponse = function (rsp) {
	this.labelLog('setFrameSyncResponse, rsp.mStatus=' + rsp.mStatus);
	if (rsp.mStatus !== 200) {
		this.labelLog('设置同步帧率失败，rsp.mStatus=' + rsp.mStatus);
	} else {
		this.labelLog('设置同步帧率成功, 帧率为:' + GLB.FRAME_RATE);
	}
}
```

房间内玩家收到帧同步的回调：

```
frameUdpate: function(frameIndex, frameWaitCount, FrameItems) {
	for (var i = 0 ; i < FrameItems.length; i++) {
		var info = FrameItems[i];
		if (info && info.cpProto) {
			this.labelLog("消息内容:" + info.cpProto);
		}
	}
}
```

**注意** 开发者需要在客户端保持帧同步的状态，服务器不会保存。