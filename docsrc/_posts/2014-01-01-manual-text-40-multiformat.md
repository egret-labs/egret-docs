---
layout: post
title:  "多种样式文本混合"
permalink: jkdoc/manual-text-multiformat.html
type: manual
element: manualtext
version: Egret引擎 v1.5
---

(该部分内容撰写中，撰写完毕将删除改行，谢谢理解！)

前面的几节分别说明如何设置一个TextField实例的某种属性。
    
但实际情况，往往需要在一段文字，甚至一行文字内有丰富的样式变化来突出不同文字的含义提高语句的可读性、或者给简单的文字较强的表现力，就像HTML所擅长的一样。
   
当然，大家都知道HTML在渲染文本方面的强大。我们要做的也许没有HTML渲染文本的那么完整的功能，但我们却在易用性方面做出很大的努力，可以说类似CSS样式的方式，但编写代码的角度来看，比CSS更简单易用。因为在js代码中设置样式与CSS代码中同样的样式还具有不同的关键字，这无疑增加了某种混乱的因素，也是很多程序员讨厌CSS的一个原因吧！
   
Egret引擎无疑在这方面更受开发者喜爱，因为设置样式的关键字，跟直接设置对应属性的关键字是完全一致的！稍后会有详细说明。

废话说到这里，先给出结果，看看我们的多种样式文本混合功能所能达到的效果：
    
![about display]({{site.baseurl}}/assets/img-jk/manual-text-multiformat.jpg)
    
这样似显零乱但足够丰富的效果对大多数文本显示的需求，应该够用了吧！那么接下来，一步步看，我们怎么组装起来的！
   

首先，基本思路，就是只要把文本按照样式差异分成若干段的文本元素，分别设定每一段文本元素的样式，最后将这些元素依次排列在一个数组中即可。
   
下面这个最简易的结构，就是建立多种样式混合文本的基本结构`ITextElement`：
     
{% highlight java %}
interface ITextElement {
    text: string;
    style: ITextStyle;
}
{% endhighlight %}
    
    
而其中的`ITextStyle`也没有复杂的内容，就是你所需要定义的各种样式属性的集合，以`Object`的样式给出，这个`Object`里的每个元素就是一种样式属性的键值对定义，例如定义文本颜色为红色，那么这个`Object`就是：
     
{% highlight java %}
{"textColor":0xFF0000}
{% endhighlight %}
    
`style`属性里，可以包含若干这样的样式组合定义。
内部结构了解清楚了，那尝试一个最简单的组合，给一段文字定义一个红色字号16格式的代码：
     
{% highlight java %}
var tx:egret.TextField = new egret.TextField;
tx.textFlow = <Array<egret.ITextElement>>[ {"textColor":0xFF0000, "size":"16"} ];
this.addChild( tx );
{% endhighlight %}
    

    
    
    
    
    
    
    
    
    
    



