---
layout: post
title:  "编译项目"
permalink: post/quitestart/helloworld/buildpro.html
type: quitestart
element: quitestarthelloworld
version: Egret引擎 v1.x
---

Egret的编译功能依赖于TypeScript的编译功能。实际上TypeScript的编译过程并非传统的将程序源代码翻译为机器可执行的二进制文件过程。由于浏览器能够识别执行的脚本只有JavaScript，所以TypeScript的编译仅仅是把TypeScript翻译为对应的JavaScript脚本。

我们无需理解里面复杂的过程，我们仅仅可以把**编译**过程理解为将TypeScript翻译成能够被浏览器执行的JavaScript代码即可。

这个“翻译”的过程也非常简单。我们仅仅需要执行一个简单的命令即可。命令如下：

`egret build HelloWorld`

其中`egret build`是执行“翻译”工作，而`HelloWorld`则是我们的项目名称。

命令的执行时间取决于你的项目大小，通常情况下，当你运行一个编译脚本的时候，编译器很快就能帮助你把你的游戏逻辑编译好。

当编译命令执行完成后，终端会自动跳转到下一行，如果命令执行失败，编译器会给你非常详细的错误提示。

关于错误提示这部分，我们会在调试运行章节为大家详细讲解。

**如果您的目录处于当前项目目录下，可以直接使用`egret build`命令进行编译。**