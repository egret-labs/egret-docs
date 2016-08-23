Egret Engine 2.5.2 主要解决了一些问题。

* 解决 Native localStorage 保存失败问题
* 解决 RenderTexture 绘制错误问题
* Native 支持加载二进制文件
* 解决绘制图片有偏移量导致绘制错误问题
* 解决 exml 编译异常问题
* 解决 Bitmap 设置九宫之后可能绘制异常问题

其中 ByteArray 增加 writeUnsignedShort 方法，用于写入无符号16位整数。

>查阅 Egret 2.5.0 更新详解： [Egret 2.5 更新详解](http://edn.egret.com/cn/index.php/article/index/id/628)

>EgretEngine2.5升级相关问题请到论坛交流：[EgretEngine2.5升级相关问题](http://bbs.egret.com/forum.php?mod=viewthread&tid=11702&extra=&page=1)