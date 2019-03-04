# 白鹭引擎 5.2.15 发布日志


===============================

更新时间：2019年3月4日

## 2D 渲染 - JavaScript 
* 修复在 IE11 上加载资源时，加载进程会被卡住的问题(感谢开发者：黑桃互动团队)
* HttpRequest 增加对 `timeout` 属性的支持


## AssetsManager
* 在 AssetsManager 中，`RES.getResByUrl` 方法必须在 `loadConfig` 之后调用。如果在此之前调用，程序会报错中止运行。现在优化体验，改为提示报错信息，但程序还可以继续运行。


## 微信小游戏 v1.1.10
* 当适配模式为平台不支持的 `showAll` 时，自动替换为 `fixedWidth` 模式
* 修复 egret.Capabilities.os 一直是返回 `iOS` 的问题。(感谢开发者：浅蓝色的胖子)
* 兼容性优化，引擎的帧频不为 60fps 时，画面会出现闪烁的问题。


## 百度小游戏 v0.1.4
* 当适配模式为平台不支持的 `showAll` 时，自动替换为 `fixedWidth` 模式
