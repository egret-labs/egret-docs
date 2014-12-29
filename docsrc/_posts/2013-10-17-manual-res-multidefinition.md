---
layout: post
title:  "多套素材的适配方案"
permalink: post/manual/loader/multidefinition.html
type: manual
element: manualloader
version: Egret引擎 v1.5.1
---


### 概述
egret 默认 DesignSize 是480*800。然而在某些情况下，我们可能需要使用其他尺寸的素材。这套多素材适配方案就是解决这类问题的。下面我们就以适配240的素材来说明下。

------

### 素材目录调整
默认生成的项目中，素材放在 `resource/assets` 文件夹下，为了更为方便的使用这套方案，我们在该目录下建2个文件夹480和240,然后将对应的素材放入对应的文件夹下。

![Mou icon]({{site.baseurl}}/assets/img-jk/manual-loader-multidefinition-resource.jpg)
   
注意，两个不同分辨率的目录下的素材文件结构要完全一致！这样我们才可以方便的通过设置素材URL基址来切换不同的分辨率。
    
------

### 素材配置文件调整
之后我们修改素材配置文件`resource.json`，将之前的素材路径前缀`assets`删除。

![Mou icon]({{site.baseurl}}/assets/img-jk/manual-loader-multidefinition-resource_json.jpg)


------

### 修改加载素材配置代码
之后我们修改加载素材配置的代码，这里我们先使用480的素材，由代码可以看出RES模块会加载 `resource/assets/480/` 目录下的素材

![Mou icon]({{site.baseurl}}/assets/img-jk/manual-loader-multidefinition-load_config.jpg)


------

### 使用240尺寸素材
前面的准备工作已经做完，接下来重点来了，我们需要使用240尺寸的素材。这里我们只需要修改2个地方：

1.修改加载素材配置代码

![Mou icon]({{site.baseurl}}/assets/img-jk/manual-loader-multidefinition-load_config_240.jpg)

2.修改`egret_loader.js`中的 `texture_scale_factor `属性，这里修改为2因为需要把240素材绘制成480的

![Mou icon]({{site.baseurl}}/assets/img-jk/manual-loader-multidefinition-texture_scale_factor.jpg)


------

### 注意事项
* 其他尺寸的素材对应的SpriteSheet配置文件应该是相应尺寸素材的
* 如果有加载外部素材，也可以通过分尺寸目录的方式实现
* 使用这种方案最好保持素材尺寸可以被整除，比如原尺寸是480想要制作一套240尺寸的素材，一定保证480素材尺寸都可以被2整除

