## Demo简介

为了便于开发者使用和理解，用 Matchvs 的实时联网 SDK 和 白鹭 `Egret` 开发的多人抢足球，提供了简洁的Demo来展示多人实时联网游戏的开发过程和效果，用于演示多人匹配、数据传输、帧同步、创建房间、获取房间列表、消息订阅、断线重连、修改房间属性等功能。


# Egret集成Matchvs  

在Egret游戏开发引擎中使用 Matchvs 游戏联网引擎，快速的开发联网对战游戏。

## Egret 环境配置

#### 1、Lanucher 安装。

- [Lanucher 下载](https://www.egret.com/)  

#### 2、安装egret引擎版。

打开Lanucher选择对应的egret引擎版本下载安装（egret更新较快建议安装最新的Stableb版本），如下图：

![](http://imgs.matchvs.com/static/Doc-img/new-start/Egretimg/egret_start1.png)

#### 3、安装IDE工具Wing

打开Lanucher 定位到工具页面，下载wing并安装。  

## Matchvs 集成

#### 1、创建egret游戏开发项目。

打开Lanucher 定位到项目页面。创建项目。在项目创建页面勾选Matchvs游戏云。并创建。

![](http://imgs.matchvs.com/static/Doc-img/new-start/Egretimg/egret_start2.png)

#### 2、替换matchvs文件夹下面的内容

到 [Matchvs官网下载](http://www.matchvs.com/serviceDownload) TypeScript版本的 MatchvsSDK 解压并取出 matchvs 文件内容到 egret项目的libs目录里面。

>  `matchvs`文件下三个文件(matchvs.d.ts、matchvs.js、matchvs.min.js)。

#### 3、使用 wing打开项目

创建好项目后，在打开项目的wing左边导航可以的libs目录下可以看到有 matchvs文件夹，如下图：

![](http://imgs.matchvs.com/static/Doc-img/new-start/Egretimg/egret_start3.png)

#### 4、配置 egretProperties.json 文件

打开 egretProperties.json 文件添加如下配置：

```typescript
{
      "name": "matchvs",
      "path": "./libs/matchvs"
 }
```

如图所示：

![](http://imgs.matchvs.com/static/Doc-img/new-start/Egretimg/egret_start5.png)

以上步骤已经完美集成 Matchvs SDK，接下来就开启你的 联网对战之旅。

## Matchvs 使用

在使用 Matchvs 服务之前请确认您已经在 Matchvs官网注册账号并新建好了一款游戏服务。如果还没有注册Matchvs 游戏服务请参考 [Matchvs 快速入门](../matchvs) 文档。

Matchvs SDK 接口服务分为 **请求服务** 和 **回调服务** ， 使用是以简单的接口调用和接口返回的方式实现相关联网操作。比如随机加入房间只需要调用`joinRandRoom接口`，加入房间结果就以接口 `joinRoomResponse` 返回。在整个使用过程中，开发者只需要关心`MatchvsEngine`(接口请求调用对象)和 `MatchvsResponse`(接口调用返回对象)。接口请求使用 `MatchvsEngine`对象实例，接口返回使用 `MatchvsResponse` 对象实例。后面后介绍这两个对象的使用方法。此文档只是用于引导开发者接入SDK，需要接口详细的参数说明请看 [API手册](../APIDoc/TypeScript) 

#### Matchvs 变量定义

定义两个全局唯一的Matchvs 服务变量，一个是  `MatchvsEngine` 接口请求对象变量，另一个是`MatchvsResponse` 接口回调对象。示例代码如下：

```typescript
let engine:MatchvsEngine = new MatchvsEngine();
let response:MatchvsResponse = new MatchvsResponse();
```

在egret 项目中使用示例如下：

```typescript
//这Main是Egret项目中的入口
class Main extends eui.UILayer {
    ......
    private engine:MatchvsEngine = new MatchvsEngine();
	private response:MatchvsResponse = new MatchvsResponse();
	......
}

```

> 注意：请确保两个对象是全局唯一的，您可以根据自己的喜好进行封装，使用静态变量或者单例类都可以。



#### Matchvs 初始化

获取到对象实例后，需要开发者把 `MatchvsResponse` 实例注册到 `MatchvsEngine` 用于注册、登录、加入房间等接口请求后的异步回调。调用 `init` 接口初始化SDK。

请求示例：

```typescript
engine.init(response, "Matchvs", "alpha", 201016, "appkey","gameSersion");
```

回调示例:

```typescript
response.initResponse = function(status:number){
    .......
}
```

参数说明:

| 参数   | 含义              |
| :----- | ----------------- |
| status | 200-成功 其他失败 |

在egret 项目中使用示例如下：

```typescript
class Main extends eui.UILayer {
    .....
    private runMatchvs(){
        this.response.initResponse = this.initResponse.bind(this);
        this.engine.init(this.response, "Matchvs", "alpha", 201016, "xxxxappkey", 1);
    }

	private initResponse(status:number){
        if(status === 200){
            console.log("初始化成功!");
        }
    }
}
```

> 注意：this.response.initResponse = this.initResponse; 是指定 engine.init 请求的回调函数，在调用init前需要指定一个回调函数用于处理回调结果，可以在在统一的一个地方处理你将要使用的回调函数。在示例中我们约定在调用`MatchvsEngine` 请求接口前指定回调函数。



#### 注册用户

Matchvs提供的 `userID` 被用于在各个服务中校验连接的有效性，调试前开发者需要先获取到一个合法的`userID`。调用registerUser接口获取，在registerResponse回调返回。

请求示例：

```typescript
engine.registerUser();
```

回调示例：

```typescript
response.registerUserResponse = function(userInfo:MsRegistRsp){
    ......
}
```

> **注意** : 每次调用 registerUser 接口都会生成新的 `userID` 为了节省资源消耗， `userID`和 `token` 有需要的可以缓存起来，在之后的应用启动中不必重复获取。如果你有自己的用户系统，可以将Matchvs 提供的 userID 和用户系统进行映射。可以参考 [Matchvs 第三方账号绑定](../Advanced/ThirdAccount)，让您的用户唯一对应一个userID，以节省资源。
>
> 为了资源节省，我们在registerUserResponse 回调前把userID信息缓存在本地，数据会暂存在浏览器中。所以使用同一个浏览器调用 registerUser 接口会返回相同的 userID信息。请看 [多开说明](../Advanced/MultipleIdentities) 

在egret 项目中使用示例如下：

```typescript
//这是初始化成功的回调，我们初始化成功后调用 registerUser 注册用户
private initResponse(status:number){
    if(status === 200){
        console.log("初始化成功!");
        this.response.registerUserResponse = this.registerUserResponse.bind(this);
        this.engine.registerUser();
    }
}
//注册用户回调
private registerUserResponse(userInfo:MsRegistRsp){
    if(userInfo.status === 0){
        console.log("注册成功");
    }
}
```

#### 登录Matchvs SDK 联网服务

成功获取 `userID` 后即可连接Matchvs服务。调用 login 接口登录，loginResponse 回调。

请求示例：

```typescript
engine.login(userInfo.userID, "deviceID");
```

回调示例：

```typescript
response.loginResponse = function(rsp:MsLoginRsp){
    ......
}
```

- 其中，`appKey，secret，gameID`是你在Matchvs官网创建游戏后获取的信息，可以[前往控制台](http://www.matchvs.com/manage/gameContentList)查看。appkey和secret是校验游戏合法性的关键信息，请妥善保管secret信息。  
- userID 和 token 是调用 registerUser 接口 **注册成功** 的回调信息。
- deviceID 用于检测是否存在多个设备同时登录同一个用户的情况，如果一个账号在两台设备上登录，则后登录的设备会连接失败。
- Matchvs默认将相同游戏版本的用户匹配到一起。如果开发者对游戏进行了版本升级，不希望两个版本的用户匹配到一起，此时可以在登录的时候通过`gameVersion`区分游戏版本。 

在egret 项目中使用示例如下：

```typescript
private registerUserResponse(userInfo:MsRegistRsp){
    if(userInfo.status == 0){
        console.log("注册成功");
        this.response.loginResponse = this.loginResponse.bind(this);
        this.engine.login(userInfo.userID, userInfo.token, "deviceID");
    }
}

private loginResponse(rsp:MsLoginRsp){
    if(rsp.status === 200){
        console.log("登录Matchvs联网SDK成功");
    }
}
```

#### 随机匹配

登录成功后，可以调用Matchvs加入房间接口，将若干用户匹配至一个房间开始一局游戏（如：《荒野行动》的开始匹配、《球球大作战》的开始比赛等）

Matchvs默认提供了随机加入房间的模式，调用加入房间逻辑后，Matchvs服务器会自动帮助用户寻找当前可用房间，只有在同一个房间里的用户才可以互相通信。

随机加入房间的模式下，Matchvs服务器能够快速找到合适的房间，开发者只需要自定义房间人数上限，Matchvs服务端会根据当前房间人数判断是否可继续加入。  加入房间回调有 `joinRoomResponse` 和 `joinRoomNotify` 两个，前者是**调用joinRoom者**收到是否成功加入房间回调的信息，后者是在**房间其他的玩家**收到的回调信息。

请求示例：

```typescript
engine.joinRandomRoom(3,"hello matchvs");
```

回调示例：

```typescript
this.response.joinRoomNotify = function(roomUserInfo:MsRoomUserInfo){
    ......
}

this.response.joinRoomResponse = function(status:number, roomUserInfoList: Array <MsRoomUserInfo>, roomInfo:MsRoomInfo){
    ......
}
```

在 Egret  项目中使用示例如下：

```typescript
private loginResponse(rsp:MsLoginRsp){
    if(rsp.status === 200){
        console.log("登录Matchvs联网SDK成功");
        this.response.joinRoomNotify = this.joinRoomNotify.bind(this);
        this.response.joinRoomResponse = this.joinRoomResponse.bind(this);
        this.engine.joinRandomRoom(3,"hello matchvs");
    }else{
        console.log("登录Matchvs联网失败",userInfo.status );
    }
}

private joinRoomResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo){
    if(status === 200){
        console.log("我自己进入房间成功");
    }
}

private joinRoomNotify(roomUserInfo:MsRoomUserInfo){
    console.log("有其他人进入房间");
}
```

Matchvs 提供四种加入房间的操作，他们加入房间的操作都是相互平行的，随机匹配只能和随机配的玩家一起，属性匹配只能和属性匹配的玩家一起，但是加入指定房间 与 创建房间是一起的：

- 随机匹配( joinRandRoom ): 由Matchvs 自动匹配用户。
- 属性匹配( joinRoomWithProperties ): 由开发设定属性相同的用户匹配到一起
- 加入指定房间 ( joinRoom )：加入指定房间，这个是与 createRoom配合使用，只能加入到 createRoom 创建的房间。
- 创建房间( createRoom )：开发者自己创建房间。其他玩家要加入必须使用 joinRoom 加入。

### 完整示例代码

```typescript

class Main extends eui.UILayer {

    private engine:MatchvsEngine = new MatchvsEngine();
	private response:MatchvsResponse = new MatchvsResponse();

    protected createChildren(): void {
        super.createChildren();

        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        // sky.height = stageH;
        this.runMatchvs();
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private runMatchvs(){
        this.response.initResponse = this.initResponse.bind(this);
        this.engine.init(this.response, "Matchvs", "alpha", 201479);
    }

    private initResponse(status:number){
        if(status === 200){
            console.log("初始化成功!");
            this.response.registerUserResponse = this.registerUserResponse.bind(this);
            this.engine.registerUser();
        }
    }

    private registerUserResponse(userInfo:MsRegistRsp){
        if(userInfo.status == 0){
            console.log("注册成功");
            this.response.loginResponse = this.loginResponse.bind(this);
            this.engine.login(userInfo.userID, userInfo.token, 201479, 1, "xxxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxx","v",0);
        }else{
            console.log("注册失败",userInfo.status );
        }
    }

    private loginResponse(rsp:MsLoginRsp){
        if(rsp.status == 200){
            console.log("登录Matchvs联网SDK成功");
            this.response.joinRoomNotify = this.joinRoomNotify.bind(this);
            this.response.joinRoomResponse = this.joinRoomResponse.bind(this);
            this.engine.joinRandomRoom(3,"hello matchvs");
        }
    }

    private joinRoomResponse(status:number, roomUserInfoList:Array<MsRoomUserInfo>, roomInfo:MsRoomInfo){
        if(status === 200){
            console.log("我自己进入房间成功");
        }
    }
    private joinRoomNotify(roomUserInfo:MsRoomUserInfo){
        console.log("有其他人进入房间");
    }
}
```



### 下一步

 [更多API文档](../../api/)





