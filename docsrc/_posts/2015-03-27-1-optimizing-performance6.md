---
layout: post
title:  "第六章：环境优化"
permalink:  post/manual/optimizing/performance6.html
type: manual
element: optimizing
version: Egret引擎 v1.6.1
---


### IOS

预加载资源非常多，会使整个游戏帧率降低，合理的将零散位图合并为独立纹理集，减少配置文件数目，不是必要的文件放入游戏后加载。

### QQ浏览器

推荐位图的宽高限定在2048*1024。

1G内存手机最多可以使用20个Canvas，而引擎中cacheAsBitmap 是基于创建Canvas实现的，这里有一个小技巧，cacheAsBitmap配合对象池使用。可参考一下示例：

   https://github.com/xinfangke/egretDocsTest/blob/master/test1.ts
   https://github.com/xinfangke/egretDocsTest/blob/master/test2.ts

### 利用Chrome 调优

Chrome的profiles可以帮助我们确定代码执行效率，从而确定性能原因。

![]({{site.baseurl}}/assets/img-optimzing-performance/performance6-1.png)![]({{site.baseurl}}/assets/img-optimzing-performance/performance6-2.png)

其他参考：

关于profiles使用：http://www.qingdou.me/3719.html

写出性能最优的代码(1) ：http://bbs.egret-labs.org/thread-6198-1-1.html

写出性能最优的代码(2) ： http://bbs.egret-labs.org/thread-6197-1-2.html