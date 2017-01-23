egret3d提供Object3D对象的pick up功能。

在本例中，可以通过监听地形（Terrain）的pick up事件，捕捉用户点击地面的世界坐标，进而转换为对角色的移动命令。

````
// 在场景节点中，查找TerrainCollider对象
let terrain = object.findObject3D("TerrainCollider");

// 设置terrain的拣选模式
terrain.pickType = egret3d.PickType.PositionPick;
terrain.enablePick = true;
terrain.canPick = true;

terrain.addEventListener(egret3d.PickEvent3D.PICK_UP, function(e:egret3d.PickEvent3D) {
    // 点击地面的坐标
    console.log(e.pickResult.globalPosition);
    // 角色朝向坐标移动
}, this);
````

角色的移动除了世界坐标的改变，还需要转向并播放奔跑动作：

````
// 播放角色奔跑
charactor.skeletonAnimation.play("Run");
````