# JSZip库



## 简介

`JSZip` 是一个JavaScript库，用来创建，阅读和编辑 .zip 文件。

我们已经将 `JSZip` 制作成 Egret 可以直接使用的第三方库和示例，可在 [github下载](https://github.com/egret-labs/egret-game-library/tree/master/jszip)。



## 引入

1. 引入 `JSZip` 支持库与引入其他第三方库过程相同，首先下载该库，在 egretProperties.json 中引入该库并编译引擎。


2. 打开并编辑`egretProperties.json` 文件：

   ```typescript
   {
       "name": "jszip",// 第三方库名
       "path": "../libsrc"// 第三方库路径   
   }
   ```

3. `egret build -e ` 编译引擎。



## 使用

在 Egret 项目中，发布的时候可以使用 [压缩插件](http://developer.egret.com/cn/github/egret-docs/Engine2D/cmdExtensionPlugin/api/index.html) 将资源（图片，配置文件等）压缩成一个 .zip 文件，然后使用JSZip读取 .zip 文件的内容。



### 读取zip文件
首先将 .zip 文件配置到default.res.json中，便于后面读取使用。

```typescript
// 使用res获取到zip文件
RES.getResAsync('xx_zip').then((data) => {
    // 解压，读取
    JSZip.loadAsync(data)
    
    //  do something ...
    
})
```



### 加载json

```typescript
RES.getResAsync('json_zip').then((data) => {
    // 解压，读取
    JSZip.loadAsync(data).then((zipdata) => {
        return zipdata.file('xxx.json').async('text')
    }).then(text => {
        let jsonData = JSON.parse(text)
        console.log(jsonData)
    })

})
```



###加载图片

```typescript
RES.getResAsync('img_zip').then((data) => {
    // 解压，读取
    JSZip.loadAsync(data).then((zipdata) => {
        // 把数据解析为base64
        return zipdata.file('img/xxx.jpg').async('base64')
    }).then(base64 => {
        base64 = "data:image/png;base64," + base64
        var img: eui.Image = new eui.Image();
        img.source = base64;
        this.addChild(img);
    })

})
```



### 生成zip文件

```typescript
var zip = new JSZip();
zip.file("Hello.txt", "Hello World\n");
// 创建images文件夹
var img = zip.folder("images");
// 二进制数据
var imgData = "R0lGODdhBQAFAIACAAAAAP/eACwAAAAABQAFAAACCIwPkWerClIBADs=";
img.file("smile.gif", imgData, { base64: true });
zip.generateAsync({ type: "blob" }).then((blob) => {
    saveAs(blob, "example.zip")
})
```







##  其他

本文介绍JSZip基本的使用方法，如果开发者想深入了解，可以阅读[文档](http://stuk.github.io/jszip/documentation/api_jszip.html)。