## 现有项目发布小游戏指南

## 5.1.1 以后的项目

* 使用引擎为 5.1.1 引擎以上(包括 5.1.1)按照文档流程发布即可。

## 5.1.1 以前的项目
由于目前的 5.1.x 引擎以前的项目不能直接升级到 5.1.x，需要我们手动建立一个空的 5.1.1 eui 项目，然后将原项目代码复制过去。

* 首先我们使用 launcher 创建一个 5.1.1 新项目。
* 然后将现有游戏逻辑和资源拷贝至新项目中主要包括 src 目录、resource 目录、修改配置文件 egretProperties 后续无论是 HTML5 版本，iOS / Android 版本还是小程序版本，均使用这个新项目进行后续开发。
* 全部拷贝以后，先测试下在 H5 中是否正常运行，一定要保证在 H5 中可以正常运行，再进行后续的操作。
> 注意：小程序和小游戏中都移除了动态执行代码的能力，包括以下调用方式：
eval 函数
setTimeout、 setInterval 函数第一个参数传入代码字符串执行
使用 Function 传入字符串构造函数
使用 GeneratorFunction 传入字符串构造生成器函数

如果使用了 egret.getDefinitionByName()，需要设置 window.object1 = object1 这样的方式强制将特定对象转为全局对象
<!-- 
3、目前第三方库中有使用require引入方式，小游戏会报错。一直 Protobuf 报错
4、egret.getDefinitionByName()，反射使用注意

## 使用 Launcher 发布为小游戏

## 适配性修改 -->