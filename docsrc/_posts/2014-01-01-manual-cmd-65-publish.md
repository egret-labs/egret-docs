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
egret publish [project_name] --version [version] [--runtime html5|native]
{% endhighlight %}
      
-----
    
### 参数说明
       
{% highlight java %}
--version    设置发布之后的版本号，可以不设置
--runtime    设置发布方式为 html5 或者是 native 方式，默认值为 html5
-zip         设置发布后生成 launcher 文件夹的 zip 文件
--password   设置发布 zip 文件的解压密码
{% endhighlight %}
     
     



