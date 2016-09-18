## Egret Engine 3D  

#### 更新内容
* 增加水渲染特效    
新增的水波渲染方法已经达到相当逼真的效果：   
![3d-waterWave](578349b594649.jpg)     

核心代码如下：  
```   
var waterWaveMethod: WaterWaveMethod = new WaterWaveMethod();
var waterNormal: WaterNormalMethod = new WaterNormalMethod();
var envMethod: EnvironmentMethod = new EnvironmentMethod();

//vec3(42.0 / 255.0, 40.0 / 255.0, 20.0 / 255.0)
waterWaveMethod.shallowWaterColor = 0xFF2A2814;
waterWaveMethod.deepWaterColor = 0xFF2A2814;
waterNormal.setUvScale(4.0,4.0);

this.matPlane = new TextureMaterial();
this.matPlane.repeat = true;
this.matPlane.diffusePass.addMethod(waterWaveMethod);
this.matPlane.diffusePass.addMethod(waterNormal);
this.matPlane.diffusePass.addMethod(envMethod);

waterNormal.normalTextureA = CheckerboardTexture.texture;
waterNormal.normalTextureB = CheckerboardTexture.texture;
envMethod.environmentTexture = cubeTexture;
```    
简言之，就是为水面的材质加入水波纹和水平面法线两种方法。具体用法可参考 引擎3D部分的`ClassSample\Class_WaveWater.ts`类实现。   

#### Bug列表
* 修复骨骼动画缺少帧数的bug
* 修复CubeTexture上传为null时导致的bug
* 修复华为手机不能使用egret3d引擎的bug

#### 工具
* 修复Unity3d导出插件坐标轴bug
* 修复Unity3d导出插件模型比例bug
