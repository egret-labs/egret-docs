---
layout: post
title:  "EGRET GUI AFL自适应流式布局"
permalink: post/manual/other/gui3.html
type: guimanual
element: designgui
version: Egret引擎 v1.x
---
####1.什么是AFL？

Egret GUI采用了AFL(Adaptive Fluid Layout)自适应流式布局的布局体系。AFL是对组件坐标和容器布局的一系列高层封装，让开发者能以更符合自然语言的方式，用各种相对属性去设计布局规则，并且在显示列表发生改变时，能自动应用当前布局规则以适应新的尺寸。下面是AFL的一个简单例子：

{% highlight java linenos %}
class GameApp extends egret.DisplayObjectContainer{
 
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
 
    public onAddToStage(event:egret.Event):void{
        var uiStage:egret.gui.UIStage = new egret.gui.UIStage();
        this.addChild(uiStage);
 
        //创建标题栏背景
        var asset:egret.gui.UIAsset = new egret.gui.UIAsset();
        asset.source = "header-background";
        asset.fillMode = egret.BitmapFillMode.REPEAT;
        asset.percentWidth = 100;
        asset.height = 90;
        uiStage.addElement(asset);
 
        //创建标题文本
        var title:egret.gui.Label = new egret.gui.Label();
        title.horizontalCenter = 0;
        title.top = 25;
        title.text = "Alert";
        uiStage.addElement(title);
 
        //创建返回按钮
        var backButton:egret.gui.Button = new egret.gui.Button();
        backButton.skinName = BackButtonSkin;
        backButton.top = 16;
        backButton.left = 16;
        backButton.label = "Back";
        uiStage.addElement(backButton);
 
        //创建内容区域容器
        var contentGroup:egret.gui.Group = new egret.gui.Group();
        contentGroup.percentWidth = 100;
        contentGroup.top = 90;
        contentGroup.bottom = 0;
        uiStage.addElement(contentGroup);
 
        //创建"Show Alert"按钮
        var button:egret.gui.Button = new egret.gui.Button();
        button.skinName = ButtonSkin;
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        button.label = "Show Alert";
        contentGroup.addElement(button);
    }
}
{% endhighlight %}

GameApp是程序的第一个启动类，也就是文档类。我们在GameApp被添加到舞台时，开始创建一系列的子项:

(1)首先要创建一个UIStage，它是GUI的根容器，衔接GUI显示列表和普通显示列表的桥梁，所有的GUI组件都要添加到它里面才能实现AFL。它的宽高会自动跟舞台宽高保持一致。

(2)标题栏背景:显式设置高度为90像素，宽度设置为父级容器的100%(percentWidth = 100)，也就是始终跟uiStage一样宽。

(3)标题文本:垂直方向距离顶部25像素(top = 25，这里等同于直接设置y=25)。水平方向居中(horizontalCenter = 0)。

(4)返回按钮:垂直方向距离顶部16像素，水平方向距离左边16像素。同理，这里也可以直接设置x = y = 16。

(5)内容容器:水平方向宽度跟父级容器保持一致(percentWidth = 10),注意下垂直方向，距离顶部90像素且距离底部0像素(top = 90,bottom = 0)，也就是说它的高度会被拉伸，以填满父级y=90至最底部的区域。最终效果就是contentGroup始终覆盖除了标题栏的区域。

(6)”Show Alert”按钮:注意这个按钮被添加到了内容容器里，他的水平位置和垂直位置都相对contentGroup居中。

这样定义布局规则后，无论舞台尺寸变成什么比例，最终的显示效果都会自动适应。而不需要改动一行代码。这能有效解决移动开发中的各种屏幕分辨率适配问题。运行结果大致如下图(注:素材来源于Feathers框架):

![egret gui]({{site.baseurl}}/assets/img/egretgui3.jpg)

AFL不仅能解决屏幕分辨率适配问题，同样也是皮肤复用的基石。使用ALF方式布局的皮肤，能够自动适应各种逻辑组件尺寸，自动调整内部皮肤部件的位置，从而最大程度上复用皮肤。

关于流式结构，我们以上面的代码为例：”Show Alert”按钮在contentGroup中，contentGroup在uiStage中。当uiStage尺寸发生改变时，就会去调整contentGroup的尺寸，从而contentGroup再刷新布局调整”Show Alert”按钮的位置，始终保持居中。整个是GUI的显示列表就是这样一个结构，一处发生改变，与其相关联组件的位置尺寸都会自动刷新。并且这个自动刷新过程无需担心频繁的计算消耗，因为前一篇教程中的失效验证机制已经渗透到AFL的方方面面，正是用来为AFL提供强力性能保障的。

####2.AFL实现原理

AFL本质上就是封装了各种更加便捷的相对布局属性，结合失效验证机制(参考第二篇教程)，在合适的触发条件下(如尺寸发生改变时)，自动设置相关对象的x，y,width,height等属性。所以无论过程是怎么样的，最终结果都是直接体现在x,y,width,height这些最原始的属性上，并没有脱离显示对象原始的API。

在第二篇教程中，我们简单介绍了跟布局有关的两个方法：measure()和updateDisplayList()。现在我们来详细说明这个两个方法：

updateDisplayList()方法负责布局子项(即设置子项的x,y,width,height),或做一些矢量重绘操作。这个方法很好理解，具体的布局功能就是在这里实现的。那为什么要measure()呢？举个例子，你有一个容器(Group)，里面放了一个单行文本(Label)，你想要文本始终在容器中水平居中(horizotalCenter=0)。那么你不显式设置文本的width即可，这时measure()方法就派上用场了，它会在文本内容改变时，自动测量出当前合适的width，父级就会根据这个width，重新布局它的xy。

框架里所有的组件都是这样：如果你不显式设置它的宽高，它就调用measure()方法给自己测量出一个最佳尺寸，在没有被父级强制布局情况下，这个值最终赋值给width和height属性。反之，如果你显式设置了组件的width或height属性，width或height就使用你显式设置的值。若组件同时被设置了width和height，measure()方法将不会再被调用。至于何为测量的”最佳尺寸”？不同的组件有自己的测量方式，容器是能刚好放下所有子项的尺寸，文本是能完整显式文本内容的尺寸，而UIAsset则是内部要显示的素材的尺寸。还有其他的组件，具体在各自的measure()方法里实现。多个组件都需要测量的时候，会按照显式列表深度，从内向外测量。而布局阶段正好相反，从外向内。具体细节参考第二篇教程的内容。

总之，如果你希望你自定义的组件像框架里的标准组件一样，能加入AFL的布局体系，就必须要同时复写measure()和updateDisplayList()这两个方法。而我们在UIComponent里可以看到，这两个方法的方法体是空的，也就是说UIComponent本身是不具有测量和布局功能的，它的子项组件才有。那我们就先来看GroupBase这个容器基类。它是Group和DataGroup的基类，也就是说，所有容器和列表容器，都是继承自它的布局方法。而它就一个类，是如何实现的多种多样的布局方式的呢？答案是：它不负责具体的布局规则，而是做了一个解耦处理。增加了一个layout的属性，类型为LayoutBase。我们先看下GroupBase的那两个方法体里写了什么：

{% highlight java linenos %}
public measure():void{
    if(!this._layout||!this._layoutInvalidateSizeFlag)
    return;
    super.measure();
    this._layout.measure();
}
public updateDisplayList(unscaledWidth:number, unscaledHeight:number):void{
    super.updateDisplayList(unscaledWidth, unscaledHeight);
    if (this._layoutInvalidateDisplayListFlag&&this._layout){
        this._layoutInvalidateDisplayListFlag = false;
        this._layout.updateDisplayList(unscaledWidth, unscaledHeight);
        this.updateScrollRect(unscaledWidth, unscaledHeight);
    }
}
{% endhighlight %}

GroupBase把自己的measure()方法交给了layout.measure()去实现，updateDisplayList()交给了layout.updateDisplayList()去实现。也就是把具体的布局方式解耦了出来，成了独立的一个LayoutBase类。这样所有的容器都可以采用GroupBase+LayoutBase的组合的方式，为自己设置任意的布局。

LayoutBase的典型子类有四个：BasicLayout(基本布局)，HorizontalLayout(水平布局)，VerticalLayout(垂直布局)，TileLayout(网格布局)。下面概括性地总结下每个布局类。

####3.BasicLayout

基本布局，这是最简单的布局类，也是Group容器的默认布局。它主要操作子项(ILayoutElement)的top,left,right,bottom,horizontalCenter,verticalCenter,percentWidth,percentHeight等属性，根据这些属性的组合来完成布局。下面简单介绍下这些布局属性：

top代表子项的顶部距离父级容器顶部多少像素，跟直接设置y是一样的效果，但是如果你同时设置了y和top，top的优先级比y高，将会以top为准。bottom就是子项的底部距离父级容器底部多少像素。这跟父级容器和子项的height都有关。例如父级容器height为100，子项height为50，这时单独设置子项bottom=10。那最终的结果就是，子项的y为100-10-50 = 40。那如果同时设置top和bottom呢？这时为了保证top和bottom都正确，就会拉伸子项的height。那如果又同时显式设置了子项的height呢？跟前面一样，布局属性优先级是最高的，以布局属性的设置为准。left和right只是方向不同，同理不解释。这四个属性的一个经典应用就是top = left = right = bottom = 0;意思是让子项铺满父级容器，始终跟随父级容器大小改变自己的大小。另外注意，这四个属性都可以为负值。就是超出父级容器的边缘。

horizontalCenter很容易看出来，是水平居中的意思。设置horizontalCenter为0。就是让子项的水平中心点和父级容器的水平中心点对齐。这个值也可以为正负值。设置horizontalCenter为10表示，在中心对齐的情况下，再向右偏移10像素。-10就是向左偏移10像素。这个属性都只影响子项的x，不影响width。但它的优先级比left，right对x的影响更高。如果同时都设置了，子项x将以horizontalCenter的设置为准。verticalCenter同理。

percentWidth只影响width。但是它比left+right的方式优先级低。它是个百分比，设置percentWidth为100。将会拉伸子项的width跟父级容器一样。你可以设置其他值，50就表示父级的一半。这种方式与设置left+right的方式差别是，percentWidth不影响x，此时你仍然可以设置x，或者单独的left和right，组合使用。percentHeight同理。

总结: horizontalCenter,verticalCenter只影响x,y，percentWidth,percentHeight只影响width,height。top,left,right,bottom既影响xy又影响width,height。对坐标的影响优先级： horizontalCenter,verticalCenter > top,left,right,bottom。对尺寸的影响的优先级：top,left,right,bottom > percentWidth,percentHeight。另外，以上所有属性，如果想取消显式设置，赋值为NaN即可(0也是显式设置的值，只有NaN表示不设置这个属性)。

####4.HorizontalLayout和VerticalLayout

水平和垂直布局，这两个类除了方向不同，逻辑完全一致。它们主要用在列表数据容器里，例如DataGroup。这里要注意下：它们操作的子项布局属性只有percentWidth和percentHeight，top和left等其他属性都是无效的，大部分布局样式都直接在布局类上设置，不在子项上。下面就以VerticalLayout为例说明，HorizontalLayout同理。

VerticalLayout表示按子项显示深度顺序从上到下一个接一个排列子项，子项可以有不同的高度。如果子项设置了percentWidth，则跟BasicLayout里一样，子项宽度会被设置成父级容器的相应百分比。但是percentHeight在这里的含义跟BasicLayout里是不同的：是排列完所有固定高度的子项后，父级容器还剩余的高度空间(extraHeight)，按照percentHeight分配给对应子项。分配规则是这样：例如有两个子项都设置了percentHeight，一个100，一个80。则分配给它们的高度分别为extraHeight*100/(100+80),extraHeight*80/(100+80)。percentHeight在这里已经不是相对父级的百分比了，而是相对其他子项的比例值。如果只有一项，永远是分配到所有extraHeight。

以上是子项上的布局属性，下面接着说布局类上的属性。首先是四个内边距属性：paddingLeft，paddingRight，paddingTop和paddingBottom。含义是分别在四边各留出多少空白空间。这里还有一个padding属性，可以快速设置四个方向的内边距默认值，但是显式设置了任何一边，都以显式设置的为准。举个例子，如果要设置左边距10，其它三边5。这样写即可：padding = 5;paddingLeft = 10;取消某一边的显式设置，同样是赋值为NaN。

VecticalLayout.horizontalAlign属性，子项的水平对齐方式。参考HorizontalAlign类定义的静态常量，默认值是HorizontalAlign.LEFT，即左对齐。HorizontalAlign.RIGHT和HorizontalAlign.CENTER分别是右对齐和居中对齐。这里需要说下HorizontalAlign.JUSTIFY和HorizontalAlign.CONTENT_JUSTIFY的区别，前者是强制设置所有子项跟父级容器一样宽，后者是设置所有子项与最宽的那个子项一样宽，但是当最宽的子项都小于父级容器宽是，就设置为父级容器宽。也就是子项可以比父级容器宽但不能更窄。

VecticalLayout.verticalAlign属性，由于本身是垂直布局，所以这个属性不支持VerticalAlign.CONTENT_JUSTIFY。而VerticalAlign.JUSTIFY的表现是按比例拉伸每个子项的高度以填满父级容器高度。

VecticalLayout.gap属性，就是每项之间的间距。

最后说下useVirtualLayout属性，设为true将会开启虚拟布局。虚拟布局功能只针对DataGroup使用。简单解释下原理：虚拟布局是一种性能优化措施。在列表组件中，可能数据源的项数目非常巨大，但是开启虚拟布局后，只实例化你能看见的几项，然后滚动的过程中，通过重新填装数据来复用子项。当你向上滚动时，滚出屏幕的子项就会被移动到底部重新填装数据接着滚回来，这样不断连续。视觉上看不出差别，但性能优化很明显。水平和垂直布局类在开启虚拟布局后，由于目标容器上实际只有可见的几个子项，所以需要缓存实例化过的子项尺寸，然后进行测量和布局。如果对具体实现有兴趣，请自行阅读源码。

####5.TileLayout

网格布局，以最大子项的尺寸为标准划分格子。它和水平/垂直布局一样，操作的子项布局属性只有percentWidth和percentHeight，其他无效。不过这两个属性的作用改成了相对一个格子的大小，不是相对父级容器的。自身的属性：padding内边距属性同上。也有horizontalAlign和verticalAlign，不过都是相对一个格子内的对齐方式。如果想设置格子相对容器的对齐方式，是设置columnAlign和rowAlign属性。格子间距分为：horizontalGap(水平间距)和verticalGap(垂直间距)。columnWidth(列宽)和rowHeight(行高)属性能显式指定格子大小，不再使用最大子项的尺寸作为格子大小。requestedRowCount和requestedColumnCount能显式指定需要多少行多少列。orientation属性指定按行排列还是按列排列。这些属性的用法都可以在API注释中查看，比较详细，在此不再赘述。

有必要说的一个地方是，由于TileLayout是同时两个方向(水平和垂直)的排列布局，所以对它的测量带来了一定困难。如果是按行排列(orientation==TileOrientation.ROWS)情况下,测量的高度要根据显式的宽度值才能确定。所以当宽度不是显式设置时，它就无法准确测量高度了。在这种情况下，它的测量结果会尽可能地形成一个正方形。避免出现这种情况的方式是：显示设置目标容器的宽度或设置requestedColumnCount属性(如果是按列布局，就是显示设置容器的高度或requestedRowCount属性)。总之要避免两个方向同时不设置，导致都需要靠测量的情况。

####6.与布局相关的其他属性

上面的布局类里简单介绍了几个子项上的布局属性。除了那些，我们平时还会看到其他与布局和调试相关的属性：

(1)includeInLayout：指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。如果你想”完全”隐藏掉一个组件，同时设置它的visible和includeInLayout为false即可。

(2)explicitWidth，explicitHeight：显式设置的宽高值。默认情况下这两个值是NaN。当你显式调用width或height的setter方法赋值时，就会同时对这两个值赋值。width/height的值不一定会一直是你设置的值。如果你设置了布局属性（top+bottom等），就会导致width/height被父级设置成其他值。(父级是通过setActualSize()方法设置宽高的，不会触发setter方法)。所以这两个属性的作用就是保存你显式设置的值。调试的时候也可以根据这个判断，是否是被显式设置了尺寸，还是父级强制布局的。

(3)measuredWidth，measuredHeight：每个组件measure()方法执行的最终结果就是对这两个属性赋值。它们只记录测量结果。

(4)maxWidth,minWidth,maxHeight,minHeight：最大和最小尺寸。这里要注意：他们只影响测量的结果。也就是你没有显式设置组件宽高的时候才有效。measure()方法执行完会对measuredWidth，measuredHeight赋值一次。然后交给UIComponent里的validteSize()方法，再次规范测量结果。这时候就根据这四个值来规范的。最终确定measuredWidth，measuredHeight的值。

(5)width,height：这两个属性储存组件经过各种布局计算后得到的最终的尺寸值。width和height的取值规则：如果没有显式设置它们，就会根据测量的值赋值到它们上，显式设置了，就以显式设置的值为准，但是如果同时设置top+bottom或percentHeight这种布局属性的值，就会以布局属性为准。总结下优先级顺序是：布局设置的值 > 显式设置的值 > 测量的值。

(6)preferredWidth，preferredHeight：首选宽高，这两个值通常在measure()方法中被调用。只是个便捷方法，按照explicitWidth，explicitHeight > measuredWidth，measuredHeight的优先级返回值。布局类在measure()方法中，调用子项的这个属性，来获取子项的测量结果。累加到自身的测量结果上。注意这个值已经包含scale的值，且返回值永远为正数。

(7)layoutBoundsWidth,layoutBoundsHeight：布局宽高，这两个值通常在updateDisplayList()方法中被调用。也是个便捷方法。按照 布局设置的宽高 > explicitWidth，explicitHeight > measuredWidth，measuredHeight的优先级返回值。注意这个值已经包含scale的值，且返回值永远为正数。

(8)preferredX,preferredY,layoutBoundsX,layoutBoundsY：这四个属性，通常情况下就是xy的值。但是当scaleX/scaleY为负数时。他们为x-layoutBoundsWidth或y-layoutBoundsHeight的值。即图像对称缩放后实际显示的起点。

####7.AFL调试技巧

在没有AFL的体系里，一个组件的尺寸表现错了。直接在这个组件上找问题即可。但当我们引入AFL后，由于组件在显示列表上的布局是互相影响的。所以一个组件的尺寸或位置不对。问题不一定是在这个组件上，而是有可能在他的父级或子项上。所以我们调试的第一步，一定是先定位到出问题的那个组件。再调试那个组件找出显示不正确的原因。定位的方法可以参考以下步骤进行：

(1)自身是否被显式设置了尺寸？查看explicitWidth，explicitHeight。如果显式设置了，设置的对吗？不对找到问题。没有显式设置就继续。

(2)测量的尺寸对不对？查看measuredWidth，measuredHeight。不对，继续。对，跳到(5)

(3)查看top,left,right,bottom,horizontalCenter,verticalCenter,percentWidth,percentHeight这些布局属性对不对。注意：只有BasicLayout下这些属性才全部有效。

(4)布局类对吗？查看layout属性。以上都查过了，找不出问题，继续按(5)和(6)在显示列表向上或向下开始找。

(5)向上查看父级以及父级的父级容器的相关属性，是否正确。是否是父级容器强制设置了我们的尺寸。

(6)查看子项以及子项的子项的测量尺寸。找到第一个开始不对的节点。

注意：因为Skin是非显示对象，所以它不在显示列表上，但是Skin上的宽高设置也会影响测量。所以检查显示列表时，不要忽略Skin这一层。可以从组件的skin属性上访问它。

####8.为何要使用addElement()等方法

通过以上的说明，相信大家已经大体理解了AFL的布局体系和原理：必须整个GUI显示列表里的每一层显示对象都支持测量和布局，AFL才能正确运行起来。他们之间是互相影响的，层层向上测量，层层向下布局。中间如果断了一层，后续的测量和布局将全部失效。所以在GUI范围内，我们引入了一套独立的显示列表操作方法：addElement()系列方法，来替代原生的addChild()系列方法。addElement()只接受实现了的IVisualElement的显示对象作为参数，而原生的显示对象类型都只是DisplayObject，没有实现此接口。并且强制调用GUI组件的addChild()方法也会抛出一个错。我们正是通过这种方式来避免传统的显示对象被混入GUI显示列表，造成AFL失效的。

虽然AFL不允许原生显示对象混入GUI显示列表的中间层。但是允许GUI显示列表的根节点或者叶子节点与原生显示对象混合。

在根节点上的桥接组件就是UIStage，可以直接把它addChild()到原生的显示列表里。因为GUI组件本身就是标准的DisplayObject。剩下的所有GUI组件都必须在它内部。UIStage就是一个特殊的Group组件，它除了标准的容器功能外，还监听了舞台的尺寸改变。让自身始终与舞台保持相同大小，以此来触发整个GUI显示列表对舞台尺寸的自适应。设置UIStage.autoResize = false可以取消与舞台尺寸的同步功能。

而在末端叶子节点，桥接的组件是UIAsset。他是一个原生显示对象的包装器。可以把原生显示对象赋值给UIAsset.source属性，然后addElement()这个UIAsset到GUI显示列表。UIAsset会在第一次添加到显示列表时，测量source的尺寸。提供给父级容器参与布局计算。并在得到布局结果后，让source始终跟UIAsset的尺寸保持一致。同样，设置UIAsset.autoScale = false可以取消对source的布局。