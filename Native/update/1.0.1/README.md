
- **[优化]** 提升了index.html的加载速度，缩短了native的启动到开始渲染的时间。
- **[修正]** 修正了某些特殊情况下，url相对路径会被用于服务器请求
- **[修正]** Android: 当使用ipv6地址连接websockets服务器时会失败。
- **[修正]** Android: 在多次使用相同字体的不同属性时导致字体多次加载。
- **[修正]** `<script>`标签中src属性加载失败后runtime停止且没有提示。
- **[优化]** 对runtime消息提示删除了start类型，对load类错误提示增加url、code等内容。
- **[修正]** 点击RenderTexture（设置了pixelHitTest）会出现崩溃。
- **[修正]** nativeRender: customFilter 修改 uniform 时没有生效。
- **[修正]** 当加载的JS脚本包含错误时，错误位置没有显示。
- **[修正]** 兼容 WXCloudApi.js
- **[修正]** WX: 内置按钮文字可能显示不全。
- **[修正]** iOS: 修正 iOS13.4 之后无法正确显示的问题

**【发布日期】：2020-3-2**
