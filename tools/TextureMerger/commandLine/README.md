
###  打包命令
* 命令格式：-p [目录] [...] -o [json输出路径] -e [文件筛选正则表达式]

* 命令示例：-p d:/Y1 d:/Y2 -o d:/yyy.json -e /.*\.(jpg|png)，将D盘下Y1、Y2两个目录下所有png，jpg文件打包并输出到d盘的yyy.json。

	-e 为可选命令 不写则默认打包textureMerger支持的所有图片

### 修改json命令
* 命令格式：-rp [json路径] -d [纹理key] [...] -a [文件路径] [...]

* 命令示例：-rp d:/user/aaa.json -d head leg -a d:/user/1.png  d:/user/2.png 修改D盘user目录下的aaa.json 文件，删除key为head、leg的纹理 并添加 1.png 、2.png。此命令覆盖原始文件。-d 与-a 为可选命令

### 转换动画命令
* 命令格式：-mc [目录][...] -o [输出路径] -e [文件筛选正则表达式]

* 命令示例：-mc d:/Y1 d:/Y2 -o d:/outpath -e /.*\.(swf|gif)。将D盘下Y1、Y2两个目录下的所有swf、gif文件进行转换并输出到D盘outpath目录中。

	-e为可选命令 不写默认转换目录下所有被TextureMerger支持的动画文件