## 概述

GravityParticleSystem 是继承自 ParticleSystem 扩展的重力粒子系统，在该系统中通过设置重力、速度、径向加速度以及切向加速度实现粒子不同的运动轨迹。

## 说明

该系统中大部分的参数都是由2个数值决定的：基础值和差值。粒子在被创建时的属性值是由基础值加上随机的差值浮动决定的，差值的浮动在正负差值之间。例如：粒子存活时间的基础值是1000，差值是500，那么创建粒子的时候粒子的存活时间是 基础值 + 差值 * (Math.random() * 2 - 1)，也就是500到1500之间随机。

属性

** private emitterXVariance:number; **

```
 @brief 粒子初始坐标 x 差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private emitterYVariance:number; **

```
 @brief 粒子初始坐标 y 差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private lifespan:number; **

```
 @brief 粒子存活时间，单位毫秒，取值范围(0,Number.MAX_VALUE]
```

** private lifespanVariance:number; **

```
 @brief 粒子存活时间差值，单位毫秒，取值范围(0,Number.MAX_VALUE]且不大于 lifespan
```

** private emitAngle:number; **

```
 @brief 粒子出现时的角度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private emitAngleVariance:number; **

```
 @brief 粒子出现时的角度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private speed:number; **

```
 @brief 粒子出现时速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private speedVariance:number; **

```
 @brief 粒子出现时速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private gravityX:number; **

```
 @brief 粒子水平重力，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private gravityY:number; **

```
 @brief 粒子垂直重力，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private radialAcceleration:number; **

```
 @brief 粒子径向加速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private radialAccelerationVariance:number; **

```
 @brief 粒子径向加速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private tangentialAcceleration:number; **

```
 @brief 粒子切向加速度，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private tangentialAccelerationVariance:number; **

```
 @brief 粒子切向加速度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
``` 
 
** private startSize:number; **

```
 @brief 粒子出现时大小，取值范围(0,Number.MAX_VALUE]，粒子将会在存活时间内由 startSize 慢慢变为 endSize
```

** private startSizeVariance:number; **

```
 @brief 粒子出现时大小差值，取值范围(0,Number.MAX_VALUE]
```

** private endSize:number; **

```
 @brief 粒子消失时大小，取值范围(0,Number.MAX_VALUE]，粒子将会在存活时间内由 startSize慢慢变为 endSize
```

** private endSizeVariance:number; **

```
 @brief 粒子消失时大小差值，取值范围(0,Number.MAX_VALUE]，且不大于endSize
```

** private startRotation:number; **

```
 @brief 粒子出现时旋转值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startRotation 慢慢变为 endRotation
```

** private startRotationVariance:number; **

```
 @brief 粒子出现时旋转值差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private endRotation:number; **

```
 @brief 粒子消失时旋转值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startRotation 慢慢变为 endRotation
```

** private endRotationVariance:number; **

```
 @brief 粒子消失时旋转值差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private startAlpha:number; **

```
 @brief 粒子出现时的 Alpha 透明度值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startAlpha 慢慢变为 endAlpha
```

** private startAlphaVariance:number; **

```
 @brief 粒子出现时的 Alpha 透明度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

** private endAlpha:number; **

```
 @brief 粒子消失时的 Alpha 透明度值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]，粒子将会在存活时间内由 startAlpha 慢慢变为 endAlpha
```

** private endAlphaVariance:number; **

```
 @brief 粒子消失时的 Alpha 透明度差值，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
```

## 方法

** constructor(texture:egret.Texture, config:any) **

```
 @brief 构造函数  @param texture {egret.Texture} 粒子纹理  @param config {any} 粒子属性配置，包含重力系统所需要的各项属性值
``` 