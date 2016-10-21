## 一、概述

游戏如果采用 Egret Runtime 发布，需要执行以下步骤

1、通过 egret publish --runtime native 发布游戏，会生成一个 zip 包和一个资源文件夹

2、将上述文件上传到 CDN 上。

3、编写一个 Runtime 入口文件，指定游戏配置地址，并上传到后端服务器上。

4、在 Egret模拟器里测试游戏，重点测试游戏本身逻辑是否存在问题。

5、在渠道测试游戏，重点测试平台功能（如平台登录、支付）是否存在问题。

6、准备上线，并在正式上线前执行 egret publish --runtime native -compile 确保发布代码已被压缩和混淆

## 二、Runtime 入口文件编写规范


~~~
    {
        //游戏代码包路径
        "code_url":"http://your-cdn-domain/game/version_1/game_code.zip",  
        //游戏资源前缀路径
        "update_url":"http://your-cdn-domain/game/version_1/",     
        //游戏代码公钥，在默认情况下请勿填写此字段                          
        "customParams":
        {
        } 
    }
~~~
入口文件应该保存在您的游戏动态服务器上，而非 CDN 上，当游戏内容需要更新时，只需修改入口文件中的 code_url 和 update_url 字段即可

入口文件请确认是动态文件（如php等）而非静态文件，以便在产品上线后进行白名单测试

## 三、Runtime Android包测试入口

1、在 Android 测试机上安装 [Egret Runtime 测试包](http://arena.egret.com/Egret_Guidance/EgretRuntimeCheck.zip)

2、将 Runtime 入口文件的 URL 生成二维码。

3、在测试包App 中扫描二维码，即可启动游戏。

## 四、Runtime游戏规范

1、Runtime游戏的启动入口为 runtime_loader.js

2、Runtime游戏请严格按照 Egret API 调用，不要使用 window / document 等浏览器 API

3、如果需要判断 HTML5 / Runtime 区分版本，可以使用此 API

~~~
egret.MainContext.runtimeType //值为 egret.MainContext.RUNTIME_HTML5或egret.MainContext.RUNTIME_NATIVE;
~~~
## 五、渠道测试入口

目前支持QQ浏览器和猎豹浏览器

如果想在渠道中调用登录、支付等功能，需要联系 Egret 开放平台，提供Runtime入口文件，申请域名白名单才能调用

在支持的浏览器中打开

~~~
    http://runtime.egret-labs.org/nest/runtime.html?url={runtime_url}&id={egret_game_id}&orientation=portrait/landscape

    //runtime_url:Runtime入口文件URL
    //id:egret游戏id
    //orientation:横屏landscape或者竖屏portrait
~~~

点击“开始游戏”按钮

## 六、渠道白名单测试方法

用户场景：渠道上游戏已经上线，需要在先在开发者的本地测试机上进行新版本测试，同时不影响线上用户。

测试方法：Runtime在启动时，回向 Runtime 入口文件发一下请求 `http://{your-runtime-file}?egretDeviceId=abcdefg` 
其中 egretDeviceId 是一个加密后的设备id，开发者可以在Runtime入口文件中解析这个请求，根据不同的egretDeviceId 派发不同的 `code_url` 即可

## 七、Runtime 启动流程

在 Egret Runtime 的启动流程如下：

1、检测宿主App是否已经下载了Egret Runtime并且是否是最新版本，如果不是，下载 Runtime 库文件，然后进入下一步

2、下载成功后，启动 Egret Runtime，并显示一个 Runtime Loading ， 此界面为宿主 App 定制

3、向 Runtime 入口文件发送一个 HTTP 请求，得到 JSON 数据，根据 JSON 返回数据结果，下载并解压游戏代码包

4、解压完成后，关闭 Runtime Loading ，调用解压后的游戏代码主入口 runtime_loader.js

5、游戏启动

## 八、解决游戏启动瞬间黑屏问题

在 Runtime 默认的启动流程中，存在一个体验问题，即 从 Runtime Loading 关闭到游戏启动显示游戏Loading这个过程中，可能存在几秒的黑屏时间，因为此时 Loading 资源尚未加载。

为了解决此问题，开发者应该强制 Runtime Loading 在游戏代码包下载完成后不要直接关闭，而是交由开发者在游戏业务逻辑中主动控制他的关闭时机，具体做法如下。

开发者可以在 Runtime 入口文件中添加 customLoading 字段，如下

~~~
    {
        //游戏代码包路径
        "code_url":"http://your-cdn-domain/game/version_1/game_code.zip",  
        //游戏资源前缀路径
        "update_url":"http://your-cdn-domain/game/version_1/",     
        //游戏代码公钥，在默认情况下请勿填写此字段                          
        "customParams": 
        {
            //使用自定义Loading功能，在默认情况下请勿填写此字段   
            "customLoading":1
        }
    } 
~~~

Runtime 如果检测到这个字段，就不会主动在加载过程第四步关闭 Runtime Loading。然后开发者可以通过游戏的业务逻辑来控制这个 Loading 的行为，具体 API 如下：

~~~
var json = { current : 10 ,total : 10};
var jsonStr = JSON.stringify(json);
egret.ExternalInterface.call("customLoadingFlag" ,jsonStr)

~~~

当 Runtime 收到了 current 和 total 相等的消息之后，Loading就会自动关闭。
