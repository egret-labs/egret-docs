您还记得手机上的亮度调节工具吗？在eui中也有类似的组件，就是滑块控件。这个实际上是两个组件，根据方向，分为eui.HSlider 水平滑块控件和 eui.VSlider 垂直滑块控件。

#### 水平滑块控件
``` TypeScript
private initHSlider():void {
    var hSlider: eui.HSlider = new eui.HSlider();
    hSlider.width = 200;
    hSlider.x = 20;
    hSlider.y = 20;
    hSlider.minimum = 0;//定义最小值
    hSlider.maximum = 100;//定义最大值
    hSlider.value = 10;//定义默认值
    hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
    this.addChild(hSlider);
}
private changeHandler(evt: eui.UIEvent): void {
    console.log(evt.target.value);
}
```
得到的效果：

![](56015a0c6ebed.png)

#### 垂直滑块控件
``` TypeScript
private initVSlider():void {
    var vSlider: eui.VSlider = new eui.VSlider();
    vSlider.height = 200;
    vSlider.x = 100;
    vSlider.y = 60;
    vSlider.minimum = 100;//定义最小值
    vSlider.maximum = 200;//定义最大值
    vSlider.value = 120;//定义默认值
    vSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
    this.addChild(vSlider);
}
private changeHandler(evt: eui.UIEvent): void {
    console.log(evt.target.value);
}
```
得到的效果：

![](56015a1432390.png)



> 同前面一节一样，这里也使用：
```
egret create HelloEUI --type eui
```
> 创建的示例项目的默认皮肤。可以在示例项目的`skins`文件夹下找到皮肤的 exml 文件。