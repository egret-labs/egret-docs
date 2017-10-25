
位图的使用需要纹理的支持，在Egret中，默认隐藏了纹理的操作，所有操作均针对于显示对象进行。但位图的显示依然基于纹理。在显示一张图片时， 需要使用 `Bitmap` 类，这是egret中的图片类，而纹理则来自于所加载的资源图片。通常情况下，用单张图片作为纹理，游戏中也会大量使用纹理集来进行渲染。

## 1.创建
使用 `Bitmap` 类创建图片对象，代码如下：

```
private img:egret.Bitmap = new egret.Bitmap();
```

此时得到一个位图对象，将它添加到显示列表中，还不会看到任何内容。因为该位图对象仅仅是一个“空对象”，还没有为它指定任何的纹理。

给该位图对象指定一个纹理，在画面中显示出渲染的文件。

指定纹理的方式是设置 `Bitmap` 中的 `texture` 属性。

```
img.texture = RES.getRes("图片ID");
```

## 2.资源配置
上面一行代码为位图添加纹理，它有一个输入参数："图片ID"。

所有加载的资源都会有一个唯一ID，这个ID绝大部分取自图片文件名称，也有一些资源会定义一些其他的ID。这些图片的组织方式都是由一个json文件描述的。

下面是一个标准的资源配置文件：

```
{
    "resources":
    [
        {"name":"bgImage","type":"image","url":"assets/bg.jpg"},
        {"name":"egretIcon","type":"image","url":"assets/egret_icon.png"},
        {"name":"description","type":"json","url":"config/description.json"}
    ],
    "groups":
    [
        {"name":"preload","keys":"bgImage,egretIcon"}
    ]
}
```

在一个json资源配置文件中，应该包含两大部分，一个是组，另一个是资源。

### 2.1.资源

资源包含在“resources”中，游戏中所有使用到的资源都应包含在此。每一个资源拥有三个属性。

1. name：对应资源的唯一ID编号

2. type：资源类型

3. url：当前资源的路径

### 2.2.组

组包含在“groups”中，组的概念是将不同的资源分类，当逻辑启动加载后，可以选择以组为单位进行加载。 

## 3.示例

示例代码如下：

```
class BitmapTest extends egret.DisplayObjectContainer{

    public constructor()

    {

        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);

    }

    private onAddToStage(event:egret.Event) {

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);

        RES.loadConfig("resource/default.res.json", "resource/");

        RES.loadGroup("preload");

    }

    private onGroupComplete()

    {

        var img:egret.Bitmap = new egret.Bitmap();

        img.texture = RES.getRes("bgImage");

        this.addChild(img);

    }

}
```

编译运行后，效果如下图：

![](56614ea87fa1a.jpg)




