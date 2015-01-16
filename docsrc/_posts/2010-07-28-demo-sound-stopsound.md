---
layout: demopost
title:  Sound暂停播放
permalink: demo/stopsound.html
type: demo
element: demosound
version: Egret引擎 v1.x
codedes: Sound音频暂停播放
documentclass: SoundStopTest
---

###Code

{% highlight java linenos %}
class SoundStopTest extends egret.DisplayObjectContainer
{
    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup( "soundload" );

    }

    private  sound:egret.Sound;
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        this.drawStopBtn();

        this.sound = new egret.Sound();
        this.sound.audio = RES.getRes("sound");
        this.sound.play();
    }

    private drawStopBtn()
    {
        var spr:egret.Sprite = new egret.Sprite();
        spr.graphics.beginFill( 0x00ff00 );
        spr.graphics.drawRect( 0, 0, 100, 100);
        spr.graphics.endFill();
        spr.width = 100;
        spr.height = 100;
        this.addChild( spr );
        spr.touchEnabled = true;
        spr.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
    }

    private onTouch( evt:egret.TouchEvent )
    {
        this.sound.pause();
    }

}
{% endhighlight %}