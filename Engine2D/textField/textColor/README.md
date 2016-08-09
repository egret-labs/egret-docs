在Egret中，默认文本的颜色为白色。我们依然可以通过代码来修改文本颜色，使用的属性也非常简单。 我们可以通过 textColor 来修改TextField对象中文本的颜色。 具体代码如下：

```
var label:egret.TextField = new egret.TextField();
this.addChild( label );
label.width = 70;
label.height = 70;
label.textColor = 0xff0000;
label.text = "这是一个文本";
```

编译并运行，效果如下：

![](56615c9349082.png)

当我们将 `textColor` 属性设置为 `0xff0000` 的时候，文本变为了红色。

`textColor` 可以接受一个16进制的颜色值，也可以接受其他进制的数字。但我们推荐是用16进制。通常情况下，16进制都被用于表示颜色。

