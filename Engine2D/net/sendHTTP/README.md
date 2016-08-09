在 Egret 项目中，通常会遇到与后端服务器进行数据交互的情况。Egret 中封装了 XMLHttpRequest 来进行异步的数据交互。

### HTTP请求

通过 HTTP 协议可以实现 HTTP 客户端（如web浏览器）向 HTTP 服务端请求信息和服务。目前的 HTTP 1.1 协议是一种无状态协议，也就是说 HTTP 客户端和 HTTP 服务端不能保持持久的链接，使用请求/应答的模式来工作，如果客户端向服务端发送信息，服务端做出应答之后将关闭链接，来形成一套请求和应答。

#### 基本过程

HTTP 通信机制都要经过如下的几个步骤：

1. 建立TCP连接.
1. Web浏览器向Web服务器发送请求命令.
1. Web浏览器发送请求头信息
1. Web服务器应答
1. Web服务器发送应答头信息
1. Web服务器向浏览器发送数据
1. Web服务器关闭TCP连接(如果请求头部设置了`Connection:keep-alive`将保持连接状态仍然打开).

#### HTTP 请求方法 

##### GET 方法

GET 方法是 HTTP　请求的默认方法，数据经过简单的编码发送出去，并作为 URL 的一部分发送到服务器。由于浏览器对 URL 长度的限制，提交的 数据长度也有限制。

##### POST 方法

POST 方法克服了 GET 方法的一些缺点，可以发送较大的数据.数据也不再是明文发送的。出于安全的考虑一般选用 POST 方法。 POST 提交的数据也可以从标准输入输出流中获取。

### 发送请求

在测试发送请求之前先要有一个稳定的服务端进行测试，我们可以使用[httpbin.org](http://httpbin.org/)提供的`http://httpbin.org/get`和`http://httpbin.org/post`这两个稳定的服务器地址来测试发送请求。其中[get](http://httpbin.org/get)会返回 GET 请求的数据，[post](http://httpbin.org/post)会返回 POST 请求发送的数据。

Egret 使用`HttpRequest`类发送 HTTP 请求。可以指定请求的方法为 GET 或者 POST 。可以通过监听加载事件来检测服务器端的响应。使用 `HttpRequest` 来发送请求的过程如下:

1. 实例化一个 `HttpRequest` 对象。
1. 设置它的响应类型`responseType`。
1. 通过`open`方法初始化请求一个对象，初始化请求地址和请求类型。
1. 通过`setRequestHeader`设置请求头信息。如果是POST带参数的请求这一步很重要,需要告诉服务端请求的参数格式，而且这一步需要在`open`之后执行。
1. 通过`send`方法发送请求，如果是`post`方法可以传入参数。
1. 添加监听，监听服务器端的响应，包括进度事件和请求成功和失败事件。


下面可以具体看一段下代码:

```
var request = new egret.HttpRequest();
request.responseType = egret.HttpResponseType.TEXT;
request.open("http://httpbin.org/get",egret.HttpMethod.GET);
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
request.send();
request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
```

上面发送了一个 GET 请求到`http://httpbin.org/get`，然后需要我们添加回调事件，当请求成功或者失败之后来获取数据。

通过`COMPLETE`事件的`response`属性来获取到返回的信息。通过 `ProgressEvent` 事件的`bytesLoaded`和`bytesTotal`来获取到加载进度。下面添加回调函数：

```
private onGetComplete(event:egret.Event):void {
    var request = <egret.HttpRequest>event.currentTarget;
    console.log("get data : ",request.response);
    var responseLabel = new egret.TextField();
    responseLabel.size = 18;
    responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
    this.addChild(responseLabel);
    responseLabel.x = 50;
    responseLabel.y = 70;
}

private onGetIOError(event:egret.IOErrorEvent):void {
    console.log("get error : " + event);
}

private onGetProgress(event:egret.ProgressEvent):void {
    console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
}
```

跟发送 GET 请求类似,发送 POST 请求的代码如下:

```
var request = new egret.HttpRequest();
request.responseType = egret.HttpResponseType.TEXT;
//设置为 POST 请求
request.open("http://httpbin.org/post",egret.HttpMethod.POST);
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
request.send();
request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
```

添加回调函数：

```
private onPostComplete(event:egret.Event):void {
    var request = <egret.HttpRequest>event.currentTarget;
    console.log("post data : ",request.response);
    var responseLabel = new egret.TextField();
    responseLabel.size = 18;
    responseLabel.text = "POST response:\n" + request.response.substring(0, 50) + "...";
    this.addChild(responseLabel);
    responseLabel.x = 300;
    responseLabel.y = 70;
}

private onPostIOError(event:egret.IOErrorEvent):void {
    console.log("post error : " + event);
}

private onPostProgress(event:egret.ProgressEvent):void {
    console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
}
```

### 发送带参数的请求

上面我们发送了一段空的请求到服务端，实际使用过程中一般都需要发送带参数的数据到服务端。首先来看一下我们发送数据的格式。在 HTTP 客户端，我们发送的数据一般以`key`和`value`的形式组成，多个数据之间用`=`相连。拼接之后形成如下的形式:

```
key1=value1&key2=valueP2
```

通过 GET 方法发送的参数会加到 URL 的后面拼接起来，所以参数以`?`分隔。POST 方法发送的参数需要先设置 HTTP 请求的头信息，告诉服务端是以什么样的形式来发送的数据。我们最常用的就是`application/x-www-form-urlencoded`,表示我们以`key`和`value`方式来格式化参数。服务端也可以用同样的方法来取到参数。

#### 服务端获取参数配置

下面以 PHP 为例来简要说明发送和或取参数的基本过程。

> PHP 环境配置请自行配置。其他后端语言同理。如果不使用`key`和`value`的方式获取数据，请参考相应语言的标准输入流的方式来获取。

首先建立`get_testphp`文件，在 PHP 中获得 GET 的参数可以通过一个全局数组`$_GET[]`来获取到。下面代码将获取并返回`key`为`p1`和`p2`的参数的值。

```
<?php
     echo $_GET['p1'];
     echo $_GET['p2'];
?>```

同理建立`post_test.php`,在 PHP 中通过全局数组`$_POST[]`来获取参数。下面代码将获取并返回`key`为`p1`和`p2`的参数的值。
```
<?php
     echo $_POST['p1'];
     echo $_POST['p2'];
?>```

####  客户端发送参数

我们已经建立了两个 PHP 文件，下面向他们来发送参数。

首先是 GET 请求，GET 请求需要将参数拼接到 URL 后面来实现。其中 URL 和 参数之间需要用 `?` 来链接。修改上面 GET 请求相应代码如下:

```
//拼接参数 
var params = "?p1=getP1&p2=getP2";
var request = new egret.HttpRequest();
request.responseType = egret.HttpResponseType.TEXT;
//将参数拼接到url
request.open("php/get_test.php"+params,egret.HttpMethod.GET);
request.send();
```

发送 POST 请求. 需要注意的是发送 POST 请求需要将参数放到`send`方法的参数中发送出去。并且要设置其响应头，在我们的例子中使用`key` `value` 的方式来格式化参数，这里需要设置响应头`Content-Type`为`application/x-www-form-urlencoded`。修改上面 POST 请求相应代码如下:

```
//拼接参数
var params = "p1=postP1&p2=postP2";

var request = new egret.HttpRequest();
request.responseType = egret.HttpResponseType.TEXT;
request.open("php/post_test.php",egret.HttpMethod.POST);
//设置响应头
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//发送参数
request.send(params);
```

完整代码如下:

```
/**
 * 下面的示例使用 egret.HttpRequest 类进行网络通信。
 */
class Main extends egret.DisplayObjectContainer {

    private statusGetLabel:egret.TextField;
    private statusPostLabel:egret.TextField;

    public constructor() {
        super();
        this.sendGetRequest();
        this.sendPostRequest();
    }

    private sendGetRequest():void {
        var statusGetLabel = new egret.TextField();
        this.statusGetLabel = statusGetLabel;
        statusGetLabel.size = 18;
        statusGetLabel.text = "GET request being sent to httpbin.org";
        this.addChild(statusGetLabel);
        statusGetLabel.x = 50;
        statusGetLabel.y = 40;
        var params = "?p1=getP1&p2=getP2";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("php/get_test.php"+params,egret.HttpMethod.GET);
        request.send();

        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }

    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ",request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 50;
        responseLabel.y = 70;
        this.statusGetLabel.text = "Get GET response!";
    }

    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log("get error : " + event);
    }

    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }

    private sendPostRequest() {
        var statusPostLabel = new egret.TextField();
        this.statusPostLabel = statusPostLabel;
        this.addChild(statusPostLabel);
        statusPostLabel.size = 18;
        statusPostLabel.x = 300;
        statusPostLabel.y = 40;
        statusPostLabel.text = "Sending POST request to httpbin.org";

        var params = "p1=postP1&p2=postP2";

        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("php/post_test.php",egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(params);
        request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);

    }

    private onPostComplete(event:egret.Event) {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("post data : ",request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "POST response:\n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 300;
        responseLabel.y = 70;
        this.statusPostLabel.text = "Get POST response!";
    }

    private onPostIOError(event:egret.IOErrorEvent):void {
        console.log("post error : " + event);
    }

    private onPostProgress(event:egret.ProgressEvent):void {
        console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }
}
```















