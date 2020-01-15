
在项目配置文件`egretProperties.json`中， `modules` 字段可以定义项目中引用的所有库文件。

每一个库都是形如 `{ "name":"moduleName" , "path":"modulePath"}` 的配置格式。
`name` 字段是库名，`path` 字段是库文件存放路径，

`path` 字段中可以包括库文件版本号

`path` 字段所对应的路径可能在项目中，也可能在项目外。

* 如果在项目中，项目运行时直接加载此路径所对应的库。
* 如果在项目外，引擎编译时会首先将此路径所对应的库拷贝至项目中的 `libs/modules` 文件夹中，然后加载该文件夹中的库。

引擎库分为2种

**内置库**，主要包括:
 
* `egret` 引擎核心库
* `egret3d` 引擎 3D 库
* `assetsmanager` 资源管理模块
* `dragonBones` 龙骨
* `eui` UI 组件库
* `game` 游戏库
* `media` 多媒体库
* `socket` websocket 网络通讯库
* `tween` 缓动动画库

内置库可以省略`path`字段，默认和`egret_version` 使用相同的版本。也可以在`path`字段里单独设置该库使用的版本

**第三方库**

白鹭官方提供了一些[常见的第三方库](https://github.com/egret-labs/egret-game-library)供开发者使用。

开发者也可以在项目中配置自己的库。



使用示例：

``` json
{
	"egret_version":"5.2.6",
	"modules":[
		{
			"name":"egret",
		},
		{
			"name":"tween",
			"path":"${EGRET_APP_DATA}/5.0.3"
		},
		{
			"name": "particle",
			"path": "../libsrc"
		},
		{
			"name": "promise",
			"path": "./promise"
		}
	]
}
```
该配置表示:

* `egret` 模块使用 `egret_version` 的 5.2.5 版本
*  `tween` 模块使用 5.0.3 版本
*  `particle` 模块的路径在项目外面
*  `promise` 模块的路径在项目里面

