---
layout: post
title:  "EGRET GUI 皮肤分离机制"
permalink: post/manual/other/gui1.html
type: manual
element: manualother
version: Egret引擎 v1.x
---

####1.什么是皮肤分离？

以制作一个游戏UI窗口为例，传统制作方式大体类似这样：实例化一个容器，在容器初始化时添加各种素材，分别设置样式布局，然后增加事件监听处理逻辑。动态的逻辑和静态的布局以及样式都耦合在一个类里。皮肤分离就是把样式从逻辑中解耦出来，用一个逻辑组件外加一个皮肤对象的方式去实现原来单个组件的功能。逻辑组件里只负责动态的逻辑控制代码，如事件监听和数据刷新。皮肤里只负责外观，如实例化子项，初始化样式和布局等静态的属性。

####2.为什么要分离出皮肤？

这样做最浅显的好处是你解耦了逻辑和皮肤，写逻辑的时候，只关注逻辑功能。写皮肤的时候，只关注样式。关注点小了，自然提高了开发效率。但皮肤分离的意义绝对不仅在这个层面上。

如果你的项目从头到尾都是按照皮肤分离的规范写的，当需要换肤时，逻辑代码几乎不用修改一行，重新给逻辑组件的skinName属性赋值一个新的皮肤，即可完成外观替换。这样做的另一个好处是可以共享皮肤。比如同一个外观的按钮，你只要写一个皮肤，所有按钮的skinName都可以引用它。不需要重复设置外观。引用同一个皮肤的组件，一次修改全部更新。但这还不是皮肤分离的真正好处。

先观察下分离出来的都是些什么东西？是布局和样式。而布局和样式又是另外一个东西：项目里修改最频繁的部分。让我们回忆一下传统开发模式里最痛苦的部分：每次到一堆代码里找到并修改一个颜色或坐标，然后运行一次看看效果对不对，不对再来一遍，如此反复下去…皮肤分离真正的好处是可以让程序员不用再写皮肤，关注更加纯粹的逻辑代码。由于分离出来的布局和样式，都是比较容易静态化的东西。所以我们可以用XML来描述它，用可视化编辑器来生成它。从而极大降低外观的修改成本。最终让人人都可以直接参与皮肤外观的编辑。而不是程序员必须参与的工作。

####3.皮肤部件

先来看一个最简单的Button逻辑类和对应的ButtonSkin皮肤例子：
Button.ts

{% highlight java linenos %}
class Button extends egret.SkinnableComponent{
    public constructor(){
        super();       
    }
 
    public labelDisplay:egret.Label;
 
    private _label:string = "";
 
    public get label():string{
        if(this.labelDisplay){
            return this.labelDisplay.text;
        }
        else{
            return this._label;
        }
    }
 
    public set label(value:string){
        this._label = value;
        if(this.labelDisplay){
            this.labelDisplay.text = value;
        }
    }
 
    public partAdded(partName:string, instance:any):void{
        super.partAdded(partName, instance);
 
        if (instance == this.labelDisplay){
            this.labelDisplay.text = this._label;
        }
    }
}
{% endhighlight %}

ButtonSkin.ts

{% highlight java linenos %}
class ButtonSkin extends egret.Skin{
 
    public constructor(){
        super();
        this.minWidth = 140;
        this.height = 60;
        this.states = ["up","down","disabled"];
    }
 
    public skinParts:Array<string> = ["labelDisplay"];
 
    public labelDisplay:egret.Label;
 
    public createChildren():void{
        super.createChildren();
        var background = new egret.UIAsset();
        background.percentHeight = background.percentWidth = 100;
        background.source = "assets/button-up.png";
        this.addElement(background);
 
        this.labelDisplay = new egret.Label();
        this.labelDisplay.left = 10;
        this.labelDisplay.right = 10;
        this.labelDisplay.top = 10;
        this.labelDisplay.bottom = 10;
        this.labelDisplay.textAlign = egret.HorizontalAlign.CENTER;
        this.labelDisplay.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addElement(this.labelDisplay);
    }
}
{% endhighlight %}

Button是逻辑组件，ButtonSkin是皮肤。我们通过设置button.skinName=ButtonSkin这种方式为逻辑组件指定皮肤类。当Button初始化(被加到显示列表)的时候，就会new一个ButtonSkin的实例，并添加ButtonSkin里所有子项到显示列表。然后自动匹配双方的同名变量(根据ButtonSkin.skinParts提供的列表)，这些同名变量就叫做“皮肤部件”(SkinPart)，例如负责显示文本标签的labelDisplay对象，匹配结果就是把ButtonSkin.labelDisplay引用赋值给Button.labelDisplay属性。皮肤部件注入的时候会调用逻辑组件的partAdded(子项名属性名，子项实例)方法，我们在这里做一些皮肤部件初始化操作，比如监听事件或设置逻辑组件定制的数据(如：labelDisplay.text = _label)。

我们在皮肤里可能会创建很多的子项，如果逻辑组件需要运行时动态操作某个子项，就可以预先声明好跟皮肤里一样的变量名，让该子项成为一个皮肤部件，在附加皮肤时逻辑组件就会自动持有这个皮肤部件引用。如Button的示代码，当我们在外部设置button.label的值时，逻辑组件Button就会去设置皮肤部件labelDisplay的text属性。从而修改按钮上显示的文本内容。我们当然也可以自行扩展皮肤部件，例如写一个IconButton继承自Button，为它增加一个icon属性，并定义一个iconDisplay的皮肤部件。相应的在IconButtonSkin里声明并实例化这个皮肤部件，最终通过IconButton.icon属性来修改按钮上显示的图标。具体写法参考labelDisplay。同理适用于所有组件的扩展。

关于皮肤部件，这里还要注意下：所有可定制皮肤的组件都定义了各自不同的皮肤部件。当为某个组件定制皮肤时，实际上就分为创建对应的皮肤部件和显示图片素材两部分。如果只添加了图片素材，而没有声明并实例化对应变量名的皮肤部件，逻辑组件将无法正常工作。具体皮肤部件名请参考每个组件定义的public公开变量列表。

####4.视图状态

皮肤并不是总是静态的。通常大部分组件的皮肤都包含有规律的状态切换。例如按钮的按下，弹起等。因此我们引入了视图状态的概念。视图状态是一系列由逻辑组件定义的字符串集合。用于在逻辑组件发生指定属性或交互状态变化时，通知皮肤当前应该切换为呈现哪套外观模式。这里还是以Button为例，我们为它增加几个方法：
Button.ts

{% highlight java linenos %}
class Button extends egret.SkinnableComponent{
    public constructor(){
        super();   
        this.addEventListener(TouchEvent.TOUCH_BEGIN, this.mouseEventHandler, this);
        this.addEventListener(TouchEvent.TOUCH_END, this.mouseEventHandler, this);    
    }
 
    //...这里省略上文出现的部分代码
 
    private touchDown:boolean = false;
 
    public mouseEventHandler(event:TouchEvent):void{
        switch (event.type){
            case TouchEvent.TOUCH_BEGIN:{
                this.touchDown = true;
                break;
            }
            case TouchEvent.TOUCH_END:{
                this.touchDown = false;
                break;
            }            
        }
        this.invalidateSkinState();//标记视图状态失效
    }
 
    public getCurrentSkinState():string{
        if (!this.enabled)
            return "disabled";
        if (this.touchDown)
            return "down";
        return "up";
    }
     
}
{% endhighlight %}

我们给Button增加了一个简单的事件监听，当触摸按下时，用一个变量touchDown来记录true，弹起时记录false。同时调用从SkinnableComponent继承下来的方法invalidateSkinState()来标记视图状态失效。关于失效验证机制的原理，我们将在后续教程中详细说明，这里你只需要知道调用了这个方法后，在帧末渲染前getCurrentSkinState()这个方法会被回调，从而获得当前的正确的视图状态名称，然后赋值状态名给皮肤实例的currentState属性，触发皮肤刷新视图。getCurrentSkinState()这个方法就是定义视图状态名称的地方，可以看出我们一共给Button定义了三个视图状态：up,down,disabled。接下来我们给ButtonSkin里添加处理视图状态刷新的方法：

ButtonSkin.ts

{% highlight java linenos %}
class ButtonSkin extends egret.Skin{
    public constructor(){
        super();   
        this.states = ["up","down","disabled"]; 
    }
 
    //...这里省略上文出现的部分代码
     
    public commitCurrentState():void{
        super.commitCurrentState();
        switch (this.currentState){
            case "up":
                this.backgroud.source = "assets/button-up.png";
                break;
            case "down":
                this.backgroud.source = "assets/button-down.png";
                break;
            case "disabled":
                this.backgroud.source = "assets/button-disabled.png";
                break;
        }
    }
{% endhighlight %}

首先我们要在构造函数里给皮肤的states属性赋值，声明这个皮肤接受这几种视图状态名。然后我们复写父类的commitCurrentState()方法即可，当皮肤的currentState改变时这个方法会被调用。这里说明下为什么不直接复写currentState的set方法，因为有可能currentState时，皮肤还没初始化，此时访问background将都是空对象。而commitCurrentState()能确保被调用时，皮肤已经完成了初始化。方法体的代码很简单，就是根据当前的视图状态名切换要显示的背景素材。

如果要给自定义的逻辑组件扩展视图状态名也很简单，在逻辑组件里复写父类的getCurrentSkinState()方法，增加返回值种类。判断条件根据具体的属性逻辑来确认。在会导致视图状态刷新的属性改变的地方，都加上一句invalidateSkinState()调用，来触发视图状态的刷新即可。框架内各个组件含有哪些视图状态名，也都可以通过查看getCurrentSkinState()来知晓。

####5.EXML文件

上文提到过我们可以用XML来描述皮肤，这里简单介绍下Egret GUI所支持的EXML皮肤文件。仍然以ButtonSkin为例，把它翻译成EXML文件版本如下：
ButtonSkin.exml

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<e:Skin xmlns:e="http://ns.egret-labs.org/egret">
    <e:states>
        <e:State name="up"/>
        <e:State name="down"/>
        <e:State name="disabled"/>
    </e:states>
    <e:UIAsset id="background" width="100%" height="100%" source.up="assets/button-up.png" source.down="assets/button-down.png" source.disabled="assets/button-disabled.png"/>
    <e:Label id="labelDisplay" left="10" top="10" right="10" bottom="10" textAlign="center" verticalAlign="middle"/>
</e:Skin>
{% endhighlight %}

XML的文件结构用来描述UI具有先天的优势，前文那个冗长的ButtonSkin.ts用EXML文件只需几行就描述清晰了。值得一提的是，最新版本的Egret命令工具已经支持编译EXML文件为JS，还是同样的命令：egret build。这个EXML文件所生成的JS文件，与前文的ButtonSkin.ts所生成的JS文件100%兼容。感兴趣的开发者可以去github上检出最新的master分支，并重装egret 命令行工具试用。

关于EXML文件的详细语法规范，近期将会在github上的wiki内更新。届时会附上链接。这里唯一要提一下的是，视图状态在EXML里的实现，因为它在EXML极其优雅和易用。我们可以看到UIAsset节点的source属性，例如source.up = “xxx” 这表示在这个source属性在up状态下将会赋为xxx值。任何属性都可以通过这种点语法来指定它在具体视图状态下的值。而且你可以同时设置任意多个不同属性，例如xy等坐标属性。编译器会帮你做好所有的工作。收集所有这种点语法的数据，生成列表，在视图状态切换时，批量切换每个属性的值。这种方式不仅写起来非常方便，而且能够最大限度的复用对象。让一个对象在不同状态下有一套不同的属性值。

除了点语法，我们还可以对显示对象使用includeIn和excludeFrom属性来确定它只存在于哪些视图状态中。例如上面的例子也可以改成：

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<e:Skin xmlns:e="http://ns.egret-labs.org/egret">
    <e:states>
        <e:State name="up"/>
        <e:State name="down"/>
        <e:State name="disabled"/>
    </e:states>
    <e:UIAsset includeIn="up" width="100%" height="100%" source="assets/button-up.png"/>
    <e:UIAsset includeIn="down" width="100%" height="100%" source="assets/button-down.png"/>
    <e:UIAsset excludeFrom="up,down" width="100%" height="100%" source="assets/button-disabled.png"/>
    <e:Label id="labelDisplay" left="10" top="10" right="10" bottom="10" textAlign="center" verticalAlign="middle"/>
</e:Skin>
{% endhighlight %}

我们创建了三个UIAsset，分别显示不同的素材。includeIn=”up”表示它只在up状态下显示。其他状态时将会被从显示列表移除。也可以用逗号分隔，填多个视图状态名。excludeFrom是includeIn的反义词，表示不属于哪些视图状态。这里excludeFrom=”up,down”等同于includeIn=”disabled”。

####6.皮肤适配器

前文有提到我们通过设置button实例的skinName属性来给一个按钮设置皮肤，而我们会发现skinName的类型其实是any，意味着可以任何类型，例如字符串或其他对象。而负责解析这个skinName并返回皮肤实例的是一个ISkinAdapter对象。当开发者给一个逻辑组件初始化时，它会调用这个全局的ISkinAdapter，传入自己的组件名称以及skinName的值，以获取皮肤实例。用户可以根据自己的需要自定义一个皮肤适配器，并在程序初始化的地方调用:egret.Injector.mapClass(“egret.ISkinAdapter”,MySkinAdapter)来注入自己的MySkinAdapter到框架，替换默认的解析规则。这个适配器可以有多种用途。其中之一就是当组件传入的skinName为空是，可以根据传入的hostComponentKey，给指定组件返回一个默认皮肤。这样就可以不用每个实例都显式赋值skinName。这部分内容建议结合GUIExample里的SkinAdapter来看：<a href="https://github.com/egret-labs/egret-examples" target="_blank">https://github.com/egret-labs/egret-examples</a>