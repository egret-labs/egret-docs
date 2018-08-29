在 Egret 5.2.x 项目根目录下，有个 `template` 文件夹，里面有个2个目录

### web
如果您项目的配置文件 `egretProperties.json` 里有 `template` 字段，那么发布 `Html5` 项目时，就会使用该目录下的 `index.html` 来作为入口文件。

### runtime
发布原生项目的配置文件



### 版本变动
`5.0.8`：版本升级脚本会删除`template/debug`文件夹，`5.0.8`以上版本引擎将不使用`template/debug/index.html`作为模板，开发者直接修改项目下 index.html 文件即可。

`5.0.1`：`template/debug` 为调试使用, `template/web` 为发布使用