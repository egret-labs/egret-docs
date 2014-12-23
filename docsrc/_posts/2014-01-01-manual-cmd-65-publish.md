---
layout: post
title:  "publish命令"
permalink: jkdoc/manual-cmd-publish.html  
type: manual
element: cmd-set
version: Egret引擎 v1.x
---
   
### 概述
   
publish 命令用于发布项目，使用 GoogleClosureCompiler 压缩代码
    
------
     
### 使用方法
    
命令原型：    
{% highlight PowerShell %}
egret publish [project_name] -compile [--runtime html5|native]
{% endhighlight %}
      
-----
    
### 参数说明
       
{% highlight java %}
--runtime     设置发布方式为 html5 或者是 native方式，默认值为html5
-compile       设置发布后js文件是否需要压缩
--password   设置发布zip文件的解压密码
{% endhighlight %}
     
     



