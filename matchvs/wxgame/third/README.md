Matchvs 服务器会通过注册接口下发“用于在服务器校验的 userID”，开发者在使用时，可将此 userID 与自己游戏的玩家ID进行绑定。

为了方便开发者使用，Matchvs 提供了第三方绑定功能。开发者可以直接调用绑定接口，传入 openID  即可获取绑定后的 Matchvs userID 。如果开发者使用绑定接口，则无需再调用注册接口获取 userID。  

## 获取 openID

- 调用 `wx.login `接口获取 code 参数。示例代码如下：  

```JavaScript
function getUserOpenID(obj) {
    var callObj = obj;
	if( typeof(wx) == "undefined"){
		return;
	}
    wx.login({
        success: function (res) {
            var wcode = res.code;
            console.info("you code"+wcode);
            // 使用 code 请求你的 获取openID的服务
        },
        fail: function (res) {
            console.log("get code failed:",res);
        },
    });
}
```

- 调用 `code2accessToken` 接口获取openID ，获取openID 操作最好是在自己的服务端接口获取，然后再返回。 `code2accessToken` 这个接口需要你的微信小游戏 secret。获取openID 示例：

```javascript
wx.request({
    url: "这个是您的获取 openID 地址接口",
    method: "GET",
    data: {
        code: wcode//这个是您的接口参数 code 是wx.login 返回的
    },
    success: function (res) {
        console.info("获取到openID 和 session_key");
    },
    fail:function(res){
        console.info("getOpenID failed");
    }
});
```



获取 openID 可参考 [微信小游戏开发文档](https://developers.weixin.qq.com/minigame/dev/document/open-api/login/wx.login.html) `code2accessToken` 接口和 `wx.login` 接口。



## 调用绑定接口

获取到微信用户信息和 openID后， 再调用 matchvs 第三方账号绑定接口获取 Matchvs 用户信息。

这里以 egret 代码请求为例：

```typescript
/**
 * 绑定微信OpenID 返回用户信息
 * @param wxUserInfo 获取的 openID 信息和 微信的 userInfo
 */
private static bindOpenIDWithUserID(wxUserInfo:any){
    console.log("获取到的微信用户信息",wxUserInfo);
    let reqUrl = "http://vsuser.matchvs.com/wc6/thirdBind.do?";
    let appKey = "xxxxxxxxxx";
    let secretKey = "xxxxxxxxxx";
    //sign=md5(appKey&gameID=value1&openID=value2&session=value3&thirdFlag=value4&appSecret)
    let params = appKey+"&gameID="+GameData.gameID+"&openID="+wxUserInfo.openInfo.openid+"&session="+wxUserInfo.openInfo.session_key+"&thirdFlag=1&"+secretKey;
    //计算签名
    let signstr = md5(params);//MD5 需要自己找方法
    //重组参数 userID 传0
    //用于post请求，不能使用get请求，如果使用get请求可能会出现签名失败，因为微信session_key有需要url编码的字符
    let jsonParam = {
        userID:0,
        gameID:GameData.gameID,
        openID:wxUserInfo.openInfo.openid,
        session:wxUserInfo.openInfo.session_key,
        thirdFlag:1,
        sign:signstr
    };
    var request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(reqUrl,egret.HttpMethod.POST);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(jsonParam);
    
    request.addEventListener(egret.Event.COMPLETE,(event:egret.Event)=>{
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("bindOpenIDWithUserID get data : ",request.response);
        let repData = JSON.parse(request.response);
        console.log("bindOpenIDWithUserID repData : ",repData);
        //绑定成功
        if( repData.status == 0){
            //绑定成功就会返回 userID等信息
            let id = repData.data.userid;
            let name = wxUserInfo.userInfo.nickName;
            let avatar = wxUserInfo.userInfo.avatarUrl;
            let token = repData.data.token;
            //绑定成功就可以登录 matchvs
        }
    },this);
}
```

> 注意：调用第三方绑定接口请求参数 userID 传 0，如果是第一次绑定，接口会返回新的Matchvs userID ，如果已经绑定过，接口会返回您绑定了的Matchvs userID 信息。

## thirdBind.do 

第三方绑定接口，传入您的唯一身份识别号和一个session_key 实现 userID绑定。

#### 请求地址

- release: https://vsuser.matchvs.com/wc6/thirdBind.do?
- alpha : http://alphavsuser.matchvs.com/wc6/thirdBind.do?

#### 请求参数

| 参数      | 类型   | 默认值 | 是否必填 | 说明                 |
| --------- | ------ | ------ | -------- | -------------------- |
| userID    | number | 0      | 是       | 用户ID默认填0        |
| gameID    | number |        | 是       | 你注册的游戏ID       |
| openID    | string |        | 是       | 获取第三方唯一认证号 |
| session   | string |        | 是       | 校验值               |
| thirdFlag | number |        | 是       | 1-微信               |
| sign      | string |        | 是       | 参数签名             |

> sign 计算方式：md5(appKey&gameID=value1&openID=value2&session=value3&thirdFlag=value4&appSecret)得到的md5值就是 sign参数的值。
>
> appkey 和 appSecret 是在 matchvs 官网创建游戏时的信息。

#### 返回参数

| 参数   | 类型        | 说明                      |
| ------ | ----------- | ------------------------- |
| data   | json object | 接口返回数据              |
| status | int         | 请求状态值 0-成功 1- 失败 |

- data

| 参数     | 类型   | 说明       |
| -------- | ------ | ---------- |
| avatar   | string | 头像       |
| deviceid | string | 设备ID     |
| gender   | int    | 暂无说明   |
| mac      | string | mac 地址   |
| nickname | string | 昵称       |
| regTime  | string | 注册时间   |
| token    | string | 用户校验值 |
| userid   | int    | 用户ID     |

返回示例：

```json
{
  "data": {
    "avatar": "http://pic.vszone.cn/upload/avatar/1464079975.png",
    "deviceid": "xxxxxxxxxxxxxxxxxxx",
    "gender": 0,
    "mac": "xxxxxxxxxxxxxxxx",
    "nickname": "玩家sVFaYktf",
    "regTime": "2018-06-12 17:51:57",
    "token": "xxxxxxxxxxxxxxxxxxxx",
    "userid": 3308792
  },
  "status": 0
}
```

statue 非零

| 参数 | 含义                   | 类型 |
| ---- | ---------------------- | ---- |
| 200  | 其它错误               | 整型 |
| 7000 | 非法参数               | 整型 |
| 7001 | 查询checkURL失败       | 整型 |
| 7002 | session检查失败        | 整型 |
| 7003 | 查询绑定关系失败       | 整型 |
| 7004 | 绑定注册新用户失败     | 整型 |
| 7005 | 建立第三方绑定关系失败 | 整型 |



## 有效信息验证

在调用 `thirdBind.do ` 接口时，传入的 openID 可以进行有效性检测，即验证 openID 是否合法，确保信息安全。官网-> 控制台->我的游戏->设置-> 安全校验 配置有效性检测的接口地址。

![](http://imgs.matchvs.com/static/node/bind3.png)

![](http://imgs.matchvs.com/static/node/bind2.png)

**注意：安全校验接口需要开发者自己实现，接口规范见下方。**

**配置好回调地址后，调用 `thirdBind.do`  就会回调这个地址检测 openID 信息是否有效。**

**如果没有配置 安全校验是不校验的。**

### 安全校验接口要求如下：

- 请求 method: POST
- Content-Type: application/json 
- 请求参数：

```json
{
    "thirdFlag": 1,
    "openID": "0123456789ABCDEF",
    "session": "123reqafg9dfa0tja"
}
```

- 返回参数：

```json
{
    "data": {
        "result": 0
    },
    "status": 0
}
```

> 返回参数 data.result = 0 表验证通过，其他值标识验证失败。



有关第三方绑定使用方法，可以参考我们的 [Demo](https://github.com/matchvs/demo-Egret) 
