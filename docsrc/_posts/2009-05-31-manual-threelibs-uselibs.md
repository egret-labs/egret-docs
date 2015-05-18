---
layout: post
title:  "Egret 与第三方 TypeScript / JavaScript 库集成"
permalink: post/manual/threelibs/uselibs.html
type: manual
element: threelibs
version: Egret引擎 v1.6+
---


注意： 之前的版本，直接放在libs下作为第三方库的方式已经不可行，请全部按照本文档介绍的方式。

#### 概述

每一个 Egret 项目中都有一个名为 ` egretProperties.json ` 的文件，这个文件描述了此项目的配置信息，其中包含一个 ` modules ` 字段，用于标记项目中依赖的模块。


在默认情况下，Egret 只有一个名为 ` core ` 的模块，Egret中目前集成了两个官方扩展  ` dragonbones ` 和 ` gui ` 。 从 Egret 1.0.5 版开始，开发者可以编写自己的模块，集成到项目中。


#### 引入第三方模块

* 创建一个新的 Egret 项目 ， 或者打开一个现有的 Egret 项目
* 将第三方模块的 JavaScript 文件以及项目描述d.ts文件复制到Egret项目之外的任意文件夹中
> 注意，之所以放到Egret项目之外是由于某种IDE的项目限制造成的，以前的版本可以放在项目内的。但是从Egret1.7.1开始，引擎加入了规范机制，
* 在项目的根目录创建一个json文件，此文件的文件名最好和你的模块名字相同，称为模块配置文件，这里我们假设该模块名为`benchmark`，则模块配置文件命名为：`benchmark.json`。
* 在 `module.json` 中编写以下配置：

{% highlight java linenos %}
{
    "name": "benchmark",
    "dependence": ["core"],
    "source":"src",
    "file_list": [
        "benchmark.js",
        "benchmark.d.ts"
    ]
}
{% endhighlight %}

以上字段含义如下：

* name ： 模块名称
* depencnce : 模块依赖的其他模块的模块名
* source : 源代码的路径
* file_list ： 此模块包括的所有代码，需要包括全部 js 文件、ts 文件以及js文件所对应的.d.ts文件

#### 编译第三方模块

在项目的 `egretProperties.json` 文件中，添加以下代码：

{% highlight java linenos %}
modules:
[
    {
        "name":"benchmark", 
        "path":"path/outside/project"
    }
]
{% endhighlight %}

以上字段含义如下：   

* name ： 模块名称,影响文件生成路径（会生成在libs中）    
* path ： 路径， 可以用相对路径，也可以用绝对路径。但是路径一定要在当前Egret项目目录之外。     

>要点： 模块名称在项目配置文件和模块配置文件中要保持一致，并且模块配置文件的主文件名也必须是模块名称。这是引擎顺利完成第三方模块编译的必要规则。

添加好上述代码后，执行 `egret build -e -clean` 就会把模块编译。

* 编译后, ` egret_file_list.js ` 中应该包含了 `benchmark.json` 中的 file_list      
* 编译后，libs里将会出现一个名为 `benchmark` 的文件夹


#### 官方库需要进行模块化配置的模块

Egret官方库不是所有的模块都可以直接使用，这是为了减少最终代码的体积，这4个库是需要模块化配置的：
res、DragonBones、WebSocket及gui。
进行配置的模块名，即在modules配置项的列表中添加的name名称分别为：
res、dragonbones、socket及gui。

