---
title: 使用自定义字体
---

`注意：字体文件需要通过资源加载后才可以使用。`

Native 0.1.13及之前的版本：设置egret.TextField的fontFamily属性为字体文件的相对路径。

Native 0.1.14及之后的版本[示例Demo](http://tool.egret-labs.org/DocZip/native/manual/fontFamily/MyFont.zip)：

- 手动声明注册自定义字体的方法

```typeScript
declare namespace egret {
  export function registerFontMapping(name: string, path: string): void;
}
```

- 注册字体文件

```typeScript
// 注册字体文件需要在引擎启动（egret.runEgret）后执行
egret.registerFontMapping("myFont", "resource/assets/myFont.ttf");
```

- 使用自定义字体

```typeScript
textfield.fontFamily = "myFont";
```
