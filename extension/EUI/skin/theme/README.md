在[皮肤部件](../part/README.md)一节中介绍了如何将皮肤设置到逻辑组件上。但如果有一个全局通用的默认皮肤，我们需要每次实例化组件时都赋值一次皮肤，这样比较麻烦。因此我们提供了一个主题机制，能够让您为指定的组件配置默认皮肤，全局指定一次即可，之后直接实例化组件，不再需要显式设置组件的skinName属性。

## 配置主题

下面是一个主题配置文件的例子：

default.thm.json:

```javascript
{
	"skins": {
		"eui.Panel": "resource/eui_skins/PanelSkin.exml",
		"eui.ProgressBar": "resource/eui_skins/ProgressBarSkin.exml",
		"eui.ItemRenderer": "resource/eui_skins/ItemRendererSkin.exml"
	},
	"autoGenerateExmlsList": true,
	"exmls": [
		"resource/eui_skins/ItemRendererSkin.exml",
		"resource/eui_skins/PanelSkin.exml",
		"resource/eui_skins/ProgressBarSkin.exml"
	]
}
```

主题配置文件就是一个标准的JSON文件，

* `skins` 指定组件的默认皮肤，其中键是组件的类名，值是需要赋值给这个组件skinName属性的值。可以是exml文件路径，也可以是EXML文件上注册的类名（根节点上的class属性）。
   
* `exmls` 表示需要主题预加载的 EXML 文件列表。Theme 文件加载之后，它会优先加载这个列表中的EXML文件，由于 EXML 可能会存在相互依赖，所以 Theme 会**按照列表中的顺序**编译 EXML。可以监听 `egret.Event.COMPLETE` 来确认该列表中的EXML已经加载完成。

* `autoGenerateExmlsList` 表示是否需要使用命令行工具自动生成 EXML 列表。


这里需要注意的是，引擎只会识别 `xxx.thm.json` 文件作为 theme 文件.

## 启用主题

创建一个 EUI 项目，里面会自动配置好相关参数：

```javascript
//注入自定义的素材解析器
let assetAdapter = new AssetAdapter();
egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

...
let theme = new eui.Theme("resource/default.thm.json", this.stage);

```

创建了Theme之后，它会开始异步加载指定的主题文件并解析，在加载的过程中，如果已经有组件在创建，也不需要额外处理，这部分组件在主题加载完成后会自动重新查询一次默认皮肤。

特别注意，主题配置文件只是起到设置默认值的作用，并不能运行时切换所有默认皮肤。因为这么做需要遍历整个显示列表，开销较大。
