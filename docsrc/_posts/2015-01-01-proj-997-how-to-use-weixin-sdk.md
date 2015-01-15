---
layout: subjs-template
title:  "将Egret游戏接入2015年微信官方SDK"
permalink: jksubj/how-to-use-weixin-sdk.html
type: proj-normal
version: Egret引擎 v1.5.1
---
       
          
        
      
##将Egret游戏接入2015年微信官方SDK
     
      
    
------
文档有效性：注意本文档正在撰写阶段，内容完整性无法保证，如遇问题请等待文档完成或底部跟帖。           
前提知识：有基本的Egret项目开发经验         
额外条件：有web可以访问的PHP服务器     
技术等级：中级             
必需产品：Egret Engine 1.5.1(<a href="http://www.egret-labs.org/egretengine" target="_blank">下载地址</a>，如当前版本小于1.5.1，请安装后打开检查社区体验版更新开关，再进行更新)       
开发工具：WebStorm或Visual Studio + EgretVS (<a href="http://www.egret-labs.org/egretvs" target="_blank">下载地址</a>)        
          
      
    
------


###概述

2015年1月，微信放出[JS SDK](http://mp.weixin.qq.com/wiki/)后，提供了空前丰富的功能调用接口。

代价却是调用方法比以前使用第三方库要复杂多了，首先必须在官方有公众号，并且成为开发者，才能正常使用分享等各种功能。
     
但是官方文档看似齐全，却是各种没有条理。不仔细翻来覆去看几遍，那真是看那哪儿都是一头雾水！
    
所以Egret官方为了考虑广大Egret开发者快速上手，从有效实用的角度出发，推出本篇教程。
   
服务器端语言，本文服务器端均以官方所推荐的PHP为准，使用其他服务器端开发语言请参考PHP的方式。 
   
另外，考虑到大部分开发者可能没有现成可用的已经由微信官方认证的公众号，本文的介绍主要以测试号为准。已认证公众号的对应接入会在每步骤最后做简要说明。
    
------
###A. 先搞清楚我们接入微信首先需要什么   
   
在一切开始之前，我们先要了解微信官方制定的规则：   
[步骤三：通过config接口注入权限验证配置](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E6.AD.A5.E9.AA.A4.E4.B8.89.EF.BC.9A.E9.80.9A.E8.BF.87config.E6.8E.A5.E5.8F.A3.E6.B3.A8.E5.85.A5.E6.9D.83.E9.99.90.E9.AA.8C.E8.AF.81.E9.85.8D.E7.BD.AE)

需要提供权限验证配置信息，由于这部分内容是非常重要的。我们截图如下：         
          
![]({{site.baseurl}}/assets/img-subj/how-to-use-weixin-sdk/02-official-config-comments.jpg)

记录必须提供的跟公众号相关的参数，或称为官方规则参数： `appId`|`timestamp`|`nonceStr`|`signature` 。接下来，如官方规则所述，为了正常使用微信SDK，我们首先着手凑齐这些参数。
       
      
------
###B. 公众号基本信息
显然申请公众号这步不能省，步骤A所述的appId参数是公众号才具有的，因此微信SDK的使用要求必须具有公众号。   
   
然而真正注册可正常运营的公众号可能需要有公司资质，并且审核、支付服务费等繁杂手续。  
   
不过买东西也得首先知道好用不好用。微信官方在推出SDK时，也考虑了试用功能。那么我们首先用测试号进行功能测试，需要正式运营再走正式注册流程不迟。  
   
在微信公众平台[开发者首页](http://mp.weixin.qq.com/wiki/home/)申请测试账号：      
        
![申请测试账号]({{site.baseurl}}/assets/img-subj/how-to-use-weixin-sdk/01-application-test-account.jpg)  
    
申请测试号过程很简单，只要有微信就可以。申请成功即进入```管理测试号```页面，在该页面有显示测试号信息：`appID`|`appsecret` 。        
    
          
注意：该步骤如使用正式公众号，在开发者中心可查到`appID`|`appsecret`。
    

------
###C. 验证服务器地址的有效性
在一切开始之前，微信还需要验证你声称的Web服务器确实是你的。
   
在[第二步：验证服务器地址的有效性](http://mp.weixin.qq.com/wiki/17/2d4265491f12608cd170a95559800f2d.html#.E7.AC.AC.E4.BA.8C.E6.AD.A5.EF.BC.9A.E9.AA.8C.E8.AF.81.E6.9C.8D.E5.8A.A1.E5.99.A8.E5.9C.B0.E5.9D.80.E7.9A.84.E6.9C.89.E6.95.88.E6.80.A7)部分有详细的说明。  
    
该部分需要服务器进行验证，官方已经提供php代码下载，直接拿来用即可！    
下载该步骤最下方的```PHP示例代码下载```，解压出 `wx_sample.php`。   
     
为你的服务器验证定义一个字符串，内容随意，作为所需要的token值。   
修改 `wx_sample.php` 中的```define("TOKEN", "weixin");```，将第二个参数值改为你定义的token值。   
将 `wx_sample.php` 部署到你自己的Web服务器上，记录其url。   
    
在[```管理测试号```](http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)界面的```接口配置信息```部分填入url和token值：      
        
![填写接口配置信息]({{site.baseurl}}/assets/img-subj/how-to-use-weixin-sdk/03-validate-server.jpg)
          
注意：保证Token值在接口配置信息UI和wx_sample.php中的token值完全一样！否则不会成功配置！
      
确认好后点提交按钮，前边步骤没有错误的话，应该验证成功了：       
       
![成功提交]({{site.baseurl}}/assets/img-subj/how-to-use-weixin-sdk/04-validate-server-success.jpg)     
       
验证成功时，页面顶部将会有```配置成功```提示，并且```URL```和```Token```字段都变为不可编辑。
这就意味着，该服务器已经被验证成功。可以进行后续的SDK开发和功能调用了。     
       
       
注意：该步骤如使用正式公众号，在开发者中心可查到`appID`|`appsecret`。       
      

>
>
>
>
>
>
>
>
