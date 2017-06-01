## 概述

欢迎您使用白鹭引擎 5.0！

本次更新是白鹭引擎 5 的第一次发布，主要带来全新的基于 WebAssembly 的渲染架构。
在这次更新中，除了引擎运行时代码之外，白鹭引擎提供了全新的引擎代码库管理器以代替旧的 Egret Engine 软件。在新的代码库管理器的支持下，白鹭引擎的版本迭代速度会更加灵活。

## 更新内容

* 命令行工具
    * 引擎内置的压缩与解压缩命令从调用 java 调整为调用 node + asm.js ，因此开发者无需预装 java 环境

    > 我们收到了部分开发者反馈，表示使用白鹭引擎在进行原生打包时，会因为系统的 Java 版本与白鹭引擎基于 Java 的压缩工具版本不一致导致打包失败。为了从根本上解决这一问题，白鹭引擎在本次更新中去掉了所有对 Java 的依赖，所有的 Java 库均改为了使用 node + asm.js 的方式重新实现，进而解决了部分开发者打包失败的问题。

* 白鹭引擎 2D 渲染
    * 引入新的 WebAssembly 模块，大幅提升渲染速度
    * 在不支持 WebAssembly 的设备上回退至 asm.js 模式保证仍然可以流畅运行
    * 保留现有的 JavaScript 渲染逻辑，开发者可以决定使用新的 WebAssembly 模式或者现有的 JavaScript 模式
    * 基于白鹭引擎 4.x 的 JavaScript 模式会长期维护保证现有开发者可以继续使用

    > 关于白鹭引擎 5.0的 WebAssembly ，您可以参考[这篇文档](http://developer.egret.com/cn/github/egret-docs/Engine2D/webassembly/index.html)了解更多内容

* DragonBones
    * 引入二进制格式替代JSON文本格式、降低资源体积、内存占用，提升运行性能
    * 引入一个命令行脚本用于将旧的JSON文本格式切换为二进制格式

## 已知问题

* 开发者如果使用 WebAssembly 渲染，目前会在类的静态变量声明处创建对象时报错
* WebAssembly 渲染目前暂不支持 EUI 模块与 DragonBones 模块
