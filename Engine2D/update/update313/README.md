Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 3.0 中包含了 Egret Engine 3D 和 Egret Engine 2D 两部分，以后会融合在一起，形成完整统一的 Egret Engine。

## Egret Engine 3D

现在 Egret Engine3D 开放体验，可以通过[Egret Engine 3D](https://github.com/egret-labs/egret-3d)获取到 Egret Engine 3D 的源码。也可以在 EDN 上查阅 [Egret Engine 3D API](http://edn.egret.com/cn/apidoc/index/name/egret3d.AudioManager)。更多关于 Egret Engine 3D 的教程欢迎关注 EDN [Egret Engine 3D 分类](http://edn.egret.com/cn/docs/page/775)。

在体验的过程中如果遇到任何问题希望您能留下宝贵意见，更欢迎大家在 Egret 论坛交流:[Egret3D 交流贴](http://bbs.egret.com/forum.php?mod=viewthread&tid=15653)。

Egret Engine 3D 官方交流群: 180593985 。

### Egret Engine 3D  新功能
---- ------------------------

#### •更新内容

- 增加高度地型
- 增加地型混合贴图效果
- 增加场景节点式加载
- 增加属性动画驱动

#### •	工具

- 增加unity3d 相机动画导出
- 增加unity3d 属性动画导出
- 增加场景节点式导出
- 增加地型导出

#### •	Bug修复

- 修复Object3D中节点查找Bug



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