同一项目不同模块可自由选择对应版本配置。

在项目配置文件`egretProperties.json`中，可对使用的模块进行单独版本配置。如下示例：

```
{
  "native": {
    "path_ignore": []
  },
  "publish": {
    "web": 0,
    "native": 1,
    "path": "bin-release"
  },
  "egret_version": "5.0.6",
  "modules": [
    {
      "name": "egret",
      "path":"${EGRET_APP_DATA}/5.0.6"
    },
    {
      "name": "game",
      "path":"${EGRET_APP_DATA}/4.0.3"
    },
    {
      "name": "tween"
    },
    {
      "name": "res"
    }
  ]
}
```

开发者可通过配置`modules`字段中的`path`属性来指定对应版本路径。

如上述示例，在该项目中，引擎（egret模块）版本使用`5.0.6`版本，游戏模块（game）版本使用`4.0.3`版本。

### EGRET_APP_DATA 变量

`${EGRET_APP_DATA}`变量为全局变量，该变量所指示的位置为Egret Launcher安装引擎时所使用的路径。

> 如果开发者修改过引擎安装目录，此时配置`path`属性时请指定修改后的路径。