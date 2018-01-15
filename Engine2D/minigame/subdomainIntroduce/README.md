## 小游戏子域与主域简介

### 什么是子域和主域

为了保证关系链数据的安全，我们创建了一个和执行主体逻辑的 `主域` 独立且隔离的 JS 作用域，称之为 `子域`。主域即是入口文件 `game.js` 运行的 JS 域，子域则是另一入口文件 `sub.js` 运行的 JS 域。子域具有以下特点：

- 可以调用获取群成员数据的等开放数据接口。
- 不能与第三方服务器通信。
- 不能调用数据缓存接口。
- 主域可以向子域自由发送数据，但是子域向主域发送数据的能力受到限制。
- 子域内只提供绘制交互必须的 API，其余 JSAPI 均不支持。


### 子域的限制和可以使用的 API

* 主域和子域是同一个线程内的两个隔离的 JS 作用域，相互之间不可访问彼此的变量。因此如果子域也需要引入游戏引擎，那么引擎文件必须和子域入口文件 sub.js 位于同一目录下。

##### Timer 相关
- requestAnimationFrame
- cancelAnimationFrame
- setTimeout
- clearTime
- setInterval
- clearInterval

##### 触摸事件 
- [wx.onTouchStart]()
- [wx.onTouchMove]()
- [wx.onTouchEnd]()
- [wx.onTouchCancel]()
- [wx.offTouchStart]()
- [wx.offTouchMove]()
- [wx.offTouchEnd]()
- [wx.offTouchCancel]()

##### 创建画布
- [wx.createCanvas]()
** 子域的所有画布只支持 `2D` 渲染模式 **

##### 创建图片
- [wx.createImage]()

##### 开放数据
- [wx.getGroupUserGameData]()

##### 通信
- [postMessage]()
- [onMessage]()


### 使用子域所需的配置

开发者需要在 `game.json` 中指定子域目录。子域的入口文件是 sub.js 必须位于该目录中，且该目录下的 js 文件只能 require 该目录下的其他 js 文件。

```json
{
  "subContext": "src/SubContext"
}
```

### sharedCanvas
子域和主域可以访问一个全局共享的离屏画布 sharedCanvas。子域可以在获取关系链数据后将排行榜、群成员列表绘制在 sharedCanvas上，然后由主域再将 sharedCanvas 绘制在主屏上。

#### 交互

sharedCanvas 虽然是离屏画布，但是在 adapter（[什么是adapter]()）中做了处理，将通过 wx.onTouchStart 监听的屏幕触摸事件透传给了 sharedCanvas。需要注意的是，这里的触摸事件是屏幕触摸事件，该触摸点是否落在画布内还需要开发者自行判断。  


### 数据

每个用户在游戏中的数据分为两部分：

- 微信数据：包括该用户的 openId、昵称、头像
- 游戏数据：包括该用户在游戏中的段位、战绩、属性、宠物等信息，有着自己的结构。  
微信数据和游戏数据需要一一对应，由于微信数据不能在主域获取且不会暴露到主域，因此需要开发者将需要和微信数据一并展示的游戏数据托管在微信后台。我们提供了以下接口：

|                           接口                          |         说明         |      域限制      |
|---------------------------------------------------------|----------------------|------------------|
| [createUserGameData]()     | 创建用户的游戏数据   | 只有主域可调 |
| [updateUserGameData]()     | 更新用户的游戏数据   | 只有主域可调 |
| [getGroupUserGameData]() | 获取群成员的游戏数据 | 只有子域可调，且必须是在小程序从群分享卡片打开的情况下 |

存储在微信后台的用户数据结构如下：

|    属性   |  类型  |                                                            说明                                                            |
|-----------|--------|----------------------------------------------------------------------------------------------------------------------------|
| openId    | String | 用户的微信 openId                                                                                                          |
| nickName  | String | 用户的微信昵称                                                                                                             |
| avatarUrl | String | 用户的微信头像 url                                                                                                         |
| buffer    | String | 序列化后的用户的游戏数据。每款游戏的游戏数据都有着自己的结构，微信后台不去理解游戏数据的具体结构，只存储序列化后的游戏数据 |

### 通信

小游戏提供了 [postMessage]() 和 [onMessage]() 

#### 主域向子域发送消息

主域向子域发送消息的行为不受限制，postMessage 的参数必须是一个 JavaScript 对象。接口用于主域和子域的通信。

** 示例代码 **

主域

```javascript
wx.postMessage({ data: 1234 })
```

子域

```javascript
wx.onMessage((message) => {
  console.log('收到主域的消息', message)
})
```

#### 子域向主域发送消息

子域每次调用 postMessage 只能向主域发送单个用户的数据。postMessage 方法会拉起一个模态对话框，只有在用户点击确认的情况下数据才会发送到主域。子域 postMessage 参数格式如下所示：

|   属性  |  类型  |                     说明                     |
|---------|--------|----------------------------------------------|
| content   | String | 模态对话框的内容                             |
| action  | String | 用户的自定义数据，只能是预定义的集合中的一个 |
| openId | String | 单个用户数据的 openId，且必须是通过 wx.getGroupUserGameData 获取到的某个用户的 openId，postMessage 接口内部会将 openId 转换为相应的用户数据发送给主域                         |

需要将关系链中的用户信息给到开发者，通常是当前用户与某位用户发生了战斗、邀请等交互的时候。action 用来描述两个用户之间发生的交互，其的合法值需要开发者在 game.json 中提前定义。

```json
/** game.json **/
{
  "actions": ["invite", "fight", "send_gift"]
}
```

** 示例代码 **

子域

```javascript
wx.onShow((options) => {
  // 1044 带 shareTicket 的小程序卡片
  if (options.scene === 1044) {
    wx.getGroupUserGameData({
      success: (res) => {
        let openId = res.data[0].openId

        wx.postMessage({
          content: '确认邀请该玩家吗?',
          openId: 'openId',
          action: 'invite'
        })
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    })
  }
})
```

主域

```javascript
wx.onMessage((message) => {
  console.log('主域收到消息', messsage.data, message.action)
})
```

#### 时序

如上文所述，主域和子域只是同一个线程的两个隔离的 JS 作用域。所以主域在调用 postMessage 后，会依次发生以下的事情：

1. 子域执行 onMessage 中的代码
2. 主域接着执行 postMessage 调用之后的代码


** 示例代码 **

主域代码
```javascript
wx.postMessage({ number: 123 })
console.log(123)
```

子域代码
```javascript
wx.onMessage((message) => {
  var n = 456
  console.log(message.number + n)
})
```

输出结果为：  
子域：579  
主域：123  

反之子域调用 postMessage 向主域发送消息也如此。