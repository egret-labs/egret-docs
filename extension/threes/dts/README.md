一直以来，有不少开发者对于如何写自己的 “.d.ts” 而苦恼。下面我们将介绍下如何生成自己的js的头文件 “.d.ts” 。

### 前提

本教程只介绍如何通过已知的 js 相关 api 来生成 “.d.ts” 文件，如果你还不知道 js api 怎么调用，那么请到下载 js 的地方去查看相关文档。这里不会告诉你 js 文件里有哪些方法或者变量，也不会帮助你通过 js 文件来自动生成 ".d.ts" 文件。

### 说明

* 什么是 “.d.ts” 文件，简单一点讲，就是你可以在 ts 中调用的 js 的声明文件，类似c++中的 “.h” 头文件，不过和 “.h” 不一样的是，它完全是个声明文件，没有任何实现代码。

* 在 “.d.ts” 的每一个段落中，除了最外层为 interface 外，其他的都需要 declare 关键词，而且这个词只在最外层出现。比如：

~~~
declare class A {
}
interface I {
}
declare module b {
    var b2: string;
    function b3(): void;
    class B2 {
    }
    interface I1 {
    }
}
declare function f(): void;
declare var aa: string;
~~~


### 写法
下面我们介绍下 “.d.ts” 的几种声明的写法。

##### 模块 module

* 单模块声明

~~~
module a {
}
~~~

* 多模块声明。有2种写法，比如下面的声明模块a，包含模块b。

~~~
declare module a.b {
}
~~~

或者

~~~
declare module a {
    module b {
    }
}
~~~

##### 类 class 

~~~
declare class A1 {
}

declare module m {
    class A2 {
    }
}
~~~

##### 接口 interface

~~~
interface I1 {
}

declare module m {
    interface I2 {
    }
}
~~~

>>> 接口和类的区别是，接口是不可以 new 出来的。class 和 interface 只能包含函数和变量，不能再有 module、class、interface。

##### 函数

~~~
declare function f1(): void;
declare module m {
    function f2(): void;
}

declare class A {
    f(): void;
    static f(): void;
}

~~~

>>> 函数体内不能再声明其他，其实也很明显，没有地方可以嵌套。

##### 变量

~~~
declare var a1: string;
declare module m {
    var a2: string;
}

declare class A {
    a2: string;
    static a2: string;
}

~~~

>>> 和函数体一样，不可以嵌套。

##### 特殊变量
为什么要把这个单独拿出来，因为这个其实和普通的变量不太一样，它的声明类似 class 和 interface，如果是在纯 ts（非".d.ts"）中写的话，它是和 interface 一样，不会生成到最终的 js 文件中去。

写法

~~~
declare var AAA: {
	(id:number):any;		//直接调用
    
	new (s:string):any; 	//类似 class 的 new
	
	f(s:string):void;		//类似 class 的静态函数
	
	a:number;				//类似 class 的静态变量
};
~~~

调用

~~~
AAA(1);
new AAA("egret");
AAA.f("egret");
~~~

>>> 特殊变量中不能嵌套 module、class、interface。

### 示例

下面我们将以之前一位开发者提问的关于 talkingData 的一个 api 如何写对应的 .d.ts 文件来讲解。

##### 代码

~~~
//注册、登录、切换帐户、唤醒游戏时传入玩家账户信息
TDGA.Account({
    accountId : '1234256',
    level : 12,
    gameServer : '北京1',
    accountType : 1,
    age : 24,
    accountName : '昵称',
    gender : 1
});
//单独对帐户的某种信息做修改，可以单独调用以下对应方法
TDGA.Account.setAccountName('昵称')
TDGA.Account.setAccountType(2)
TDGA.Account.setLevel(12)
TDGA.Account.setGender(1)
TDGA.Account.setAge(25)
TDGA.Account.setGameServer('死亡之城')
~~~

##### 分析

* 从整体来看很好判断除了第一个外，其他的几个调用的都是函数体。
 
* 由于 TDGA.Account 有2层，因此 TDGA 可以使用 module 来定义。
 
* 下面就是一个重点了，Account 到底是什么。类的写法是 new Account()，而接口是不可以通过名称来初始化的，因而其实这2种方式的定义都与调用的 api 不吻合。现在如果大家熟悉最后一种定义（特殊变量），其实就非常简单了。

最后在 .d.ts 中的写法如下

~~~
declare module TDGA {
    var Account: {
        (id: Object): any;
        
        setAccountName(p_value: string): void;
        setAccountType(p_value: number): void;
        setLevel(p_value: number): void;
        setGender(p_value: number): void;
        setAge(p_value: number): void;
        setGameServer(p_value: string): void;
    };
}
~~~

更多TypeScript教程请访问：

* [TyptScript语言手册](http://bbs.egret.com/thread-1441-1-1.html)

* [TypeScript Handbook（中文版）](https://www.gitbook.com/book/zhongsp/typescript-handbook/details)
