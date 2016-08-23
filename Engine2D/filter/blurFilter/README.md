在 Egret Engine 3.1.0 开始提供 WebGL 渲染的颜色矩阵滤镜和模糊滤镜。颜色矩阵滤镜在游戏中常用来在战斗中将“怪物”“灰掉”等功能。模糊滤镜可以实现显示对象的模糊效果。

> 需要注意的是 Web 下的 Canvas 模式和 Native 下暂不支持滤镜功能。
> 通过显示对象的 filters 属性设置显示对象关联的每个滤镜对象的索引数组。下面使用 Bitmap 为例，其他显示对象也支持 filters 属性。



## 模糊滤镜

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

![](5739826314d12.png)

> 需要注意的是模糊滤镜对性能的消耗比较大，应谨慎使用。普通显示对象可以开启 cacheAsBitmap 提高一些性能。
显示对象的 filters 属性可以保存多个滤镜效果，比如同时使用` hero.filters = [blurFliter,colorFlilter];` 模糊和颜色矩阵滤镜效果。多个效果同时生效。


