EffectGrop 
----------
场景中特效组对象 管理一组特效的播放和停止

----------

	// 用unity3d插件导出EffectGrop 然后加载json配置文件
	
    // 加载一个特效组的配置
    protected loaderEffectGrop() {
        // 
        var loader: egret3d.QueueLoader = new egret3d.QueueLoader();
        loader.load("resource/doc/effect/MapConfig.json");
        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onEffectGropComplete, this);
    }

    // 特效组加载完成
    protected onEffectGropComplete(e: egret3d.LoaderEvent3D) {
        var loader: egret3d.QueueLoader = e.target;
        var effect: egret3d.EffectGroup = loader.getAsset("resource/doc/effect/MapConfig.json");
        this.view.addChild3D(effect);

        // 特效组 动画播放
        effect.play();
    }

![](Img_3.gif)

---------- 