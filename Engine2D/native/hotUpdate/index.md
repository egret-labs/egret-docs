引擎版本低于1.7.3的点击此处：[Native项目热更新(1.7.3以前)](http://edn.egret.com/cn/index.php/article/index/id/170)

阅读本文档,您可能需要了解: [RES版本控制](/cn/docs/page/671)

## 概述

本文调试环境为引擎2.5.3

Egret的封装项目无论在Android还是iOS平台，均支持热更新。

下文主要以Android平台为例来说明，iOS平台只需要在相应的配置和iOS入口类代码中进行不同的修改配置即可。

## 准备工作

在进行热更新之前，我们需要创建Eclipse的 Andorid 项目。对于导入 Eclipse 封装项目有疑惑的可以查阅以下文章：

- [Win中Android APP打包](http://edn.egret.com/cn/index.php/article/index/id/648)
- [Mac中Android APP打包](http://edn.egret.com/cn/index.php/article/index/id/649)
- [IOS APP打包方案](http://edn.egret.com/cn/index.php/article/index/id/169)

## 配置文件
在进行热更新发布之前，需要进行H5项目中 egretProperties.json 的配置。

使用 wing 在桌面文件夹 test 中新建名 h5Demo 的 Egret H5项目。

使用命令行 `egret create_app` 在桌面文件夹 test 中新建名为  androidDemo 的 Andorid 项目。

最终文件结构如图：

![](562da618aec85.png)

打开H5中的配置文件 egretProperties.json ，文件结构如下：

	{
		"native": {
			"path_ignore": [],
			"android_path": "../androidDemo"
		},
		"publish": {
			"web": 0,
			"native": 1,
			"path": "bin-release"
		},
		"egret_version": "2.5.2",
		"modules": [
			{
				"name": "egret"
			},
			{
				"name": "game"
			},
			{
				"name": "tween"
			},
			{
				"name": "res"
			}
		]
	}

字段描述请查阅：[项目模块化配置](http://edn.egret.com/cn/index.php/article/index/id/644) ，了解其中 “path_ignore”、“android_path”、“path” 即可。

> android_path是在执行`egret create_app`后自动添加。

## Android项目设置

使用 Eclipse 导入刚创建的 androidDemo 项目，并找到入口文件 androidDemo.java 此处入口文件根据自己实际项目名进行更改。

需修改两处：

- 修改方法 setLoaderUrl 参数为1，默认是2，如图：

![](562da618bac78.png)

-  修改 setLoaderUrl 方法中 case 为 1 的 loaderUrl 与 updateUrl 变量，如图：

![](562da618ca122.png)  

- case 2, 空字符串。即当前包使用最原始的格式。`egret build [-e] --runtime native` 之后的数据结构。
- default, 本地使用zip包方式。`egret publish -compile --runtime native --version xxx -log` 之后，会将最新的资源包拷贝到Android项目中。此时如果需要在Android项目中测试。
- case 1, 只有使用这种方式才会有热更新机制，引擎会根据提供的game_code.zip的名称进行更新。

**我们以 case 1 为例：**

- loaderUrl 更新的路径（HTTP://），一般这里为动态地址，根据请求的内容返回具体的 json 内容。这里我们使用PHP处理。
- updateUrl 资源路径，在case 1可直接设置为空。

**设置好 loaderUrl 地址，既可以发布 APP。**

## 服务器端设置

APP每次启动会从事先设置好的HTTP（loaderUrl）地址请求更新内容进行对比。

我们需要搭建WEB服务器，百度一下，非常多的教程这里略。

服务器需要返回特定JSON格式：

	{
	"code_url": "http://10.0.5.158/app/151023172200/game_code_151023172200.zip",//游戏代码zip包路径
	"update_url": "http://10.0.5.158/app/151023172200" //游戏资源存放路径
	}

以PHP为例建立名为egret.php文件，内容如下：

	<?php
	define('CASE_NAME', '151023172200');
	
	function startsWith($string, $pattern) {
		return $pattern === "" || strrpos($string, $pattern, -strlen($string)) !== FALSE;
	}
	
	$json = array();  //不存在就false;
	if (!startsWith(CASE_NAME, 'http://')) {
		$ip = "http://10.0.5.155/app/";
		$root = $ip  . CASE_NAME ."/game_code_".CASE_NAME. ".zip";
		$update = $ip  . CASE_NAME;
		$json["code_url"] = $root;
		$json["update_url"] = $update;
	} else {
		$json["code_url"] = CASE_NAME;
		$json["update_url"] = dirname(CASE_NAME);
	}
	echo(json_encode($json));

其中 define('CASE_NAME', '151023172200'); 是每次APP更新时，需要替换的内容。我们看一下输出内容：

![](562da618d6734.png)

这里也可以直接是一个json文件，只要返回内容符合规范就可以。不限制语言。

## 发布更新版本

我们需要熟悉一下发布命令：

	//version 后为自定义的版本文件夹，如果没有，则会自动生成一个数字串的文件夹,一般会省略。
    egret publish -compile --runtime native --version xxx -log

找到开始时建立的 h5Demo 所在目录，执行发布命令，如图：

![](562da618e6ca3.png)

执行命令完成，h5Demo项目会出现 bin-release 文件夹，其中包含了我们需要更新的资源，如图：

![](562da619037a5.png)

拷贝 151026111628 文件夹到WEB服务器指定位置，并修改egret.php中常量即可完成更新：

    define('CASE_NAME', '151026111628')

最终egret.php输出的路径，可匹配 151026111628 文件即可。

现在我们可以修改背景 resource&#47;assetsbg.jpg 文件，执行` egret publish --runtime native` 后更新文件夹到服务器，修改egret.php。打开你的APP，查看背景是否更新。

> 注：每次发布项目后，andorid 项目可能会被更新，需重新设置 setLoaderUrl 相关参数与内容。

## 总结

热更新的机制比较简单。基本就几步：

1. 修改 Android 封装项目入口文件的 setLoaderUrl 方法,并发布正式版本APP。
2. 每次H5版本有资源或代码修改，执行`egret publish --runtime native`发布命令。
3. 拷贝所生成的文件夹到WEB服务器，并修改服务器中更新路径。

源码下载：[点击下载](/cn/data/upload/562da676ab121.zip "点击下次")