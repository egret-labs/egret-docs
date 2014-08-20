---
layout: post
title:  "循环播放音频"
permalink: post/manual/sound/loopplaysound.html
type: manual
element: manualsound
version: Egret引擎 v1.x
---

很多时候我们希望游戏中的背景音乐处于循环播放状态，在Egret中，实现循环播放也是非常简单的。你需要对你的Sound对象进行一些设置即可实现循环播放的效果。

>我们推荐使用一段时间比较短的音频进行测试，例如时长为1秒钟的音频。 

首先我们加载音频资源文件，并且通过 `play` 方法来播放音频，具体代码如下：

{% highlight java linenos %}
private onAddToStage(event:egret.Event)
{
	//初始化Resource资源加载库，提示：Resource资源加载库是可选模块，不在egret-core项目里，最新代码请到github上的egret-game-library项目检出。
	RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
	RES.loadConfig("resource/resource.json","resource/");
	RES.loadGroup( "soundload" );
}

private  sound:egret.Sound;
//soundload资源组加载完成
private onResourceLoadComplete(event:RES.ResourceEvent):void 
{
	this.sound = RES.getRes("sound");
	this.sound.play();
}
{% endhighlight %}

现在你可以build你的项目，同时进行测试。你可以听到预先设置的音频播放了一遍，下面我们添加一个对音频播放状态的事件侦听器。用来检测当前音频是否播放完成，代码如下：

{% highlight java linenos %}
this.sound.addEventListener("ended", this.rePlay.bind(this));
{% endhighlight %}

这行代码，我们对sound对象进行了事件侦听，侦听的事件为 `ended` ，表示当音频播放完毕之后调用 `rePlay` 函数。我们再来实现 `rePlay` 函数中的内容。

{% highlight java linenos %}
private rePlay():void{
	this.sound.load();
	this.sound.play();
}
{% endhighlight %}

`rePlay` 函数中调用了两个方法，一个名称为 `load`，一个名称为 `play`。这里需要注意的地方是，当使用循环播放时，我们需要在每次 `play` 之前都执行一次 `load`。如果没有执行 `load` 操作，那么音频将无法正常循环播放。

为什么要使用 `load` 函数？

`load` 函数的功能是重新加载音频资源，使用这个方法可以保证sound对象能够重新进行 `play` 播放操作。
