---
layout: post
title:  "读取不同数据格式"
permalink: post/manual/net/netformat.html
type: manual
element: manualnetwork
version: Egret引擎 v1.x
---

在网络通信中，我们有时候不仅仅会加载一个简单的文本数据，更多时候我们会加载一些图片资源音频资源等等。

在针对不同格式数据的请求中，我们需要制定不同的处理方式。上一小节中，我们处理了一个简单的网络请求，同时返回了一段文本。这里是最基本的
数据格式，也是默认使用的数据格式。在Egret中，我们提供了五种可用的数据格式，分别是：

1. 二进制格式
2. 文本格式
3. URL编码格式
4. 位图纹理格式
5. 音频格式。

