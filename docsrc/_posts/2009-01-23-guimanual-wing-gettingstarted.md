---
layout: post
title:  "Getting Started"
permalink: post/guimanual/wing/gettingstarted.html
type: guimanual
element: wing
version: Egret引擎 v1.x
---

####写在前面的话
---

Egret Wing是一款可以创建、编辑和管理Exml皮肤的GUI工具。需要注意的一点是，目前Egret Wing并不是IDE，所以你还无法在Egret Wing中进行ts的编码工作。Wing的主要功能全部是针对Exml皮肤而言的。

Exml皮肤简单而言，就是通过标签语言描述皮肤内各个组件的一个皮肤文件。Exml最终会被编译器编译成ts文件。
如果您想详细了解此内容，请访问网址：<a href="{{site.baseurl}}/post/manual/other/gui1.html" target="_blank">http://docs.egret.com/post/manual/other/gui1.html</a>

基于上述介绍，将Egret Wing这样一个可视化GUI编辑工具，融入到你的开发工作中，势必将提升不少工作效率。那么如何将Egret Wing融入到你的开发工作中呢？

下面将通过一个简单的小例子到你走入Wing的工作流中。

####创建项目
---

Egret Wing是基于Egret Engine而运行的，如果你还没有安装Egret Engine，请到如下链接下载安装：<a href="http://www.egret.com/download/egret-download.html" target="_blank">http://www.egret.com/download/egret-download.html</a>

Egret Wing的项目，其实就是Egret项目。不过Egret Wing为您提供了可视化的项目创建流程：文件->新建项目。

![img]({{site.baseurl}}/assets/img/winggs-image1.png)

如上填写，当点击确定之后，Egret Wing会为您在E:/Egret/HelloWorld目录下创建一个HelloWorld项目，同时为此项目引入了GUI扩展的支持。

如果您创建失败了，请检查当前是否有安装最新版的Egret Engine。

创建成功之后，该项目便会在“包资源管理器”中呈现出来了。
 
![img]({{site.baseurl}}/assets/img/winggs-image2.png)

同时您也可以从系统的资源管理中看到对应的项目：
 
![img]({{site.baseurl}}/assets/img/winggs-image3.png)

预览EXML皮肤
您可以通过双击或者点击三角按钮的方式打开“包资源管理器”中的资源树，查看项目中的所有资源。
 
![img]({{site.baseurl}}/assets/img/winggs-image4.png)

在“文档区”中的“预览”视图下您可以看到当前打开的ButtonSkin.exml皮肤。
 
![img]({{site.baseurl}}/assets/img/winggs-image5.png)

同时您可以在“状态”面板中切换此按钮皮肤的不同状态，与此同时文档区中的显示和状态也会进行实时的更新。
 

![img]({{site.baseurl}}/assets/img/winggs-image6.png)

同理，“设计”视图可以对当前皮肤进行可视化的编辑，“源代码”视图可以查看当前exml的皮肤的编码。
 
![img]({{site.baseurl}}/assets/img/winggs-image7.png)

具体的编辑过程，我们会在之后的章节进行介绍...

####创建简单的面板
---

在Egret Wing中创建一个面板即创建一个面板的exml皮肤，您可以通过如下方式中的任意一种实现：在“包资源管理器”中右键，选择“新建EXML”，或菜单项：文件->新建EXML皮肤。
 
![img]({{site.baseurl}}/assets/img/winggs-image8.png)

您可以按照如上图进行配置您的PanelTestSkin皮肤，点击确定之后，便在指定的包下创建好了PanelSkinTest.exml皮肤类。

![img]({{site.baseurl}}/assets/img/winggs-image9.png)

将您的“文档区”切换到“设计”视图，从“组件”面板中拖拽一个Button到“文档区”视图中。
同理我们可以从“组件”面板中，再拖拽一个Label组件到视图中。

 
![img]({{site.baseurl}}/assets/img/winggs-image10.png)

于是，Label以及我们最开始预览的ButtonSkin便伴随着默认的逻辑组件被一起拖拽到了视图中。
 
![img]({{site.baseurl}}/assets/img/winggs-image11.png)

####逻辑组件与皮肤组件之间的对应
---

您也许会有疑问，那刚刚的皮肤exml文件是如何与现在拖出来的组件相对应上的呢？
下面将为大家解答皮肤组件与逻辑组件之间的对应。

关于什么是逻辑组件和皮肤组件，可以访问网址：<a href="{{site.baseurl}}/post/manual/other/gui1.html" target="_blank">http://docs.egret.com/post/manual/other/gui1.html</a>

实现皮肤组件与逻辑组件之间的对应可以有如下三种方式：
* 在ts代码中显示设置
* 使用SkinAdapter类
* 使用皮肤主题
这三种方式的优先级顺序为：显示设置>SkinAdapter>皮肤主题

上面的例子中，便是使用了皮肤主题的方式让逻辑组件与皮肤组件对应上的。

您可以通过右键点击项目，选择“项目属性”的方式，查看和编辑当前项目的主题。
 
![img]({{site.baseurl}}/assets/img/winggs-image12.png)

上述红框内，便是我们之前查看过的按钮皮肤的对应关系。您还可以通过编辑按钮改变组件与皮肤的对应关系。

您现在可以尝试点击“文档区”中“预览”视图下的按钮。此时该按钮是有交互效果的。并且，与最终运行在浏览器或其他设备上的效果完全一致。

####编辑皮肤
---

下面我们为大家介绍如何编辑一个皮肤，还以刚刚的ButtonSkin为例。
选中中间的文本标签。您也可以在“图层”面板中进行选择。
 
![img]({{site.baseurl}}/assets/img/winggs-image13.png)

切换状态面板中，当前状态为[所有状态]。
 
![img]({{site.baseurl}}/assets/img/winggs-image14.png)

在属性面板中，修改常用->文本，为任意文字，以方便我们预览。
 
![img]({{site.baseurl}}/assets/img/winggs-image15.png)

之后我们切换“状态”面板为“down”，再次在属性面板中，修改样式中的颜色为红色。
 
![img]({{site.baseurl}}/assets/img/winggs-image16.png)

保存当前编辑的ButtonSkin。
此时，文档区的中文本标签的颜色在down状态下已经变成了红色。
 
![img]({{site.baseurl}}/assets/img/winggs-image17.png)

将“文档区”切换至我们之前创建的PanelTestSkin.exml，同时切换视图状态为“预览”,再次点击按钮，你会发现，当按钮被按下的时候，文本已经成了我们设置的样式了。
 
![img]({{site.baseurl}}/assets/img/winggs-image18.png)

####编写逻辑类
---

到目前为止，您所编辑的面板，还无法在网页中浏览。 因为之前我们编辑的都是皮肤组件，皮肤组件是需要与逻辑组件相配合才能最终在网页或者设备中显示的。

下面我将以PanelTestSkin.exml这个皮肤为例，编写他的逻辑组件。
再此之前，我们需要先设置好PanelTestSkin皮肤中，标签和按钮的id分别为labelDisplay和buttonDisplay。
 
![img]({{site.baseurl}}/assets/img/winggs-image19.png)


以下对于TypeScript创建以及编码的操作您可以在任何一款支持TypeScript的代码编辑器中进行。只需要目录结构和类内容与本文介绍的一致即可。

在components包下创建一个名为PanelTest.ts的类。
目录结构如下图：
 
![img]({{site.baseurl}}/assets/img/winggs-image20.png)

类内容如下：

{% highlight java linenos %}
class PanelTest extends egret.gui.Panel{
    public constructor(){
        super();
        this.skinName = "skins.panel.PanelTestSkin";
    }

    public labelDisplay:egret.gui.Label;
    public buttonDisplay:egret.gui.Button;

    public partAdded(partName: string, instance: any): void{
        super.partAdded(partName,instance);
        //绑定成功之后为对应的组件赋值
        if(instance == this.labelDisplay)
        {
           this.labelDisplay.text = "绑定的标签";
        }
        if(instance == this.buttonDisplay)
        {
            this.buttonDisplay.label = "绑定的按钮"
            //为按钮组件添加触碰事件，同时改变上面文本标签的显示
            this.buttonDisplay.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.buttonTouchEventHandler,this);
            this.buttonDisplay.addEventListener(egret.TouchEvent.TOUCH_END,this.buttonTouchEventHandler,this)
        }
    }

    private buttonTouchEventHandler(e:egret.TouchEvent):void{
       if(e.type == egret.TouchEvent.TOUCH_BEGIN && this.labelDisplay)
       {
           this.labelDisplay.text = "按钮按下";
       }else if(e.type == egret.TouchEvent.TOUCH_END && this.labelDisplay)
       {
           this.labelDisplay.text = "按钮松起";
       }
    }
}
{% endhighlight %}

同时再修改项目中Main.ts类中的createScene()方法：

{% highlight java linenos %}
    private createScene():void{
        //游戏场景层，游戏场景相关内容可以放在这里面。
        this.gameLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameLayer);
        var bitmap:egret.Bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes("bgImage");
        this.gameLayer.addChild(bitmap);

        //GUI的组件必须都在这个容器内部,UIStage会始终自动保持跟舞台一样大小。
        this.guiLayer = new egret.gui.UIStage();
        this.addChild(this.guiLayer);

        //实例化PanelTest类并添加到gui层上
        var panelTest:PanelTest = new PanelTest();
        this.guiLayer.addElement(panelTest);
    }
{% endhighlight %}

此时您在Egret Wing的工具栏中点击 ![img]({{site.baseurl}}/assets/img/winggs-image21.png)（运行）按钮。稍等片刻，边会在浏览器中看到我们刚刚编辑的皮肤样式了。
 
![img]({{site.baseurl}}/assets/img/winggs-image22.png)

###调整皮肤类
---

之所以文本与下面的按钮无法对齐，是因为我们还没有对这两个组件的位置进行约束。

接下来，我们在不修改ts代码的情况下，调整皮肤，并直接运行查看效果。
选中标签，勾选“属性”面板中“约束”分类里的水平居中，并修改数值为0。
 
![img]({{site.baseurl}}/assets/img/winggs-image23.png)

同理，也修改按钮的约束属性为如上描述。

保存修改后，点击运行。
此时，网页中的两个组件便已经相对于父级容器水平居中了。
 
![img]({{site.baseurl}}/assets/img/winggs-image24.png)

其他
如果您想学习更多Egret相关内容，请访问网址：<a href="http://docs.egret.com/home.html" target="_blank">http://docs.egret.com/home.html</a>

如果您想参阅Egret Wing的详细用户手册，请访问网址：<a href="{{site.baseurl}}/post/guimanual/wing/aboutwing.html" target="_blank">http://docs.egret.com/post/guimanual/wing/aboutwing.html</a>
