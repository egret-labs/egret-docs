比如我们有一个自定义的皮肤，名称为**testSkin.exml**，有两种方式使用它
~~~ typescript
<?xml version="1.0" encoding="utf-8"?> <e:Skin class="mySkin.TestSkin" xmlns:e="http://ns.egret.com/eui"> <e:DataGroup> <e:itemRendererSkinName> <e:Skin> <e:Label textColor="0xfd0000" text="{data.label}"/> </e:Skin> </e:itemRendererSkinName> <e:ArrayCollection> <e:Array> <e:Object label="item1"/> <e:Object label="item2"/> <e:Object label="item3"/> </e:Array> </e:ArrayCollection> </e:DataGroup> </e:Skin>~~~


## 方式1 加载文件
~~~ typescript
class TestSkin extends eui.Component {
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
        this.skinName = "resource/testSkin.exml";
    }
    protected createChildren() {
        super.createChildren();
        console.log("createChildren")
    }
    private onComplete():void{
        console.log("onComplete");
    }
}
~~~
直接把**skinName**设置为exml文件的路径。这种方式要注意的是，在 createChildren 的时候，是获取不到内部组件的，因为此时 exml 文件还没有加载完成，要通过监听 **eui.UIEvent.COMPLETE** 这个事件获取组件创建完成的消息。
像上面这个例子，console 会先输出 **createChildren** 再输出 **onComplete**

需要注意的是:如果已经在主题中加载了 EXML 文件，会先输出 onComplete 再输出 createChildren.

## 方式2 通过Theme主题管理使用
~~~
egret create euiDemo --type eui
~~~
创建一个 eui 项目，里面默认就会有主题管理解析的示例。
具体的文档在这里：http://edn.egret.com/cn/index.php/article/index/id/511

你会发现，方式1的代码还可以正常使用，但是console 会先输出 **onComplete** 再输出 **createChildren**，和之前相反。这是因为主题已经加载过这个 exml 文件了，所以不需要重新加载，直接就创建出来了。

另外因为我们在 exml 中定义了 **class="mySkin.TestSkin"**,所以还可以像下面这样使用
~~~ typescript
class TestSkin extends eui.Component {
    constructor() {
        super();
        this.skinName = "mySkin.TestSkin";
    }
}
~~~

