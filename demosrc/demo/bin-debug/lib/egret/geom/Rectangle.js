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
/// <reference path="../utils/HashObject.ts"/>
var egret;
(function (egret) {
    /**
    * @class egret.Rectangle
    * @classdesc
    * 矩形类
    * @extends egret.HashObject
    */
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(x, y, width, height) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            if (typeof width === "undefined") { width = 0; }
            if (typeof height === "undefined") { height = 0; }
            _super.call(this);
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Object.defineProperty(Rectangle.prototype, "right", {
            /**
            * x和width的和
            * @member {number} egret.Rectangle#right
            */
            get: function () {
                return this.x + this.width;
            },
            set: function (value) {
                this.width = value - this.x;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rectangle.prototype, "bottom", {
            /**
            * y和height的和
            * @member {number} egret.Rectangle#bottom
            */
            get: function () {
                return this.y + this.height;
            },
            set: function (value) {
                this.height = value - this.y;
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 举行类初始化赋值，开发者尽量调用此方法复用Rectangle对象，而不是每次需要的时候都重新创建
        * @method egret.Rectangle#initialize
        * @param x {number}
        * @param y {number}
        * @param width {number}
        * @param height {number}
        * @returns {egret.Rectangle}
        */
        Rectangle.prototype.initialize = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        };

        /**
        * 判断某坐标点是否存在于矩形内
        * @method egret.Rectangle#contains
        * @param x {number}
        * @param y {number}
        * @returns {boolean}
        */
        Rectangle.prototype.contains = function (x, y) {
            return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
        };

        /**
        * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
        * @method egret.Rectangle#intersects
        * @param toIntersect {egret.Rectangle} 要与此 Rectangle 对象比较的 Rectangle 对象。
        * @returns {boolean}
        */
        Rectangle.prototype.intersects = function (toIntersect) {
            if (this.contains(toIntersect.x, toIntersect.y))
                return true;
            if (this.contains(toIntersect.x, toIntersect.bottom))
                return true;
            if (this.contains(toIntersect.right, toIntersect.y))
                return true;
            if (this.contains(toIntersect.right, toIntersect.bottom))
                return true;
            return false;
        };

        /**
        * 克隆矩形对象
        * @method egret.Rectangle#clone
        *
        */
        Rectangle.prototype.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };

        Rectangle.identity = new Rectangle(0, 0, 0, 0);
        return Rectangle;
    })(egret.HashObject);
    egret.Rectangle = Rectangle;
})(egret || (egret = {}));
