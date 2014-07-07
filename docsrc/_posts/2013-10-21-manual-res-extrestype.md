---
layout: post
title:  "扩展资源加载模块文件解析器"
permalink: post/manual/loader/extrestype.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

自定义解析器请参考内置解析器的写法，继承自AnalyzerBase实现相关接口即可。然后在调用`RES.loadConfig()`之前，使用下面的方式注入你的自定义解析器到框架内：

{% highlight java %}
egret.Injector.mapClass(RES.AnalyzerBase,YourAnalyzer,"yourType");
{% endhighlight %}

这里的`"yourType"`是你在配置中填写的type值。RES在加载时，会根据你填写的type值，调用你注入的对应解析器来加载解析文件。

这种注入方式同样也支持替换掉默认的内置解析器.例如把第三个参数`"yourType"`改成`RES.ResourceItem.TYPE_IMAGE`,默认的图片解析器就可以被替换掉。