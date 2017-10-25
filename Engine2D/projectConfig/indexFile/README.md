项目的入口文件用于加载js文件和设置配置信息。

    Native 下不需要单独配置，引擎会自动从 index.html 中读取项目所使用的各个配置信息。

## 加载 js 文件
项目所需的所有javascript文件的路径存放在项目根目录的 manifest.json 文件中。
入口文件根据 manifest.json 加载 javascript 文件。

>>> 此处的 script 标签均为自动生成，请勿修改。

### 1.库文件

manifest.json 文件下的 "initial" 中是库文件列表，包括 Egret 核心库和其他扩展库。

### 2.项目代码文件

manifest.json 文件下的 "game" 中是项目代码文件列表。

## 运行配置

* data-entry-class：文件类名称。
* data-orientation：旋转模式。
* data-scale-mode：适配模式。
* data-frame-rate：帧频数。
* data-content-width：游戏内stage宽。
* data-content-height：游戏内stage高。
* data-show-pain-rect：是否显示脏矩形区域。
* data-multi-fingered：多指最大数量。
* data-show-fps：是否显示fps。
* data-show-log：是否显示egret.log的输出信息。
* data-show-fps-style：fps面板的样式。支持5种属性，x:0, y:0, size:30, textColor:0xffffff, bgAlpha:0.9

## 启动项目
```egret.runEgret({ renderMode: "webgl", audioType: 0 })``` 启动项目。

参数是一个对象，包括以下4个可选属性：
* "renderMode": 引擎渲染模式，"canvas" 或者 "webgl"
* "audioType": 使用的音频类型，0:默认，2:web audio，3:audio
* "antialias": WebGL模式下是否开启抗锯齿，true:开启，false:关闭，默认为false
* "retina": 是否基于devicePixelRatio缩放画布
