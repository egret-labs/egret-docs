class TextFieldRotationTest extends egret.DisplayObjectContainer
{

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {

        //默认字体样式
        var label:egret.TextField = new egret.TextField();
        label.width = 450;
        label.x = 50;
        label.bold = true;
        label.text = "未旋转的字体";
        this.addChild( label );

        //
        var label1:egret.TextField = new egret.TextField();
        label1.width = 450;
        label1.x = 50;
        label1.y = 50;
        label1.rotation = 45;
        label1.text = "旋转45度的字体";
        this.addChild( label1 );

    }

}