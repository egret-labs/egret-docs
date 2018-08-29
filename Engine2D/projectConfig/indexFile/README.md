
`index.html` 为项目的入口文件，下面是 `body` 标签里的默认配置，您可以根据项目需求修改。

```
<div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="auto"
         data-scale-mode="showAll"
         data-frame-rate="30"
         data-content-width="640"
         data-content-height="1136"
         data-multi-fingered="2"
         data-show-fps="false" data-show-log="false"
         data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9">
    </div>
```

* data-entry-class：文件类名称。
* data-orientation：旋转模式。
* data-scale-mode：适配模式。
* data-frame-rate：帧频数。
* data-content-width：游戏内舞台的宽。
* data-content-height：游戏内舞台的高。
* data-multi-fingered：多指最大数量。
* data-show-fps：是否显示 fps 帧频信息。
* data-show-log：是否显示 egret.log 的输出信息。
* data-show-fps-style：fps面板的样式。支持5种属性，x:0, y:0, size:30, textColor:0xffffff, bgAlpha:0.9



在 `script` 标签内，有项目的启动参数,如下图所示

```
egret.runEgret({ renderMode: "webgl", audioType: 0, 
calculateCanvasScaleFactor:function(context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
}});
```

参数是一个对象，包括以下4个可选属性：

* "renderMode": 引擎渲染模式，"canvas" 或者 "webgl"
* "audioType": 使用的音频类型，0:默认，2:web audio，3:audio
* "calculateCanvasScaleFactor"：屏幕的物理像素适配方法，使用默认的即可

