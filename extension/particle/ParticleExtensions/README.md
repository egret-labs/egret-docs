### 概述

ParticleSystem 是支持开发者自定义扩展的，开发者可以根据自己的业务需求实现自定义粒子系统扩展。

---

### 扩展流程

创建自己的粒子类，继承自 `Particle`，粒子类中定义了扩展的粒子库粒子属性。创建自己的粒子库，继承自 `ParticleSystem`，粒子库重写 `initParticle` 方法和 `advanceParticle` 方法。其中 `initParticle` 方法用于初始化粒子属性，`advanceParticle` 用于每个时间间隔粒子的运动。

### 需要重写的方法

#### initParticle

```
/**

 * @param particle {particle:particle.Particle} 粒子对象

 */

public initParticle(particle:particle.Particle):void {

    //初始化粒子属性

}
```

#### advanceParticle

```
/**

 * @param particle {particle:particle.Particle} 粒子对象

 * @param dt {number} 间隔时间，单位毫秒

 */

public advanceParticle(particle:particle.Particle, dt:number):void {

    //粒子运动变化

}
```

### 注意事项

自定义扩展时，`initParticle` 方法和 `advanceParticle` 方法的参数类型仍然是 `Particle`，可以通过强制类型转换实现业务需求。

```
var locParticle:GravityParticle = <GravityParticle>particle;
```