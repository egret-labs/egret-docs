---
layout: post
title:  Res Tool
permalink: post/tools/egrettools/restool.html
type: tools
element: egrettools
version: Res Tool v1.x
---

![ResTool]({{site.baseurl}}/assets/img/restool1.png)

**适应平台：**Windows、Mac OS X

**下载地址：**[点击进入官方下载地址](http://www.egret-labs.org/download/restool-download.html)

Res Tool的主要目的是方便大家编辑和创建resource.json这个资源配置文件。

下面以一个CoreExample项目为例讲述该软件的使用方法：

####1.载入资源
---

将CoreExample\resources\assets\480这个目录下的全部资源，全选。拖入到如下的红框框里。

![ResTool]({{site.baseurl}}/assets/img/restool2.png)

通过这一步骤，就可将资源就被加载进来。但仅仅是对需要使用的资源进行标记。如果部分资源不会在游戏中使用，则无需将资源拖入到资源列表中。

####2.创建组
---

![ResTool]({{site.baseurl}}/assets/img/restool3.png)

点击资源组框里的添加按钮会弹出如下对话框：

![ResTool]({{site.baseurl}}/assets/img/restool4.png)

设置资源组名称，这里的名称使用**英文**。

####3.添加组内资源
---

选中一个组，按住ctrl加选或者shift多选资源框里的资源，然后拖拽资源到红框里。

![ResTool]({{site.baseurl}}/assets/img/restool5.png)

拖入之后，资源就可以被添加到了选中资源组中。

![ResTool]({{site.baseurl}}/assets/img/restool6.png)

####4.删除
---

点击某个选中资源或资源组，按键盘delete键，删除，此时弹出对话框：

![ResTool]({{site.baseurl}}/assets/img/restool7.png)

这里可以按回车键快速确认。
此删除方式适用于：删除资源、删除资源组、将资源从某个组内移除。

####5.设置相对路径
---

点击根路径后面的浏览，选择项目的资源的根路径。

![ResTool]({{site.baseurl}}/assets/img/restool8.png)

所有的路径将自动变为相对路径。

![ResTool]({{site.baseurl}}/assets/img/restool9.png)

####6.保存
---

点击保存之后会自动在选择的目录下生成一个json文件。

####7.其他
---

红色代表有错误，即资源名重名，或资源组名重名。注意，在有错误的情况下是无法保存资源配置文件的。
如果有什么资源找不到了，可以通过搜索框进行搜索筛选。工具会自动过滤掉不包含搜索关键字的资源条目。

![ResTool]({{site.baseurl}}/assets/img/restool10.png)

####8.资源类型配置
---

点击**设置**——>**资源类型配置**，打开“资源类型配置”面板。

![ResTool]({{site.baseurl}}/assets/img/restool11.jpg)

####9.编辑九宫格
---

编辑九宫格，选中图片资源，右键，编辑九宫格。

![ResTool]({{site.baseurl}}/assets/img/restool12.png)

弹出如下窗体：

![ResTool]({{site.baseurl}}/assets/img/restool13.png)

**操作方法**

* 鼠标滚轮：缩放
* 拖拽图片：移动图片
* 拖拽虚线：编辑九宫格

**快捷键列表**

* ctrl+n：  创建组
* ctrl+o：  打开一个资源配置的json文件
* ctrl+s：  保存当前编辑
* ctrl+f：  搜索
* delete：  删除资源、删除资源组、将组内资源从组中移除
* 回车键：   确认各种提示框。