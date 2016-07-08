## 介绍

> WebGL 是一套用于渲染 2D 和 3D 图形的标准图形库，其标准是由 Khronos、AMD、爱立信、谷歌、Mozilla、Nvidia 以及 Opera 等共同制定。

我们知道 WebGL 通过增加 OpenGL ES 2.0 的一个 JavaScript 绑定，可以为 HTML5 Canvas 提供硬件 3D 加速渲染。 Egret Engine 2D 在最新的 3.0.6 版本中提供了新的 WebGL 渲染模式。只需方便的开启 WebGL 渲染就能让我们的程序获得硬件加速。

WebGL 提供了底层的渲染 API，对于传统 Web 开发者来说使用 WebGL API 是比较复杂的，需要补充大量的 OpenGL ES 相关知识。 但在 Egret Engine 中使用 WebGL 却十分方便， 只需在程序开始时选择开启 WebGL 渲染即可。在最新的 Egret Engine 2D 中可以选择使用 Canvas 或 WebGL 渲染。

同时也无需担心 WebGL 标准的兼容性问题。在开启 WebGL 渲染模式下，如果浏览器不支持将自动切换到 Canvas 渲染模式下。

### WebGL 兼容性

使用 WebGL 渲染可以获得硬件加速渲染，获得性能上的提升。我们当然希望可以在所有环境中使用 WebGL 渲染。好消息 WebGL 正在获得更多更广泛的支持。

| PC浏览器 | 兼容性 |
|---|---|
| Chrome | Chrome 9 开始支持。在 Linux, Mac  和 Windows 版本中均支持。 |
| Firefox | WebGL 在 Firefox 4 及以上版本默认支持。 |
| Safari  | Safari 5.1 开始支持 (Lion 版本系统已经使用)。 |
| Opera | Opera 12 alpha 及以上版本。 | 
| IE | IE 11 开始支持。 |

| 手机浏览器 | 兼容性 |
|---|---|
| ChromeAndroid | Chrome 30 开始在支持 GL_EXT_robustness 扩展的设备上支持. | 
| 腾讯x5内核 | QQ浏览器以及X5 tbs 2.x： android 4.0以下不支持webgl功能，4.0以上会根据手机的gl指令进行检查从而最终决定是否开启webgl功能 | 

## 使用

### 开启 WebGL 渲染

在 Egret Engine 2D 3.0.6 中我们可以自由开启 WebGL 渲染模式。默认的渲染模式任然使用 Canvas ，开启 WebGL 渲染模式只需要在 Egret 启动时指定渲染模式即可。在 Egret 项目根目录中我们可以找到 index.html 文件。该文件是 Egret 项目的入口,包含很多初始化设置。

在 index.html 中找到第 58 行。可以看到 Egret 的启动函数。如果要开启 WebGL 渲染只需要在其中传入参数即可。

```
egret.runEgret({renderMode:"webgl"});
```

当然我们也可以指定渲染模式为 Canvas (Egret 3.0.6 版本开始的默认参数):

```
egret.runEgret({renderMode:"canvas"});
```

在 index.html 的启动函数中指定渲染模式即可开启 WebGL 渲染模式。如果我们不指定任何参数将仍然使用 Canvas 渲染。

### 判断当前的渲染模式

可以通过 Capabilities 类的 renderMode 来判断当前的渲染模式。

```
console.log(egret.Capabilities.renderMode);
```

上面一行代码在 Canvas 模式下将打印 `canvas`,在 WebGL 模式下将打印 `webgl`;

### WebGL 与脏矩形

在 Egret Engine 3.0.7 开始 WebGL 渲染模式下开始支持脏矩形。自动脏矩形脏矩形只重绘屏幕发生改变的区域，可以获得性能的提升。需要注意的是由于和 Canvas 模式的渲染机制不同，自动脏矩形对 WebGL 渲染的性能提升比较小，可以手动关闭脏矩形渲染。

### 其他注意事项

我们知道可以在 Egret 程序的入口中开启 WebGL。如果浏览器不支持 WebGL 渲染将自动切换到 Canvas 渲染模式上。

使用 WebGL 渲染是可以得到性能提升的。但在使用很多文本和矢量绘图的情况下，可能有更多的开销，起不到提升性能的作用。因为在 WebGL 渲染模式下文本和矢量绘图是需要在 Canvas 中缓存下来再渲染到 WebGL 中。由于多了在 Canvas 渲染的过程，如果使用大量的文本或者矢量绘图将不能得到相应的性能提升。

在 WebGL 下如果使用 Texture 对象的 toDataURL() 方法把纹理转换为 base64 字符串，需要注意的是纹理图片应放在同一服务器下，引用不同的服务器下的资源将不成功。

当然 WebGL 标准正在普及，在手机上有些特性支持还不是很友好。手机上非 Chrome 浏览器现在对不规则遮罩支持还不是很好，在使用 WebGL 渲染器时可以尽量避免使用不规则遮罩。




