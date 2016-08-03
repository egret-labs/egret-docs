Egret 统计接入根据游戏是否是用Egret 引擎开发分两种，遇到问题请加QQ群:386278100 

#### 一、Egret 引擎开发的游戏

1、[下载](http://open.egret.com/wiki/misc/doc/egretSA.zip "下载")统计接入文档
2、选择导入的第三方库，分 2.0 和 2.5 两个版本分别对应Egret引擎 2.0 和 2.5
3、开始对接

```javascript
//导入第三方库libsrc到游戏，在项目文件egretProperties.json 里边modules下加入
{
	"name": "egretsa",
	"path": "../libsrc"
}  
```

4、如何调用
1）===初始化打开游戏暂未加载资源时调用===

```javascript
esa.EgretSA.init({"gameId":XXXXXXX,"chanId":XXXX,"debug":false});	
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|  gameId |游戏统计id   |![](tj.jpg) 和游戏id不同，从游戏总览里获取  |
|  chanId | 渠道id|会在打开游戏网址的时候作为参数传入，获取 egret.runtime.spid 如果没有值获取 channelId 值作为渠道id|
```javascript
渠道id获取：egret.getOption("egret.runtime.spid")
测试渠道：9166, 请在测试网址上加 egret.runtime.spid=9166 调试
debug：true or false //当值为true 时 不发送日志数据，建议在游戏开发的时候设置为true,避免测试数据影响真实数据
```

2）===  设置loading过程,在游戏资源加载时调用 ===

`说明：统计游戏加载过程流失和加载过程时间，根据游戏分整个加载过程分为几个步骤，建议步骤`
`（5-10）步，步骤顺序和步骤名称必须一一对应，并且确保每一步每个玩家都会执行，不是每个玩家`
`都必须执行的过程不要打点`

```javascript
esa.EgretSA.loadingSet(loadingIndex, loadingName); 
//示例：
esa.EgretSA.loadingSet(1, "开始加载"); // 记录开始加载过程，加载顺序为1
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|  loadingIndex |loading顺序  |不允许为空,,格式为从1开始自增数字  |
|  loadingName | loading步骤说明|不允许为空,最多32个字符|

3）=== 初始化玩家数据 ===

`说明：在获取到游戏内用户信息后调用`

```javascript
esa.EgretSA.player.init({	})
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|  egretId |`从egret获取用户接口取到的32位用户id`  | 不允许为空，类型string  |
|  level | 等级|默认1，类型int|
|  serverId | 区服id|不允许为空，默认1,数字从1开始，类型int|
| playerName | 玩家昵称|允许为空，最多32个字符，类型string|
|  diamond | 游戏内充值得到的虚拟币|允许为空,类型int|
|  gold | 游戏内部非充值得到的虚拟币|允许为空，类型int|
|  age |年龄|允许为空，类型int|
| gender |性别 |默认1，1男 2女，类型int|


```javascript
//说明：单独对帐户的某种信息做修改，可以单独调用以下对应方法
esa.EgretSA.player.setLevel(10); // 设置等级
esa.EgretSA.player.setPlayerName("昵称"); // 设置昵称
esa.EgretSA.player.setDiamond(300); // 设置钻石
esa.EgretSA.player.setGold(1000); // 设置金币
```

4）=== 设置新手引导 ===
`说明：统计游戏内新加入玩家,当天可以玩到的游戏进度，确保每一个引导，每个玩家都会执行，不是`
`每个玩家都必须执行的引导不要打点`

```javascript
esa.EgretSA.newUsersGuideSet(guideIndex, guideName); 
//示例：
esa.EgretSA.newUsersGuideSet(1, "完成招募将领"); // 完成完成招募将领新手引导，新手引导顺序为1
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
| guideIndex |新手引导顺序| 格式为从1开始自增数字，类型int  |
| guideName | 新手引导名称|最多32个字符，类型string|


5）=== 游戏任务 ===

`说明：统计游戏内任务完成的次数和主要处于那个等级段`

```javascript
esa.EgretSA.onTaskCompleted(type, taskName); // 完成任务
//示例：
esa.EgretSA.onTaskCompleted(1, "通过关卡第一章"); // 完成主线任务，通过关卡第一章
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|type |任务类型 | 1主线 2支线 3其它，类型int  |
|taskName |任务名称|不允许为空，最多32个字符，类型string	|

6）=== 游戏关卡 ===

`说明：统计游戏内首次完成某一个关卡的次数和处于那个等级段`

```javascript
esa.EgretSA.onLevelDesignCompleted(type, levelDesignName); // 关卡成功
esa.EgretSA.onLevelDesignFailed(type, levelDesignName); // 关卡失败
//示例：
esa.EgretSA.onLevelDesignCompleted(1, "关卡1"); // 完成主线关卡1
esa.EgretSA.onLevelDesignFailed(1, "关卡1"); // 通过主线关卡1失败
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|type |关卡类型 | 1主线 2支线 3副本 4其它，类型int  |
|levelDesignName |关卡名称|不允许为空，最多32个字符，类型string	|


7）=== 统计游戏内钻石消耗、赠予分布 ===

```javascript
esa.EgretSA.onDiamondUse(item, itemNumber, priceInDiamond);
//示例：
esa.EgretSA.onDiamondUse("重置副本", 1, 20); // 重置1次副本，重置副本单价20钻石

```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|item |某个消费点编号或名称 | 不允许为空，最多32个字符，类型string |
|itemNumber|消费数量|不允许为空，类型int|
|priceInDiamond|消费点单价|不允许为空，类型int|

`说明：item 值最多不可超过100个，如开宝箱有4种类型1000个宝箱，item 要写成 类型1宝箱，而不`
`要写成开宝箱1001这样`


```javascript
esa.EgretSA.onDiamondReward(num, reason);
//示例：
esa.EgretSA.onDiamondReward(100, "任务奖励"); // 任务奖励得到100钻石
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|num |钻石数量 | 不允许为空，类型int|
|reason|理由|不允许为空,最多32个字符，类型string|

8）=== 统计游戏内金币消耗、获取分布 ===

```javascript
esa.EgretSA.onGoldOutput(num, reason);
//示例：
esa.EgretSA.onGoldOutput(10, "任务奖励"); // 完成某一个任务奖励10个金币

```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|num |金币数量 | 不允许为空，类型int|
|reason|理由|不允许为空,最多32个字符，类型string|

```javascript
esa.EgretSA.onGoldUse(item, itemNumber, priceInGold);
//示例：
esa.EgretSA.onGoldUse("重置副本", 1, 200); // 重置1次副本，重置副本单价200金币

```
`说明：item 值最多不可超过100个，如重置副本有4种类型1000个重置副本，item 要写成 类型1重置`
`副本，而不要写成重置副本1001这样`

| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|item |某个消费点编号或名称 | 不允许为空，最多32个字符，类型string |
|itemNumber|消费数量|不允许为空，类型int|
|priceInGold|消费点单价|不允许为空，类型int|

9）=== 统计游戏内活动参加的次数 ===

```javascript
esa.EgretSA.onJoinActivity(item);
//示例：
esa.EgretSA.onJoinActivity("魔王活动"); // 参加魔王活动
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|item |活动编号或名称 | 不允许为空，最多32个字符，类型string|


10）=== 离开游戏 ===

```javascript
esa.EgretSA.onLeave();
//在玩家退出游戏页面的时候调用，此方法如果游戏监测不到离开游戏可以不用调用
```



如何判断统计是否接入成功?
查看 浏览器审查元素里 loadingStat.php 返回值 {"code":0,"msg":"ok"} 表示接入成功否则返回失败原因
如果找不到 loadingStat.php 请查看 EgretSA.init() debug 参数是否是true，true 默认是不会发送统计的，需要改成false

#### 二、非Egret 引擎开发的游戏


1、[下载](http://open.egret.com/wiki/misc/doc/egretSA.zip "下载")统计接入文档
2、加载游戏统计js &lsaquo;script src="http://gameanalysis.egret.com/js/egretSA.js" &rsaquo;&lsaquo;/script&rsaquo;
3、开始对接
1）===初始化打开游戏暂未加载资源时调用===
```javascript
EgretSA.init({"gameId":XXXXXXX,"chanId":XXXX,"debug":false});	
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|  gameId |游戏统计id   | 和游戏id不同，从游戏总览里获取  |
|  chanId | 渠道id|会在打开游戏网址的时候作为参数传入，获取 egret.runtime.spid 如果没有值获取|


测试渠道9166 请在测试网址上加 egret.runtime.spid=9166 调试

```javascript
	debug：true or false //当值为true 时 不发送日志数据，建议在游戏开发的时候设置为true,避免测试数据影响真实数据
```

2）===  设置loading过程,在游戏资源加载时调用 ===

`说明：统计游戏加载过程流失和加载过程时间，根据游戏分整个加载过程分为几个步骤，建议步骤`
`（5-10）步，步骤顺序和步骤名称必须一一对应，并且确保每一步每个玩家都会执行，不是每个玩家`
`都必须执行的过程不要打点`

```javascript
EgretSA.loadingSet(loadingIndex, loadingName); 
//示例：
EgretSA.loadingSet(1, "开始加载"); // 记录开始加载过程，加载顺序为1
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|  loadingIndex |loading顺序  |不允许为空,,格式为从1开始自增数字  |
|  loadingName | loading步骤说明|不允许为空,最多32个字符|

3）=== 初始化玩家数据 ===

`说明：在获取到游戏内用户信息后调用`

```javascript
EgretSA.player({	})
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|  egretId |`从egret获取用户接口取到的32位用户id ` | 不允许为空，类型string  |
|  level | 等级|默认1，类型int|
|  serverId | 区服id|不允许为空，默认1,数字从1开始，类型int|
| playerName | 玩家昵称|允许为空，最多32个字符，类型string|
|  diamond | 游戏内充值得到的虚拟币|允许为空,类型int|
|  gold | 游戏内部非充值得到的虚拟币|允许为空，类型int|
|  age |年龄|允许为空，类型int|
| gender |性别 |默认1，1男 2女，类型int|


```javascript
//说明：单独对帐户的某种信息做修改，可以单独调用以下对应方法
EgretSA.player.setLevel(10); // 设置等级
EgretSA.player.setPlayerName("昵称"); // 设置昵称
EgretSA.player.setDiamond(300); // 设置钻石
EgretSA.player.setGold(1000); // 设置金币
```

4）=== 设置新手引导 ===
`说明：统计游戏内新加入玩家,当天可以玩到的游戏进度，确保每一个引导，每个玩家都会执行，不是`
`每个玩家都必须执行的引导不要打点`

```javascript
EgretSA.newUsersGuideSet(guideIndex, guideName); 
//示例：
EgretSA.newUsersGuideSet(1, "完成招募将领"); // 完成完成招募将领新手引导，新手引导顺序为1
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
| guideIndex |新手引导顺序| 格式为从1开始自增数字，类型int  |
| guideName | 新手引导名称|最多32个字符，类型string|


5）=== 游戏任务 ===

`说明：统计游戏内任务完成的次数和主要处于那个等级段`

```javascript
EgretSA.onTaskCompleted(type, taskName); // 完成任务
//示例：
EgretSA.onTaskCompleted(1, "通过关卡第一章"); // 完成主线任务，通过关卡第一章
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|type |任务类型 | 1主线 2支线 3其它，类型int  |
|taskName |任务名称|不允许为空，最多32个字符，类型string	|

6）=== 游戏关卡 ===

`说明：统计游戏内首次完成某一个关卡的次数和处于那个等级段`

```javascript
EgretSA.onLevelDesignCompleted(type, levelDesignName); // 关卡成功
EgretSA.onLevelDesignFailed(type, levelDesignName); // 关卡失败
//示例：
EgretSA.onLevelDesignCompleted(1, "关卡1"); // 完成主线关卡1
EgretSA.onLevelDesignFailed(1, "关卡1"); // 通过主线关卡1失败
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|type |关卡类型 | 1主线 2支线 3副本 4其它，类型int  |
|levelDesignName |关卡名称|不允许为空，最多32个字符，类型string	|


7）=== 统计游戏内钻石消耗、赠予分布 ===

```javascript
EgretSA.onDiamondUse(item, itemNumber, priceInDiamond);
//示例：
EgretSA.onDiamondUse("重置副本", 1, 20); // 重置1次副本，重置副本单价20钻石

```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|item |某个消费点编号或名称 | 不允许为空，最多32个字符，类型string |
|itemNumber|消费数量|不允许为空，类型int|
|priceInDiamond|消费点单价|不允许为空，类型int|

`说明：item 值最多不可超过100个，如开宝箱有4种类型1000个宝箱，item 要写成 类型1宝箱，而不`
`要写成开宝箱1001这样`


```javascript
EgretSA.onDiamondReward(num, reason);
//示例：
EgretSA.onDiamondReward(100, "任务奖励"); // 任务奖励得到100钻石
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|num |钻石数量 | 不允许为空，类型int|
|reason|理由|不允许为空,最多32个字符，类型string|

8）=== 统计游戏内金币消耗、获取分布 ===

```javascript
EgretSA.onGoldOutput(num, reason);
//示例：
EgretSA.onGoldOutput(10, "任务奖励"); // 完成某一个任务奖励10个金币

```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|num |金币数量 | 不允许为空，类型int|
|reason|理由|不允许为空,最多32个字符，类型string|

```javascript
EgretSA.onGoldUse(item, itemNumber, priceInGold);
//示例：
EgretSA.onGoldUse("重置副本", 1, 200); // 重置1次副本，重置副本单价200金币

```
`说明：item 值最多不可超过100个，如重置副本有4种类型1000个重置副本，item 要写成 类型1重置`
`副本，而不要写成重置副本1001这样`

| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|item |某个消费点编号或名称 | 不允许为空，最多32个字符，类型string |
|itemNumber|消费数量|不允许为空，类型int|
|priceInGold|消费点单价|不允许为空，类型int|

9）=== 统计游戏内活动参加的次数 ===

```javascript
EgretSA.onJoinActivity(item);
//示例：
EgretSA.onJoinActivity("魔王活动"); // 参加魔王活动
```
| 字段名  | 字段描述  | 备注  |
| ------------ | ------------ | ------------ |
|item |活动编号或名称 | 不允许为空，最多32个字符，类型string|


10）=== 离开游戏 ===

```javascript
EgretSA.onLeave();
//在玩家退出游戏页面的时候调用，此方法如果游戏监测不到离开游戏可以不用调用
```



如何判断统计是否接入成功?
查看 浏览器审查元素里 loadingStat.php 返回值 {"code":0,"msg":"ok"} 表示接入成功否则返回失败原因
如果找不到 loadingStat.php 请查看 EgretSA.init() debug 参数是否是true，true 默认是不会发送统计的，需要改成false

#### 三、常见问题

1）编译不能通过 Cannot find name 'esa' ，编译项目的时候用 egret build -e 把引擎和项目一起编译一下。

