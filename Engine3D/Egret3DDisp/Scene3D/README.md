Scene3D
----------
场景根节点对象 会对场景中的静态物体进行树形划分

----------

	// 用插件导出Scene 然后加载json配置文件

    // 加载一个场景的配置
    protected loaderScene() {
        // 这是个特效组
        var loader: egret3d.QueueLoader = new egret3d.QueueLoader();
        loader.load("resource/doc/sponza_Demo/MapConfig.json");
        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onSceneComplete, this);
    }

    // 场景加载完成
    protected onSceneComplete(e: egret3d.LoaderEvent3D) {
        var loader: egret3d.QueueLoader = e.target;
        var scene: egret3d.Scene3D = loader.getAsset("resource/doc/sponza_Demo/MapConfig.json");

        // 替换场景 中的scene
        // 并把原来主摄像机加载当前场景
        this.view.scene = scene;
        this.view.scene.addChild(this.view.camera3D);
		// 如果主摄像机在 scene 节点中 则不需要再添加为子节点  但是需要设置 view.camera3D 
    }


![](Img_2.gif)

----------