---
layout: post
title:  "MovieClip序列帧动画"
permalink: post/manual/displaycon/movieclip.html
type: manual
element: manualmoive
version: Egret引擎 v1.5.3
---
       
       
MovieClip又称之为“影片剪辑“，是Egret中提供的一种动画解决方案。我们通常会将MovieClip简写为`MC`。
实际上一个MC所实现的功能就是播放序列帧动画。   

当我们想实现一个动画效果时，将原有的动画制作成为能够被Egret识别的动画格式。然后将这些制作好的资源进行加载，最后播放。

Egret在1.5.3版推出了全新的MovieClip实现，以弥补之前的不足。

---
#### 如何制作MovieClip动画资源

我们提供两种方式制作Egret动画资源文件，两种方式二选一即可
1.我们为Flash提供了一个插件，这个插件会帮助你将Flash中的动画导出为能够被Egret播放的动画文件。具体插件安装和使用方法请查看：
**[MovieClip Plug-in](http://bbs.egret-labs.org/thread-127-1-1.html)**
  
2.使用TextureMerger将swf或者gif文件转换成Egret动画资源文件。              
具体使用方法请查看：<a href="http://bbs.egret-labs.org/thread-918-1-1.html" target="_blank">TextureMerger 使用说明</a>

---
#### MovieClip资源使用及相关约定

TextureMerger按照MovieClip生成资源时，结果为一个json+png文件对，主文件名相同，这样一对文件以下称为MC资源合集。比如，我们生成的资源主文件名为`abc`，那么在Egret的资源配置文件(默认为`resource.json`)中，应该有如下配置：
{% highlight java %}
"resources":
	[
         {"name":"abc.json","type":"json","url":"assets/abc.json"}
        ,{"name":"abc.png","type":"image","url":"assets/abc.png"}
        ......
	]
{% endhighlight %}
      
为减少使用过程中的困扰，首先补充说明一下目前版本的TextureMerger(1.5.0)使用规则：                  
          
1. swf/gif文件一次只可以拖进一个！拖进多个将会被无视！               
          
2. 每个swf/gif文件只对应一个MovieClip。               
          
3. swf/gif资源主文件名将作为使用时的MovieClip名称，以下称为MCID。               
          
4. 一个MC资源合集可以包含多个MovieClip，即在TextureMerger中分次拖入多个swf/gif，分次的原因参考第1条。               
          
5. gif源文件的MovieClip无法指定帧标签，gif的播放控制请用帧序号来指定帧。


---
#### 程序使用MovieClip的方法

Egret的新MovieClip采用工厂模式，MovieClip工厂类为：`MovieClipDataFactory`。

一个MovieClip工厂类对应一个MC资源合集。比如我们在TextrueMerger导出的MC资源合集文件为`abc.json`和`abc.png`。那么我们就可以在程序中把其解析到一个MovieClip工厂类：
{% highlight java %}
var data = RES.getRes("abc.json");
var txtr = RES.getRes("abc.png");

var mcFactory = new egret.MovieClipDataFactory( data, txtr );
{% endhighlight %}

一个MC资源合集可以包含多个MovieClip，之前我们提到，一个swf/gif对应一个MovieClip。那么，如果我们把一个名为`mc1.swf`的swf文件打包到MC资源合集，其MCID为`mc1`，则在程序中解析该MovieClip的方法为：
{% highlight java %}
var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "mc1" ) );
{% endhighlight %}
      
同样的，如果该MC资源合集还包含另外一个名为`mc2.swf`的资源，则可同样解析出该MovieClip：
{% highlight java %}
var mc2:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "mc2" ) );
{% endhighlight %}
                 
如果在MovieClip `mc1`中有名为`label1`的帧标签，我们希望从这里播放，代码即为：
{% highlight java %}
this.addChild( mc1 );
mc1.gotoAndPlay( "label1" );
{% endhighlight %}
*注意：为了避免可能的内存泄漏问题，MovieClip只有被加到stage上之后才能被正确的播放!*
           
另外Egret1.5.3新版MovieClip还支持帧序标签，比如我们要从第3帧播放，代码为：
{% highlight java %}
mc1.gotoAndPlay( 3 );
{% endhighlight %}



