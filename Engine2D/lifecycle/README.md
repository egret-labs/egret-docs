
在游戏中，用户可以切换应用的前后台。在用户进入后台时，关闭游戏逻辑、渲染逻辑、背景音乐，可以保证更好的用户体验。



白鹭引擎从 4.1 版本开始引入生命周期管理器：```egret.lifecycle```。其代码示例如下：

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

针对不同的游戏运行环境，开发者可以对生命周期管理器进行扩展，以手机QQ举例，其扩展如下：

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
