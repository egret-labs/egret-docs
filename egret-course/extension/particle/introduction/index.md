## 概述

该粒子库是基于 Egret 引擎做的扩展。粒子库中的所有粒子使用同一张纹理，通过设置的不同属性实现各种运动效果。该粒子库遵循 Egret 第三方库的规则，在项目中如果要使用需要在 egretProperties.json 中配置一个新的 module ，其 name 属性设置为particle并将path属性设置为粒子库路径。

##注意事项

由于整个粒子系统使用同一张纹理，使得在使用 WebGL 以及 OpenGL 渲染时可以通过批处理达到很理想的性能体验。但是在 canvas 渲染模式下，尽量保持粒子数量在200以内。

## 主要类职责

* Particle:粒子类，定义了粒子的基础参数，如：xy坐标、旋转、缩放等。

* ParticleSystem:粒子库基类，包括粒子库所必须的一些方法

* GravityParticle:继承自 Particle，定义了 GravityParticle 所需要的各项参数

* GravityParticleSystem:继承自 ParticleSystem，通过传入的配置实现重力粒子系统