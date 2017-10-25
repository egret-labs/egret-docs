## 1.动态纹理类`egret.RenderTexture`

egret 中位图的显示基于纹理，通常静态纹理的获取方式有下面四种：

* 从已经创建出来的Bitmap中直接取 texture 属性。

* 通过 `RES.getRes("run_down_png");`（如果有使用Res模块）直接获取

* 通过URLLoader加载后获取

* 通过 ImageLoader 加载的，将获取的 data 赋值给 Texture 对象的 bitmapData.

除此之外，egret 提供了动态纹理类`egret.RenderTexture`，用来将显示对象及其子对象绘制成为一个纹理，以实现截图功能。

```
var renderTexture:egret.RenderTexture = new egret.RenderTexture();
renderTexture.drawToTexture(displayObject);
```


## 2.方法

### 2.1.toDataURL()
`egret.RenderTexture`中的`toDataURL()`方法，将纹理转换成以 "data:image/png;base64," 开头的base64数据。

用法为： `texture.toDataURL("image/png", new egret.Rectangle(20, 20, 100, 100));`

* 第一个参数是所需要转成的格式，目前只支持 “image/png” 和 “image/jpeg”。

* 第二个参数是截取的区域，默认为`texture`整个大小。

> 注意：
因为是对`texture`本身进行的截取转换，所以即便`Bitmap`有缩放等变形操作，也不会影响`texture`截取区域的大小。

### 2.2.saveToFile()
`egret.RenderTexture`中的`saveToFile()`方法，裁剪指定区域并保存成图片。

用法为：`texture.saveToFile("image/png", "a/down.png", new egret.Rectangle(20, 20, 100, 100));`

* 第一个参数是图片格式

* 第二个参数是保存的文件名称（路径）.

* 第三个参数是截取的区域

>  注意：
浏览器只支持保存名称，所以像 "a/down.png" 这种写法，浏览器会自动将其改成"a-down.png"。图片会保存在浏览器下载的位置。

> Native下是可以保存路径的。图片会保存在游戏的私有空间，路径中不能有 "../"。
这里为了兼容所有的平台，建议大家不要使用路径。

#### 示例
保存截屏测试，代码如下：

```
var texture:egret.Texture = RES.getRes("run_png");
texture.saveToFile("image/png", "a/down.png", new egret.Rectangle(20, 20, 100, 100));
```

下面给出使用`saveToFile()`后生成的视图。

原图

![](55cd9c0ddeeb5.png)

截取后图

![](55cd9c0e37c9a.png)

### 2.3.drawToTexture()

`egret.RenderTexture`中的`saveToFile()`方法，将指定显示对象绘制为一个纹理

需要注意的是，这个方法会把当前的纹理清除，如果想要保留之前的纹理，需要使用 2 个 `RenderTexture` 交替绘制。

交替使用 `RenderTexture` 示例代码:

```
if (this.bmp.texture == this.renderTexture) {
    this.renderTexture2.drawToTexture(this, new egret.Rectangle(0, 0, 1024, 768));   
    this.bmp.texture = this.renderTexture2;
} else {
    this.renderTexture.drawToTexture(this, new egret.Rectangle(0, 0, 1024, 768)); 
    this.bmp.texture = this.renderTexture;
}
```

其中 `this.bmp` 是保存画板的位图对象，`this.renderTexture` 和 `this.renderTexture2` 是用来保存纹理的 `RenderTexture` 对象。

更新画板的纹理时使用与当前不同的 `RenderTexture` 对象保证上一次的纹理不被清空。

## 3.截图示例

点击[动态截屏](http://developer.egret.com/cn/example/page/index#040-bitmap-draw)，可以查看动态截屏示例的完整代码和效果。
