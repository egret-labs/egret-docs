列表组件 List ，继承自 DataGroup，它和 DataGroup 的区别在于：
* 在 List 中选中一项，会触发 eui.ItemTapEvent.ITEM_TAP 事件，然后您就可以执行后续的逻辑处理
* List有选中项的概念，可以设置 List 中的默认选中项。

下面来看看List的基本用法：
``` TypeScript
class Main extends eui.Group {
    constructor() {
        super();
    }
    private list:eui.List;
    protected createChildren() {
        super.createChildren();
        var exml = `
        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50"> <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> </e:Skin>`;
        var list = new eui.List();
        list.dataProvider = new eui.ArrayCollection(["item1","item2","item3"]);
        list.itemRendererSkinName = exml;
        this.addChild(list);
        this.list = list;
        list.selectedIndex = 1;//设置默认选中项
        list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this);
    }
    private onChange(e:eui.PropertyEvent):void{
    	//获取点击消息
        console.log(this.list.selectedItem,this.list.selectedIndex)
    }
}
```
效果如下：
![](5604f13909a44.png)
~~~
设置默认选中项
list.selectedIndex = 1;
~~~
~~~
获取当前选中项的信息
list.selectedItem
list.selectedIndex
~~~
### 多选状态
 List 还可以开启多选状态
~~~ TypeScript
list.allowMultipleSelection = true;
~~~
效果如下：
![](5625d92835954.png)
多选状态下，List 中所有的条目都可以被选中，再次点击选中的条目则会取消选中，恢复原状。

此时监听 eui.ItemTapEvent.ITEM_TAP 事件，可以通过下面两个属性获得一个数组，里面包含了当前哪些条目处于选中状态：
~~~
list.selectedIndices
list.selectedItems
~~~
在多选状态下还有一个命令可以配合使用：
~~~ TypeScript
list.requireSelection = true;
~~~
该属性设置为 true 后，多选状态下最少有一个条目会被选中，不可以被取消。

### 滚动列表

列表配合 Scroller 使用可以实现滚动效果。

具体参考文档：[定位滚动位置](http://edn.egret.com/cn/docs/page/611#定位滚动位置)

自定义滚动列表参考示例:[卡牌游戏EUI使用](http://edn.egret.com/cn/article/index/id/833)