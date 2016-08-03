事件机制包含4个步骤：注册侦听器，发送事件，侦听事件，移除侦听器。这四个步骤是按照顺序来执行的。

注册侦听器，即指定事件由哪个对象的哪个方法来接受。在上一节约会的例子中，我们指定由男朋友来发送事件，由女朋友 来接受事件。

只有在注册侦听器后，发送的事件才能被侦听。而且发送的事件必须和侦听器事件的类型匹配。在发送事件后，侦听器才能 侦听到事件。

下面我们来通过一个实例了解一下“约会”这个事件发送过程，以及代码编写过程。

文档类

```
class SampleDate extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();

        //创建一个男朋友
        var boy:Boy = new Boy();
        boy.name = "男朋友";
        //创建一个女朋友
        var girl:Girl = new Girl();
        girl.name = "女朋友";
        //注册侦听器
        boy.addEventListener(DateEvent.DATE,girl.getDate,girl);
        //男朋友发送要求
        boy.order();
        //约会邀请完成后，移除侦听器
        boy.removeEventListener(DateEvent.DATE,girl.getDate,girl);
    }
}
```

男朋友类

```
class Boy extends egret.Sprite
{
    public constructor()
    {
        super();
    }
    public order()
    {
        //生成约会事件对象
        var daterEvent:DateEvent = new DateEvent(DateEvent.DATE);
        //添加对应的约会信息
        daterEvent._year = 2014;
        daterEvent._month = 8;
        daterEvent._date = 2;
        daterEvent._where = "肯德基";
        daterEvent._todo = "共进晚餐";
        //发送要求事件
        this.dispatchEvent(daterEvent);
    }
}
```

女朋友类

```
class Girl extends egret.Sprite
{
    public constructor()
    {
        super();
    }

    public getDate(evt:DateEvent)
    {
        console.log("得到了" + evt.target.name + "的邀请！" );
        console.log("会在" + evt._year + "年" + evt._month + "月" + evt._date + "日，在"+ evt._where+ evt._todo);
    }
}
```

约会事件类

```
class DateEvent extends egret.Event
{
    public static DATE:string = "约会";
    public _year:number = 0;
    public _month:number = 0;
    public _date:number = 0;
    public _where:string = "";
    public _todo:string = "";

    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}
```

编译并运行，效果如图：

![](566143f9ec1bc.png)

