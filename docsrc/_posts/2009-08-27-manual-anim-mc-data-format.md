---
layout: post
title:  "MovieClip数据格式标准"
permalink: post/manual/anim/mc-data-format.html
type: manual
element: manualmoive
version: Egret引擎 v1.5.3
---

#### MovieClip数据格式标准


{% highlight java %}
{
   "file": "icons.png"
   "mc": {
      "mc_name1": {
         "frameRate": 24,
         "labels": [
            {"name": "stand", "frame": 1}
         ],
         "frames": [
            {"res": "res_name1", "x": 3, "y": 0, "duration": 2}
         ],
         "actions": [
            {"name": "action_name1", "frame": 1}
         ],
         "scripts": [
            {"frame": 1, "func": "gotoAndPlay", "args": ["attack"]}
         ]
      }
   },
   "res": {
      " res_name1": {"x": 170, "y": 674, "w": 80, "h": 110}
   }
}
{% endhighlight %}
"file": 该数据文件对应的纹理文件路径 (用于帮助工具匹配对应的问题，引擎中不会解析这个属性);  
"mc": MovieClip数据列表,     
列表中的每个属性都代表一个MovieClip名字：    
"frameRate": 帧率, 【可选属性】，默认值24，可以由开发者通过代码设定;  
"labels": 帧标签列表，【可选属性】，如果没有帧标签，可以不加这个属性;  
"name": 标签名;  
"frame": 标签所在的帧序号;  
"frame": 关键帧数据列表;  
"res": 该关键帧帧上需要显示的图片资源，【可选属性】，默认值为空（用于空白帧的情况）;  
"x": 图片需要显示的x坐标, 【可选属性】，默认值0;  
"y":图片需要显示的y坐标, 【可选属性】，默认值0;  
"duration": 该关键帧持续的帧数，【可选属性】，默认值1;  
"actions": 帧动作列表，用于抛出自定义事件，【可选属性】，如果没有帧动作，可以不加这个属性;  
"name": 动作名;  
"frame": 动作所在的帧序号;  
"scripts": 帧脚本列表，【可选属性】，如果没有帧动作，可以不加这个属性;  
"frame": 脚本所在的帧序号;  
"func": 脚本调用的方法名 支持动画播放相关的的6个API;  
"args": 脚本调用方法使用的参数列表 【可选属性】，默认值空;  
"res": 资源列表，列表中的每个属性都代表一个资源名：
"x": 资源所在纹理集位置的x坐标;  
"y": 资源所在纹理集位置的y坐标;  
"w": 资源宽度;  
"h": 资源高度;  
其中：actions、scripts暂时还未启用，日后会用到的。   
    


