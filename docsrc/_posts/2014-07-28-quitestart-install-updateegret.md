---
layout: post
title:  "更新Egret引擎"
permalink: post/quitestart/install/updateegret.html
categories: installegret
type: quitestart
element: quitestartinstall
version: Egret引擎 v1.x
---

####Egret官方已经修复的问题，应该如何更新
---

1. 下载Egret的新版本，或者使用 git pull 来更新引擎代码。
2. 在命令行中 进入 egret 目录。
3. 执行 `npm install -g` 重新安装 Egret 
4. 重新编译你的项目，执行 `egret upgrade {your_project}`来更新你的项目代码。
5. 执行 `egret build {your_project} -e`，来编译新项目。
 

**注意：更新 egret 后请务必不要忽略 `-e` 参数，此命令是在构建项目的同时编译一次引擎代码。**