---
layout: post
title:  "显示对象种类"
permalink: post/manual/display/displayclass.html
type: manual
element: manualdisplay
version: Egret引擎 v1.x
---

Egret在架构设计过程中围绕显示列表的概念，对所有对象进行了严格的封装。在Egret中，所有的显示对象均继承自 `DisplayObject` 这个类。`DisplayObject` 类也就是我们前面描述的**“显示对象”**。在Egret中，所有的**“容器”**均继承自 `DisplayObjectContainer`。

为了统一管理显示列表，所有显示对象都统一于DisplayObject类。所有的显示对象都继承自DisplayObject，而DisplayObject则继承自EventDispatcher。也就是说所有的显示对象均可以发送事件。

DisplayObjectContainer显示对象容器的父类也是DisplayObject。

![display class]({{site:baseurl}}/assets/img/uml2.jpg)

我们在实际操作中把概念再次简化，可以归纳为两条规则：

1. 继承自DisplayObject的类都属于非容器。
2. 继承自DisplayObjectContainer的类都属于容器。