
## 获取相对时间

在介绍`ENTER_FRAME`之前需要了解一个常用的全局函数`getTimer()`用以获取全局的 Egret 框架启动时间毫秒数。

```
console.log(egret.getTimer());
//输出 345
```

输出即为从 Egret 框架启动到调用所经过的毫秒数。在我们计算相对时间的时候是比较常用的一个函数。

### 是否相信浏览器

> 这里有一点需要注意的是，Egret 需要从浏览器中获取当前的时间，而浏览器从用户的系统中获取时间，当用户手动修改本地时间时可能会导致我们获取到的时间不准确。当用户有意欺骗浏览器时可能会造成我们的程序出现问题。这在任意 JavaScript 前端程序中都有可能遇到。当我们希望程序更加稳固的时候加入合适的服务端后台验证是有必要的，是可以被考虑的。要权衡开发的成本，评估用户修改本地时间造成的影响，是可以被考虑的。

## ENTER_FRAME 事件

`ENTER_FRAME`顾名思义，将在进入新的一帧即下一帧开始时回调。所以它的回调速率是跟帧率相关的。下面简单测试一下在不同帧率下的表现。

```
class startTickerTest extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.onLoad,this);
    }
    private timeOnEnterFrame:number = 0;
    
    private onLoad(event:egret.Event) {
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.timeOnEnterFrame = egret.getTimer();
    }
    
    private  onEnterFrame(e:egret.Event){  
        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;
        var pass = now - time;
        console.log("onEnterFrame: ", (1000 / pass).toFixed(5));
        this.timeOnEnterFrame = egret.getTimer();
    }
}
```

当我们修改不同的帧率时可以看到结果是不同的:

![](56d7f314a338f.png)

### 简单帧动画

如果我们在回调函数中修改显示对象的参数，即可完成简单动画的效果。首先我们准备并在资源管理中配置好下面的素材:

![](56d7f30de1131.png)

修改`onLoad`函数初始化显示对象。

```
private star:egret.Bitmap;
//设置动画的移动速度
private speed:number = 0.05;
private timeOnEnterFrame = 0;

private onLoad(event:egret.Event) {

    var star:egret.Bitmap = new egret.Bitmap(RES.getRes("star"));

    this.addChild(star);

    this.star = star;

    this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    this.timeOnEnterFrame = egret.getTimer();
}

private  onEnterFrame(e:egret.Event){

        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;

        var pass = now - time;
        //console.log("onEnterFrame: ", (1000 / pass).toFixed(5),pass);
        this.star.x += this.speed*pass;
        this.timeOnEnterFrame = egret.getTimer();

        if(this.star.x > 300)
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
}
```

上面演示了简单的帧动画。需要注意的是，通过计算时间间隔来实现位移会是动画看起来更平滑一些，因为每帧的时间间隔不是固定的。

可以通过`removeEventListener`来移除帧监听。




