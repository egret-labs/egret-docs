

# 数据存储

Matchvs 给开发者提供了三种存储接口：用户数据存储、全局数据存储、哈希存储。

三种数据存储的特点及对比如下：

- 用户数据存储，存储用户数据，只有用户自己有增、删、改、查自己数据的权限
- 全局数据存储，推荐在 gameServer 里使用，存储游戏全局数据。客户端也可以使用。
- 哈希存储，数据操作会校验userID，但用户之间可以修改和查看数据。

**注意：使用存储接口前，须先调用初始化、注册接口获取userID，token 。**

## 存储限制

每个游戏通过各种存储接口所存的数据总容量不可以超过5G，如果超过，服务端会返回对应错误。

## 域名

Matchvs 环境分为测试环境（alpha）和 正式环境（release），所以在使用http接口时，需要通过域名进行区分。使用正式环境需要先在[官网控制台](http://www.matchvs.com/manage/gameContentList)将您的游戏发布上线。

**alpha环境域名：alphavsopen.matchvs.com**

**release环境域名：vsopen.matchvs.com**



## 存用户数据

存储接口 ： **wc5/setUserData.do**

开发者可以通过调用该接口将用户自定义的数据存储至服务器。

```
http://alphavsopen.matchvs.com/wc5/setUserData.do?gameID=200660&userID=21023&dataList=[
{"key":"Johnuser", "value":"Smith"}]&sign=f6c15ebd1957a7616781b20fc150f4aa 
```

**注意：** 每个value的长度上限为1M，如果长度超过1M，会返回“长度超过限制”的错误。存储上限为每个游戏5G，如果超过5G，会返回对应错误。

可以调用setUserData实现增量存储。为避免特殊字符影响，存储前，建议开发者最好将字符串解码成二进制再用UrlEndcode编码后存储。

| 参数名      | 说明                         |
| -------- | -------------------------- |
| gameID   | 游戏ID                       |
| userID   | 用户ID                       |
| dataList | 自定义存储json数组，包括字段的key和value |
| sign     | 见下方sign值获取方法-用户               |

返回数据示例如下：

```
{
    "data": "success",
    "status": 0
}
```



## 取用户数据

获取接口 ： **wc5/getUserData.do**

开发者可以通过调用该接口获取用户自定义存储的数据。

```
http://alphavsopen.matchvs.com/wc5/getUserData.do?gameID=200660&userID=21023&keyList=[
{"key":"Johnuser"}]&sign=f6c15ebd1957a7616781b20fc150f4aa 
```

**注意：** 存储前，如果将字符串解码成二进制再用UrlEndcode编码后存储，对应的取出时应用UrlDecode进行解码后显示

| 参数名     | 说明           |
| ------- | ------------ |
| gameID  | 游戏ID         |
| userID  | 用户ID         |
| keyList | 需要取的数据对应的键列表 |
| sign    | 见下方sign值获取方法-用户 |

返回数据示例如下：

```
{
    "data": {
        "dataList": [
            {
                "key": "Johnuser",
                "value": "Smith"
            }
        ]
    },
    "status": 0
}
```

## 删用户数据

删除接口 ： **wc5/delUserData.do**

开发者可以通过调用该接口删除用户自定义存储的数据。

```
http://alphavsopen.matchvs.com/wc5/delUserData.do?gameID=200660&userID=21023&keyList=[
{"key":"Johnuser"}]&sign=f6c15ebd1957a7616781b20fc150f4aa 
```

**注意：** 支持一次删除多条数据

| 参数名     | 说明            |
| ------- | ------------- |
| gameID  | 游戏ID          |
| userID  | 用户ID          |
| keyList | 需要删除的数据对应的键列表 |
| sign    | 见下方sign值获取方法-用户  |

返回数据示例如下：

```
{
    "data": "success",
    "status": 0
}
```

## 存全局数据

存储接口 ： **wc5/setGameData.do**

开发者可以通过调用该接口将全局自定义的数据存储至服务器。

```
http://alphavsopen.matchvs.com/wc5/setGameData.do?gameID=200660&userID=21023&dataList=[
{"key":"Johnuser", "value":"Smith"}]&sign=0c2c2df5949f498afd307e8783bb1f3c 
```

**注意：** 每个value的长度上限为1M，如果长度超过1M，会返回“长度超过限制”的错误。存储上限为每个游戏5G，如果超过5G，会返回对应错误。

可以调用setGameData实现增量存储。为避免特殊字符影响，存储前，建议开发者最好将字符串解码成二进制再用UrlEndcode编码后存储。

| 参数名      | 说明                         |
| -------- | -------------------------- |
| gameID   | 游戏ID                       |
| userID   | 用户ID                       |
| dataList | 自定义存储json数组，包括字段的key和value |
| sign     | 见下方sign值获取方法-全局               |

返回数据示例如下：

```
{
    "data": "success",
    "status": 0
}
```

## 取全局数据

获取接口 ： **wc5/getGameData.do**

开发者可以通过调用该接口获取用户自定义存储的数据。

```
http://alphavsopen.matchvs.com/wc5/getGameData.do?gameID=200660&userID=21023&keyList=[
{"key":"Johnuser"}]&sign=0c2c2df5949f498afd307e8783bb1f3c 
```

**注意：** 存储前，如果将字符串解码成二进制再用UrlEndcode编码后存储，对应的取出时应用UrlDecode进行解码后显示

| 参数名     | 说明           |
| ------- | ------------ |
| gameID  | 游戏ID         |
| userID  | 用户ID         |
| keyList | 需要取的数据对应的键列表 |
| sign    | 见下方sign值获取方法-全局 |

返回数据示例如下：

```
{
    "data": {
        "dataList": [
            {
                "key": "Johnuser",
                "value": "Smith"
            }
        ]
    },
    "status": 0
}
```

## 删全局数据

删除接口 ： **wc5/delGameData.do**

开发者可以通过调用该接口删除全局自定义存储的数据。

```
http://alphavsopen.matchvs.com/wc5/delGameData.do?gameID=200660&userID=21023&keyList=[
{"key":"Johnuser"}]&sign=0c2c2df5949f498afd307e8783bb1f3c 
```

**注意：** 支持一次删除多条数据

| 参数名     | 说明            |
| ------- | ------------- |
| gameID  | 游戏ID          |
| userID  | 用户ID          |
| keyList | 需要删除的数据对应的键列表 |
| sign    | 见下方sign值获取方法-全局  |

返回数据示例如下：

```
{
    "data": "success",
    "status": 0
}
```

## 存哈希

存储接口 ： **wc5/hashSet.do**

开发者可以通过调用该接口将自定义的数据存储至服务器。

```
http://alphavsopen.matchvs.com/wc5/hashSet.do?gameID=102003&userID=21023&key=1&value=a&sign=68c592733f19f6c5ae7e8b7ae8e5002f 
```

**注意：** 每个value的长度上限为1M，如果长度超过1M，会返回“长度超过限制”的错误。存储上限为每个玩家1000条，如果超过1000条，会返回对应错误。

可以调用hashSet实现增量存储。为避免特殊字符影响，存储前，建议开发者最好将字符串解码成二进制再用UrlEndcode编码后存储。

| 参数名    | 说明           |
| ------ | ------------ |
| gameID | 游戏ID         |
| userID | 用户ID         |
| key    | 自定义存储字段编号    |
| value  | 自定义存储字段的值    |
| sign   | 见下方sign值获取方法-哈希 |

返回数据示例如下：

```
    {
        "code": 0,
        "data": "success",
        "status": 0
    }
```

## 取哈希

取接口：**wc5/hashGet.do**

开发者可以通过调用该接口获取存储在服务器的自定义数据。

```
http://vsopen.matchvs.com/wc5/hashGet.do?gameID=102003&userID=21023&key=1&sign=b0244f7ed1d433975512a8f6c2ba4517 
```

**注意** 存储前，如果将字符串解码成二进制再用UrlEndcode编码后存储，对应的取出时应用UrlDecode进行解码后显示

| 参数名    | 说明           |
| ------ | ------------ |
| gameID | 游戏ID         |
| userID | 用户ID         |
| key    | 自定义存储字段键值    |
| sign   | 见下方sign值获取方法-哈希 |

返回数据示例如下：

```
{
    "code": 0,
    "data": "this is my data",
    "status": 0
}
```

## sign值获取方法-用户

1. 按照如下格式拼接出字符串:

```
appKey&gameID=xxx&userID=xxx&token
```

- `appKey`为您在官网配置游戏所得
- `token`通过用户注册请求获取

2. 计算第一步拼接好的字符串的`MD5`值，即为`sign`的值。

## sign值获取方法-全局

1. 按照如下格式拼接出字符串:

```
appkey&gameID=xxx&userID=xxx&appSecret
```

- `appKey和appSecret`为您在官网配置游戏所得

2. 计算第一步拼接好的字符串的`MD5`值，即为`sign`的值。

## sign值获取方法-哈希

1. 按照如下格式拼接出字符串:

```
appKey&param1=value1&param2=value2&param3=value3&token
```

- `appKey`为您在官网配置游戏所得

- `param1、param2、param3`等所有参数，按照数字`0-9`、英文字母`a~z`的顺序排列

  例 ： 有三个参数`gameID`、`userID`、`key`，则按照`appkey&gameID=xxx&key=xxx&userID=xxx&token` 的顺序拼出字符串。

- `token`通过用户注册请求获取

2. 计算第一步拼接好的字符串的`MD5`值，即为`sign`的值。



## 错误码

| 错误码 | 含义             |
| ------ | ---------------- |
| 413    | 存储长度超过限制 |




## 接口代码示例

 这里以 [demo](https://github.com/matchvs/demo-Egret/blob/master/MatchvsDemo_Egret/src/matchvs/MvsHttpApi.ts) 的代码为例 ，下面这些是公共用代码:

```typescript
class MvsHttpApi {
	//这里定义接口要使用的连接
	public  open_host:string = MatchvsData.pPlatform == "release"? "https://vsopen.matchvs.com":"https://alphavsopen.matchvs.com";
	
	public  get_game_data:string = "/wc5/getGameData.do?";
	public  set_game_data:string = "/wc5/setGameData.do?";
	
    ......

    private counter:number = Math.floor(Math.random()*1000);

    public token = GlobalData.myUser.token;
    public gameID = MatchvsData.gameID;
    public userID = GlobalData.myUser.userID;
    public appkey = MatchvsData.appKey;
    public secret = MatchvsData.secret;
	
	public constructor() {
	}
    
    public getCounter(){
        return ++this.counter;
    }
    
    public getTimeStamp():number{
        return Math.floor(Date.now()/1000);
    }

	/**
     * 把参数中的 key, value  转为 key=value&key1=value2&key3=value3 形式
     * @param {any} args {key:value[, ...]} 形式
     */
	public static paramsParse(args:any){
        let str = "";
        for(let k in args){
            let val = "";
           
			if ( 'object' == (typeof args[k]) ) { 
                val = JSON.stringify(args[k]);
            }else{
                val = args[k];
            }
            if(str == ""){
                
                str = k + "=" + val;
            }else{
                str = str + "&" + k + "=" + val;
            }
        }
        return str;
    }

	/**
     * 组合 url 防止出现 host + path 出现两个 // 符号
     * @param {string} host 
     * @param  {...string} params 
     */
    public static url_Join(host, ...params) {
        let p = "";
        params.forEach(a => {
            if (typeof a == "object") {
                throw 'the parameter can only be string ';
            }
            if (a.substring(0,1) == '/'){
                p = p + a;
            }else{
                p = p + '/' + a;
            }
        });
        if (host.substring(host.length - 1, host.length) == '/') {
            p = host.substring(0, host.length - 1) + p;
        } else {
            p = host + p;
        }
        return p;
    }


    /**
     * 指定签名参数签名
     */
    public SignPoint(args:any, points:Array<string>){
        let tempobj = {}
        points.sort();
        points.forEach((val)=>{
            tempobj[val] = args[val];
        });

        if(args["seq"]){
            tempobj["seq"] = args["seq"];
        }
        if(args["ts"]){
            tempobj["ts"] = args["ts"];
        }

        let headKey:string = MatchvsData.appKey;
        let endKey:string = args.mode == 2? MatchvsData.secret: GlobalData.myUser.token;

        let paramStr = MvsHttpApi.paramsParse(tempobj);
        let md5Encode = new MD5()
        let sign = md5Encode.hex_md5(headKey+"&"+paramStr+"&"+endKey);
        return sign;
    }

	private dohttp(url:string, method:string, params:any, callback:Function){
        let headtype =  (method == "GET" ? "text/plain" : "application/json") ;
        var request = new XMLHttpRequest()
        request.open(method, url)
        request.setRequestHeader("Content-Type",headtype);
        if (method == "GET"){
            request.send();
        }else{
            request.send(JSON.stringify(params));
        }
        request.onerror = (e)=>{
            callback(JSON.parse(request.response), null);
        }
        request.onreadystatechange = ()=>{
            if(request.readyState == 4){
                if( request.status == 200 ){
                    callback(JSON.parse(request.responseText), null);
                }else{
                    callback(null, " http request error "+request.responseText);
                }
            }
        }
	}

	public http_get(url, callback){
		this.dohttp(url, "GET", {}, callback);
	}

	public http_post(url, params ,callback){
		this.dohttp(url, "POST", params, callback);
	}
}
```

下面是通过上面的代码实现的接口示例：

```typescript
/**
     * 获取全局接口数据
     */
    public getGameData(list:Array<any>,callback:Function){
        let keyList = [];
        list.forEach(k=>{
            keyList.push({key:k});
        });
        let data = {
            gameID   : "123456",
            userID   : GlobalData.myUser.userID || 0,
            keyList  : keyList,
            sign : "",
            mode : 2,
            seq: this.getCounter(),
            ts:this.getTimeStamp(),
        }
        data.sign = this.SignPoint(data, ["gameID", "userID"]);
        let param = MvsHttpApi.paramsParse(data);
		this.http_get(MvsHttpApi.url_Join(this.open_host, this.get_game_data)+param, callback);
    }
    /**
     * 保存全局数据
     */
    public setGameData(userID:number, list:Array<any>, callback:Function){
        let listInfo = [];
        list.forEach(user=>{
            listInfo.push({
                key: user.userID,
                value: ArrayTools.Base64Encode(JSON.stringify({ name: user.name, avatar: user.avatar })),
            });
        });
        let params = {
            gameID : this.gameID,
            userID : userID,
            dataList: listInfo,
            sign : "",
            mode:2,
            seq: this.getCounter(),
            ts:this.getTimeStamp(),
        }
        params.sign = this.SignPoint(params, ["gameID","userID"]);
		this.http_post(MvsHttpApi.url_Join(this.open_host, this.set_game_data), params, callback);
    }
    
    
```

> 示例代码是Egret斗地主案例，完整代码  [可以看这里](https://github.com/matchvs/demo-Egret/blob/master/MatchvsDemo_Egret/src/matchvs/MvsHttpApi.ts) 
>
> 注意：** 以上为示例代码为演示接口的调用方法，可能不能直接运行，开发者根据自己需求适当的修改。


