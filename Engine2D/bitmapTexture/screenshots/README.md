## Texture 类型

### 纯位图 texture
texture 获取方式有下面几种，

* 从已经创建出来的Bitmap中直接取 texture 属性。

* 通过 `RES.getRes("run_down_png");`（如果有使用Res模块）直接获取

* 通过URLLoader加载后获取

* 通过 ImageLoader 加载的，将获取的 data 赋值给 Texture 对象的 bitmapData.
 
 	```
var imgLoader:egret.ImageLoader = new egret.ImageLoader;
imgLoader.once( egret.Event.COMPLETE, imgLoadHandler, this); 
imgLoader.load( "resource/egret.png" );
imgLoadHandler( evt:egret.Event ):void{
    var loader:egret.ImageLoader = evt.currentTarget;
    var bmd:egret.BitmapData = loader.data;
    var texture:egret.Texture = new egret.Texture();
    texture.bitmapData = bmd;
}
 ```

### RenderTexture
将 DisplayObject 转成的 Texture。

```
var renderTexture:egret.RenderTexture = new egret.RenderTexture();
renderTexture.drawToTexture(displayObject);
```

这样就可以把自己想要的截图的容器放到一个renderTexture上。


## 方法

### toDataURL
转换成以 "data:image/png;base64," 开头的base64数据。直接调用 `texture.toDataURL("image/png", new egret.Rectangle(20, 20, 100, 100));`即可。

* ”image/png” 为所需要转成的格式，目前只支持 “image/png” 和 “image/jpeg”。

* 第二个参数就是你所希望截取的区域了，默认为texture整个大小。

> 注意：
因为是对texture本身进行的截取转换，所以即便Bitmap本身有缩放等变形操作，都是不会影响texture截取的区域大小的。

### saveToFile
保存截屏视图。

直接调用 `texture.saveToFile("image/png", "a/down.png", new egret.Rectangle(20, 20, 100, 100));`。

* 第一、三2个参数同上面是一样的，

* 第二个参数是希望保存的文件名称（路径）了.

>  注意：
浏览器只支持保存名称，所以像 "a/down.png" 这种写法，浏览器会自动将其改成"a-down.png"。图片会保存在浏览器下载的位置。

> Native下是可以保存路径的。图片会保存在游戏的私有空间，路径中不能有 "../"。
这里为了兼容所有的平台，建议大家不要使用路径。

#### 示例
保存截屏测试

下面给下使用saveToFile后生成的视图。

```
var texture:egret.Texture = RES.getRes("run_png");
texture.saveToFile("image/png", "a/down.png", new egret.Rectangle(20, 20, 100, 100));
```

原图

![](55cd9c0ddeeb5.png)

截取后图

![](55cd9c0e37c9a.png)

### drawToTexture

drawToTexture 方法还可以用于绘图板功能。但要注意的是，这个方法会把当前的纹理清除，如果想要保留之前的纹理，需要使用 2 个 RenderTexture 交替绘制。

交替使用 RenderTexture 示例代码:

```
if (this.bmp.texture == this.renderTexture) {
    this.renderTexture2.drawToTexture(this, new egret.Rectangle(0, 0, 1024, 768));   
    this.bmp.texture = this.renderTexture2;
} else {
    this.renderTexture.drawToTexture(this, new egret.Rectangle(0, 0, 1024, 768)); 
    this.bmp.texture = this.renderTexture;
}
```

其中 this.bmp 是保存画板的位图对象，this.renderTexture 和 this.renderTexture2 是用来保存纹理的 RenderTexture 对象。

更新画板的纹理时使用与当前不同的 RenderTexture 对象保证上一次的纹理不被清空。

## 截图示例

点击[动态截屏](http://developer.egret.com/cn/example/page/index#040-bitmap-draw)
