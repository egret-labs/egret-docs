
为方便开发者做游戏全局排行榜，Matchvs 提供了便捷的排行榜功能，主要流程为：

1.创建排行榜

2.上报用户分数

3.拉取排行榜

## 域名

Matchvs 环境分为测试环境（alpha）和 正式环境（release），所以在使用http接口时，需要通过域名进行区分。使用正式环境需要先在官网控制台将您的游戏发布上线。

- alpha环境域名：alphavsopen.matchvs.com
- release环境域名：vsopen.matchvs.com

## 请求与响应格式

不同接口请求方式不同，具体可查看各接口文档说明。所有接口采用统一的json返回格式：

```html
Content-Type: application/json
```

json包体中包含如下字段：

| 字段       | 类型                 | 是否必须 | 说明                            |
| ---------- | -------------------- | -------- | ------------------------------- |
| statusCode | int                  | 是       | 返回结果的状态码（200表示成功） |
| desc       | string               | 是       | 返回结果的描述信息              |
| data       | JsonObject/JsonArray | 否       | 客户端需要的信息实体依据        |

响应示例：

```JSON
{
  "statusCode": 200,
  "desc": "成功",
  "data": [
    {
      "createTime": "2018-10-26T15:29:09+08:00",
      "customPeriod": 0,
      "customStartTime": 0,
      "gameID": 102003,
      "historyPeriodNum": 0,
      "id": 5,
      "rankGist": "score",
      "rankNum": 0,
      "rankinglistName": "高分榜",
      "snapshotList": [
        "第一个快照"
      ],
      "sortOrder": 0,
      "updatePeriodType": 3,
      "updateRuleType": 3
    }
  ]
}
```

## 接口签名校验

除接口自有参数外，每个接口的URL中都必须包含sign参数，ts、seq、mode3个参数可选

- ts为请求时间戳，精确到秒。
- seq为请求序号，每次请求递增变化。
- mode指定本次请求使用哪种签名方式。
- sign由签名参数和签名方法计算得到的签名值。

签名校验由API网关来负责，同时设置ts和seq可用于避免重复请求攻击，当前支持如下两种方式签名方式:

### 1 普通用户类接口

```
1. 按照如下格式拼接出字符串:
	appKey&param1=xxx&param2=xxx&...[&seq=xxx&ts=xxx]&token
	params为参与签名的参数，并按照参数名字母序升序排列
	[&seq=xxx&ts=xxx]表示如果设置了seq和ts，seq和ts会参与签名计算，mode参数不参与签名计算
	appKey为您在官网配置游戏所得，token通过用户注册、登录请求获取
2. 计算第一步拼接好的字符串的MD5值，即为sign的值。
```

### 2 管理员类接口

```
1. 按照如下格式拼接出字符串:
	appkey&param1=xxx&param2=xxx&...[&seq=xxx&ts=xxx]&appSecret
	params为参与签名的参数，并按照参数名字母序升序排列
	[&seq=xxx&ts=xxx]表示如果设置了seq和ts，seq和ts会参与签名计算，mode参数不参与签名计算
	appKey和appSecret为您在官网配置游戏所得
2. 计算第一步拼接好的字符串的MD5值，即为sign的值。
```

## 接口列表

**说明 ： 目前排行榜属于公测阶段，提供给大家免费使用。需要注意的是，公测阶段，每个游戏创建排行榜上限为3个，排行榜查询次数限每天5万次，删除排行榜的接口限每月10次。**

### 1 创建排行榜

```
接口: POST /rank/ranking_list_configs?ts=xxx&seq=xxx&mode=2&sign=xxx
```

- 接口说明：该接口用于创建一个指定游戏ID所属的排行榜，并对这个排行榜的名称、排行依据、排名顺序和更新周期等进行相应的设置。
- 签名方式：只支持管理员类接口签名(即mode=2)。

#### 请求

Content-Type: application/json

请求实例

```JSON
{
  "gameID": 123456,
  "rankinglistName": "liuzhihao_test",
  "rankGist": "test",
  "sortOrder": 0,
  "updatePeriodType": 0,
  "customStartTime": 0,
  "customPeriod": 0,
  "rankNum": 0,
  "historyPeriodNum": 0,
  "updateRuleType": 0
}
```

请求参数说明

**排行依据：**  排行依据是服务器进行排行的成绩名称，通常为分数、等级、比赛时间等0。

**排行周期：**  在一定周期后，排行榜重置，重新开始排行。日：每天24:00重置榜单；周：每周日24:00重置榜单；月：每月末24:00重置榜单；总：不重置榜单

- 如，周，第一周榜单为 小明 ： 3 ，小红 ：2 ；第二周只有小红有记录，则榜单为 小红 ：4 。

**上一周期榜单：**  上个完整周期产生的榜单

- 如，上周（周一至周天）的榜单为小明 ： 3 ，小红 ：2 ；当前周截止周三 10:10 的榜单为 小红：1 ，小明 1

**排名个数： ** 须指定历史周期的排名个数，如，用户有500万，而上一周期只需要保持top 100的用户。开发者可指定 0 - 全部数据，n - top n 数据 

**分数更新规则：**  取大，取小，取最新，求和；取大/小是指，当有新的分数上报时，保留一个较大/小值；取最新是指，新的分数直接覆盖掉旧的分数；求和是指将上报的分数累加。

- 如，小明分3次上报分数：3,1,2 ；如果取大，则第三次的排行是以 3 分进行排序；取小，则是1分；取最新，则是2分；求和，则是6分。

|     包体字段     | 说明                                                         | 备注                                                         | 是否参与签名 |
| :--------------: | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------ |
|      gameID      | 游戏ID                                                       | **必填**                                                     | 是           |
| rankinglistName  | 用户自定义排行榜名                                           | **必填**，不能为空串                                         | 否           |
|     rankGist     | 用户自定义排行榜依据                                         | **必填**，不能为空串                                         | 否           |
|    sortOrder     | 排名顺序(0为降序，1为升序)                                   | 值默认为0                                                    | 否           |
| updatePeriodType | 更新的周期类型: 0为自然日，1为自然周，2为自然月，3为总，4为自定义 | 值默认为0                                                    | 否           |
| customStartTime  | 用户自定义起始时间点，为一个int64时间戳                      | 当且仅当updatePeriodType的值为4时，该字段值才有意义，值默认为0 | 否           |
|   customPeriod   | 用户自定义周期数(分钟)                                       | 当且仅当updatePeriodType的值为4时，该字段值才有意义，值默认为0 | 否           |
|     rankNum      | 排名个数，0表示全部，n表示top n                              | 值默认为0                                                    | 否           |
| historyPeriodNum | 历史周期数，0表示只保留当前周期的，1表示保留当前和上一周期，以此类推 | 值默认为0                                                    | 否           |
|  updateRuleType  | 更新规则，其中0为取小，1为取大，2为取新，3为求和             | 值默认为0                                                    | 否           |

#### 应答

应答实例

```JSON
{
  "statusCode": 200,
  "desc": "成功",
  "data": {
    "id": 9,
    "gameID": 123456,
    "rankinglistName": "liuzhihao_test",
    "rankGist": "test",
    "sortOrder": 0,
    "updatePeriodType": 0,
    "customStartTime": 0,
    "customPeriod": 0,
    "rankNum": 0,
    "historyPeriodNum": 0,
    "updateRuleType": 0,
    "createTime": "2018-10-29T11:11:54.928963767+08:00"
  }
}
```

- 返回包体的 **data** 字段中，除了id和createTime字段外，其余字段均与上面 ***“请求参数说明”*** 中的字段相一致。
- 返回包体的 **statusCode** 为 ***200*** 表示接口调用成功，为 ***其它值*** 时表示接口调用失败，并会在 **desc** 字段中返回相应的错误信息。

### 2 查询排行榜的配置信息及其快照列表

```
接口: GET /rank/ranking_list_configs?接口自有参数列表&ts=xxx&seq=xxx&mode=xxx&sign=xxx
```

- 接口说明：

```
该接口支持以游戏ID(gameID)和排行榜名称(rankinglistName)来查询所需的排行榜配置信息及其快照列表，例如

a. 一次性查回来1000条满足gameID为123456的排行榜配置信息以及这些排行榜对应的快照列表：   

  /rank/ranking_list_configs?gameID=123456&limit=1000

b. 查询gameID为123456并且排行榜名（rankinglistName）为liuzhihao_test的排行榜配置信息以及其对应的快照列表：   

  /rank/ranking_list_configs?gameID=123456&rankinglistName=liuzhihao_test

上面的接口示例中，limit参数用于限制查询条数(偏移位固定为0)，默认limit参数的值为1000。
```

| query的查询参数 | 说明       | 备注     | 是否参与签名 |
| :-------------: | ---------- | -------- | :----------: |
|     gameID      | 游戏ID     | **必填** |      是      |
| rankinglistName | 排行榜名称 |          |      否      |

- 签名方式：支持管理员类接口签名和普通用户类接口签名。

#### 请求

Content-Type: application/json

#### 应答

应答实例

```JSON
{
  "statusCode": 200,
  "desc": "成功",
  "data": [
    {
      "createTime": "2018-10-29T13:41:17+08:00",
      "customPeriod": 60,
      "customStartTime": 0,
      "gameID": 102003,
      "historyPeriodNum": 1,
      "id": 14,
      "rankGist": "score",
      "rankNum": 0,
      "rankinglistName": "自定义周期榜",
      "snapshotList": [],
      "sortOrder": 0,
      "updatePeriodType": 4,
      "updateRuleType": 3
    },
    {
      "createTime": "2018-10-26T15:29:09+08:00",
      "customPeriod": 0,
      "customStartTime": 0,
      "gameID": 102003,
      "historyPeriodNum": 0,
      "id": 5,
      "rankGist": "score",
      "rankNum": 0,
      "rankinglistName": "高分榜",
      "snapshotList": [
        "第一个快照"
      ],
      "sortOrder": 0,
      "updatePeriodType": 3,
      "updateRuleType": 3
    }
  ]
}
```

- 返回包体中，除了 ***snapshotList*** 字段(***快照列表***)、id字段和createTime字段外，其余字段的含义与上面 **“创建排行榜”** 的 **“请求参数说明”** 中的字段相一致。
- 返回包体的 **statusCode** 为 ***200*** 表示接口调用成功，为 ***其它值*** 时表示接口调用失败，并会在 **desc** 字段中返回相应的错误信息。

### 3 删除排行榜

```
接口: DELETE /rank/ranking_list_configs?ts=xxx&seq=xxx&mode=2&sign=xxx
```

- 接口说明：该接口用于删除指定游戏、指定名称的排行榜，并清除掉相应的快照等一系列数据。
- 签名方式：只支持管理员类接口签名。

#### 请求

Content-Type: application/json

请求实例

```JSON
{
  "gameID": 123456,
  "rankinglistName": "liuzhihao_test"
}
```

请求参数说明

|    包体字段     | 说明       | 备注     | 是否参与签名 |
| :-------------: | ---------- | -------- | :----------: |
|     gameID      | 游戏ID     | **必填** |      是      |
| rankinglistName | 排行榜名称 | **必填** |      否      |

#### 应答

应答实例

```JSON
{
  "statusCode": 200,
  "desc": "成功"
}
```

- 返回包体的 **statusCode** 为 ***200*** 表示接口调用成功，为 ***其它值*** 时表示接口调用失败，并会在 **desc** 字段中返回相应的错误信息。

### 4 设置快照/重置排行榜

如果游戏需要在非固定周期进行新的一轮计分，而不想清除已产生的数据。则可以为该排行榜设置一个快照，历史数据会作为快照保留，新产生数据作为新的榜单进行计算。

如，游戏有不固定周期的赛季/活动，如中秋三天、国庆七天等。开发者可以在指定时间，在客户端或gameServer里通过设置排行榜快照，来实现固定赛季/活动。

- 如，积分榜，设置周期为总，即不自动刷新榜单；然后开发者在中秋前一天晚上设置排行榜快照(不保留快照，重置排行榜)，在中秋期间拉取的榜单，即为中秋三天里的活动排行榜。


- 开发者可选择是否保留排行榜快照，如果否，则历史排行榜不会保留，达到重置排行榜作用（重置是指将排行榜里的玩家数据清除，排行榜规则不变，清除之后，重新开始计算排行榜）；如果是，则需要指定排行榜快照的名称，top n 值（0 为保存全部），此时服务保留的是设置快照前的排行榜数据。
  - 如，某游戏是在国庆分三次（1-2号，3-4号，5-7号）举行赛事，每次赛事的成绩是基于之前成绩取最高分；则开发者可以在1号赛事开始时，设置排行榜快照，选择保留快照，不重置排行榜数据；然后在3号设置排行榜快照，选择保留快照，不重置排行榜；在5号、7号同样设置；最后在国庆假期结束时，连续三次赛事排名前三的玩家可领取奖励。



```
接口: POST /rank/snapshot?ts=xxx&seq=xxx&mode=2&sign=xxx
```

- 接口说明：该接口用于备份当前榜单数据，每个排行榜的快照个数不能超过3个。
- 签名方式：只支持管理员类接口签名(即mode=2)。

#### 请求

Content-Type: application/json

请求实例

```json
{
	"gameID": 102003,
	"rankName": "高分榜",
	"reset": false,
	"snapshotName": "第一个快照",
	"top": 10
}
```

请求参数说明

|   包体字段   | 说明                                                         | 备注                 | 是否参与签名 |
| :----------: | ------------------------------------------------------------ | -------------------- | ------------ |
|    gameID    | 游戏ID                                                       | **必填**             | 是           |
|   rankName   | 用户自定义排行榜名                                           | **必填**，不能为空串 | 否           |
|    reset     | 是否重置榜单数据，重置是指将排行榜里的玩家数据清除，排行榜规则不变，清除之后，重新开始计算排行榜 | **必填**             | 否           |
| snapshotName | 快照名，ps:空串表示不保留榜单历史数据                        | 默认为空串           | 否           |
|     top      | 快照名不为空时，保留榜单前top名的数据，0为保存全部           | 值默认为0            | 否           |

#### 应答

应答实例

```JSON
{
  "statusCode": 200,
  "desc": "成功"
}
```

- 返回包体的 **statusCode** 为 ***200*** 表示接口调用成功，为 ***其它值*** 时表示接口调用失败，并会在 **desc** 字段中返回相应的错误信息。

### 5 删除快照

```
接口: DELETE /rank/snapshot?ts=xxx&seq=xxx&mode=2&sign=xxx
```

- 接口说明：该接口用于删除排行榜快照。
- 签名方式：只支持管理员类接口签名(即mode=2)。

#### 请求

Content-Type: application/json

请求实例

```JSON
{
	"gameID": 102003,
	"rankName": "高分榜",
	"snapshotName": "第一个快照"
}
```

请求参数说明

|   包体字段   | 说明               | 备注                 | 是否参与签名 |
| :----------: | ------------------ | -------------------- | ------------ |
|    gameID    | 游戏ID             | **必填**             | 是           |
|   rankName   | 用户自定义排行榜名 | **必填**，不能为空串 | 否           |
| snapshotName | 用户自定义快照名   | **必填**，不能为空串 | 否           |

#### 应答

应答实例

```JSON
{
  "statusCode": 200,
  "desc": "成功"
}
```

- 返回包体的 **statusCode** 为 ***200*** 表示接口调用成功，为 ***其它值*** 时表示接口调用失败，并会在 **desc** 字段中返回相应的错误信息。

### 6 上报分数

```
接口: PUT /rank/scores?mode=xxx
```

- 接口说明：该接口用于上报玩家分数。上报成功，排行榜会立即更新排名。
- 签名方式：支持管理员类接口签名和普通用户类接口。
- mode为必选参数，接口调用需指明签名方式。

#### 请求

```json
{
    "userID": 123,
    "gameID": 1000,
    "items": [
        {
            "fieldName": "金币",
            "value": 20
        }
    ]
}
```

| 字段      | 说明     | 备注     | 是否参与签名 |
| --------- | -------- | -------- | ------------ |
| userID    | 玩家ID   | **必填** | **是**       |
| gameID    | 游戏ID   | **必填** | **是**       |
| fieldName | 排行依据 | **必填** | 否           |
| fieldName | 分数     | **必填** | 否           |

#### 应答

```json
{
    "statusCode": 200,
    "desc": "成功"
}
```

- statusCode，状态码。200表示成功，其它表示失败。
- desc，描述。失败时，描述失败原因。

### 7 查询用户排名

```
接口: GET /rank/grades?userID=123&gameID=100&type=0&rankName=周榜&snapshotName=周榜&period=0
```

- 接口说明：该接口用于请求玩家的排行榜或者快照的排名。
- 签名方式：支持管理员类接口签名和普通用户类接口。

#### 请求

| 字段         | 说明                                 | 备注         | 是否参与签名 |
| ------------ | ------------------------------------ | ------------ | ------------ |
| userID       | 玩家ID                               | **必填**     | **是**       |
| gameID       | 游戏ID                               | **必填**     | **是**       |
| type         | 类型，取值0或者1，0排行榜，1快照     | 默认为0      | 否           |
| rankName     | 排行榜名称                           | **必填**     | 否           |
| snapshotName | 快照名称                             | type=0时必填 | 否           |
| period       | 周期，取值0或1，0当前周期，1上一周期 | 默认为0      | 否           |

#### 应答

```json
{
    "statusCode": 200,
    "desc": "成功",
    "data": [
        {
            "userID": 1000,
            "rank": 1,
            "value": 100
        }
    ]
}
```

- statusCode，状态码。200表示成功，其它表示失败。
- desc，描述。失败时，描述失败原因。
- data，返回的数据。

|        | 说明   |
| ------ | ------ |
| userID | 玩家ID |
| rank   | 排名   |
| value  | 分值   |

### 8 查询排行榜数据

```
接口: GET /rank/ranking_list?gameID=1000&rankName=周榜&period=0&top=100&pageIndex=0&pageMax=10&self=0&userID=1000
```

- 接口说明：该接口用于请求排行榜数据，可指定排行榜，周期，可分页请求。
- 签名方式：支持管理员类接口签名和普通用户类接口。

#### 请求

| 字段      | 说明                                 | 备注     | 是否参与签名 |
| --------- | ------------------------------------ | -------- | ------------ |
| userID    | 玩家ID                               | **必填** | **是**       |
| gameID    | 游戏ID                               | **必填** | **是**       |
| rankName  | 排行榜名称                           | **必填** | 否           |
| period    | 周期，取值0或1，0当前周期，1上一周期 | 默认值0  | 否           |
| top       | 请求排行榜前n位，大于0               | **必填** | 否           |
| pageIndex | 当前页码，大于0                      | **必填** | 否           |
| pageMax   | 每页个数，大于0                      | **必填** | 否           |
| self      | 是否查询自己，取值0或1               | 默认值0  | 否           |

#### 应答

```json
{
    "statusCode": 200,
    "desc": "成功",
    "data": [
        {
            "userID": 1000,
            "rank": 1,
            "value": 100
        }
    ]
}
```

- statusCode，状态码。200表示成功，其它表示失败。
- desc，描述。失败时，描述失败原因。
- data，返回的数据。如果有请求自己的排名，自己的排名为最后一个。

|        | 说明   |
| ------ | ------ |
| userID | 玩家ID |
| rank   | 排名   |
| value  | 分值   |

### 9 查询快照数据

```
接口: GET /rank/snapshot?gameID=1000&rankName=周榜&snapshotName=欢度元旦&top=100&pageIndex=0&pageMax=10&self=0&userID=1000
```

- 接口说明：该接口用于请求快照数据，可指定快照，周期，可分页请求。
- 签名方式：支持管理员类接口签名和普通用户类接口。

#### 请求

| 字段         | 说明                   | 备注     | 是否参与签名 |
| ------------ | ---------------------- | -------- | ------------ |
| userID       | 玩家ID                 | **必填** | **是**       |
| gameID       | 游戏ID                 | **必填** | **是**       |
| rankName     | 排行榜名称             | **必填** | 否           |
| snapshotName | 快照名称               | **必填** | 否           |
| top          | 请求排行榜前n位，大于0 | **必填** | 否           |
| pageIndex    | 当前页码，大于0        | **必填** | 否           |
| pageMax      | 每页个数，大于0        | **必填** | 否           |
| self         | 是否查询自己，取值0或1 | 默认值0  | 否           |

#### 应答

```json
{
    "statusCode": 200,
    "desc": "成功",
    "data": [
        {
            "userID": 1000,
            "rank": 1,
            "value": 100
        }
    ]
}
```

- statusCode，状态码。200表示成功，其它表示失败。
- desc，描述。失败时，描述失败原因。
- data，返回的数据。如果有请求自己的排名，自己的排名为最后一个。

|        | 说明   |
| ------ | ------ |
| userID | 玩家ID |
| rank   | 排名   |
| value  | 分值   |
