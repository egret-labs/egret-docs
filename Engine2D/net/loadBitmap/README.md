Egret 为加载位图文件准备了专门的类 ImageLoader 。
假如 ImageLoader 类通过如下代码加载位于 'resource/egret.png' 的图片： 
``` TypeScript
var imgLoader:egret.ImageLoader = new egret.ImageLoader;
imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this ); 
imgLoader.load( "resource/egret.png" );  
```
则在所定义的回调事件中，可以这样来获取该图片对应的 BitmapData，并以此来创建位图：
``` TypeScript
imgLoadHandler( evt:egret.Event ):void{
    var loader:egret.ImageLoader = evt.currentTarget;
    var bmd:egret.BitmapData = loader.data;
    var bmp:egret.Bitmap = new egret.Bitmap( bmd );
    this.addChild(bmp);
}
```
