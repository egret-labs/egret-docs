---
layout: post
title:  Android封装Egret项目内的语言间通讯
permalink: post/tools/native/comm-egret-android.html
type: manual
element: manualnative
version: egret-android-support v1.7.1+
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
IGameExternalInterface externalInterface = gameEngine.game_engine_get_externalInterface();
externalInterface.run();
{% endhighlight %}
注意，第一行的代码获得的`IGameExternalInterface`实例很重要，将会在本教程介绍的两个方向的通讯都会用到。    
其中的`gameEngine`为Egret Runtime的核心实例，会有一段固定的代码来创建，具体创建过程请参考教程最后所附的项目源码包。    
这些类都由Egret官方的`Egret-Android-Support`内的Egret支持库提供。    
该段代码建议置于Android项目主Activity的onCreate方法中，`gameEngine`实例初始化完成后。    
接下来分别对两个方向的通讯进行讲解。每个方向都是先讲接收方，再讲发送方。    

---  
#### Android->Egret通讯
接收方，Egret代码部分，Egret官方库提供了`ExternalInterface`类来处理通讯。    
为了接收Android的方法调用，Egret需要注册一个回调函数。如果我们设置该回调函数名为`egret_dosth`，则Egret部分的代码很简单：
{% highlight Java %}
/// Android call Egret, receiver with Egret
egret.ExternalInterface.addCallback( "egret_dosth", function( msg ){ 
    console.log( "egret_dosth", msg );
} );
{% endhighlight %}
注意，注册回调的第一个参数，是一个字符串，这是用于区分多个通讯的，可以理解为通讯ID。    
因为可以有多个用途的通讯，每种用途类似于一个方法，即用通讯ID来表示对应或映射关系。    
同一个通讯的两边需要使用同一个通讯ID来接通映射关系。    

发送方，即在Android代码部分，同样用准备工作提到的`IGameExternalInterface`类来处理通讯。    
我们就在用户轻触Menu时调用该回调。在Android的主Activity中，覆盖onKeyDown方法里加入调用代码：
{% highlight Java %}
@Override
public boolean onKeyDown(int keyCode, KeyEvent event) {
	switch (keyCode) {
	case KeyEvent.KEYCODE_MENU:
		/// Android call Egret, sender with Android
		String msg = "Why you touch the menu?!(command from android)";

		Log.i( "[proj runner]", "egret_dosth: " + msg );
		IGameExternalInterface externalInterface = gameEngine.game_engine_get_externalInterface();
		externalInterface.call( "egret_dosth", msg );
		return true;
	default:
		return super.onKeyDown(keyCode, event);	
	}
}
{% endhighlight %}
如前所述，使用预先约定好的通讯ID来调用对应的回调。    
这样，当用户在应用内轻触Menu，就可以将`msg`消息发送到Egret。    

---  
#### Egret->Android通讯
接收方，Android接收回调需要实现一个专用的回调接口`IGameExternalInterfaceCallBack`，在其`callBack`方法中接收Egret发送过来的参数，并进行相应的处理。

注册回调以及回调处理的代码如下所示：
{% highlight Java %}
/// Egret call Android, receiver with Android
IGameExternalInterface externalInterface = gameEngine.game_engine_get_externalInterface();
externalInterface.addCallBack("android_dosth", new IGameExternalInterface.IGameExternalInterfaceCallBack() {
	public void callBack(String str) {
		Log.i( "[proj runner]", "android_dosth : " + str);
	}
});
{% endhighlight %}
前面所述的通讯ID同样适用。

发送方，在Egret部分，发送消息很简单：
{% highlight Java %}
/// Egret call Android, sender with Egret
var msg:string = "Why you make me show?!(command from egret)";
egret.ExternalInterface.call( "android_dosth", msg );
{% endhighlight %}

---  
#### 实例项目下载
为完整学习双方向的通讯，我们提供了一个Android App，用直观的方式展示双方向的功能调用，并提供其项目完整源码：    

<a href="{{site.baseurl}}/assets/packages/doc/win-android-package/Comm-Between-Egret-And-Android.apk" target="_blank">双向通讯项目App</a>     
<a href="{{site.baseurl}}/assets/packages/doc/win-android-package/Comm-Between-Egret-And-Android.zip" target="_blank">双向通讯项目源码</a>      

操作方法：按菜单按钮，将会在Egret视图看到文字提示；按Egret视图底部的文字，将会看到Android系统提示。
 

