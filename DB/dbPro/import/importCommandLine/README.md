DragonBones pro 从 4.3 开始支持命令行导入，实现批处理
`Import ( dbdata=""，texturefolder=""， textureatlas="xxx.png"， texturedata=""， dbdatapack=""， plugin="auto"， projectname=""， projectpath="" )`

命令名：import
参数列表：

|参数|说明|
| ------------ | ------------ |
|dbdata|散图或纹理集项目中，导入项目的数据问题路径。|
|texturefolder|散图项目中，图片资源路径。|
|textureatlas|纹理集项目中，纹理集图片资源路径。|
|texturedata|纹理集项目中，纹理集数据文件资源路径。|
|dbdatapack|zip项目中，zip文件的资源路径。|
|plugin|【可选参数】仅当导入的项目是散图项目或纹理集项目时可用，用于指定导入所使用的插件名称。默认是auto，即会根据实际数据自动选择插件解析，如为任意不存在插件名称，会使用DragonBonesPro自带引擎解析。|
|projectname|【可选参数】导入后新项目的名称，默认为原数据的名称。|
|projectpath|【可选参数】导入后新项目的地址，默认为用户文档目录下DBProjects文件夹下。|

上表所示参数中，根据不同的导入类型，需要填写的必选参数是不同的
- 导入散图项目：dbdata, texturefolder 是必选参数
示例： `DragonBonesPro import dbdata="C:\Demon.ExportJson" texturefolder="C:\texture" plugin="auto" projectname="new" projectpath="C:\ceshi"`

- 导入纹理集项目：dbdata，textureatlas，texturedata 是必选参数
示例： `DragonBonesPro import dbdata="C:\Demon.ExportJson" textureatlas="C:\Demon0.png" texturedata="C:\Demon0.plist" plugin="auto" projectname="new" projectpath="C:\ceshi"`

- 导入数据包项目：dbdatapack是必选参数
示例： `DragonBonesPro import dbdatapack="C:\DragonOpening.zip" projectname="new" projectpath="C:\ceshi"`
 
注意：以上三种导入类型是互斥的，导入时只可根据一种导入类型填写参数。