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
    * @class egret.ClassFactory
    * @classdesc
    * @extends egret.HashObject
    */
    var ClassFactory = (function (_super) {
        __extends(ClassFactory, _super);
        /**
        * @method egret.ClassFactory#constructor
        * @class egret.ClassFactory
        * @classdesc
        * ClassFactory 实例是一个“工厂对象”，Egret 可用其生成其他类的实例，每个实例拥有相同的属性。
        * @param generator {any} newInstance() 方法根据工厂对象生成对象时使用的 Class。
        */
        function ClassFactory(generator) {
            if (typeof generator === "undefined") { generator = null; }
            _super.call(this);
            this.generator = generator;
        }
        /**
        * 生产一个新的实例
        * @method egret.egret#newInstance
        * @returns {any}
        */
        ClassFactory.prototype.newInstance = function () {
            var instance = new this.generator();
            return instance;
        };
        return ClassFactory;
    })(egret.HashObject);
    egret.ClassFactory = ClassFactory;
})(egret || (egret = {}));
