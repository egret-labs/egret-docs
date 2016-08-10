ToggleButton，顾名思义就是一个具备状态的按钮，这个状态就是selected属性，类型是布尔量，默认为false，当您点击一下按钮，selected将变为true，再点击一下，重新变成false。在显示上也是有区别的，选中和非选中的外观是不一样的。

eui.ToggleSwitch 用来定义开关组件，包括一个开启和关闭状态的皮肤。它继承自 eui.ToggleButton ，可以使用 selected 来设置或获取其开关状态。

``` TypeScript
private initSwitch():void{
    var btn: eui.ToggleSwitch = new eui.ToggleSwitch();
    btn.label = "我是ToggleButton";
    btn.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
    this.addChild(btn);
}
private changeHandler(evt:eui.UIEvent) {
    egret.log(evt.target.selected);
}
```
得到的效果：

![](560158f61ec92.png)

在下面的例子中，我们结合若干个ToggleButton，就可以实现类似TabBar这样的效果，如图所示：

![](560159042f1bf.png)

``` TypeScript
private toggleBtns:Array<eui.ToggleButton> = [];
private initToggleBar():void {
    for (var i: number = 0; i < 4; i++) {
        var btn: eui.ToggleButton = new eui.ToggleButton();
        btn.label = i + 1 + "";
        btn.y = 100;
        btn.width = 80;
        btn.height = 60;
        btn.x = 20 + i * 80;
        btn.addEventListener(eui.UIEvent.CHANGE, this.toggleChangeHandler, this);
        this.toggleBtns.push(btn);
        this.addChild(btn);
    }
}
private toggleChangeHandler(evt: eui.UIEvent) {
    for (var i: number = 0; i < this.toggleBtns.length; i++) {
        var btn: eui.ToggleButton = this.toggleBtns[i];
        btn.selected = (btn == evt.target);
    }
}
```


> 同前面一节一样，这里也使用：
```
egret create HelloEUI --type eui
```
> 创建的示例项目的默认皮肤。可以在示例项目的`skins`文件夹下找到皮肤的 exml 文件。
