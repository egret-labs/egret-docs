---
layout: codeonline
title:  "Sprite相关代码对比"
permalink: as2ts/displaycode/sprite.html
type: codedisplay
version: Egret引擎 v1.x
---

Sprite类提供了绘图功能，同时它也是一个容器

####ActionScript 3 Code

{% highlight java linenos %}
var sprite1:Sprite = new Sprite();
sprite1.graphics.beginFill(0xff0000,1);
sprite1.graphics.drawRect(0,0,100,100);
sprite1.graphics.endFill();
var sprite2:Sprite = new Sprite();
sprite2.addChild(sprite1);
{% endhighlight %}

####TypeScript Code

{% highlight java linenos %}
var sprite1:egret.Sprite = new egret.Sprite();
//与Flash一样，alpha默认值为1
sprite1.graphics.beginFill(0xff0000,1);
sprite1.graphics.drawRect(0,0,100,100);
sprite1.graphics.endFill();
var sprite2:egret.Sprite = new egret.Sprite();
sprite2.addChild(sprite1);
{% endhighlight %}