---
layout: post
title:  "弹出确认"
permalink: post/guimanual/usecontrol/alert.html
type: guimanual
element: usecontrol
version: Egret引擎 v1.x        特别鸣谢<a href="https://github.com/NeoGuo/" target="_blank">郭少瑞</a>同学撰写此文档
---

还记得JavaScript中的alert吗？用这种方式给用户一个提醒，虽然简单粗暴了一点，但毕竟这样的实现难度是最低的。在Egret GUI中，也提供了Alert的支持。示例：

{% highlight java  %}
egret.gui.Alert.show("您还没有登录!","提醒",this.closeHandler);
private closeHandler(evt:egret.gui.CloseEvent):void {
    console.log("用户关闭了提醒");
}
{% endhighlight %}

实现效果：

![github]({{site.baseurl}}/assets/img/alert1.png "Egret")

![github]({{site.baseurl}}/assets/img/alert2.png "Egret")

上面的情况适用于仅仅是提醒，不需要用户选择。如果希望显示两个按钮，实现"确认|取消"这样的功能呢？也是可以的，修改show的参数即可：

{% highlight java  %}
egret.gui.Alert.show("您还没有登录,是否登录?","提醒",this.confirmHandler,"OK","Cancel");
private confirmHandler(evt:egret.gui.CloseEvent):void {
    if(evt.detail==egret.gui.Alert.FIRST_BUTTON) {
        console.log("用户点击了OK");
    } else {
        console.log("用户点击了Cancel");
    }
}
{% endhighlight %}

> 通过访问事件的detail属性，就可以知道用户点击了哪个按钮

实现效果：

![github]({{site.baseurl}}/assets/img/alert3.png "Egret")

![github]({{site.baseurl}}/assets/img/alert4.png "Egret")

> 如果需要为Alert指定皮肤，需要通过Alert.show()方法返回一个实例，然后设置实例的skinName