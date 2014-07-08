class HelloWorldExtension extends egret.DisplayObjectContainer
{

    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //打开性能面板
        egret.Profiler.getInstance().run();

        //控制台打印"Hello World"信息
        console.log("Hello World!");
    }

}