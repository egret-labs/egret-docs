打开资源配置文件 resource.json ，你可以看到里面的资源文件都有一个 type 类型，
~~~
	{
		"name":"mc_png",
		"type":"image",
		"url":"assets/mc.png"
	},
	{
		"name":"big_json",
		"type":"json",
		"url":"assets/big.json"
	}
~~~
我们可以根据 type 类型自定义它的解析器。 使用下面这个方法
~~~
RES.registerAnalyzer(type:string, analyzerClass:any)
~~~

比如我们要解析一个自定义的 type 为 demo 类型的文件，解析类是一个你自己写的 DemoAnalyzer 类，那么我们只需要像下面这么写就这可以了。
~~~
RES.registerAnalyzer("demo", DemoAnalyzer);
~~~
~~~
2.4之前的版本中对应的方法为:
egret.Injector.mapClass(RES.AnalyzerBase, DemoAnalyzer, "demo")
~~~

当RES加载完文件后，发现它的类型是 demo，就会调用你的 DemoAnalyzer 方法来解析它。

注意，这种方式会替换掉默认的内置解析器，所以如果没有特殊需求，尽量不要替换默认的类型。

默认的内置解析类型可以在 RES.ResourceItem 中找到。
