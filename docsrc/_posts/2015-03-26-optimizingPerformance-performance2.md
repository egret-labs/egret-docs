---
layout: post
title:  "简介" 
permalink: jkdoc/performance1.html
type: manual
element: optimizingPerformance
version: Egret引擎 v1.6.1
---
 
# 第二章：内存优化

### 显示对象

Egret包含多种显示对象，要限制内存使用量，需选择合适的显示对象。

* 对于非交互的简单形状，使用Shape。
* 对于没有重绘需求有子节点，使用DisplayObjectContainer 。
* 对于有重绘需求有子节点，使用Sprite。

### 重用对象

重用对性能与内存非常重要。

创建对象时，将对象创建在循环外部并在循环内反复重用它。并非所有对象总是能够这么做，但在许多情形下此技术很有帮助。

需要密集的创建对象，要引入对象池，例如：做一款打飞机类型游戏，进入战斗前，飞机，怪物，掉血特效等对象提前初始化，在过程中实时提取，而不是实时创建。

尽管使用对象池具有性能优势，但它的主要好处是让内存管理工作更容易。 如果内存利用率无限制地增长，对象池可预防该问题。 此技术通常可提高性能和减少内存的使用。

对象池参考：
https://github.com/egret-labs/egret-game-library/blob/master/src/game/ObjectPool.ts

### 释放内存

JavaScript中，GC在回收内存时，首先判断该对象是否被其他对象引用。在确定没有其他引用，GC在特定条件下进行回收。

* 删除对象的所有引用确保被垃圾回收器回收。
* 删除资源RES.destroyRes("")。
* 暂停清除计时器clearInterval()、clearTimeout()、Timer.stop()。

### 使用位图

位图的创建过程中，需要考虑时机，创建是一个消耗内存与CPU的过程。大量的位图创建会使你内存占用快速增长，导致性能下降，可以使用对象池优化创建销毁。

针对分辨率制作相关素材要比适配最大分辨率节省内存，并且减少由程序自适应带来性能下降。

宽高<2048*1024，这不是针对内存占用，但是它会影响兼容性。

### 文本

TextField减少对于描边的使用（stroke）。

TextField中使用cacheAsBitmap，可以减少重绘次数。

固定文字段落应当使用位图避免文字重绘产生开销。

### 事件模型与回调

Egret是基于事件模型的。这里主要指出事件模型值得注意的事项。

dispatchEvent()方法循环访问注册列表，并对各个注册的对象调用事件处理函数方法。以下代码说明过程：

    	//触发
        this.dispatchEvent(new egret.Event(egret.Event.ADDED_TO_STAGE));

        //监听
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.test, this)

在每次触发时，会实例化Event对象，这样会占用更多内存，当侦听 Event.ENTER_FRAME 事件时，将在各个帧上为事件处理函数创建一个Event对象。在捕获和冒泡阶段（如果显示列表很复杂，此成本会很高），显示对象的性能可能会特别低。
