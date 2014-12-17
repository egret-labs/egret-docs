---
layout: post
title:  "物理引擎"
permalink: jkdoc/manual-physical-engine.html
type: manual
element: manual-physical-engine
version: Egret引擎 v1.5
---


### 概述

目前 egret 已经支持p2物理系统，p2是一套使用 JavaScript 写的2D刚体物理引擎。其中包括碰撞检测，接触，摩擦等等。下面我们通过一个简单的示例来学习该物理引擎的基本用法。

------


### 示例：在物理世界中加入两个常见形状的物理实体并运转
------
#### 创建刚体
所谓刚体，就是在外力作用下,物体的形状和大小(尺寸)保持不变,而且内部各部分相对位置保持恒定(没有形变)的理想物理模型。
在物理引擎中简言之，就是一个独立的物体，可以有相对于其他物体的位移、旋转，并且可以跟它们产生碰撞。
在egret中创建刚体很简单：
{% highlight java %}
//创建刚体
var body:p2.Body = new p2.Body();
{% endhighlight %}
------


#### 创建形状
实际显示可能有多种不同的形状，p2引擎已经准备了丰富的类型，以适应各种不同的需要。
我们举两个简单的栗子，一个是矩形，一个是平面：
{% highlight java %}
//创建宽200、高100的矩形形状
var shpRect:p2.Shape = new p2.Rectangle( 200, 100 );

//创建平面形状
var shpPlane:p2.Plane = new p2.Plane();
{% endhighlight %}
------


#### 为形状加入物理特性
每一个形状具有显示特性，要在物理引擎中计算其物理特性，那必须要讲每一个独立形状绑定到刚体。
接下来分别为刚才创建的形状绑定：
{% highlight java %}
//绑定矩形到刚体
var bodyRect:p2.Body = new p2.Body();
bodyRect.addShape( shpRect );

//绑定平面到刚体
var bodyPlane:p2.Body = new p2.Body();
bodyPlane.addShape( shpPlane );
{% endhighlight %}
------


#### 将刚体加入物理世界
所有需要物理引擎计算的显示对象，我们先绑定到刚体，然后需要添加到一个物理世界或物理空间，即一个World实例中。World是以刚体作为单位来进行各种物理模拟及计算的，如下所示：
{% highlight java %}
//创建world对象
var world:p2.World = new p2.World();

//将之前创建的刚体加入world
world.addBody( bodyRect );
world.addBody( bodyPlane );
{% endhighlight %}
------


#### 使world动起来
都准备好了，然后就按特定的频率运行物理世界，用world.step即可：
{% highlight java %}
//添加帧事件侦听
egret.Ticker.getInstance().register(function (dt) {
	//使世界时间向后运动
	world.step(dt / 1000);
}, this);
{% endhighlight %}
------


#### 优化性能的小技巧
我们可以设置刚体一定时间后自动进入睡眠状态以提高性能，一行搞定：
{% highlight java %}
world.sleepMode = p2.World.BODY_SLEEPING;
{% endhighlight %}

-----

### 与egret中显示对象的结合

本教程主要说明如何创建特定形状，赋予物理特性，并模拟在一个物理世界中。之后我们需要创建对应的显示对象，然后在 world.step 执行之后，取出相应的刚体，将显示对象的坐标属性设置为刚体的位置信息。具体实现方式可以访问下面的 egret 演示示例源码查看。

-----

### 源码地址

访问 <a href="http://static.egret-labs.org/egret-game/example/html5/physics" target="_blank">这里</a> 查看 egret 演示示例，通过点击来添加刚体

访问 <a href="https://github.com/egret-labs/egret-game-library">这里</a> 获取 egret 演示示例源码

访问 <a href="https://github.com/schteppe/p2.js">这里</a> 获取 p2源码