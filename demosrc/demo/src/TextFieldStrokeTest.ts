class TextFieldStrokeTest extends egret.DisplayObjectContainer
{

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        var strokeLabel:egret.TextField = new egret.TextField();
        strokeLabel.width = 450;
        strokeLabel.height = 450;
        strokeLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
        strokeLabel.textAlign = egret.HorizontalAlign.CENTER;
        strokeLabel.textColor = 0x00ff00;
        strokeLabel.text = "描边";
        strokeLabel.strokeColor = 0xFF0000;
        strokeLabel.stroke = 2;
        this.addChild(strokeLabel);
    }

}