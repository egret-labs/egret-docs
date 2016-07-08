在 [层叠容器](http://edn.egret.com/cn/index.php/article/index/id/609) 章节，我们介绍了 ViewStack，那么应该用什么来控制 ViewStack 的显示比较好呢？TabBar 是个不错的选择。TabBar 会根据数据源，显示一组按钮，并且在同一时间，只有一个按钮会被选中，并且如果数据源是一个ViewStack 的话，那么 TabBar 的选中项索引将和 ViewStack 的选中项索引保持一致。

#####  用法1：结合ViewStack

我们修改 [层叠容器](http://edn.egret.com/cn/index.php/article/index/id/609) 章节的例子，不再用 timer 控制 ViewStack 的切换，而是绑定到 TabBar 上面：

``` TypeScript

class TabBarDemo extends eui.Group {
    constructor() {
        super();
    }
    protected createChildren(): void {
        super.createChildren();
        var theme = new eui.Theme(`resource/default.thm.json`, this.stage);
        var exml = `
        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50"> 
            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
        </e:Skin>`;
        var tabBar = new eui.TabBar();
        var viewStack = new eui.ViewStack();
        viewStack.y = 100;
        //创建 3 个 group ,每个 group 里面有 1 个按钮
        for (var i: number = 0; i < 3; i ++) {
            var group: eui.Group = new eui.Group();
            group.name = "Group" + i;
            var btn: eui.Button = new eui.Button();
            btn.label = "Button" + i;
            group.addChild(btn);
            viewStack.addChild(group);
        }
		//将 tabBat 的数据源设置为 viewStack
        tabBar.dataProvider = viewStack;
        tabBar.itemRendererSkinName = exml;
        viewStack.selectedIndex = 1;
        this.addChild(viewStack);
        this.addChild(tabBar);
    }
}

```

> 注意上面我们为循环产生的group设置了名称(通过name属性)，这样TabBar的显示，就可以根据Group的名称来做。由于ViewStack实现的是ICollection接口，它默认会取子项的name属性，就是说，想显示在TabBar的文本，必须写在子项的name属性上。

  通过设置 TabBar.dataProvider 等于 ViewStack 实例，来实现两者的绑定。



效果：

![][9-4-tabbar-A]

#####  用法2：结合ArrayCollection

TabBar 也可以单独使用的，将数据源设置为一个 ArrayCollection 实例即可。并且您可以通过侦听 ITEM_TAP 事件，来获取TabBar 的选中项。示意代码：

``` TypeScript

class TabBarDemo extends eui.Group {
    constructor() {
        super();
    }
    protected createChildren(): void {
        super.createChildren();
        var theme = new eui.Theme(`resource/default.thm.json`, this.stage);
        var exml = `
        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50"> 
            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
        </e:Skin>`;
        var tabBar = new eui.TabBar();
        tabBar.dataProvider = new eui.ArrayCollection(["tab1", "tab2", "tab3"]);
        tabBar.itemRendererSkinName = exml;
        this.addChild(tabBar);
        tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
    }
    private onBarItemTap(e: eui.ItemTapEvent): void {
        console.log(e.itemIndex);
    }
}

```

效果：

![][9-4-tabbar-B]

[9-4-tabbar-A]: http://sedn.egret.com/5604f1ae770d6.png

[9-4-tabbar-B]: http://sedn.egret.com/5604f1ae9a80d.png