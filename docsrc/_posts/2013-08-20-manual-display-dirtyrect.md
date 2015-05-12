---
layout: post
title:  "脏矩形"
permalink: jkdoc/manual-display-dirtyrect.html
type: manual
element: manualdisplay
version: Egret引擎 v1.5
---

### 概述
     
 Egret引擎常规情况下会在每帧绘制整个H5中Egret所对应的Canvas区域。   
 然而，在每帧并不是所有的部分都是需要重绘的。   
      
 那么我们引擎最新的1.5版本已经为广大开发者朋友考虑这一点，隆重推出了脏矩形功能！     
 不过这个使用还是需要些技巧的，下边我们通过一个基本的用法，和一个简化游戏模型来说明怎么合理的使用脏矩形。          
    
 -------
### 基本用法
   
脏矩形的用法很简单，因为脏矩形只是对整个显示舞台设定一个矩形区域，而不需要考虑具体的显示对象的容器及嵌套关系：        

{% highlight java %}
var rect = new egret.Rectangle( 0, 0, stageW, stageH - 200 );
egret.RenderFilter.getInstance().addDrawArea( rect );
{% endhighlight %}

    
 -------
### 实例展示
    
以上代码正是官方的1.5发布说明所用的例子。以下再做简要的说明。
       
该实例包含8000个小足球的显示，并且为了达到测试效果，都将它们放到屏幕下方高度200的范围内。
那么开始测试，这是未使用脏矩阵功能的情况：
    
![about display]({{site.baseurl}}/assets/img-jk/manual-display-dirtyrect/no-dirty_70.jpg)
     
    
这是程序加了如上的脏矩阵功能后的情况：    
     
![about display]({{site.baseurl}}/assets/img-jk/manual-display-dirtyrect/dirty_70.jpg)
   
方框高亮的区域，就是脏矩形，这样Egret就只渲染脏矩形区域了。  
   
    
 -------
### 进阶技巧
    
当然实际游戏的情况要复杂多了。我们拿个经典的俄罗斯方块举例。         
    
在游戏场景，我们需要持续更新的就是主游戏区域，即方块掉落区域和预备方块区域，还有分数显示。    
        
那么我们在进入游戏场景后先重置脏矩形：`clearDrawArea`，然后再将这三个区域对应的矩形区域`addDrawArea`进来。          

        
这样，在该场景中，其他没有变化的区域，Egret就不会再浪费资源去每帧重绘了。          
    
重置脏矩形用法：
{% highlight java %}
egret.RenderFilter.getInstance().clearDrawArea();
{% endhighlight %}
`clearDrawArea`就是重置，在项目中我们使用addDrawArea的地方，在前面加一句重置。防止出现当前场景设置脏矩形跟前一个场景设置的脏矩形叠加的问题，这样就可能对脏矩形功能提升性能打折扣。   
     
当然场景管理的标准做法是，每个使用脏矩形功能的场景结束的时刻，都应该重置一下脏矩形。
     
    
 -------
### 你不一定用得到
到这里，大家应该能考虑到，脏矩形并不适用于那种需要全屏所有部分都可能会变化的游戏场景，比如官方案例[《少女战机》](http://www.egret.com/case)的游戏场景。因为你如果这种情况还使用脏矩形，那就需要设置整个`stage`区域，而这跟不使用脏矩形是完全一样的。          
    
    
当然，有些时候，在你为游戏性能绞尽脑汁的时候，脏矩形可能是你的救命稻草！          
    
      
最后，我们再给大家举一个典型的例子，比如在需要全屏重绘的游戏进行中，显示一个比较复杂的UI ，你希望UI 操作时更流畅，但为了用户体验，又不希望显示UI时完全看不到游戏场景，那么聪明的你可能想到了：设置UI显示区域或UI当前重绘区域为脏矩形！
     
    
    
    




