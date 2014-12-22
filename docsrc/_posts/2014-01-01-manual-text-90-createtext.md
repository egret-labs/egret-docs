---
layout: post
title:  "创建文本"
permalink: post/manual/text/createtext.html
type: manual
element: manualtext
version: Egret引擎 v1.x
---

在Egret中，我们有三种类型的文本可以选择，分别为“普通文本”，“输入文本”和“位图文本”。
这些不同类型的文本在不同的场景下使用。对于不同类型的文本，其操作方式可能会有所不同。三种类型的文本特点如下：

* 普通文本：能够正常的显示各种文本，文本内容可以被程序设置，最为常见的文本类型。
* 输入文本：可以被用户输入的文本，常用于登陆中的输入框或者游戏中的聊天窗口。
* 位图文本：使用位图文字来渲染的文本，常用于游戏中需要加特殊字体效果的文本。

这篇文档中，我们以普通文本为例，介绍如何创建一个文本对象。

创建普通文本，我们可以直接创建一个 `TextField` ，并设置一些相关的属性，来控制我们的文本样式。我们添加如下代码：

{% highlight java linenos %}
var label:egret.TextField = new egret.TextField();
label.text = "这是一个文本";
this.addChild( label );
{% endhighlight %}

编译运行后效果如下：

![img]({{site.baseurl}}/assets/img/manualtext1.png)

我们来讲解一下这段代码，当我们创建一个 `TextField` 对象后，我们拥有了一个**“普通文本”**对象。这个文本对象在创建之初并没有任何
显示内容。而显示内容来自 `text` 属性。所以我们在第二行对文本内容进行了设置。也就是下面这句话：

{% highlight java linenos %}
label.text = "这是一个文本";
{% endhighlight %}

我们的内容设置为 “这是一个文本”。

由于 `TextField` 也继承自 `DisplayObject` （
你可以参考<a href="http://docs.egret-labs.org/post/manual/display/displayclass.html" target="_blank">显示对象种类</a>
这篇文档，了解显示对象继承关系）,我们可以直接将 `TextField` 对象添加到显示列表中，如下面代码：

{% highlight java linenos %}
this.addChild( label );
{% endhighlight %}

作为一个显示对象应该有它自身的宽度与高度。那么刚才我们看到的文本它的宽高是多少呢？

为了找到我们的答案，我们在程序中继续编写代码：

{% highlight java linenos %}
console.log( label.width + "+" + label.height);
{% endhighlight %}

我们再次编译运行，在打开的浏览器中我们开启JavaScript控制台，效果如下：

![img]({{site.baseurl}}/assets/img/manualtext2.png)

我们在控制台中看到当前文本的宽度为`100`像素，高度为`30`像素。

事实上，我们的TextField对象默认宽高并非为`100*30`，当一个TextField被赋予一个文本的时候，TextField会自动计算出适合的大小。
这个“适合的大小”指的是“能够将当前文本全部显示出来的大小”。

我们将刚才文本中的文字改变一下，代码如下：

我们通过在文本中添加多个换行符`\n`，让刚才的文本从横向排列变为纵向排列。
编译并运行，效果如下：

![img]({{site.baseurl}}/assets/img/manualtext3.png)

此时我们看到，这个文本的宽度变为了 `30`像素，高度变为了`180`像素。

但值得注意的是，文本的宽度和高度取决于第一次 `text` 属性值的内容，也就是说，当文本内容发生变化后，文本的宽高将不再自动计算
出合适的大小。我们通过对程序的修改来验证这一效果。


{% highlight java linenos %}
var label:egret.TextField = new egret.TextField();
this.addChild( label );
label.text = "这\n是\n一\n个\n文\n本";
console.log( label.width + "+"+ label.height);
label.text = "这是一个文本";
console.log( label.width + "+"+ label.height);
{% endhighlight %}

编译并运行，效果如图：

![img]({{site.baseurl}}/assets/img/manualtext4.png)

我们可以看到，第一次文本的宽高值为 `30*180`，而第二次的宽高值仍为 `30*180`。文本宽高并未因文本内容改变而改变。

前面我们看到的都是让TextField自动计算宽高，但在实际开发中，我们并不希望这种“失控”情况发生。我们可以在设置为本之前，手动
设置文本的宽高值。具体代码如下：

{% highlight java linenos %}
var label:egret.TextField = new egret.TextField();
this.addChild( label );
label.width = 70;
label.height = 70;
label.text = "这\n是\n一\n个\n文\n本";
console.log( label.width + "+"+ label.height);

label.text = "这是一个文本";
console.log( label.width + "+"+ label.height);
{% endhighlight %}

编译并运行，效果如图：

![img]({{site.baseurl}}/assets/img/manualtext5.png)

我们可以从JavaScript控制台中看到输出内容，两次宽高值均为`70`。

同时，我们发现，由于第二次设置文本内容为一整行内容，但是文本却变成了两字为一行的排版样式。这是因为，默认情况下，文本排列会
自动换行，如果我们不对文本做任何的样式设置，那么一个汉字的宽高为`30`像素。我们设置为本为`70`像素宽度，最多只能横向排列两个
汉字，所以会看到如上图的排版样式。