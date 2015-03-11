---
layout: post
title:  Android Native热更新
permalink: post/tools/native/hot-upgrade.html
type: manual
element: manualnative
version: Egret-Android-support 1.5.0+
---


## 说明
* 首先我们先来说下native在egretProperties.json中的相关配置数据。

  ![]({{site.baseurl}}/assets/img-jk/manual-native-hot-upgrade/publish_2.png)  
   
   图1 Egret项目配置文件中与热更新相关的字段
   
*   `release`字段：这个为项目发布目录，如果需要指定某个特定的发布目录，修改这个路径值（相对当前目录的路径）。不指定（或者没有此字段，默认为空），会发布在H5项目里的release文件夹中。

  ![]({{site.baseurl}}/assets/img-jk/manual-native-hot-upgrade/publish_8.png)

*   `native`字段下，`path_ignore`字段：忽略列表，即不希望在native包里出现的文件（夹），在忽略列表里的文件（夹）必须是在H5工程目录里的且是相对于当前目录的相对路径。图1中`["release"]`即为当前H5目录下的一个文件夹。
  
  ![]({{site.baseurl}}/assets/img-jk/manual-native-hot-upgrade/publish_7.png)
  
*   `native`字段下，`android_path`字段：`android_path`为Android项目相对当前文件夹的相对路径，其中如果没有Android，对应的`android_path`将会不存在或者为空字符串。
  
   图1中Android为一个使用egret命令创建出来的Android项目(包含proj.android、thirdparty)，不是单纯的一个文件夹。如图所示：

  ![]({{site.baseurl}}/assets/img-jk/manual-native-hot-upgrade/publish_6.png)

-------
## Native更新机制原理   
   
在Android的入口代码中，有个方法`getLoaderUrl`，它提供了Android以何方式来读取文件。

![]({{site.baseurl}}/assets/img-jk/manual-native-hot-upgrade/publish_3.png)

 1、空字符串。即当前包使用最原始的格式。`egret -b -e --runtime native` 之后的数据结构。

![]({{site.baseurl}}/assets/img-jk/manual-native-hot-upgrade/publish_4.png)

 2、"game_code.zip"。publish之后，会将最新的资源包拷贝到Android项目中。此时如果需要在Android项目中测试，则需要将返回值改成对应的game_code.zip对应的名称，如图中则应该返回的字符串为"game_code_1418351650.zip"。

![]({{site.baseurl}}/assets/img-jk/manual-native-hot-upgrade/publish_5.png)

 3、`http://www.example.com/game_code.zip`（服务器方式，并且是绝对地址，包括"http://"头）。只有使用这种方式才会有热更新机制。引擎会根据提供的game_code.zip的名称（如"game_code_1418351650.zip"，而不是将路径由"http://www.example.com/1111/game_code.zip"改成"http://www.example.com/2222/game_code.zip"）来判断是否需要下载。所以如果需要更新，则返回的zip包的文件名应该每个版本都不一样。下面提供2种参考方案来实现这个需求。

 	a)在java端请求一个服务器地址，通过服务器端返回的zip包地址来更改。
 	b)读取一个特定地址服务器端的文本文件，文件里写有zip包的地址。
   
   
-------
## 版本发布步骤 
* 执行 ```egret -b -e --runtime native```，编译native项目。
* 执行 ```egret publish --runtime native -compile```，发布最新的可更新的资源包。

![]({{site.baseurl}}/assets/img-jk/manual-native-hot-upgrade/publish_1.png)

* 执行完后将会在H5工程的release/android里生成当前发布的版本数据。图中文件夹1418351650为最新发布的版本，文件夹内资源即为需要更新的资源，将此文件夹1418351650上传到服务器就可以了。

* 修改服务器配置的game_code.zip包的最新地址（绝对地址并且包括"http://"头），如"http://www.example.com/game_code_1418351650.zip"。

## 自定义加载页面
* 有更新，必然需要更新相关的加载进度显示。在native_loader.js里，提供了一个简单的加载进度代码。
	
	egret_native.initLoadingUI()初始化加载页面。
	
	egret_native.setProgress()修改加载进度。
	
	egret_native.loadError()资源更新出错。
	
	egret_native.removeUI()删除加载页面。

![]({{site.baseurl}}/assets/img-jk/manual-native-hot-upgrade/publish_9.jpg)

> 由于热更新是在引擎代码加载后执行的，因此可以使用引擎的类及方法（如 egret.Bitmap， egret.TextField）。
> 
> 因为是js文件，所以不要有类型声明，如错误声明var textField:egret.TextField（不要加上":egret.TextField"）。
  
  
------
## 注意事项
* 如果需要native包中拥有热更新，那么getLoaderUrl()方法返回的服务器的zip包地址就不能写死。
* native项目请不要在H5工程内创建。
