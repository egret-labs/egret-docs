网络传输协议中存在多种请求方法，在HTTP/1.1协议中共定义了八种方法（也叫“动作”）来以不同的方式操作指定的资源。

Egret提供的网络操作中，封装了其中两种方法，这两种方法也是我们最常见最常用的方法。

1. POST：向指定资源提交数据，请求服务器进行处理（例如提交表单或者上传文件）。数据被包含在请求本文中。这个请求可能会创建新的资源或修改现有资源，或二者皆有。

1. GET：向指定的资源发出“显示”请求。使用GET方法应该只用在读取数据，而不应当被用于产生“副作用”的操作中。

所有的“动作”都被封装到了 `URLRequestMethod` 这个类中。默认使用的“动作”是GET。如果我们修改“动作”，可以设置 `URLRequest` 中的 `method` 属性。

具体代码如下：
```
var urlreq:egret.URLRequest = new egret.URLRequest();

urlreq.method = egret.URLRequestMethod.POST;
```