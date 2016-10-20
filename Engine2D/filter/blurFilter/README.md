
Egret 3.1.0 提供 WebGL 渲染下的模糊滤镜。
Egret 3.1.8 支持 canvas 模式下的模糊滤镜。

## 设置
在 Egret 中使用模糊滤镜也比较简单，通过 BlurFilter 类来设置模糊滤镜。

```
var hero:egret.Bitmap = new egret.Bitmap();
hero.texture = RES.getRes("hero_png");
this.addChild(hero);

var blurFliter = new egret.BlurFilter( 1 , 1);
hero.filters = [blurFliter];
```

和颜色转换矩阵类似，实例化一个 BlurFilter 并将其保存到显示对象的 filters 属性中即可。其中示例化 BlurFilter 有两个参数，即为 x 、y 方向的模糊度。 
值越大效果越模糊。

## 效果
![](5739826314d12.png)

> 需要注意的是模糊滤镜对性能的消耗比较大，应谨慎使用。普通显示对象可以开启 cacheAsBitmap 提高一些性能。

> 显示对象的 filters 属性可以保存多个滤镜效果，比如同时使用` hero.filters = [blurFliter,colorFlilter];` 模糊和颜色矩阵滤镜效果。多个效果同时生效。


