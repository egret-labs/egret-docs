
### Mesh网格

网格是由无数个三角面片组成的边富有贴图的物体，是3D物体的核心。当你创建一个模型的时候，需要借助网格来渲染你的模型。当创建一个Mesh时，需要指定对应的几何体与材质。

#### 创建Mesh网格

创建Mesh的方法如下：

```
var mat:egret3d.TextureMaterial = new egret3d.TextureMaterial(); //创建贴图材质
var geometery:egret3d.CubeGeometry = new egret3d.CubeGeometry(); //创建立方几何体
var mesh:egret3d.Mesh = new egret3d.Mesh(geometery, mat); //创建材质
```

如果你需要在场景中显示当前Mesh对象，可以将其添加至View3D中，方法如下：

```
var view:egret3d.View3D = new egret3d.View3D(0,0,window.innerWidth,window.innerHeight);
view.addChild3D( mesh );
```

### 添加材质

```
var colmat:egret3d.ColorMaterial = new egret3d.ColorMaterial(0xff00ff00);

//添加方法1
var mesh:egret3d.Mesh = new egret3d.Mesh(geometery, colmat);

//添加方法2
mesh.addSubMaterial(2, colmat);
```

### 移除材质

```
var mesh:egret3d.Mesh = new egret3d.Mesh(geometery, colmat);
mesh.addSubMaterial(2, colmat2);

//移除材质
mesh.removeSubMaterial(2);
```

### 获取材质数量

```
var matCount:number = mesh.materialCount();
```

