---
layout: post
title:  "Hello World扩展阅读"
permalink: post/quitestart/helloworld/extension.html
type: quitestart
element: helloworld
version: Egret引擎 v1.x
---

在Hello World系列文章中，我们没有对代码进行任何修改。扩展阅读部分将展示如何在Egret项目中修改文档类，如何去添加性能监控面板，以及在JavaScript控制台打印“Hello World”字符。

####默认文档类
---

默认的程序文档类名称为**Main**，在项目文件夹中路径为`src/Main.ts`。当程序运行时，我们的游戏会从Main开始运行。通常情况下，我们会自己添加一个文档类，作为项目的文档类。

####创建文档类
---

创建一个文档类非常简单，但同时也要注意一些规则。我们在`src/`目录下创建一个名称为**"HelloWorld.ts"的文件。

>注意：TypeScript文件后缀名为.ts

在"HelloWorld.ts"中编写代码如下

{% highlight java linenos %}
class HelloWorld extends egret.DisplayObjectContainer
{	

}
{% endhighlight %}

这里需要注意一个非常重要的地方，在Egret中，文档类有且只有一个，同时文档类必须继承自`egret.DisplayObjectContainer`。如果文档类父类设置错误，则将会引发错误。

####检测舞台创建事件
---

Egret在创建时会加载默认的库文件与游戏逻辑，加载完成后会创建相应的运行环境。当一切环境创建工作完成后，Egret会向用户抛出一个名称为`ADDED_TO_STAGE`的事件，该事件表示当前舞台已经创建完毕。在文档类中，接收到此事件之后即可运行自己的游戏逻辑。具体代码如下：

>有关“事件”的详细文档，请参考<a href="http://docs.egret.com/post/manual/event/useevent.html" target="_blank">事件机制</a>

{% highlight java linenos %}
class HelloWorld extends egret.DisplayObjectContainer
{	
	public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {

    }
}
{% endhighlight %}

上面的代码中出现一个名称为`constructor`的函数。该函数是文档类的入口函数。简单的流程则是当游戏启动后，系统会寻找文档类，然后执行文档类中的`constructor`函数。

我们在`constructor`函数中对系统的`ADDED_TO_STAGE`的事件进行监测即可。当事件触发后，会执行`onAddToStage`函数。该函数由下面语句指定。

{% highlight java linenos %}
this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
{% endhighlight %}

####打开性能控制面板
---

我们在`onAddToStage`函数中添加相应代码来开启我们的监测面板，代码如下：

{% highlight java linenos %}
private onAddToStage(event:egret.Event)
{
   	egret.Profiler.getInstance().run();
}
{% endhighlight %}

####设置新的文档类
---
前面我们创建了新的文档类，如果想让新的文档类起效，我们还需要进行一步设置。这一步就是将原有文档类修改，修改为我们新创建的文档类。具体步骤如下：

1. 打开 `HelloWorld/egretProperties.json` 文件。
2. 找到第2行，`"document_class" : "Main"`。
3. 将其中的`Main`修改为现在文档类的名称，这里我们改为`HelloWorld`。
4. 修改完成之后保存文件。

####打包测试
---
这一步在<a href="{{site.baseurl}}/post/quitestart/helloworld/buildpro.html" target="_blank">编译项目</a>和<a href="{{site.baseurl}}/post/quitestart/helloworld/runpro.html" target="_blank">运行项目</a>已经描述过具体方法，再此不在赘述。

####性能面板
---
开启测试后，我们能在浏览器中看到如下效果。

![helloworld image]({{site.baseurl}}/assets/img/helloworldextension.png)

上图中性能指标分为三类：

1. draw：这里参数描述了当前画面渲染时候drawcall的次数
2. cost：包含四个参数，这四个参数分别为，EnterFrame阶段的开销，引擎updateTransform开销，引擎draw开销和HTML5中canvas.draw的开销。
3. FPS：当前画面的帧频。

####添加控制台打印
---
我们继续修改代码，添加控制台打印功能，最终效果会在JavaScript控制台中打印出“Hello World!”这样的语句。

代码添加在`onAddToStage`函数中，添加语句`console.log("Hello World!");`。修改后的函数如下：

{% highlight java linenos %}
private onAddToStage(event:egret.Event)
{
   	egret.Profiler.getInstance().run();
   	console.log("Hello World!");
}
{% endhighlight %}

再次编译并运行项目，看到效果如下：

![helloworld image]({{site.baseurl}}/assets/img/helloworldextension2.png)

我们需要打开浏览器的JavaScript控制台，在控制台中我们看到了“Hello World!”字样。

调试Egret方法请参考<a href="{{site.baseurl}}/post/manual/debug/chromedebug.html" target="_blank">【使用Chrome调试Egret】</a>。