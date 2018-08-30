如何使用微信社交开放能力与Matchvs游戏云,实邀约微信好友进行游戏实时对战
## 流程图  

 

![wxdev-groupplay](http://imgs.matchvs.com/static/wx/wxdev-groupplay.png)

流程:
1. 创建房间
2. 微信分享房间ID
3. 通过房间ID配对游戏
4. 保存游戏结果,解散房间

流程图例:

 ** 下方通过第三方游戏截图举例说明实现创建房间、发送邀请、邀请好友、配对成功的界面效果，仅供开发者参考。

1.创建房间![1.创建房间](http://imgs.matchvs.com/static/wx/C81D251CF07E90BB2774CBD25F6F00B3.png)

2.发送邀请![2.发送邀请](http://imgs.matchvs.com/static/wx/53DA0BB8D7C889D2D30A912DA11C5FC8.png)

3.邀请好友![3.邀请好友](http://imgs.matchvs.com/static/wx/92970AA2A099B543C9D17E3ACAECA903.png)

4.配对成功![4.配对成功](http://imgs.matchvs.com/static/wx/3D668EFE39A63750670CD26970957EC9.png)

## 创建房间

利用Matchvs提供联网SDK创建房间

> Matchvs.creatRoom()

开发者通过这个API能得到一串RoomID,再通过微信去分享发送给好友或者群

## 加入房间

> Matchvs.joinRoomSpecial(RoomID)

好友点击微信分享的链接进入小游戏后,拿到RoomID(如何拿RoomID,见后文),再通过这个API进入指定房间开始对战游戏

[详细内容](http://www.matchvs.com/service?page=APIJavaScript)

## 微信社交分享传播RoomID

通过微信好友/群 分享小游戏, 携带参数. 实现约战功能,
主要功能点
1. 通过`onShareAppMessage` 函数设置 需要传递的参数 `query`
2. 通过 `wx.getLaunchOptionsSync()` 获取传递到小游戏中的参数

关键字 `onShareAppMessage` , `query` ,`wx.getLaunchOptionsSync()`

### wx.onShareAppMessage(function callback)

简介如下:

---


### wx.onShareAppMessage(function callback)

监听用户点击右上角菜单的“转发”按钮时触发的事件

#### 参数

#### function callback

监听事件的回调函数

#### callback 回调函数


##### 参数


###### Object res

| 属性            | 类型                                       | 说明                                       | 
| ------------- | ---------------------------------------- | ---------------------------------------- | 
| shareTickets  | Array.< string>                           | 每一项是一个 String 类型的 ShareTicket ，对应每个群。如果此次转发是带 shareTicket 的转发则会有回调此参数。可作为 wx.getShareInfo() 的参数来获取群 id |      
| groupMsgInfos | Array.< GroupMsgInfo> | 群消息票据信息列表，长度与 res.shareTickets 相等        |      

##### 返回值

###### ShareOption

| 属性       | 类型       | 说明                                       |
| -------- | -------- | ---------------------------------------- |
| title    | string   | 转发标题，不传则默认使用当前小游戏的昵称。                    |
| imageUrl | string   | 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。 |
| query    | string   | 查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 wx.onLaunch() 或 wx.onShow 获取启动参数中的 query。 |
| success  | function | 转发成功的回调函数                                |
| fail     | function | 转发失败的回调函数                                |
| complete | function | 转发完成的回调函数                                |


[More...](https://mp.weixin.qq.com/debug/wxagame/dev/document/share/wx.onShareAppMessage.html?t=201822)

### wx.onShow(function callback)

API简介如下

---

### wx.onShow(function callback)

监听小游戏回到前台的事件

#### 参数

##### function callback

监听事件的回调函数

#### callback 回调函数

##### 参数

###### Object res

| 属性          | 类型     | 说明          | 
| ----------- | ------ | ----------- | 
| scene       | string | 场景值         |      
| query       | Object | 查询参数        |      
| shareTicket | string | shareTicket |      

[More...](https://mp.weixin.qq.com/debug/wxagame/dev/document/system/life-cycle/wx.getLaunchOptionsSync.html?t=201822)

---

微信小程序分享示例代码:
``` JavaScript
//index.js

//获取应用实例

const app = getApp()
var getCurrentPage =function(){
	return getCurrentPages()[0];
}

var updateLog = function(value){
	console.log("[updateView]:" +"->"+value);
	getCurrentPage().setData({ log: value })
}

Page({

	onShareAppMessage: function (res) {
	console.log("onShareAppMessage");
	return {
		title: '自定义转发标题',
		path: '/page/user?queryId=123',
		success: function (res) {
		updateLog("share resutlt: " + res.errMsg);
	},
	fail(res){
		updateLog("share resutlt: " + res.errMsg);
		}
	}
	},

	data: {
		motto: '点我开启群发能力',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		log:"log"
	},

	bindViewTap2:function(){
		wx.getShareInfo({
		shareTicket: "shareTicket",
		success(e) {
			updateLog(+ e.errMsg);
		},
		fail(e){
			updateLog(e.errMsg);
		}
		});
	},

//事件处理函数
	bindViewTap: function() {
		this.setData({ motto: "点击 屏幕右上角 '三个点' 可群发" })
		wx.showShareMenu();
		wx.updateShareMenu({
		withShareTicket: true,//开启群发
		success:function(){
				console.log("updateShareMenu success");
		},
		fail:function(e){
				console.log("updateShareMenu fail"+e.toString());
		}
	});
	//only for Game API
	// wx.shareAppMessage({
	// title: '转发标题'
	// })
	}
})
```


