---
layout: post
title:  "空间填充"
permalink: post/guimanual/layout/spacer.html
type: guimanual
element: layout
version: Egret引擎 v1.x        特别鸣谢<a href="https://github.com/NeoGuo/" target="_blank">郭少瑞</a>同学撰写此文档
---

Spacer用于辅助布局，填充空间，作用类似于“占位符”。假如在一个横向布局的Group里面，两个按钮，一个在左侧，一个在右侧，该如何做呢？可以这样：

{% highlight java linenos %}
module uidemo
{
    export class SpacerDemo extends egret.gui.Group
    {
        public constructor() {
            super();
        }
        public createChildren(): void {
            super.createChildren();
            var group:egret.gui.Group = new egret.gui.Group();
            group.layout = new egret.gui.HorizontalLayout();
            var btn1:egret.gui.Button = new egret.gui.Button();
            btn1.label = "Left";
            var btn2:egret.gui.Button = new egret.gui.Button();
            btn2.label = "Right";
            var spacer:egret.gui.Spacer = new egret.gui.Spacer();
            spacer.percentWidth = 100;
            group.addElement(btn1);
            group.addElement(spacer);
            group.addElement(btn2);
            this.addElement(group);
        }
    }
}
{% endhighlight %}

> Spacer放中间，自动挤开空间

![github]({{site.baseurl}}/assets/img/spacer1.png "Egret")