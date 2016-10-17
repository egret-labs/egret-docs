## 更新内容

### 概述

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的[3D引擎](https://github.com/egret-labs/egret-3d)，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。


本次更新内容汇总了从引擎 3.2.0 到 3.2.1 的改动。


* eui.Label 增加 style 设置
* Texture 增加设置 bitmapData 属性
* Texture 增加 getPixels 方法
* TextField 增加字号和文字颜色默认值设置
* 增加 exml 编译报错提示
* 修复 RenderTexture 在 webgl 模式下绘制异常问题
* 修复 TextField 测量不准确问题

#### 路线图
* 优化滤镜性能


### TextField新增属性

TextField新增两个属性，分别为`egret.TextField.default_size`和`egret.TextField.default_textColor`。当用户设置该属性后，全局`egret.TextField`对象在为设置文本尺寸和文本颜色的时候均会使用默认值渲染。

### EUI Label控件新增style属性

你可以在样式配置文件中定义一个`style`节点，同时设定针对于`Label`控件的样式，如下图：

![](4E6848EA9474A35F2DA5D0B96853C854.jpg)

在.exml文件中如需使用该样式，可设置其`style`属性，如下图：

![](39253C5BF3570D760C4213AA175DFE3F.jpg)

### Egret资源管理框架公测版发布
资源管理模块目前作为白鹭引擎的全新特性，本次开放发布希望获得开发者的广泛反馈意见，目前暂时不建议开发者用于正式项目中。
核心功能有：
* 友好的资源加载 API
* 版本控制支持
* 针对不同平台发布不同的资源
* 更容易开发者进行扩展的结构
* 80% 兼容旧版 API

下载地址 https://github.com/egret-labs/resourcemanager