ParserEvent3D：使用 ParserUtils 加载资源的事件返回对象。

LoaderEvent3D：使用URLLoader加载资源的事件返回对象只有URLLoader对象调用addEventListener 才会产生下类事件

示例：
        
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
