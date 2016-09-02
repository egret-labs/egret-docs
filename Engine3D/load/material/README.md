
Egret3D中提供一个简单的资源加载器，该加载器会自动更具你所加载的资源文件格式做对应的资源格式解析。

你需要针对URLLoader对象监听三个事件，分别为`egret3d.LoaderEvent3D.LOADER_COMPLETE`,`egret3d.LoaderEvent3D.LOADER_ERROR`和`egret3d.LoaderEvent3D.LOADER_PROGRESS`。三个事件分别对应加载完成，加载错误和加载过程中状态。

具体代码使用如下：

```
private init()
{
	var loader:egret3d.URLLoader = new egret3d.URLLoader;
	loader.addEventListener( egret3d.LoaderEvent3D.LOADER_COMPLETE,this.onLoad,this);
	loader.addEventListener( egret3d.LoaderEvent3D.LOADER_ERROR, this.onError, this);
	loader.addEventListener( egret3d.LoaderEvent3D.LOADER_PROGRESS, this.onProgess, this);

	loader.load("resource/logo.png");
}

private onLoad(evt:egret3d.LoaderEvent3D)
{
	console.log("load complete.");
	console.log(evt.loader.data);
}
private onError(evt:egret3d.LoaderEvent3D)
{
	console.log("load error.");
}
private onProgess(evt:egret3d.LoaderEvent3D)
{
	console.log("loading...", evt.loader.bytesLoaded/evt.loader.bytesTotal,"%");
}
```

在加载之前，你也可以自己指定即将加载的资源类型，使用如下语句，在加载执行前设定。

```
loader.dataformat = egret3d.URLLoader.DATAFORMAT_TEXT;
```

设定此属性后，当资源加载完成，会按照你所指定的资源类型进行解析。


