---
layout: post
title:  "benchmark之粒子系统" 
permalink: jkdoc/benchmark-particle.html
type: manual
element: benchmark
version: Egret引擎 v1.5.3
---
       
### 概述

本benchmark主要测试例子系统的性能表现。   
            
![]({{site.baseurl}}/assets/img-bench/sample-particle.jpg)         
             
请用智能手机扫描以下二维码，用浏览器打开页面进行测试：
            
![]({{site.baseurl}}/assets/img-bench/QRCode-particle.png)          
          
         
### 界面显示及控制使用说明
        
**左上角FPS字段：** 标准的实时性能显示。

**左下方browser字段：** 显示当前运行环境具体信息，包含系统及硬件平台，浏览器厂商，及操作系统版本，手机型号等具体信息。

         
        
**右下方max字段：** 表示当前粒子上限值；

**右下方count字段：** 表示事实显示的粒子数量，随粒子运行情况实时变化；      
             
**右下方add/remove按钮：** 功能分别为增加、减少25个粒子上限值；    

**右下方clear按钮：** 重置粒子上限值为零；    

**右下方config字段兼按钮:** 切换粒子系统配置，冒号后边指示当前配置名。本benchmark目前提供了三种配置，触摸该按钮将会依次轮换这些配置。      

**右下方image字段兼按钮:** 切换粒子纹理，冒号后边指示当前纹理名。本benchmark目前提供了三种配置，触摸该按钮将会依次轮换这些配置。    
      
      
### 附加说明及功能
**左侧中下部renderer字段兼按钮：** `renderer:`紧跟的文字表示当前页面采用的渲染模式，包括两种：Canvas 2D或WebGL。       
如当前测试浏览器支持WebGL渲染方式，则按下按钮即可跳转到箭头右方所示的渲染模式。
如当前测试浏览器不支持WebGL渲染方式，则会显示`NO WebGL!`字样。

**数量快速增减：** 对于add/remove按钮，手指轻触则会进行一次增减；手指按下保持将近半秒后，即可快速增减，直到松开手指。

**无缝切换：**  切换渲染模式时，当前粒子上限值、粒子配置和粒子纹理将会自动保持，方便高效率进行横向性能对比。
      
**粒子系统来源：** 本benchmark使用Egret官方所提供的<a href="https://github.com/egret-labs/egret-game-library/tree/master/particle" target="_blank">第三方粒子系统库</a>。
      

-------
     
**项目源码：** <a href="{{site.baseurl}}/assets/packages/benchmark/egret-benchmark-particle.zip" target="_blank">下载地址</a> 












