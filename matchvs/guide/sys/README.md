Matchvs 提供了两套环境，测试环境 alpha 和正式环境 release，两套环境提供的功能一模一样。两套环境是完全隔离的，目的是让游戏调试和线上运行互不干扰。

![](http://imgs.matchvs.com/static/alphaRelease.png)

在官网创建完游戏，默认是alpha可用，release不可用。所以如果想要使用release环境，务必先在官网上进行“发布上线”的操作，审核通过之后，即可使用release环境。

![](http://imgs.matchvs.com/static/2_4.png)

游戏当前使用"alpha" 还是 “release” 在SDK的`init()`进行指定。

gameServer的运行，如果是在命令行工具开启本地调试，则SDK需要填写 alpha 环境；

如果 gameServer 上传代码，并在官网或命令行工具发布启动，则SDK需要填写release环境。

![](http://imgs.matchvs.com/static/alphaRelease2.png)