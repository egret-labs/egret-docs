---
layout: post
title:  "资源加载配置"
permalink: post/manual/loader/resconfig.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

在游戏开发中，我们通常要处理大量的资源文件。以游戏的图片资源举例，当游戏打开一个场景的时候，我们需要加载对应的场景背景资源，场景内人物资源以及当前场景的UI资源等。有时候，不同的场景可能还需要不同的背景音乐，这些操作都大大增加了游戏开发的难度。

RES资源管理模块则支持将这些资源分组，在游戏开发时，开发者可以对游戏所有资源进行分组，这样可以避免不必要的网络流量消耗和过多的资源消耗。

####RES资源加载配置
---

如果资源是我们要购买的若干物品，资源加载配置就好比是购物清单。我们首先把需要购买的物品条理清晰地列在清单上，就可以按步骤有条不紊的去购买其上所列出的物品。

在Egret中，我们使用json格式作为RES资源加载配置文件的格式。这中格式使用方便，你甚至可以用记事本来编写它。同时，json格式也是模式JavaScript支持的一种解析格式。我们可以得到最快的解析处理。

以Egret模板项目的resource.json为例：

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

配置文件中的**“resource”**我们可以视为资源库，当前游戏使用到的资源都可以放到这里。

**“resource”**下每一项资源配置信息都包含三个属性：

1. name：表示这个资源的唯一短名标识符。
2. type：表示资源类型。
3. url：表示当前资源文件的路径。

**“groups”**是预加载**资源组**的配置，每项是一个资源组。

每一个资源组须包含两个属性：

1. name：表示资源组的组名
2. keys：表示这个资源组包含哪些资源，里面的逗号分隔的每一个字符串，都与**“resource”**下的资源name对应。同一个资源可以存在于多个资源组里。

**如果你有大量资源需要处理，编写配置文件，我们提供了可视化资源配置文件处理软件，可参考**<a href="{{site.baseurl}}/post/tools/egrettools/restool.html" target="_blank">Res Depot</a>**
