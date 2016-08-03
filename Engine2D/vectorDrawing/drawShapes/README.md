以下代码在一个Shape对象中会绘制4个小格子，互相紧邻，并且红蓝相间。

```
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
```

将该Shape对象放到显示列表，编译运行，得到如图效果：

![](566153e55d510.png)

注意，多个形状绘制，互相是独立的，每一次绘制填充，都必须以`endFill`结束，才能开始下一次绘制。