## 1.启动超时触发器

有一种需求，是在运行一定时间后，触发一个事件。比如某个对话框提示呈现后，需要在几秒钟之后自动消失。

Egret提供的`egret.setTimeout`可实现上述功能。该函数原型为：

~~~ typescript
function setTimeout(listener: Function, thisObject: any, delay: number, ...args: any[]): number;
~~~ 

* `listener`是待执行的回调函数
* `thisObject`设置为`this`即可
* `delay`设定超时等待的毫秒数，
* `...args`为随意个数的参数，也可以没有任何参数。

下面示例演示超时触发器的使用方法：

~~~ typescript
var idTimeout:number = egret.setTimeout( function( arg ){

        console.log( "timeout:", arg );

    }, this, 3000, "egret"

);

console.log( "start setTimeout" );
~~~ 

编译运行，首先输出"start setTimeout"，等待3秒后，将会出现"timeout: egret"，证实触发器准确运行。

## 2.停止超时触发器

超时等待阶段，可能会有需求，停止超时触发器，接着上述示例，如果在超时结束前用户触摸对话框的关闭或确定按钮，就需要取消超时触发器。Egret 提供 `egret.clearTimeout` 取消超时触发器。在 `egret.setTimeout` 执行时返回一个 `id：idTimeout` ，这个id就是用来取消超时触发器的：

~~~ typescript
egret.clearTimeout( idTimeout );
~~~ 

在超时等待结束前，执行该语句，将会停止超时触发器，回调函数将不再会执行。

超时等待结束时，将立即执行回调函数，此后执行`egret.clearTimeout`将不再有意义。

注意，本教程所用的`egret.setTimeout`和`egret.clearTimeout`均在`egret`包下，这是 Egret 引擎实现的超时触发器，跟javascript本身的`setTimeout`和`clearTimeout`不可混用。即执行`egret.setTimeout`返回的超时`id`，无法用javascript本身的`clearTimeout`来停止，反之亦然。
