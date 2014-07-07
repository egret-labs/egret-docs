class TweenMoveTest extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {

        //绘制一个透明度为1的绿色矩形，宽高为100*100
        var spr1:egret.Sprite = new egret.Sprite();
        spr1.graphics.beginFill(0x00ff00, 1);
        spr1.graphics.drawRect(0, 0, 100, 100);
        spr1.graphics.endFill();
        spr1.width = 100;
        spr1.height = 80;
        spr1.x = 50;
        spr1.y = 50;
        this.addChild( spr1 );

        //设置一个X轴从250到50的动画，并循环执行
        egret.Tween.get(spr1, { loop: true }).to({ x: 250 }, 2000).to({ x: 50 }, 2000);

    }

}