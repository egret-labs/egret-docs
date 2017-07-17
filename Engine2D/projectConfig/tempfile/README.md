## 入口文件模板

------------------

### 概述
在`Egret 5.0.1`更新中，我们提供了入口文件模板，模板分为 debug 和 publish 两部分。

### 详细说明
- 新建一个`5.0.1`以上版本的项目后，可以看到项目中有`template/debug`和`template/web`两个文件夹，其中`template/debug`文件夹包含 debug 时候使用的`index.html`，`template/web`文件夹包含publish时候使用的`index.html`。

- `egret build`命令会将`template/debug`中的`index.html`拷贝到项目根目录覆盖原有`index.html`。`egret publish`命令会将`template/web`中的`index.html`拷贝到发布目录。

- 开发者可以根据不同需求更改模板，比如 publish 后的项目需要一个loading背景图，那么就可以更改`template/web`文件夹下的`index.html`文件来实现。

------------------

### 旧版本兼容
- 旧版本的项目升级到`5.0.1`以上后，不会生成模板文件，项目依旧使用旧版本结构，命令行依旧兼容旧版本项目结构。

- 对于新版本创建的项目，如果开发者比较习惯使用旧版本方式，可以手动将项目中`egretProperties.json`中`template`字段删除，命令行会根据该字段决定使用新版还是旧版。
