
Egret3D中音频加载不依赖于URLLoader对象进行操作，而是通过AudioManager自行管理。通过如下代码，你可以加载一个音频文件，同时指定加载完成后的回调函数。

```
var sound:egret3d.Sound = egret3d.AudioManager.instance.createSound(url, () => this._success, () => this._error);
```

其中后面两个参数使用TypeScript中的箭头函数，确保其this引用作用域正确。我们可以设定音频加载成功后的回调函数和音频加载失败的回调函数。
