Event3D 类作为创建事件实例的基类，当触发事件时，Event3D 实例将作为参数传递给事件侦听器。Event3D 类的属性包含有关事件的基本信息，例如事件的类型。对于许多事件（如由 Event3D 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。例如，与鼠标单击关联的事件需要包括有关单击事件的位置以及在单击事件期间是否按下了任何键的其他信息。

事件中，分为事件监听对象（EventDispatcher），事件触发对象（和前面监听对象是同一个），事件类型，事件响应函数（方法），派发的事件对象。

事件监听对象通过监听某个事件类型（比如 egret3d.Event3D.COMPLETE）来绑定一个的事件响应函数（方法），在程序执行过程中，在通过事件触发对象触发之前监听的事件类型，从而进入到之前绑定的回调函数（方法）中，回调函数再去执行对应的逻辑。


## api 调用

* 示例
		
		//监听事件
		dispatcher.addEventListener(egret3d.Event3D.COMPLETE, this.onComplete, this, 10);
		
		//响应事件
		private onComplete(event3D: egret3d.Event3D): void {
			var target = event3D.target;
		}
		
		//触发事件
		dispatcher.dispatchEvent(new egret3d.Event3D(egret3d.Event3D.COMPLETE));

* dispatcher，一个 EventDispatcher 对象，事件的监听者以及派发者，需要是同一个才会进入到回调函数中。

* egret3d.Event3D.COMPLETE，事件的类型，监听、触发事件类型必须一致。

* onComplete，响应事件。参数和派发事件对象是同一个，因此类型必须和触发事件对象类型一致。

* this，this.onComplete 与 10 之间的 this，是函数 onComplete 响应时的作用对象。

* 10，事件优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。相同优先级，则按照它们的添加顺序进行处理。

* egret3d.Event3D，触发事件所携带的数据类型。

* event3D.target，响应事件的对象。  也就是dispatchEvent 的对象
