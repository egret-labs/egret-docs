在 Egret 2.5.1 中，修复了 2.5.0 升级后的一些问题。新增了GUI的主题解析器的功能。

查阅 Egret 2.5.0 更新详解： [Egret 2.5 更新详解](http://edn.egret.com/cn/index.php/article/index/id/628)

EgretEngine2.5升级相关问题请到论坛交流：[EgretEngine2.5升级相关问题](http://bbs.egret.com/forum.php?mod=viewthread&tid=11702&extra=&page=1)

### GUI主题解析器

在新版（2.5.1）中，增加了主题解析器。和素材解析器类似，需要一个主题 Adapter，用来修改加载主题文件的方式。
~~~
egret.gui.mapClass("egret.gui.IThemeAdapter", ThemeAdapter);
~~~

GUI相关教程：[主题和皮肤适配](http://edn.egret.com/cn20/index.php/article/index/id/561)

### 2.5发布不能运行的bug修复

在2.5.0中，你可能会发现在使用了gui库后发布的native版本，在运行android工程不能运行成功，下面给出解决方案。

#### 修改方式

###### 方法1：

* 升级项目到2.5.1。

* 重新创建一个新的 ```gui``` 项目，用新创建的 ```Main.ts``` 文件里的 ```onAddToStage``` 和 ```onConfigComplete``` 分别替换掉原来的。

* 重新编译项目即可。


###### 方法2：

* 升级项目到2.5.1。

* 在文档类里，在注入自定义的素材解析器处，增加一行语句

~~~
 	egret.gui.mapClass("egret.gui.IThemeAdapter", ThemeAdapter); 
~~~

* 将原来加载主题的代码放到加载完RES配置文件代码之后。

![image](5618c5a50aba0.png)

* 重新编译项目即可。
