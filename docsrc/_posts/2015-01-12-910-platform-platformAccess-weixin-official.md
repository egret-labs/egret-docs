---
layout: post
title:  "微信平台接入官方JS SDK"
permalink: post/platform/platformaccess/weixin-2015-official.html
type: platform
element: platformAccess
version: Egret引擎 v1.x
---

该接入方式适用于2015年1月初微信推出的JS-SDK。具体项目地址在<a href="https://github.com/wibrst/wxsdk-dts" target="_blank">这里</a>。
     
微信API具体是指 [微信公众平台开发者文档](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html) 所述的jweixin-1.0.0.js的API。
     
本项目主要用于 [Egret引擎](https://github.com/egret-labs/egret-core) 开发者在Egret开发过程方便的调用微信相关的功能。   
         
另外本项目已经对官方一些常用的API如分享到朋友圈等的参数结构进行了定义，方便开发者更快捷地完成相关属性配置。
      
使用方法
--------------


* 下载并复制一份 [微信公众平台官方SDK文件jweixin-1.0.0.js](http://res.wx.qq.com/open/js/jweixin-1.0.0.js)  为Egret项目中的 ```launcher/jweixin-1.0.0.js```     

* 复制本项目的 ```jweixin-1.0.0-additional.js``` 为Egret项目中的 ```launcher/jweixin-1.0.0-additional.js``` 

* 在游戏项目的 ```index.html``` 和 ```release.html``` 中添加：         
``` <script src="launcher/jweixin-1.0.0.js" async="false"></script>```
以及           
``` <script src="launcher/jweixin-1.0.0-additional.js" async="false"></script>```
   
* 复制本项目的 ```jweixin-1.0.0.d.ts``` 为Egret项目中的 ```libs/jweixin-1.0.0.d.ts``` 
    
* 在Egret项目的TS文件中，对照微信公众平台开发者文档，直接调用其相关API。如下为基本用法示例：

{% highlight java %}
var bodyConfig:BodyConfig = new BodyConfig;
bodyConfig.appId = "aaabbb";
bodyConfig.debug = true;
/// ... 其他的配置属性赋值
/// 通过config接口注入权限验证配置
wx.config( bodyConfig );
wx.ready( function(){
    /// 在这里调用微信相关功能的 API
} )
{% endhighlight %}


