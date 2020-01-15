## 5.1.2 以后的项目

* 使用引擎为 5.1.2 引擎以上(包括 5.1.2)按照文档流程发布即可。

## 5.1.2 以前的项目
由于目前的 5.0.x 引擎的项目不能直接升级到 5.1.x，需要我们手动建立一个空的 5.1.2 eui 项目，然后将原项目代码复制过去。

* 首先我们使用 launcher 创建一个 5.1.2 新项目。
* 然后将现有游戏逻辑和资源拷贝至新项目中主要包括 src 目录、resource 目录、修改配置文件 egretProperties 后续无论是 HTML5 版本，iOS / Android 版本还是小程序版本，均使用这个新项目进行后续开发。
* 全部拷贝以后，先测试下在 H5 中是否正常运行，一定要保证在 H5 中可以正常运行，再进行后续的操作。
* 还要将 `ThemeAdapter` 类中的 `getTheme` 方法替换如下代码：

~~~javascript
    public getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void {
        function onResGet(e: string): void {
            onSuccess.call(thisObject, e);
        }
        function onResError(e: RES.ResourceEvent): void {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(() => {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    }
~~~

## 注意事项：

* 小程序和小游戏中都移除了动态执行代码的能力，包括以下调用方式：eval 函数、setTimeout、 setInterval 函数第一个参数传入代码字符串执行、使用 Function 传入字符串构造函数、使用 GeneratorFunction 传入字符串构造生成器函数、

* 项目中使用了 egret.getDefinitionByName() 方法，需要将要反射的类挂载到全局 window 对象上，例：window["object1"] = object1 的方式。

* 项目中使用了自定义组件，需要将自定义组件挂载到全局 window 对象上，例：window["CustomCom"] = CustomCom 的方式。

* 检查是否使用了嵌入EXML到代码中，例：

~~~javascript
    var className = "skins.ButtonSkin";
    var exmlText = `<e:Skin class="${className}" states="up,over,down,disabled" xmlns:s="http://ns.egret.com/eui">                ...
                    </e:Skin>`;
~~~

如果有需要改成单独的皮肤文件。

* ts 代码和 eui 是不允许相同的命令空间，例如：

~~~javascript
<?xml version="1.0" encoding="utf-8" ?> 
<e:Skin class="ui.MyButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:e="http://ns.egret.com/eui"> 

</e:Skin>`;


namespace ui {
	export class TestNameSpace {
		public constructor() {
			egret.log("测试命令空间输出");
		}
	}
}
~~~
