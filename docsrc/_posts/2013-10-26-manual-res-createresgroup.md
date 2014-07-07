---
layout: post
title:  "运行时动态创建资源组"
permalink: post/manual/loader/createresgroup.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

若资源组无法预先配置在文件中，需要运行时才能动态确定的，我们可以通过调用RES.createGroup(groupName:string,keys:Array)方法，动态创建一个资源组，再加载它。

**groupName：**是要创建的资源组组名。

**keys：**这个资源组包含的资源列表。里面的key对应配置文件里的name属性或一个资源组名，若key是资源组名将类似合并资源组的功能。你可以同时传入多个已存在资源组名，合并成一个新资源组。

动态创建资源组之后，调用loadGroup()一次加载完。

**注意：createGroup()方法是基于已存在的配置属性操作的，调用这个方法前请先确认RES的配置文件已经加载完成了。也就是在监听到ResourceEvent.CONFIG_COMPLETE事件之后。**