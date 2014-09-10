---
layout: post
title:  "Google AdSense广告接入"
permalink: post/platform/adaccess/googlead.html
type: platform
element: adAccess
version: Egret引擎 v1.x
---

如何加入adsense
------------------------

#### 步骤一：获取adsense游戏广告的视频代码
* 请参考 [这里](https://support.google.com/adsense/answer/6054312?hl=zh-Hans&ref_topic=6064093) （如不能访问请翻墙）。


#### 步骤二：加入adsense的第三方库

* 访问 [这里](https://github.com/egret-labs/egret-game-library) 获取第三方库，里面adsense即为adsense的第三方库。
* 修改项目egretProperties.json，增加adsense引用


{% highlight java linenos %}
	{
    "document_class": "Main",
    "modules": [
        {
            "name": "core"
        },
        {
            "name": "adsense",
            "path": "../../egret-game-library/adsense/"
        }
    ],
    "native": {
        "path_ignore": [
        ]
    },
    "egret_version":"1.0.5"
}
{% endhighlight %}

> 其中 path指向的即adsense所在的目录


#### 步骤三：调用adsense
* 在游戏中调用new AdSense().show(url, width, height, x, y);


{% highlight java linenos %}
var url:string = "http://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image_text_flash&client=ca-games-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&hl=en&max_ad_duration=40000&adtest=on";
        
new AdSense().show(url, 480, 70, 0, egret.MainContext.instance.stage.stageHeight - 70);

{% endhighlight %}

#### 步骤四：构建游戏
```egret build -e```

adsense呈现
------------------------


![img]({{site.baseurl}}/assets/img/googlead.png)





