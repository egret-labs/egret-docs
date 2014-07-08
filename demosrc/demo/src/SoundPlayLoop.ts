class SoundPlayLoop extends egret.DisplayObjectContainer
{
    //入口函数
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        //初始化Resource资源加载库，提示：Resource资源加载库是可选模块，不在egret-core项目里，最新代码请到github上的egret-game-library项目检出。
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup( "soundload" );

    }

    private  sound:egret.Sound;
    //soundload资源组加载完成
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        this.sound = new egret.Sound();
        this.sound.audio = RES.getRes("sound");
        this.sound.play();

        this.sound.addEventListener("ended", this.rePlay.bind(this));
    }

    //循环播放音频
    private rePlay():void{
        this.sound.load();
        this.sound.play();
    }
}