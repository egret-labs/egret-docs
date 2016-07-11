![](55a87cf7c1126.jpg)

2.0最终版是对2.0 RC1 和 RC2的进一步强化和稳定。本文汇总了这些新特性，并在最后对随同引擎发布的 Android Support 和 iOS Support 所带来的新变化做了扼要汇总。

### 增量编译

增量编译是用于开发调试迭代过程中实现零等待编译。即只编译修改或者新增的ts类源代码。

### 用法

增量编译的用法是：

```
egret quickbuild
```

增量编译使用与原先的标准编译(`egret build`)不同的两种编译方法，无法完全取代标准编译。
而且标准编译所支持的引擎编译、指定运行时等选项增量编译均不支持。

### 最佳实践

实际开发中最佳的开发流程是：

* 新导入项目或进行第三方模块配置后，用标准编译方法进行引擎编译(egret build -e)

* 开发调试迭代过程，进行增量编译(egret quickbuild)

* 发布项目(egret publish)前，再进行一次标准编译(egret build)

* 需要指定参数的编译方式也同样使用标准编译(如egret bulid -runtime native)

### 注意

需要注意的一点，就是增量编译的分析过程与标准编译不同，标准编译会分析每个ts类源代码中对其他ts类的引用，从文档类开始分析，因此项目中没有用到的类标准编译会忽略。
而增量编译完全忽略源代码ts类之间的引用关系，直接进行扁平式编译。

### 自动脏矩形

脏矩形只重绘屏幕发生改变的区域，这在Egret 1.5时代已经实现，但旧版脏矩形需要手(ren)工(rou)设置，对于复杂的游戏来说，用脏矩形优化过程无异于一场噩梦。
白鹭官方已经对这部分进行了大刀阔斧的改进，实现了自动脏矩形。
熟悉Flash的朋友都知道，这项技术已经在提升Flash Player性能上取得了巨大成功。今天白鹭的产品再次将其应用到旗舰产品Egret和Lark上。脏矩形的工作方式如下图所示：

![](http://city-10.com/assets/egret-2-0-rc-2-what-s-new/egret-frameRate-2+1inter.jpg)

红框封闭的区域是脏矩形，也就是说引擎运行时只需要渲染这部分。
自动脏矩形，不但可以极大的提高渲染性能，还能尽可能的节省设备电量。另外，当检测到屏幕刷新面积已经到临界点(大约占舞台面积95%)时，直接进入全屏刷新模式，因为这种情况脏矩形已经无法改善渲染性能了。

注意，由于加入该项功能对Egret内核有大规模的改动，稳定性有待进一步验证。因此并没有在目前的发布版本以一键安装方式提供，以防止产品级开发出现意外的问题。白鹭官方考虑到让广大喜欢尝鲜的开发者来体验，在github上提供了专门的[渲染架构体验分支][https://github.com/egret-labs/egret-core/tree/dirty]。

### 动态帧频

由于官方推荐保持60fps，2.0 RC2之前漫长的时期，设定帧频还需要用一种类似hack的方法(具体官方FAQ有说明)。
在2.0 RC2版本，frameRate 再度回归！通过在程序中可以访问stage的位置使用stage.frameRate 即可以直接设置帧频，并且可以随时改变。
目前的版本帧频设置有个限制，只能设置被60整除的帧频，其他数值将会被直接忽略。

### 创建JS项目

广大JS资深开发者期盼的JS创建项目的方式，其实在RC1已经提供，但有些小bug，在Egret 2.0 RC2开始已经在不同的操作系统可正常使用。
创建项目使用：

`egret create_js HelloJS`

启动项目使用：

`egret startserver HelloJS`

在项目创建时，我们提供了`egret.js`和`egret.min.js`，开发者只需在发布时将`egret.js`切换为`egret.min.js`即可。
坚持使用JS而不刁TS的开发者必然是资深玩家(官方仍然建议，开发Egret首选标准的TS语言)，因此暂无太多说明，后期白鹭官方会根据开发者反映，推出相应的详细教程。

### 其他较小改动

其余功能都是较小的改动，在这里简要说明。

### 几何运算模块增强

`Matrix`增加了`createBox`和`createGradientBox`等一系列API。
其中使用`createBox`方法可以直接定义生成的矩阵的缩放、旋转和平移效果。
`Point`增加了`interpolate`和`normalize`等高级方法。
`Rectangle`也增加了`union`、`intersection`等更丰富的操作。

### DragonBones事件派发机制

之前的DragonBones采用自身独立的一套事件机制，从这个版本起，已经跟Egret内核统一，使用Egret内核提供的事件机制。
比如侦听Armature的事件，在升级到2.0 RC2之后需要添加第三个作用域参数(通常是`this`)。

```
var factory = new dragonBones.EgretFactory();
var armature = factory.buildArmature("warrior");
armature.addEventListener( dragonBones.ArmatureEvent.Z_ORDER_UPDATED
 , this.zUpdateHandler
 , this  );
```

### 新增纹理释放功能，通过RES.destroyRes可以释放掉纹理

对于移动游戏来说，内存是寸M寸金，内存占用过大导致出现的各种问题，一直是一些中重度游戏花费精力解决及优化的问题，Egret2.0已经针对该问题加入了释放纹理的重磅功能，让开发者可以根据游戏进程及时释放不相关的资源，从本质上提高了游戏开发过程中对资源的掌控能力。
这里用一个简单的例子表明如何使用该功能。
加入有一个包含城堡资源的资源组名为castle，其载入代码为：

```
RES.loadGroup( "castle" );
```

则在该组资源不再需要的时候，可以释放掉：

```
RES.destroyRes( "castle" );
```

### 修复IOS纹理过多导致帧频下降问题

在Egret2.0之前，在iOS机型中，由于其本身对纹理的处理方式有较多限制，当使用较大量的纹理就会产生严重的帧数下降，在Egret2.0版本，官方团队已经对这个问题做了专门处理，情况得到明显改善。

### 更好的音乐支持，提升不同浏览器/App的兼容性

Egret2.0版本内核针对不同平台进行兼容性升级，其中对iOS系统使用先进的WebAudio来实现，Android系统上已经对以往出现的音乐设置循环无法生效的问题进行了修复。当然，我们开发者使用时不必关心这些是怎么实现的，因为API是完全一致的。
播放音乐重复，只需要在play设置参数为true即可：

```
var sound:egret.Sound = RES.getRes("sound");
sound.play( true );
```

另外新增了播放完成事件，以触发可能需要的游戏逻辑。用法如下：

```
var sound:egret.Sound = RES.getRes("sound");
sound.addEventListener( egret.SoundEvent.SOUND_COMPLETE, function(){    
        console.log( "play completed!" );
    }, this );
sound.play();
```

### native支持Graphics绘图

之前版本的Graphics绘图功能在H5版本和Native/Runtime版本存在较大差别，H5上的功能比较完整，Native/Runtime版本则没有完全实现绘线等功能。 Egret2.0彻底解决了这一问题。这些功能在打包或接入Runtim后都可以使用了：

```
var shape:egret.Shape = new egret.Shape;

shape.graphics.beginFill(0x00ff00);
shape.graphics.drawCircle( 100, 100, 30);
shape.graphics.endFill();

shape.graphics.beginFill(0x00ff00);
shape.graphics.drawEllipse( 100, 200, 80, 60 );
shape.graphics.endFill();

this._container.addChild( shape );
```

编译运行，则会显示两个上下排列的圆形和椭圆形。

### 全新的热更新机制

Android和iOS中的热更新的使用方法跟之前差别不大，具体可以进行比较：Egret2.0热更新 旧版本热更新。但是对热更新中使用的zip包的格式已经进行了优化，除对配置文件信息合并外，还提供了资源保护方面的措施——将资源文件名称混淆，对于大量资源的游戏提供了一定的保护功能。

### DragonBones支持4.0数据格式

随Egret2.0同时发布的还有白鹭的重磅产品DragonBones4.0(以下简称DB4)，该版本已经完全脱离Flash，成为完全独立的骨骼动画编辑器。并兼容之前用Flash开发的内容。到这里更深入了解DB4
DB4中的数据格式较之前有较大变化。
主要特点：

增加了相对坐标的概念，会较大幅度减少数据文件的体积。

将Slot从Skin中分离，使得同一个Slot可以在不同的Skin中复用。通俗一些说就是可以将某张图片复用与不同的皮肤。

区分Bone时间轴和Slot时间轴，可以对动画从平移旋转缩放和颜色两方面同时进行控制。
具体看DragonBones 4.0 格式说明，也有专门文档详述这些变化
数据导入快速指南：之前的数据格式为3.0，在DB4安装目录中有一个other目录，其中包含最后一版的designpanel，安装该版本designpanel，导出数据(不包含swf的格式均可)，在DB4都可以直接导入。

### 减少gui模块发布体积

gui模块包含相当全面的组件，但我们的游戏或应用中可能只用到很简单的gui功能，换言之，只用到某些gui组件，比如一个按钮，一个CheckBox，如果发布时包含全部组件无疑其他组件都是浪费空间。Egret2.0已经做到了这一点，只发布程序中调用到的组件。从而大幅度减少了发布体积。

### 提升引擎及第三方库编译速度

对于较大的项目，编译速度无疑是开发者捉急的地方。Egret2.0已经从底层全面提升了便以速度，比如引擎代码由之前的分开的js文件集成到一个集中的js文件。概括来说同样的项目编译时间减少到了原来的40%。

### 数据统计 DataEyeSDK

通过对用户行为诸如留存、付费等数据的精确分析，我们可以对玩家的实际体验以及游戏的市场情况有及时全面的了解，进而针对性的改进游戏的各个方面功能。
新集成的DataEyeSDK通过追踪玩家之间的分享行为对游戏在各个渠道的传播效果进行评估。
这里有更具体的介绍以及接入教程： [Egret项目中使用DataEye SDK][https://github.com/DataEye/dcagent_for_h5]

### Android Support 2.0.2 版本改进说明

Android Support的这次版本升级对底层进行了大量的优化，并解决了以往版本一些遗留问题。

### 底层优化

这些优化涵盖了：网络模块、触摸模块、资源管理、改进数学库、JNI及相关的生命周期管理、图形绘制性能增强、RenderTexture的显存占用优化、渲染性能增强等等。上述这些功能都是在 Support 底层的增强，使用上并没有什么变化，但是已经从各方面增强了性能和稳定性。

### 文本相关改进

之前版本被广泛诟病的Android 5.0+系统上的文字显示问题已经完整修复。并且文本输入框完全达到原生的使用体验，可以移动光标了，也可以复制粘贴了！

### ETC格式支持

ETC是专门针对Android显存进行优化的图像存储格式，在本版本已经完全支持，不过使用上目前还有VIP限制，就是官方会给已经达成合作的CP提供使用接口.

### iOS Support 2.0 版本改进说明

iOS Support的这次版本升级解决了一些更核心的问题。

### 支持WebSocket 二进制流传输

这其实就是对WebSocket在H5本身是支持二进制传输的，但是之前的iOS Support还不支持二进制，这个版本已经支持了。

### 支持从web地址启动游戏

通过 iOS Support 加载游戏有三种方式，分别是本地游戏目录；web地址直接指定游戏zip包或游戏加载配置json文件；还有一种仍然是本地，以zip包方式提供。

```
- (void)setLoaderUrl:(int)mode {
    switch (mode) {
        case 2:
            // 接入模式2：调试模式，直接使用本地游戏
            options[@OPTION_LOADER_URL] = @"";
            options[@OPTION_UPDATE_URL] = @"";
            break;
        case 1:
            // 接入模式2a: 发布模式，使用指定URL的zip
            options[@OPTION_LOADER_URL] = @"http://www.yourhost.com/game_code.zip";
            options[@OPTION_UPDATE_URL] = @"http://www.yourhost.com/update_url/";

            // 接入模式2b: 发布模式，使用指定的服务器脚本，返回的json参见项目中的egret.json
            // options[@OPTION_LOADER_URL] = @"http://www.yourhost.com/egret.json";
            break;
        default:
            // 接入模式0：发布模式，使用本地zip发布，推荐
            options[@OPTION_LOADER_URL] = EGRET_PUBLISH_ZIP;
            break;
    }
}
```

如iOS Support 默认项目中的代码所示， case 1 即为设置一个web地址，将游戏发布到改地址，然后进行加载。这种方式真正意义上实现了游戏的热更新。

### 支持localStorage

localStorage是H5环境的一个标准，虽然API很简单，但对于存取少量数据的场合如游戏配置无疑是最佳选择，这个版本的iOS Support也已经支持这个功能了！