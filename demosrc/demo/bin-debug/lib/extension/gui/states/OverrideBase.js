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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    /**
    * @class egret.OverrideBase
    * @classdesc
    * OverrideBase 类是视图状态所用的 override 类的基类。
    * @extends egret.HashObject
    * @implements egret.IOverride
    */
    var OverrideBase = (function (_super) {
        __extends(OverrideBase, _super);
        /**
        * @method egret.OverrideBase#constructor
        */
        function OverrideBase() {
            _super.call(this);
        }
        /**
        * @method egret.OverrideBase#initialize
        * @param parent {IStateClient}
        */
        OverrideBase.prototype.initialize = function (parent) {
        };

        /**
        * @method egret.OverrideBase#apply
        * @param parent {IContainer}
        */
        OverrideBase.prototype.apply = function (parent) {
        };

        /**
        * @method egret.OverrideBase#remove
        * @param parent {IContainer}
        */
        OverrideBase.prototype.remove = function (parent) {
            if (parent === null) {
            }
        };

        /**
        * 从对象初始化，这是一个便利方法
        * @method egret.OverrideBase#initializeFromObject
        * @param properties {any}
        * @returns {any}
        */
        OverrideBase.prototype.initializeFromObject = function (properties) {
            for (var p in properties) {
                this[p] = properties[p];
            }
            return this;
        };
        return OverrideBase;
    })(egret.HashObject);
    egret.OverrideBase = OverrideBase;
})(egret || (egret = {}));
