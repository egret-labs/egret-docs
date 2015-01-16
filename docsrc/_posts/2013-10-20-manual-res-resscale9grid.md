---
layout: post
title:  "配置九宫格参数"
permalink: post/manual/loader/resscale9grid.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

图片类型的解析器是支持九宫格参数的，只要在资源项上加上"scale9grid"属性即可，示例：

{% highlight java %}
{"name":"button","scale9grid":"22,0,10,60","type":"image","url":"assets/button.png"}
{% endhighlight %}

其中scale9grid属性的四个值分别表示九宫格矩形的:x,y,width,height。
```九宫格```的详细配置方式请参考 [九宫格的使用]({{site.baseurl}}/post/manual/bitmap/scalebitmap.html)。