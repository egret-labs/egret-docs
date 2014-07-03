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
    * @class egret.Rect
    * @classdesc
    * 矩形绘图元素。此组件可响应鼠标事件。
    * @extends egret.UIComponent
    */
    var Rect = (function (_super) {
        __extends(Rect, _super);
        /**
        * 构造函数
        * @method egret.Rect#constructor
        */
        function Rect() {
            _super.call(this);
            this._fillColor = 0xFFFFFF;
            this._fillAlpha = 1;
            this._strokeColor = 0x444444;
            this._strokeAlpha = 0;
            this._strokeWeight = 1;
            this.touchChildren = false;
        }
        Object.defineProperty(Rect.prototype, "graphics", {
            get: function () {
                if (!this._graphics) {
                    this._graphics = new egret.Graphics();
                }
                return this._graphics;
            },
            enumerable: true,
            configurable: true
        });

        Rect.prototype._render = function (renderContext) {
            if (this._graphics)
                this._graphics._draw(renderContext);
            _super.prototype._render.call(this, renderContext);
        };

        Object.defineProperty(Rect.prototype, "fillColor", {
            /**
            * 填充颜色
            * @member egret.Rect#fillColor
            */
            get: function () {
                return this._fillColor;
            },
            set: function (value) {
                if (this._fillColor == value)
                    return;
                this._fillColor = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "fillAlpha", {
            /**
            * 填充透明度,默认值为0。
            * @member egret.Rect#fillAlpha
            */
            get: function () {
                return this._fillAlpha;
            },
            set: function (value) {
                if (this._fillAlpha == value)
                    return;
                this._fillAlpha = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "strokeColor", {
            /**
            * 边框颜色,注意：当strokeAlpha为0时，不显示边框。
            * @member egret.Rect#strokeColor
            */
            get: function () {
                return this._strokeColor;
            },
            set: function (value) {
                if (this._strokeColor == value)
                    return;
                this._strokeColor = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "strokeAlpha", {
            /**
            * 边框透明度，默认值为0。
            * @member egret.Rect#strokeAlpha
            */
            get: function () {
                return this._strokeAlpha;
            },
            set: function (value) {
                if (this._strokeAlpha == value)
                    return;
                this._strokeAlpha = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "strokeWeight", {
            /**
            * 边框粗细(像素),注意：当strokeAlpha为0时，不显示边框。
            * @member egret.Rect#strokeWeight
            */
            get: function () {
                return this._strokeWeight;
            },
            set: function (value) {
                if (this._strokeWeight == value)
                    return;
                this._strokeWeight = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        /**
        * @see egret.DisplayObject.measureBounds
        * @returns {Rectangle}
        * @private
        */
        Rect.prototype._measureBounds = function () {
            var bounds = _super.prototype._measureBounds.call(this);
            var w = this.width;
            var h = this.height;
            var x = 0;
            var y = 0;
            if (x < bounds.x) {
                bounds.x = x;
            }
            if (y < bounds.y) {
                bounds.y = y;
            }
            if (x + w > bounds.right) {
                bounds.right = x + w;
            }
            if (y + h > bounds.bottom) {
                bounds.bottom = y + h;
            }
            return bounds;
        };

        /**
        * @method egret.Rect#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        Rect.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledWidth);
            var g = this.graphics;
            g.clear();
            g.beginFill(this._fillColor, this._fillAlpha);
            if (this._strokeAlpha > 0) {
                g.lineStyle(this._strokeWeight, this._strokeColor, this._strokeAlpha, true, "normal", "square", "miter");
            }
            g.drawRect(0, 0, unscaledWidth, unscaledHeight);
            g.endFill();
        };
        return Rect;
    })(egret.UIComponent);
    egret.Rect = Rect;
})(egret || (egret = {}));
