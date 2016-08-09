eui.ProgressBar 进度条，我们一般用在加载某个或某组资源的时候，显示加载进程，帮助用户消磨加载过程这段无聊的时间。
跟前面的滑块 eui.Slider 控件一样，进度条控件也继承自 eui.Range 控件。也就是说 eui.Progress 进度条控件也可以设置 maximum 、minimum 、value 等属性。

#### 水平方向进度条
``` TypeScript
private pBar:eui.ProgressBar
private initProgressBar():void{
    this.pBar = new eui.ProgressBar();
    this.pBar.maximum = 210;//设置进度条的最大值
    this.pBar.minimum = 0;//设置进度条的最小值
    this.pBar.width = 200;
    this.pBar.height = 30;
    this.addChild(this.pBar);
    this.pBar.value = 42;//设置进度条的初始值
    //用timer来模拟加载进度
    var timer:egret.Timer = new egret.Timer(10,0);
    timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
    timer.start();
}
private timerHandler():void{
    this.pBar.value += 1;
    if(this.pBar.value>=210){this.pBar.value=0;}
}
```
得到的效果：

![](56015bfa15f46.png)

#### 垂直方向进度条
``` TypeScript
private vBar:eui.ProgressBar;
private initProgressvBar() {

    this.vBar = new eui.ProgressBar();
    this.vBar.direction = eui.Direction.BTT;//从下到上
    this.vBar.maximum = 210;//设置进度条的最大值
    this.vBar.minimum = 0;//设置进度条的最小值
    this.vBar.width = 30;
    this.vBar.height = 200;
    this.addChild(this.vBar);
    this.vBar.value = 42;//设置进度条的初始值
    //用timer来模拟加载进度
    var timer:egret.Timer = new egret.Timer(10,0);
    timer.addEventListener(egret.TimerEvent.TIMER,this.timerVBarHandler,this);
    timer.start();
}
private timerVBarHandler():void{
    this.vBar.value += 1;
    if(this.vBar.value>=210){
        this.vBar.value=0;
    }
}
```
得到的效果：

![](56015bfe4b254.png)

> 同前面一节一样，这里也使用：
```
egret create HelloEUI --type eui
```
> 创建的示例项目的默认皮肤。可以在示例项目的`skins`文件夹下找到皮肤的 exml 文件。