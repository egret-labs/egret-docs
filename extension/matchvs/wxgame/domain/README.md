微信小游戏如果没有配置可信域名列表，需要**开启调试模式**才可以访问非微信第三方服务器.，否则会造成登录 Matchvs 失败。 

请根据微信[小游戏域名配置文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)进行配置.
> 服务器域名请在 `小程序后台-设置-开发设置-服务器域名 `中进行配置，配置时需要注意：
>
> 1. 域名只支持 https (request、uploadFile、downloadFile) 和 wss (connectSocket) 协议；  
> 2. 域名不能使用 IP 地址或 localhost；
> 3. 域名必须经过 ICP 备案；
> 4. 出于安全考虑，api.weixin.qq.com 不能被配置为服务器域名，相关API也不能在小程序内调用。 开发者应将 appsecret 保存到后台服务器中，通过服务器使用 appsecret 获取 accesstoken，并调用相关 API。
> 5. 对于每个接口，分别可以配置最多 20 个域名  

## request 合法域名:

https://sdk.matchvs.com

https://vsopen.matchvs.com

https://alphavsopen.matchvs.com



## socket 合法域名:
wss://gateway.matchvs.com  

wss://alphagateway.matchvs.com  

wss://cn1.gateway.matchvs.com    

wss://cn2.gateway.matchvs.com     

wss://cn3.gateway.matchvs.com    

wss://cn4.gateway.matchvs.com   

wss://cn5.gateway.matchvs.com     

wss://cn6.gateway.matchvs.com     

wss://cn7.gateway.matchvs.com    

wss://cn8.gateway.matchvs.com   






## 说明
`alpha`开头的域名是开发调试用的服务器的域名；

非 alpha 是线上服务器的域名。

以下旧的域名还在维护中，建议在配置里添加新域名，删除旧域名：  

https://alphavsuser.matchvs.com  

https://vsuser.matchvs.com  

wss://hotel.matchvs.com

wss://alphahotel.matchvs.com
