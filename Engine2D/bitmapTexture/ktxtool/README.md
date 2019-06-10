KTX 转换工具使用说明

#### [点此下载](http://tool.egret-labs.org/DocZip/tools/egret-texture-generator-0.1.0.tgz)
该工具还处于测试阶段，完成后我们会上传到 npm，作为标准库使用。现在暂时还需要开发者自己下载安装。

#### 安装
```
npm install 路径/egret-texture-generator-0.1.0.tgz
```
#### 命令行使用方法
在`egret-texture-generator-0.1.0.tgz`安装目录执行命令
```
npx egret-texture-generator --t 资源路径
```

后面还可以加更多的可选参数：
```
--t [path] --q [low|high] --pf [normal|canvas|canvasalpha] --pbpp [2|4] [--ie]
```

**注：用默认参数转换出来的 PVRTC 格式的 KTX，质量很差。建议使用下面这几个参数：`--pf canvasalpha --pbpp 4`**

选项

* --t
必需，资源项目绝对路径，工具会把该目录下的图片转换成 ktx 格式
* --q
可选，ktx转换质量。
    * `low`：低质量，默认值。
    * `high`：最高质量。
**注意**：设置为 `high` 时，转换速度会很慢

* --pf
可选，PVRTC格式填充类型，当资源格式不匹配时，转换成PVRTC后图片尺寸会增加，该参数用于处理如何填充增加的部分。
	* `normal`：默认值，缩放图片，会导致图片变形。
	* `canvas`：原始图片尺寸不变，其他区域根据图片类型填充不同的颜色。**png**图片透明填充，非**png**图片黑色填充。
	* `canvasalpha`：原始图片尺寸不变，其他区域透明填充。

    **注意**：PVRTC格式有如下限制
	* 高度和宽度必须是2的幂
	* 必须为正方形，即高度和宽度相等

	
* --pbpp
可选，PVRTC格式每像素色彩位数。
    * `2`：2 bits，默认值。
    * `4`：4 bits。

    设置4 bits时转换后的图片质量会优于2 bits但同时文件大小会增加。

* --ie
可选，是否跳过已转换过的资源。
    * `false`：始终进行转换，默认值。
    * `true`：如果资源对应的.ktx文件已存在则跳过。

#### 注意事项
当转换格式选择PVRTC时，转换完成后可能会出现如下的警告信息

```
                .............
[malitc-7]Perceptually weighted RMSE: 0.0363376
[malitc-8]Perceptual PSNR: 81.6949
                ..............


由于PVRTC限制，以下资源在转换成PVRTC格式后会发生变形
1. 高度和宽度必须是2的幂
2. 必须为正方形，即高度和宽度相等
参考：https://en.wikipedia.org/wiki/PVRTC


D:\tools\CompressedTextureTool\resource\assets\activity_bg.png
D:\tools\CompressedTextureTool\resource\assets\bg.jpg
D:\tools\CompressedTextureTool\resource\assets\bg_jpeg.jpeg
D:\tools\CompressedTextureTool\resource\assets\bird.png
D:\tools\CompressedTextureTool\resource\assets\egret_icon.png
D:\tools\CompressedTextureTool\resource\assets\good.png
D:\tools\CompressedTextureTool\resource\assets\hero.png
D:\tools\CompressedTextureTool\resource\assets\mc1\chunli1.png
D:\tools\CompressedTextureTool\resource\assets\weapon.png

```

如果出现以上警告信息，说明资源格式与PVRTC要求的格式不匹配。请确保列出的资源格式满足以下要求：
1. 高度和宽度必须是2的幂
2. 必须为正方形，即高度和宽度相等

或者不将列出的资源压缩为PVRTC格式。