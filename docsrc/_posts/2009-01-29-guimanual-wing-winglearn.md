---
layout: post
title:  "Egret Wing入门"
permalink: post/guimanual/wing/winglearn.html
type: guimanual
element: wing
version: Egret引擎 v1.x
---

Egret Wing是一个针对Egret项目GUI扩展框架的编辑器。您可以使用通过Egret Wing快速搭建Egret项目的界面。
Egret Wing包含以下名词解释：

工作区 指界面面板的布局。开发者可以按照自己的喜好修改默认工作区的布局，同时也可以创建新的工作区。


![img]({{site.baseurl}}/assets/img/wing-image1.png)

文档区 对Exml文件进行编辑的区域。

![img]({{site.baseurl}}/assets/img/wing-image2.png)

* 视图模式 文档区中针对Exml的显示方式。其中有“源代码”、“设计”和“预览”。
* 视图模式—源代码 指文档区中对某一个Exml皮肤进行文本查看的视图模式。
* 视图模式—设计 指文档区中对某一个Exml皮肤进行可视化操作和编辑的视图模式。
* 视图模式—预览 指文档区中对某一个Exml皮肤进行预览的视图模式，在此模式下所有皮肤组件均有交互效果。
* 资源 指项目项目中的文件和文件夹。
* 项目 构成Egret应用程序的所有资源都包含在项目中。要在Egret Wing中构建和编辑GUI，必须先构建一个项目。

####Egret Wing的面板
---
#####“包资源管理器”面板

“包资源管理器”面板包含当前Egret Wing已经载入的所有项目和资源。
在包资源管理器中工作时，可以设置某一项目的属性配置，以及对任意资源进行复制、删除、重命名等操作。

![img]({{site.baseurl}}/assets/img/wing-image3.png)

#####“组件”面板

组件面板包含当前项目中所有可以使用的组件列表，其种类为“控件”，“布局”，“自定义”。您可以通过拖拽的方式把在文档区的设计视图中创建组件。

![img]({{site.baseurl}}/assets/img/wing-image4.png)

#####“图层”面板

该面板展示出当前文档区正在编辑的Exml皮肤文件中所有组件的层级结构。您可以通过该面板快速选中在文档区中与之对应的组件。
您也可以通过该面板更直观的调节文档区中组件之间的层级结构。

![img]({{site.baseurl}}/assets/img/wing-image5.png)

#####“控制台”面板

控制台面板会在解析Exml皮肤错误的时候显示对应的错误信息。

![img]({{site.baseurl}}/assets/img/wing-image6.png)

#####“进度”面板

进度面板展示当前正在编译和运行的项目与进度窗台。同时可以控制关闭该项目运行的服务器。

![img]({{site.baseurl}}/assets/img/wing-image7.png)

#####“资源库”面板

资源库面板中展示当前项目中所有可以被加载的资源，资源库中的资源依赖于项目使用的资源插件。
您也可以通过拖拽的方式将资源库面板中的资源拖拽到文档区的设计视图模式中以创建该UIAsset。

![img]({{site.baseurl}}/assets/img/wing-image8.png)

#####“状态”面板

通过“状态”面板可以方便查看Exml皮肤在不同状态下的呈现效果。同时可以切换到不同状态对Exml皮肤进行编辑。如：按钮的normal, over, down, disabled四个状态。


![img]({{site.baseurl}}/assets/img/wing-image9.png)


#####“属性”面板

您可以通过“属性”面板直接操作当前被选中组件的属性。

![img]({{site.baseurl}}/assets/img/wing-image10.png)

同时属性面板还有另一个模式“所有属性”。方便您编辑组件的所有属性。

![img]({{site.baseurl}}/assets/img/wing-image11.png)
