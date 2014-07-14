---
layout: post
title:  MovieClip Plug-in
permalink: post/tools/othertools/movieclipplugin.html
type: tools
element: othertools
version: Egret引擎 v1.x
---

**适应平台：**Windows、Mac OS X

**插件下载地址：**<a href="http://bbs.egret-labs.org/forum.php?mod=attachment&aid=MTAxfDQxZDNkNjQ0fDE0MDUzMjM4NDl8NjF8MTI3" target="_blank">点击进入官方下载地址</a>

MovieClip插件是方便开发者使用Flash Pro的生成Sprite表功能导出影片剪辑为Egret可识别的json文件和png文件。


####1.安装Flash Pro系列软件
---
首先下载并安装 Flash CS6或者Flash CC 。

注意插件支持的版本必须是Flash CS6及以上。


####2.安装MovieClip插件
---
将egret.plugin.jsfl文件放入Flash Pro安装目录下的`Common\Configuration\Sprite Sheet Plugins`目录下，重启Flash Pro。

####3.制作影片剪辑并命名
---

首先，将需要导出的动画制作成一个一个的元件。

然后，将元件命名(注意是名称，不是AS链接)，这个名称就是最后使用时gotoAndPlay的那个参数name。

![MovieClipPlugin]({{site.baseurl}}/assets/img/MovieClipPlugin1.png)


####4.导出影片剪辑
---

在Flash Pro的库面板上选中要导出的元件(支持多选)。右键然后选择 "生成Sprite表..."

![MovieClipPlugin]({{site.baseurl}}/assets/img/MovieClipPlugin2.png)

弹出生成Sprite表的窗口，按照下图中的参数配置，将数据格式改为egret ， 将背景颜色的Alpha值改为0，选中裁切和堆栈帧，其他参数一般默认。

![MovieClipPlugin]({{site.baseurl}}/assets/img/MovieClipPlugin3.png)

改一下导出的文件名称和路径，最后点击导出就行了。会在指定目录下生成Egret可用的png和json文件。


####5.扩展功能：为元件指定帧添加action参数
---

有些MovieClip在播放的过程中，到了特定帧需要触发事件。这时我们需要为导出的元件的第一个图层的指定帧加上帧标签名称。

例如下图中的元件，我们在第一个图层的第11帧上加上一个帧标签名称startAttack

![MovieClipPlugin]({{site.baseurl}}/assets/img/MovieClipPlugin4.png)

![MovieClipPlugin]({{site.baseurl}}/assets/img/MovieClipPlugin5.png)

这样在导出的json中即可看到这个action被成功添加了。

{% highlight json %}

{"res":"attack0010","x":0,"y":0,"action":"startAttack"},

{% endhighlight %}

在使用的时候添加一个事件就行了：

{% highlight java %}

this.monkey.addEventListener("startAttack" , this.startAttack , this);

{% endhighlight %}

