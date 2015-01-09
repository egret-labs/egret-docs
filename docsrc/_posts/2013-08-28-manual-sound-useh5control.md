---
layout: post
title:  "打开H5级别的声音控制"
permalink: post/manual/sound/useh5control.html
type: manual
element: manualsound
version: Egret引擎 v1.x
---
     
在`循环播放音频`一节，为了在声音播放结束时再次启动播放，我们侦听了"ended"事件。      
     
看到这里，很多朋友问题来了：这个事件怎么来的？还有没有其他事件呢？     
     
好了，现在我们追根溯源来说说这事。     
     
首先，`egret.Sound`实际上是对H5的`Audio`对象的封装。Sound对象侦听的所有事件实际上最终都需要侦听其所封装的`Audio`对象。从`egret.Sound`获得`Audio`对象很简单,假设有一个`egret.Sound`对象`music`，则其对应的`Audio`对象为`music['audio']`。     
     
### 侦听H5中Audio对象的事件
那么，`Audio`对象所有的事件可以在 <a href="http://w3school.com.cn/tags/html_ref_eventattributes.asp" target="_blank">HTML 事件属性</a>中的`Media 事件`部分找到。    
     
所有这些事件都以"on"开头，侦听这些事件只需要取去掉"on"后的事件属性即可，以下我们以`ontimeupdate`为例来进行一个简单的测试。     
     
假设我们已经载入一个key为"music"的音乐资源。首先根据资源创建egret.Sound对象：     
{% highlight java %}
var music:egret.Sound = RES.getRes( "music" );
{% endhighlight %}
     
接下来侦听`ontimeupdate`事件，如前所述，在代码中表示为`timeupdate`，然后播放：
    
{% highlight javascript %}
music.addEventListener( "timeupdate", function(){
    console.log ( "currentTime:", music['audio'].currentTime );
} );
   
music.play();
{% endhighlight %}

编译，在浏览器测试，则会看到类似如下的console输出：
{% highlight java %}
currentTime: 0
currentTime: 0.193997
currentTime: 0.449993
currentTime: 0.705989
currentTime: 0.961985
currentTime: 1.217981
{% endhighlight %}

### 使用H5中Audio对象的所有功能
所有的`Audio`对象的事件都可以侦听处理了，同样其他的`Audio`对象的功能我们都可以使用。
比如我们要想制定音乐跳到某个位置，代码很简单，同样，查w3school参考`Audio 对象属性`，可知需要用`currentTime`。   
 
为了达到更好的测试效果，我们在舞台加入一个触碰事件，定义4个时间点，每一次触碰都跳到指定的时间点。类中先声明一个成员记录触碰次数：    
{% highlight java %}
private nTap:number;
{% endhighlight %}
     
     
然后加入代码来控制时间点，如下所示：      
     
{% highlight java %}
this.nTap = -1;

var self = this;
this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, function( evt:egret.TouchEvent ):void{
    console.log ( "set currentTime" );
    var audio = music['audio'];
    switch ( ++self.nTap % 4 ){
        case 0:
            audio.currentTime = 30;
            break;
        case 1:
            audio.currentTime = 60;
            break;
        case 2:
            audio.currentTime = 120;
            break;
        case 3:
            audio.currentTime = 180;
            break;
    }
}, this );
{% endhighlight %}
   
   
编译，在浏览器测试，在播放音乐时多次触碰舞台，将会听到音乐跳到指定时间点并继续播放！   
    
     



