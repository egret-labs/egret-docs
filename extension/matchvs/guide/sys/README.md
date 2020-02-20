# Matchvs 服务环境
#### Matchvs 服务可使用几套环境？
Matchvs 提供了两套环境，测试环境 alpha 和正式环境 release，两套环境提供的功能一模一样。两套环境是完全隔离的，目的是让游戏调试和线上运行互不干扰。

![](http://imgs.matchvs.com/static/alphaRelease.png)



#### alpha 环境和 release 环境有什么区别？

- alpha 环境是创建游戏后Matchvs默认使用的环境，一般用于开发者调试和开发游戏使用，每天有固定的1G免费流量使用。如果不超出流量范围是不会产生费用。 
- release 环境是需要开发者开启发布上线才能使用。是用于众多开发者的正式线上环境。release 环境上会根据流量和用户来计算相关的费用，具体的费用扣除方法可以参考我们的 [付费说明](../PaymentHelp) 。

#### Matchvs 环境怎么切换？

在官网创建完游戏，默认是使用 alpha 环境，release 是不可用的。如果想要使用release环境，务必先在官网上进行“发布上线”的操作，审核通过之后，即可使用release环境。

![](http://imgs.matchvs.com/static/2_4.png)

- Matchvs SDK 中调用 init(...) 接口，通过传入的参数来指定 使用release 环境，还是使用 alpha 环境。

- gameServer 中本地调试就是指 alpha 环境，gameServer 发布上线后就是 release 环境。

- gameServer的运行，如果是在命令行工具开启本地调试，则SDK需要填写 alpha 环境；如果 gameServer 上传代码，并在官网或命令行工具发布启动，则SDK需要填写release环境。

![](http://imgs.matchvs.com/static/alphaRelease2.png)