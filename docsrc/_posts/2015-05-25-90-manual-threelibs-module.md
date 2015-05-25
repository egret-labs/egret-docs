---
layout: post
title:  "项目模块化配置"
permalink: post/manual/threelibs/module.html
type: manual
element: threelibs
version: Egret引擎 v1.6+
---


每一个 Egret 项目中都有一个名为 `egretProperties.json` 的文件，这个文件描述了此项目的配置信息，其中包含一个 `modules` 字段，用于标记项目中依赖的模块。

为统一管理，Egret官方库也作为模块呈现，这样设计的目的是避免加载不需要的模块，减少最终代码的体积，提高加载速度。     
官方库分为5个模块：core，RES、DragonBones、WebSocket及gui。     
这几个模块在进行配置时使用的模块名，即在modules配置项的列表中添加的name名称分别为：
core，res、dragonbones、socket及gui。    

`core`模块是一个比较重要的模块，所有的Egret项目都应该包含这个模块，否则所有的基础功能都无法实现。     
`res`模块也是基础的模块，因为所有涉及资源载入的工作，都需要这个模块来完成。       
使用`egret build <项目名称>`命令创建的项目，将会默认带这两个官方模块：`core`和`res`模块。      

如果需要除这两个模块之外其他的官方模块，比如`socket`模块，只要在`egretProperties.json`这样配置即可：
      
{% highlight java %}
"modules": [
	{
	"name": "core"
	},
	{
	 "name": "res"
	},
	{
	  "name": "socket"
	}
],
{% endhighlight %}

如果需要用到非官方库，请看下篇教程。