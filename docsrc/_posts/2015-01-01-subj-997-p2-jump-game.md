---
layout: subjs-template
title:  "如何使用p2物理引擎做一个跳跃游戏"
permalink: jksubj/p2-jump-game.html
type: proj-normal
version: Egret引擎 v1.5.3
---
       
          
          
        
      
##如何使用p2物理引擎做一个跳跃游戏
     
      
    
------
前提知识：有基本的Egret项目开发经验         
技术等级：中级             
必需产品：Egret Engine 1.5.x(<a href="http://www.egret-labs.org/egretengine" target="_blank">下载地址</a>)           
开发工具：WebStorm或Visual Studio + EgretVS (<a href="http://www.egret-labs.org/egretvs" target="_blank">下载地址</a>)        
教程项目包： <a href="{{site.baseurl}}/assets/packages/subjs/p2-jump-game.zip" target="_blank">下载地址</a>            
项目运行地址：
            
![]({{site.baseurl}}/assets/img-subj/p2-jump-game/QRCode.png)               
        
      
    
------
     
###概述
     

文档中心对物理引擎做了[简单的介绍](http://docs.egret-labs.org/jkdoc/manual-physical-engine.html)。但是实际使用远远不止这么简单！物理引擎推出后，不少开发者都很关注，但使用物理引擎涉及很多概念。新手很难从demo学习物理引擎的具体用法，本文将详细介绍如何做一个简单的跳跃游戏。

###物理对象的创建和使用
首先创建一个物理世界：
{% highlight java %}
var world:p2.World；
{% endhighlight %}

创建Body，并加入world中：
{% highlight java %}
var p2body:p2.Body = new p2.Body(
    { mass: 1
     , fixedRotation: true
     , type:p2.Body.DYNAMIC
    }
);
world.addBody(body);
{% endhighlight %}
创建Body中的参数含义，我们将在后文中结合游戏示例代码说明。

为p2.Body设置显示内容：	
{% highlight java %}
boxBody.displays = [display];	
{% endhighlight %}
`display`是一个`egret.DisplayObject`实例，该语句就是用来创建p2物理世界对象和实际显示对象的关联的。物理世界发生的所有的变化，都需要设置其关联的显示对象以同步其状态。

从world中取出某个p2.Body：
{% highlight java %}
var boxBody:p2.Body = world.bodies[i];
{% endhighlight %}
从p2.Body中取出显示对象：
{% highlight java %}
var box:egret.DisplayObject = boxBody.displays[0];
{% endhighlight %}


###物理世界的坐标系及长度计算
首先要明了坐标系，p2的坐标系不单是原点和方向跟传统的Egret坐标系不一样，连单位也是有差别的，长度单位有一个比例，每一个涉及位置的计算，都需要按该比例进行换算得出。设该比例因数为factor = 50;

Egret显示对象egret.DisplayObject的宽度需要进行换算，即乘以该因数。
每个运行推进函数中同步显示对象与刚体的位置关系：
{% highlight java %}
disp.x = body.position[0] * factor;
disp.y = stageHeight - body.position[1] * factor;
{% endhighlight %}
注意：高度因为坐标系不一致需要修正！
角度需要同步：
{% highlight java %}
disp.rotation = 360 - body.angle * 180 / Math.PI;
{% endhighlight %}

对于某一个物体对象，在p2中，宽度高度是在Shape中设定的；位置和旋转却是由绑定该形状的Body设定。

这样的转换，在游戏实现过程无疑会增加开发复杂度，为此我专门为Egret开发p2物理引擎创建了一个管理类`city.phys.P2Space`。其中有不少服务方法是用于快速的转换p2和显示空间的尺寸以及坐标的。


>#####注意：设置Shape尺寸的时机
>创建Shape过程，直接传入参数才有效。
{% highlight java %}
var rectShape:p2.Rectangle = new p2.Rectangle( 4, 2 );
{% endhighlight %}
>如果换成：
{% highlight java %}
var rectShape:p2.Rectangle = new p2.Rectangle; 
rectShape.width = 4;
rectShape.height = 2;
rectShape.updateArea();
{% endhighlight %}
>也是无法生效的！


###物理世界的显示映射
在p2物理世界运转时，所有的涉及位置或角度的运算，我们都通过设置p2的Body来实现。
至于显示，每个Body都有一个显示列表。         
在物理系统每次推进时，会遍历p2物理世界所有的Body，对每个Body所绑定的显示对象进行同步。          
p2所有的坐标都是以中心为准的。因此，为了减少坐标转换计算量，应当设置显示映射的注册点为中心：         
{% highlight java %}
dispRect.anchorX = dispRect.anchorY = .5;
{% endhighlight %}
`city.phys.P2Space`中的` syncDisplay `就是专门用来同步p2物理世界所对应显示的。         


###设计游戏
屏幕 480*800。         
最下边有一个地面。然后两边有墙面。         

分多层的浮动跳板。         
每层跳板的速度一样，颜色一样。         
不同层的速度不一样，颜色也不一样。         

从下到上速度逐渐加快，增加难度，即增加速率。         
跳板的高度均为20。 宽度根据层数具体定。         

每层跳板的速度方向与下一层相反。         

操作，只需要侦听TOUCH_BEGIN，条件允许则跳起。         
为了简化操作，我们不增加UI元素，设计为触摸地面左侧玩家会向左移动，地面右侧玩家会向右移动。         
触摸地面以上的部分，分为左中右三部分，触摸左侧会以一个向左的角度斜跳，触摸右侧会以一个向右的角度斜跳。触摸中间部分，则会向正上方跳起。         

###创建地面、墙面和跳板
这几种形式都比较相近，我们都用一个函数创建：          
{% highlight java %}
private createGround( world:p2.World, container:egret.DisplayObjectContainer
    , id:number, vx:number, w:number, h:number, resid:string, x0:number, y0:number ):p2.Body{

    var p2body:p2.Body = new p2.Body(
        { mass:1
            , fixedRotation: true
            , position: city.phys.P2Space.getP2Pos( x0 + w / 2, y0 + h / 2 )
            , type: vx == 0 ? p2.Body.STATIC : p2.Body.KINEMATIC
            , velocity:[ vx, 0 ]
        }
    );
    p2body.id = id;
    console.log( "位置：", p2body.position );
    world.addBody( p2body );

    var p2rect:p2.Rectangle = new p2.Rectangle(city.phys.P2Space.extentP2( w ),city.phys.P2Space.extentP2( h ) );
    p2body.addShape( p2rect );

    var bitmap:egret.Bitmap = city.utils.DispUtil.createBitmapByName( resid );
    bitmap.width = w;
    bitmap.height = h;
    bitmap.anchorX = bitmap.anchorY = .5;
    p2body.displays = [ bitmap ];

    container.addChild( bitmap );

    return p2body;
}
{% endhighlight %}

我们游戏的设计，所有物体均不需要转动，因此创建Body时，设置`fixedRotation`为`true`。             
然后`position`设置我们用了`P2Space`的坐标转换服务方法`getP2Pos`，为了方便设置坐标，我们都使用左上角标准，因此，传入显示空间坐标时，用宽度和高度进行修正，使其在物理空间对应中心点坐标。          
接下来是`type`，我们约定，传入的`vx`为`0`，表示静止不动，地面和墙面均应传入`vx`为`0`。          
p2中Body的类型分为三种，这里我们用到两种。地面和墙面不需要移动，并且不会对力和碰撞做出反应，这正是`p2.Body.STATIC`的特征；浮动跳板则均为`p2.Body.KINEMATIC`，这种类型会根据`velocity`属性进行运动，也不会对力和碰撞做出反应。         
接下来时`velocity`，为简化本游戏中的跳板运动，均设计为仅在x方向运动。         

然后创建p2中的Shape，传入参数时使用了`P2Space`的服务函数`extentP2`，将显示空间尺寸，转换为p2空间尺寸。         

使用这个函数，我们很轻松的可以创建3个跳板和地面及墙面：         

{% highlight java %}

/// 创建浮动跳板
this._vcGroundsFloating = [
this.createGround( this._pw, this, 4, 0.6, 120, 20, "rects.rect-" + "0", this._p2FloatingLimitLeft, 600 )      /// -->
,this.createGround( this._pw, this, 5, -0.8, 90, 20, "rects.rect-" + "8", this._p2FloatingLimitRight, 450 )    /// <--
,this.createGround( this._pw, this, 6, 1.2, 80, 20, "rects.rect-" + "10", this._p2FloatingLimitLeft, 300 )     /// -->
];

/// 创建 墙面 底部高50, 两边墙面间距50
this._vcGroundsFixed = [
this.createGround( this._pw, this, 1, 0, 640, 50, "rects.rect-" + "9", 0, 750 )   /// 地面
,this.createGround( this._pw, this, 2, 0, 50, 750, "rects.rect-" + "1", 0, 0 )      /// 左墙面
,this.createGround( this._pw, this, 3, 0, 50, 750, "rects.rect-" + "1", 430, 0 )  /// 右墙面
];
{% endhighlight %}

三个浮动跳板的方向相邻相反，并且宽度越往上越小。         
{% highlight java %}
city.phys.P2Space.syncDisplay( this._vcGroundsFixed[0] );
city.phys.P2Space.syncDisplay( this._vcGroundsFixed[1] );
city.phys.P2Space.syncDisplay( this._vcGroundsFixed[2] );
{% endhighlight %}

创建完毕之后，我们用`P2Space.syncDisplay`立即对地面和墙面进行显示同步：          

这是因为，在游戏运行过程中，这3个块不需要任何运动。         


###创建玩家
玩家的形状，也是一个`p2.Rectangle`，创建玩家的过程跟上述诸面基本类似：         
{% highlight java %}
private createPlayer( world:p2.World, container:egret.DisplayObjectContainer, id:number, resid:string, xLanding:number, yLanding:number ):p2.Body{
    var p2body:p2.Body = new p2.Body(
        { mass: 1
            , fixedRotation: true
            , type:p2.Body.DYNAMIC
        }
    );
    p2body.id = id;
    world.addBody(p2body);

    /// 依照图元尺寸
    var display:egret.DisplayObject =
        city.utils.DispUtil.createBitmapByName( resid );
    display.anchorX = display.anchorY = .5;

    /// 对应p2形状的宽高要根据玩家计算
    var p2rect:p2.Rectangle = new p2.Rectangle(
       city.phys.P2Space.extentP2((<egret.Bitmap>display).texture.textureWidth),
       city.phys.P2Space.extentP2((<egret.Bitmap>display).texture.textureHeight)
    );
    p2body.addShape( p2rect );

    p2body.position =city.phys.P2Space.getP2Pos( xLanding, yLanding - (<egret.Bitmap>display).texture.textureHeight / 2 );
    this._p2posYPlayerLanding = p2body.position[1];
    p2body.displays = [display];

    container.addChild(display);

    return p2body;
}
{% endhighlight %}

玩家创建时，使用了p2中Body的第三种类型：`p2.Body.DYNAMIC`。         
我们事先准备好了玩家的图元素材，为了保持其原始大小显示，我们根据图元纹理的宽高来设置对应p2形状的宽高。         
设置玩家初始坐标时，我们参数传入的是水平中心，垂直底部的值，而传入的值需要在中心位置，因此y坐标要减去图元纹理高度的一半。我们传入的y是地面的坐标，这样初始呈现时，玩家正好站在地面上。         

###运行起来！
由于我们事先进行了充分的准备工作(特别是用了`city.phys.P2Space.syncDisplay`)，运行物理世界的代码相当的简练：         
{% highlight java %}
private run( dt ):void{

    this._pw.step( this.WORLD_STEP_DT );

    /// 玩家
   city.phys.P2Space.syncDisplay( this._pbPlayer );

    /// 浮动板
    if( this._vcGroundsFloating[0].position[0] > this._p2FloatingLimitRight ){
        this._vcGroundsFloating[0].position[0] = this._p2FloatingLimitLeft;
    }
   city.phys.P2Space.syncDisplay( this._vcGroundsFloating[0] );

    if( this._vcGroundsFloating[1].position[0] < this._p2FloatingLimitLeft ){
        this._vcGroundsFloating[1].position[0] = this._p2FloatingLimitRight;
    }
   city.phys.P2Space.syncDisplay( this._vcGroundsFloating[1] );

    if( this._vcGroundsFloating[2].position[0] > this._p2FloatingLimitRight ){
        this._vcGroundsFloating[2].position[0] = this._p2FloatingLimitLeft;
    }
   city.phys.P2Space.syncDisplay( this._vcGroundsFloating[2] );

}
{% endhighlight %}

玩家只需要同步显示！         
    
剩下的就是对浮动跳板的循环控制，都是在其超越边界后，重置到出发边界位置。         


###控制玩家
为了简化，我们只使用触摸来控制，在不同的区域来进行不同的控制，具体控制方法已经在**设计游戏**一节说明了。         
代码也没有任何累赘：         
{% highlight java %}
private touchProcess( e:egret.TouchEvent ):void{

    if( e.stageY > 750 ) {    /// 地面重置
        if( e.stageX < 240 ){
            this._pbPlayer.velocity[0] = - this.PLAYER_VX;
        }else{
            this._pbPlayer.velocity[0] = this.PLAYER_VX;
        }
    }else{
        if( city.phys.P2Space.checkIfCanJump( this._pw, this._pbPlayer ) ){
            this._pbPlayer.velocity[1] = this.PLAYER_VY;
            this._pbPlayer.velocity[0] = this.PLAYER_VX * ( e.stageX - 240 )/ 200 ;
        }else{
            city.utils.DevUtil.trace( "player no jump:", this._pbPlayer.velocity[1] );
        }
    }
}
{% endhighlight %}
需要说明的就是`city.phys.P2Space.checkIfCanJump`，这是根据玩家当前状态来判断是否可以起跳，因为我们不能允许玩家在不接触跳板或地面的情况下再次起跳！其中的判断涉及的物理引擎原理较为复杂，本篇教程就先不细讲了。         
         
用本示例所涉及的内容，已经可以做一些简单的物理游戏了。然而物理引擎的威力，我们只发掘了一小部分。很有更强大的功能等待我们去探索！         


