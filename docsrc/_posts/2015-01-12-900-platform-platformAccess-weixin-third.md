---
layout: post
title:  "微信平台接入旧版第三方库"
permalink: post/platform/platformaccess/weixin-old-third.html
type: platform
element: platformAccess
version: Egret引擎 v1.x
---

注：该接入方式适用于2015年1月初微信JS-SDK放出前，因此不再保证适用。 

具体使用方法如下：

在 Egret 的下个版本中会提供自动化的模块添加机制，但如果开发者现在就有需求使用此模块，请按照以下方式添加到游戏中



* 复制 `bin/WeixinAPI.js `到 游戏项目中的 `launcher/WeixinAPI.js ```
* 复制 `libs/WeixinAPI.d.ts `到 游戏项目中的 `libs/WeixinAPI.d.ts ```
* 在游戏项目的 `index.html `和 `release.html `中添加 `<script src="launcher/WeixinAPI.js" async="false"></script> ```
* 参考 GameApp.ts 中的调用方式，实现开发者的分享需求


{% highlight java linenos %}
   //  当游戏结束，开发者引导用户去分享时调用此代码

  WeixinApi.ready(function(api:WeixinApi){

            alert("WeixinAPI Ready!!");

            var info:WeixinShareInfo = new WeixinShareInfo();
            info.title = "HelloEgret";
            info.desc = "欢迎使用Egret";
            info.link = "www.egret-labs.org"; 
            info.imgUrl = "";


            api.shareToFriend(info);
            api.shareToTimeline(info);
        })

{% endhighlight %}


上述代码只是在用户分享到好友、朋友圈时用自定义的分享内容，并不是实现直接弹出分享界面。

