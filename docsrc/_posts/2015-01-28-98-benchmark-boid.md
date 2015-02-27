---
layout: post
title:  "benchmark之计算性能" 
permalink: jkdoc/benchmark-boid.html
type: manual
element: benchmark
version: Egret引擎 v1.5.3
---
       
### 概述

本benchmark主要测试大量运算时的性能表现。使用的算法为群体运动时的集群AI，例如鱼群运动时的路径。   
            
![]({{site.baseurl}}/assets/img-bench/sample-boid.jpg)         
             
请用智能手机扫描以下二维码，用浏览器打开页面进行测试：
            
![]({{site.baseurl}}/assets/img-bench/QRCode-boid.png)          
          
         
### 界面显示及控制使用说明
        
**左上角fps字段：** 标准的实时性能显示。

**左下方browser字段：** 显示当前运行环境具体信息，包含系统及硬件平台，浏览器厂商，及操作系统版本，手机型号等具体信息。

         
        
**右下方count字段：** 表示当前舞台上随机图片的总个数；
             
**右下方add/remove按钮：** 分别添加、删除10个随机图片到舞台；    
**右下方clear按钮：** 清除舞台上所有的随机图片；  

**右下方run字段兼按钮:** 切换当前舞台所有随机图片是否有运动变化(包括旋转和移动)，冒号后边指示当前状态。
      
**右下方step按钮：** 单步运行并暂停，用以定格观察每一步运算的细节；
      
      
### 附加说明及功能
**渲染模式：** 由于该benchmark使用了矢量绘线功能，而Egret引擎的WebGL模式尚不支持该功能，所以没有切换渲染模式的开关，只有Canvas的2D渲染模式。

**数量快速增减：** 对于add/remove按钮，手指轻触则会进行一次增减；手指按下保持将近半秒后，即可快速增减，直到松开手指。

