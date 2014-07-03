---
layout: codeonline
title:  "TextField相关代码对比"
permalink: as2ts/textcode/textfield.html
type: codetext
version: Egret引擎 v1.x
---

TextField是egret的文本渲染类，采用浏览器/设备的API进行渲染，在不同的浏览器/设备中由于字体渲染方式不一，可能会有渲染差异。

####ActionScript 3 Code

{% highlight java linenos %}
var txt:TextField = new TextField();
txt.text = "Egret";
txt.textColor = 0xff0000;

var format:TextFormat = new TextFormat();
format.size = 20;
format.font = "宋体";
format.leading = 3;
{% endhighlight %}

####Egret Code

{% highlight java linenos %}
var txt:egret.TextField = new egret.TextField();
txt.text = "Egret";
txt.textColor = 0xff0000;

//Egret没有TextFormat     
txt.size = 20;
txt.fontFamily = "宋体";
txt.lineSpacing = 3;
{% endhighlight %}