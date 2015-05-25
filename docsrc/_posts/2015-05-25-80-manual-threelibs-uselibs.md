---
layout: post
title:  "集成第三方JavaScript库"
permalink: post/manual/threelibs/uselibs.html
type: manual
element: threelibs
version: Egret引擎 v1.6+
---

注意： 之前的Egret引擎版本，直接放在libs下作为第三方库的方式已经不可行，请全部按照本文档介绍的方式。     
从 Egret 1.0.5 版开始，开发者可以编写自己的模块，或使用现成的第三方库，集成到项目中，以下从准备和导入两个步骤来讲解如何在项目中集成第三方库。
       
#### 准备第三方模块

a) 创建一个新的 Egret 项目 ， 或者打开一个现有的 Egret 项目
b) 将第三方模块的 JavaScript 文件以及项目描述d.ts文件复制到Egret项目之外的任意文件夹中。
> 注意，之所以放到Egret项目之外是由于某种IDE的项目限制造成的，以前的版本可以放在项目内的。但是从Egret1.7.1开始，引擎加入了规范机制，所有的第三方库源文件均需要处于Egret项目之外。      

c) 在项目之外的任意文件夹(建议与步骤b中库文件的路径一致，便于管理)中创建一个json文件，此文件的文件名必须和你的模块名字相同，称为模块配置文件。这里我们假设该模块名为`benchmark`，则模块配置文件命名为：`benchmark.json`。假设这个文件的路径为："path/outside/project"，在导入部分将会使用。     
d) 在 `module.json` 中编写以下配置：

{% highlight java %}
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
* depencnce ： 模块依赖的其他模块的模块名
* source ： 源代码的路径，是库文件源文件相对于该模块配置文件的路径
* file_list ： 此模块包括的所有代码，需要包括全部JavaScript文件以及JavaScript文件所对应的.d.ts文件

#### 导入第三方模块

在项目的 `egretProperties.json` 文件中，添加以下代码：

{% highlight java %}
modules:
[
    {
        "name":"benchmark", 
        "path":"path/outside/project"
    }
]
{% endhighlight %}

以上字段含义如下：   

* name ： 模块名称，影响文件生成路径（会生成在libs中）。模块名称在项目配置文件和模块配置文件中要保持一致，并且模块配置文件的主文件名也必须是模块名称。这是引擎顺利完成第三方模块编译的必要规则。    
* path ： 路径， 可以用相对路径，也可以用绝对路径。但是路径一定要在当前Egret项目目录之外。     

添加好上述代码后，执行 `egret build -e -clean` 就会把模块编译到项目中，并在代码中使用该第三方库。

对导入原理感兴趣的开发者可以观察一下模块编译结果：    
* 编译后, `egret_file_list.js` 中应该包含了 `benchmark.json` 中的 file_list  
* 编译后，libs里将会出现一个名为 `benchmark` 的文件夹


