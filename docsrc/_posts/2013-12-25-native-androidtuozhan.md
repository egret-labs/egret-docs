---
layout: post
title:  Android 第三方 SDK接入方式
permalink: post/tools/native/androidtuozhan.html
type: platform
element: sdkAccess
version: egret v1.x
---



## 概述
-----------------
在某些情况下JS是要和Java进行交互的，例如需要获取Java层的数据以及调用第三方SDK。

egret 提供了一个名为 ExternalInterface 的类，该接口便是通过使用注册侦听的方式来解决这类问题。这个类在 JavaScript端和 Java端都有实现，分别包含了 call 和 addCallback 两个方法，用于发送消息和接受消息。

开发者的调用流程一般是：

* JavaScript端调用 ExternalInterface.call
* Java 端通过 ExternalInterface.addCallback 接收到了 JS 传递的参数，开始进行业务逻辑处理，如登陆、支付等
* 处理成功后，Java端调用 ExternalInterface.call
* JavaScript 端通过 ExternalInterface.addCallback 接收到了 Java 传递的参数，向用户告知结果



## 示例代码
---------------

### Java代码示例

##### 创建侦听类，实现IExternalInterface接口，重写call方法
{% highlight java linenos %}
public class TestExternalInterface implements IExternalInterface {
	public void call(String value) {
		//do some thing
	}
}
{% endhighlight %}

##### 添加侦听

{% highlight java linenos %}
ExternalInterface.addCallBack("test", new TestExternalInterface());
{% endhighlight %}

##### 调用JS

{% highlight java linenos %}
ExternalInterface.call("test", "ExternalInterfaceMessage");
{% endhighlight %}

### JavaScript代码示例
------
##### 添加侦听
{% highlight java linenos %}
egret.ExternalInterface.addCallBack("test", function (info) {
	//do some thing
});
{% endhighlight %}
##### 调用Java
{% highlight java linenos %}
egret.ExternalInterface.call("test", "ExternalInterfaceMessage");
{% endhighlight %}





### Java接口
------
#### ExternalInterface
- [(void) call(name:string, value:string)](#JavaCall)
- [(void) addCallBack(name:string, obj:IExternalInterface)](#JavaAddCallBack)

### Java接口细节
------
<a name="JavaCall"></a>
#####  (void) call(name:string, value:string)
{% highlight java linenos %}
@brief 调用JS端注册的name侦听，会将value作为参数传递
@param name JS端注册的函数名
@param value 需要传递的参数
{% endhighlight %}
<a name="JavaAddCallBack"></a>
#####  (void) addCallBack(name:string, obj:IExternalInterface)
{% highlight java linenos %}
@brief 添加指定名称的调用，供JS端调用
@param name 注册的名称
@param obj 调用接口对象
{% endhighlight %}

### JavaScript接口
------
#### egret.ExternalInterface
- [call(name:string, value:string):void](#JavaScriptCall)
- [addCallBack(name:string, func:Function):void](#JavaScriptAddCallBack)

### JavaScript接口细节
------
<a name="JavaScriptCall"></a>
#####  (void) call(name:string, value:string)
{% highlight java linenos %}
@brief 调用Java端注册的name侦听，会将value作为参数传递
@param name Java端注册的函数名
@param value 需要传递的参数
{% endhighlight %}
<a name="JavaScriptAddCallBack"></a>
#####  (void) addCallBack(name:string, func:Function)
{% highlight java linenos %}
@brief 添加指定名称的调用，供Java端调用
@param name 注册的名称
@param func 调用的函数
{% endhighlight %}
