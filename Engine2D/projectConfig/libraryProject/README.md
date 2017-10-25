白鹭引擎支持库项目的构建，开发者可以把可复用的逻辑打包为一个库，以便在不同项目之间进行复用。

本文档针对白鹭引擎 4.1+ 版本

### 构建第三方库方法

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

* 如果项目是 JavaScript 类库，需要在 ```package.json```中配置一个 ```typings```字段，并设置为一个自定义的 .d.ts 文件，如下所示


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

* 完成上述操作后，执行 egret build，会根据 ```tsconfig.json```中的 ```outFile```字段生成库文件，压缩文件以及 .d.ts 文件