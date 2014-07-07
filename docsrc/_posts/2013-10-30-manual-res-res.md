---
layout: post
title:  "使用 Egret 的资源加载机制(RES)"
permalink: post/manual/loader/res.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

1. RES模块是什么？

Egret提供了一套默认的资源加载管理模块，在"RES"这个命名空间下。RES是一个可选的模块，与Egret核心库完全独立。开发者可以自行选择是否采用它，或使用自定义的第三方资源加载管理库。

2. RES配置文件格式

这里我们以Egret模板项目的resource.json为例：

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

resources下是每一项资源的配置信息，name表示这个资源的唯一短名标识符，type表示资源类型，url是资源文件的路径。

groups下是预加载资源组的配置，每项是一个资源组。name表示资源组的组名，keys表示这个资源组包含哪些资源，里面的逗号分隔的每一个字符串，都与resources下的资源name对应。同一个资源可以存在于多个资源组里。
附上RES配置文件可视化管理工具：ResTool ( beta ) ,

3. 如何初始化？

调用RES.loadConfig()加载之前的resource.json配置文件即可完成初始化。loadConfig()第一个参数是resource.json文件的完整路径，第二个参数是resource.json里每个资源项url的前缀。例如配置里的bgImage资源项填的url是assets/bg.jpg，在这里实际加载时将会采用resources/assets/bg.jpg来加载:

RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComp,this);
RES.loadConfig("resources/resource.json","resources/");

若需要在初始化完成后再做一些处理，监听ResourceEvent.CONFIG_COMPLETE事件即可。

注意：RES.loadConfig()通常应写在整个游戏最开始初始化的地方，并且只执行一次。

4. 如何预加载资源组？

在配置文件加载完成后，我们可以调用RES.loadConfig()开始预加载配置中的一组资源。第一个参数"preload"对应配置文件中的资源组名。预加载可以在游戏启动时，也可以是某个面板被打开前，调用时机由具体项的目逻辑确定:

RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
RES.loadGroup("preload");

这里需要注意下组加载事件回调函数里的写法，需要使用event.groupName判断下这个事件是属于哪个资源组，因为可能有多个资源组同时在加载:

private onResourceProgress(event:RES.ResourceEvent):void {
    if(event.groupName=="preload"){
        this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
    }
}

若同时启动多个资源组一起加载，比如在加载"preload"前，我们希望先加载一个更小的"loading"资源组，以提供显示"preload"组加载进度的素材，可以使用RES.loadGroup()的第二个参数，为"loading"组传入一个优先级更大的数字，来迫使loading组在preload前加载完成：

RES.loadGroup("loading",1);
RES.loadGroup("preload",0);

5. 如何运行时动态创建资源组？

若资源组无法预先配置在文件中，需要运行时才能动态确定的，我们可以通过调用RES.createGroup(groupName:string,keys:Array)方法，动态创建一个资源组，再加载它。

groupName是要创建的资源组组名。keys这个资源组包含的资源列表。里面的key对应配置文件里的name属性或一个资源组名，若key是资源组名将类似合并资源组的功能。你可以同时传入多个已存在资源组名，合并成一个新资源组，再调用loadGroup()一次加载完。注意：createGroup()方法是基于已存在的配置属性操作的，调用这个方法前请先确认RES的配置文件已经加载完成了。也就是在监听到ResourceEvent.CONFIG_COMPLETE事件之后。

6. 如何获取资源？(三种获取方式以及如何直接获取文件中的子资源)

RES一共含有三种资源获取方式：

RES.getRes(name:string):any 
同步获取资源 这种方式只能获取已经缓存过的资源，例如之前调用过loadGroup()被预加载的资源。
RES.getResAsync(name:string,compFunc:Function,thisObject:any):void
异步获取资源，这种方式可以获取配置中含有的所有资源项。如果缓存中存在，直接调用回调函数返回，若不存在，就启动网络加载文件并解析后回调。
RES.getResByUrl(url:string,compFunc:Function,thisObject:any,type:string=""):void 
通过url获取不在配置中的资源，通常不建议使用这个接口，只有那些不合适填写在配置中，比如获取网络上其他服务器的资源时，才采用这种方式。
前两种获取方式的name参数都对应配置文件里资源项的name属性。如果name对应的文件是SpriteSheet等含有多个子资源的类型，可以使用"."语法直接获取到子资源。例如配置里有一个name为"icons"的SpriteSheet文件，它里面含有一个"activity_10"的子位图，我们要获取这个子位图。以下两种写法是等效的：

var spriteSheet:egret.SpriteSheet = RES.getRes("icons");
var texture = spriteSheet.getTexture("activity_10");
//等同于这样取：
var texture:egret.Texture = RES.getRes("icons.activity_10");

这种方式在与GUI的UIAsset无缝桥接时将会非常有用。

7. 资源的缓存机制

resources节点下配置的每个资源加载项，在第一次加载成功时会用name属性作为key缓存下来。以后再请求它时，都直接从缓存里取。如果有两个组都含有一个资源，第二个组再加载这个资源时，也会直接从缓存里得到结果，不会重复发起加载请求。

8. 如何销毁缓存的资源？

Resource在第一次加载资源后，会缓存下来这个资源。使用RES.destroyRes(name:string):boolean，传入资源文件的name，即可清理对应的缓存。传入资源组名，即可清理整个资源组里所有资源对应的缓存。如果要销毁通过RES.getResByUrl(url)加载的资源，传入url作为name即可。

由于目前JS里没有弱引用字典，无法实现资源的自动回收，所以还需要手动去销毁缓存的资源。未来ECMAScript 6普及后，会有WeakMap类，那时我们将不再需要手动清理缓存的资源。
9. RES内置了哪些文件类型的解析器？

目前RES内置支持的文件类型有：

RES.ResourceItem.TYPE_BIN(bin)：解析为原始的二进制文件
RES.ResourceItem.TYPE_IMAGE(image)：解析为egret.Texture对象
RES.ResourceItem.TYPE_TEXT(text)：解析为string变量
RES.ResourceItem.TYPE_JSON(json)：解析为json对象
RES.ResourceItem.TYPE_SHEET(sheet)：解析为egret.SpriteSheet对象
RES.ResourceItem.TYPE_FONT(font)：解析为egret.BitmapTextSpriteSheet对象
RES.ResourceItem.TYPE_SOUND()：解析为egret.Sound对象
10. 如何扩展文件格式以及自定义文件解析器？

自定义解析器请参考内置解析器的写法，继承自AnalyzerBase实现相关接口即可。然后在调用RES.loadConfig()之前，使用下面的方式注入你的自定义解析器到框架内：

egret.Injector.mapClass(RES.AnalyzerBase,YourAnalyzer,"yourType");

这里的"yourType"就是你在配置中填写的那个type值。RES在加载时，会根据你填写的type值，调用你注入的对应解析器来加载解析文件。另外，这种注入方式同样也支持替换掉默认的内置解析器.例如把第三个参数"yourType"改成RES.ResourceItem.TYPE_IMAGE,默认的图片解析器就被替换掉了。

11. 图片类型如何配置九宫格参数？

图片类型的解析器是支持九宫格参数的，只要在资源项上加上"scale9grid"属性即可，示例：

{"name":"button","scale9grid":"22,0,10,60","type":"image","url":"assets/button.png"}

其中scale9grid属性的四个值分别表示九宫格矩形的:x,y,width,height,与Flash里的九宫格参数表现一致。

12. 如何与GUI系统无缝桥接？

通过前面的说明，相信大家已经明白了RES的基本思路：就是通过一个简短的唯一字符串，映射一个长url，文件类型以及其他参数。这样在代码里我们可以用非常优雅的方式来获取资源，只需要一个字符串短名，其他的初始化和参数配置都已经自动完成了。这样做还有个好处，隔离了具体的url，当需要制作多语言版本的资源时，只需要换一个配置文件，把url映射到其他文件，代码里引用的name字符串都无需修改。

虽然现在获取资源的方式已经很简洁了，但是没有预加载的资源仍需要异步回调的方式获取，还是略微不太方便，现在我们来实现最后一步优化，注入RES到GUI的UIAsset解析器里，屏蔽掉所有异步加载的细节。

首先，实现一个自定义的素材解析器AssetAdapter：

class AssetAdapter implements egret.IAssetAdapter{
    public getAsset(source:any,compFunc:Function,thisObject:any,oldContent:any):void{
        var content:any = source;
        if(source.prototype){
            content = new source();
        }
        if(content instanceof egret.DisplayObject||content instanceof egret.Texture){
            compFunc.call(thisObject,content,source);
        }
        else if(typeof(source)=="string"){
            if(RES.hasRes(source)){
                RES.getResAsync(source,onGetRes,this);
            }
            else{
               RES.getResByUrl(source,onGetRes,this);
            }
            function onGetRes(data:any):void{
                compFunc.call(thisObject,data,source);
            }
        }
        else{
            compFunc.call(thisObject,content,source);
        }
    }
}

关键就是这一句：RES.getResAsync(source,onGetRes,this);若传入的source是字符串，就调用RES去解析这个字符串,并回调结果。

接下来我们在GUI初始化前加上这句，把我们自定义的AssetAdapter注入到框架内：

egret.Injector.mapClass("egret.IAssetAdapter",AssetAdapter);

做完这个注入后我们基本上就可以忘记RES的存在了。要显示一个位图，可以直接这样写：

var sky:egret.UIAsset = new egret.UIAsset();
sky.source = "bgImage";

或前面提到的显示一个SpriteSheet里的一张子位图：

var icon:egret.UIAsset = new egret.UIAsset();
icon.source = "icons.activity_10";

你不用关心它怎么加载的，不用写任何回调监听。直接把这个显示对象加到显示列表即可。
