Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 3.0 中包含了 Egret Engine 3D 和 Egret Engine 2D 两部分，以后会融合在一起，形成完整统一的 Egret Engine。




## Egret Engine 2D

在 Egret Engine 2D 的 本次更新中，我们吸收开发者提供的反馈和建议，进一步稳定引擎并优化了一些体验。下面列出的是 3.1.2 到 3.1.3 的更新详情。

#### •	更新内容

- native 支持远程视频

更新 `load(url,cache)`方法。

> 第一个参数是视频的url 地址。
>
> 第二个参数适用于native环境，启动本地视频文件缓存。
>
> 注意： ios native  上无法同时播放两个视频

#### •	Bug修复

- 修复 WebGL脏矩形绘制异常
- 修复 WebGL模式下设置cacheAsBitmap引发绘制异常
- 修复 publish EUI 项目会修改之前发布目录下主题文件的bug
- 修复 scroller 滚动bug
- 修复 DataGroup 刷新bug
- 修复 progressBar 内部对象定位bug
- 修复pc上视频非全屏播放不能重复加载bug
- 修复 drawEllipse 绘制异常bug
- 命令行在 publish 异常的时候，增加报错信息- 