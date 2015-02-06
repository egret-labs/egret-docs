---
layout: post
title:  "微信平台接入官方JS SDK"
permalink: post/platform/platformaccess/weixin-2015-official.html
type: platform
element: platformAccess
version: Egret引擎 v1.x
---

该接入方式适用于2015年1月初微信推出的JS-SDK。
     
微信API具体是指 [微信公众平台开发者文档](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html) 所述的jweixin-1.0.0.js的API。
     
本项目主要用于 [Egret引擎](https://github.com/egret-labs/egret-core) 开发者在Egret开发过程方便的调用微信相关的功能。   
         
另外本项目已经对官方一些常用的API如分享到朋友圈等的参数结构进行了定义，方便开发者更快捷地完成相关属性配置。
      
## 使用方法
--------------   
     
目前开发者使用此模块，请按照第三方库方式接入到游戏中：    

* 下载或更新[第三方库](https://github.com/egret-labs/egret-game-library)

* 在项目中接入weixinapi第三方库，[参考文档](http://docs.egret-labs.org/post/manual/threelibs/uselibs.html)
    
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


