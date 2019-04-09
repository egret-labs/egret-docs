如何使用微信社交开放能力与Matchvs游戏云,邀约微信好友进行游戏实时对战?

如何使用实现输入指定6位数短号加入房间?

如何使用H5端玩家输入指定6位数短号与微信小游戏玩家约战?

## 流程图

 

![wxdev-groupplay](http://imgs.matchvs.com/static/wx/wxdev-groupplay.png)

流程:
1. 邀请者创建房间
2. 邀请者微信分享房间短号
3. 被邀请者通过房间短号进入相同房间进行游戏
4. 保存游戏结果,解散房间

流程图例:

 ** 下方通过第三方游戏截图举例说明实现创建房间、发送邀请、邀请好友、配对成功的界面效果，仅供开发者参考。

1.创建房间![1.创建房间](http://imgs.matchvs.com/static/wx/C81D251CF07E90BB2774CBD25F6F00B3.png)

2.发送邀请![2.发送邀请](http://imgs.matchvs.com/static/wx/53DA0BB8D7C889D2D30A912DA11C5FC8.png)

3.邀请好友![3.邀请好友](http://imgs.matchvs.com/static/wx/92970AA2A099B543C9D17E3ACAECA903.png)

4.配对成功![4.配对成功](http://imgs.matchvs.com/static/wx/3D668EFE39A63750670CD26970957EC9.png)

## 邀请者创建房间

利用Matchvs提供联网SDK创建房间

```typescript
joinRoomWithProperties(matchinfo:MsMatchInfo, userProfile:string):number
```

该API可以指定一个标识来创建或者加入(如果房间已经被创建)房间.
> 示例程序本文末尾.MsMatchInfo中的tags属性可以实现房间短号

开发者通过这个API能得到一串RoomID,再通过微信去分享发送给好友或者微信群

## 被邀请者加入房间

好友点击微信分享的链接进入小游戏后,拿到RoomID(如何拿RoomID,见后文),再通过如下API进入指定房间开始对战游戏
```typescript
joinRoomWithProperties(matchinfo:MsMatchInfo, userProfile:string):number
```

细心的人应该发现他们是同一个API . 这样没有房间解散的问题.

[API手册](../../api/)

## 微信社交分享传播RoomID

微信分享功能的实现步骤如下

1. 通过`shareAppMessage` 函数传递的参数 `query` 给被邀请者
2. 通过 `wx.getLaunchOptionsSync()`或者` wx.onShow() `获取传递到小游戏中的参数

关键字 `shareAppMessage` , `query` ,`wx.getLaunchOptionsSync()`,`wx.onShow()`


> 具体参考
[More...](https://mp.weixin.qq.com/debug/wxagame/dev/document/system/life-cycle/wx.getLaunchOptionsSync.html?t=201822)

---
游侠姐妹完整的实现了微信约战的流程,并处理了微信切后台等一系列异常情况 , 具有参考价值

> 完整代码见:Lobby.ts
> https://github.com/matchvs/Ranger/blob/master/Ranger/src/scene/Lobby.ts

关键代码:

- 分享房间短号
 ```JavaScript
 	public joinRoomWithPassWord() {
		var maxPlayer = 2;
		var mode = 0;
		var canwatch = 1;
		let userProfile = GameData.userName + "";
		var tags = { key: this.getPassWord() };
		var matchinfo = new MsMatchInfo(maxPlayer, mode, canwatch, tags);

		let result = MvsManager.getInstance().joinRoomWithProperties(matchinfo, userProfile);
		if (result != 0) {
			Toast.show("已经创建了房间 ");
		} else {
			Toast.show("创建房间成功 ");
			var stack: any = this.findChild("stack");
			stack.selectedIndex = 1;
			this.roomstate.visible = true;
		}
	}
 ```

- 获取微信分享中的房间短号,使用房间短号进入房间

``` JavaScript
private isFromShareJoin() {
		var isFromShare = GameData.query;
		if (isFromShare && JSON.stringify(isFromShare) != "{}") {
			this.roomShortID.text = isFromShare ? GameData.query.password : this.password.text;
			Toast.show("约战成功,正在进入房间:" + this.roomShortID.text);
			this.onClick(this.joinRoomWithID.name, this.joinRoomWithID);
		} else {
			console.log('[INFO] wx.share.query is null');
			GameData.query = {};
		}
	}
	private onWXShow = function (res) {
		GameData.shareTicket = res.shareTicket;
		GameData.query = res.query;
		this.isFromShareJoin();
	}.bind(this);
```


