---
layout: post
title:  "MovieClip序列帧动画"
permalink: post/manual/displaycon/movieclip.html
type: manual
element: manualmoive
version: Egret引擎 v1.x
---

MovieClip又称之为“影片剪辑“，是Egret中提供的一种动画解决方案。我们通常会将MovieClip简写为 ”mc“。
实际上一个mc所实现的功能就是播放序列帧动画。这个概念与我们平常所使用的gif图很相似。

当我们想实现一个任务跑动的动作时，你需要将原有的动画制作成为能够被Egret识别的动画格式。然后将这些制作好的资源进行加载，最后播放。

####如何制作动画
---

Egret中所使用的动画资源格式可以从Flash软件中制作，然后导出为能够被Egret使用的格式。

我们为Flash提供了一个插件，这个插件会帮助你将Flash中的动画导出为能够被Egret播放的动画文件。具体插件安装和使用方法请查看

**[MovieClip Plug-in]({{site.baseurl}}/post/tools/othertools/movieclipplugin.html)**

####如何创建一个MovieClip
---

在使用之前，我们应该先加载资源文件，你可以使用下面的代码来加载我们的动画资源。这里需要注意的一点，
动画资源为两个文件，一个是导出的动画图片。另外一个是动画的配置文件，后缀名为“.json”。具体代码如下：

{% highlight java linenos %}
RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
RES.loadConfig("resource/resource.json","resource/");
RES.loadGroup("gameres");
{% endhighlight %}

当资源完成加载后，我们编写代码，创建一个MovieClip对象。

{% highlight java linenos %}
var data = RES.getRes("stay_json");//获取动画文件的信息配置文件
var texture = RES.getRes("stay_png");//获取动画文件的图片
var mc = new egret.MovieClip(data,texture);//创建MovieClip
this.addChild(mc);//添加到显示列表，显示影片剪辑
mc.frameRate = 60;//设置动画的帧频
mc.gotoAndPlay("stay");//跳转到指定帧并开始播放
{% endhighlight %}

