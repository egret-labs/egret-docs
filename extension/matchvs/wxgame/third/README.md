Matchvs 服务器会通过注册接口下发“用于在服务器校验的 userID”，开发者在使用时，可将此 userID 与自己游戏的玩家ID进行绑定。

第三方绑定是指：使用其他的 **用户身份代号** 与Matchvs平台的userID做映射。以实现使用 **用户身份代号** 就能获取 Matchvs 对应平台的 userID 。比如：身份证号，手机号，qq 号等等。



#### 为什么要使用第三方绑定？

开发者使用Matchvs服务的时候，每次都要调用 register 接口注册一个 userID，虽然这个 userID 信息会暂时保存在平台的缓存数据中，但是一旦清理掉了，这个 userID 就会变化。如果想长久的使用一个固定的 userID 就需要开发者使用一个 用户身份识别号与 Matchvs 的userID 映射起来。每次开始游戏前获得这个 userID。

为了方便开发者使用，Matchvs 提供了第三方绑定功能。开发者可以直接调用绑定接口，传入 openID  即可获取绑定后的 Matchvs userID 。如果开发者使用绑定接口，则无需再调用注册接口获取 userID。 



## 获取 openID

#### openID 是什么？

openID 可以理解为一个在某个系统或者软件中用来识别用户身份的唯一值（身份识别号），可能在其他平台不叫openID，但只要是可以用来对应一个用户即可。这个值可以来源其他的系统或者平台，也可以由开发者自己去定义，可以是手机号码，也可以是身份证号码。比如：你可以获取微信平台用户的openID，也可以是 QQ 平台的 qq号等等。如果不获取其他平台的 openID 也可以自己去实现一套身份定义的openID，你甚至可以使用 1, 2，3 等这样的数据。最终使用什么什么样的数据来 当做 openID 由开发者自己决定。

**提示：** 如果开发者有自己服务器，并且有服务器开发相关技术，也可以自己实现一套 openID 服务来映射Matchvs 的 userID。



#### 获取微信平台 openID 示例：

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

> 注意：微信平台 openID 获取方法以 微信开发者官网的文档为准，这里只是提供示例。



## 调用绑定接口

获取到微信用户信息和 openID后， 再调用 matchvs 第三方账号绑定接口获取 Matchvs 用户信息。

代码示例

```javaScript
    /**
     * 绑定微信OpenID 返回用户信息
     */
    bindOpenIDWithUserID:function(wxUserInfo){
        let self = this;
        console.log("获取到的微信用户信息",wxUserInfo);
        if(!wxUserInfo){
            return;
        }
        console.log('openid:'+wxUserInfo.openInfos.data.openid);
        if (wxUserInfo.openInfos.data.openid === undefined) {
            console.warn("没有获取到微信OpenID，获取OpenID请参考："+'http://www.matchvs.com/service?page=third');
            engine.prototype.registerUser();
            return;
        }
        GLB.name = wxUserInfo.nickName;
        GLB.avatar = wxUserInfo.avatarUrl;
        GLB.isWX = true;
        let req = new  XMLHttpRequest();
        let reqUrl = this.getBindOpenIDAddr(GLB.channel,GLB.platform);
        req.open("post",reqUrl , true);
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function () {
            if (req.readyState === 4 && (req.status >= 200 && req.status < 400)) {
                try{
                    let response = req.responseText;
                    let data = JSON.parse(response).data;
                    console.log(data.userid,data.token);
                    self.login(data.userid,data.token);
                } catch(error){
                    console.warn(error.message);
                    engine.prototype.registerUser();
                }
            }
        };
        let params = "gameID="+GLB.gameID+"&openID="+wxUserInfo.openInfos.data.openid+"&session="+wxUserInfo.openInfos.data.session_key+"&thirdFlag=1";
        //计算签名
        let signstr = this.getSign(params);
        let jsonParam ={
            userID:0,
            gameID:GLB.gameID,
            openID:wxUserInfo.openInfos.data.openid,
            session:wxUserInfo.openInfos.data.session_key,
            thirdFlag:1,
            sign:signstr
        };
        req.send(jsonParam);
    },

    getBindOpenIDAddr :function(channel, platform){
        if(channel === "MatchVS" || channel === "Matchvs"){
            if(platform === "release"){
                return "http://vsuser.matchvs.com/wc6/thirdBind.do?"
            }else if(platform === "alpha"){
                return "http://alphavsuser.matchvs.com/wc6/thirdBind.do?";
            }
        }else if(channel === "MatchVS-Test1"){
            if(platform === "release"){
                return "http://zwuser.matchvs.com/wc6/thirdBind.do?"
            }else if(platform === "alpha"){
                return "http://alphazwuser.matchvs.com/wc6/thirdBind.do?";
            }
        }
    },

    getSign:function(params){
        let str = GLB.appKey+"&"+params+"&"+GLB.secret;
        console.log(str);
        let md5Str = hex_md5(str);
        console.log(md5Str);
        return md5Str;
    },

```


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

> sign 计算方式：md5(appKey&gameID=value1&openID=value2&session=value3&thirdFlag=value4&appSecret)得到的md5值就是 sign参数的值。这个签名是取 32 为的 小写字符。
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

#### 什么是有效信息安全验证？

在使用第三方绑定接口的使用，参数中传入的 openID 默认是不会做任何的验证，就是是传的 0 也是可以的。我们同样会返回一个有效的 userID。开发者如果想要对这个 openID 进行验证，比如验证这个openID是不是合法的，验证这个openID是不是你这个游戏中的openID。对这个 openID 进行一次检查，把哪些无用的openID 过滤掉。



#### 如果在 Matchvs 第三方绑定使用安全校验？

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
