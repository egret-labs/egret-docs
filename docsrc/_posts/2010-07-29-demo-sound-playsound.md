---
layout: demopost
title:  Sound播放
permalink: demo/playsound.html
type: demo
element: demosound
version: Egret引擎 v1.x
codedes: Sound音频播放
documentclass: SoundTest
---

###Code

{% highlight java  %}
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

    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        var sound:egret.Sound = RES.getRes("sound");
        sound.play();
    }
}
{% endhighlight %}