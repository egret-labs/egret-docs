

	1）完成unity插件安装教程后，我们接下来开始进行导出mesh。
	2）我们打开Example文件夹下的Example_1场景文件，目录位置如图所示：

![](Img_1.png)

	3）我们首先再场景内创建一个Cube立方体，这里我们使用unity默认参数来进行导出，如图所示：

![](Img_2.png)

	4）然后我们选择菜单栏Egret3D-->Export-->Scene步骤打开导出场景功能块。

![](Img_3.gif)

	5）接下来我们便可以看到了我们的场景导出工具面板，如下图所示：

![](Img_4.png)

	6）面板上的功能会在后面的场景导出教程中一一详细说明，暂时在这里我们使用默认导出设置进行导出，点击Export开始导出。
	导出完成后，会显示导出目录信息，可以点击Open前往查看。

![](Img_5.png)

	7）导出完成后，我们可以将导出的场景资源文件使用Egret3D引擎加载。
		a) 打开EgretWing，创建Egret3D，拷贝资源至Egret3D引擎资源目录下：

![](Img_6.png)

		b) 修改Main.ts和Index.html文件如下图所示：
			I) Main.ts
				class Main extends egret.DisplayObject {
				    // Canvas操作对象
				    protected _egret3DCanvas: egret3d.Egret3DCanvas;
				
				    // View3D操作对象
				    protected _view3D: egret3d.View3D;
				    /**
				    * look at 摄像机控制器 。</p>
				    * 指定摄像机看向的目标对象。</p>
				    * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
				    * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
				    * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
				    */
				    private cameraCtl: egret3d.LookAtController;
				
				    //加载队列
				    private urlArray: Array<string> = new Array<string>();
				    //队列加载器
				    private mapLoader: egret3d.QueueLoader;
				
				
				    public constructor() {
				        super();
				
				        //创建Canvas对象。
				        this._egret3DCanvas = new egret3d.Egret3DCanvas();
				        //Canvas的起始坐标，页面左上角为起始坐标(0,0)。
				        this._egret3DCanvas.x = 0;
				        this._egret3DCanvas.y = 0;
				        //设置Canvas页面尺寸。
				        this._egret3DCanvas.width = window.innerWidth;
				        this._egret3DCanvas.height = window.innerHeight;
				
				        //创建View3D对象,页面左上角为起始坐标(0,0)
				        this._view3D = new egret3d.View3D(0, 0, window.innerWidth, window.innerHeight);
				        //当前对象对视位置,其参数依次为:
				        //@param pos 对象的位置
				        //@param target 目标的位置
				        this._view3D.camera3D.lookAt(new egret3d.Vector3D(0, 0, 1000), new egret3d.Vector3D(0, 0, 0));
				        //View3D的背景色设置
				        this._view3D.backColor = 0xffffffff;
				        //将View3D添加进Canvas中
				        this._egret3DCanvas.addView3D(this._view3D);
				
				        //插入加载任务
				        this.urlArray.push("resource/Main/MapConfig.json");
				        this.mapLoader = new egret3d.QueueLoader();
				        for (var i = 0; i < this.urlArray.length; i++) {
				            this.mapLoader.load(this.urlArray[i]);
				        }
				        this.mapLoader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.OnMapLoad, this);
				
				        this.InitCameraCtl();
				
				        //启动Canvas。
				        this._egret3DCanvas.start();
				        this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
				
				        //设置window resize事件
				        egret3d.Input.addEventListener(egret3d.Event3D.RESIZE, this.OnWindowResize, this);
				    }
				
				    public update(e: egret3d.Event3D) {
				        this.cameraCtl.update();
				    }
				
				    /**
				    * 窗口尺寸变化事件
				    */
				    private OnWindowResize(e: egret3d.Event3D): void {
				        //重置ui大小
				        this._egret3DCanvas.width = window.innerWidth;
				        this._egret3DCanvas.height = window.innerHeight;
				        this._view3D.width = window.innerWidth;
				        this._view3D.height = window.innerHeight;
				    }
				
				    /**
				    * 初始化相机控制
				    */
				    private InitCameraCtl() {
				        //摄像机控制类
				        this.cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());
				        //设置目标和相机的距离
				        this.cameraCtl.distance = 300;
				        //设置相机x轴旋转
				        this.cameraCtl.rotationX = 0;
				    }
				
				    ///加载完成事件
				    private OnMapLoad(e: egret3d.LoaderEvent3D) {
				
				        for (var i = 0; i < this.urlArray.length; i++) {
				            var node: egret3d.Object3D = this.mapLoader.getAsset(this.urlArray[i]);
				            this._view3D.addChild3D(node);
				        }
				    }
				
				
				}     

			II) Index.html
				<!DOCTYPE HTML>
				<html>
				<head>
				    <meta charset="utf-8">
				    <title>Egret</title>
				    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
				    <meta name="apple-mobile-web-app-capable" content="yes">
				    
				    <style>
				        html, body {
				            -ms-touch-action: none;
				            background: #ffffff;
				            padding: 0;
				            border: 0;
				            margin: 0;
				            height: 100%;
				        }
				    </style>
				
				    <!--这个标签为通过egret提供的第三方库的方式生成的 javascript 文件。删除 modules_files 标签后，库文件加载列表将不会变化，请谨慎操作！-->
				    <!--modules_files_start-->
					<script egret="lib" src="libs/modules/egret/egret.js" src-release="libs/modules/egret/egret.min.js"></script>
					<script egret="lib" src="libs/modules/egret/egret.web.js" src-release="libs/modules/egret/egret.web.min.js"></script>
					<script egret="lib" src="libs/modules/egret3d/egret3d.js" src-release="libs/modules/egret3d/egret3d.min.js"></script>
					<!--modules_files_end-->
					
				    <!--这个标签为不通过egret提供的第三方库的方式使用的 javascript 文件，请将这些文件放在libs下，但不要放在modules下面。-->
				    <!--other_libs_files_start-->
				    <!--other_libs_files_end-->
				
				    <!--这个标签会被替换为项目中所有的 javascript 文件。删除 game_files 标签后，项目文件加载列表将不会变化，请谨慎操作！-->
				    <!--game_files_start-->
					<script egret="game" src="bin-debug/Main.js"></script>
					<!--game_files_end-->
				    <script>
				    window.addEventListener("touchmove", function (event) { event.preventDefault(); }, false);
				    if (typeof window.devicePixelRatio != 'undefined' && window.devicePixelRatio > 2) {
				        var meta = document.getElementById("viewport");
				        meta.setAttribute('content', 'width=device-width, initial-scale=' + (2 / window.devicePixelRatio) + ', user-scalable=no');
				    }
				    </script>
				</head>
				<body>
				
				    <div style="margin: auto;width: 100%;height: 100%;" class="egret-player" 
				        data-entry-class="Main"
				        data-orientation="auto"
				        data-scale-mode="noScale"
				        data-frame-rate="30"
				        data-content-width="640"
				        data-content-height="960"
				        data-show-paint-rect="false"
				        data-multi-fingered="2"
				        data-show-fps="false" data-show-log="false"
				        data-log-filter="" data-show-fps-style="x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9">
				    </div>
				    <script>
				        setTimeout( function () {
							egret.runEgret();
						},300);
				    </script>
				    
				</body>
				</html>

	8）点击运行，查看结果。由于使用unity默认材质，会替换成Egret3D引擎内默认素材，故而显示有所区别，接下来我们将通过使用Egret3D的材质球进行一比一还原导出。

![](Img_7.png)
