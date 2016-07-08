#概述
DragonBonesPro4.2 开放了插件规范，并实现了导入插件的管理，目的是让用户可以方便的将任意格式动画数据通过插件导入到DragbonesPro中来进行二次编辑，并生成DragonBones格式动画，从而在包括Egret在内的任意的支持DragonBones的引擎中运行动画。本文会介绍编写插件的基本规范，以及目前版本中如何编写一个DragonBones的导入插件。

#插件命名规范
插件统一扩展名为expl，本质是个zip包，内部至少需要包含*.excfg，*.png，*.js，3个文件。其中：
- *.excfg为json格式的插件配置文件。
- *.png为插件的图标，标准尺寸为32x32。
- *.js文件为插件的主脚本文件。不同类型的插件，js脚本的内容标准可能不同。例如DBPro的导入插件，需要继承egretPluginSdk.js中的DBImportTemplate类，重写所有的方法。（注：egretPluginSdk 是用于编写egret工具链中可扩展插件的框架，目前只包含DBPro的导入插件需要的基础类和方法。egretPluginSdk.js在DragonBonesPro安装目录下的plugins目录下）

####插件编写规范
*.excfg 文件格式具体如下，例如Spine插件
``` TypeScript
{
    "name":"Spine 2.x Importer", //插件的名称
    "path":["spine.js"],//插件的主脚本以及包含脚本
    "description":"Spine 2.x Importer can import Spine 2.x animation data to DragonBonesPro",//插件的描述
    "author":"Egret Engine",//插件的开发者
    "version":"1.0.0",//插件的版本号
    "icon":"icon.png"//插件的图标(32*32)
}
```

*.js文件格式具体如下，例如Spine导入插件，继承的是egretPluginSdk.js中DBImportTemplate类。DBImportTemplate 类格式如下：
``` TypeScript
var DBImportTemplate = (function () {
    function DBImportTemplate() {
        this._type = "DBImportTemplate";
    }
    /**支持导入的数据文件的扩展名**/
    DBImportTemplate.prototype.dataFileExtension = function () {
        return ["*"];
    };
    /**支持导入的数据文件的描述**/
    DBImportTemplate.prototype.dataFileDescription = function () {
        return "";
    };
    /**纹理集数据文件扩展名**/
    DBImportTemplate.prototype.textureAtlasDataFileExtension = function () {
        return ["*"];
    };
    /**查验导入数据是否支持纹理集**/
    DBImportTemplate.prototype.isSupportTextureAtlas = function () {
        return false;
    };
    /**查验导入数据是否支持本解析器**/
    DBImportTemplate.prototype.checkDataValid = function (data) {
        return true;
    };
    /**导入数据的解析**/
    DBImportTemplate.prototype.convertToDBData = function (data) {
        return data;
    };
    /**纹理集的解析**/
    DBImportTemplate.prototype.convertToDBTextureAtlasData = function (data) {
        return data;
    };
    DBImportTemplate.prototype.type = function () {
        return this._type;
    };
    return DBImportTemplate;
})();
```

需要注意的是，*.js的入口类必须命名为main，例如Spine数据导入插件大致内容如下：
``` TypeScript
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var main = (function (_super) {
    __extends(main, _super);
    function main() {
        _super.apply(this, arguments);       
    }
    main.prototype.dataFileExtension = function () {
        return ["Json"];
    };
    main.prototype.dataFileDescription = function () {
        return "Spine data";
    };
    main.prototype.textureAtlasDataFileExtension = function () {
        return ["atlas", "texture"];
    };
    main.prototype.isSupportTextureAtlas = function () {
        return true;
    };
    main.prototype.convertToDBTextureAtlasData = function (data) {
        var dbTexture = {};
        return JSON.stringify(dbTexture);
    };
    main.prototype.checkDataValid = function (spineJson) {
        return false;
    };
    main.prototype.convertToDBData = function (spineJson) {
        var DBJson = {};
        try {
          ...
        }
        catch (e) {
        }
        return JSON.stringify(DBJson);
    };
    return main;
})(DBImportTemplate);
```
注意：为了保证插件的安全性，开发者必须要在代码中加上try catch。

最后，DragonBonesPro中自带的两个插件就在安装目录的plugins文件夹中，“Cocos 1.x Importer.expl” 和“Spine 2.x Importer.expl”可以做为完整的例子用于参考。

#插件的安装使用：
目前DragonBonesPro插件的安装方式是在帮助菜单下打开插件管理面板，点击右上角安装插件，选择expl格式的文件，即可完成安装。接下来的版本会支持双击安装。