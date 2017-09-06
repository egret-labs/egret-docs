## 库项目

除了游戏项目之外，白鹭引擎也支持库项目的构建，开发者可以把可复用的逻辑打包为一个库，以便在不同项目之间进行复用。

以下文档使用白鹭引擎 4.1 版本

## 背景



在白鹭引擎 4.1 中，我们重新梳理了第三方库的项目结构，核心目的在于解决以下问题：

* 降低第三方库的复杂度，使其整体结构变得更为简洁易懂
* 拥抱 es2015 / npm / tsconfig.json 等国际标准或事实标准。使白鹭引擎可以更简单的去加载任意 JavaScript 模块，而非针对白鹭引擎进行定制

## 如何使用第三方库

白鹭引擎本次第三方库调整是为了更改第三方库的构建方式，而非使用方式。如果开发者仅仅是使用第三方库而非自行构建，不会收到任何影响

[具体使用方法](http://developer.egret.com/cn/github/egret-docs/extension/threes/instructions/index.html)

## 如何用新的方式构建第三方库

* 打开一个第三方库文件夹
* 删除 ```package.json```中的 modoules 字段
* 在项目中与 ```package.json```同级创建一个 ```tsconfig.json``` 文件
* 修改 ```tsconfig.json```文件，根据 TypeScript / JavaScript 不同类型的类库，进行不同的项目配置：

```
// JavaScript 类库
{
    "compilerOptions": {
        "target": "es5",
        "outFile": "bin/libtest1/libtest.js",
        "allowJs": true
    },
    "files": [
        "src/a.js",
        "src/b.js"
    ]
}
```

```
// TypeScript 类库
{
    "compilerOptions": {
        "target": "es5",
        "outFile": "bin/libtest1/libtest.js",
        "declaration": true
    },
    "files": [
        "src/a.ts",
        "src/b.ts"
    ]
}
```

* 如果项目是 JavaScript 类库，还需要在 ```package.json```中配置一个 ```typings```字段，并设置为一个自定义的 .d.ts 文件，如下所示


```
/** 项目结构
libtest
    |-- src
    |-- bin
    |-- typings
            |-- libtest.d.ts
    |-- tsconfig.json
    |-- package.json 
*/

// package.json
{
    "name": "libtest",
    "typings": "typings/libtest.d.ts"
}
```

* 完成上述操作后，执行 egret build，就会根据 ```tsconfig.json```中的 ```outFile```字段生成库文件，压缩文件以及 .d.ts 文件