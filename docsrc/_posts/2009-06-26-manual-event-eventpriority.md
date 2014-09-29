---
layout: post
title:  "事件的优先级"
permalink: post/manual/event/eventpriority.html
type: manual
element: manualevent
version: Egret引擎 v1.x
---

事件是可以设置优先级的，这是一个非常方便而且灵活的功能。我们可以通过制定事件的优先级来确保那个事件侦听器会得到提前处理。

你可以在注册侦听器的时候制定事件的优先级。

{% highlight java linenos %}
public addEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false, priority:number = 0)
{% endhighlight %}

制定优先级需要设置 `priority` 属性。该属性为一个number类型，当数字越大，则优先级越大。在触发事件的时候优先级越高。
