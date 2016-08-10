## 极速模式简介

DragonBones 4.1 (后面简称DB)引入了一套极速模式，目的在于一定程度上解决DB在H5-canvas上的性能问题。

我们知道目前包括db在内的骨骼动画解决方案，普遍因为角色中需要绘制的图片比较多draw call比较高，在canvas上的性能都不是很理想。而对drawcall的优化技术上比较复杂，难度比较大，所以4.1中的极速模式是从另一个角度减少CPU的计算，来优化性能。

DB的骨骼动画能够支持非常细腻的动画补间和融合,同时这些功能也会在每帧消耗大量的CPU计算，极速模式在一定程度上削减了这些功能，一方面能够保留核心功能供90%的动画需求维持原有效果，另一方面能够减少一些不常用的功能所带来的不必要的性能消耗，同时为进一步优化性能的数据缓存铺平道路。

这是一个普通模式和极速模式的性能和功能对比表格:

|| 普通模式 | 极速模式 | 极速模式+数据缓存 |
| -- | -- | -- | -- |
| 性能对比 | 100% | 110% | 180% |
|动画间过渡| √| √| √|
|动画补间| √ |√| √|
|动态动画补间| √| √| ×|
|颜色变换| √| √| √|
|帧动画| √| √| √|
|动画变速| √| √| √|
|局部换肤| √| √| √|
|整体换肤| √| ×| ×|
|动态骨骼增加删除| √| ×| ×|
|动画部分播放| √| ×| ×|
|多动画融合| √| ×| ×|
|程序控制动画幅度| √ |×| ×|
|时间轴事件| √ |√ |√|

根据上表可以看出，使用极速模式的动画失去了大部分动态控制的功能。

另外因为极速模式的动画缓存在不同的同种骨架间是可以共用的，所以在这里官方建议，极速模式更适合游戏中会大量出现的，动画不是特别复杂的NPC角色。对于玩家控制的角色，如果使用到了任何极速模式不支持的特性，建议还是使用普通模式。

## 快速使用极速模式

DB给开发者提供了一套最简单的使用极速模式的方法，仅需两行代码的修改就能完成模式切换，并开启数据缓存（红色的部分就是需要改动的部分）

先看一下原先使用DragonBones需要写的代码：

```
this.factory = new dragonBones.EgretFactory();
this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData), "dragon");
this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData), "dragon");
var armature:dragonBones.Armature = this.factory.buildArmature("Dragon");
armature.animation.gotoAndPlay(“Walk”,0,-1,0);
this.addChild(armature.display);
```

再看一下使用极速模式的代码:

```
this.factory = new dragonBones.EgretFactory();
this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData), "dragon");
this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData), "dragon");
var armature:dragonBones.FastArmature = this.factory.buildFastArmature("Dragon"); //构建FastArmature
armature.enableAnimationCache(30);  //开启数据缓存，30代表采样帧频，推荐设置为12~30，达到性能和动画流畅度的最佳平衡点。
armature.animation.gotoAndPlay(“Walk”,0,-1,0);
this.addChild(armature.display);
```

## 极速模式详解

喜欢刨根问底的开发者，可能想知道这两行代码的背后隐藏了什么，下面就为您揭秘：

首先看第一句

```
this.factory.buildFastArmature("Dragon"); //构建FastArmature
```

可以很直白的告诉大家，这句的背后跟普通模式是一模一样的，就是根据AnimationData来为Armature构建骨骼和插槽，只不过这次返回的是FastArmature而不是Armautre。

FastArmature是跟Armature完全独立并列的两套体系，FastArmature里面使用的是FastBone，FastSlot。动画系统使用的是FastAnimation和FastAnimationState，时间轴使用的是FastBoneTimelineState，FastSlotTimelineState。所有的这些类都在dragonbones/fast这个文件夹里。

之所以这样设计就是希望在完全向下兼容的基础上实现一套功能简化版本的骨骼动画系统。 这套Fast骨骼动画体系在功能上和原始版本的区别就是之前表格列出来的区别。

其中最显著的就是Fast骨骼动画体系不再支持动画融合了，从代码上可以看到：

FastAnimation中包含的是FastAnimationState实例

```
public animationState:FastAnimationState = new FastAnimationState();
```

而Animation中包含的是animationStateList，一个数组。

```
private _animationStateList:Array<AnimationState>;
```

这个区别所带来的动画上的效果的不同有如下两点：

1. 极速模式不支持动画融合

因为FastAnimation中只包含一个FastAnimationState实例，也就是说任何时间，同一时间一个角色只会播放一个动画。一个动画的开始就意味着之前一个动画的结束。

而普通模式的Animation中，一个角色是可以同时播放多个动画的，也就是动画融合功能。例如一个奔跑的角色被子弹打中身体后仰。就可以通过让这个角色同时播放奔跑和后仰两个动作来实现，这样当这个角色站立时中弹和下蹲时中弹，都可以用类似的方式实现，而不需要动画设计师额外设计动画。这个功能在极速模式中已经不再支持了。 

2. 动画过渡原理和效果发生变化

普通模式的动画过渡是通过动画融合来实现的，也就是说例如角色要从播放动作A过渡到播放动作B，那Animation要做的就是控制动作A淡出同时动作B淡入，在A淡出B淡入的这段时间里，实际上角色在同时播放动作A和动作B (动画融合)，通过对A和B权重（weight）的控制调节（A的权重从1降为0，B的权重从0升为1），实现从A到B的过渡。

极速模式因为不支持动画融合，所以动画过渡是通过当前形态和即将播放动作的第一帧的形态做线性补间实现的，效果上会比普通模式的略显生硬。不过话说回来，很多游戏中的动画都是不需要动画过渡这个功能的，所以这个变动对这些游戏几乎没有影响。

极速模式舍弃动画融合这个功能，最主要的目的其实是为实现数据缓存这个功能铺平道路。之前说过，极速模式是通过减少CPU计算实现性能提升的，那么减少CPU计算的极致就是把计算结果缓存下来。

----

下面看看极速模式是如何生成并使用数据缓存的：

在db源代码中有个叫cache的文件夹里面包含所有的好数据缓存有关的类。其中最重要的就是AnimationCacheManager和AnimationCache这两个类。AnimationCacheManager是使用数据缓存的入口，也是AnimationCache的管理器。AnimationCache负责对某个特定的动画进行缓存。


![](56c315065bd6b.png)

下面这段代码是FastArmature的enableAnimationCache 方法，里面对AnimationCacheManager做了全套操作，实现对当前骨架生成缓存。

```
/**
 * 开启动画缓存
 * @param  {number} 帧速率，每秒缓存多少次数据，越大越流畅,若值小于零会被设置为动画数据中的默认帧率
 * @param  {Array<any>} 需要缓存的动画列表，如果为null，则全部动画都缓存
 * @param  {boolean} 动画是否是循环动画，仅在3.0以下的数据格式使用，如果动画不是循环动画请设置为false，默认为true。
 * @return {AnimationCacheManager}  返回缓存管理器，可以绑定到其他armature以减少内存
 */
public enableAnimationCache(frameRate:number, animationList:Array<any> = null, loop:boolean = true):AnimationCacheManager{
   var animationCacheManager:AnimationCacheManager = AnimationCacheManager.initWithArmatureData(this.armatureData,frameRate);
   if(animationList){
      var length:number = animationList.length;
      for(var i:number = 0;i < length;i++){
         var animationName:string = animationList[i];
         animationCacheManager.initAnimationCache(animationName);
      }
   }
   else{
      animationCacheManager.initAllAnimationCache();
   }
   animationCacheManager.setCacheGeneratorArmature(this);
   animationCacheManager.generateAllAnimationCache(loop);
   
   animationCacheManager.bindCacheUserArmature(this);
   this.enableCache = true;
   return animationCacheManager;
}
```

这段代码中最重要的几个操作如下：

```
animationCacheManager.initAnimationCache(animationName);//初始化动画缓存
animationCacheManager.setCacheGeneratorArmature(this);//设置缓存生成器
animationCacheManager.generateAllAnimationCache(loop);//生成缓存
animationCacheManager.bindCacheUserArmature(this);//绑定缓存使用者
```

从中可以看到AnimationCacheManager的工作原理分为一下4步：

1. 初始化动画缓存

2. 设置缓存生成器

3. 生成缓存

4. 绑定缓存使用者

进行完这四步之后，当一个FastArmature播放的时候，就会自动从动画缓存中拿数据了。

需要注意的是这段代码中用到的几个参数

1. frameRate 帧频。

这里的帧频代表的是动画的缓存采样帧频。帧频越高，动画越平滑，初始化速度越慢，播放速度也越慢。帧频越低，动画越不平滑，初始化速度越快，播放速度也越快。

一般来说这里的帧频设置为12~30是比较合适的，如果超过30，即便游戏达到了这个帧率，人眼也分辨不太出来。低于12的话会有明显的卡顿感。

2. animationList 动画列表

这个参数代表希望缓存的动画列表。你可以根据游戏的需要，将一部分动画缓存，另一部分不缓存（实时计算）

3. loop 是否循环播放

这个参数代表动画在缓存采样时，采用循环播放的方式还是只播放1次。是否循环的区别在于从动画的最后一帧到第一帧是否有补间产生。这里建议根据角色动画的需要，需要循环播放的动画就循环采样，只需要播放一次的动画，就不循环采样。


深入使用数据缓存

FastArmature的enableAnimationCache 方法给开发者提供了快速开启缓存的方法，操作简单但不够灵活。如果开发者希望灵活的使用数据缓存，就需要直接操作AnimationCacheManager了。

下面介绍几种需要直接操作AnimationCacheManager的情况：

1. 游戏中大量相同的角色，可以复用同一个AnimationCacheManager

很多游戏中都会有大量的NPC角色，这些角色的特点是数量多，重复，并且动作相对简单。这种类型的角色是最适合用极速模式的。对于这类角色，我们可以使用同一个AnimationCacheManager，设置一个缓存生成器，其他的都作为绑定的缓存使用者，这样能够大幅提高效率。

```
animationCacheManager.setCacheGeneratorArmature(a1);
animationCacheManager.generateAllAnimationCache();
animationCacheManager.bindCacheUserArmatures([a1,a2,a3,a4,a5]);
```

2. 游戏初始化一下生成所有动画缓存太卡，可以分角色分动画逐个生成。

一般来说，游戏在初始化的时候要初始化大量的角色，如果一上来就生成所有动画的缓存可能会产生比较明显的卡顿效果。这时您可以采用分步加载的策略，为角色一个动作一个动作的的生成缓存数据。

```
animationCacheManager.generateAnimationCache(animationName);
```    
