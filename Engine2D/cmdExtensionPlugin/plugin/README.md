## 命令行扩展插件

### 脚本插件目录结构

```
scripts
    |-- api.d.ts // 文档
    |-- config.ts // 构建脚本入口
		|-- myplugin.ts // 开发者自定义插件的示例
		|-- node.d.ts // node的.d.ts 文件
```

### 插件运行机制简介

开发者在 build 和 publish 的时候可以执行自定义插件，在项目构建时会执行 config.ts 文件中的 buildConfig 函数，这个函数的功能是返回一个对象，对象中的内容会根据执行不同的命令返回相对应的输出路径和需要执行的插件，插件在返回对象的 commands 数组中实例化后就会执行。

![image](01.jpg)

### 插件编写规范

扩展的插件要实现 plugins.Command 接口，接口中有两个方法，onFile 方法会在项目中的每个文件都会执行此函数，返回 file 表示保留此文件，返回 null 表示将此文件从构建管线中删除，传入的参数是实现了 File 接口的类型。onFinish 方法会在所有文件均执行完后，最终会执行此函数，传入的参数是实现了 CommandContext 接口的类型。基本结构如图：

![image](02.jpg)

### 内置插件简介

另外为了开发者的便利性，我们已经内置了几个常用的插件，详细的介绍请您查看 api.d.ts 文件。

### 开发插件示例

我们要的功能很简单，只是在编译后 js 文件名添加这次编译的时间戳，以便达到对 js 文件版本控制。
首先在 scripts 文件中建立 TestPlugin.ts 文件，并实现 plugins.Command 接口。

```
export class TestPlugin implements plugins.Command {
    constructor() {
    }
    async onFile(file: plugins.File) {
        return file;
    }
    async onFinish(commandContext: plugins.CommandContext) {
    }
}
```

我们要保存时间戳和已修改的 js 文件名字，就要声明这几个属性来保存，然后在构造函数里生成时间戳，代码如下：

```
private timeStamp: number; //时间戳

private modifyInitial: Array<string> = []; //保存修改过的库文件 js 文件名字
private modifyGame: Array<string> = []; //保存修改过的 main 文件 js 文件名字

private manifestPath: string; //保存 manifest 路径

constructor() {
  this.timeStamp = Date.now();
}
```

然后我来扩展 onFile 的方法，先判断类型为 js 的文件，使用 file.extname 来判断，如果为 js 文件将生成好的时间戳加到 js 文件的名字上，我们还将所有修改的 js 文件重新放到 manifest.json 中，所以要将 manifest 路径和修改过的 js 文件名字保存起来以便我们后续修改，最后返回这个文件。代码如下：

```
async onFile(file: plugins.File) {
  const extName = file.extname;
  if (extName == ".js") {
    const pos = file.path.lastIndexOf(".");
    const prefix = file.path.slice(0, pos);
    const nowName = prefix + this.timeStamp + extName;
    file.path = nowName;

    if (file.basename.indexOf("main.min") >= 0) {
      this.modifyGame.push(file.relative);
    } else {
      this.modifyInitial.push(file.relative);
    }
  }

  if (file.basename.indexOf("manifest.json") >= 0) {
    this.manifestPath = file.relative;
  }
  return file;
}
```

我们还需在 onFinish 方法中处理 manifest.json 文件，先将所有保存好的 js 文件名字放到一个对象中，然后将这个对象转换为一个 JSON 字符串，最后保利用 createFile 方法修改 manifest 文件。代码如下：

```
async onFinish(commandContext: plugins.CommandContext) {
  let obj = {
    initial: this.modifyInitial,
    game: this.modifyGame
  };
  const serialize = JSON.stringify(obj);
  commandContext.createFile(this.manifestPath, new Buffer(serialize));
}
```	

现在我们已经完成了这小小的插件，要想使用还需要把我们的插件引入到 config.ts 文件中，首先使用 import 引入我们的插件，例：import { testPlugin } from './TestPlugin';然后在 buildConfig 的返回值的 commands 数组中实例化这个插件：new testPlugin()。最后执行命令 egret publish 命令的运行结果如图：

![image](03.jpg)

### 小结

通过这篇文档，大家已经能够非常容易的编写 Egret 命令行插件了，有任何问题大家到论坛上提问即可，白鹭官方会有专职人员为你解答。