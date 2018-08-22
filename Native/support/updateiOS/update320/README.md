## 更新内容

* [注意] 此版本添加了对渲染效率的优化，如果渲染时出现了异常请在引擎中关闭优化；
* [新特性] 支持渲染滤镜；
* [新特性] 支持渲染Mesh；
* [改进] 提高渲染效率；
* [改进] 提高稳定性。

	关闭优化方法：
	
	~~~
/* egret.native.js */
// native.$supportCmdBatch = egret_native.sendToC ? true : false;
native.$supportCmdBatch = false;
~~~

### 下载地址

[http://tool.egret-labs.org/ios-support/egret-ios-support-3.2.0.zip](http://tool.egret-labs.org/ios-support/egret-ios-support-3.2.0.zip)