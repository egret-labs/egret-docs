---
layout: post
title:  "创建位图"
permalink: post/manual/bitmap/createbitmap.html
type: manual
element: manualtexture
version: Egret引擎 v1.x
---

位图的使用离不开纹理的支持，在Egret中，我们默认隐藏了纹理的操作，所有操作均针对于显示对象进行。但位图的现实依然基于纹理。在现实一张图片时，
我们需要使用 `Bitmap` 类。这是egret中的图片类，而纹理则来自原我们加载的资源图片。通常情况下，我们会使用单张图片作为纹理，游戏中也会大量
使用纹理集来进行渲染。

创建一个图片对象需要使用 `Bitmap` 类，代码如下：

{% highlight java linenos %}
private img:egret.Bitmap = new egret.Bitmap();
{% endhighlight %}

此时我们得到一个位图对象，如果你将它添加到现实列表中，还不回看到任何内容。因为该位图对象仅仅是一个“对象”而已。我们没有为它指定任何的纹理，
那么位图对象也就无法现实任何内容。下面我们来给该位图对象指定一个纹理，指定纹理后，我们就可以在画面中看到渲染的文件了。

指定纹理的方式是设置 `Bitmap` 中的 `texture` 属性。

{% highlight java linenos %}
img.texture = RES.getRes("图片ID");
{% endhighlight %}

上面一行代码就是我们为位图添加纹理的操作，这里我们看到一个 “图片ID” 的字样。那么“图片ID”到底为何方神圣呢？

简单来说，所有加载的资源都会有一个唯一ID，这个ID绝大部分取自图片文件名称，也有一些资源会定义一些其他的ID。但这些图片的组织方式都是由
一个json文件来描述的。我们来看一下一个标准的资源配置文件，到底是什么样子的。

{% highlight json %}
{
    "resources":
	[
		{"name":"bgImage","type":"image","url":"assets/bg.jpg"},
		{"name":"egretIcon","type":"image","url":"assets/egret_icon.png"},
        {"name":"description","type":"json","url":"config/description.json"}
	],

    "groups":
	[
        {"name":"preload","keys":"bgImage,egretIcon"}
	]
}
{% endhighlight %}

在一个json资源配置文件中，应该包含两大部分，一个是组，另外一个则是资源。

#####资源

包含在“resources”中，游戏中所有使用到的资源都应包含在此。每一个资源拥有三个属性。

1. name：对应资源的唯一ID编号。
2. type：资源类型
3. url：当前资源的路径

#####组

包含在“groups”中，组的概念是将不同的资源分类，当逻辑启动加载后，我们可以选择以组为单位进行加载。
我们来看一个具体的示例。

{% highlight java linenos %}
class BitmapTest extends egret.DisplayObjectContainer{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("preload");
    }
    private onGroupComp()
    {
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("bgImage");
        this.addChild(img);
    }
}
{% endhighlight %}

编译后运行，效果如图：

![img]({{site.baseurl}}/assets/img/createbitmap1.png)
