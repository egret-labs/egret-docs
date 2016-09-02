### 一，工具基本功能报错

* 无法新建转换项目

新建转换项目时，工具没有反应，进入假死状态。这种情况下可能与本地没有配置好egret环境有关，参考[准备与安装](../../Conversion/installation/README.md)。

* 项目转换后编译报错

首先确定本机当前所用的Egret版本为EgretConversion所要求的版本。如果低于所需最低版本，则要更新Egret（[准备与安装](../../Conversion/installation/README.md)）。

* 3000端口被占用，无法运行项目

egret本机项目运行在3000端口上，需要结束其他占用了3000端口的进程。参考“Getting Started”文档的“KILL3000端口”部分。

### 二，代码转换报错

* 类型转换报错

ts中任意类型转换报错，可在表达式前加<any>强转一下。

使用'as'操作符做类型转换时，如果要转为Class类型，会有一个编译报错：

“error TS2304: Cannot find name 'any'.”

例如从加载的swf中取链接类定义：

```
var btnCls:Class = loaderInfo.applicationDomain.getDefinition("MyButton") as Class;
```

转换之后的TS代码为：

```
var btnCls:any = <any>as3.As3As(loaderInfo.applicationDomain.getDefinition ("MyButton"),any);
```

这是因为ts中没有与Class对应的类类型，需要手动修改如下：

```
var cls:any = <any>loaderInfo.applicationDomain.getDefinition ("MyButton");
```

* 类型转换报错error TS2345

```
private myFunc():void{
   var employees:Array<any>;
   var isManager:Function = function (element:any,index:number,arr:Array<any>):boolean
   {
      return true;
   }; 
   employees.filter(isManager);
}
```

编译时经常会报错:  error TS2345: Argument of type 'Function' is not assignable to parameter of type '(value: any, index: number, array: any[]) => boolean'.

大部分情况下这是编译器的误报，可以忽略不管。也可以手动在右侧表达式前加<any>强转，再次编译就不会报类型强转的错误。

* 接口继承接口，类型判定需手动修改。

* 判断一个对象是否实现了某接口，需手动修改。

* 对于闭包，如果有嵌套的写法可能会转换失效，根据错误提示修改写法。

* 对于出现的API警告，有未实现的API请参考手册里“手动填充API”章节。

* namespace引起的转换错误

暂时不支持命名空间的语法规则，as3中的namespace在ts中被忽略，在as3的namesapce中定义的变量和方法视为public属性。因此要防止同名变量的冲突，例如在类MyClass.as中定义变量如下：

```
public var nsvar1:int = 10;
ns1 var nsvar1:int = 30;//ns1是我定义的命名空间
```

在转换为ts代码之后为：

```
public nsvar1:number = 10;
public nsvar1:number = 30;//这里会与类变量冲突
```

对于此冲突，目前需要手动修改，namespace写法在EgretConversion的后续版本中将会支持。

* 子类父类同名属性同名方法冲突

as3代码中子类可以override父类的方法，可以重新定义重名属性（改变属性的访问域private/public/protected），可以定义重名的static属性/方法。

对于同名的属性/方法，EgretConversion在转换之后，会重命名子类中的同名属性/方法，以与父类区分。

如以下基类与子类：

```
public class BaseCls
{
	public var myVar:int;
	public static var TYPE:String = "red";
	public function func():void{
	}
	public static function sfunc():void{
	}
}
```

```
public class ExtendCls extends BaseCls
{
	protected var myVar:int;//改变属性访问限制
	public static var TYPE:String = "red";//重定义static变量
	public override function func():void{//override函数
	}
	public static function sfunc():void{//重定义static函数
	}
}
```

看下转换后的ts代码：

```
 class ExtendCls extends BaseCls {
	protected myVar_ExtendCls:number = 0;//重命名
	public static TYPE_static_ExtendCls:string;//重命名
	public func()	{
	}
	public static sfunc_static_ExtendCls()	{//重命名
	}
}
ExtendCls.TYPE_static_ExtendCls = "red";
```


* get set方法在ts中不可调用super，需要手动修改。

如果在as3中子类重写了get 或set方法，转换后在ts端不会报错，但是子类无法获取父类的 get/set方法了。

例如父类中有get & set方法：

```
private _age:number = 0;
public get age():number{
 return this._age;
}
public set age(value:number){
 this._age = value;
}
```

子类中重写set：

```
public override set age(value:number){
    ….
}
```

子类中将无法访问 age的get方法。

EgretConversion转换as3项目后会重命名get set方法的方法名。如：

```
protected set age_ExtendCls(value:number)
```

三，资源转换报错

* 转换过程中有swf文件无法转换（卡死、闪退）

在转换swf资源时，如果卡在某个swf文件无法转换可能导致工具的崩溃、闪退、卡死等现象。一般是由于工具尚不支持的功能引起的。解决办法：可暂时通过删除该swf以跳过转换该资源。并将有问题文件提交给官方。有下列情形的可按照相应的办法解决：

a. avm1格式的swf，需要在fla中重新发布为avm2格式。

b. 有视频等尚不支持的资源类型，可以在fla中删除尚不支持的资源，重新发布swf。

* 转换过程死循环，重复转同一个swf文件

使用SwfExporter工具单独转有问题的swf。或者重启EgretConversion继续转换。

* swf有更改需要重新导出

已经转过的swf不会重新转换，如果原swf文件有改动，需删除已经转换出的资源文件夹（在resource\swfres目录下）。或者使用“swf转换工具”的功能拖入swf文件转换。

* 文本都是白色

升级egret到2.0.3之后的版本。

* 转换后动画播放不正确

是否用帧代码控制播放了，比如加个stop()。目前转换项目会忽略帧代码。

其他错误联系官方团队。

论坛热帖 [转换错误解决方案](http://bbs.egret.com/thread-10741-1-1.html)

----

EgretConversion联系方式：

官方QQ群：Egret Conversion VIP 249685517

官方论坛：[http://bbs.egret.com/forum.php?mod=forumdisplay&fid=70](http://bbs.egret.com/forum.php?mod=forumdisplay&fid=70)