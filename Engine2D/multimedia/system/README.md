Egret 项目可以运行在支持HTML5的桌面浏览器和各种移动浏览器中。也可以运行在 Egret Runtime 的加速和原生系统环境中。若要获得不同系统的系统信息可以通过`egret.Capabilities `类来获取。需要注意的是它的值都是静态的，我们可以获取出来但是不能更改。

通过`egret.Capabilities.isMobile`可以知道程序是否运行在移动系统中。它的值是一个静态的布尔型值，当获取到的值为`true`时表示在移动系统中。

`egret.Capabilities.language`表示运行内容的系统的语言代码。它的值是ISO 639-1中的小写双字母语言代码。可以参考[ISO 639-1](http://baike.baidu.com/link?url=me8UVbWB-oLjVT_fyxTqPwzf4cagZroNFfbiZy0Meo3VnACeZOup5vabLqoRaDwozxGm-dx600XBZRRV34pkca#2)

其中可能遇到的比价特殊是是以下几项：

* 简体中文 zh-CN
* 繁体中文 zh-TW
* 英语 en
* 日语 ja
* 韩语 ko

`egret.Capabilities`的`os`属性表示当前操作系统，具体可能值如下：

* 苹果手机操作系统 "iOS"
* 安卓手机操作系统 "Android"
* 微软手机操作系统 "Windows Phone"
* 微软桌面操作系统 "Windows PC"
* 苹果桌面操作系统 "Mac OS"
* 未知操作系统 "Unknown"

`egret.Capabilities`的`runtimeType`属性可以获取的项目运行类型。分别是`native`和`web`。
这个值跟`egret.RuntimeType.NATIVE`和`egret.RuntimeType.WEB`是对应的。

获得系统信息可以参考下面的代码：

```
/**
 * 获取系统信息类
 */
class CapabilitiesTest extends egret.Sprite {

    public constructor () {

        super();

        var capabilites:Array<egret.ITextElement> = [
            {text:"移动设备: " + egret.Capabilities.isMobile + "n",style:{size:17,"fontFamily": "楷体"}} ,
            {text:"语言代码: " + egret.Capabilities.language + "n",style:{size:17,"fontFamily": "楷体"}},
            {text:"操作系统: " + egret.Capabilities.os + "n",style:{size:17,"fontFamily": "楷体"}},
            {text:"运行类型: " + egret.Capabilities.runtimeType + "n",style:{size:17,"fontFamily": "楷体"}}
        ];

        var showCapabilities:egret.TextField = new egret.TextField();

        showCapabilities.textFlow = capabilites;

        this.addChild(showCapabilities);

    }
}
```

上面代码的完整应用可以参考示例：[获取硬件信息](http://edn.egret.com/cn/index.php/article/index/id/659)