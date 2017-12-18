Egret Inspector 2.5.5 更新说明

最近更新时间：2017年12月18日

## 概述
* 更改了插件的安装方式，chrome 63版本以后要使用扩展中的开发者模式安装。

## 更新内容

* 增加了监听端口断开重连事件chrome.runtime.connect().onMessage。
* 修复了使用typeof方法无法区分array和object类型，使用Array.isArray()方法代替。

## 已知问题

* 在个别游戏项目中，树结构面板操作无法同步到舞台上，需要开发者使用F12重新打开开发者模式后刷新游戏界面即可。