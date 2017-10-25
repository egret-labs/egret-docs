
项目的根文件夹下有名为 ```egretProperties.json``` 的配置文件，引擎所涉及的配置均存储在此。

### 整体结构

![image](5604f755ba98b.png)

### egret_version 字段

项目当前使用的 egret 命令行版本。

### modules 字段

定义项目中引用的所有库文件。
每一个库都是形如 ```{ "name":"moduleName" , "path":"modulePath"}``` 的配置信息。
```name``` 字段是库名。```path``` 字段是库文件存放路径，如果没有此字段，取默认值```${EGRET_DEFAULT}```

``` json
{
	"egret_version":"5.0.6",
	"modules":[
		{
			"name":"egret",
		},
		{
			"name":"tween",
			"path":"${EGRET_APP_DATA}/4.0.3"
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

```path``` 字段中可以包括库文件版本号

	白鹭引擎中有两个环境变量：
	```EGRET_DEFAULT```，表示当前引擎的路径。
	```EGRET_APP_DATA```，表示引擎启动器中的缓存文件夹中的路径。
	在上述配置文件中，引擎的 ```egret```模块会使用 ```egret_version```中配置的版本所对应的路径，```tween```模块会使用引擎启动器中下载的 4.0.3 版本所对应的路径。
	通过这种方式，开发者可以选择性的升级引擎的特定模块，从而降低因为版本升级带来的稳定性隐患。


```path``` 字段所对应的路径可能在项目中，也可能在项目外。

* 如果在项目中，项目运行时直接加载此路径所对应的库。
* 如果在项目外，引擎编译时会首先将此路径所对应的库拷贝至项目中的 ```libs/modules``` 文件夹中，然后加载该文件夹中的库。

修改该配置中的内容后，需要执行 ```egret clean``` 命令进行重新构建，以保证改动生效。

### publish 字段
发布项目所需要的配置文件。

* path：发布文件所在的目录，默认值为 "bin-release"。

* web：Web 项目资源文件发布的方式。0，按照原素材路径名称发布；1，将资源以 crc32 命名方式重新命名后发布。默认为 0。

* native：Native 项目资源文件发布的方式。0，按照原素材路径名称发布；1，将资源以 crc32 命名方式重新命名后发布。默认为 1。

目前 Egret 提供的 RES 模块中，支持发布方式为 web = 0、native= 1，如需要自定义版本控制，请修改对应的发布方式。

### template 字段
设置是否使用模板。若```egretProperties.json```文件中有```"template": {}```字段，则使用模板；没有则不使用模板

### eui 字段
eui 项目相关配置

* exmlRoot:  指定exml文件存放根目录，该路径必须为相对路径。该目录内最好只有exml文件，如果还包含其他文件会影响编译速度。

* themes: 主题文件数组，配置所有主题文件路径，该路径必须为相对路径。

* exmlPublishPolicy：发布时主题文件存储exml的策略，包括 path，content，gjs


	path：主题文件只存储路径，会加载不同exml文件，和debug时一致，不推荐使用
	content：主题文件存储exml内容，不会加载不同exml文件，优点是整体文件较小
	gjs：主题文件存储exml编译后的js内容，不会加载不同exml文件，优点是解析速度快


### native 字段
native 相关配置，只对 native 项目有用，在发布 Web 项目时，忽略此字段。

* path_ignore：拷贝项目素材到发布目录时所要忽略的列表，其字符串值会被解析为正则表达式。
例如：设置该字段的值为 "anim.*ons"。
项目资源文件目录如下图：
![image](5604f756594ae.png) 
发布后的资源文件目录如下图：
![image](5604f7562d513.png)

* android_path（可省字段）：创建的android工程的目录，在创建android项目时自动创建。

* ios_path（可省字段）：创建的ios工程的目录，在创建ios项目时自动创建。

### web 字段
web 相关配置，只对 web 项目有用，在发布 Native 项目时，忽略此字段。
* path_ignore：(4.0.0 以上支持)拷贝项目素材到发布目录时所要忽略的列表。


### urlParams 字段 (3.1.6 以上支持)

* 针对```egret run```命令添加URL参数，比如执行```egret run```后打开地址：

```http://10.0.4.63:3001/index.html?okok=12&id=455464564```
