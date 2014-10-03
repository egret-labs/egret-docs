---
layout: post
title:  "插件体系"
permalink: post/guimanual/wing/wingplugin.html
type: guimanual
element: wing
version: Egret引擎 v1.x
---

Egret Wing 允许用户利用as3为其开发插件，以满足用户定制化开发流程。

####资源插件
---

资源插件的本质为资源适配器，是从资源的name得到真实资源的一个桥梁。Egret Wing默认提供的资源插件为Egret RES，此插件获取资源的流程链为：资源名——资源配置文件resource.json——真实文件。
