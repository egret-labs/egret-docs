
`Object3D`是显示对象的一个抽象模型，所有能够参与渲染的元素均继承自该类。我们可以通过一系列的属性与方法设置3D对象的位置，尺寸以及旋转等属性。

`Object3D`是3D空间中的实体对象。场景图中的`Object3D`对象是一个树型结构，对象中包含了变换信息.这些变换信息应用于所有的子对象,子对象也有自己的变换信息,最终的变换信息要结合父对象的变换信息每个`Object3D`对象在生成时会创建一个包围盒。

## 创建`Object3D`对象

创建语法如下：

```
var obj3d:egret3d.Object3D = new egret3d.Object3D();
```

## 作为容器，添加子对象

```
var target:egret3d.Object3D = new egret3d.Object3D();
var container:egret3d.Object3D = new egret3d.Object3D();

container.addChild( target );
```

## 添加子对象，并指定下标

```
var target:egret3d.Object3D = new egret3d.Object3D();
var container:egret3d.Object3D = new egret3d.Object3D();

container.addChildAt( target, 5 );
```

其中第二个参数是子对象的下标，所有的子对象全部存储在一个数组中，如需要，可通过下面方法获取子对象。

```
var obj3d:egret3d.Object3D = container.childs[5];
```

## 移除子物体

```
var target:egret3d.Object3D = new egret3d.Object3D();
var container:egret3d.Object3D = new egret3d.Object3D();

container.addChildAt( target, 5 );

container.removeChild( target );
```

## 查找子物体

```
var target:egret3d.Object3D = new egret3d.Object3D();
target.id = 55;
target.name = "myObj";
var container:egret3d.Object3D = new egret3d.Object3D();

container.addChildAt( target, 5 );


//通过id属性查找
var obj:egret3d.Object3D = container.findObject3DToID(55);

//通过name属性查找
var obj2:egret3d.Object3D = container. findObject3D("myObj");

```

## 旋转、位移与缩放

```
var obj3d:egret3d.Object3D = new egret3d.Object3D();

//旋转，方法1
obj3d.rotationX = 50;
obj3d.rotationY = 20;
obj3d.rotationZ = 90;

//旋转，方法2
obj3d.rotation = new egret3d.Vector3D(50,20,90);

//位移，方法1
obj3d.x = 45;
obj3d.y = 22;
obj3d.z = 1024;

//位移，方法2
obj3d.position = new egret3d.Vector3D(45, 22, 1024);

//缩放，方法1
obj3d.scaleX = 2;
obj3d.scaleY = 4;
obj3d.scaleZ = 6;

//缩放，方法2
obj3d.scale = new egret3d.Vector3D(2, 4, 6);
```


