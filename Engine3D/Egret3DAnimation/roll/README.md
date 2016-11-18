     
## UV贴图基本概念   
UV贴图这里是指u，v纹理贴图坐标的简称(它和空间模型的X、Y、 Z轴是类似的)。它定义了图片上每个点的位置的信息。这些点与3D模型是相互联系的， 以决定表面纹理贴图的位置。UV就是将图像上每一个点精确对应到模型物体的表面。在点与点之间的间隙位置由软件进行图像光滑插值处理。这就是所谓的UV贴图。      

## 呈现UV滚动动画
----------

UV滚动动画，是在某一个平面设置一个滚动着的纹理，首先创建一个`UVRollMethod`实例。   

    // 使用uv 滚动动画 
    protected uvRollAnimation() {

        var mat: egret3d.TextureMaterial = new egret3d.TextureMaterial();
        mat.repeat = true;
        var plane: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(1000, 1000, 100, 100, 1, 1), mat);
        this.view.addChild3D(plane);
        plane.y = 10;

        var uvRollMethod: egret3d.UVRollMethod = new egret3d.UVRollMethod();
        mat.diffusePass.addMethod(uvRollMethod);
        uvRollMethod.start(true);

        mat.diffuseTexture = this.queueLoader.getAsset("resource/doc/Lava_05.png");

    }       

![](Img_5.gif)

----------
