---
layout: post
title:  "更新Egret引擎"
permalink: post/quitestart/install/updateegret.html
categories: installegret
type: quitestart
element: quitestartinstall
version: Egret引擎 v1.x
---



1. 打开Egret引擎面板。
2. 点击检查更新，你可以开启“检查社区体验版更新”，开启后可更新社区版。
3. 如果检查到存在新版本，点击“立即下载”即可更新

![mac]({{site.baseurl}}/assets/img/macupdate.png)

4. 重新编译你的项目，执行 `egret upgrade {your_project}`来更新你的项目代码。
5. 执行 `egret build {your_project} -e`，来编译新项目。
 

**注意：更新 egret 后请务必不要忽略 `-e` 参数，此命令是在构建项目的同时编译一次引擎代码。**