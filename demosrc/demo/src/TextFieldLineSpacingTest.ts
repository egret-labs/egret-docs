class TextFieldLineSpacingTest extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {

        //正常行间距
        var label:egret.TextField = new egret.TextField();
        label.width = 450;
        label.height = 200;
        label.text = "这是一段测试行间距的文本，\n这行文字是第二行文本。";
        this.addChild( label );

        //??
        var label1:egret.TextField = new egret.TextField();
        label1.width = 450;
        label1.height = 200;
        label1.y = 100;
        //label1.lineSpacing = 1;
        label.text = "这是一段测试行间距的文本，\n这行文字是第二行文本。";
        this.addChild( label1 );

    }

}