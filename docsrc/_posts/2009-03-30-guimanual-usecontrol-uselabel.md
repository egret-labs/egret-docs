---
layout: post
title:  "文本"
permalink: post/guimanual/usecontrol/uselabel.html
type: guimanual
element: usecontrol
version: Egret引擎 v1.x        特别鸣谢<a href="https://github.com/NeoGuo/" target="_blank">郭少瑞</a>同学撰写此文档
---

文本组件很常用，在Egret GUI中对应的类是egret.gui.Label，使用方式也非常简单，比如下面的例子：

{% highlight java linenos %}
//假设this是一个egret.Sprite
var label:egret.gui.Label = new egret.gui.Label();
label.text = "我是地球人";
this.addChild(label);
{% endhighlight %}

得到的效果：
![github]({{site.baseurl}}/assets/img/label1.png "Egret")

如上所示，Egret GUI与普通的Egret显示对象容器相兼容，您可以把一个GUI组件，添加到Sprite里面，这样是没问题的，可以显示。但是，除非有特殊需求，我们还是建议您将GUI组件放置在egret.gui.UIStage里面。修改上面的例子：

{% highlight java linenos %}
this.uiStage = new egret.gui.UIStage();
this.addChild(this.uiStage);
var label:egret.gui.Label = new egret.gui.Label();
label.text = "我是地球人";
this.uiStage.addElement(label);
{% endhighlight %}

UIStage的作用，类似于原先Flex中的SystemManager，我们称之为系统管理器，它是应用程序的顶级容器，通常情况下，应保证它的唯一性，即只使用一个UIStage的实例，其它组件都包含在它的内部。放在UIStage里面，组件就处于托管之下，可以使用居中等布局特性，这个在后面的教程我们会涉及。目前您只需要记住，尽量把UIStage作为您的根容器就可以了，它的特性您在后面的使用过程中就会慢慢了解。

回到文本的这个例子，上面这是设置了它的显示文字，您还可以修改样式，实现不同的显示效果：

{% highlight java linenos %}
label.fontFamily = "Tahoma";//设置字体
label.textColor = 0xFFFFFF;//设置颜色
label.size = 35;//设置文本字号
label.bold = true;//设置是否加粗
label.italic = true;//设置是否斜体
label.textAlign = "left";//设置水平对齐方式
label.verticalAlign = "top";//设置垂直对齐方式
label.lineSpacing = 2;//行间距
{% endhighlight %}

Label既可以显示单行文本，也可以显示多行文本。当您为Label设定了宽度，并且文字过长的时候，会自动换行，并且您还可以控制最多显示的行数。示例：

{% highlight java linenos %}
label.width = 200;
label.height = 30;
label.text = "很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字";
label.maxDisplayedLines = 2;//最大行数
{% endhighlight %}

如果想让文字和边框之间有一些距离(一般是为了从美观的角度考虑，改善显示效果)，可以使用padding设定：

{% highlight java linenos %}
label.padding = 30;
{% endhighlight %}

上面的设定，会让文本和4个方向的边框(上下左右)保持30像素的距离。如果您希望单独控制某一边的padding值，可以这样单独设定：

{% highlight java linenos %}
label.paddingLeft = 20;
label.paddingRight = 40;
label.paddingTop = 20;
label.paddingBottom = 40;
{% endhighlight %}

### 输入文本
Label不具备输入功能，如果要输入文本，请使用[egret.gui.EditableText](https://github.com/egret-labs/egret-core/blob/39bb7ec1a7abf51029bc2e53a7d02f41590bd946/src/extension/gui/components/EditableText.ts)。