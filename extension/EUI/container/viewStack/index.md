## ViewStack

您可以在 ViewStack 这个容器中添加多个子项，但只能显示其中的一个。您可以通过设置 selectedIndex 或者 selectedChild 属性，来控制当前应该显示的子项。

首先我们创建一个专用于显示 ViewStack 的类：

``` TypeScript
class ViewStackDemo extends eui.Group {
    private viewStack:eui.ViewStack;
    public constructor() {
        super();
    }
    protected createChildren():void {
      super.createChildren();

        this.viewStack = new eui.ViewStack();
        var btnA:eui.Button = new eui.Button();
        btnA.label = "egret Button A";
        this.viewStack.addChild( btnA );
        var btnB:eui.Button = new eui.Button();
        btnB.label = "egret Button B";
        this.viewStack.addChild( btnB );
        //设置默认选项
        this.viewStack.selectedIndex = 1;
        //timer控制选项切换
        var timer:egret.Timer = new egret.Timer( 500 );
        timer.addEventListener( egret.TimerEvent.TIMER, this.changeIndexByTimer, this );
        timer.start();

        //show
        this.addChild( this.viewStack );
    }
    private changeIndexByTimer( evt:egret.TimerEvent ):void {
        this.viewStack.selectedIndex = this.viewStack.selectedIndex == 0 ? 1 : 0 ;
    }
}

```

可以看到 ViewStack 中的两个按钮按照设定的间隔自动变换的效果： 

![][8-2-stack-A]  ![][8-2-stack-B]


## TabBar
ViewStack通常都同时配合导航条使用，这部分内容请参考 [选项卡](http://edn.egret.com/cn/index.php/article/index/id/642) 章节

[8-2-stack-A]: /cn/data/upload/5608f2da1e4ac.png

[8-2-stack-B]: /cn/data/upload/5608f2da5e32a.png
