---
layout: post
title:  "发送带参数的请求"
permalink: post/manual/net/senddata.html
type: manual
element: manualnetwork
version: Egret引擎 v1.x
---

如果在网络请求的同时还需要提交数据，那么可以使用 `URLVariables`。

使用 `URLVariables` 类可以在应用程序和服务器之间传输变量。将 `URLVariables` 对象与 `URLLoader` 类的方法、 `URLRequest` 类的
 `data` 属性一起使用。
 
 一般来说，向服务器提交数据实际上总是包含两个步骤，提交数据与读取返回信息。
 
 1. 提交的数据放入 `URLRequest` 对象的 `data` 属性值，并通过 `URLRequest` 对象提交。
 2. 读取服务器端脚本返回的数据
 
 具体示例代码如下：
 
 
{% highlight java  %}
class NetDemo extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        var url:string = "http://httpbin.org/post";
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables("test=ok");
        loader.load(request);
    }

    private onPostComplete(event:egret.Event):void
    {
        var loader:egret.URLLoader = <egret.URLLoader> event.target;
        var data:egret.URLVariables = loader.data;
        console.log( data.toString() );
    }

}
{% endhighlight %}

编译后运行，效果如图


![img]({{site.baseurl}}/assets/img/senddata1.png)