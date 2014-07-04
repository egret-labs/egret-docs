class TextFieldStyleTest extends egret.DisplayObjectContainer
{

    //入口函数
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
        label.bold = true;
        label.text = "默认字体样式";
        this.addChild( label );

        //加粗
        var label1:egret.TextField = new egret.TextField();
        label1.width = 450;
        label1.y = 50;
        label1.bold = true;
        label1.text = "加粗";
        this.addChild( label1 );

        //斜体
        var label2:egret.TextField = new egret.TextField();
        label2.width = 450;
        label2.y = 100;
        label2.italic = true;
        label2.text = "斜体";
        this.addChild( label2 );

        //半透明字体
        var label3:egret.TextField = new egret.TextField();
        label3.width = 450;
        label3.y = 150;
        label3.alpha = 0.5;
        label3.text = "半透明字体";
        this.addChild( label3 );

        //20号字体
        var label4:egret.TextField = new egret.TextField();
        label4.width = 450;
        label4.y = 200;
        label4.size = 20;
        label4.text = "20号字体";
        this.addChild( label4 );

    }
}