     
### UV贴图基本概念   
UV贴图这里是指u，v纹理贴图坐标的简称(它和空间模型的X、Y、 Z轴是类似的)。它定义了图片上每个点的位置的信息。这些点与3D模型是相互联系的， 以决定表面纹理贴图的位置。UV就是将图像上每一个点精确对应到模型物体的表面。在点与点之间的间隙位置由软件进行图像光滑插值处理。这就是所谓的UV贴图。      

### 呈现UV滚动动画
UV滚动动画，是在某一个平面设置一个滚动着的纹理，首先创建一个`UVRollMethod`实例。   
```
///UV滚动渲染方式
var uvRollMethod: egret3d.UVRollMethod = new egret3d.UVRollMethod();
```
这是通过材质的漫反射通道`diffusePass`来设置的：      
```
///添加渲染方式
this.matPlane.diffusePass.addMethod(uvRollMethod);
///开始播放
uvRollMethod.start(true);
```
这行代码将漫反射通道的方法设置为UV滚动方法，并启动播放。     

如果不设置材质而的漫反射贴图，则会使用默认的方格纹理。是用其他贴图，则在贴图纹理图片加载完成后设置好贴图：  
```
protected onLoadDiffuse(evt: egret3d.LoaderEvent3D) {
	this.matPlane.diffuseTexture = evt.loader.data;
}
```    
完整的测试项目，请使用Egret3D的官方例子库中：[UV滚动动画例子](https://github.com/egret-labs/egret-3d/blob/master/Sample-wing/src/SampleUvRoll.ts)，可以运行`Sample-wing`项目，并修改`Main.ts`中的`sample`所在行为`var sample = new SampleUvRoll;`即可。        