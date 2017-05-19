从白鹭引擎 3.0 开始，引擎编译器不再强制设置 TypeScript 编译器的编译参数，而是引入 tsconfig.json 作为配置文件，允许开发者自定义编译参数。

tsconfig.json 是 Typescript 项目的配置文件，TypeScript 编译器编译代码之前，会首先读取这个配置文件，并根据其中的属性来设置这个 TypeScript 项目的编译参数。



## 使用方式

1 ) 在 egret 项目的文件夹里，创建一个名为 "tsconfig.json" 的文本文件

2 ) 把您需要的编译参数添加到 `compilerOptions` 字段中，参考以下例子：
~~~
{
    "compilerOptions": {
        "sourceMap": true,
        "removeComments": true
    }
}
~~~
上述例子中包含2个编译属性：
* ` "sourceMap": true` 编译 `.ts` 文件至 `.js` 文件同时生成对应的 `.js.map` 文件，使用户调试时可以直接调试 `.ts` 文件而非 `.js` 文件。
* `"removeComments": true`  编译 `.js` 同时删除原本 `.ts` 文件中的注释

3 ) 执行 `egret build` 命令，这样就可以按照配置文件来编译 egret 项目了。


您可以通过阅读 tsconfig.json 的[官方文档](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json)，了解详细的编译参数。

TypeScript详细手册参考：[TypeScript Handbook（中文版）](https://www.gitbook.com/book/zhongsp/typescript-handbook/details)



## 不支持的编译参数

因为白鹭引擎编译器对项目结构有一定一定要求，所以部分 TypeScript 编译参数是不可以修改的，请不要在 tsconfig 里设置。如果您设置了这些参数，引擎执行构建时也不会起作用，仍然会按照引擎内置的默认值进行构建，并抛出警告信息。

以下参数暂时不支持开发者自行设置

```
"target","outDir","module","noLib","outFile","rootDir","out"
```

在白鹭引擎 3.x 中，除了 `compilerOptions` 字段之外，其他 tsconfig.json 可以设置的属性均不支持自定义设置，例如 ```files```,```includes```,```excludes```。

从白鹭引擎 4.x 开始，上述不支持的属性均已支持。