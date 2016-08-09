## JSON方式分段设置样式

前面的几节分别说明如何设置一个TextField实例的某种属性。

但实际情况，往往需要在一段文字，甚至一行文字内有丰富的样式变化来突出不同文字的含义提高语句的可读性、或者给简单的文字较强的表现力，就像HTML所擅长的一样，坊间通常称之为 Rich Text 。

HTML在渲染文本方面的强大。我们要做的也许没有HTML渲染文本的那么完整的功能，但我们却在易用性方面做出很大的努力，可以说类似CSS样式的方式，但编写代码的角度来看，比CSS更简单易用。

因为在js代码中设置样式与CSS代码中同样的样式还具有不同的关键字，这无疑增加了某种混乱的因素，也是很多程序员讨厌CSS的一个原因吧！

Egret引擎无疑在这方面更受开发者喜爱，因为设置样式的关键字，跟直接设置对应属性的关键字是完全一致的！稍后会有详细说明。

废话说到这里，先给出结果，看看我们的多种样式文本混合功能所能达到的效果：

![](56615eef58d27.jpg)

图1 一段样式丰富的文本

这样似显零乱但足够丰富的效果对大多数文本显示的需求，应该够用了吧！那么接下来，一步步看，我们怎么组装起来的！

首先，基本思路，就是只要把文本按照样式差异分成若干段的文本元素，分别设定每一段文本元素的样式，最后将这些元素依次排列在一个数组中即可。

下面这个最简易的结构，就是建立多种样式混合文本的基本结构`ITextElement`：

```
interface ITextElement {
     text: string;
     style: ITextStyle; 
}
```

而其中的ITextStyle也没有复杂的内容，就是你所需要定义的各种样式属性的集合，以Object的样式给出，这个Object里的每个元素就是一种样式属性的键值对定义，例如定义文本颜色为红色，那么这个Object就是：

```
{"textColor":0xFF0000}
```

`style`属性里，可以包含若干这样的样式组合定义。 内部结构了解清楚了，那尝试一个最简单的组合，给一段文字定义一个红色、字号30样式的代码：

```
var tx:egret.TextField = new egret.TextField;

tx.textFlow = <Array<egret.ITextElement>>[ 

    { text:"Egret", style:{"textColor":0xFF0000, "size":30} }

];

this.addChild( tx );
```

那一段带样式文本的写法已经简易而明了。要实现我们图1中的效果，也非常容易了：

```
var tx:egret.TextField = new egret.TextField;
tx.width = 400;
tx.x = 10;
tx.y = 10;
tx.textColor = 0;
tx.size = 20;
tx.fontFamily = "微软雅黑";
tx.textAlign = egret.HorizontalAlign.CENTER;
tx.textFlow = <Array<egret.ITextElement>>[
    {text: "妈妈再也不用担心我在", style: {"size": 12}}
    , {text: "Egret", style: {"textColor": 0x336699, "size": 60, "strokeColor": 0x6699cc, "stroke": 2}}
    , {text: "里说一句话不能包含各种", style: {"fontFamily": "楷体"}}
    , {text: "五", style: {"textColor": 0xff0000}}
    , {text: "彩", style: {"textColor": 0x00ff00}}
    , {text: "缤", style: {"textColor": 0xf000f0}}
    , {text: "纷", style: {"textColor": 0x00ffff}}
    , {text: "、\n"}
    , {text: "大", style: {"size": 36}}
    , {text: "小", style: {"size": 6}}
    , {text: "不", style: {"size": 16}}
    , {text: "一", style: {"size": 24}}
    , {text: "、"}
    , {text: "格", style: {"italic": true, "textColor": 0x00ff00}}
    , {text: "式", style: {"size": 16, "textColor": 0xf000f0}}
    , {text: "各", style: {"italic": true, "textColor": 0xf06f00}}
    , {text: "样", style: {"fontFamily": "楷体"}}
    , {text: ""}
    , {text: "的文字了！"}
];
this.addChild( tx );
```

注意，换行直接用 "\n" 即可。

## 类HTML方式设置样式

有些开发者习惯用HTML来设置文字的样式，我们也提供了这种方式，目前支持的标签有`b`和`i`，支持的font标签属性有`color`、`size`、`face`。
```
var tx:egret.TextField = new egret.TextField;
// 注意_container是事先建立好的一个显示容器，即 egret.DisplayObjectContainer，并且已经添加到显示列表中
tx.width = this._container.stage.stageWidth - 20;
tx.textFlow = (new egret.HtmlTextParser).parser(
    '没有任何格式初始文本，' +
    '<font color="#0000ff" size="30" fontFamily="Verdana">Verdana blue large</font>' +
    '<font color="#ff7f50" size="10">珊瑚色<b>局部加粗</b>小字体</font>' +
    '<i>斜体</i>'
);
tx.x = 10;
tx.y = 90;
this._container.addChild( tx );
```
将得到与JSON方式设置样式类似的结果.

