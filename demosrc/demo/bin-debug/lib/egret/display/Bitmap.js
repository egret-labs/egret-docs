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
/// <reference path="../context/renderer/RenderFilter.ts"/>
/// <reference path="../context/renderer/RendererContext.ts"/>
/// <reference path="DisplayObject.ts"/>
/// <reference path="SpriteSheet.ts"/>
/// <reference path="Texture.ts"/>
/// <reference path="../geom/Rectangle.ts"/>
var egret;
(function (egret) {
    /**
    * @class egret.Bitmap
    * @classdesc
    * Bitmap 类表示用于表示位图图像的显示对象。
    * @extends egret.DisplayObject
    */
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap(texture) {
            _super.call(this);
            /**
            * 单个Bitmap是否开启DEBUG模式
            * @member {boolean} egret.Bitmap#debug
            */
            this.debug = false;
            /**
            * debug边框颜色，默认值为红色
            * @member {number} egret.Bitmap#debugColor
            */
            this.debugColor = 0xff0000;
            /**
            * 确定位图填充尺寸的方式。默认值：BitmapFillMode.SCALE。
            * 设置为 BitmapFillMode.REPEAT时，位图将重复以填充区域。
            * 设置为 BitmapFillMode.SCALE时，位图将拉伸以填充区域。
            * @member {egret.Texture} egret.Bitmap#fillMode
            */
            this.fillMode = "scale";
            if (texture) {
                this.texture = texture;
            }
        }
        Bitmap.prototype._render = function (renderContext) {
            var texture = this.texture;
            if (!texture) {
                this._texture_to_render = null;
                return;
            }
            this._texture_to_render = texture;
            var destW = this._hasWidthSet ? this._explicitWidth : texture._textureWidth;
            var destH = this._hasHeightSet ? this._explicitHeight : texture._textureHeight;
            Bitmap._drawBitmap(renderContext, destW, destH, this);
        };

        Bitmap._drawBitmap = function (renderContext, destW, destH, thisObject) {
            var texture = thisObject._texture_to_render;
            if (!texture) {
                return;
            }
            if (thisObject.fillMode == "scale") {
                if (thisObject.scale9Grid) {
                    egret.RenderFilter.getInstance().drawScale9GridImage(renderContext, thisObject, thisObject.scale9Grid, destW, destH);
                } else {
                    var w = texture._textureWidth;
                    var h = texture._textureHeight;
                    var offsetX = Math.round(texture._offsetX * destW / w);
                    var offsetY = Math.round(texture._offsetY * destH / h);
                    egret.RenderFilter.getInstance().drawImage(renderContext, thisObject, texture._startX, texture._startY, w, h, offsetX, offsetY, destW, destH);
                }
            } else {
                egret.RenderFilter.getInstance().drawRepeatImage(renderContext, thisObject, destW, destH);
            }
        };

        /**
        * @see egret.DisplayObject.measureBounds
        * @returns {egret.Rectangle}
        * @private
        */
        Bitmap.prototype._measureBounds = function () {
            var texture = this.texture;
            if (!texture) {
                return _super.prototype._measureBounds.call(this);
            }
            var x = texture._offsetX;
            var y = texture._offsetY;
            var w = texture._textureWidth;
            var h = texture._textureHeight;
            return egret.Rectangle.identity.initialize(x, y, w, h);
        };
        Bitmap.debug = false;
        return Bitmap;
    })(egret.DisplayObject);
    egret.Bitmap = Bitmap;
})(egret || (egret = {}));
