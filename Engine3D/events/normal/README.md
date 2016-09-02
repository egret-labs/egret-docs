egret3d.Event3D.ENTER_FRAME：帧事件。即每帧都会触发的事件。

		this._egret3DCanvas.addEventListener(egret3d.Event3D.ENTER_FRAME, function (e: egret3d.Event3D): void {
		}, this);

egret3d.Event3D.RESIZE：窗口尺寸变化事件。

		egret3d.Input.addEventListener(egret3d.Event3D.RESIZE, function (e: egret3d.Event3D): void {
		}, this);