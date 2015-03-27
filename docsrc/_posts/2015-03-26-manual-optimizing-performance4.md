---
layout: post
title:  "简介" 
permalink:  post/manual/optimizing/performance4.html
type: manual
element: optimizing
version: Egret引擎 v1.6.1
---
 
# 第四章：重绘优化

### 渲染对象

![]({{site.baseurl}}/assets/img-optimzing-performance/performance4-1.png)  

要改进渲染，务必考虑显示列表的嵌套。每个显示对象都是独立，当对象放入显示列表后参与整个渲染过程。

绘制过程：由内而外 spr-> 文档类 -> 舞台。

Egret提供了更加高级的API优化性能，可以通过制定重绘矩形范围，来优化程序。

例如：

    var area:egret.Rectangle = new egret.Rectangle(0, 0, 200, 200);
    egret.RenderFilter.getInstance().addDrawArea(area);

通过上述代码指定屏幕左上角200区域为重绘区域（脏矩形）。

### 显示优化

涉及频繁在Stage添加移除对象并且不关心ADDED_TO_STAGE与REMOVED_FROM_STAGE事件时，可以进行addChild和removeChild优化，减少逻辑判定。

示例：https://github.com/xinfangke/egretDocsTest/blob/master/test5.ts

### Alpha混合

使用 alpha 属性时避免使用要求 alpha 混合的效果，例如淡化效果。当显示对象使用 alpha 值混合处理时，运行时必须将每个堆叠显示对象的颜色值与背景色混合起来，以确定最终颜色。因此，alpha 值混合处理可能比绘制不透明颜色占用更多的处理器资源。这种额外的计算可能影响慢速设备上的性能。尽可能避免使用 alpha 属性。

### 帧频速率

稳定的帧率是游戏性能最重要的表现。

使用egret.callLater，egret.setTimeout自定义分帧管理器等来实现功能的分帧、延时处理。

例如：切换界面时，界面显示与数据填充进行一个分帧或者延时处理来保证UI切换时的流畅度。
例如：当同一帧创建多个显示对象时，可进行分帧处理，保证帧率稳定。

侦听休眠与激活状态改变帧率与动画:

    egret.MainContext.instance.stage.addEventListener(egret.Event.ACTIVATE,this.f,this);
    egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE,this.f,this);

休眠中停止动画与呈现相关内容，在程序被激活时重新启动。

### 位图缓存

在适当的时候对多位图容器使用位图缓存功能。

选择cacheAsBitmap可实现良好的优化。此功能对渐变、多段落文字、多位图、9宫图等有显著提高呈现的性能，但是需要占用大量内存。

当显示对象内部是实时改变的，启动位图缓存你可能获得相反的效果。当每帧运行时必须更新缓存位图，然后屏幕重绘该位图，这一过程需要消耗许多CPU。仅当缓存的位图可以一次生成，且随后无需更新时，适合使用位图缓存功能。

对Sprite 显示对象开启位图缓存后，缩放、移动、修改x,y属性不会导致重新生成，但是修改Sprite内部子项将会导致重新生成缓存。

下例代码中创建了60个位图，并且有序的排列。将60个Bitmap放到一个Sprite中。运行后看到的效果如下：

    private context:egret.Sprite = new egret.Sprite();
    private createGameScene(): void
    {
        egret.Profiler.getInstance().run();
        for( var i:number=0; i<12;i++ )
        {
            for(var t:number=0;t<5;t++)
            {
                var bit:egret.Bitmap = new egret.Bitmap();
                bit.texture = RES.getRes("image_png");
                bit.x = 75*t+41*(i%2);
                bit.y = 48*i;
                bit.scaleX = 0.5;
                bit.scaleY = 0.5;
                this.context.addChild(bit);
            }
        }
        this.addChild(this.context);
    }

![]({{site.baseurl}}/assets/img-optimzing-performance/performance4-2.png) 

当前draw的数量为60，每帧执行60次draw操作。

将代码简单的修改一下：

    private context:egret.Sprite = new egret.Sprite();
    private createGameScene(): void 
    {
        egret.Profiler.getInstance().run();
        for( var i:number=0; i<12;i++ )
        {
            for(var t:number=0;t<5;t++)
            {
                var bit:egret.Bitmap = new egret.Bitmap();
                bit.texture = RES.getRes("image_png");
                bit.x = 75*t+41*(i%2);
                bit.y = 48*i;
                bit.scaleX = 0.5;
                bit.scaleY = 0.5;
                this.context.addChild(bit);
            }
        }
        this.addChild(this.context);
        this.context.cacheAsBitmap = true;
    }

运行效果：

![]({{site.baseurl}}/assets/img-optimzing-performance/performance4-3.png) 

此时，我们的draw重绘为1，合理的使用位图缓存，可以极大程度提高渲染性能。


