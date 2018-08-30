Matchvs 给开发者提供了三种存储接口：用户数据存储、全局数据存储、哈希存储。

三种数据存储的特点及对比如下：

- 用户数据存储，存储用户数据，只有用户自己有增、删、改、查自己数据的权限
- 全局数据存储，推荐在 gameServer 里使用，存储游戏全局数据。客户端也可以使用。
- 哈希存储，数据操作会校验userID，但用户之间可以修改和查看数据。

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

##### 1. 按照如下格式拼接出字符串:

```
appKey&gameID=xxx&userID=xxx&token
```

- `appKey`为您在官网配置游戏所得
- `token`通过用户注册请求获取

##### 2. 计算第一步拼接好的字符串的`MD5`值，即为`sign`的值。

## sign值获取方法-全局

##### 1. 按照如下格式拼接出字符串:

```
appkey&gameID=xxx&userID=xxx&appSecret
```

- `appKey和appSecret`为您在官网配置游戏所得

##### 2. 计算第一步拼接好的字符串的`MD5`值，即为`sign`的值。

## sign值获取方法-哈希

##### 1. 按照如下格式拼接出字符串:

```
appKey&param1=value1&param2=value2&param3=value3&token
```

- `appKey`为您在官网配置游戏所得

- `param1、param2、param3`等所有参数，按照数字`0-9`、英文字母`a~z`的顺序排列

  例 ： 有三个参数`gameID`、`userID`、`key`，则按照`appkey&gameID=xxx&key=xxx&userID=xxx&token` 的顺序拼出字符串。

- `token`通过用户注册请求获取

##### 2. 计算第一步拼接好的字符串的`MD5`值，即为`sign`的值。



## 错误码

| 错误码 | 含义             |
| ------ | ---------------- |
| 413    | 存储长度超过限制 |





