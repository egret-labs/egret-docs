---
layout: post
title:  "简介" 
permalink:  post/manual/optimizing/performance5.html
type: manual
element: optimizing
version: Egret引擎 v1.6.1
---
 
# 第五章：网络优化

### 资源划分

减少界面层次，多层组合为独立位图是目前高性能的方法。界面有时会分为单色背景，纹理，边框，子项边框等这种设定对于网络与程序性能没有提高，合并以上图层会对你应用带来质的飞跃。

合理的根据游戏进程去加载所需资源，常见的方法有每次场景变换加载所需资源，每次点击界面入口按钮加载界面资源并缓存，初始化应用只加载可能全局使用与当前可能需要的。分块分组（group）资源加载。

### 加载通信

当每次发起的HTTP请求会有协议头，确认过程，返回数据，优化合并文件减少请求数可以显著提高网络性能。

资源服务器开启GZIP压缩，提高载入速率。

使用egret compress_json 命令压缩Json文件，使体积减小。

加载中的显示对象，给予显示对象预设位图，这也许并不能带来网络性能提升甚至下降，但是这样的修改对于用户体验是极佳的。


![]({{site.baseurl}}/assets/img-optimzing-performance/performance5-1.png)  加载完成后----------》 ![]({{site.baseurl}}/assets/img-optimzing-performance/performance5-2.png)

如果不做预加载处理，用户并不了解屏幕中呈现的最终效果，也许认为游戏有问题，给予用户感知思考是非常友好的体验。

