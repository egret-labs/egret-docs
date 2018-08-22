## 更新内容

* [注意] 此版本添加了对渲染效率的优化，如果渲染时出现了异常请在引擎中关闭优化；
* [修复] 修复部分情况下渲染出错的问题；
* [修复] 修复从后台恢复时背景音乐没有继续播放的问题；
* [修复] 修复设置音频播放起始时间有延迟的问题；
* [改进] 提高稳定性。


	关闭优化方法：
	
	~~~
/* native_require.js */
egret_native.egretInit = function () {
    egret_native.sendToC = null; // 添加这句话
~~~

### 下载地址

[http://tool.egret-labs.org/ios-support/egret-ios-support-3.2.1.zip](http://tool.egret-labs.org/ios-support/egret-ios-support-3.2.1.zip)