---
layout: demopost
title:  Hello World Extension
permalink: demo/helloworldextension.html
type: demo
element: demobasics
version: Egret引擎 v1.x
codedes: Hello World工程扩展
documentclass: HelloWorldExtension
---

###Code

{% highlight java  %}
class HelloWorldExtension extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //打开性能面板
        egret.Profiler.getInstance().run();

        //控制台打印"Hello World"信息
        console.log("Hello World!");
    }

}
{% endhighlight %}