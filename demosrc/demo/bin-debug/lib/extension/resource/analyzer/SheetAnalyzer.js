/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../egret/display/SpriteSheet.ts"/>
/// <reference path="../../../egret/display/Texture.ts"/>
/// <reference path="../../../egret/events/Event.ts"/>
/// <reference path="../../../egret/net/URLLoader.ts"/>
/// <reference path="../../../egret/net/URLLoaderDataFormat.ts"/>
/// <reference path="../Resource.ts"/>
/// <reference path="AnalyzerBase.ts"/>
/// <reference path="BinAnalyzer.ts"/>
/// <reference path="../core/ResourceItem.ts"/>
var RES;
(function (RES) {
    /**
    * SpriteSheet解析器
    */
    var SheetAnalyzer = (function (_super) {
        __extends(SheetAnalyzer, _super);
        function SheetAnalyzer() {
            _super.call(this);
            this.sheetMap = {};
            this._dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        /**
        * @inheritDoc
        */
        SheetAnalyzer.prototype.getRes = function (name) {
            var res = this.fileDic[name];
            if (!res) {
                var prefix = RES.AnalyzerBase.getStringPrefix(name);
                res = this.fileDic[prefix];
                if (res) {
                    var tail = RES.AnalyzerBase.getStringTail(name);
                    res = res.getTexture(tail);
                }
            }
            return res;
        };

        /**
        * 一项加载结束
        */
        SheetAnalyzer.prototype.onLoadFinish = function (event) {
            var loader = (event.target);
            var data = this.resItemDic[loader.hashCode];
            delete this.resItemDic[loader.hashCode];
            this.recycler.push(loader);
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                this.analyzeData(resItem, loader.data);
            }
            if (typeof (loader.data) == "string") {
                this._dataFormat = egret.URLLoaderDataFormat.TEXTURE;
                this.loadFile(resItem, compFunc, data.thisObject);
                this._dataFormat = egret.URLLoaderDataFormat.TEXT;
            } else {
                compFunc.call(data.thisObject, resItem);
            }
        };

        /**
        * 解析并缓存加载成功的数据
        */
        SheetAnalyzer.prototype.analyzeData = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            var config;
            if (typeof (data) == "string") {
                try  {
                    var str = data;
                    config = JSON.parse(str);
                } catch (e) {
                }
                if (!config) {
                    return;
                }
                this.sheetMap[name] = config;
                resItem.loaded = false;
                resItem.url = this.getRelativePath(resItem.url, config["file"]);
            } else {
                var texture = data;
                config = this.sheetMap[name];
                delete this.sheetMap[name];
                if (texture) {
                    var spriteSheet = this.parseSpriteSheet(texture, config);
                    this.fileDic[name] = spriteSheet;
                }
            }
        };

        SheetAnalyzer.prototype.getRelativePath = function (url, file) {
            url = url.split("\\").join("/");
            var index = url.lastIndexOf("/");
            if (index != -1) {
                url = url.substring(0, index + 1) + file;
            } else {
                url = file;
            }
            return url;
        };

        SheetAnalyzer.prototype.parseSpriteSheet = function (texture, data) {
            var frames = data.frames;
            if (!frames) {
                return;
            }
            var spriteSheet = new egret.SpriteSheet(texture._bitmapData);
            for (var name in frames) {
                var config = frames[name];
                spriteSheet.createTexture(name, config.x, config.y, config.w, config.h);
            }
            return spriteSheet;
        };
        return SheetAnalyzer;
    })(RES.BinAnalyzer);
    RES.SheetAnalyzer = SheetAnalyzer;
})(RES || (RES = {}));
