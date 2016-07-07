跟上一节一样，我们还是在默认的 eui 项目中创建的教程代码。

在横向布局，以及下面将要讲的垂直布局，网格布局中，都会忽略您在子项上的坐标设置，所有子项的位置将由布局类统一管理。

横向布局会自动将所有的子项横着排列，您可以做以下的设置：
* gap属性，设置子项之间的间距
* horizontalAlign属性，设置水平对齐方式
* verticalAlign属性，设置垂直对齐方式
* padding系列属性，设置容器内间距，相对于4个边分别可以使用 paddingTop, paddingBottom, paddingLeft, paddingRight

示例：    
``` TypeScript   
class hLayout extends egret.Sprite {

    private  myGroup:eui.Group;
    public constructor() {
        super();

        this.myGroup = new eui.Group();
        this.addChild( this.myGroup );

        this.myGroup.layout = new eui.BasicLayout();
        this.myGroup.width = 500;
        this.myGroup.height = 300;
        
        var outline:egret.Shape = new egret.Shape;
        outline.graphics.lineStyle(3,0x00ff00);
        outline.graphics.beginFill(0x000000,0);
        outline.graphics.drawRect(0,0,500,300);
        outline.graphics.endFill();
        this.myGroup.addChild(outline);

        var btn1:eui.Button = new eui.Button();
        btn1.label = "egret 按钮 A";
        var btn2:eui.Button = new eui.Button();
        btn2.label = "egret 按钮 B";
        var btn3:eui.Button = new eui.Button();
        btn3.label = "egret 按钮 C";
        this.myGroup.addChild( btn1 );
        this.myGroup.addChild( btn2 );
        this.myGroup.addChild( btn3 );

        var hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 10;
        hLayout.paddingTop = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.myGroup.layout = hLayout;   /// 水平布局

    }
}
```              
效果如图：

![][6-2-layout-HLayout]     


[6-2-layout-HLayout]: http://sedn.egret.com/56012e4de46c7.png

