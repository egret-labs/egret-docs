/**
* Copyright (c) 2014,Egret-Labs.org
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the Egret-Labs.org nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var egret;
(function (egret) {
    /**
    * 在window上需要读取的命名空间属性列表
    */
    egret.__moduleNameList = ["egret", "RES", "dragonBones"];

    /**
    * 需要重新刷新类名的标志
    */
    egret.__invalidateModuleFlag = true;

    var __functionNameCache = {};

    /**
    * 返回一个对象的完全限定名<br/>
    * @param value 需要完全限定类名称的对象，可以将任何 TypeScript / JavaScript值传递给此方法，包括所有可用的TypeScript / JavaScript类型、对象实例、原始类型（如number）和类对象
    * @returns {string} 包含完全限定类名称的字符串<br />
    * @example
    *  egret.getQualifiedClassName(egret.DisplayObject) //返回 "egret.DisplayObject"
    */
    function getQualifiedClassName(value) {
        var constructorFunction = value.prototype ? value.prototype.constructor : value.__proto__.constructor;
        var key = constructorFunction.toString();
        var className = __functionNameCache[key];
        if (className) {
            return className;
        }
        if (egret.__invalidateModuleFlag) {
            updateModules();
            egret.__invalidateModuleFlag = false;
            className = __functionNameCache[key];
            if (className) {
                return className;
            }
        }
        __functionNameCache[key] = className = getFunctionName(constructorFunction);
        return className;
    }
    egret.getQualifiedClassName = getQualifiedClassName;

    function getFunctionName(constructorFunction) {
        var constructorString = constructorFunction.toString();
        var index = constructorString.indexOf("(");
        return constructorString.substring(9, index);
    }

    function updateModules() {
        var list = egret.__moduleNameList;
        var length = list.length;
        for (var i = 0; i < length; i++) {
            var key = list[i];
            var value = __global[key];
            if (value && typeof (value) == "object" && value.__proto__ && getFunctionName(value.__proto__.constructor) == "Object") {
                setModuleName(value, key);
            }
        }
    }

    function setModuleName(ns, name) {
        for (var key in ns) {
            var value = ns[key];
            var type = typeof (value);
            if (type == "function") {
                if (!value.prototype) {
                    continue;
                }
                var classKey = value.toString();
                if (!__functionNameCache[classKey]) {
                    __functionNameCache[classKey] = name + "." + getFunctionName(value);
                }
            } else if (type == "object" && !(value instanceof Array)) {
                setModuleName(value, name + "." + key);
            }
        }
    }
})(egret || (egret = {}));

var __global = __global || this;
