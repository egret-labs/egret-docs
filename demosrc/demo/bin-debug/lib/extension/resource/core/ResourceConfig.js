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
/// <reference path="../Resource.ts"/>
/// <reference path="ResourceItem.ts"/>
var RES;
(function (RES) {
    /**
    * @class RES.ResourceConfig
    * @classdesc
    */
    var ResourceConfig = (function () {
        function ResourceConfig() {
            /**
            * 一级键名字典
            */
            this.keyMap = {};
            /**
            * 加载组字典
            */
            this.groupDic = {};
        }
        /**
        * 根据组名获取组加载项列表
        * @method RES.ResourceConfig#getGroupByName
        * @param name {string} 组名
        * @returns {Array<egret.ResourceItem>}
        */
        ResourceConfig.prototype.getGroupByName = function (name) {
            var group = new Array();
            if (!this.groupDic[name])
                return group;
            var list = this.groupDic[name];
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var obj = list[i];
                group.push(this.parseResourceItem(obj));
            }
            return group;
        };

        /**
        * 根据组名获取原始的组加载项列表
        * @method RES.ResourceConfig#getRawGroupByName
        * @param name {string} 组名
        * @returns {Array<any>}
        */
        ResourceConfig.prototype.getRawGroupByName = function (name) {
            if (this.groupDic[name])
                return this.groupDic[name];
            return [];
        };

        /**
        * 创建自定义的加载资源组,注意：此方法仅在资源配置文件加载完成后执行才有效。
        * 可以监听ResourceEvent.CONFIG_COMPLETE事件来确认配置加载完成。
        * @method RES.ResourceConfig#createGroup
        * @param name {string} 要创建的加载资源组的组名
        * @param keys {egret.Array<string>} 要包含的键名列表，key对应配置文件里的name属性或一个资源组名。
        * @param override {boolean} 是否覆盖已经存在的同名资源组,默认false。
        * @returns {boolean}
        */
        ResourceConfig.prototype.createGroup = function (name, keys, override) {
            if (typeof override === "undefined") { override = false; }
            if ((!override && this.groupDic[name]) || !keys || keys.length == 0)
                return false;
            var groupDic = this.groupDic;
            var group = [];
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                var g = groupDic[key];
                if (g) {
                    var len = g.length;
                    for (var j = 0; j < len; j++) {
                        var item = g[j];
                        if (group.indexOf(item) == -1)
                            group.push(item);
                    }
                } else {
                    item = this.keyMap[key];
                    if (item && group.indexOf(item) == -1)
                        group.push(item);
                }
            }
            if (group.length == 0)
                return false;
            this.groupDic[name] = group;
            return true;
        };

        /**
        * 解析一个配置文件
        * @method RES.ResourceConfig#parseConfig
        * @param data {any} 配置文件数据
        * @param folder {string} 加载项的路径前缀。
        */
        ResourceConfig.prototype.parseConfig = function (data, folder) {
            if (!data)
                return;
            var resources = data["resources"];
            if (resources) {
                var length = resources.length;
                for (var i = 0; i < length; i++) {
                    var item = resources[i];
                    item.url = folder + item.url;
                    if (!this.keyMap[item.name])
                        this.keyMap[item.name] = item;
                }
            }
            var groups = data["groups"];
            if (groups) {
                length = groups.length;
                for (i = 0; i < length; i++) {
                    var group = groups[i];
                    var list = [];
                    var keys = group.keys.split(",");
                    var l = keys.length;
                    for (var j = 0; j < l; j++) {
                        var name = this.trim(keys[j]);
                        item = this.keyMap[name];
                        if (item && list.indexOf(item) == -1) {
                            list.push(item);
                        }
                    }
                    this.groupDic[group.name] = list;
                }
            }
        };

        /**
        * 获取加载项类型。
        * @method RES.ResourceConfig#getType
        * @param name {string} 对应配置文件里的name属性。
        * @returns {string}
        */
        ResourceConfig.prototype.getType = function (name) {
            var data = this.keyMap[name];
            return data ? data.type : "";
        };

        ResourceConfig.prototype.getRawResourceItem = function (name) {
            return this.keyMap[name];
        };

        /**
        * 获取加载项信息对象
        * @method RES.ResourceConfig#getResourceItem
        * @param name {string} 对应配置文件里的name属性。
        * @returns {egret.ResourceItem}
        */
        ResourceConfig.prototype.getResourceItem = function (name) {
            var data = this.keyMap[name];
            if (data)
                return this.parseResourceItem(data);
            return null;
        };

        /**
        * 转换Object数据为ResourceItem对象
        */
        ResourceConfig.prototype.parseResourceItem = function (data) {
            var resItem = new RES.ResourceItem(data.name, data.url, data.type);
            resItem.data = data;
            return resItem;
        };

        /**
        * 去掉字符串两端所有连续的不可见字符。
        * 注意：若目标字符串为null或不含有任何可见字符,将输出空字符串""。
        * @param str 要格式化的字符串
        */
        ResourceConfig.prototype.trim = function (str) {
            if (!str)
                return "";
            var strChar = str.charAt(0);
            while (str.length > 0 && (strChar == " " || strChar == "\t" || strChar == "\n" || strChar == "\r" || strChar == "\f")) {
                str = str.substr(1);
                strChar = str.charAt(0);
            }
            strChar = str.charAt(str.length - 1);
            while (str.length > 0 && (strChar == " " || strChar == "\t" || strChar == "\n" || strChar == "\r" || strChar == "\f")) {
                str = str.substr(0, str.length - 1);
                strChar = str.charAt(str.length - 1);
            }
            return str;
        };
        return ResourceConfig;
    })();
    RES.ResourceConfig = ResourceConfig;
})(RES || (RES = {}));
