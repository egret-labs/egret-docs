---
layout: demopost
title:  GET网络请求
permalink: demo/netgetrequest.html
type: demo
element: demonetwork
version: Egret引擎 v1.x
codedes: GET方式进行网络请求
documentclass: GetRequestTest
---

###Code

{% highlight java linenos %}
class GetRequestTest extends egret.DisplayObjectContainer
{
    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //绘制文本
        this.drawText();

        //创建GET请求
        var url:string = "http://httpbin.org/get";
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        loader.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        loader.load(new egret.URLRequest(url));
        this.statusGetLabel.text = "正在向httpbin.org发送GET请求";
    }

    //GET请求完成
    private onGetComplete(event:egret.Event):void
    {
        var loader:egret.URLLoader = <egret.URLLoader> event.target;
        var data:egret.URLVariables = loader.data;
        this.statusGetLabel.text = "获得GET响应! ";
        this.statusGetLabel.text += "\nGET响应: \n" + data.toString();

    }

    //绘制文本
    private statusGetLabel:egret.TextField;
    private drawText()
    {
        this.statusGetLabel = new egret.TextField();
        this.statusGetLabel.size = 12;
        this.statusGetLabel.text = "状态文本";
        this.statusGetLabel.x = 10;
        this.statusGetLabel.y = 10;
        this.statusGetLabel.width = 430;
        this.statusGetLabel.height = 430;
        this.addChild( this.statusGetLabel );
    }

}
{% endhighlight %}