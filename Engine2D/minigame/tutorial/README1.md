## 小游戏新手教程

### 开发环境准备

* 准备最新版微信开发者工具。[下载地址](https://mp.weixin.qq.com/debug/wxagame/dev/devtools/download.html?scene=21#wechat_redirect)
* 从微信公众平台获取了小游戏的 appid
* 白鹭引擎 5.1.1 版本以上(包括5.1.1)
* 白鹭引擎微信小游戏模板。[下载地址](http://developer.egret.com/cn/statics/downs/target.zip)

### 创建小游戏

* 使用 ```egret create helloworld --type eui``` 创建一个新项目
* 进入项目文件夹，执行 ```egret target --t [ 微信小游戏模板下载路径] --appid [ 微信appid] --projectname [项目名称]```

    > 注意，如果您出现过同一个 appid 创建多个项目的情况（一般是用于测试），请务必确保不同项目的 projectname 不一样。

* 修改 ```helloworld/scripts/config.ts```，添加如下内容
    * 在第一行添加 ```import { WxgamePlugin } from './wxgame/wxgame'```
    * 将发布的命令修改为
```
commands: [
    new CompilePlugin({ libraryType: "release" }),
    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
    new WxgamePlugin(),
    new UglifyPlugin([{
            sources: ["main.js"],
            target: "main.min.js"
        },{
            sources: ["resource/default.thm.js"],
            target: "resource/default.thm.min.js"
        }
    ]),
    new ManifestPlugin({ output: 'manifest.js' })
]
```

> 注意，5.1.1 引擎模版默认皮肤会加载两次，修改 ThemeAdapter.ts 文件中的 getTheme 方法，如下：

```
 public getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void {

        if (typeof generateEUI !== 'undefined') {
            egret.callLater(() => {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        } else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }

        function onResGet(e: string): void {
            onSuccess.call(thisObject, e);
        }

        function onResError(e: RES.ResourceEvent): void {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }

    }
```
    
* 执行 ```egret publish --target wxgame```

### 运行小游戏

打开微信开发者工具，使用微信扫码登录进入：

![](x01.png)

点击小程序项目进入并选择中打开 ```helloworld_wxgame```工程:

![](x02.png)

如打开时报错‘未找到入口 app.json’错误提示:

![](x06.jpg)

请您点击小游戏按钮：

![](x07.png)

现在就可以运行小游戏了，如在开发中遇到任何问题都可到官方论坛提问，官方团队很愿意为您解答。