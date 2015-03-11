---
layout: post
title:  Android封装Egret项目内的语言间通讯
permalink: post/tools/native/comm-egret-android.html
type: manual
element: manualnative
version: egret-android-support v1.5.0+
---

前提知识：有基本的Egret项目开发经验，会部署Android开发环境    
技术等级：中级    
必需产品：Egret Engine 1.5+(<a href="http://www.egret-labs.org/egretengine" target="_blank">下载地址</a>)    
Egret开发工具：WebStorm或Visual Studio + EgretVS (<a href="http://www.egret-labs.org/egretvs" target="_blank">下载地址</a>)    
Android开发工具：IntelliJ IDEA 
   
---  
#### 说明
在Android封装Egret项目中，无可避免的需要两者直接进行通讯，比如用户操作Android硬件按钮Menu，必须由Android发消息给Egret。反过来，在游戏中的某些事件发生后，需要调用Android系统功能，比如弹出一个Toast文字提示，就需要Egret发消息给Android。    
两个方向的通讯都可以通过Egret提供的类似的API进行。    
并且每个通讯都用类似方法调用的方式进行，不过这个方法并不是真实的方法，而是一个字符串，两边通过匹配字符串来进一步匹配具体的方法调用。

---  
#### 通用的准备工作
不论是哪个方向的消息发送或函数调用，均需要在Android部分做初始化的工作：    
{% highlight Java %}
ExternalInterface.getInstance().run();
{% endhighlight %}
该行代码建议置于Android项目主Activity的onCreate方法开始。    
接下来分别对两个方向的通讯进行讲解。每个方向都是先讲接收方，再讲发送方。    

---  
#### Android->Egret通讯
Egret代码部分，Egret官方库提供了`ExternalInterface`类来处理通讯。    
为了接收Android的方法调用，Egret需要注册一个回调函数。如果我们设置该回调函数名为`egret_dosth`，则Egret部分的代码很简单：
{% highlight Java %}
/// Android call Egret, receiver with Egret
egret.ExternalInterface.addCallback( "egret_dosth", function( msg ){ 
    console.log( "egret_dosth", msg );
} );
{% endhighlight %}

在Android代码部分，Egret官方的`Egret-Android-Support`内提供的Android库同样有一个`ExternalInterface`类来处理通讯。
我们就在用户轻触Menu时调用该回调。在Android的主Activity中，覆盖onKeyDown方法里加入调用代码：
@Override
public boolean onKeyDown(int keyCode, KeyEvent event) {
	switch (keyCode) {
	case KeyEvent.KEYCODE_MENU:
		/// Android call Egret, sender with Android
		String msg = "Why you touch the menu?!(command from android)";
		ExternalInterface.getInstance().call("egret_dosth", msg);
		return true;
	default:
		return super.onKeyDown(keyCode, event);	
	}
}
这样，当用户在应用内轻触Menu，就可以将`msg`消息发送到Egret。

---  
#### Egret->Android通讯
Egret接收回调只需要提供一个函数即可。而Android接收回调的方式稍显复杂，因为需要通过一个专用类来实现。     
Egret官方的`Egret-Android-Support`内提供了一个接口`IExternalInterface`，Android部分即需要通过一个实现该接口的类来处理回调，如果我们命名该类为`ExternalInterfaceReceiver`，则其实现也很简单，只需要一个方法：  
{% highlight Java %}
public class ExternalInterfaceReceiver implements IExternalInterface {
    @Override
    public void call(String msg) {
        Log.i( "Egret call Android", msg );
    }
}
{% endhighlight %}

不过Android部分还需要一些准备工作，使该接收类能在Egret发出消息时开始工作。      
在Android项目主Activity的onCreate方法内注册回调处理：    
{% highlight Java %}
/// Egret call Android, receiver with Android
ExternalInterface.getInstance().addCallBack("android_dosth", new ExternalInterfaceReceiver());
{% endhighlight %}

在Egret部分，发送消息很简单：    
{% highlight Java %}
/// Egret call Android, sender with Egret
var msg:string = "Why you make me show?!(command from egret)";
egret.ExternalInterface.call( "android_dosth", msg );
{% endhighlight %}

---  
#### 实例项目下载
为测试双方向的通讯，我们提供了一个Android App，并测试项目源码：    
<a href="{{site.baseurl}}/assets/packages/doc/win-android-package/Comm-Between-Egret-And-Android.apk" target="_blank">测试项目App</a> 
<a href="{{site.baseurl}}/assets/packages/doc/win-android-package/Comm-Between-Egret-And-Android.zip" target="_blank">测试项目源码</a>
 

