---
layout: post
title:  "Tween缓动动画"
permalink: post/manual/anim/tween.html
type: manual
element: manualmoive
version: Egret引擎 v1.x
---

通常情况下，游戏中或多或少都会带有一些缓动动画。例如界面弹出，或者道具飞入飞出的特效等等。在制作这些缓动动画的时候我们仅仅
希望简单的办法实现这种移动或者变形缩放的效果。Egret中的 Tween 缓动动画类就为我们提供了相关的功能。

如果想使用缓动动画，你需要使用 `Tween` 这个类。 `Tween` 中封装了最常用的缓动动画功能，包括动画时间设定，缓动动画控制，
缓动效果控制等等。接下来我们看一个示例，如何制作一个最简单的缓动动画。

在这个示例中，我们绘制一个100*100的正方形，并且让他从x轴为50的位置移动到x轴为150的位置，运动过程使用时间为1s。


![img]({{site.baseurl}}/assets/img/tween1.gif)