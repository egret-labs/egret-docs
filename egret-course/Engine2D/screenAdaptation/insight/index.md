##概述
测试Egret环境： Egret 1.5.0，Firefox浏览器。

>本文适用于 Egret 2.5 之前的引擎版本。

根据不同的项目需求，可能需要不同的屏幕适配策略。本文将用一个简单的例子对不同的适配模式进行逐一测试。

为了简化问题，并且便于理解，我们用一个简单的用例来测试： 载入一张560*560的图片castle-560.jpg。该图原始显示效果：

![](5566955f18e8d.jpg)

图1 测试原图

其中加入正方形网格，是为了便于检查其在不同适配模式的宽高比例是否能保持，或者说比例失真。

##测试准备工作
新建Egret项目，在其launcher/egret_loader.js中，我们修改设计尺寸为560*560：

```
egret.StageDelegate.getInstance().setDesignSize( 560, 560 );
```

写简单的程序，载入castle-560.jpg，并以原始大小直接显示。最下边铺一个纯色背景，用以在图片未达到的区域显示舞台区域：

```
var shp:egret.Shape = new egret.Shape;
shp.graphics.lineStyle( 0, 0x00ffff );
shp.graphics.beginFill( 0x336699 );
shp.graphics.drawRoundRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight, 3, 3 );
shp.graphics.endFill();
this.addChild( shp );

var bg:egret.Bitmap = new egret.Bitmap( Res.getRes( "castle" ) );
this.addChild( bg );
```

这些都准备好，测试能够正常显示后，进行不同适配模式的测试。为测试不同适配模式，在launcher/egret_loader.js中，调整context.stage.scaleMode即可。

```
//var scaleMode =  egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ? egret.StageScaleMode.SHOW_ALL : egret.StageScaleMode.NO_SCALE;
var scaleMode = egret.StageScaleMode.EXACT_FIT;
context.stage.scaleMode = scaleMode;
```

为了对比不同适配模式下的Egret舞台区域和浏览器内的显示区域，我们加入一些调试代码。在index.html中的Egret元素div后边，增加一个用于调试的显示元素#info。


	<div style="position:relative;" id="gameDiv"></div>
	<div>
	    <span id="info"></span>
	</div>


在index.html的head内增加代码，在该div内显示浏览器的显示区域：


	<script type="application/javascript">
     window.onload = function(){
         document.getElementById("info").innerHTML = "浏览器可视区域：" + document.body.clientWidth + "," + document.body.clientHeight; 
     }
	</script>

为了正确显示#info，可能需要设置一些CSS样式，由于这不是本文重点，就不详述了。

在Egret程序里也要增加调试代码，显示实际的舞台尺寸，以及当前缩放模型：

```
var tx:egret.TextField = new egret.TextField;
tx.x = 20;
tx.y = 80;
tx.fontFamily = "微软雅黑";
tx.textColor = 0;
tx.text = "舞台宽高：" + this.stage.stageWidth + "," + this.stage.stageHeight
    +"n缩放模型：" + this.stage.scaleMode;
this.addChild( tx );
```

代码方面准备工作完成后，测试项目可以正常编译，并运行显示。然后我们在作为测试运行的Firefox中，打开响应式设计模式：

![](5566955f20766.jpg)

设置自定义分辨率为320 * 504，这是由于iPhone5的默认浏览器显示区域为320 *504：

![](5566955f21453.jpg)

注意，移动设备浏览器窗口内的显示区域像素，不同于实际的设备像素概念，我们称为响应像素。

基本都准备好了，然后我们对几种适配模式逐一测试。

##EXACT_FIT适配模式
在launcher/egret_loader.js中，修改context.stage.scaleMode为EXACT_FIT：

```
var scaleMode = egret.StageScaleMode.EXACT_FIT;
context.stage.scaleMode = scaleMode;
```

EXACT_FIT适配模式效果：

![](5566955f23279.png)

这种适配模式的自解释已经比较清楚了：精确适应，就是宽高尺寸精确适应浏览器可视区域。

该适配模式原理图解：

![](5566955f24d39.jpg)

舞台本身的大小(即Egret Canvas)是我们的设计尺寸，然后，EXACT_FIT适配模式会把舞台按照浏览器可视区域来进行缩放。即把宽度缩放到320响应像素。高度缩放到504响应像素。

很显然，这种适配模式完全没有可控性，大部分实际的成品游戏，或动态宣传海报，为了完整的视觉体验。都不会允许宽高比例失真的情况。所以，这种适配模式实际采用很少。

从易用性来看，EXACT_FIT适配模式也许可以得到较高星，但我们做项目始终要以产品为导向。那么，从产品角度来看EXACT_FIT适配模式推荐指数：★☆☆☆☆。
如果产品阶段不需要该模式，那么调试阶段也同样不需要。

##NO_SCALE适配模式：
在launcher/egret_loader.js中，修改context.stage.scaleMode为NO_SCALE：

```
var scaleMode = egret.StageScaleMode. NO_SCALE;
context.stage.scaleMode = scaleMode;
```

NO_SCALE适配模式的显示效果：

![](5566955f2fcbf.png)

该适配模式的自解释也很了然：没有任何缩放。是比EXACT_FIT更简单粗暴的缩放模式。也可以说是没有缩放的缩放模式！因为该模式直接用设计尺寸创建舞台，然后直接将舞台对齐浏览器可视区域的左上角。

NO_SCALE模式原理图解：

![](5566955f3415e.jpg)

没错，只是比EXACT_FIT模式少一个步骤，因此该模式在显示不完整的同时，保持了一个优点：不但显示宽高比没有失真，而且是原始的1:1！

很显然，该模式的产品适用性为零。但是在调试阶段，我们可能需要这种模式来预览游戏的显示最佳效果。因此，这里多给出调试阶段适用指数：★★★★☆。

从另外一个角度来看，NO_SCALE模式的适配结果只是一个半成品，因为还有一部分Canvas区域暴露在浏览器可视区域之外！

那么，从产品角度来看NO_SCALE适配模式推荐指数：☆☆☆☆☆！

##SHOW_ALL适配模式：
在launcher/egret_loader.js中，修改context.stage.scaleMode为SHOW_ALL：

```
var scaleMode = egret.StageScaleMode.SHOW_ALL;
context.stage.scaleMode = scaleMode;
```

SHOW_ALL适配模式的显示效果：

![](5566955f3bc53.png)

SHOW_ALL模式原理图解：

![](5566955f451dd.jpg)

该适配模式的原理可能是这几种适配模式中最复杂的了，但也是最常用的！

如果你已经开发过几款Egret的H5游戏或应用，那这可能是你最熟悉的模式，因为目前主流的移动设备屏幕宽高比，都不会有太大差别。相关的，浏览器可视区域的宽高比也不会有太大差别。所以，指定一个设计宽高尺寸，就可以在大部分移动设备有相接近的体验。

所谓想接近的体验，那就是如果可视区域宽高比不跟设计宽高比完全一致，那么就会在第2步居中计算时，在居中方向两边留下黑边。

前两种适配模式的产品价值都几乎为零，到这里终于算是一种产品适用的适配模式了。但是由于黑边问题的存在，我们还不能给这款适配模式满分。那么，从产品角度来看SHOW_ALL适配模式推荐指数：★★★★☆。

##NO_BORDER适配模式：
在launcher/egret_loader.js中，修改context.stage.scaleMode为NO_BORDER：

```
var scaleMode = egret.StageScaleMode.NO_BORDER;
context.stage.scaleMode = scaleMode;
```

NO_BORDER适配模式的显示效果：

![](5566955f4ce1b.png)

这种适配模式可能是几种适配模式中最令人困惑的，但实际上也是给用户相当大的自由度的一种模式。先给出原理图解：

![](5566955f54baa.jpg)

实际上，该适配模式只参考了设计尺寸(design size)的宽度，我们给出的设计宽度是560。然后引擎根据浏览器可视区域的宽高比，计算出适配高度，使得适配宽高比与浏览器可视区域宽高比保持一致。

这样引擎根据设计宽度和计算得到的适配高度创建Egret舞台(或Canvas)，跟浏览器可视区域宽高比一致，那么缩放到浏览器可视区域，舞台中的内容大小会变化，但是宽高比会保持。

与EXACT_FIT适配模式相比，NO_BORDER的共同点是：从视觉效果上，两种模式的Canvas都会进行相应的缩放，以恰好占满浏览器可视区域。但NO_BORDER为保持内容的宽高比例不失真，使用了一种更智能的方式。

对于制作精良的游戏，保持宽高比不失真和占满所有可用的屏幕区域都是必要的。他们不能容忍为了保持一定的宽高比例不失真却又产生黑边(后边会提到)的情况，即鱼与熊掌要兼得，那么NO_BORDER适配模式可能是其最佳选择！

那么，从产品质量来看NO_BORDER适配模式推荐指数： ★★★★★。

但是在这种模式下，你可能要花更多精力，来维护UI动态布局和显示内容的完整性。

##总结
最后，来一个简明的总结是必要的：

![](5566955f55a0c.jpg)

对于大部分开发来说，黑边并不是很大的问题， 而且开发过程，你不需要考虑不同设备可视区域的适配。对于黑边敏感的要求比较高的产品，NO_BORDER是最佳选择。