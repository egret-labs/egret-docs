![](56a5917e4a724.jpg)

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

在 Egret Engine 3.0 中包含了 Egret Engine 3D 和 Egret Engine 2D 两部分，以后会融合在一起，形成完整统一的 Egret Engine。

下面介绍 Egret Engine 3.0.1 到 Egret Engine 3.0.2 之间的更新详情。

### Egret Engine 3D

在 Egret Engien 3D 的本次更新中，新增了一些效果和功能，并且初步与 Egret EUI 混合。下面将逐一介绍相关更新详情:

* 新增 `carpaint` 材质
   
   汽车油漆材质特效 `PaintFresnelReflectionMappingMethod`
   
   **使用最新的汽车油漆材质特效打造 F1 酷炫的赛车，请参考示例：[F1 战车](http://edn.egret.com/cn/article/index/id/823) **

* 新增 `Object3D` 轴向偏移 
   
   动态偏移 `Object3D` 运动轴向，直接获取在屏幕的映射坐标
   
* 新增 `HoverController` 相机控制器

  `HoverController` 是新增的摄像机控制器 ,实现摄像机平滑移动指定摄像机看向的目标对象。

* 新增 `VideoTexture` 
   
   添加了支持少量格式的 `VideoTexture`。VideoTexture 使用 Video 标签采集视频，支持 Html5 标准的视频格式:ogv,mp4,avi。可以将采集的视频贴图上传至 GPU。
   
* 新增用 tsconfig 调试
   
   加载独立文件调试引擎需要通过 `egret3d.Egret3DEngine.preload(() => this.startDebugModeEngine());`来启动调试引擎

* 初步融合 Egret Engine 2D EUI 与 Egret Engine 3D 
   
   显示顺序 EUI/Egret3D egret2D 永远在上层的传统模式。参考 EUI-Egret3D 案例:[EUI-Egret3D](https://github.com/egret-labs/egret-3d/tree/master/Sample-wing-blend-egret2d/EUI-Egret3D)  
   
   使用Egret Wing 运行示例请参考：[使用 Egret Wing 运行示例](http://edn.egret.com/cn/docs/page/830)
 
#### 联系我们

获取 Egret Engine 3D 的源码: [Egret Engine 3D](https://github.com/egret-labs/egret-3d)。

查阅 Egret Engine 3D API: [Egret Engine 3D API](http://edn.egret.com/cn/apidoc/index/name/egret3D.AnimaNodeCollection)。

更多关于 Egret Engine 3D 的教程欢迎关注 EDN [Egret Engine 3D 分类](http://edn.egret.com/cn/docs/page/775)。

在体验的过程中如果遇到任何问题希望您能留下宝贵意见，更欢迎大家在 Egret Engine 3D 论坛交流:[Egret3D 交流贴](http://bbs.egret.com/forum.php?mod=viewthread&tid=15653)。

Egret Engine 3D 官方交流群: 180593985 。   
