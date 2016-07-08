## 启动超时触发器

有一种场景，那就是在运行一定时间后，需要触发一个事件。比如某个对话框提示呈现后，需要在几秒钟之后自动消失。

这种情况可以使用Egret提供的`egret.setTimeout`来实现。该函数原型为：

```
function setTimeout(listener: Function, thisObject: any, delay: number, ...args: any[]): number;
```

其中`delay`设定超时等待的毫秒数，`...args`为随意个数的参数，也可以没有任何参数。

接下来通过一个简单的例子来学习如何使用超时触发器：

```
var idTimeout:number = egret.setTimeout( function( arg ){

        console.log( "timeout:", arg );

    }, this, 3000, "egret"

);

console.log( "start setTimeout" );
```

编译运行，首先输出"start setTimeout"，等待3秒后，将会出现"timeout: egret"，证实触发器准确运行。

## 停止超时触发器

超时等待阶段，可能会有需求，停止超时触发器，接着开始说的例子，如果在超时结束前用户触摸对话框的关闭或确定按钮，就需要取消超时触发器了。可以使用egret.clearTimeout来取消超时触发器。在egret.setTimeout执行时返回一个id：idTimeout，这个id就是用来取消超时触发器的：

```
egret.clearTimeout( idTimeout );
```

在超时等待结束前，执行该语句，将会停止超时触发器，回调函数将不再会执行。

超时等待结束时，将立即执行回调函数，此后执行`egret.clearTimeout`将不再有意义。

注意，本教程所用的`egret.setTimeout`和`egret.clearTimeout`均在`egret`包下，这是 Egret 引擎实现的超时触发器，跟javascript本身的`setTimeout`和`clearTimeout`不可混用。即执行`egret.setTimeout`返回的超时`id`，无法用javascript本身的`clearTimeout`来停止，反之亦然。
