---
layout: post
title:  "配置声音资源"
permalink: post/manual/loader/ressound.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---


声音资源需要配置soundType属性，在native和runtime上会根据soundType对声音进行不同的处理。

![img]({{site.baseurl}}/assets/img/soundType.jpg)

其中music表示背景音乐，背景音乐在native上只能同时播放一个。effect表示音效，音效可以和背景音乐一起播放还可以多个音效一起播放。

值得注意的是：音效的播放时长尽量不要过长，采样频率不要过大。