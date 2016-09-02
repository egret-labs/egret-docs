## 概述

我们在 Egret Engine 2.5 版本中将应用引擎及游戏引擎合并统一。由底层白鹭核心库+第三方库的集合的方式，来灵活的满足开发者各种应用和游戏的开发需求。降低开发成本提高开发效率。下面为您详细讲述此次更新的特性和功能。

### 更新内容

本次更新内容汇总了从引擎 2.5.2 到 2.5.3 的改动。

#### 增加 wxLocalResource 支持

可以加载并显示微信相册中的图片。

#### EUI 增加 BitmapLabel 组件
EUI 可以现在也可以使用位图组件了。详情可以参考 API [BitmapLabel](http://edn.egret.com/cn/index.php/apidoc/egret243/name/eui.BitmapLabel)
#### publish 后的项目也可以显示 FPS 面板
现在在`index.html`里面配置了显示 FPS 面板，发布之后也可以显示出来了。
当然开发的时候如果打开了 FPS 面板发布之前需要关闭。

#### EUI 皮肤可以设置 null 使用默认皮肤

这次更新也修复了一下问题：

* 修复设置 DataGroup.itemRenderSkinName bug
* 修复默认 gui & eui 项目log报错问题
* 修复输入文本特定情况下显示异常问题
* 修复 Bitmap 和 Graphics 测量不准确导致脏矩形绘制错乱问题
* 修复 BitmapText 测量问题

