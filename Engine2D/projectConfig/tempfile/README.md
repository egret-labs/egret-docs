### 概述

开发者在调试阶段和发布阶段可能会使用不同的入口文件，egret 提供入口文件模板，来实现此功能。

### 使用说明

- 新建的 egret 项目默认使用入口文件模板功能，此时在项目配置文件`egretProperties.json`中有`template`字段。删除该字段，将不使用入口文件模板功能。

- 如果使用入口文件模板功能，在项目的根目录中会自动生成`template/debug`和`template/web`两个文件夹。其中`template/debug`文件夹包含 debug 时候使用的`index.html`，`template/web`文件夹包含publish时候使用的`index.html`。

- `egret build`命令会将`template/debug`中的`index.html`拷贝到项目根目录覆盖原有`index.html`。`egret publish`命令会将`template/web`中的`index.html`拷贝到发布目录。

- 开发者可以根据不同需求更改模板，比如 publish 后的项目需要一个loading背景图，那么就可以更改`template/web`文件夹下的`index.html`文件来实现。