TextField本身可以响应Touch事件。但这是针对整个TextField的。
有时有这样的需求：在一大段文字中，有某一段儿需要作为热区，响应Touch事件。我们可以通过对该段文字设置href来实现，类似于html中的`href`。我们通过如下代码来学习这个功能：

```
class textEventDemo extends egret.DisplayObjectContainer {
    constructor() {
        super();
        var tx:egret.TextField = new egret.TextField;
        tx.textFlow = new Array<egret.ITextElement>(
            { text:"这段文字有链接", style: { "href" : "event:text event triggered" } }
            ,{ text:"\n这段文字没链接", style: {} }
        );
        tx.touchEnabled = true;
        tx.addEventListener( egret.TextEvent.LINK, function( evt:egret.TextEvent ){
            console.log( evt.text );
        }, this );
        tx.x = 10;
        tx.y = 90;
        this.addChild( tx );
    }
}
```

首先，使用该功能需要设置文本的 textFlow 而非 text。

其中 href 属性的内容以 event: 开头，后边跟随一个字符串，用于输出相应的文字或用于识别包含该链接的文字段。
然后侦听 TextEvent.LINK 事件，在事件处理函数中通过事件对象的 text 属性来获取该段文字所设置的字符串。

编译运行，打开 console ，当点击上一行文字时，console 即会输出 text event triggered。而点击下一行文字，就不会有任何反应。

### 打开 URL 

> 适用于 Egret 2.5 以后的引擎。

将上面的 href 对应的字符串修改为 url 即可打开相应的 url。下面代码即可打开 Egret 的首页。

修改的代码如下：

```
tx.textFlow = new Array<egret.ITextElement>(

    { text:"这段文字有链接", style: { "href" : "http://www.egret.com/" } }

    ,{ text:"\n这段文字没链接", style: {} }

);
tx.touchEnabled = true;
```
点击上面的有链接的文字效果如下：

![](569c85528f453.png)

![](569c8552dd0b0.png)
