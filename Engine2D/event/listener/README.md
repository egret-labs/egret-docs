事件侦听器也就是事件的处理者，负责接收事件携带的信息，并在接收到该事件后执行特定的代码。

Egret中，事件的侦听器必须是一个函数。事件的发送者必须是 `egret.EventDispatcher` 类或者子类的实例。只有事件发送者才能侦听事件，并且可以注册侦听器。

侦听事件分为两个部分，第一是建立侦听器，侦听器可以是独立的函数，也可以是某一个对象的方法。第二步是注册侦听器，使用事件发送者的 `addEventListener()` 将相应的事件分配给侦听器。

下面是注册侦听函数的定义。

```javascript
public addEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false, priority:number = 0)
```


* `type`：事件类型，必选。

* `listener`：用来处理事件的侦听器，必选。

* `thisObject`：作用域，必选，一般填写this。因为TypeScript与JavaScript的this作用域不同，其this指向也会不同。如果不填写this的话，那么编译后的代码会发生错误。 关于this的问题，可以学习JavaScript中的原型链。

* `useCapture`: 确定侦听器是运行于捕获阶段还是运行于冒泡阶段，可选。设置为 true，则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。设置为 false，则侦听器只在冒泡阶段处理事件。

* `priority`： 事件侦听器的优先级，可选。优先级由一个带符号的整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。

### 1.创建侦听器

侦听器必须是函数，它可以是一个独立函数，也可以是一个实例的方法。侦听器必须有一个参数，并且这个参数必须是 Event 类实例或其子类的实例， 同时，侦听器的返回值必须为空（void）。范例代码如下：

```javascript
listenerName(evt:Event):void {...}
```

### 2.注册侦听器与移除侦听器

只有事件的发送者才可以注册侦听器，事件的发送者必须是 `EventDispatcher` 类或其子类的实例。移除侦听器也同理，通常情况下，注册侦听器与移除侦听器都是成对出现。

注册侦听器

```javascript
事件发送者.addEventListener(事件类型, 侦听器, this);
```

移除侦听器

```javascript
事件发送者.removeEventListener(事件类型, 侦听器, this);
```

### 3.检测侦听器

如果需要在逻辑中检测某一个事件发送者是否注册了侦听器，有两个方法可以使用。 一个是 `hasEventListener` ,另外一个是 `willTrigger` 。两个方法执行效果相同，都是判断一个事件发送者是否注册了某一个类型的事件。

如果该事件类型已经被注册过，返回 `true`，如果没有被注册过，返回 `false`。

```javascript
事件发送者.hasEventListener(事件类型);
```

### 4.TouchEvent的启动开关

TouchEvent的启动开关 `touchEnabled` 指定此对象是否接收触摸或其他用户输入。默认值为 false，实例将不接收任何触摸事件（或其他用户输入事件）。如果将 `touchEnabled`设置为 true，则显示对象实例将会接收触摸事件或其他用户输入事件。要更改显示对象的所有子级的 touchEnabled 行为，请使用 `DisplayObjectContainer.touchChildren`。

实际使用过程，如果某些显示对象需要侦听TouchEvent，请先打开：
```javascript
显示对象实例.touchEnabled = true;
```
