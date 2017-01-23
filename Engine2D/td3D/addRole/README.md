本例中角色依然是采用unity导出(详见资源导出教程)。我们找到代表主角的资源文件js.e3dPack放到项目中。

然后加载角色到场景中。

````
let loader = new egret3d.UnitLoader();
loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, (e:egret3d.LoaderEvent3D) => {
    this.view.scene.addChild(loader.data);
    // 播放人物动作
    loader.data.skeletonAnimation.play("Idle");
}, this);
loader.load("resource/anim/js.e3dPack");
````

![xx](./pic4.png)

删除原demo中的人物，可以看到新的角色模型已经被添加到了舞台中，并且重复播放“Idle”这个动作。