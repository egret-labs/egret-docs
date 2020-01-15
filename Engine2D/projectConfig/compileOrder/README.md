在 Egret 中，需使用 TypeScript 编写程序，最终编译成浏览器可读的 JavaScript。

JavaScript 是一种脚本语言，浏览器按脚本的顺序来执行。实际上浏览器会根据 `<script>` 标签中脚本的载入顺序来执行脚本。当某个脚本引用了一个未载入的脚本中的变量时，浏览将报出相应的错误。

一般情况下，在 Egret 项目中并不需要手动处理编译顺序，因为egret编译器已经帮助开发者处理好了。但是有一种情况是编译器不能处理的，需要手动加上 `<reference>` 标签来告诉编译器 项目中类的依赖关系。下面是具体的代码和解决的方法。

TypeScript详细手册参考：[TypeScript Handbook（中文版）](https://www.gitbook.com/book/zhongsp/typescript-handbook/details)

### 测试依赖关系

新建一个 Egret 项目，这里使用 `egret create test` 创建一个 Egret 默认项目。

建立若干测试类，项目的结构如下:

![](56e7b0cb40856.png)

如上所示，创建了一个 Test 文件夹，内部创建了 Call 文件夹，在 Call 内部创建了 TestCall.ts。同时在 Test 文件夹内创建 TestA.ts 和 TestB.ts。其余的 Main.ts 和 LoadingUI.ts 等这里用不到，在此忽略。

在 TestA.ts 中代码如下：

``` javascript
class TestA{
    public static arr:Array<any> = ["t","e","s","t","c","a","l","l"];
}
```

TestB.ts 中代码如下:

``` javascript
class TestB{
    public static testBStr:string = TestA.arr.join("");
}
```

这两个类都只有一个静态成员。其中 TestA 类存放了一个数组,TestB 类将这个数组的内容拼接成一个字符串并保存下来。到目前为止我们编译运行并没有发现异常。

下面在TestCall.ts 中加入对 TestB 类的调用。

``` javascript
class TestCall{
    public static test:any = egret.getDefinitionByName(TestB.testBStr);
}
```

编译运行之后发现浏览器会报如下`TestB.js:11 Uncaught ReferenceError`错误：

![](56e7b0cb4fc18.png)

当我们添加了 `TestB.testBstr` 的调用之后浏览器发现 TestA 类并没有被定义，进而导致 testBStr 这个属性页找不到了。在编译之后检查生成的 index.html 文件会发现 TestB.js 是在 TestCall.js 之前加载的，而 TestA.js 是在最后加载的。当 TestB.js 调用 TestA.js 中的文件的内容时浏览器将会报错。

上面的调用关系在代码中显然是成立的，编译器并没有报错。而编译器并没有生成正确的载入顺序，主要是因为其无法确认这种类的静态成员的互相引用的顺序。当在 TestCall.ts 中引用了TestB.ts 中的内容时自动将 TestB.js 放在 TestCall.js 之前进行加载。由于无法检测到 TestB.ts 中对 TestA.ts 的静态成员的引用，所以导致了以上情况的发生。

### 解决方法

这种情况解决方法是告诉编译器项目中的类的依赖关系。在 TypeScript 中，使用`<reference>`标签来表示引用关系。在 reference 标签中可以标记依赖文件的相对路径。所以只需要在 TestB 类之前加入如下注释即可：

``` javascript
///<reference path="TestA.ts" />
```


``` javascript
class TestB{
    public static testBStr:string = TestA.arr.join("");
}
```

上面这种情况一般发生在静态成员的引用上，还有其他情况在极小概率下可能导致该现象，如果遇到，请加入依赖关系标签来告诉编译器正确的加载方式。
