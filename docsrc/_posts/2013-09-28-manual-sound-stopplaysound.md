---
layout: post
title:  "暂停音频播放"
permalink: post/manual/sound/stopsound.html
type: manual
element: manualsound
version: Egret引擎 v1.x
---

与播放音频相同，在Egret中暂停音频播放只需要一个方法即可，该方法是Sound类中的 `pause`。如果你想要暂停当前播放的音频，只需要执行如下代码即可：

`this.sound.pause();`

完整的暂停播放实例代码如下：


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
        //初始化Resource资源加载库，提示：Resource资源加载库是可选模块，不在egret-core项目里，最新代码请到github上的egret-game-library项目检出。
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

        this.sound = new RES.getRes("sound");
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
