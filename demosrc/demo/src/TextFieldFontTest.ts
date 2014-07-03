class TextFieldFontTest extends egret.DisplayObjectContainer
{

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //默认字体
        var label1:egret.TextField = new egret.TextField();
        label1.width = 450;
        label1.text = "默认字体";
        this.addChild( label1 );

        //宋体
        var label2:egret.TextField = new egret.TextField();
        label2.width = 450;
        label2.y = 50;
        label2.fontFamily = "宋体";
        label2.text = "宋体";
        this.addChild( label2 );

        //黑体
        var label3:egret.TextField = new egret.TextField();
        label3.width = 450;
        label3.y = 100;
        label2.fontFamily = "黑体";
        label3.text = "黑体";
        this.addChild( label3 );

        //微软雅黑
        var label4:egret.TextField = new egret.TextField();
        label4.width = 450;
        label4.y = 150;
        label2.fontFamily = "微软雅黑";
        label4.text = "微软雅黑";
        this.addChild( label4 );
    }

}