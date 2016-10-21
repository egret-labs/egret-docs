
## RES资源加载配置

在Egret中，我们使用json格式作为RES资源加载配置文件的格式。这种格式使用方便，你甚至可以用记事本来编写它。同时，json格式也是模式JavaScript支持的一种解析格式。我们可以得到最快的解析处理。

以Egret模板项目的 `default.res.json` 为例：

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
### resources
配置文件中的 “resources” 我们可以视为资源库，当前游戏使用到的资源都可以放到这里。

“resources” 下每一项资源配置信息都包含三个属性：

* name：表示这个资源的唯一短名标识符。

* type：表示资源类型。

* url：表示当前资源文件的路径。

### groups

“groups” 是预加载资源组的配置，每项是一个资源组，每一个资源组须包含两个属性：

* name：表示资源组的组名

* keys：表示这个资源组包含哪些资源，里面的逗号分隔的每一个字符串，都与“resource”下的资源name对应。同一个资源可以存在于多个资源组里。

如果你有大量资源需要处理，编写配置文件，我们提供了可视化资源配置文件处理软件，可参考[Res Depot](../../../tools/ResDepot/manual/README.md)

## 载入资源加载配置

RES模块对资源加载配置有两种读取方式，一种是通过配置读取方式，另一种是通过路径读取方式。

### 配置读取方式

这是一个json文件，通常我们取名为`default.res.json`。载入代码如下：

```
RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this ); 
RES.addEventListener( RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this ); 
RES.loadConfig("resource/default.res.json","resource/");
```

`loadConfig`函数做执行的动作即为初始化RES资源加载模块。该函数包含两个参数，第一个参数是`default.res.json`文件的完整路径，第二个参数是配置中每个资源项url相对路径的基址。例如配置里的bgImage资源项填的url是`assets/bg.jpg`，加载时将会拼接为相对路径：`resource/assets/bg.jpg`。

若需要在初始化完成后再做一些处理，监听`ResourceEvent.CONFIG_COMPLETE`事件即可。

当然，载入配置也难保证完全不出差错，所以最好监听 `ResourceEvent.CONFIG_LOAD_ERROR`事件，并在处理函数做一些`error log`处理之类。

>注意：RES.loadConfig()通常应写在整个游戏最开始初始化的地方，并且只执行一次。

### 路径读取方式

路径读取方式就是免去了加载配置文件的过程。直接将资源加载配置内容以参数方式给出。

* 如果是项目内资源，相对目录为主目录而不是 RES.loadCOnfig 中设置的目录，比如：`resource/assets/bg.jpg`

* 如果是外部资源，请使用资源的绝对地址，比如：`http://xxx/a.png`

```
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        RES.getResByUrl('resource/assets/bg.jpg',this.onComplete,this,RES.ResourceItem.TYPE_IMAGE);
    }

    private onComplete(event:any):void {
        var img: egret.Texture = <egret.Texture>event;
        var bitmap: egret.Bitmap = new egret.Bitmap(img);
        this.addChild(bitmap);
    }
}
```
> RES.getResByUrl 的第四个参数请一定得带上，不然如果加载的地址不能很好辨认类型的话，加载很可能不是想要的结果。