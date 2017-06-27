在游戏中，用户可以切换应用的前后台，开发者需要在用户进入后台时，关闭游戏逻辑、渲染逻辑、背景音乐，以保证更好的用户体验。


白鹭引擎从 2.0 版本开始提供了以下 API 以实现此功能:


```typescript
stage.addEventListener(egret.Event.ACTIVATE,()=>{
    console.log("app 进入前台");
},this);
stage.addEventListener(egret.Event.DEACTIVATE,()=>{
    console.log("app 进入后台");
},this);
```

上述做法有两个缺点：

1. 将对象生命周期这一行为与 ```stage```对象产生了无必要的耦合。
2. 由于一些 HTML5 游戏的运行环境（比如手机QQ等）设置了独有的 API 而非 HTML5 标准 API，开发者难以对白鹭引擎的底层进行自定义扩展。


为了解决上述问题，白鹭引擎 5.1 版本引入了新的生命周期管理器：```egret.lifecycle```。其参考 API 如下：

```typescript
egret.lifecycle.onPause = ()=> {
    console.log("app 进入后台");
    egret.ticker.pause(); // 关闭渲染与心跳
}
egret.lifecycle.onResume = ()=> {
    console.log("app 进入前台");
    egret.ticker.resume(); // 打开渲染与心跳
}
```

除此之外，开发者还可以对生命周期进行扩展，以手机QQ举例，其扩展如下：

```typescript

// 手机QQ注册了 appInBackgound 这一变量，在 TypeScript 中进行声明，防止报错
declare interface Window {

    appInBackgound:boolean;
}

egret.lifecycle.addLifecycleListener( (context)=>{
    
    // 方法一：通过事件监听的方式进行通知
    document.addEventListener("qbrowserVisibilityChange", function(e:any){
        if (e.hidden){
            context.pause();
        }
        else{
            context.resume();
        };
    });

    // 方法二：在每一帧进行判断
    context.onUpdate = ()=> {
        if (window.appInBackgound){
            context.pause();
        }
        else{
            context.resume();
        }
    }
} )


```