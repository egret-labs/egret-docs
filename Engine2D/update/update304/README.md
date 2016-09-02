Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎，它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

下面介绍 Egret Engine 3.0.3 到 Egret Engine 3.0.4 之间的更新详情。

### Egret Engine 2D 

在 Egret Engine 2D 的 本次更新中，我们吸收开发者提供的反馈和建议，进一步稳定引擎并优化了一些体验。下面列出的是 3.0.3 到 3.0.4 的更新详情。 


#### TypeScipt 1.8 

本次更新将 Egret Engine 内部的 TypeScript 版本进行了升级。从原来的 TypeScript 1.7 版本升级到 TypeScript 1.8 版本。在新版的 TypeScitpt 中有几点需要我们注意.

* 不允许在 super 调用之前使用 this

在使用新版的 TypeScript 引擎内，不允许在调用 super 之前使用 this,比如下面这样:

```
class TestBase {
	public constructor(num?:number) {
    	 console.log(num);
	}
}

class Test extends TestBase {
	public constructor() {   	
    	super(this._num);  //error  	
	}
	private _num:number = 1;
}
```

编译以上代码将报错,提示不能在 super 之前调用 this。

* 更严格的类型检查

在新的 TypeScipt 版本中，对类型检查更为严格。

```
var test = [1,2,3,4,5,6,7];

for(var key in test) {
    console.log(<number>key); //error
}
```

在以前的版本中是可以像上面这样做的。但是现在 for ... in 的语法中不可以使用强制转换的语法将 `key` 转换成 `number` 类型。如果需要的话可以先将`key`转换为`any`类型再进行类型转换。比如下面这样。

```
for(var key in test) {
    console.log(<number><any>key);//cool
}
```

更多关于 TypeScipt 1.8 的新特性可以关注 [What's new in TypeScript](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript)

#### 获取声音长度
 
在 Egret Engine 2D 3.0.4 中，新增了一个 API ，用以获取当前播放声音的长度。通过获取 `egret.Sound`的 length 属性来获取当前播放声音的长度。需要注意的是该属性是只读的，我们并不能改变播放声音的长度。

更多教程参考:[声音系统](http://edn.egret.com/cn/docs/page/156)

API 参考:[Sound](http://edn.egret.com/cn/apidoc/index/name/egret.Sound)

#### DragonBones

在上一周更新了设计工具 DragonBonesPro 的 prerelease 版。新增了反向动力学约束（IK Constraint）支持和支持网格(Mesh)和自由变形动画(柔体动画)。

同时 DragonBones 的 API 也更新了相关内容，用以支持新特性。

DragoneBones 工具的使用教程:[IK约束](http://edn.egret.com/cn/docs/page/873) [网格](http://edn.egret.com/cn/docs/page/874)

DragoneBones 相关代码使用教程计划近期更新。

DragonBones 的 API 参考：[DragonBones](http://localhost/cn/apidoc/index/name/dragonBones.Animation)
