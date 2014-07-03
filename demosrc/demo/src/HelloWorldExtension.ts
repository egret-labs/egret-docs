class HelloWorldExtension extends egret.DisplayObjectContainer
{

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //打开性能面板
        var prof:egret.Profiler = new egret.Profiler();
        prof.run();

        //控制台打印"Hello World"信息
        egret.Logger.info( "Hello World!" );
    }

}