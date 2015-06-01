---
layout: post
title:  "音频系统"
permalink: post/manual/sound/aboutsound.html
type: manual
element: manualsound
version: Egret引擎 v1.x
---

音频是游戏制作中不可或缺的元素，在游戏中，我们经常使用背景音乐来渲染故事情节。同时，人物在发生打击动作、一些绚丽特效播放的时候也会附带播放一系列的音频。

Egret中的音频系统接种HTML5的Audio系统，这使得Egret的音频兼容绝大多数浏览器。

在音频文件格式中Egret仅支持**MP3**格式。

由于音频文件属于游戏资源的一部分，所以在游戏逻辑中，使用音频前需要预先加载音频资源。加载方式可参考**<a href="{{site.baseurl}}/post/manual/loader/res.html" target="_blank">资源加载模块</a>**系列文章。

如果要加载资源文件夹中的某一个音频，可以参照下列代码来进行加载。

音频资源文件夹路径 `resource/sound/sound.mp3`

资源配置文件：

{% highlight json %}
{
    "groups": [
        {
            "keys": "bgImage,egretIcon",
            "name": "preload"
        },
        {
            "keys": "sound",
            "name": "soundload"
        }
    ],
    "resources": [
        {
            "url": "assets/bg.jpg",
            "type": "image",
            "name": "bgImage"
        },
        {
            "url": "assets/egret_icon.png",
            "type": "image",
            "name": "egretIcon"
        },
        {
            "url": "config/description.json",
            "type": "json",
            "name": "description"
        },
        {
            "url": "sound/sound.mp3",
            "type": "sound",
            "name": "sound"
        }
    ]
}
{% endhighlight %}

加载音频资源代码：

{% highlight java  %}
//加载资源配置文件以及音频文件组
private loadsound(event:egret.Event)
{
    //初始化Resource资源加载库，提示：Resource资源加载库是可选模块，不在egret-core项目里，最新代码请到github上的egret-game-library项目检出。
    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
    RES.loadConfig("resource/resource.json","resource/");
    RES.loadGroup( "soundload" );
}

//soundload资源组加载完成
private onResourceLoadComplete(event:RES.ResourceEvent):void {
    //逻辑处理
}
{% endhighlight %}