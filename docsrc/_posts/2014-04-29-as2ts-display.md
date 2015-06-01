---
layout: codeonline
title:  "Display相关代码对比"
permalink: as2ts/displaycode/display.html
type: codedisplay
version: Egret引擎 v1.x
---

显示对象的属性设置，显示层级。

####ActionScript 3 Code

{% highlight java  %}
var container:Sprite = new Sprite();
container.x = 100;
container.y = 200;
container.scaleX = 0.4;
container.scaleY = 0.3;
container.alpha = 0.6;
container.rotation = 45;
var sprite:Sprite = new Sprite();
sprite.width = 40;
sprite.height = 50;
container.addChild(sprite);
container.removeChild(sprite);
container.addChildAt(sprite,0);
container.removeChildAt(0);
{% endhighlight %}

####Egret Code

{% highlight java  %}
var container:egret.Sprite = new egret.Sprite();
container.x = 100;
container.y = 200;
container.scaleX = 0.4;
container.scaleY = 0.3;
container.alpha = 0.6;
container.rotation = 45;
var sprite:egret.Sprite = new egret.Sprite();
sprite.width = 40;
sprite.height = 50;
container.addChild(sprite);
container.removeChild(sprite);
container.addChildAt(sprite,0);
container.removeChildAt(0);
{% endhighlight %}