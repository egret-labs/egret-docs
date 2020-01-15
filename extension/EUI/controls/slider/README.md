在 eui 中有滑块控件（类似于手机上亮度调节器）。根据方向，分为`eui.HSlider` 水平滑块控件和 `eui.VSlider` 垂直滑块控件。

`eui.HSlider` 和 `eui.VSlider` 继承自 `eui.Range` 控件。可以设置 `maximum` 、`minimum `、`value` 等属性。

* `maximum`：最大值
* `minimum`：最小值
* `value`：初始值

### 水平滑块控件
~~~ typescript 
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
~~~ 
得到的效果：

![](56015a0c6ebed.png)

### 垂直滑块控件
~~~ typescript 
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
~~~ 
得到的效果：

![](56015a1432390.png)



> 同前面一节一样，这里也使用：
~~~ typescript
egret create HelloEUI --type eui
~~~ 
> 创建示例项目的默认皮肤。可以在示例项目的`eui_skins`文件夹下找到默认皮肤的 exml 文件。
