---
layout: post
title:  "播放音频"
permalink: post/manual/sound/playsound.html
type: manual
element: manualsound
version: Egret引擎 v1.x
---

在Egret中播放音频的实现非常简单，但在使用音频之前你先需要对音频资源进行加载，具体加载方法请参考<a href="{{site.baseurl}}/post/manual/sound/aboutsound.html" target="_blank">音频系统</a>部分。

当资源问价加载后，我们可以通过 `RES.getRes("sound");` 来获取音频资源，这里 `"sound"` 是我们音频资源的唯一标示符。

准备好音频资源后，我们创建一个 `Sound` 对象，用来操作我们的音频资源。具体创建代码如下：

{% highlight java linenos %}
var _curSound:egret.Sound = RES.getRes("sound");
{% endhighlight %}

这行代码中，我们创建了一个类型为 `Sound` 的对象 `_curSound` 。

完成上面步骤后，我们就可以执行音频播放工作了，具体播放代码如下：

{% highlight java linenos %}
_curSound.play();
{% endhighlight %}

播放音频的功能都是通过 `play` 方法来实现的。代码编写完成后，我们可以build当前项目，然后进行测试，此时你就会听到预先设定好的音频在游戏中播放了。

**注意**：当音频资源文件不存在的时候，无法听到任何声音，你可以打开浏览器的JavaScript调试面板查看问题所在。同时请检查你的操作系统是否处于静音状态。

**如果资源文件不存在，Egret会在浏览器的JavaScript面板中予以提示，并且告知哪个文件未找到。**


一下是demo的完整代码：

{% highlight java linenos %}
class SoundTest extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {

        //初始化Resource资源加载库，提示：Resource资源加载库是可选模块，不在egret-core项目里，最新代码请到github上的egret-game-library项目检出。
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup( "soundload" );

    }

    //soundload资源组加载完成
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        var _curSound:egret.Sound = new egret.Sound();
        _curSound.audio = RES.getRes("sound");
        _curSound.play();
    }
}
{% endhighlight %}