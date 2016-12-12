资源介绍:
----------

* png 贴图文件  ----ImageTexture
 
* jpg 贴图文件  ----ImageTexture

* dds 贴图文件  ----Texture

* tga 贴图文件  ----Texture

* hdr 贴图文件  ----Texture

* esm 模型数据文件,Unity3d插件可以导出 ----Geometry

* eam 骨骼动画文件,Unity3d插件可以导出 ----SkeletonAnimationClip

* epa 属性动画文件,Unity3d插件可以导出（物体动画或相机动画） ----PropertyAnim

* xml 普通数据 ---- any

* json 普通数据 ---- any

* json Unity3d插件导出的文件 

     ---- Object3D

	 ---- Scene3D  场景文件 

	 ---- Role  角色文件 

	 ---- EffectGroup  特效组文件 

贴图文件如果宽高不是2的N次方则会输出错误log

----------		

资源加载:
----------	

egret3d引擎中会对一部分资源加载之后进行解析，解析为引擎中对应的一些数据对象进行存储。其它的文件加载之后都将以二进制数据进行返回。

加载方式有3种： 使用QueueLoader可以完成所有加载 

* URLLoader 加载
----------

	是基础的文件加载解析，不会由一个文件的配置进行加载另一个文件。一次只能加载一个文件
	
	事件：
	LOADER_COMPLETE 加载完成后触发
    LOADER_ONCE_COMPLETE 加载完成后触发
	LOADER_PROGRESS 加载进度

  	```        
    protected doURLLoader() {

        // ------------------ 使用URLLoader加载 ---------------------

        var urlLoader: egret3d.URLLoader = new egret3d.URLLoader("resource/doc/brick-diffuse.jpg");
        // 监听完成事件
        urlLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);

        // ------------------ 使用URLLoader加载 ---------------------
    }
  
    protected onLoader(e: egret3d.LoaderEvent3D) {
        // 加载完成后数据
        var img: egret3d.ImageTexture = e.data;

        // 创建一个box 加载场景中
        var box: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(), new egret3d.TextureMaterial(img));
        this.view.addChild3D(box);
    }

  	```

----------

* UnitLoader 加载
----------

	单体加载文件 把普通的文件和配置文件都算成一个单体 会对文件进行加载 还会对配置文件中的内容进行解析，
	并且会根据配置文件中的内容进行加载 所有文件加载完成，会响应 LOADER_COMPLETE事件 
	每个文件加载完成会响应 LOADER_ONCE_COMPLETE事件 
	加载进度会响应 LOADER_PROGRESS事件

	在加载Unity插件导出的配置文件时 加载进度会从0-1

	事件：
	LOADER_COMPLETE 加载完成后触发
    LOADER_ONCE_COMPLETE 加载完成后触发
	LOADER_PROGRESS 加载进度

----------

* QueueLoader 加载
----------

	每个加载对象都是一个UnitLoader对象 可以加载多个文件，队列式进行加载。
	加载完一个文件后，如果是配置文件，会由配置文件索引加载其它文件。
		
	事件：
	LOADER_COMPLETE 加载完成后触发
    LOADER_ONCE_COMPLETE 加载完成后触发
	LOADER_PROGRESS 加载进度

	```

        protected doQueueLoader() {

        // ------------------ 使用QueueLoader加载 ---------------------

        var queueLoader: egret3d.QueueLoader = new egret3d.QueueLoader();

        queueLoader.load("resource/doc/ganning/Ganning.esm");
        queueLoader.load("resource/doc/ganning/Idle.eam");
        queueLoader.load("resource/doc/ganning/Run.eam");
        queueLoader.load("resource/doc/ganning/Attack1.eam");
        queueLoader.load("resource/doc/ganning/Death.eam");
        queueLoader.load("resource/doc/ganning/Ganning.png");
        queueLoader.load("resource/doc/ganning/Ganning_f.png");
        queueLoader.load("resource/doc/ganning/Ganning_Weapon.png");



        // 这个资源是unity3d插件导出的场景资源
        var sponzaLoader :egret3d.UnitLoader = queueLoader.load("resource/doc/sponza_Demo/MapConfig.json");

        // 监听某个文件的加载进度事件
        sponzaLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_PROGRESS, this.onSceneProgress, this);

        // 监听某个文件的加载完成事件
        sponzaLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_ONCE_COMPLETE, this.onSceneOnceProgress, this);


        // 监听完成事件
        queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onQueueLoader, this);

        // 监听单个文件完成事件
        queueLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_ONCE_COMPLETE, this.onOnceComplete, this);
        // ------------------ 使用QueueLoader加载 ---------------------
    }

    protected onQueueLoader(e: egret3d.LoaderEvent3D) {
        var queueLoader: egret3d.QueueLoader = e.target;

        // 加载完成后用url查找资源 
        var geo: egret3d.Geometry = queueLoader.getAsset("resource/doc/ganning/Ganning.esm");
        var clip0: egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/doc/ganning/Idle.eam");
        var clip1: egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/doc/ganning/Run.eam");
        var clip2: egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/doc/ganning/Attack1.eam");
        var clip3: egret3d.SkeletonAnimationClip = queueLoader.getAsset("resource/doc/ganning/Death.eam");
        var textures: egret3d.ITexture[] = [];

        textures[0] = queueLoader.getAsset("resource/doc/ganning/Ganning.png");
        textures[1] = queueLoader.getAsset("resource/doc/ganning/Ganning_f.png");
        textures[2] = queueLoader.getAsset("resource/doc/ganning/Ganning_Weapon.png");

        clip0.animationName = "Idle";
        clip1.animationName = "Run";
        clip2.animationName = "Attack1";
        clip3.animationName = "Death";

        // 创建Mesh
        var mesh: egret3d.Mesh = new egret3d.Mesh(geo, new egret3d.TextureMaterial());
        for (var i: number = 0; i < geo.subGeometrys.length; ++i) {
            var mat: egret3d.MaterialBase = mesh.getMaterial(i);
            if (!mat) {
                mat = new egret3d.TextureMaterial();
                mesh.addSubMaterial(i, mat);
            }

            mat.diffuseTexture = textures[i];
        }

        mesh.z = 100;

        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip0);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip1);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip2);
        mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip3);
        mesh.animation.play("Idle");

        this.view.addChild3D(mesh);


        // 加载完场景资源可以直接替换View3D中的Scene对象
        var scene3d: egret3d.Scene3D = queueLoader.getAsset("resource/doc/sponza_Demo/MapConfig.json");
        this.view.scene = scene3d;
    }

	```


![](Img_0.png)