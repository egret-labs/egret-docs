
# 用法
`egret [command]`
### 举例:
	1、运行名为【HelloWorld】的一个项目
	egret run HelloWorld
	2、编译名为【HelloWorld】的一个项目
	egret build HelloWorld

# command列表:

## create
创建新项目

### 用法:

    egret create project_name [--type core|eui]
### 参数说明:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名
| `--type` |          要创建的项目类型 core 或 eui，默认值为core


### 举例:
	1、创建名为【HelloWorld】的一个空项目
	egret create HelloWorld
	2、创建名为【HelloWorld】的一个eui项目
	egret create HelloWorld --type eui
    

## create_lib
创建新第三方库项目

### 用法:

    egret create_lib lib_name
### 参数说明:

| 关键字 | 描述
| ------------ | ------------ 
| `lib_name` |    第三方库名称，按照操作系统的命名规范命名




## create_app
从h5游戏生成app

### 用法:

    egret create_app app_name -f h5_game_path -t template_path

### 参数说明:

| 关键字 | 描述
| ------------ | ------------ 
| `app_name` |    移动应用项目名称，按照操作系统的命名规范命名
| `-f` |          app项目所对应h5项目的路径
| `-t` |          对应 Native Support 路径

    如果是在项目文件夹下编译，就不要加项目名称
    注意：路径最好加引号，防止路径中有空格报错

## build
构建指定项目

### 用法:

    egret build [project_name] [-e] [--target wxgame|bricks|ios|android]
### 参数说明:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名
| `-e` |              编译指定项目的同时编译引擎目录
| `--target` |       编译的目标版本，可选参数有 `wxgame`：微信小游戏；`bricks`：玩一玩；`android`：安卓项目；`iOS`：iOS项目

	如果是在项目文件夹下执行命令，可以不加项目名称


### 举例:

    1、编译【HelloWorld】
    egret build HelloWorld
    2、编译【HelloWorld】的同时编译引擎
    egret build HelloWorld -e
    3、编译【HelloWorld】的同时编译微信小游戏项目
    egret build HelloWorld --target wxgame

## publish
发布项目

### 用法:

    egret publish [project_name] [--version [version]] [--target wxgame|bricks|ios|android]
### 参数说明:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名
| `--version` |       设置发布之后的版本号，可以不设置
| `--target` |       编译的目标版本，可选参数有 `wxgame`：微信小游戏；`bricks`：玩一玩；`android`：安卓项目；`iOS`：iOS项目

    如果是在项目文件夹下执行命令，可以不加项目名称

### 举例:

    发布【HelloWorld】到微信小游戏
    egret publish HelloWorld --version 0.03 --target wxgame

## run
启动本地服务器,并在默认浏览器中运行指定项目

### 用法:

    egret run [project_name] [--port 3000] 
### 参数说明:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名
| `--port` |          指定端口号


    如果是在项目文件夹下执行命令，可以不加项目名称

### 举例:

    在指定端口下运行【HelloWorld】项目
    egret startserver HelloWorld --port 3002

## clean
重置项目中的引擎代码

### 用法:

    egret clean [project_name]
### 参数说明:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名

    如果是在项目文件夹下执行命令，可以不加项目名称

## upgrade
升级项目代码

### Egret Launcher v1.0 之后的 upgrade

#### 用法:

    egret upgrade [project_name] --egretversion [target version]
#### 参数说明:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名
| `target version` |    要切换的目标版本号

    如果是在项目文件夹下执行命令，可以不加项目名称

#### 举例:

    升级当前目录下项目到 5.1.0
    egret upgrade --egretversion 5.1.0

### Egret Launcher v1.0之前的 upgrade

#### 用法:

    egret upgrade [project_name]
#### 参数说明:

| 关键字 | 描述
| ------------ | ------------ 
| `project_name` |    项目名称，按照操作系统的命名规范命名

    如果是在项目文件夹下执行命令，可以不加项目名称

#### 举例:

    升级【HelloWorld】项目
    egret upgrade HelloWorld

### 关于 Egret Launcher v1.0 中项目降版本的说明

    1. 修改项目根目录下的配置文件 'egretProperties.json' 中的 'egret_version' 字段下的版本号
    2. 执行 egret clean 后项目降到目标版本

## make
修改引擎源码后，编译引擎源码。如果没有特殊需求，不建议普通用户使用

### 用法:
    egret make



## info
获得Egret信息，如当前Egret版本，以及安装路径

### 用法:

    egret info

## help
了解各个 command 的细节

### 用法
    egret help [command]
