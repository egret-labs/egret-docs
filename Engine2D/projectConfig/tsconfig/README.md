
`tsconfig.json` 是 Typescript 项目的配置文件，TypeScript 编译器编译代码之前，会首先读取这个配置文件，并根据其中的属性来设置 TypeScript 项目的编译参数。



### 使用方式

1 ) 在创建 egret 项目时，会自动在项目根目录下生成名为 "tsconfig.json" 的文本文件。

2 ) 把需要的编译参数添加到 `compilerOptions` 字段中，参考以下例子：
~~~
{
    "compilerOptions": {
        "sourceMap": true,
        "removeComments": true
    },
    "exclude": [
        "node_modules"
    ]
}
~~~
上述例子中包含2个编译属性：
* ` "sourceMap": true` 编译 `.ts` 文件至 `.js` 文件同时生成对应的 `.js.map` 文件，使用户调试时可以直接调试 `.ts` 文件而非 `.js` 文件。
* `"removeComments": true`  编译 `.js` 同时删除原本 `.ts` 文件中的注释。

3 ) 设置其他字段，例如把不需要编译的文件目录添加到`exclude`字段中

* 在上述例子中，`node_modules`目录中的文件在编译时会被忽略。

4 ) 执行 `egret build` 命令，可以按照配置文件来编译 egret 项目。


您可以通过阅读 tsconfig.json 的[官方文档](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json)，了解详细的编译参数。

TypeScript详细手册参考：[TypeScript Handbook（中文版）](https://www.gitbook.com/book/zhongsp/typescript-handbook/details)
