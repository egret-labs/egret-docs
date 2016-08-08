
在真实世界中，当你打开了一盏灯，灯光会直接作用到周围的物体，你能够看到被灯光所照射到的物体。但在Egret3D中，并不是在场景中放置一盏灯光，所有周围的物体都被照亮。如果你想让一个物体被一些灯光所照亮，必须借助`LightGroup`将他们组合到一起才行。

你会在所有的灯光示例中看到`LightGroup`的身影，它是必须的。

你可以通过`addLight()`方法向灯光组中添加一个光源。如果你想删除某个光源，可以使用`removeLight)_`方法。

```
var light:egret3d.PointLight = new egret3d.PointLight();
var lg:egret3d.LightGroup = new egret3d.LightGroup();

lg.addLight( light ); //添加点光源到灯光组
lg.removeLight( light ); //从灯光组中删除点光源
```

如果你需要做一些特殊操作，可以通过LightGroup中的几个属性访问当前灯光组的信息。例如，通过`lightNum`属性，获取当前灯光组内已经添加的光源数量。通过`directLightListh`，`spotLightList`和`pointLightList`封别获得已经添加到当前灯光组的平行光，聚光灯和点光源。
