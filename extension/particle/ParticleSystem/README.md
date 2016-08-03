## 概述

ParticleSystem 是粒子库的基类，其他粒子库可以继承自 ParticleSystem 实现自己的功能。ParticleSystem 提供了粒子库必须的一些属性和方法，在创建粒子对象时使用了对象池以减少对象创建带来的开销。

## 属性

ParticleSystem 提供了粒子系统所必须的一些属性，如：粒子出现间隔、粒子纹理等等。

** public emissionTime:number = -1; **

```
 @brief 粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
```
** public emissionRate:number; **

```
 @brief 粒子出现间隔，单位毫秒，取值范围(0,Number.MAX_VALUE]
```

** public texture:egret.Texture; **

```
@brief 粒子所使用的纹理
```

** public emitterX:number = 0; **

```
@brief 粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE] **
```

** public emitterY:number = 0; **

```
@brief 粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE] **
```

** public maxParticles:number = 200; **

```
@brief 粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
```

## 方法

ParticleSystem 提供了粒子系统所必须的一些方法，如：开始、停止、更换纹理。

** constructor(texture:egret.Texture, emissionRate:number) **

```
 @brief 构造函数  @param texture {egret.Texture} 粒子纹理  @param emissionRate {number} 粒子出现间隔
```

** public start(duration:number = -1):void **

```
 @brief 开始创建粒子  @param duration {number} 粒子出现总时间
```

** public stop(clear:boolean = false):void **

```
 @brief 停止创建粒子  @param clear {boolean} 是否清除掉现有粒子
``` 

** public changeTexture(texture:egret.Texture):void **

```
@brief 更换粒子纹理  @param texture {egret.Texture} 新的纹理
```