---
layout: post
title:  "hack微信半屏问题"
permalink: post/manual/adaptive/wx-half-screen-solution.html
type: manual
element: adaptive
version: Egret引擎 v1.x
---

>本教程适用于 Egret 1.1+ 版本，请在阅读本教程之前，使用 ``` egret info ``` 命令确认您的版本号。      
              
微信对webview进行了某种定制，使得有些情况下页面在手机浏览器正常显示，但在微信里却可能显示不全。        
                
这边给出一个hack的解决方案，由于这个解决方案与现有认知差距比较大，因此暂未在引擎内解决。方法：      
              
**1.** 在现有的Egret项目中搜索HTML5CanvasRenderer.js。用文本编辑器打开该文件，修改clearRect方法定义为：
              
{% highlight java %}
HTML5CanvasRenderer.prototype.clearRect = function (x, y, w, h) {
    this.canvasContext.clearRect( x, y, w * window.devicePixelRatio, h * window.devicePixelRatio );
};
{% endhighlight %}
           
**2.** 修改 launcher/release.html结尾处的`egret_h5.startGame();`为：
           
{% highlight java %}
setTimeout( egret_h5.startGame, 800 );
{% endhighlight %}
           
>注意，因为引擎升级等原因重新编译引擎(egret build -e)后，需要重新做此修改！
      
         
