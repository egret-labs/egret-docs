# 第三方扩展库

## 准备 

第三方库可以是标准的 ts 库，也可是在网上下载现成的 js 库，或者是开发者自己写的 js 库。 

由于 js 与 ts 在语法结构上的差异，在 ts 中不能直接调⽤用 js 库的 API，所以TypeScript 团队提供了一套虚构声明语法，可以把现有代码的 API ⽤头⽂件的形式描述出来，扩展名为 d.ts(d.ts 命名会提醒编译器这种⽂件不需要编译)。这套虚构定义语法，让开发者不需要去实现函数体里的代码， 类似定义interface和抽象类。 

幸运的是目前，⼤多数流⾏的 js 类库已经由官方提供，或者由热⼼的社区开发者提供了对应的 d.ts 文件。当然，如果没有，开发者也可以⾃⼰编写。详情可以参考[JS类库及管理这些库的方法](https://github.com/vilic/typescript-guide/blob/adaaef2281150e57657e5b67368f592a968fad8f/%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97/%E4%BD%BF%E7%94%A8JS%E7%B1%BB%E5%BA%93.md)。 

另外，由于一些流行的 js 库在快速更新，可能会发生找到的 d.ts ⽂件定义与 js 库的版本不一致⽽导致其中的 API 并没有完全对应的问题。遇到这种情况，要么寻找对应版本的 js 库，要么就需要开发者自己修改一下 d.ts 文件。 

至于具体修改方法，在对照原 d.ts 的基础上，你可能还需要熟悉 ts 接⼝方⾯的语法，可以参考[ts接⼝教程](http://bbs.egret.com/thread-885-1-1.html)。 





## 创建第三方库

当我们准备好了要用的第三方库，还需要把它编译成 egret 需要的模块结构。

1. 创建一个egret第三方库的项目文件，在命令行中输入

   ```bash
   egret create_lib demo
   ```

   执行完成之后可以看到新建了一个 demo 文件夹，文件夹内有两个文件 `package.json`  `tsconfig.json`。

2. 在 demo 文件夹内创建`src`   `bin`    ` typings` 目录。

   根据 TypeScript / JavaScript 不同类型的类库，有两种情况：

   #### TypeScript库

   直接将ts文件放到`src`目录下。

   修改`tsconfig.json`文件：

   ```json
   {
       "compilerOptions": {
           "target": "es5",
           "noImplicitAny": false,
           "sourceMap": false,
           
           // 是否生成.d.ts文件。 如果是typescript库设置为true，如果是javascript库设置为false
           "declaration": true,  
           
           "outFile": "bin/demo/demo.js",  // 生成的库文件的路径
       },
       "include": ["src"]
   }
   ```

   ### JavaScript库

   将js文件放到`src`目录下，将对于的 .d.ts 文件放到`typings`目录下。

   修改`tsconfig.json`文件：

   ```json
      {
         "compilerOptions": {
             "target": "es5",
             "noImplicitAny": false,
             "sourceMap": false,
      
             // 是否生成.d.ts文件。 如果是typescript库设置为true，如果是javascript库设置为false
             "declaration": false,  
      
             "outFile": "bin/demo/demo.js",  // 生成的库文件的路径
      
             // 是否允许编译js文件。 如果是typescript库设置为false，如果是javascript库设置为true
             "allowJs": true  
         },
         "include": ["src"]
      }
   ```

      修改`package.json` 文件：

      ```json
      {
          "name": "jszip",
          "compilerVersion": "5.2.7",
          
          // 新增一个字段
          "typings": "typings/demo.d.ts"
      }
      
      ```

  

   

3. 执行命令

   ```shell
   egret build demo
   ```

   会根据 `tsconfig.json`中的 `outFile`字段生成库文件，压缩文件以及 .d.ts 文件。

   `bin` 目录中生成的`demo`文件夹就是我们可以使用的第三方库文件夹。


### TIP

如果你已经有了`demo.js`、`demo.min.js`、`demo.d.ts`三个文件，那么你不需要执行以上步骤，直接将这三个文件放到同一个文件夹`demo`内，然后使用即可。



## 使用第三方库

1. 将`demo`文件夹复制到项目libs目录中（不可以放到`modules`内）。

2. 编辑`egretProperties.json`文件：

   ```json
   {
     "engineVersion": "5.2.7",
     "compilerVersion": "5.2.7",
     "template": {},
     "target": {
       "current": "web"
     },
     "eui": {
       "exmlRoot": [
         "resource/eui_skins"
       ],
       "themes": [
         "resource/default.thm.json"
       ],
       "exmlPublishPolicy": "commonjs"
     },
     "modules": [
       {
         "name": "egret"
       },
       {
         "name": "eui"
       },
       {
         "name": "assetsmanager"
       },
       {
         "name": "tween"
       },
       {
         "name": "promise"
       },
       
       
       // 新增一个字段
       {
         "name": "demo",  // 第三方库的name
         "path": "./libs/demo"  // 路径
       }
     ]
   }
   ```

3. 编译引擎。

   ```shell
   egret build
   ```

   执行之后，就可以在当前项目中使用的引入的第三方库了。





## 引擎提供的第三方库

Egret提供了几个实用的第三方库，开发者可以根据需求自行下载使用。

* JSZip库

  > 下载地址 ： https://github.com/egret-labs/egret-game-library/tree/master/jszip
  >
  > 教程文档：http://developer.egret.com/cn/github/egret-docs/extension/jszip/jszip/index.html

* mouse鼠标支持库

  > 下载地址：https://github.com/egret-labs/egret-game-library/tree/master/mouse
  >
  > 教程文档：http://developer.egret.com/cn/github/egret-docs/extension/mouse/mouse/index.html

* P2物理系统库

  > 下载地址：https://github.com/egret-labs/egret-game-library/tree/master/physics
  >
  > 教程文档：http://developer.egret.com/cn/github/egret-docs/extension/p2/p2/index.html

* Particle粒子库

  > 下载地址：https://github.com/egret-labs/egret-game-library/tree/master/particle
  >
  > 教程文档：http://developer.egret.com/cn/github/egret-docs/extension/particle/introduction/index.html

* Tiled瓦片地图库

  > 下载地址：https://github.com/egret-labs/egret-game-library/tree/master/tiled
  >
  > 教程文档：http://edn.egret.com/cn/docs/page/718