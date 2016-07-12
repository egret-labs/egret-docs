
混合模式是指同一个显示容器中的两个显示对象重叠时，重叠区域如何呈现的方式，也就是两个显示对象的重叠区域像素如何混合产生结果像素。   
在讲解混合模式过程，我们放两个显示对象在某个显示对象，一个是背景，一个是白鹭小鸟，白鹭小鸟的深度靠上。白鹭小鸟在程序中用一张位图表示：   
```var img:egret.Bitmap;```

## 覆盖混合      

覆盖混合，表示为"normal"，该显示对象出现在背景前面。显示对象的像素值将覆盖背景的像素值。在显示对象为透明的区域，背景是可见的。   
设置图片为覆盖模式的代码：    
```img.blendMode = egret.BlendMode.NORMAL;```    


## 添加混合   

添加混合，表示为"add" ：将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。此设置通常用于使两个对象间的加亮溶解产生动画效果。

## 擦除混合   

"erase" ：根据显示对象的 Alpha 值擦除背景。这要求将父显示对象的 blendMode 设置为 BlendMode.LAYER

![skewX_compare][]    

![skewY_compare][]    


[normal]: Engine2D/blend/normal.png
[add]: Engine2D/blend/add.png
[erase]: Engine2D/blend/erase.png
 
 
 