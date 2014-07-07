---
layout: post
title:  "预加载资源组"
permalink: post/manual/loader/loadresgroup.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

在配置文件加载完成后，我们可以调用RES.loadGroup(name:string,priority:number=0)开始预加载配置中的一组资源。该函数需要两个参数，参数"name"对应配置文件中的资源组名。预加载可以在游戏启动时，也可以是某个面板被打开前，调用时机由具体项的目逻辑确定。代码如下：

{% highlight java %}
RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
RES.loadGroup("preload");
{% endhighlight %}

这里需要注意，组加载事件回调函数里的写法，需要使用event.groupName判断下这个事件是属于哪个资源组，因为可能有多个资源组同时在加载。示例代码如下：

{% highlight java %}
private onResourceProgress(event:RES.ResourceEvent):void {
    if(event.groupName=="preload"){
        this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
    }
}
{% endhighlight %}

若同时启动多个资源组一起加载，比如在加载"preload"前，我们希望先加载一个更小的"loading"资源组，以提供显示"preload"组加载进度的素材，可以使用RES.loadGroup()的第二个参数，为"loading"组传入一个优先级更大的数字，来迫使loading组在preload前加载完成，代码如下：

{% highlight java %}
RES.loadGroup("loading",1);
RES.loadGroup("preload",0);
{% endhighlight %}