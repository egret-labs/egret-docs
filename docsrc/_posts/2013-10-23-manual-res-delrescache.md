---
layout: post
title:  "销毁缓存的资源"
permalink: post/manual/loader/delrescache.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

resource在第一次加载资源后，会缓存下来这个资源。使用`RES.destroyRes(name:string):boolean`，传入资源文件的`name`，即可清理对应的缓存。传入资源组名，即可清理整个资源组里所有资源对应的缓存。如果要销毁通过RES.getResByUrl(url)加载的资源，传入`url`作为`name`即可。

由于目前JS里没有弱引用字典，无法实现资源的自动回收，所以还需要手动去销毁缓存的资源。
