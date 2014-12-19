---
layout: post
title:  "与GUI系统无缝桥接"
permalink: post/manual/loader/resgui.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

RES资源加载模块的基本思路就是通过一个简短的唯一字符串，映射一个长url，文件类型以及其他参数。这样我们可以只需要一个字符串短名，其他的初始化和参数配置都无需关心。此方案的另一个优势在于，隔离了具体的url，当需要制作多语言版本的资源时，只需要换一个配置文件，把url映射到其他文件，代码里引用的name字符串都无需修改。

RES资源管理模块中，没有预加载的资源仍需异步回调的方式获取。Egret提供了一套额外的方案，将RES注入到GUI的UIAsset解析器里，屏蔽掉所有异步加载的细节。

具体操作如下：

实现一个自定义的素材解析器AssetAdapter

{% highlight java linenos %}
class AssetAdapter implements egret.IAssetAdapter{
    public getAsset(source:any,compFunc:Function,thisObject:any,oldContent:any):void{
        var content:any = source;
        if(source.prototype){
            content = new source();
        }
        if(content instanceof egret.DisplayObject||content instanceof egret.Texture){
            compFunc.call(thisObject,content,source);
        }
        else if(typeof(source)=="string"){
            if(RES.hasRes(source)){
                RES.getResAsync(source,onGetRes,this);
            }
            else{
               RES.getResByUrl(source,onGetRes,this);
            }
            function onGetRes(data:any):void{
                compFunc.call(thisObject,data,source);
            }
        }
        else{
            compFunc.call(thisObject,content,source);
        }
    }
}
{% endhighlight %}

这个示例中，最核心的语句`RES.getResAsync(source,onGetRes,this);`。

若传入的source是字符串，就调用RES去解析这个字符串,并回调结果。

接下来在GUI初始化前加上`egret.Injector.mapClass("egret.IAssetAdapter",AssetAdapter);`，把我们自定义的AssetAdapter注入到框架内：

完成注入后，我们可以忽略异步加载过程。要显示一个位图，可以这样写：

{% highlight java linenos %}
var sky:egret.gui.UIAsset = new egret.gui.UIAsset();
sky.source = "bgImage";
{% endhighlight %}

显示一个SpriteSheet里的一张子位图：

{% highlight java linenos %}
var icon:egret.gui.UIAsset = new egret.gui.UIAsset();
icon.source = "icons.activity_10";
{% endhighlight %}

开发者无需关心加载过程，不用写任何回调监听。直接把这个显示对象加到显示列表即可。