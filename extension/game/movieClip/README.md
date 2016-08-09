MovieClip又称之为"影片剪辑"，是Egret中提供的一种动画解决方案。我们通常会将MovieClip简写为 MC 。 实际上一个 MC 所实现的功能就是播放序列帧动画。

当我们想实现一个动画效果时，可以把原有的动画制作成为能够被 Egret 识别的动画格式。然后将这些制作好的资源进行加载，最后播放。

### 如何制作 MovieClip 动画资源
我们提供两种方式制作 Egret 动画资源文件，两种方式二选一即可：

1.使用 TextureMerger 将 swf 或者 gif 文件转换成 Egret动 画资源文件。**推荐使用这种方式**
具体使用方法请查看：[TextureMerger 使用说明](http://bbs.egret.com/thread-918-1-1.html)

2.我们为Flash提供了一个插件，这个插件会帮助你将Flash中的动画导出为能够被Egret播放的动画文件。
具体插件安装和使用方法请查看： [MovieClip Plug-in](http://bbs.egret.com/thread-127-1-1.html)

### MovieClip资源使用及相关约定
TextureMerger 按照 MovieClip 生成资源时，结果为一个 json + png 文件对，主文件名相同。这样一对文件以下称为 MC 资源合集。比如，我们生成的资源主文件名为 `abc` ，那么在Egret的资源配置文件(默认为 `default.res.json`中，应该有如下配置：
~~~
"resources":
    [
         {"name":"abc.json","type":"json","url":"assets/abc.json"}
        ,{"name":"abc.png","type":"image","url":"assets/abc.png"}
        ......
    ]
~~~
为减少使用过程中的困扰，首先补充说明一下目前版本的TextureMerger(1.5.0)使用规则：
* swf/gif 文件一次只可以拖进一个！拖进多个将会被无视！
* 每个 swf/gif 文件只对应一个 MovieClip。
* swf/gif 资源主文件名将作为使用时的 MovieClip 名称，以下称为 MCID。
*  一个 MC 资源合集可以包含多个 MovieClip，即在TextureMerger中分次拖入多个swf/gif，分次的原因参考第1条。
* gif 源文件的 MovieClip 无法指定帧标签，gif 的播放控制请用帧序号来指定帧。


### 程序使用MovieClip的方法
egret 的 MovieClip 采用工厂模式，MovieClip 工厂类为：`MovieClipDataFactory`。

一个 MovieClip 工厂类对应一个MC资源合集。比如我们在 TextrueMerger 导出的MC资源合集文件为 `abc.json` 和 `abc.png`。那么我们就可以在程序中把其解析到一个 MovieClip 工厂类：
~~~
var data = RES.getRes("abc.json");
var txtr = RES.getRes("abc.png");
var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
~~~
我们之前提到过一个 MC 资源合集可以包含多个 MovieClip，一个 swf/gif 对应一个 MovieClip 。那么，如果我们把一个名为 mc1.swf 的 swf 文件打包到 MC 资源合集，其 MCID 为 mc1，则在程序中解析该 MovieClip 的方法为：
~~~
var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "mc1" ) );
~~~
同样的，如果该 MC 资源合集还包含另外一个名为 mc2.swf 的资源，则可同样解析出该 MovieClip：
~~~
var mc2:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "mc2" ) );
~~~
如果在MovieClip mc1 中有名为 "start" 的帧标签，我们希望从这里播放 3 次，代码即为：
~~~
this.addChild( mc1 );
mc1.gotoAndPlay( "start" ,3);
~~~
**注意：为了避免可能的内存泄漏问题，MovieClip只有被加到显示列表上之后才能被正确的播放!**

比如在第动画的第 6 帧有一个 "&#64;fall" 帧事件标签，我们还可以为动画增加监听获取这个消息
~~~
this.mc1.addEventListener(egret.MovieClipEvent.FRAME_LABEL,（e:egret.MovieClipEvent）=>{
	console.log(e.type,e.frameLabel,this.mc1.currentFrame);//frame_label @fall 6
},this);
~~~
我们还可以获取动画播放完成的消息。比如要播放 3 次动画，每当动画循环播放完成一次，会调用一次 egret.Event.LOOP_COMPLETE 事件。3 次动画播放完后，会调用 egret.Event.COMPLETE 事件。
~~~
this.mc1.addEventListener(egret.Event.LOOP_COMPLETE, (e:egret.Event)=>{
	console.log(e.type);//输出3次
}, this);
this.mc1.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
	console.log(e.type);//1次
}, this);
~~~

另外 MovieClip 还支持帧序标签，比如我们要从第3帧播放，代码为：
~~~
mc1.gotoAndPlay( 3 );
~~~