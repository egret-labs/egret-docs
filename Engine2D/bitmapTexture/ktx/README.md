## KTX 纹理压缩使用说明

### 一.关于 KTX
KTX (Khronos Texture) 是一种纹理存储格式，大部分移动设备的 GPU 均支持这种格式。可以有效降低设备的显存占用，提高运行效率和稳定性。

![](p1.png)

如上图所示，第一步我们先把普通的 png\jpg 图片，转换成 `ios` 系统支持的 PVRTC 和安卓系统支持的 `ETC1` 格式的纹理。第二步再把纹理打包为 KTX 格式。


### 二.如何使用 KTX
**[KTX 使用示例](http://tool.egret-labs.org/DocZip/engine/KTXHello.zip)**

上面是一个 `HelloWorld` 的示例项目，其中只把 `egret_icon.png` 这个图片转换为 `KTX` 格式使用。

#### 1.资源说明
在 `resource/assets` 目录下，`egret_icon` 有如下几种格式，引擎会根据不同平台来读取不同的格式：

```
egret_icon.png
egret_icon.pvr.ktx
egret_icon_alpha.ktx
egret_icon.ktx
```
* `egret_icon.png`：PC 平台使用。
* `egret_icon.pvr.ktx`：pvr 格式的 ktx，iOS 平台使用
* `egret_icon.ktx`(etc1 格式的颜色纹理) 和 `egret_icon_alpha.ktx`(alpha遮罩纹理)：安卓平台使用。**注：也可以把 2 个 ktx 文件合成一个文件，具体方法请参考高级教程**

#### 2.代码说明

![](p2.png)

在 `Main.ts` 中的 `loadResource` 方法里，我们加了几行代码。

* `ignoreResource` 方法表示只有 `egret_icon.png` 这个图片才会进入 `ktx` 的使用流程，其他资源全部忽略
* `CompressTextureProcessor` 是加载资源的处理器，我们把它注册到了  `AssetsManager` 资源管理器中。具体的处理逻辑，请看示例中的代码。

#### 3.显示效果
![](p3.png)

为了更容易看出效果，我们把 `egret_icon.png` 换成了另外一张白鹭小鸟，而 `ktx` 格式还是标准 `HelloWorld ` 里的白鹭图标。

从上图中很容易看出，左侧是 `PC` 浏览器中的显示效果，因为不支持 `ktx` 格式，显示的是 `png` 图片。而右侧的 `iOS` 手机浏览器，因为支持 `ktx` 格式，显示的是 `pvr` 纹理格式的图片。
