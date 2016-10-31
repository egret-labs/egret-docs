## 一、预加载资源组

在配置文件加载完成后，我们可以调用RES.loadGroup(name:string,priority:number=0)开始预加载配置中的一组资源。该函数需要两个参数，参数"name"对应配置文件中的资源组名。预加载可以在游戏启动时，也可以是某个面板被打开前，调用时机由具体项的目逻辑确定。代码如下：

```
RES.addEventListener( RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this );
RES.addEventListener( RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this );
RES.addEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadErr, this );
RES.loadGroup( "preload" );
```

事件对应的资源组

这里需要注意，组加载事件回调函数里的写法，需要使用event.groupName判断下这个事件是属于哪个资源组，因为可能有多个资源组同时在加载。示例代码如下：

```
private onResourceProgress( event:RES.ResourceEvent ):void {
    if( event.groupName=="preload" ){
        this.loadingView.setProgress( event.itemsLoaded,event.itemsTotal );
    }
}
```

资源组加载失败处理

由于网络等原因，可能造成资源加载失败，这种情况下将会派发GROUPLOADERROR事件，可以在事件处理中重新加载资源：

```
private onResourceLoadErr( event:RES.ResourceEvent ):void {
    RES.loadGroup( event.groupName );
}
```

在复杂的网络环境，可能会出现多次加载失败，这时我们可能需要在一定的失败次数之后停止加载，因为可能网络已经失去连接，那么我们可以通过对加载失败次数进行计数。 假设有一个成员countGroupError用来计数加载失败次数，其初始值为0，则处理函数修改为：

```
private onResourceLoadErr( event:RES.ResourceEvent ):void {
    if( ++this.countGroupError < 3 ){
        RES.loadGroup( event.groupName );
    }else{
        /// 弹出网络失去连接提示等
    }
}
```

对于多个资源组同时加载的情况，countGroupError可以使用一个以groupName为键的哈希数组来记录每个资源组的加载失败次数。

同时进行多资源组加载时的优先级控制

若同时启动多个资源组一起加载，比如在加载"preload"前，我们希望先加载一个更小的"loading"资源组，以提供显示"preload"组加载进度的素材，可以使用RES.loadGroup()的第二个参数，为"loading"组传入一个优先级更大的数字，来迫使loading组在preload前加载完成，代码如下：

```
RES.loadGroup("loading",1); 
RES.loadGroup("preload",0);
```

## 二、运行时动态创建资源组

若资源组无法预先配置在文件中，需要运行时才能动态确定的，我们可以通过调用RES.createGroup(groupName:string,keys:Array)方法，动态创建一个资源组，再加载它。

groupName：是要创建的资源组组名。

keys：这个资源组包含的资源列表。里面的key对应配置文件里的name属性或一个资源组名，若key是资源组名将类似合并资源组的功能。你可以同时传入多个已存在资源组名，合并成一个新资源组。

动态创建资源组之后，调用loadGroup()一次加载完。

注意：createGroup()方法是基于已存在的配置属性操作的，调用这个方法前请先确认RES的配置文件已经加载完成了。也就是在监听到ResourceEvent.CONFIG_COMPLETE事件之后。