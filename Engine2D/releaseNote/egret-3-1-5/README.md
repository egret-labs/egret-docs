

## Egret Engine 3D  

#### 更新内容
* 增加HDR图片格式的使用
高动态范围图像（High-Dynamic Range，简称HDR），相比普通的图像，可以提供更多的动态范围和图像细节。该版本已经支持该格式的加载，可用作为场景的纹理图片，得到更逼真的视觉效果。
![bern_hdr][]    

* 增加骨骼动画流式解析
现在，开发者可以在Egret 3D中使用更大资源量的骨骼动画了。之前该部分的解析并不灵活，导致解析过程所占用内存增加可能导致程序崩溃。该版本已经采用全新的解析方案，在解析大资源量的骨骼动画时，将内存占用保持在可控范围内。    
>注：该功能为引擎核心实现，不需要开发者在程序中调用。   

#### Bug列表
* 修复MapLoader资源重复加载问题
* 修复BoundBox检测相交bug
* 修复骨骼动画对重复new矩阵对象的bug

#### 优化列表
* 优化水渲染效果

## Egret Engine 2D    

* DropShadowFilter 新增 hideObject 属性
表示是否隐藏对象。如果值为 true，则表示没有绘制对象本身，只有阴影是可见的。默认值为 false（显示对象）。  
如下是应用阴影滤镜后的白鹭小鸟，分别设定`hideObject`为 `false` 和 `true`：       
    ![egret-bird-filter-shadow][]    ![egret-bird-filter-shadow-hide][]          
* BlurFilter 增加默认值
* 优化 ColorMatrixFilter 性能
* 修复 exml 中 currentState 绑定数据错误
* 修复 TouchScroll 中 throwTo 方法重复滚动问题
* 修复 BitmapLabel text 属性传入数字显示异常问题
* 修复多行输入文本输入过程中显示异常问题

[bern_hdr]: bern_hdr.jpg
[egret-bird-filter-shadow]: egret-bird-filter-shadow.png
[egret-bird-filter-shadow-hide]: egret-bird-filter-shadow-hide.png

<!--Engine2D/releaseNote/egret-3-1-4/-->