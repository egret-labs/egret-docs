---
layout: post
title:  "build命令"
permalink: jkdoc/manual-cmd-build.html
type: manual
element: cmd-set
version: Egret引擎 v1.5
---
   
### 概述
   
build 命令用于构建指定项目，编译指定项目的 TypeScript 文件
    
------
     
### 使用方法

命令原型：    
{% highlight PowerShell %}
egret build [project_name] [-e] [--runtime html5|native] [-quick/-q]
{% endhighlight %}
      
-----
    
### 参数说明
    
{% highlight java %}
-e           编译指定项目的同时编译引擎目录
-k           编译EXML文件时保留生成的TS文件
--runtime    设置构建方式为 html5 或者是 native 方式，默认值为html5    
-quick/-q    快速编译，跳过ts严格类型检查阶段
{% endhighlight %}
     
     
     


