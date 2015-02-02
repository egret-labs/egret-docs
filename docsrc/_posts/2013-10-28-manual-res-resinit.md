---
layout: post
title:  "载入资源加载配置"
permalink: post/manual/loader/resinit.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

要购买物品，我们首先要把清单拿到手，也就是前一节所说的资源加载配置，然后才能按照清单加载指定的资源。     
     
RES模块对资源加载配置有两种读取方式，一种是外部文件，另一种是直接读取。    
    
#### 文件载入读取方式

这是一个json文件，通常我们取名为`resource.json`。载入代码如下：

{% highlight java %}
RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this );
RES.addEventListener( RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this );
RES.loadConfig("resources/resource.json","resources/");
{% endhighlight %}

`loadConfig`函数做执行的动作即为初始化RES资源加载模块。该函数包含两个参数，第一个参数是`resource.json`文件的完整路径，第二个参数是配置中每个资源项url相对路径的基址。例如配置里的bgImage资源项填的url是`assets/bg.jpg`，加载时将会拼接为相对路径：`resources/assets/bg.jpg`。

若需要在初始化完成后再做一些处理，监听`ResourceEvent.CONFIG_COMPLETE`事件即可。

当然，载入配置也难保证完全不出差错，所以最好监听 `ResourceEvent.CONFIG_LOAD_ERROR`事件，并在处理函数做一些error log处理之类。

>注意：RES.loadConfig()通常应写在整个游戏最开始初始化的地方，并且只执行一次。
    
#### 直接读取方式

直接读取方式，就是免去了加载配置文件的过程。直接将资源加载配置内容以参数方式给出。    

假设采用与上一节相同的资源加载配置，且资源相对路径的基址仍为`resources/`。则直接读取配置的代码：     

{% highlight javascript %}
RES.parseConfig(
	{
	"resources":
	    [
		{"name":"bgImage","type":"image","url":"assets/bg.jpg"},
		{"name":"egretIcon","type":"image","url":"assets/egret_icon.png"},
		{"name":"description","type":"json","url":"config/description.json"}
	    ],

	"groups":
	    [
		{"name":"preload","keys":"bgImage,egretIcon"}
	    ]
	}
	,"resource/"
);
{% endhighlight %}
    
#### 两种读取方式对比说明

很显然，直接读取的方式直截了当，一步到位，没必要建立单独的配置文件，也不用侦听`CONFIG_COMPLETE`事件。   

并且这两种方式的结果是等效的。即直接读取方式`RES.parseConfig`执行完毕，相当于文件读取方式`CONFIG_COMPLETE`事件被调度时。此时资源加载配置已经读入RES模块，则可以立即载入配置中的资源组，或者动态创建配置中存在的资源组，进行实际的资源加载了。    

直接读取方式的另一个优点就是，可以灵活配置，比如根据游戏情节需要，下一步载入的资源会不同。直接读取方式就可以动态组合配置，其中只列出当前需要的资源。   





















