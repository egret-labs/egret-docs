DragonBones作为Egret引擎的扩展库已经集成在安装包中。如果你的项目需要使用到DragonBones，需要在项目配置中开启DragonBones配置项。操作步骤如下：

1、新建 Egret项目

2、修改项目中的 egretProperties.json文件

在配置文件中，找到modules标签，添加DragonBones绑定项。

```
"name": "dragonbones"
```

添加后配置内容如下：

```
"modules": [
    {
        "name": "egret"
    },
    {
        "name": "game"
    },
    {
        "name": "tween"
    },
    {
        "name": "res"
    },
    {
        "name": "dragonbones"
    }
]
 ```

3、重新编译项目


重新编译请执行 `egret build -e`

通过上述三个步骤操作，你可以在项目中直接使用DragonBones。

测试配置是否成功，可以使用下面语句进行调试。在控制台中直接打印出当前DragonBones数据格式的版本。

```
console.log(dragonBones.DragonBones.DATA_VERSION);
```