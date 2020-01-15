
`tsconfig.json` 是 Typescript 项目的配置文件，TypeScript 编译器编译代码之前，会首先读取这个配置文件，并根据其中的属性来设置 TypeScript 项目的编译参数。



### 使用方式

1 ) 在创建 egret 项目时，会自动在项目根目录下生成名为 "tsconfig.json" 的文本文件。

2 ) 下面为引擎默认的参数，可以根据您项目的需求，自己修改。：

``` json
{
    "compilerOptions": {
        "target": "es5",
        "outDir": "bin-debug",
        "experimentalDecorators": true,
        "lib": [
            "es5",
            "dom",
            "es2015.promise"
        ],
        "types": []
    },
    "include": [
        "src",
        "libs"
    ]
}
```

下面我们详细说明一下 `compilerOptions` 里的字段。

* `target`:编译之后生成的JavaScript文件需要遵循的标准，默认为 `es5`，兼容性比较好，不建议修改
* `outDir`:编译出来的js文件，放到哪个目录下，默认编译到 `bin-debug` 里，目前暂不支持修改
* `experimentalDecorators`:启用实验性质的语法装饰器，引擎里的部分库使用了最新的语法，需要开启这个配置
* `lib`: 编译需要的库文件，默认有3个，你可以根据需求自行添加
* 其他常用参数
	* `"sourceMap": true`:把`.ts` 文件编译成`.js` 文件时，生成对应的 `.js.map` 文件，该文件可以让用户直接在浏览器里调试 ts 文件
	* `"removeComments": true`:  编译 `.js` 时删除原本 `.ts` 文件中的注释。
	


3 ) 设置其他字段，比如与 `compilerOptions` 平级的还有一个 `include` 字段,表示哪些文件会参与编译。在引擎 `4.x` 之前的版本里，该字段为 `exclude`, 表示哪些文件不参与编译


4 ) 执行 `egret build` 命令，可以按照配置文件来编译 egret 项目。

更详细的编译参数，您可以参考 [tsconfig.json 的官方文档](http://json.schemastore.org/tsconfig)。

TypeScript详细手册参考：[TypeScript Handbook（中文版）](https://www.gitbook.com/book/zhongsp/typescript-handbook/details)
