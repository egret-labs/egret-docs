用法:egret `command` [-v]

command列表:

## create
创建新项目

**用法**:

    egret create project_name [--type empty|game|gui|eui]
**描述**:

    创建新项目
**参数说明**:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名
| `--type` |          要创建的项目类型 empty、game、gui、eui，默认值为game


**举例**:

    1、创建名为【HelloWorld】的一个eui项目
    egret create HelloWorld --type eui
    2、创建名为【HelloWorld】的一个空项目
    egret create HelloWorld



## create_lib
创建新第三方库项目

**用法**:

    egret create_lib lib_name
**描述**:

    创建第三方库
**参数说明**:

| 关键字 | 描述
| ------------ | ------------ 
| `lib_name` |    第三方库名称，按照操作系统的命名规范命名




## create_app
从h5游戏生成app

**用法**:

    egret create_app app_name -f h5_game_path -t template_path
**描述**:

    构建指定项目,如果是在项目文件夹下编译，就不要加项目名称
**参数说明**:

| 关键字 | 描述
| ------------ | ------------ 
| `app_name` |    移动应用项目名称，按照操作系统的命名规范命名
| `-f` |          app项目所对应h5项目的路径
| `-t` |          对应 Native Support 路径




## build
构建指定项目

**用法**:

    egret build [project_name] [-e] [--runtime native]
**描述**:

    构建指定项目,如果是在项目文件夹下编译，就不要加项目名称
**参数说明**:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名
| `-e` |              编译指定项目的同时编译引擎目录
| `--runtime` |       如果有native工程，则会将文件拷贝到工程里


**举例**:

    1、编译【HelloWorld】
    egret build HelloWorld
    2、编译【HelloWorld】的同时编译引擎
    egret build HelloWorld -e
    3、编译【HelloWorld】的同时编译native项目
    egret build HelloWorld --runtime native



## publish
发布项目

**用法**:

    egret publish [project_name] [--version [version]] [--runtime html5|native] [--passWorld]
**描述**:

    发布项目,如果是在项目文件夹下编译，就不要加项目名称
**参数说明**:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名
| `--version` |       设置发布之后的版本号，可以不设置
| `--runtime` |       设置发布方式为 html5 或者是 native方式，默认值为html5
| `--password` |     设置发布zip文件的解压密码


**举例**:

    发布【HelloWorld】
    egret publish HelloWorld --version 0.03 --passWorld 88888888



## startserver
启动HttpServer,并在默认浏览器中打开指定项目

**用法**:

    egret startserver [project_name] [--port 3000] [-ip] [-serveronly]
**描述**:

    启动Egret内置的服务器，并可立即在浏览器中运行项目,如果是在项目文件夹下编译，就不要加项目名称
**参数说明**:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名
| `--port` |          指定端口号
| `-ip` |             是否使用本机IP
| `-serveronly` |     是否只运行服务器


**举例**:

    运行【HelloWorld】项目
    egret startserver HelloWorld --port 3000



## clean
重置项目中的引擎代码

**用法**:

    egret clean [project_name]
**描述**:

    重置项目中的引擎代码,如果是在项目文件夹下编译，就不要加项目名称
**参数说明**:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名




## upgrade
升级项目代码

**用法**:

    egret upgrade [project_name]
**描述**:

    跟随Egret引擎的升级，对项目进行升级,如果是在项目文件夹下编译，就不要加项目名称
**参数说明**:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名


**举例**:

    升级【HelloWorld】项目
    egret upgrade HelloWorld



## make
编译引擎源码

**用法**:

    egret make
**描述**:

    修改引擎源码后，编译引擎源码



## apitest
 版本升级后检测api是否已经替换完成。限于2.4之前版本升级到2.5（及以上）版本的检测，需要在2.5（及以上）版本项目中输入

**用法**:

    egret apitest [project_name]
**描述**:

    检测项目中的api是否存在冲突
**参数说明**:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名


**举例**:

    检测【HelloWorld】项目api是否存在冲突
    egret apitest HelloWorld



## info
获得Egret信息

**用法**:

    egret info
**描述**:

    当前Egret版本，以及安装路径



使用 egret help  `command` 了解各个 command 的细节

