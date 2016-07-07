在 Egret Engine 3.0 版本中，我们新增了一个使用 tsconfig.json 作为配置文件，自定义编译参数的功能。

tsconfig.json 是什么呢？熟悉 typescript 的朋友应该对它不陌生，它是一个 typescript 项目的配置文件，可以通过读取它来设置 ts 编译器的编译参数。

https://github.com/Microsoft/TypeScript/wiki/tsconfig.json

这是微软的官方文档，里面有更详细的描述。

TypeScript详细手册参考：[TypeScript Handbook（中文版）](https://www.gitbook.com/book/zhongsp/typescript-handbook/details)

#### 如何使用 tsconfig.json

1 ) 在 egret 项目的文件夹里，创建一个名为 "tsconfig.json" 的文本文件

2 ) 像下面这个例子一样，把您需要的编译参数写到 `compilerOptions` 里。
~~~
{
    "compilerOptions": {
        "sourceMap": true,
        "removeComments": true
    }
}
~~~
这个例子里有2个编译属性：
* ` "sourceMap": true` 把 ts 文件编译成 js 文件的时候，同时生成对应的 `map` 文件
* `"removeComments": true`  编译 js 的时候，删除掉注释

3 ) 执行 `egret build` 命令，这样就可以按照配置文件来编译 egret 项目了。

更多的编译参数，您可以在上面的那个微软官方链接里找到

如果您对 tsconfig 熟悉的话，应该会知道，除了 `compilerOptions` ，还有很多其他属性可以设置。但我们目前只支持 `compilerOptions` 这个编译属性，其他的还暂不支持。

#### 不支持的编译参数
因为 egret 项目有很多自定义的功能，有一些编译参数是不可以修改的，请不要在 tsconfig 里设置。如果您设置了，也不会起作用，还是按照默认的参数编译，cmd 里会有提示信息。
下面这 7 个为不支持的参数

```
"target","outDir","module","noLib","outFile","rootDir","out"
```