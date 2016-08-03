在游戏开发中，我们通常要处理大量的资源文件。以游戏的图片资源举例，当游戏打开一个场景的时候，我们需要加载对应的场景背景资源，场景内人物资源以及当前场景的UI资源等。有时候，不同的场景可能还需要不同的背景音乐，这些操作都大大增加了游戏开发的难度。

RES资源管理模块则支持将这些资源分组，在游戏开发时，开发者可以对游戏所有资源进行分组，这样可以避免不必要的网络流量消耗和过多的资源消耗。

## RES资源加载配置

如果资源是我们要购买的若干物品，资源加载配置就好比是购物清单。我们首先把需要购买的物品条理清晰地列在清单上，就可以按步骤有条不紊的去购买其上所列出的物品。

在Egret中，我们使用json格式作为RES资源加载配置文件的格式。这种格式使用方便，你甚至可以用记事本来编写它。同时，json格式也是模式JavaScript支持的一种解析格式。我们可以得到最快的解析处理。

以Egret模板项目的resource.json为例：

```
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
```

配置文件中的“resource”我们可以视为资源库，当前游戏使用到的资源都可以放到这里。

“resource”下每一项资源配置信息都包含三个属性：

* name：表示这个资源的唯一短名标识符。

* type：表示资源类型。

* url：表示当前资源文件的路径。

“groups”是预加载资源组的配置，每项是一个资源组。

* 每一个资源组须包含两个属性：

* name：表示资源组的组名

* keys：表示这个资源组包含哪些资源，里面的逗号分隔的每一个字符串，都与“resource”下的资源name对应。同一个资源可以存在于多个资源组里。

如果你有大量资源需要处理，编写配置文件，我们提供了可视化资源配置文件处理软件，可参考[Res Depot](http://edn.egret.com/cn/index.php?g=&m=article&a=index&id=234&terms1_id=73&terms2_id=74)

## 载入资源加载配置

要购买物品，我们首先要把清单拿到手，也就是前一节所说的资源加载配置，然后才能按照清单加载指定的资源。

RES模块对资源加载配置有两种读取方式，一种是外部文件，另一种是直接读取。

### 文件载入读取方式

这是一个json文件，通常我们取名为*resource.json*。载入代码如下：

```
RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this ); 
RES.addEventListener( RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this ); 
RES.loadConfig("resources/resource.json","resources/");
```

`loadConfig`函数做执行的动作即为初始化RES资源加载模块。该函数包含两个参数，第一个参数是`resource.json`文件的完整路径，第二个参数是配置中每个资源项url相对路径的基址。例如配置里的bgImage资源项填的url是`assets/bg.jpg`，加载时将会拼接为相对路径：`resources/assets/bg.jpg`。

若需要在初始化完成后再做一些处理，监听`ResourceEvent.CONFIG_COMPLETE`事件即可。

当然，载入配置也难保证完全不出差错，所以最好监听 `ResourceEvent.CONFIG_LOAD_ERROR`事件，并在处理函数做一些`error log`处理之类。

>注意：RES.loadConfig()通常应写在整个游戏最开始初始化的地方，并且只执行一次。

### 直接读取方式

直接读取方式，就是免去了加载配置文件的过程。直接将资源加载配置内容以参数方式给出。

资源相对路径的基址仍为`resources/`。则直接读取的代码：

```
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        RES.getResByUrl('/resource/assets/bg.jpg',this.onComplete,this,RES.ResourceItem.TYPE_IMAGE);
    }

    private onComplete(event:any):void {
        var img: egret.Texture = <egret.Texture>event;
        var bitmap: egret.Bitmap = new egret.Bitmap(img);
        this.addChild(bitmap);
    }
}
```

两种读取方式对比说明

很显然，直接读取的方式直截了当，一步到位，没必要建立单独的配置文件，也不用侦听`CONFIG_COMPLETE`事件。

并且这两种方式的结果是等效的。即直接读取方式`RES.parseConfig`执行完毕，相当于文件读取方式`CONFIG_COMPLETE`事件被调度时。此时资源加载配置已经读入RES模块，则可以立即载入配置中的资源组，或者动态创建配置中存在的资源组，进行实际的资源加载了。

直接读取方式的另一个优点就是，可以灵活配置，比如根据游戏情节需要，下一步载入的资源会不同。直接读取方式就可以动态组合配置，其中只列出当前需要的资源。