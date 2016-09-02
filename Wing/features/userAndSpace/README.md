
EgretWing提供了包括 **编辑器设置，文件设置，窗口设置** 等近200个设置项来满足各种用户习惯。常用的设置如：

    // 字体.
    "editor.fontFamily": "",
    // 字体大小.
    "editor.fontSize": 0,
    // 显示行号
    "editor.lineNumbers": true,
    // 一个制表符等于的空格数
    "editor.tabSize": 4,
    // 按 "Tab" 时插入空格
    "editor.insertSpaces": true,
    
    // 读取或写入文件的默认编码格式.
    "files.encoding": "utf8",
    // 默认换行符
    "files.eol": "\r\n"

可以通过菜单栏，**文件---首选项**菜单打开**用户设置**或者**工作空间设置**

![](4.png)

设置分为**用户设置**和**工作空间设置**。用户设置是全局的，在任何地方都可以生效，用户设置会覆盖默认设置。用户设置保存在用户缓存目录的 settings.json 中。
工作空间设置是针对某个文件夹的，只对当前工作空间有效，工作空间设置会覆盖用户设置。工作空间设置保存在当前工作空间下的 .wing/settings.json 中。
所以最终的优先级是 **工作空间设置  > 用户设置 > 默认设置**。

通过修改 `settings.json` 文件改变当前的设置。例如我习惯的用户配置就是这样写的


	{
		"editor.insertSpaces": false,
		"files.eol": "\n",
		"window.openFilesInNewWindow": false,
		"tslint.enable": false
	}

每个字段表示的功能可以通过默认配置中的字段说明找到具体的含义。