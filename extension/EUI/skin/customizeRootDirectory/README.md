### 默认加载

打开主题配置文件 ** default.thm.json **，你会看到类似下面这样的内容

~~~ typescript
{
  "skins": {
    "eui.Button": "resource/eui_skins/ButtonSkin.exml?v55",
    "eui.CheckBox": "resource/eui_skins/CheckBoxSkin.exml"
  },
  "exmls": [
    "resource/eui_skins/ButtonSkin.exml",
    "resource/eui_skins/CheckBoxSkin.exml"
  ]
}
~~~

在"exmls"这部分可以看到，exml 文件都是放在根目录的 resource 文件夹内的。
运行程序后，主题中的 "ButtonSkin.exml" 最终的加载位置如下所示

~~~ typescript
http://10.0.6.138:3000/resource/eui_skins/ButtonSkin.exml
~~~

### 自定义加载

如果你想改变 **resource **文件夹的位置，可以使用 **EXML.prefixURL = xxxx** 这个方法来实现。

举个例子：

~~~ typescript
EXML.prefixURL = "another/";//更改目录位置
var theme = new eui.Theme("resource/default.thm.json", this.stage);
theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
...
~~~

运行程序后，主题中的 "ButtonSkin.exml" 最终的加载位置如下所示

~~~ typescript
http://10.0.6.138:3000/another/resource/eui_skins/ButtonSkin.exml
~~~

这样就可以根据自己的需求来自定义 exml 文件的加载根目录了。


