
模型中最常用的材质类型为“纹理材质”。对应Egret3D中的实现为`TextureMaterial`。使用方法如下：


```
//创建纹理材质
var mat = new egret3d.TextureMaterial();

var loadtex: egret3d.URLLoader = new egret3d.URLLoader();
//注册贴图读取完成回调
loadtex.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE,this.onLoadTexture,this);
//开始读取贴图 
loadtex.load("resource/LingTong/hero_12.png");
        
protected onLoadTexture(e: egret3d.LoaderEvent3D) {
	//设置纹理材质漫反射贴图
	mat.diffuseTexture = e.loader.data;
}
```

创建`TextureMaterial`后，仅设置其`diffuseTexture`属性即可。
