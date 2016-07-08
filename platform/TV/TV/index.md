## 接入步骤如下：

1.     在游戏逻辑层加入按键开启事件，将registerKeyEvent在游戏初始化的时候执行。
2.     遥控器或手柄上有按键事件发生的时候，Runtime会调用onKeyEvent。
3.     游戏层直接实现游戏逻辑即可，无需其它改动。

## 代码改动如下：

```
/** KeyEvent的回调
 * @param code:number android硬件按钮的代码
 * @param action:number 0按下，1弹起
 * 以下实现为监听遥控器事件
 */
var onKeyEvent = function(code:number, action:number) {
    if (action == 1) {
        return;
    }
    switch (code) {
    case 19: // UP
        handleUp();
        break;
    case 20: // DOWN
        handleDown();
        break;
    case 21: // LEFT
        handleLeft();
        break;
    case 22: // RIGHT
        handleRight();
        break;
    case 23: // HOME
    case 66: // OK
        handleFire();
        break;
    default:
        break;
};
 
var registerKeyEvent = function () {
    // 注册一个KeyEvent的接口和回调
    var onKeyEventName = "onKeyEvent";
    egret.ExternalInterface.addCallback(onKeyEventName, function (data:string) {
        var event = JSON.parse(data);
        if (event.type == "keyEvent") {
            // 处理键盘事件
            onKeyEvent(event.code, event.action);
        }
    });
 
    // 通知Runtime开始监听KeyEvent，并告知Egret的回调函数的接口名称
	var message = {
		"egretInterfaceName":onKeyEventName
	};
    egret.ExternalInterface.call("runKeyEventListener", JSON.stringify(message));
};
```