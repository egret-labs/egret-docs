EgretWing插件项目基于`NodeJS`，可以使用 `TypeScript` 语言编写。EgretWing提供一套 API 接口，允许开发者自定义部分EgretWing的功能。

## 必要开发环境

- [下载最新 Wing](http://www.egret.com/products/wing.html) 。
- NPM 命令行工具， NodeJS的安装包中，带有 `npm` 命令行工具。


## 新建插件项目

打开菜单，选择 `文件--新建项目--基本Plugin项目`， 创建一个插件项目。
新建项目也提供了几个示例项目展示一些基本API的用法。
- WebView 创建带有自定义UI插件。当需要大量用户交互的场景时，可以使用WebView创建灵活的交互界面。
- TextTools 获取文本编辑器相关信息，操作文本编辑器内容。
- OneDarkTheme 创建一个主题项目，自定义代码着色。


## 使用 EgretWing 开发插件项目


### 安装依赖包

如果插件项目需要依赖其他的 `nodejs` 模块，需要在项目的根目录下，执行

	npm install

安装依赖模块。


### 编译项目

使用默认快捷键 `Ctrl/Cmd + Shift + B` 可以编译项目。


## 插件目录结构说明

以上操作全部完成后，可以看到下面的目录结构。

```
.
├── .gitignore
├── .wingignore                 // 插件发布时要排除的文件列表
├── .wing
│   ├── launch.json             // Debug启动配置文件
│   ├── settings.json           // 项目设置文件
│   └── tasks.json              // 任务配置文件
├── images
│   └── icon.png	            // 插件图标
├── node_modules                // 依赖模块
│   ├── egretwing               // 包含插件api，以及安装编译等脚本的模块
│   ├── typescript
│   ├── figlet
│   └── underscore.string
├── out                         // js输出目录
│   ├── extension.js 					
│   └── extension.js.map
├── typings                     // .d.ts目录
│   └── index.d.ts              // 引用的插件api
├── extension.ts                // ts源代码
├── package.json                // 插件描述文件
├── README.md
├── tsconfig.json               // ts编译配置
```

- `egretwing` 模块是开发时需要的模块，其中定义了包括插件api的`.d.ts`文件。在`typings`目录下可以引用需要的`.d.ts`

- `package.json` 是插件的描述文件， 详情参考： [描述文件](../../../Wing/plugin/configDes/README.md)

- `tsconfig.json` 是 `typescript` 的编译配置文件， 详情参考： [tsconfig.json](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json "tsconfig.json")

## 更多示例

我们在GitHub上发布了一些常用插件和示例可以作为参考。项目地址：

https://github.com/egret-labs/wing-extensions

## 更多文档

感谢开发者 夏树 写的详细教程

http://edn.egret.com/cn/book/ls/tid/58