

通过接入 Matchvs SDK ，我们已经可以实现多人在线联网游戏。但对于部分复杂度比较高的游戏，往往需要在服务器端进行个性化的功能实现，如客户端之间的安全性校验、数据校验、结果仲裁、随机道具生成等功能。这时，Matchvs 推荐您使用 gameServer 框架。

## 一个例子

下面举一个简单的例子,帮我们理解 gameServer 框架。

有一个抢小饼干的游戏，两个玩家几乎“同时”抢到小饼干:

![](http://imgs.matchvs.com/static/Doc-img/new-start/gameServerimg/gsex.png)

以上示例简单说明了，我们利用 gameServer 可以根据玩家的地理位置及抢小饼干时机，去仲裁究竟谁抢到了小饼干。虽然我们也可以通过客户端实现这个机制，但这大大提升了客户端代码的复杂度，用 gameServer 来实现会非常便捷。

使用 gameServer 的另一个优势在于当游戏部分内容或玩法更新时，无需去重新发版客户端，直接修改服务端逻辑即可。

gameServer 远不止用于实现以上示例机制，更多丰富的游戏内逻辑都可以放到 gameServer ，这些取决于我们的游戏类型及游戏设计需求。

比如以下一些常见的游戏游戏应用场景：

**棋牌游戏里发牌方式的设计，抢地主的判定以及出牌有效性判定等功能；**

**MOBA游戏里，伤害判断，技能施用范围，障碍物判定，地图类型下发等功能；**

**大逃杀游戏里，枪支装备生成，毒圈范围变化，伤害判断等功能；**

**IO类游戏里，食物生成，边界判定，吞噬仲裁等功能。**



## 代码托管

Matchvs 提供了 gameServer 托管的功能，开发者无需自己搭建游戏房间服务器，自然也省去了维护服务器的麻烦。开发者需要做的只有：开发完游戏服务端逻辑，将代码上传到 git 仓库，然后发布启动 gameServer。

为方便开发者对线上的 gameServer 服务进行管理，Matchvs 提供了 gameServer 日志查看、告警通知、数据监控功能。

如果您不想将代码托管，可以使用 Matchvs 自托管方式，将 Matchvs 整套服务包括 gameServer 部署在自己的服务器上。

如果想要体验自托管，可以加入技术支持交流群（QQ 群: 450335262）向管理员索取自托管版本。

## gameServer 管理

Matchvs 提供了一系列 gameServer 管理功能，您可以点击 gameServer 名称进入 gameServer详情 ：

![](http://imgs.matchvs.com/static/Doc-img/new-start/gameServerimg/gslist.png)

## 平滑重启

如果游戏更新了 gameServer 功能，须在 gameServer 提交后，点击发布，然后点击重启。

你只需要评估最长一局游戏时长并设置，然后就可以保障所有玩家在服务升级时的良好体验。

重启时，Matchvs 提供了平滑过渡，即你可以设置一个旧版本 gameServer 保留时长，如 10min 。在 新的 gameServer 服务启动后，再过 10 min 旧的 gameServer停止，所有的玩家都会调度到新的 gameServer。

10 min 内，已经在 旧版本 gameServer 上的玩家不受影响，新的玩家会被调度到新的 gameServer。



## 数据库

Matchvs 提供了数据存储功能，详情可以参考[数据存储教程](https://doc.matchvs.com/APIDoc/dataStore)。如果您觉得不够用，则可以使用自己的数据库。

或者您有自己的服务器业务需要和 gameServer 进行互通，也通过以下方式实现。

**注意：以下方式适用于 release（现网正式） 环境，本地调试时无需配置**

前往 gameServer 访问授权页面设置：



![](http://imgs.matchvs.com/static/Doc-img/gamePub/GameServerImg/进入访问授权页面.png)

新增访问授权：

![](http://imgs.matchvs.com/static/Doc-img/gamePub/GameServerImg/新增访问授权.png)



等待访问授权审核通过：

![](http://imgs.matchvs.com/static/Doc-img/gamePub/GameServerImg/访问授权待审核.png)



访问授权审核通过：

![](http://imgs.matchvs.com/static/Doc-img/gamePub/GameServerImg/访问授权审核通过.png)

审核通过后即可在 release 环境下的 gameServer 中访问外部网络。

## 告警服务

当您的 gameServer 出现异常时，Matchvs 将会发送告警通知。您需要提前在告警设置页面，添加告警联系人。

![](http://imgs.matchvs.com/static/Doc-img/new-start/gameServerimg/gswarn1.png)

勾选联系人列表并点击保存，则之后如果 gameServer 异常，该联系人将会收到告警邮件。

如果需要添加新的联系人，则点击右上角“管理”即可。
