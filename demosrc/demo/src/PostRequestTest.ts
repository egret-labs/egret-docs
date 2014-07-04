class PostRequestTest extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //绘制文本
        this.drawText();

        //创建POST请求
        var url:string = "http://httpbin.org/post";
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables("test=ok");
        loader.load(request);
        this.statusGetLabel.text = "正在向httpbin.org发送POST请求";

    }

    //POST请求完成
    private onPostComplete(event:egret.Event):void
    {
        var loader:egret.URLLoader = <egret.URLLoader> event.target;
        var data:egret.URLVariables = loader.data;
        this.statusGetLabel.text = "获得POST响应! ";
        this.statusGetLabel.text += "\nPOST响应: \n" + data.toString();

    }

    //绘制文本
    private statusGetLabel:egret.TextField;
    private drawText()
    {
        this.statusGetLabel = new egret.TextField();
        this.statusGetLabel.size = 12;
        this.statusGetLabel.text = "状态文本";
        this.statusGetLabel.x = 10;
        this.statusGetLabel.y = 10;
        this.statusGetLabel.width = 430;
        this.statusGetLabel.height = 430;
        this.addChild( this.statusGetLabel );
    }

}