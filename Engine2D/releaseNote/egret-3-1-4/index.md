

## Egret Engine 3D  

#### 更新内容
* 增加水渲染特效    
新增的水波渲染方法已经达到相当逼真的效果：   
![3d-waterWave][]      

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

## Egret Engine 2D    

#### WebGL 模式增加发光和投影滤镜   
WebGL在本版中新增两种滤镜，对应的类分别是：
* 发光滤镜 `egret.GlowFilter`   
* 阴影滤镜 `egret.DropShadowFilter`   

如有一张白鹭小鸟的位图，则后边两张依次为应用某种配置的发光和阴影滤镜后的渲染效果：     
![egret-bird-filter-no][]    ![egret-bird-filter-glow][]    ![egret-bird-filter-shadow][]   
具体的用法参看EDN中的API文档。

#### EUI大幅提升EXML解析速度

将运行时解析exml修改为编译时解析,提速90%以上。
【准备工作】   
将游戏项目提升至v3.1.4版本以上并执行egret build -e(确保使用了最新的引擎版本)

【使用方法】
全局安装euibooster命令行工具：   
```npm install -g cli-eui-new```

1.加速一个游戏项目：   
```euibooster <egretProjectDir> <egretPublishDir>```

2.从加速项目恢复成普通项目：    
```euibooster clean <egretProjectDir> <egretPublishDir>```

>注意： `<egretProjectDir>` 游戏目录是必要参数，应使用绝对路径。   
`<egretPublishDir>` 发布目录是必要参数，应使用绝对路径或相对于`egretProjectDir`的相对路径。    

#### BitmapText 支持 xadvance    
该特性是控制位图字体的字符间偏移的。   
精确些讲，这个属性是绘制完一个字符之后，光标移动多少距离绘制下一个。引擎默认是移动绘制字符的纹理宽度+字符间距，如果在fnt中加入这个属性就会覆盖引擎默认值。   
具体用法，是加载包含 xadvance 属性的fnt文件。或者，可以在现有的fnt文件中，对需要设定的字符加入该属性并赋予所需的数值。  
fnt有两种规范，一种是纯文本的，一种是JSON，这里以 Egret 配套工具 TextureMerger 所使用的JSON为例，来说明如何配置该属性，TextureMerger 生成的某个字符的属性集合可能如下：   
`"o":{"x":91,"y":1,"w":24,"h":26,"offX":2,"offY":10,"sourceW":26,"sourceH":36},`      
此时，得到的某行位图文本文字可能是：   
![fnt-xadv-orig][]   
修改 fnt文件，加入 `xadvance` 属性：   
```"o":{"x":91,"y":1,"w":24,"h":26,"offX":2,"offY":10,"sourceW":26,"sourceH":36, "xadvance":36},```
此时，得到的该行位图文本文字将成为：   
![fnt-xadv-adjust][]   

#### 新增在入口文件可以指定使用的音频类型     
现在，创建新的 Egret 项目后，将会在入口文件 `index.html` 底部发现入口代码：   
```egret.runEgret({renderMode:"webgl", audioType:0});```    
`audioType`参数可以使用如下数字取值，对应含义说明与后：0:默认，1:qq audio，2:web audio，3:aduio。


#### 其他更新
* 小幅提升webgl渲染性能
* 提升关闭脏矩形渲染性能

#### bug修复
* 修复 eui.Label 宽度测量错误的bug
* 修复使用 eui.DataGroup.getVirtualElementAt 造成列表异常的bug
* 修复 eui.List在删除内容后，高度过小无法滚动的bug
* 修复 eui.Scroller 特定条件下滚动异常的bug



[egret-bird-filter-glow]: egret-bird-filter-glow.png
[egret-bird-filter-no]: egret-bird-filter-no.png
[egret-bird-filter-shadow]: egret-bird-filter-shadow.png

[fnt-xadv-orig]: fnt-xadv-orig.jpg
[fnt-xadv-adjust]: fnt-xadv-adjust.jpg

[3d-waterWave]: 3d-waterWave.jpg

<!--Engine2D/releaseNote/egret-3-1-4/-->