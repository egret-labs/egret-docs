---
layout: post
title:  "创建项目"
permalink: post/quitestart/helloworld/createpro.html
type: quitestart
element: quitestarthelloworld
version: Egret引擎 v1.x
---


Egret提供非常方便的创建工具，我们把创建后的文件总和称之为**项目**。在后面的操作中，我们对创建的项目进行操作，具体创建步骤如下：

>需要注意的是Egret支持Windows和Mac OS X 两个平台。在不同平台中，我们使用的Egret命令是相同。对于不同的命令，大家可以参考文档中相关平台的操作介绍。

Egret在创建的时候，需要指定创建项目所在目录。Egret会将所有创建后的项目文件全部存放到指定目录中。

###1.Windows系统中进入项目目录

我们在Windows中的命令行工具中敲入命令如下图：

![Nodejs install]({{site.baseurl}}/assets/img/createprowin1.png)


###2.Mac OS X系统中进入项目目录

我们在Mac OS X中创建一个名称为**egretdemo**的文件夹。文件夹路径为：`/Volumes/mac1/egretdemo/`

在终端中使用`cd`命令定位到当前目录，`cd /Volumes/mac1/egretdemo/`

###3.创建Hello World项目
下面我们通过egret提供的工具来创建我们的项目，我们把当前的项目名称称之为“**HelloWorld**”。在终端中使用命令：`egret create HelloWorld`。

稍等几秒后，egret工具会在我们制定的目录下创建一个名称为“**HelloWorld**”的项目。在你制定的目录中，egret创建的项目会与项目名称相同。你会在指定的`/Volumes/mac1/egretdemo/`目录中看到一个名称为"**HelloWorld**"的文件夹。所以当前项目的文件全部存在在这个文件夹中。

在生成的项目文件夹中我们会看到四个子文件夹。

{% highlight java %}
workspace    // egret工作空间
  |-- HelloEgret  // 游戏项目
        |-- src // 游戏代码目录,源代码均存放在此目录中，其文件后缀名为`.ts`。
        |-- resources // 游戏资源目录,存放着游戏使用的资源，包括图片文件，音频文件以及资源配置文件等。
        |-- launcher // 游戏入口,所有的可运行查看游戏效果的网页文件均存放在这个文件夹中。
                |-- index.html //启动文件
        |-- libs //egret引擎库文件
        |-- bin-debug // 编译后的代码目录,存放当前debug模式的代码，这个文件夹中绝大部分代码为`.js`文件。
{% endhighlight %}
