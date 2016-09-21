## 使用
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

## 跨域处理

* 服务器设置访问权限。
* 可以通过尝试修改 `imgLoader.crossOrigin = 'anonymous'` 来以匿名的方式访问。不过在使用 `texture.toDataURL` 时会报跨域问题。
* webgl 渲染下，暂不支持跨域图片处理。