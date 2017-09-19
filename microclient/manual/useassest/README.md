## 使用本地资源的方法

使用本地资源需要将相应的资源添加在assets目录下，然后在微端管理后台将游戏地址改为`local`

assets目录的结构如下：

	+assets
		+game
			-index.html
			......
		+libs
			+armeabi
				-libegret.so.zip
			+armeabi-v7a
				-libegret.so.zip
			+x86
				-libegret.so.zip
			-egret-dex.jar
		+startup
			-index.html
			......
		
游戏放在“game”文件夹下，index.html需要在“game”的下一级。

runtime放在“libs”下，目录结构如上所示。

启动页放在“startup”下，index.html需要在“startup”的下一级。


注意：在后台修改游戏地址、runtime版本或者启动页地址会覆盖本地的版本。
