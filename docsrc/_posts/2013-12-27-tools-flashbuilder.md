---
layout: post
title:  Flash Builder
permalink: post/tools/ide/flashbuilder.html
type: tools
element: ide
version: Flash Builder v4.x
---

**本文基于 Flash Builder 4.6 ( Eclipse 3.8 ) 撰写**

####概述

Egret 目前暂时没有官方的 Eclipse 支持，通过 一个 <a href="https://github.com/palantir/eclipse-typescript" target="_blank">TypeScript Eclipse插件</a> 实现对 Eclipse 的支持。

#####功能清单

* 自动提示
* 自动编译
* 错误标记
* 查找引用
* 格式化代码
* 匹配括号
* 自动标记
* 打开定义
* 大纲视图
* 快速大纲
* 重命名
* 语法高亮

####如何使用

1. 打开FlashBuilder。依次点击 帮助→安装新软件 输入下面地址
`http://eclipse-update.palantir.com/eclipse-typescript/`

2. 稍等片刻，在下载列表刷新后选择 TypeScript，执行下一步，按步骤安装并重启 FlashBuiler

3. 重启后，依次单击窗口→首选项→TypeScript。这里以FlashBuilder为例，出现如下窗口，按照下面配置

4. FlashBuilder -> 首选项

5. 点击 TypeScript，将Node path 指定为正确的 node.exe 地址

6. 点击 TypeScript 中的 Compiler，勾选 `Compile all TypeScript files on build`

7. 使用FlashBuilder创建一个空项目，命名为 HelloWorld

8. 打开命令行，在 HelloWorld 的外层路径下执行 `egret create HelloEgret`

9. 返回 Flash Builder,在项目上点右键→配置→Enable TypeScript Builder，这样可以用FlashBuilder编译了。

10. 在项目上点右键→属性→TypeScript。设置源文件目录和编译目录。

11. 将 source folder 修改为 src

12. 将 output folder 修改为 bin-debug/src

13. 你已经配置好 FlashBuilder for Egret 开发环境~！执行构建或者启动自动构建后，TypeScript代码会自动编译。