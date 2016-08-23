在 Egret Engine 2.5.7 的更新中，提供了一些新功能：EUI 的新控件 `TextInput`； EXML 可以设置版本号的功能。也修复了一些问题，下面来详细介绍一下。

### 输入控件 TextInput

TextInput 是一个方便的文本输入控件。可以通过它来快速定义输入默认的输入文本和背景样式。

更多关于输入控件可以参考，请点击: [API：TextInput](http://edn.egret.com/cn/apidoc/index/name/eui.TextInput) 和 [EUI教程：输入文本](http://edn.egret.com/cn/docs/page/538#输入控件 TextInput) 

### EXML 设置版本号

通常我们希望更新版本的时候避免被浏览器缓存，现在可以通过设置 EXML 版本号的方式来实现。 

```
 "exmls": [
    "resource/eui_skins/ButtonSkin.exml?v=20151211"
  ]
```

比如上面我们给这个 `ButtonSkin` 的设置了一个版本号,通过在 `default.thm.json` 配置加载 EXML 文件时加入后缀`?=20151211`来设置版本号。

### 全局跨域策略

ImageLoader 增加静态变量 `crossOrigin` 来设置全局跨域策略。如果 ImageLoader 实例有设置过 crossOrigin 属性将使用设置的属性。

可以设置为"anonymous","use-credentials"或null,设置为其他值将等同于"anonymous"。`anonymous` 表示密名访问，`use-credentials`表示使用安全凭据访问。

更多关于`crossOrigin`可以参考: [API: crossOrigin](http://edn.egret.com/cn/apidoc/index/name/egret.ImageLoader#crossOrigin)

### 修复问题

* 修复某些情况下 `DisplayObject.hitTest` 异常问题
* 修复 `DisplayObject.hitTestPoint` 方法检测异常问题
* 优化 `EditableText.prompt` 属性
* 修复 `RenderTexture` 绘制异常问题
* 修复 `RELEASE` 模式下开启 `show-paint-rect` 引发异常
* 修复 `Graphics` 设置 `lineStyle` 第一个参数用默认值引发渲染异常
* 修复断网情况下，引擎无法执行 `build` 命令问题


更多关于 Egret 全局函数可以参考:[全局函数](http://edn.egret.com/cn/apidoc/index/name/egret.globalFunction#getOption)

>查阅 Egret 2.5.0 更新详解： [Egret 2.5 更新详解](http://edn.egret.com/cn/index.php/docs/page/628)

>EgretEngine2.5升级相关问题请到论坛交流：[EgretEngine2.5升级相关问题](http://bbs.egret.com/forum.php?mod=viewthread&tid=11702&extra=&page=1)
