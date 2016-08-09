Egret对网络部分进行了封装，将网络访问请求与网络通信数据分离。在 “net” 文件夹中定义了与网络相关的五个类。分别为 `URLRequest`、 `URLLoader`、`URLLoaderDataFormat`、`URLRequestMethod` 和 `URLVariables`。

当我们需要创建一个网络连接的时候，我们需要创建一个 `URLLoader` 对象，该对象负责网络的连接状态操作， 同时负责接收网络回传的数据。网络通信时，需要的网络通信数据由 `URLRequest` 对象负责管理。

创建一个最简单通信请求我们需要使用 `URLLoader` 和 `URLRequest` 两个类。

```
private urlloader:egret.URLLoader;

this.urlloader = new egret.URLLoader();
```

在urlloader中你可以对网络通信进行操作，例如开始加载数据，检测数据加载进度或者数据加载是否完成。

在执行加载数据时，我们需要给入通信地址，一般为网址或者服务器后台地址。添加网络地址，需要 `URLRequest` 对象。 我们以“http://httpbin.org/user-agent”这个测试地址为例。代码如下：

```
var urlreq:egret.URLRequest = new egret.URLRequest();

urlreq.url = ;
```

上面代码创建一个 `URLRequest` 类型的对象，并且将我们的测试地址赋给名称为 `url` 的属性。下面我们就可以开始加载数据了。

加载数据的方法是 `load`，你可以将刚刚创建的 `URLRequest` 对象作为参数传递进去。

```
this.urlloader.load( urlreq );
```

此时编译运行不会看到任何效果，因为我们没有对网络通信的状态进行任何监听或响应处理。我们继续添加代码，对网络加载的 `COMPLETE` 事件 进行监听。当网络加载完成后，则调用对应的函数。

```
this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
private onComplete(event:egret.Event):void
{
    console.log( this.urlloader.data );
}
```

我们在事件响应函数中仅仅是将获取到的数据输出到JavaScript控制台中。

上面的内容完整源码如下：

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
        var urlreq:egret.URLRequest = new egret.URLRequest();
        urlreq.url = "http://httpbin.org/user-agent";
        this.urlloader.load( urlreq );
        this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
    }
    private onComplete(event:egret.Event):void
    {
        console.log( this.urlloader.data );
    }
}
```

编译并运行，效果如图：

![](568b42efcca3a.png)