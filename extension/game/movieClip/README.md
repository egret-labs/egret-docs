MovieClip又称之为 "影片剪辑"，是Egret中提供的一种动画解决方案。我们通常会将MovieClip简写为 MC 。 实际上一个 MC 所实现的功能就是播放序列帧动画。

当我们想实现一个动画效果时，可以把原有的动画制作成为能够被 Egret 识别的动画格式。然后将这些制作好的资源进行加载，最后播放。

## 如何制作 MovieClip 动画资源
我们提供两种方式制作 Egret 动画资源文件，两种方式二选一即可：

* 使用 TextureMerger 将 swf 或者 gif 文件转换成 Egret 动画资源文件。

	具体使用方法请查看：[TextureMerger 使用说明](http://bbs.egret.com/thread-918-1-1.html)

* 使用 DragonBones Pro 制作帧动画。

* 我们为Flash提供了一个插件，这个插件会帮助你将Flash中的动画导出为能够被Egret播放的动画文件。
具体插件安装和使用方法请查看： [MovieClip Plug-in](http://bbs.egret.com/thread-127-1-1.html)

## 资源约定

MovieClip 需要一对 json 配置文件和一个纹理集图片。比如 `abc.json` 和 `abc.png` 。

* 配置文件约定了各个字段标识的用途、
* 纹理集图片为 MovieClip 所使用的图片集。

### 配置解析

~~~
{
	"mc": {
		"run": {
			"frameRate": 24,
			"events": [
				{
					"name": "@fall",
					"frame": 6
				}
			],
			"labels": [
                {
                    "end": 8,
                    "name": "start",
                    "frame": 2
                }
            ],
			"frames": [
				{
					"res": "19236B52",
					"x": 6,
					"y": 13,
					"duration": 3
				}
			]
		}
	},
	"file": "abc.png",
	"res": {
		"19236B52": {
			"x": 111,
			"y": 1,
			"w": 108,
			"h": 131
		}
	}
}
~~~

* mc：MovieClip 所拥有的动作，比如这里的 run。
	* run：一个动作名称，可以有多个。
		* frameRate：播放的帧率。
		* events：在某一帧下触发的事件。
		* labels：标签，标记当前标签所持续的帧的情况。
		* frames：当前动作的所有帧数据。
* file：图集名称。
* res：纹理集数据。

### 资源配置

在Egret的资源配置文件（默认为 `default.res.json`）中，应该有如下配置：

~~~
"resources":
    [
         {"name":"abc.json","type":"json","url":"assets/abc.json"}
        ,{"name":"abc.png","type":"image","url":"assets/abc.png"}
        ......
    ]
~~~


## 使用

### 创建

egret 的 MovieClip 采用工厂模式，MovieClip 工厂类为：
`MovieClipDataFactory`。

一个 MovieClip 工厂类对应一个MC资源合集。比如资源文件为 `abc.json` 和 `abc.png`。那么我们就可以在程序中把其解析到一个 MovieClip 工厂类：

~~~
var data = RES.getRes("abc.json");
var txtr = RES.getRes("abc.png");
var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
~~~

### 获取动作

比如上面的的 `run`，则在程序中解析该 MovieClip 的方法为：

~~~
var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "run" ) );
~~~

### 播放

* 帧标签播放

 	如果在 MovieClip run 中有名为 "start" 的帧标签，我们希望从这里播放 3 次，代码即为：

~~~
this.addChild( mc1 );
mc1.gotoAndPlay( "start" ,3);
~~~

* 帧数播放
  比如要从第3帧播放，代码为：

~~~
mc1.gotoAndPlay( 3 );
~~~

> 注意：为了避免可能的内存泄漏问题，MovieClip只有被加到显示列表上之后才能被正确的播放!

## 事件

### 帧标签事件

比如在第动画的第 6 帧有一个 "fall" 帧事件标签，我们还可以为动画增加监听获取这个消息

~~~
mc1.addEventListener(egret.MovieClipEvent.FRAME_LABEL,（e:egret.MovieClipEvent）=>{
	console.log(e.type,e.frameLabel, mc1.currentFrame);//frame_label @fall 6
},this);
~~~

### 完成事件
比如要播放 3 次动画，每当动画循环播放完成一次，会调用一次 egret.Event.LOOP_COMPLETE 事件。3 次动画播放完后，会调用 egret.Event.COMPLETE 事件。

~~~
this.mc1.addEventListener(egret.Event.LOOP_COMPLETE, (e:egret.Event)=>{
	console.log(e.type);//输出3次
}, this);
this.mc1.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
	console.log(e.type);//1次
}, this);
~~~
