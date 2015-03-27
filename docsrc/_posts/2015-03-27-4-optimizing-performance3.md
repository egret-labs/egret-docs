---
layout: post
title:  "第三章： CPU优化"
permalink:  post/manual/optimizing/performance3.html
type: manual
element: optimizing
version: Egret引擎 v1.6.1
---


### 触控交互

禁用不必要显示对象的触摸交互。

使用交互对象（例如MovieClip或Sprite对象）时，尤其是屏幕上显示许多交互对象，当他们重叠时，检测触摸交互可能会占用大量的CPU资源。避免这种情况的一种简便方法是对不需要任何交互的对象禁用交互行为。以下代码说明禁用触摸交互：

        var sp: egret.Sprite = new egret.Sprite();
        this.addChild(sp);
        sp.touchChildren = false; //确定子孙是否接受触摸事件，默认true
        sp.touchEnabled = false; //此对象是否接受触摸事件，默认true

还有一种方式禁用对象的touchEnabled，父容器创建如遮罩容器并侦听点击事件，寻找对象坐标标点

![]({{site.baseurl}}/assets/img-optimzing-performance/performance3-1.png)

例如：上图需要判断点击哪个滑块的需求，实现方式是在滑块上创建Bitmap阻止点击事件深入冒泡，再通过Bitmap上的点击坐标来计算出具体点击的哪个方块。

重写Tuoch_Move事件来提高游戏的性能，交互的一般实现是遍历Stage所有对象进行hitTest,某些对象不是必要操作的，例如：飞机中主角外其他对象。下面介绍一个简单重写：

egret.MainContext.instance.touchContext.onTouchMove = function():void
{

      //逻辑处理

}

### TypeScript

由于TypeScript最终会被编译为JavaScript，而JavaScript是一种解释型语言，执行速度要比编译型语言慢得多，随着作用域中的作用域数量的增加，访问当前作用域以外的变量的时间也在增加。所以，访问全局变量总是比访问局部变量要慢，因为需要遍历作用域链。只要能减少花费在作用域链上的时间，就能增加脚本的整体性能，对于写法的技巧非常重要，下面是一些简单常用技巧。

* 类方法中，将this赋值给另外一个临时变量，如self，再用self进行提高1/3的效率。

    测试：https://github.com/xinfangke/egretDocsTest/blob/master/test3.ts

* 在循环中，尝试改进写法,减少读取次数：for(var i = 0, length = array.length; i < length; ++i)。

    测试：https://github.com/xinfangke/egretDocsTest/blob/master/test4.ts

* 避免双重解释，如eval函数，会使JavaScript创建解析器，产生额外的性能消耗。

    ![]({{site.baseurl}}/assets/img-optimzing-performance/performance3-2.png)

* 推荐使用正则表达式处理字符串遍历。

* 避免使用[“property”]访问对象属性，改为Object.property。

* 创建对象var obj:object={“key”:”value”} > var obj:Object={} > new Object()。

* 字符串类型转换("" +) > String() > .toString() > new String()。

* 类声明属性不宜过多(<64)，少继承，多引用。

  测试（V8）：https://github.com/xinfangke/egretDocsTest/blob/master/test6.ts

* 代码中Getter ，Setter ，Try-catch会使性能下降。

* 请保持数组中类型的一致。

### 计时器与enterFrame事件

显示停止定时器，移除enterFrame侦听。

将程序中Timer对象与 enterFrame注册数量降至最少，事件中尽量减少对显示对象外观的更改。

每帧在运行时将为显示列表中的每个显示对象调度一次enterFrame事件。虽然你可以给很多显示对象在内部注册enterFrame事件，但这样做将使每帧执行更多代码，如果超出处理范围，程序会出现卡顿。 可以考虑使用一个集中的enterFrame处理函数，通过集中同类代码，更容易管理所有频繁运行的代码。

如果使用Timer对象，也将产生与多个Timer对象创建与调度事件相关的开销。减少或合理设置触发时间，对于性能提升很有帮助。停止未使用的Timer。

### 后台对象

移除显示列表中的对象，而不是visible=false, 对象仍在父级显示列表，某些功能依然在遍历这个列表。

避免一些后台对象参与逻辑，例如一些已经移出显示列的对象，是否需要碰撞检测，距离运算等。

适当延长检测时间，例如：碰撞间隔，非需要特别精确的时候使用简单的矩形碰撞。

### 动画

对于简单的动画，序列帧的性能更佳。

使用StalingSwf制作动画时，导出文件之前删除合并fla中多余帧，可以减少Json体积。

处理动画移动，使用帧时间差计算而不要使用帧率，不要相信帧率，它在各种环境中是不稳定的。