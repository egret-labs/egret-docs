RES资源管理模块共含有三种资源获取方式：

* RES.getRes(name:string):any

同步获取资源 这种方式只能获取已经缓存过的资源，例如之前调用过loadGroup()被预加载的资源。

* RES.getResAsync(name:string,compFunc:Function,thisObject:any):void

异步获取资源，这种方式可以获取配置中含有的所有资源项。如果缓存中存在，直接调用回调函数返回，若不存在，就启动网络加载文件并解析后回调。

* RES.getResByUrl(url:string,compFunc:Function,thisObject:any,type:string=""):void

通过url获取不在配置中的资源，通常不建议使用这个接口，只有那些不合适填写在配置中，比如获取网络上其他服务器的资源时，才采用这种方式。

前两种获取方式的name参数都对应配置文件里资源项的name属性。如果name对应的文件是SpriteSheet等含有多个子资源的类型，可以使用"."语法直接获取到子资源。

例如配置里有一个name为"icons"的SpriteSheet文件，它里面含有一个"activity_10"的子位图，我们要获取这个子位图。以下两种写法是等效的：

```
var spriteSheet:egret.SpriteSheet = RES.getRes("icons");

var texture = spriteSheet.getTexture("activity_10");

//等同于这样取：

var texture:egret.Texture = RES.getRes("activity_10");
```

