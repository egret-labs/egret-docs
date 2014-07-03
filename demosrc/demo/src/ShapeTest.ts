class ShapeTest extends egret.DisplayObjectContainer
{

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        var shape1 = new egret.Shape();
        shape1.graphics.beginFill(0xff0000, .5);
        shape1.graphics.drawRect(50, 50, 100, 100);
        shape1.graphics.endFill();
        this.addChild(shape1);

        var shape2 = new egret.Shape();
        shape2.graphics.lineStyle(5, 0xffff00, 1);
        shape2.graphics.moveTo(300, 0);
        shape2.graphics.lineTo(300, 300);
        shape2.graphics.endFill();
        this.addChild(shape2);
        shape2.x = 100;

        var shape3 = new egret.Shape();
        shape3.graphics.beginFill(0xff0000, .5);
        shape3.graphics.drawCircle(200, 200, 100);
        shape3.graphics.endFill();
        this.addChild(shape3);
    }


}
