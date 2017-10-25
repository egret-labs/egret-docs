通过制定事件的优先级来设置事件侦听器的执行顺序。

可以在注册侦听器的时候制定事件的优先级。
```
public addEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false, priority:number = 0)
```

制定优先级需要设置 `priority` 属性。该属性为一个number类型，当数字越大，则优先级越大。在触发事件的时候优先级越高，越先执行。