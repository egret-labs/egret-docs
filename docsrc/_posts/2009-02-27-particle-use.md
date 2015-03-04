---
layout: post
title:  "粒子系统使用"
permalink: post/manual/particle/particle-use.html
type: manual
element: particle
version: Egret引擎 v1.x
---


### 初始化
通过RES模块获得 GravityParticleSystem 所需要的纹理以及配置，然后创建particle.GravityParticleSystem对象。注：纹理和配置需要加载过的


{% highlight java linenos %}
var texture = RES.getRes("texture");
var config = RES.getRes("texture_json");
this.system = new particle.GravityParticleSystem(texture, config);
{% endhighlight %}

-----

###配置文件
* GravityParticleSystem 构造函数所传入的配置是一个Object对象，包含了 GravityParticleSystem 所需的各个参数，这些参数都是都是必须的。
* 配置文件可以是json，通过RES模块加载之后可以直接使用。也可以是从服务端请求的数据对象，还可以是xml或者其他格式的配置文件通过自定义解析生成的数据对象。

下面以json的配置文件为例，配置文件中的参数命名基本上和 GravityParticleSystem 中的属性名称一致


{% highlight java linenos %}
{
    "emitter": {
        "x": 240,
        "y": 600
    },
    "emitterVariance": {
        "x": 104,
        "y": 0
    },
    "gravity": {
        "x": 0,
        "y": 0
    },
    "maxParticles": 500,
    "speed": 90,
    "speedVariance": 30,
    "lifespan": 2000,
    "lifespanVariance": 1900,
    "emitAngle": 270,
    "emitAngleVariance": 15,
    "startSize": 70,
    "startSizeVariance": 50,
    "endSize": 10,
    "endSizeVariance": 0,
    "startRotation": 0,
    "startRotationVariance": 0,
    "endRotation": 0,
    "endRotationVariance": 0,
    "radialAcceleration": 0,
    "radialAccelerationVariance": 0,
    "tangentialAcceleration": 0,
    "tangentialAccelerationVariance": 0
}
{% endhighlight %}

----------

### 启动

通过 start 函数启动粒子系统


{% highlight java linenos %}
this.system.start();
{% endhighlight %}

----

### 停止
通过 stop 函数停止粒子系统


{% highlight java linenos %}
this.system.stop();
{% endhighlight %}
-----
### 更换纹理
通过 changeTexture 函数更换粒子纹理


{% highlight java linenos %}
var newTexture = RES.getRes("newTexture");
this.system.changeTexture(newTexture);
{% endhighlight %}
-----

### 创建示例

通过以下代码可以创建粒子系统并启动


{% highlight java linenos %}
//获取纹理
var texture = RES.getRes("texture");
//获取配置
var config = RES.getRes("texture_json");
//创建 GravityParticleSystem
this.system = new particle.GravityParticleSystem(texture, config);
//启动粒子库
this.system.start();
{% endhighlight %}

----

### 粒子系统相关链接
<a href="http://static.egret-labs.org/egret-game/example/html5/particle/index.html" target="_blank">粒子系统传统显示示例</a>

<a href="http://static.egret-labs.org/egret-game/example/webgl/particle/index.html" target="_blank">粒子系统WebGL显示示例</a> 

<a href="https://github.com/egret-labs/egret-game-library/tree/master/particle" target="_blank">粒子系统示例源码</a> 

<a href="{{site.baseurl}}/jkdoc/benchmark-particle.html" target="_blank">benchmark之粒子系统</a>
