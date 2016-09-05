## 更新内容

本次更新内容汇总了从引擎 3.1.7 到 3.1.8 的改动。

* 新增 canvas 模式支持变色和模糊滤镜

	变色和模糊滤镜使用方法与WebGL模式下API相同。
* 优化 WebGL 模式占用内存
* 优化 WebGL 矩形遮罩性能
* 修复 BitmapText 文本属性设置为异常值出错问题
* 修复 WebGL 下 RenderTexture 不能获取像素信息问题
* 修复 WebGL 下叠加效果异常问题
* 修复 localStorage 在 native 中实现不太对
* 修复 eui 属性类型解析错误问题
* 修复 Label 测量异常问题
* 修复帧频不准确问题

#### 路线图
* 优化滤镜性能