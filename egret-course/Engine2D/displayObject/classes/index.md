自定义显示对象类需要继承自 `DisplayObject`的具体子类，例如`Shape`或者`TextField`。

下面我们来创建一个自己的显示对象。我们把这个显示对象称之为 `MyGrid` 。

创建一个名称为 `MyGrid` 的类，并且继承自 `Shape` 。具体代码如下：

```
class MyGrid extends egret.Shape{
    public constructor(){
        super();
        this.drawGrid();
    }

    private drawGrid(){
        this.graphics.beginFill( 0x0000ff );
        this.graphics.drawRect( 0, 0, 50,50 );
        this.graphics.endFill();

        this.graphics.beginFill( 0x0000ff );
        this.graphics.drawRect( 50, 50, 50, 50);
        this.graphics.endFill();

        this.graphics.beginFill( 0xff0000 );
        this.graphics.drawRect( 50, 0, 50,50 );
        this.graphics.endFill();

        this.graphics.beginFill( 0xff0000 );
        this.graphics.drawRect( 0, 50, 50,50 );
        this.graphics.endFill();               
    }
}
````

在 `MyGrid` 我们绘制了一个红蓝相间的2*2格子，然后我们修改文档类`Main`，在文档类中创建并显示我们的 `MyGrid`，具体代码如下：

```
class Main extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        var _myGrid:MyGrid = new MyGrid();
        this.addChild( _myGrid );
    }
}
```

编译并测试，你会在浏览器中看到如下图效果。

![](556534d84ca7f.png)