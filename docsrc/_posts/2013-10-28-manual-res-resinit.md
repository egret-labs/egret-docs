---
layout: post
title:  "初始化资源加载模块"
permalink: post/manual/loader/resinit.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

在正式使用RES资源加载模块之前，我们要对模块进行初始化。这个初始化的过程实际上就是加载resource.json配置文件。resource.json配置文件包含了游戏资源的配置信息，这些信息要填充到RES资源加载模块中，随后资源加载模块才能对指定的资源进行加载操作。初始化RES资源加载模块的代码如下：

{% highlight java %}
RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this );
RES.addEventListener( RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this );
RES.loadConfig("resources/resource.json","resources/");
{% endhighlight %}

`loadConfig`函数做执行的动作即为初始化RES资源加载模块。该函数包含两个参数，第一个参数是`resource.json`文件的完整路径，第二个参数是`resource.json`里每个资源项url的前缀。例如配置里的bgImage资源项填的`url是assets/bg.jpg`，在这里实际加载时将会采用`resources/assets/bg.jpg`来加载。

若需要在初始化完成后再做一些处理，监听`ResourceEvent.CONFIG_COMPLETE`事件即可。

当然，载入配置也难保证完全不出差错，所以最好监听 `ResourceEvent.CONFIG_LOAD_ERROR`事件，并在处理函数做一些error log处理之类。

>注意：RES.loadConfig()通常应写在整个游戏最开始初始化的地方，并且只执行一次。