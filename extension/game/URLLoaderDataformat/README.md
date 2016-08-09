在网络通信中，我们有时候不仅仅会加载一个简单的文本数据，更多时候我们会加载一些图片资源音频资源等等。

在针对不同格式数据的请求中，我们需要制定不同的处理方式。上一小节中，我们处理了一个简单的网络请求，同时返回了一段文本。这里是最基本的 数据格式，也是默认使用的数据格式。在Egret中，我们提供了五种可用的数据格式，分别是：

1. 二进制格式

1. 文本格式

1. URL编码格式

1. 位图纹理格式

1. 音频格式。

以上五种数据格式的设置均需要 `URLLOaderDataFormat` 类。如果想更改默认的文本格式，可以修改 `URLLoader` 中的 `dataFormat` 属性。 具体示例代码如下：

```
class NetDemo extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private urlloader:egret.URLLoader;
    private onAddToStage(event:egret.Event)
    {
        this.urlloader = new egret.URLLoader();
        this.urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        var urlreq:egret.URLRequest = new egret.URLRequest();
        urlreq.url = "http://httpbin.org/headers";
        this.urlloader.load( urlreq );
        this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
    }
    private onComplete(event:egret.Event):void
    {
        console.log( this.urlloader.data );
    }
}   
```

注意下面这一行

```
this.urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
```

这一行中，我们对加载的数据格式进行了修改，这里我们将其设置为“URL编码”格式。

编译后运行，效果如图：

![](568b4313ae75c.png)