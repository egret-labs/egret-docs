Egret 加载资源主要使用 egret.HttpRequest 类。该类封装了在异步加载资源和通讯方面作为 H5 标准的 XMLHttpRequest 对象。

本节讲解的主要是加载静态文件，分为两种类型：文本和二进制数据。
加载静态文件的特点是可以进行进度跟踪。

#### 加载文本   

HttpRequest 对象最核心的方法就是 open() 和 send() 。  open 方法接收该请求所要访问的URL。 作为可选项还可以传入加载方式，这个参数通常用HttpMethod取常量即可，默认是最常用的 GET 方式。       
在加载完成时，通过HttpRequest 对象的 response 属性来获取返回的数据。    
首先从最简单的加载文本来看如何完成加载和获取数据的过程：   
``` TypeScript
var url = "resource/config/description.json";
var  request:egret.HttpRequest = new egret.HttpRequest();
        
var respHandler = function( evt:egret.Event ):void{
   switch ( evt.type ){
       case egret.Event.COMPLETE:
           var request:egret.HttpRequest = evt.currentTarget;
           console.log( "respHandler:n", request.response );
           break;
       case egret.IOErrorEvent.IO_ERROR:
           console.log( "respHandler io error" );
           break;
   }
}
        
var progressHandler = function( evt:egret.ProgressEvent ):void{
   console.log( "progress:", evt.bytesLoaded, evt.bytesTotal );
}

request.once( egret.Event.COMPLETE, respHandler, null);
request.once( egret.IOErrorEvent.IO_ERROR, respHandler, null);
request.once( egret.ProgressEvent.PROGRESS, progressHandler, null);
request.open( url, egret.HttpMethod.GET ); 
request.send( );
```
HttpRequest默认的加载类型是 TEXT ，因此不需要专门设定。
需要侦听的主要事件是 COMPLETE ，从这里来获取数据。   
当然也要考虑意外的情况，在 IO_ERROR 做这些情况的处理。
加载进度事件是 ProgressEvent.PROGRESS , 这在加载size较大的资源时比较有用。

#### 加载二进制   

``` TypeScript
var url = "resource/assets/egret_icon.png";
var  request:egret.HttpRequest = new egret.HttpRequest();
request.responseType = egret.HttpResponseType.ARRAY_BUFFER;

var respHandler = function( evt:egret.Event ):void {
   switch ( evt.type ){
       case egret.Event.COMPLETE:
           var request:egret.HttpRequest = evt.currentTarget;
           var ab:ArrayBuffer = request.response;
           console.log( "respHandler:n", ab.byteLength );
           break;
       case egret.IOErrorEvent.IO_ERROR:
           console.log( "respHandler io error" );
           break;
   }
}

request.once( egret.Event.COMPLETE, respHandler, null);
request.once( egret.IOErrorEvent.IO_ERROR, respHandler, null);
request.open( url, egret.HttpMethod.GET );
request.send( );
```
加载二进制数据，需要首先设置 HttpRequest 的加载类型为ARRAY_BUFFER。   
数据加载完成后可从 response 属性取到 ArrayBuffer 对象，即可进行进一步读取操作。  

>文档适用于 Egret 2.5 。通过 URLLoader 构建通信请求请访问：
[构建通信请求](http://edn.egret.com/cn/index.php/article/index/id/601)
URLLoader 类已移动到 game 扩展库中。