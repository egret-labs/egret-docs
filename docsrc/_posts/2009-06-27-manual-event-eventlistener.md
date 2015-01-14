---
layout: post
title:  "事件侦听器"
permalink: post/manual/event/eventlistener.html
type: manual
element: manualevent
version: Egret引擎 v1.x
---

事件侦听器也就是事件的处理者，负责接收事件携带的信息，并在接收到该事件后执行特定的代码。

Egret中，事件的侦听器必须是一个函数。事件的发送者必须是 `egret.EventDispatcher` 类或者子类的实例。只有事件发送者才能侦听事件，并且可以
注册侦听器。

侦听事件分为两个部分，第一是建立侦听器，侦听器可以是独立的函数，也可以是某一个对象的方法。第二部是注册侦听器，使用事件发送者的 `addEventListener()` 
将相应的事件分配给侦听器。

我们来看一下注册侦听函数的定义。

{% highlight java linenos %}
public addEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false, priority:number = 0)
{% endhighlight %}

我们常用的只有前三个参数，后面的两个参数则不太常用。

第一个参数type表示事件类型。

listener就是用来处理事件的侦听器。

thisObject比较特殊，一般我们填写this。因为TypeScript与JavaScript的this作用域不同，其this指向也会不同。如果不填写this的话，那么编译后的代码会发生错误。
关于this的问题，大家可以学习JavaScript中的原型链。

---
####创建侦听器

一个侦听器必须是函数，它可以是一个独立函数，也可以是一个实例的方法。侦听器必须有一个参数，并且这个参数必须是 `Event` 类实例或其子类的实例，
同时，侦听器的返回值必须为空（void）。范例代码如下：

{% highlight java linenos %}
listenerName(evt:Event):void {...}
{% endhighlight %}

---
####注册侦听器与移除侦听器

只有事件的发送者才可以注册侦听器，事件的发送者必须是 `EventDispatcher` 类或其子类的实例。移除侦听器也同理，通常情况下，注册侦听器与移除
侦听器都是成对出现。

注册侦听器
{% highlight java linenos %}
事件发送者.addEventListener(事件类型, 侦听器, this);
{% endhighlight %}

移除侦听器
{% highlight java linenos %}
事件发送者.removeEventListener(事件类型, 侦听器, this);
{% endhighlight %}
      
---
####检测侦听器

如果你需要在逻辑中检测某一个事件发送者是否注册了侦听器，那么你有两个方法可以使用。
一个是 `hasEventListener` ,另外一个是 `willTrigger` 。两个方法执行效果相同，都是判断一个事件发送者是否注册了某一个类型的事件。

如果该事件类型已经被注册过，返回 `true`，如果没有被注册过，返回 `false`。

{% highlight java linenos %}
事件发送者.hasEventListener(事件类型);
{% endhighlight %}

      
---
####TouchEvent的启动开关

为了避免不必要的性能消耗，Egret对显示对象的TouchEvent侦听有个开关，并默认关闭。
这个开关就是`touchEnabled`，当需要侦探TouchEvent时，请不要忘记打开这个开关：          
{% highlight java linenos %}
显示对象实例.touchEnabled = true;
{% endhighlight %}

实际使用过程，如果某些显示对象不再需要侦听TouchEvent，那就及时关闭吧：        
{% highlight java linenos %}
显示对象实例.touchEnabled = false;
{% endhighlight %}

这样会避免不必要的性能开销。   
