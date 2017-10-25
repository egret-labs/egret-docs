---
title: "lifeCycle"
author: Egret
date: Aug 29, 2017
output: 
    word_document:
        path: E:/egret/egret_docs/lifeCycle.docx
---

在游戏中，用户可以切换应用的前后台。在用户进入后台时，关闭游戏逻辑、渲染逻辑、背景音乐，可以保证更好的用户体验。

### 白鹭引擎v2.0+ API

在白鹭引擎2.0+ 版本，通过监听```stage```对象的```egret.Event.ACTIVATE```和```egret.Event.DEACTIVATE```事件实现生命周期控制，代码示例如下：

```typescript
stage.addEventListener(egret.Event.ACTIVATE,()=>{
    console.log("app 进入前台");
},this);
stage.addEventListener(egret.Event.DEACTIVATE,()=>{
    console.log("app 进入后台");
},this);
```

上述方法的缺点是：

1. 对象的“生命周期”行为与 ```stage```对象耦合。
2. 由于一些 HTML5 游戏的运行环境（比如手机QQ等）设置了独有的 API 而非 HTML5 标准 API，开发者难以对白鹭引擎的底层进行自定义扩展。

### 白鹭引擎v4.1+ API

白鹭引擎 4.1 版本引入生命周期管理器：```egret.lifecycle```。其代码示例如下：

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
