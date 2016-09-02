字体通常是一件非常麻烦的事情，设计师通常为了画面的灵魂来选择不同的艺术字体，碰巧这些字体都不会存在于客户的操作系统中。

如果你在文本中设置了一个非常特殊的字体，那么很有可能其他人看到的则是系统默认字体，为了让所有用户有统一的视觉效果，我们尽可能的选择机器中均存在的字体。

## 

设置字体的属性是 fontFamily，我们在设置时，只需要将是用的字体名填写进去即可。

示例代码如下：

```
var label:egret.TextField = new egret.TextField();

this.addChild( label );

label.width = 70;

label.height = 70;

label.fontFamily = "KaiTi";

label.text = "这是一个文本";
```

编译并运行，效果如下：

![](56615cbcdc3dc.png)

需要注意的是字体名称，上面的字体名设置的为 “KaiTi” 实际上就是我们常用的楷体，如果设置的字体浏览器/app不存在，浏览器/app会自动调用默认字体来代替。


## 少量常用字体对应表

中文名称 | font-family
:-----------: |:-----------:
宋体| SimSun
黑体 |SimHei
微软雅黑 |Microsoft YaHei
微软正黑体| Microsoft JhengHei
新宋体 |NSimSun
新细明体 |PMingLiU
细明体| MingLiU
标楷体| DFKai-SB
仿宋 |FangSong
楷体 |KaiTi
仿宋_GB2312| FangSong_GB2312
楷体_GB2312 |KaiTi_GB2312