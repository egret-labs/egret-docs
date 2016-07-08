纹理集听上去名称高大上，实则概念非常简单。纹理集实际上就是将一些零碎的小图放到一张大图当中。游戏中也经常使用到纹理集。

使用纹理集的好处很多，我们通过将大量的图片拼合为一张图片从而减少网络请求，原先加载数次的图片资源现在加载一次即可。 同时，在引擎渲染的时候也会较少IO读取，从而提高性能。

Egret内置了纹理集的支持，在编写代码之前，我们需要先制作一张纹理集，具体使用的工具可以选择业内比较流行的 Texture Merger。 具体使用方法请参考[Texture Merger](http://edn.egret.com/cn/index.php?g=portal&m=article&a=index&id=238)。

我们首先制作一张纹理集，拼合后的效果如下：

![](566150114f41c.png)

同时生成的对应的json文件如下：

```
{
    "file": "dogs.png",
    "frames": {
        "dog1": {
            "x": 322,
            "y": 2,
            "w": 184,
            "h": 222,
            "offX":0,
            "offY":0,
            "sourceW":184,
            "sourceH":222
        },
        "dog2": {
            "x": 307,
            "y": 226,
            "w": 147,
            "h": 154,
            "offX":0,
            "offY":0,
            "sourceW":147,
            "sourceH":154
        },
        "dog3": {
            "x": 2,
            "y": 2,
            "w": 318,
            "h": 217,
            "offX":0,
            "offY":0,
            "sourceW":318,
            "sourceH":217
        },
        "dog4": {
            "x": 2,
            "y": 393,
            "w": 298,
            "h": 201,
            "offX":0,
            "offY":0,
            "sourceW":298,
            "sourceH":201
        },
        "dog5": {
            "x": 2,
            "y": 221,
            "w": 303,
            "h": 170,
            "offX":0,
            "offY":0,
            "sourceW":303,
            "sourceH":170
        },
        "dog6": {
            "x": 2,
            "y": 596,
            "w": 245,
            "h": 125,
            "offX":0,
            "offY":0,
            "sourceW":245,
            "sourceH":125
        }
    }
}
```

然后我们将资源文件拷贝到项目文件夹中的 `resource/assets/` 目录下，同时我们修改资源配置文件 `resource.json` 。

资源配置文件内容如下：

```
{
"resources":
    [
        {"name":"dogs","type":"sheet","url":"assets/dogs.json"}
    ],
"groups":
    [
        {"name":"preload","keys":"dogs"}
    ]
}
```

然后我们来编写代码：

```
class BitmapTest extends egret.DisplayObjectContainer{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(event:egret.Event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("preload");
    }
    private onGroupComplete()
    {
        var txtr:egret.Texture = RES.getRes( "dogs.dog1" );
        var img:egret.Bitmap = new egret.Bitmap( txtr );
        this.addChild(img);
    }
}
```

我们注意其中一行

```
var txtr:egret.Texture = RES.getRes( "dogs.dog1" );
```

其中dogs为纹理集，id为该纹理集中的一个资源id。

编译后运行，效果如图：


![](5661501178058.png)


