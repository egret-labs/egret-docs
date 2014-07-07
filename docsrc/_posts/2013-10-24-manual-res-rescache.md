---
layout: post
title:  "资源的缓存机制"
permalink: post/manual/loader/rescache.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

resources节点下配置的每个资源加载项，在第一次加载成功时会用name属性作为key缓存下来。以后再请求它时，都直接从缓存里取。如果有两个组都含有一个资源，第二个组再加载这个资源时，也会直接从缓存里得到结果，不会重复发起加载请求。