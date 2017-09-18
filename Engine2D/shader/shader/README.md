## 自定义Shader

------------------


### 概述
egret 5.0.3 以上版本中提供了 CustomFilter 可以供开发者自由扩展滤镜，实现各种定制化效果。
`该功能仅在web和微端环境下支持`

------

### 详细说明
CustomFilter 构造函数中需要传入顶点着色器和片段着色器程序的字符串，以及 uniforms 对象

* 开发者可以根据项目需求自行编写顶点着色器和片段着色器程序

* 顶点着色器中aVertexPosition，aTextureCoord，aColor，projectionVector属性由引擎传入

* 引擎渲染之前会将 uniforms 对象的属性上传到着色器中，开发者可以每帧改变 uniforms 对象的属性达到实现不同效果的需求。该属性目前只支持数字和数组

* CustomFilter 同时提供了 padding 属性，该属性为滤镜的内边距，如果自定义滤镜所需区域比原区域大（如引擎提供的描边滤镜），需要手动设置该属性。该属性以像素为单位

------

### 使用案例
访问 [这里](http://developer.egret.com/cn/example/egret2d/index.html#210-egret2d-customefilter) 查看演示示例

------

### 实战教程
这里我们实现一个简单的黑白方块的效果，首先创建一个game项目，之后在Main.ts中createGameScene函数最后插入顶点着色器代码：

```
let vertexSrc =
	"attribute vec2 aVertexPosition;\n" +
	"attribute vec2 aTextureCoord;\n" +
	"attribute vec2 aColor;\n" +
	
	"uniform vec2 projectionVector;\n" +
	
	"varying vec2 vTextureCoord;\n" +
	
	"const vec2 center = vec2(-1.0, 1.0);\n" +
	
	"void main(void) {\n" +
	"   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
	"   vTextureCoord = aTextureCoord;\n" +
	"}";
```

在之后插入片段着色器代码：

```
let fragmentSrc =
    "precision lowp float;\n" +

    "varying vec2 vTextureCoord;\n" +

    "uniform float width;\n" +
    "uniform float height;\n" +

    "void main(void) {\n" +
    "vec4 fg;\n" +
    "if(mod(floor(vTextureCoord.x / width) + floor(vTextureCoord.y / height), 2.0) == 0.0) {" +
    "fg = vec4(1,1,1,1);" +
    "}" +
    "else {" +
    "fg = vec4(0,0,0,1);" +
    "}" +
    "gl_FragColor = fg;\n" +
    "}";
```
我们在代码中定义了每个格子的宽高，这两个值有uniforms属性传入。之后根据uv信息以及传入的宽高，利用取余函数算出奇偶数，通过奇偶决定格子是黑色还是白色。

这里我们对背景图使用自定义滤镜，设定每个格子大小为50像素：

```
let size = 50;
let filter = new egret.CustomFilter(vertexSrc, fragmentSrc, { width: size / stageW, height: size / stageH });
sky.filters = [filter];
```

我们来看一下运行效果，发现背景图变成了黑白格子，每个格子大小为50像素。

![](heibai.png)

之后我们通过帧函数改变格子大小(uniforms属性)：

```
let inc = 1;
this.stage.addEventListener(egret.Event.ENTER_FRAME, function () {
    size += inc;
    if (size >= 80) {
        inc = -1;
    }
    if (size <= 50) {
        inc = 1;
    }
    filter.uniforms.width = size / stageW;
    filter.uniforms.height = size / stageH;
}, this);
```

再运行游戏，会发现每帧格子的大小都会相应变化

访问 [这里](http://developer.egret.com/cn/example/egret2d/index.html#210-egret2d-heibai) 查看演示示例