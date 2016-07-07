有两种方式可测量和操作显示对象的大小：使用尺寸属性（width 和 height）或缩放属性（scaleX 和 scaleY）。

每个显示对象都有 width 属性和 height 属性，它们最初设置为对象的大小，以像素为单位。您可以通过读取这些属性的值来确定显示对象的大小。还可以指定新值来更改对象的大小，如下所示：
```  TypeScript
//设定对象的大小
mySprite.width = 50;
mySprite.height = 100;
```
更改显示对象的 height 或 width 会导致[缩放](http://edn.egret.com/cn/index.php/article/index/id/104)对象。