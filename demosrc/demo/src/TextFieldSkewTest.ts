class TextFieldSkewTest extends egret.DisplayObjectContainer
{

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {

        //加粗
        var label1:egret.TextField = new egret.TextField();
        label1.width = 450;
        label1.x = 50;
        label1.y = 50;
        label1.skewX = 50;
        label1.text = "加粗";
        this.addChild( label1 );

        //斜体
        var label2:egret.TextField = new egret.TextField();
        label2.width = 450;
        label2.x = 100;
        label2.y = 100;
        label2.skewY = 50;
        label2.text = "斜体";
        this.addChild( label2 );

    }

}