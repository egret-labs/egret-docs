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
RES.addEventListener( RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this );
RES.addEventListener( RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this );
RES.addEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadErr, this );
RES.loadGroup( "preload" );
{% endhighlight %}     

##### 事件对应的资源组  
这里需要注意，组加载事件回调函数里的写法，需要使用event.groupName判断下这个事件是属于哪个资源组，因为可能有多个资源组同时在加载。示例代码如下：

{% highlight java %}
private onResourceProgress( event:RES.ResourceEvent ):void {
    if( event.groupName=="preload" ){
        this.loadingView.setProgress( event.itemsLoaded,event.itemsTotal );
    }
}
{% endhighlight %}    
     
##### 资源组加载失败处理         
由于网络等原因，可能造成资源加载失败，这种情况下将会派发GROUP_LOAD_ERROR事件，可以在事件处理中重新加载资源：

{% highlight java %}
private onResourceLoadErr( event:RES.ResourceEvent ):void {
    RES.loadGroup( event.groupName );
}
{% endhighlight %}    
在复杂的网络环境，可能会出现多次加载失败，这时我们可能需要在一定的失败次数之后停止加载，因为可能网络已经失去连接，那么我们可以通过对加载失败次数进行计数。
假设有一个成员`countGroupError`用来计数加载失败次数，其初始值为`0`，则处理函数修改为：

{% highlight java %}
private onResourceLoadErr( event:RES.ResourceEvent ):void {
    if( ++this.countGroupError < 3 ){
        RES.loadGroup( event.groupName );
    }else{
        /// 弹出网络失去连接提示等
    }
}
{% endhighlight %}    

对于多个资源组同时加载的情况，`countGroupError`可以使用一个以`groupName`为键的哈希数组来记录每个资源组的加载失败次数。

##### 同时进行多资源组加载时的优先级控制     
若同时启动多个资源组一起加载，比如在加载"preload"前，我们希望先加载一个更小的"loading"资源组，以提供显示"preload"组加载进度的素材，可以使用RES.loadGroup()的第二个参数，为"loading"组传入一个优先级更大的数字，来迫使loading组在preload前加载完成，代码如下：

{% highlight java %}
RES.loadGroup("loading",1);
RES.loadGroup("preload",0);
{% endhighlight %}
