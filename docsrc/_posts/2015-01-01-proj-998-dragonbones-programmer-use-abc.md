---
layout: subjs-template
title:  "DragonBones程序使用基本方法"
permalink: jksubj/dragonbones-programmer-use-abc.html
type: proj-normal
version: Egret引擎 v1.5.1
---
       
          
        
      
##DragonBones程序使用基本方法
     
      
    
------
前提性知识：有基本的Egret项目开发经验         
技术等级：中级             
必需产品：Egret Engine(http://www.egret-labs.org/egretengine)       
开发工具：WebStorm或Visual Studio + EgretVS (http://www.egret-labs.org/egretvs)        
教程项目起点： <a href="{{site.baseurl}}/assets/" target="_blank">下载地址</a> 
          
### DragonBones概述
             
相信熟悉AS3的小伙伴，一定对DragonBones不陌生，当今火爆的手游《刀塔传奇》正是因为使用了DragonBones而得以效果如此丰富生动。当然还有大量不那么出名的游戏背后都有DragonBones的强力驱动。      
             
数月前（2014年6月），DragonBones已经正式支持Egret了。但由于DragonBones相对于常规的MovieClip要复杂不少。因此撰写本文，让大家对DragonBones不再那么陌生。也希望推进Egret社群早日出现或多出现DragonBones的上线作品！          
          
本文参考了DragonBones官方的《DragonBones快速入门指南》。但不是对其简单的整理，而是穿插一些DragonBones组成动画的原理介绍，并以理解和实用为目的来介绍其使用方法。其次本文完全结合Egret开发环境来介绍，避免由于Egret与Flash的差异带来的困扰。           
           
DragonBones的使用主要分为两大阶段。          
            
第一阶段为资源创作阶段，该阶段的主要目的是生成程序可以使用的DragonBones资源。这部分主要由美术人员通过Flash CC来完成。虽然这部分完全不需要写代码，但从DragonBones本身的工作流程来看，可能这部分工作量是最大的。             
该阶段可以理解为，生成一个骨骼动画库。       
             
第二阶段即为程序使用阶段。         
对应于资源生成阶段，该阶段可以理解为，对骨骼动画库进行各种调用及组合，产生丰富而生动的游戏动作画面。          
       
为了让大家快速了解Egret版DragonBones的用法，本教程避重就轻，使用现成的DragonBones资源来呈现动画效果。          
           
### 为Egret项目增加DragonBones支持
         
作为Egret官方模块，创建空白Egret项目后，可以很简单的增加DragonBones支持。修改``中的`"modules"`，成为：        
         
"modules": [
  {"name": "core"},
  {"name": "dragonbones"}
],   
         
在项目所在目录内执行一次引擎编译：      
egret build -e
            
本步骤已经完成，现在项目中既可以使用DragonBones相关的API了。       
             
### 读取DragonBones资源并解析到工厂
           
DragonBones资源，主要包含显示数据和各种骨骼动画的控制数据。       
         
在Flash版本有很多种形式，JSON、PNG、SWF、ZIP等等。         
           
但是SWF是Flash专用的格式，我们完全没必要为了增加一种格式的支持从Binary级别去解析。ZIP在本基础教程中也不涉及。          
            
另外，在数据格式上，Egret更习惯于用JSON。           
            
所以，本教程使用DragonBones资源只有最方便的JSON和PNG格式。          
            
显示部分数据，跟其他游戏开发常用的纹理格式一样。显示数据是一对文件：纹理图集+纹理单元(下文称为图元)提取数据。具体就是PNG+JSON，通常为了便于表明其关系，主文件名是一样的。        
            
本教程中的DragonBones资源按照角色分目录存放。在某一种角色目录中，纹理显示数据命名为：`texture.json`和` texture.png `。      
          
骨骼动画控制数据，包含两大部分数据：角色各部位的骨骼链接关系；角色每个动作的定义，由每一个部位的运动轨迹组成。           
          
在本教程，某种角色目录中，骨骼动画控制数据文件命名为` skeleton.json`。          
           
现在我们以一个现成的武士DragonBones资源为基础，来进行读取和解析。          
          
在resource.json中，加入武士相关的资源配置：      
            
{ 
	"resources":
	 [
		 {"name":"warrior/skeleton.json","type":"json","url":"assets/warrior/skeleton.json"}
		,{"name":"warrior/texture.json","type":"json","url":"assets/warrior/texture.json"}
		,{"name":"warrior/texture.png","type":"image","url":"assets/warrior/texture.png"}
	],
	"groups":
	[
	 {"name":"warrior","keys":"warrior/skeleton.json,warrior/texture.json,warrior/texture.png"}
	]
}
          
在Egret载入`"warrior"`资源组之后，即可开始解析其中的DragonBones资源，首先获得资源数据：         
         
var skeletonData = RES.getRes( "warrior/skeleton.json" );
var textureData = RES.getRes( "warrior/texture.json" );
var texture = RES.getRes( "warrior/texture.png" );
           
然后开始使用DragonBones解析。           
          
本教程在Egret默认项目清理的基础上进行，代码除新增函数外，均在基础项目`Main.ts`的`createGameScene`内逐渐加入。         
           
DragonBones对资源的管理，基本的概念是工厂，可以理解为骨骼动画工厂。在一个游戏中，你可能有很多种角色要显示，但你只需要一个工厂。创建一个工厂的程序：           
var factory = new dragonBones.EgretFactory();
           
每一种角色，其实就是一套骨骼皮肤的组合。在DragonBones中，称为一套骨架(armature)。          
                
只要我们将一套骨架的纹理显示数据和骨骼控制数据添加到工厂里，就可以用工厂来取出这套骨架。             
            
接下来两行，就会将我们之前读到的资源添加到工厂：        
factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
             
其中"`skeletonData`"(骨骼控制数据)和"`textureData`"(纹理分解数据)都包含骨架名信息。当DragonBones工厂加入多个骨架的数据时，它们之间将通过这个骨架名来区分。而一套骨架的骨骼控制数据和纹理数据也是通过相同的骨架名来合成该套骨架的综合数据。         
         
本例中，现成的武士骨架名为"warrior"，这是在资源创作阶段就设定好的。       
        
### 播放一个DragonBones动作
        
前面说过，一种角色对应一套骨架。当我们需要显示某种角色时，首先将其DragonBones资源解析到工厂。
          
接下来，便可以轻易的用工厂建立一套骨架，用以显示其对应的角色。工厂是根据骨架名来建立骨架的：        
var armature = factory.buildArmature("warrior");
        
骨架可以理解为是某种角色的控制中心，但其不是直接的显示对象。          
          
为了在舞台上显示该角色，那么我们可以用骨架的一个方法来直接取得其所控制的显示对象：     
var armatureDisplay = armature.getDisplay();
         
这里得到的是一个`egret.DisplayObject`，这样我们就可以放入Egret的显示列表中，并根据游戏情节需要给其进行定位，如：         
/// this.dispContainer 是事先创建好的egret.Sprite，并已经addChild到主文档类
this.dispContainer.addChild(armatureDisplay);
armatureDisplay.x = 200;
armatureDisplay.y = 450;
           
注意骨架显示对象的定位基准是该骨架创作时的注册点。这也是创作时需要规范好的。        
         
现在编译项目`(egret build)`，然后通过http方式打开`launcher/index.html`，已经可以看到武士显示出来了：   

![warrior-in-disp-list]({{site.baseurl}}/assets/img-subj/dragonbones-programmer-use-abc/warrior-in-disp-list.jpg)    
      
            
            
      
      
然后，开始播放一个基本的动作：     
armature.animation.gotoAndPlay("ready");    
     
注意，该动作`ready`也是在资源创作阶段约定好的动作名。播放动作时，必须确保该动作名在资源中有定义！   
     
现在，再次编译项目，打开页面，会发现仍无变化！    
      
这是由于动作的播放是需要定时推进的，即需要一个类似`ENTER_FRAME`的侦听处理，或者注册一个`Ticker`触发器。     
        
首先，DragonBones对动作推进使用了一个时钟管理器。      
当某个现有的骨架需要动作播放时，在时钟管理器上加入该骨架：        
dragonBones.WorldClock.clock.add(armature);
          
然后加入一个定时推进触发器。可以用`ENTER_FRAME`：       
super.addEventListener( egret.Event.ENTER_FRAME, function():void{
    dragonBones.WorldClock.clock.advanceTime( 0.01 );
}, this );
        
或者也可以用` Ticker`：      
egret.Ticker.getInstance().register(function (advancedTime) {
    dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
}, this); 
       
注意定时推进触发器只需要一个即可，因为两个都加入会产生叠加效果。         
             
不过从精确时间控制的角度考虑，建议用`Ticker`，因为`Ticker`的每次推进回调会传入时间间隔，这样可以消除Ticker间隔波动造成的动作播放进度误差。如果使用`ENTER_FRAME`还需要额外的代码才能达到该目的。         
     
现在，再次编译项目，打开页面，没有问题的话，武士应该已经动起来了！注意：`ready`只是一个原地待命的动作。  
        
      
### 加入另一个骨架角色，并播放各自的动作
    
在resource.json中，加入机器人相关的资源配置：         
          
{
"resources":
	[
		 {"name":"warrior/skeleton.json","type":"json","url":"assets/warrior/skeleton.json"}
		,{"name":"warrior/texture.json","type":"json","url":"assets/warrior/texture.json"}
		,{"name":"warrior/texture.png","type":"image","url":"assets/warrior/texture.png"}
		,{"name":"robot/skeleton.json","type":"json","url":"assets/robot/skeleton.json"}
		,{"name":"robot/texture.json","type":"json","url":"assets/robot/texture.json"}
		,{"name":"robot/texture.png","type":"image","url":"assets/robot/texture.png"}
	],

"groups":
	[
		 {"name":"warrior","keys":"warrior/skeleton.json,warrior/texture.json,warrior/texture.png"}
		,{"name":"robot","keys":"robot/skeleton.json,robot/texture.json,robot/texture.png"}
	]
}
    
不同的骨架加入工厂的代码都是一样的，因此将这部分代码整合到一个函数，传入工厂、骨架名称和骨架目录名，即可：       
private addArmatureToFactory( factory:dragonBones.EgretFactory, name:string, directory:string ){
    var skeletonData = RES.getRes( directory + "/skeleton.json" );
    var textureData = RES.getRes( directory + "/texture.json" );
    var texture = RES.getRes( directory + "/texture.png" );
    factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
    factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
}
          
这样，建立工厂后，我们先把武士和机器人的两套资源加入工厂：         
var factory = new dragonBones.EgretFactory();
this.addArmatureToFactory( factory, "warrior", "warrior" );
this.addArmatureToFactory( factory, "robot", "robot" );
         
则创建一个武士角色并显示的代码变为：        
var amtWorrior:dragonBones.Armature = factory.buildArmature( "warrior" );
var dispWorrior = amtWorrior.getDisplay();

this.dispContainer.addChild(dispWorrior);
dispWorrior.x = 160;
dispWorrior.y = 200;
dispWorrior.scaleX = dispWorrior.scaleY = .7;
amtWorrior.animation.gotoAndPlay("ready");

dragonBones.WorldClock.clock.add(amtWorrior);
         
注意，为了同时显示两个角色，骨架显示对象的位置进行了调整。     
       
编译运行，除了位置变化，动作效果应该跟修改前一样。
           
然后我们类似的，创建一个机器人角色，并播放单脚舞姿动作：      
var amtRobot:dragonBones.Armature = factory.buildArmature( "robot" );
var dispRobot = amtRobot.getDisplay();

this.dispContainer.addChild(dispRobot);
dispRobot.x = 330;
dispRobot.y = 230;
amtRobot.animation.gotoAndPlay("oneLegStand");

dragonBones.WorldClock.clock.add(amtRobot);
          
编译运行，两种不同角色有各自的动作同时显示出来，如图所示：      
![robot-and-warrior]({{site.baseurl}}/assets/img-subj/dragonbones-programmer-use-abc/robot-and-warrior.jpg)    
         
             
      
### 播放另一个骨架的动作，即动画拷贝功能
    
通常设计不同的骨架，各自都有不同的动作。如果某套骨架在设计时不包含某个动作，而另一套骨架有这样现成的动作，并且可以套用，那将会节省很多设计工作量。   
      
从Egret1.5.1起，已经有了这样的功能！   
    
比如前一节的单脚舞姿动作，是机器人骨架设计时包含的。那么武士播放这个动作就可以调用工厂的`copyAnimationsToArmature`方法，我们再创建一个骨架，来测试该功能：   
var amtWorriorUseRobot:dragonBones.Armature = factory.buildArmature( "warrior" );
var dispWorriorUseRobot = amtWorriorUseRobot.getDisplay();

factory.copyAnimationsToArmature( amtWorriorUseRobot, "robot" );

this.dispContainer.addChild(dispWorriorUseRobot);
dispWorriorUseRobot.x = 180;
dispWorriorUseRobot.y = 290;
dispWorriorUseRobot.scaleX = dispWorriorUseRobot.scaleY = .7;
amtWorriorUseRobot.animation.gotoAndPlay("oneLegStand");

dragonBones.WorldClock.clock.add(amtWorriorUseRobot);
        
编译运行，会看到武士跟机器人完美地同步进行单脚跳舞动作，如图所示：    

![warrior-use-robot-action]({{site.baseurl}}/assets/img-subj/dragonbones-programmer-use-abc/warrior-use-robot-action.jpg)       
        
          
      
### Egret1.5.1新增的其他DragonBones功能
         
有一个功能是使指定动作停止在指定的秒数，用跟MovieClip类似的`gotoAndStop`方法。    
另外一个是控制动画倒序播放，在`gotoAndPlay`返回的`AnimationState`上调用`setTimeScale`。    
     
在`createGameScene`最后加入如下代码来测试这两个功能：    

this.nTap = 0;
this.nTimeScale = undefined;
var self:Main = this;
this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, function( evt:egret.TouchEvent ):void{
    switch ( ++self.nTap ){
        case 1: 
            amtWorriorUseRobot.animation.gotoAndStop( "squat", 1 );
            break;
        case 2:
        default :
            if( self.nTimeScale == undefined ){    /// 第二次首先取得默认的timeScale值
                self.nTimeScale = amtRobot.animation.gotoAndPlay( "run" ).timeScale;
                console.log( "nTimeScale design value:", self.nTimeScale );
            }else{    /// 后续点击均切换正逆序播放动画
                self.nTimeScale *= -1;
                console.log( "nTimeScale switch:", self.nTimeScale );
            }
            amtRobot.animation.gotoAndPlay( "run" ).setTimeScale( self.nTimeScale );
            break;
    }
}, this );

代码所需的两个成员需要在类中定义：    
private nTap:number;
private nTimeScale:number;

该段测试代码用舞台触摸触发进行。第一次触摸测试`gotoAndStop`功能。        
第二次及后续触摸均为测试逆序播放动作动画，每次点击切换正逆序。          
               
其中，`gotoAndStop`功能，第二个参数是时间推进的秒数。           
动作的timeScale值是在资源创作阶段设定的，不同的动作可能有不同的值，所以为了保证逆序播放某个动作动画与正序播放有相同的速率，需要先取到这个初始值。            
         
编译运行，触碰舞台会看到这两个功能正常运行，如图所示：        
![dragonbones-other-feature]({{site.baseurl}}/assets/img-subj/dragonbones-programmer-use-abc/dragonbones-other-feature.jpg)    
          
          
       
### 结语
           
本教程主要介绍了DragonBones在程序使用阶段的基本用法，以及到目前(Egret 1.5.1)为止的一些新用法。展示了Egret版DragonBones的强大功能。      
        
以后，会根据情况补充DragonBones的相关教程，帮助开发者自如的创作强大的骨骼动画游戏。      
