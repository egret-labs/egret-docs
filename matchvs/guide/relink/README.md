

Matchvs 提供了断线重连的功能：当客户端网络异常（包含网络关闭、弱网络、挂起至后台等情况），网络异常时应用层会收到“检测到客户端已经断线的`errorResponse` 错误码1001。此种情况下可以使用 reconnect接口进行重连。

#### 重连的原理

> reconnect = (haveLogin?nothing:dologin)+jointeam+jionroom 

在reconnectResponse 接口可以得到重连的结果

如果调用重连成功，断线的用户将收到 reconnectResponse 接口返回 200 状态值，客户端需要把游戏定位到房间或者游戏界面还原游戏场景，其他用户会收到 networkStateNotify 接口的回调信息，根据 state 判断用户是否重连成功。

如果重连失败则会在 reconnectResponse 接口收到错误码，当错误码为 201 的时候说明你已经不能再加入房间了，这个时候你将处于已经登录状态，不用再次调用 login 接口。

**房间断线重连超时时间默认是 20秒，可以由开发者自己调用 setReconnectTimeout 自己设置超时时间,需要每次进入房间之前设置超时时间。（可支持的SDK版本 v3.7.5.0+）** 

**组队重连的超时默认是不允许重连（可支持的SDK版本 v3.7.9.2+）**

#### 最佳实践

先login后必须设置重连时间
```
engine.setReconnectTimeout(59) //房间重连超时
engine.setTeamReconnectTimeout(59) //组队重连超时
```
断开后调用reconnect的时机

> 1: 被杀进程的情况                      -> login+reconnect
> 2: 拔网线掉线 的情况                 -> button.onclick -> reconnect 



**重连接口的调用 不要直接写在 errorReponse 回调里面,不然会出现反复断线反复重连死循环情况**



断线重连接口使用说明请看 [API文档](../APIDoc/JavaScript)    

## 自定义重连逻辑

设置重连时间后,如若异常掉线,再次login的loginRsp中会返回掉线前的teamID和roomID

可以调用joinRoom和joinTeam(需设定参数joinType的值为1)自定义自己的重连逻辑,SDK也是在此基础上实现的reconnet接口.

## 流程图

#### 玩家重连结果通知

![](http://imgs.matchvs.com/static/reconnect4.png)  

reconnectResponse接口是重连的结果。

- 重连如果成功接口会返回 200 的 status。并且会收到 hotel 的心跳日志。这个时候用户处于房间内，用户可以进行房间内的所有操作，比如 sendEvent ， sendEvenEx， kickPlayer, setFrameSync, sendFrameEvent 等等。
- 重连如果返回 201，是因为你断线的时间过久不能重连进入房间了。这个时候玩家是处于已经登录状态，可以看到 gateway 的心跳日志。玩家不用再次调用 login 了。玩家可以进行 joinRandRoom ，createRoom 等操作。

#### 其他玩家重连结果通知

如果服务端检测到客户端网络异常，则服务端会通过`networkStateNotify`告诉其他客户端“检测到客户端C已断线，正在进行重连”。如果重连成功，服务端会通知其他客户端“客户端C已经重连成功”；如果重连失败，服务端会通知其他客户端“客户端C重连失败”。

![](http://imgs.matchvs.com/static/reconnect2.png)

networkStateNotify 接口 state 结果值

- 如果有用户断线了 state 为 1。
- 如果用户正在重新连接 state 为 2.
- 如果用户用户不能 再重连了彻底离开了房间 state为 3。
- 如果用户重连成功了 networkStateNotify 接口没有通知，需要玩家自己使用 sendEvent 接口发送消息 告诉其他人。









