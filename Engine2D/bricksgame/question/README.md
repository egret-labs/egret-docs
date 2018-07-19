# 新手教程

针对目前玩一玩平台的部分相关问题，在此做出回应。日后会持续更新。

首先，强调一些玩一玩平台的技术限制：
 - 玩一玩平台不支持基于DOM Document对象的HTML元素处理
 - 玩一玩平台不支持皮肤的远程加载，所有皮肤必须声明到egret项目的 `default.thm.json` 文件当中。
 - 不允许动态执行代码能力。

 接下来向诸位开发者汇总一下进来的玩一玩平台开发普遍问题以及解决方案：

## 问题
### 我的玩一玩项目为什么在Xcode上运行没有问题，可在手机QQ上加载不出图片，也没有报错？

答：这种问题基本可以确定是文件根目录缺少前缀导致的。玩一玩平台的路径要求前缀为 `"GameRes://"` ,egret中针对其做了资源配置的处理。可以查看js/main.js文件，查看以下两段代码。

![资源加载配置路径](./ziyuan03.png)

![皮肤加载配置路径](./pifu02.png)

这两段代码如果与图示相同，之后的资源加载就无需加入前缀了。

## 打包好玩一玩项目，运行到手机上完全黑屏，资源加载也没有问题。

答：如果是直接通过 [厘米游戏](http://hudong.qq.com/) 的游戏管理上传的包，有一下两种情况。

- 安卓端与ios端都显示为黑屏。
 
 可能是混淆导致类名变动的问题，使得找不到egret项目的主入口类。需要在js/main.js文件中加入以下代码。

 ![类名混淆](./calss04.png)
 
 这样，代码即使经过提交混淆也可以找到主类了。

 - 只有安卓端显示黑屏，ios显示正常。

 ios平台与安卓平台的差异导致promise在两个平台上的不同。需要替换提交包中 `js/promise.js` 文件。目前在安卓端可以稳定运行的promise.js文件地址为:https://github.com/egret-labs/egret-target-bricks/tree/master/template/PublicBrickEngineGame/Res/js 。下载并更新 `js/promise.js` 文件后，还需要手动修改 `manifest.js` 文件。

 ![promise引用](./promise01.png)

 保证在manifest.js文件中第一个被引用即可。

 ## socket在玩一玩平台是不支持吗？为什么socket一直连接不上？
 socket在玩一玩平台是支持的。socket连接不上可能是 `manifest.js` 中引用导致的问题。
 首先，确认您的原egret项目引用了我们提供的socket通讯库。
 之后，检查发布后的 `manifest.js` 文件。

  ![socket引用](./socket04.png)

  确保socket.js库在`egret.js`与`egret.bricks.js`之间引用。
  这样就可以保证socket库加载成功了。调用egret.WebSocket API即可调用socket。

## 游戏在Xcode环境下正常运行，但上传提交至平台后进行真机测试时安卓端黑屏，iOS端卡在加载至99%的地方。

答：如果您遇到的情况如下：

 - 您的游戏在Xcode中正常运行无报错信息。

 - 对于安卓端：在手Q中直接替换游戏包，游戏正常运行无报错信息；

 - 对于iOS端，在测试手Q中替换游戏包，游戏正常运行无报错信息。

 - 经过上传提交至平台后进行真机测试时安卓端黑屏，iOS端卡在加载至99%的地方。

那么，您的代码极有可能因受到玩一玩平台代码混淆机制的影响而无法正常运作。

通过 [厘米游戏](http://hudong.qq.com/) 的游戏管理上传的包会被进行代码混淆，因此当您的代码在不经过上传环节时，可以正常运行，并且不会暴露出任何问题。如果您将Bricks引擎申明的变量或接口申明为局部变量，该变量的作用域将覆盖掉原本Bricks引擎申明的变量，并且在上传之后，该局部变量会被混淆。

例如，如果您为方便使用而申明了一个局部变量GameStatusInfo，如下图所示。

 ![类名混淆](./local01.jpg)

则正常代码如下：

![类名混淆](./local03.jpg)

经过代码混淆后，代码如下：

![类名混淆](./local02.jpg)

此时原本的GameStatusInfo被混淆为As。此时Bricks引擎申明的GameStatusInfo.QQVer无法被访问到，而As.QQVer为undefined，因此导致游戏无法正常运行。

我们强烈建议您用declare的方式来访问Bricks引擎已申明的变量、接口。

在*.d.ts文件中进行如下声明：

``` javascript
declare var GameStatusInfo: {
	roomId: number,
}
```

即可在项目中使用Bricks引擎提供的相关变量和接口，避免混淆机制的困扰。


```
console.log("开始游戏roomID:“ + GameStatusInfo.roomId); 
```

有更多的相关问题请您到egret论坛bbs.egret.com参与讨论。我们也会持续更新问题以及解决方案。