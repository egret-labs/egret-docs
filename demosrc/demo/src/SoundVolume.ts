class SoundVolume extends egret.DisplayObjectContainer
{
    private _curSoundVoluma:number = 1;
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
        this.sound.setVolume( this._curSoundVoluma );

        this.drawAddVolumeBtn();
        this.drawSubVolumeBtn();
        this.drawVolumeText();
    }

    //循环播放音频
    private rePlay():void{
        this.sound.load();
        this.sound.play();
    }

    //绘制音量加按钮
    private drawAddVolumeBtn()
    {
        var spr:egret.Sprite = new egret.Sprite();
        spr.graphics.beginFill( 0x00ff00 );
        spr.graphics.drawRect( 0, 0, 100, 100);
        spr.graphics.endFill();
        spr.width = 100;
        spr.height = 100;
        this.addChild( spr );
        spr.touchEnabled = true;
        spr.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onAddVolumeTouch, this );
    }

    private onAddVolumeTouch( evt:egret.TouchEvent )
    {
        var _volume:number = this.sound.getVolume();
        _volume += 0.1;
        this.sound.setVolume( _volume );
        this.changeVolumaText();
    }

    //绘制音量减按钮
    private drawSubVolumeBtn()
    {
        var spr:egret.Sprite = new egret.Sprite();
        spr.graphics.beginFill( 0xff0000 );
        spr.graphics.drawRect( 0, 0, 100, 100);
        spr.graphics.endFill();
        spr.width = 100;
        spr.height = 100;
        spr.x = 110;
        this.addChild( spr );
        spr.touchEnabled = true;
        spr.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onSubVolumeTouch, this );
    }

    private onSubVolumeTouch( evt:egret.TouchEvent )
    {
        var _volume:number = this.sound.getVolume();
        _volume -= 0.1;
        this.sound.setVolume( _volume );
        this.changeVolumaText();
    }

    private _volumeTxt:egret.TextField;
    //绘制音量文本
    private drawVolumeText()
    {
        this._volumeTxt = new egret.TextField();
        this._volumeTxt.text = "当前音量：" + this.sound.getVolume();
        this._volumeTxt.y = 110;
        this.addChild( this._volumeTxt );
    }

    private changeVolumaText():void
    {
        this._volumeTxt.text = "当前音量：" + this.sound.getVolume();
    }
}