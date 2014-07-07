class TextFieldLayoutTest extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {

        //左对齐文本
        var label1:egret.TextField = new egret.TextField();
        label1.textAlign = egret.HorizontalAlign.LEFT;
        label1.width = 450;
        label1.text = "左对齐文本";
        this.addChild( label1 );

        //水平居中文本
        var label2:egret.TextField = new egret.TextField();
        label2.width = 450;
        label2.y = 50;
        label2.textAlign = egret.HorizontalAlign.CENTER;
        label2.text = "水平居中文本";
        this.addChild( label2 );

        //垂直居中本文
        var label3:egret.TextField = new egret.TextField();
        label3.width = 450;
        label3.height = 450;
        label3.textAlign = egret.HorizontalAlign.CENTER;
        label3.verticalAlign = egret.VerticalAlign.MIDDLE;
        label3.text = "垂直居中本文";
        this.addChild( label3 );

        //水平居右文本
        var label4:egret.TextField = new egret.TextField();
        label4.width = 450;
        label4.textAlign = egret.HorizontalAlign.RIGHT;
        label4.text = "水平居右文本";
        this.addChild( label4 );

        //底对齐文本
        var label5:egret.TextField = new egret.TextField();
        label5.width = 450;
        label5.height = 450;
        label5.verticalAlign = egret.VerticalAlign.BOTTOM;
        label5.textAlign = egret.HorizontalAlign.CENTER;
        label5.text = "底对齐文本";
        this.addChild( label5 );
    }

}