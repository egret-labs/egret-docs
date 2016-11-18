Camera3D
----------
场景中的摄像机对象 用来观察场景中的物体

摄像机分两种投影方式

透视投影:是从某个投射中心将物体投射到单一投影面上所得到的图形

正交投影:投影线垂直于投影面的投影

----------

    protected createCamera() {

        // 创建摄像机 透视
        var camera: egret3d.Camera3D = new egret3d.Camera3D(egret3d.CameraType.perspective);
        //var camera: egret3d.Camera3D = new egret3d.Camera3D(egret3d.CameraType.orthogonal); 正交 

        // 设置摄像机的坐标为(0, 1000, -1000) 看向目标(0, 0, 0)
        camera.lookAt(new egret3d.Vector3D(0, 1000, -1000), new egret3d.Vector3D(0, 0, 0));

        // 或者直接设置摄像机 坐标或旋转
        //camera.z = -200;

        return camera;
    }

----------