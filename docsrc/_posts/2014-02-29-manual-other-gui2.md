---
layout: post
title:  "EGRET GUI 失效验证机制"
permalink: post/manual/other/gui2.html
type: manual
element: manualgui
version: Egret引擎 v1.x
---

本篇并不是框架应用层级的教程，而是底层设计思路，了解这部分内容能对您阅读Egret GUI的源码以及理解下一篇自适应流式布局的原理起到很大帮助。

####1.什么是失效验证？

失效验证是一种延迟应用改变的优化措施。举个例子：我们现在有一个UIComponent组件，需要在width或height发生改变后，根据当前尺寸用Graphics去重绘一个矩形背景。在立即应用的情况下，当我们分别修改它的width和height时，组件会分别执行2次Graphics绘制。如果我们在一个for循环里不断改变尺寸，改变多少次就立即绘制多少次。而在失效验证的情况下，当尺寸发生改变时，它只是用一个变量标记下尺寸发生了改变，然后延迟一帧检查这个变量再统一执行一次Graphics绘制。所以无论你同一时间改变了尺寸多少次，结果都只绘制了一次。

以下代码就是失效验证机制的最简单实现:

{% highlight java linenos %}
class UIComponent extends egret.Sprite{
 
    public constructor(){
        super();
    }
 
    private sizeChanged:boolean = false;
 
    private _width:number;
 
    public get width():number{
        return this._width;
    }
    public set width(value:number){
        if(this._width==value)
            return;
        this._width = value;
        this.sizeChanged = true。
        this.invalidateProperties();
    }
 
    private _height:number;
 
    public get height():number{
        return this._height;
    }
    public set height(value:number){
        if(this._height==value)
            return;
        this._height = value;
        this.sizeChanged = true;
        this.invalidateProperties();
    }
 
    public commitProperties():void{
        if(this.sizeChanged){
            this.sizeChanged = false;
            this.redrawBackground();
        }
    }
 
    private redrawBackground():void{
        var g:egret.Graphics = this.graphics;
        g.clear();
        g.beginFill(0x009aff);
        g.drawRect(0, 0, this._width, this._height);
        g.endFill();
    }
 
 
    private invalidatePropertiesFlag:boolean = false;
 
    public invalidateProperties():void{
        if(this.invalidatePropertiesFlag)
            return;
        this.invalidatePropertiesFlag = true;
        this.addEventListener(egret.Event.ENTER_FRAME,this.validateProperties,this);
        }
    }
 
    private validateProperties(event:egret.Event):void{
        this.removeEventListener(egret.Event.ENTER_FRAME,this.validateProperties,this);
        this.commitProperties();
        this.invalidatePropertiesFlag = false;
    }    
}
{% endhighlight %}

redrawBackground()就是根据当前宽高绘制背景的方法。当UIComponent的width或height在外部被赋值修改后，不直接调用redrawBackground()重绘背景,而是先用sizeChanged属性标记尺寸发生了改变，然后调用invalidateProperties()方法，标记有属性失效，需要延迟验证。invalidateProperties()方法里通过监听ENTER_FRAME事件，来实现在下一帧再执行commitProperties()方法。commitProperties()方法里就是判断sizeChanged属性，然后最终执行redrawBackground()；在这之前，无论你对width或height执行了多少次修改，最终redrawBackground()只会执行一次。

####2.失效验证管理器：LayoutManager

以上仅仅是一个简单的例子，试想下把这个机制运用到方方面面，尤其是包含巨大计算量的地方，带来的性能优化是非常显著的。所以我们在框架里提供了一个LayoutManager来专门负责管理失效验证。前面的例子改为调用LayoutManager的方式，只需要改动invalidateProperties()和validateProperties()两个方法：

{% highlight java linenos %}
class UIComponent extends egret.Sprite{
 
    //...这里省略上文出现的部分代码
 
    public invalidateProperties():void{
        if (!this.invalidatePropertiesFlag){
            this.invalidatePropertiesFlag = true;
            if (this.parent&&UIGlobals.layoutManager)
                UIGlobals.layoutManager.invalidateProperties(this);
        }
    }
     
    public validateProperties():void{
        if (this.invalidatePropertiesFlag){
            this.commitProperties();
            this.invalidatePropertiesFlag = false;
        }
    }
}
{% endhighlight %}

LayoutManager和UIComponent相当于是定了一个契约，在需要延迟验证的属性发生改变时，UIComponent先标记下这个变化的属性，然后把自己注册到LayoutManager上，让它延迟一段时间后回调自己的某个方法来集中处理这些变化的属性。这里我们说”延迟一段时间后”而不是”在下一帧”，是因为LayoutManager并不仅监听ENTER_FRAME事件，还监听了RENDER事件。由于LayoutManager的代码量比较大，请大家自行阅读，这里只贴出关键的代码：

{% highlight java linenos %}
class LayoutMananger extends EventDispatcher{
     
    private attachListeners():void{
        UIGlobals.stage.addEventListener(Event.ENTER_FRAME,this.doPhasedInstantiationCallBack,this);
        UIGlobals.stage.addEventListener(Event.RENDER, this.doPhasedInstantiationCallBack,this);
        UIGlobals.stage.invalidate();
        this.listenersAttached = true;
    }
 
    private doPhasedInstantiationCallBack(event:Event=null):void{
        UIGlobals.stage.removeEventListener(Event.ENTER_FRAME,this.doPhasedInstantiationCallBack,this);
        UIGlobals.stage.removeEventListener(Event.RENDER, this.doPhasedInstantiationCallBack,this);
        this.doPhasedInstantiation();
    }
}
{% endhighlight %}

我们可以看到attachListeners()里是同时监听了两个事件的。首先解释为什么要监听RENDER事件：因为RENDER是在本帧末，屏幕刷新前执行。一帧内的代码无论以什么顺序改变，都只有到帧末屏幕刷新后才会显示出来。如果我们失效验证的东西是跟显示有关的。在屏幕刷新前验证，就能跟立即验证的方式一样,直接在本帧末看到结果。而如果使用ENTER_FRAME在下一帧验证，我们就会先看到一个还没应用改变的显示结果，然后快速闪一下变成应用后的。监听RENDER事件就是为了避免特殊情况下出现的这种闪一下的视觉问题。

通过以上解释不难明白，我们首选的应该是监听RENDER事件。那为何还要同时监听ENTER_FRAME事件？因为RNEDER事件只会抛出一次，在RENDER事件内执行stage.invalidate()想要再次触发RENDER事件是无效的。而如果是在RENDER事件内执行验证时新产生的失效，继续监听RENDER将得不到回调，所以同时监听ENTER_FRAME，以确保这部分失效在下一帧能得到有效执行。

LayoutMananger接管了UIComponent里具体执行失效验证的触发和回调部分。所以在UIComponent及其子类里，我们只需要关心invalidateProperties()和commitProperties()这一对方法。前者标记属性失效，后者处理失效的属性。validateProperties()主要是负责触发commitProperties()方法，因此我们并不需要关心它。

####3.针对布局的失效验证

之所以命名为LayoutManager，是因为它除了提供通用的属性失效验证外，主要还提供了针对布局的两种失效验证。一个是测量验证，一个是布局验证。写法与invalidateProperties()如出一辙，这里就不贴代码了。同理,我们也只需关心那一对方法，测量：invalidateSize()和measure()，前者标记尺寸失效，后者测量尺寸，布局：invalidateDisplayList()和updateDisplayList()，前者标记布局失效，后者更新布局。LayoutManager内维护了三个失效列表。UIComponent的失效方法被调用后，就把自身插入到LayoutManager的对应失效列表里。然后LayoutManager会按照:提交属性->测量尺寸->更新布局，这种顺序依次进行验证，统称：三阶段布局验证。

另外，LayoutManager里的单个失效列表内也是有序的，按照UIComponent在显示列表内的嵌套层级排序。提交属性阶段是由外至内，测量阶段是由内至外，更新布局阶段又是由外至内。如下图：

![egret gui]({{site.baseurl}}/assets/img/egretgui2.jpg)

这种排序方式主要是为了减少重复的计算。例如测量阶段，父级的测量结果是由子项决定的，显然由内至外的测量顺序才能保证测量结果的正确性。若是无序的，子项测量的尺寸发生改变后，会通知父级再次测量。就会造成大量重复的计算。这里面其实只有测量和布局阶段与嵌套层级执行顺序有关，提交属性阶段只是组件内部的失效验证，无所谓由内至外或由外至内。

关于三阶段失效验证的顺序问题，都在LayoutManager里封装好了，而我们写代码时，还是只要关心UIComponent里的那三对方法即可。如果你扩展了自定义的UI组件，想要加入测量和布局的功能，就需要复写measure()和updateDisplayList()方法。其实各种各样的布局功能，也正是通过复写这两个方法来实现的。具体可以参考layouts包下面的布局类：BasicLayout,HorizontalLayout,VercticalLayout,TileLayout。（关于自适应流式布局的具体细节，我们会在下一篇教程中详细说明）

####4.其他失效验证

LayoutManager只提供了三种失效验证，但是其中的属性失效验证是通用的。所以我们可以用它扩展出其他有专门功能的失效验证(其实测量验证和布局验证也可以认为是属性失效验证的两个特殊扩展)。这里举一个例子，上一篇教程中提到的视图状态，大家还记得那一对invalidateSkinState()和commitCurrentState()方法吗：

{% highlight java linenos %}
class SkinnableComponent extends UIComponent{
 
    private stateIsDirty:boolean = false;
 
    public invalidateSkinState():void{
        if (this.stateIsDirty)
            return;
 
        this.stateIsDirty = true;
        this.invalidateProperties();
    }
 
    public commitProperties():void{
        super.commitProperties();
        if(this.stateIsDirty){
            this.stateIsDirty = false;
            this.validateSkinState();
        }
    }
 
    public validateSkinState():void{
        var curState:string = this.getCurrentSkinState();
        var skin:any = this._skin;
        if(skin&&"currentState" in skin){
            skin.currentState = curState;
        }
    }
 
    public getCurrentSkinState():string {
        return this.enabled?"normal":"disabled"
    }
}
{% endhighlight %}

SkinnableComponent是所有可定制皮肤的逻辑组件基类。逻辑组件里，在会影响视图状态的属性发生改变时，调用invalidateSkinState()方法来标记视图状态失效，本质上是调用了invalidateProperties()方法，再通过回调的commitProperties()方法来触发validateSkinState()，然后把getCurrentSkinState()的返回值赋值给皮肤的currentState属性，最后触发了皮肤里的commitCurrentState()方法来刷新视图。

通常情况下，单个属性的失效验证，我们都直接只用invalidateProperties()和commitProperties()这一对方法，只有功能特别独立而且通用的失效验证，才会单独为它增加一组invalidate和commit方法。总之，在阅读Egret GUI源码时，如果再遇到invalidate开头的失效方法，第一反应是应该去找validate开头的回调方法，然后找到最终执行验证的那个方法。