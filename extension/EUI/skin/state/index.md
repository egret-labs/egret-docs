上一节总我们讲解了皮肤部件的原理，并举例了一个最简单的自定义按钮示例。但按钮皮肤并不是总是静态的，通常大部分组件的皮肤都包含有规律的状态切换。例如按钮的按下，弹起等。因此我们引入了视图状态的概念。视图状态是一系列由逻辑组件定义的字符串集合。用于在逻辑组件发生指定属性或交互状态变化时，通知皮肤当前应该切换为呈现哪套外观模式。这里还是以Button为例，我们为它增加几个方法： 
Button.ts

```
class Button extends eui.Component{
    public constructor(){
        super();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchEventHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEventHandler, this);
    }

    //...这里省略上一节出现的部分代码

    private touchDown:boolean = false;

    private touchEventHandler(event:egret.TouchEvent):void{
        switch (event.type){
            case egret.TouchEvent.TOUCH_BEGIN:{
                this.touchDown = true;
                break;
            }
            case egret.TouchEvent.TOUCH_END:{
                this.touchDown = false;
                break;
            }
        }
        this.invalidateState();//标记视图状态失效
    }

    protected getCurrentState():string{
        if (!this.enabled)
            return "disabled";
        if (this.touchDown)
            return "down";
        return "up";
    }
}
```
我们给Button增加了一个简单的事件监听，当触摸按下时，用一个变量touchDown来记录true，弹起时记录false。同时调用从Component继承下来的方法 `invalidateState()` 来标记视图状态失效。调用了这个方法后，在帧末渲染前getCurrentState()这个方法会被回调，从而获得当前的正确的视图状态名称，然后赋值状态名给皮肤实例的currentState属性，触发皮肤刷新视图。getCurrentState()这个方法就是定义视图状态名称的地方，可以看出我们一共给Button定义了三个视图状态：up,down,disabled。接下来我们给ButtonSkin.exml里添加处理视图状态刷新的内容：

ButtonSkin.exml

```
<e:Skin class="ButtonSkin" states="up,down,disabled" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing"> 
    <e:Image source="image/button_up.png" includeIn="up" width="100%" height="100%"/> 
    <e:Image source="image/button_down.png" includeIn="down" width="100%" height="100%"/> 
    <e:Image source="image/button_disabled.png" includeIn="disabled" width="100%" height="100%"/> 
    <e:Label id="labelDisplay" left="20" right="20" top="10" bottom="10"/> 
</e:Skin>```
这个EXML里声明了 "up,down,disabled" 三种视图状态名，并放置了三张不同的背景图片，分别只在三个状态中显示。EXML内视图状态的具体用法可以参考 [EXML基本语法(二)](http://edn.egret.com/cn/index.php/article/index/id/506) 的视图状态一节。当逻辑组件上接收到触摸按下事件时，就会触发invalidateState()方法，从而触发getCurrentState()方法，我们在这里面根据当前的状态返回了"down"字符串，ButtonSkin.exml接受到"down"状态后就会只显示button_down.png那张图片，隐藏其余图片。

可以看出自定义逻辑组件中扩展视图状态的方法就是使用invalidateState()和getCurrentState()这一对方法。这种方法通常用于标准组件内的实现。我们还提供了一种在组件外快速设置视图状态的方法。就是直接对组件的currentState属性赋值即可，例如：`button.currentState = "down"；`

