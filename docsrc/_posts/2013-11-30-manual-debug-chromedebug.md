---
layout: post
title:  "使用Chrome调试Egret"
permalink: post/manual/debug/chromedebug.html
type: manual
element: manualdebug
version: Egret引擎 v1.x
---

####1.如何使用 Chrome调试 Egret应用

在使用Chrome调试Egret程序之前，请先确保如下两项事宜：

1. 确认 Chrome是您的默认浏览器
2. 执行 `egret startserver egret-examples` 打开测试项目

>您也可以直接打开 Chrome浏览器，并手动输入url地址

**打开JavaScript控制台**

Windows：**设置**——>**工具**——>**JavaScript控制台**

Mac OS X：**试图**——>**开发者**——>**JavaScript控制台**

效果如图：

![Chrome Debug]({{site.baseurl}}/assets/img/chromedebug1.png)

***为了保证最佳体验，请按住右下角的控制台面板按钮，切换控制台面板的位置为下图所示***

![Chrome Debug]({{site.baseurl}}/assets/img/chromedebug3.png)

![Chrome Debug]({{site.baseurl}}/assets/img/chromedebug2.png)

**您可以通过 JavaScript控制台来查看控制台输出，以及进行断点级别的调试**

####2.如何在控制台输出

在 JavaScript / TypeScript 代码中输入 `console.log ("Hello,World");`即可。

####3.如何进行断点调试

* 在 JavaScript 控制台中打开 source 面板
* 打开特定的源代码文件，双击特定代码行，进行断点调试
* 更多有关 Chrome 断点调试的文章，可以参考 <a href="http://han.guokai.blog.163.com/blog/static/136718271201321402514114/" target="_blank">这篇文章</a>。

####4.如何禁用浏览器缓存

* 打开Chrome浏览器
* JavaScript控制台
* 在JavaScript控制台（右下角）设置（齿轮图标）-> 常用 -> 禁用浏览器缓存
* 当进行好上述设置之后，只要JavaScript控制台处于打开状态，Chrome就不会从缓存中读取任何内容
