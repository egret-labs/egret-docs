egret-docs
==========

egret-docs是Egret官方网站中文档中心的源码。该文档中心域名为[http://docs.egret-labs.org/home.html](http://docs.egret-labs.org/home.html)

---

##工具版本

Egret文档中心使用[Jekyll](http://jekyllrb.com/)制作。

在编写修正文档内容之前，请前确保本地Jekyll与原有项目使用的版本一致。在未验证版本兼容性之前，请不要提交新的修改。

文档页面模板使用了bootstrap制作。

---

####Jekyll版本

**jekyll 2.1.0**


####bootstrap版本

**bootstrap 2.3.1**

---

##关于项目目录

在当前项目中存在两个目录：

1.**docsrc:**该目录为网站的源文件目录，所有文章，模板，配置文件都存在在这个目录当中。

2.**demosrc:**该目录中存在了一个egret项目，该项目用于文档中的“实例”内容。

3.***apidoc:**该目录中存放着Egret-core生成的API文档。

##文档内容的规则

1._config.yml配置文件中已经配置了文档的代码高亮，文档目录等功能。如无特殊修改，请不要修改该文件。

2.所有文档教程文章全部放入 “post/分类/” 目录中。分类名称根据二级目录分了决定。

3.实例分类所有文档（实例代码）放入 “demo/” 目录中。

4.API文档页面统一放入 “/api/api.html” 页面中。

5.AS3 TS 代码对比放入 “as2ts/代码类别/” 目录中。

6.配置文件中，一级目录选项包含text（名称）和type（类型），type选项用于识别文章的分类。

7.配置文件中，二级目录选项包含text（名称）、enter（是否启用分割div，与模板有关）、fenter（是否启用分割div，与模板有关）、element（当前二级分类的标签）、url（二级分类首页的地址）和des（该二级分类的描述文字）。其中element用于识别文章的分类。

8.AS3 TS代码对比参考目录及参数配置中，codeType为一级分类，二级分类由文档遍历生成。

9.***所有文章配图均存放在assets/img中***

##文档撰写要求

1.文字准确详实，不得出现错别字，歧义词。

2.文章中出现的代码要经过实际验证，代码不得出现bug或无法编译。

3.文章中如出现未解释过的专业词语，需要给出对应的wiki百科链接，或单起一篇文章讲解。

4.语言简明扼要，对于关键操作需要配图。

5.文章要制定对应使用的引擎版本，如在大版本号无变化的情况下，可写类似`1.x`此类版本信息。

6.***每篇文章都需要填写完整的头信息。***

##文章头信息

实例 文档头信息

	---
	layout: demopost
	title:  Display类
	permalink: demo/display.html
	type: demo
	element: demodisplay
	version: Egret引擎 v1.x
	codedes: Display创建以及绘图方法的使用
	documentclass: Game
	---
	
AS3 TS代码对比文章头信息

	---
	layout: codeonline
	title:  "Event相关代码对比"
	permalink: as2ts/eventcode/event.html
	type: eventcode
	version: Egret引擎 v1.x
	---
	
普通文章头信息

	---
	layout: post
	title:  "开源的Egret"
	permalink: post/quitestart/about/opensourceegret.html
	type: quitestart
	element: quitestartabout
	version: Egret引擎 v1.x
	---

##Demo项目运行方法

1.编写对应的Demo范例，每个范例为一个class文件，要求只体现一个类的使用方法。

2.将游戏项目在本地运行并使用publish功能发布relesse版本。

3.将发布后的game-min.js和egret_loader.js拷贝到docsrc目录中的demo文件夹中。

4.将egret_loader.js文件中的80行`var document_class = "Game";`修改为`ar document_class = window.this_document_class;`

5.将游戏中的资源文件拷贝到docsrc目录中resources文件夹中。

6、编写好文章后，发布本地网页并测试。

##API目录制作

使用最新的Egret-Core源代码配合Tsdoc工具生成API文档文件。

**需要注意的问题：**

1.生成代码API文档前，请先填写对应的API文档readme文件。

2.文档生成后，请将API文档中的index.html页面的`<footer>`标签删除。

3.将新的API文档文件拷贝到docsrc目录中的api文件夹下。

##注意事项

1.请不要讲jekyll项目的临时网页目录文件夹***_site***同步到github中！
