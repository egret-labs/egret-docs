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
            var textureWidth = texture._textureWidth;
            var textureHeight = texture._textureHeight;
            if (thisObject.fillMode == "scale") {
                var s9g = thisObject.scale9Grid;
                if (s9g && textureWidth - s9g.width < destW && textureHeight - s9g.height < destH) {
                    Bitmap.drawScale9GridImage(renderContext, thisObject, thisObject.scale9Grid, destW, destH);
                } else {
                    var offsetX = texture._offsetX;
                    var offsetY = texture._offsetY;
                    var actualWidth = texture._actualWidth || textureWidth;
                    var actualHeight = texture._actualHeight || textureHeight;
                    if (thisObject._hasWidthSet) {
                        var scaleX = destW / textureWidth;
                        offsetX = Math.round(offsetX * scaleX);
                        destW = Math.round(actualWidth * scaleX);
                    } else {
                        destW = actualWidth;
                    }
                    if (thisObject._hasHeightSet) {
                        var scaleY = destH / textureHeight;
                        offsetY = Math.round(offsetY * scaleY);
                        destH = Math.round(actualHeight * scaleY);
                    } else {
                        destH = actualHeight;
                    }

                    egret.RenderFilter.getInstance().drawImage(renderContext, thisObject, texture._startX, texture._startY, actualWidth, actualHeight, offsetX, offsetY, destW, destH);
                }
            } else {
                Bitmap.drawRepeatImage(renderContext, thisObject, destW, destH);
            }
        };

        /**
        * 绘制平铺位图
        */
        Bitmap.drawRepeatImage = function (renderContext, data, destWidth, destHeight) {
            var texture = data._texture_to_render;
            if (!texture) {
                return;
            }
            var textureWidth = texture._textureWidth;
            var textureHeight = texture._textureHeight;
            var sourceX = texture._startX;
            var sourceY = texture._startY;
            var sourceWidth = texture._actualWidth || textureWidth;
            var sourceHeight = texture._actualHeight || textureHeight;
            var destX = texture._offsetX;
            var destY = texture._offsetY;

            var renderFilter = egret.RenderFilter.getInstance();
            for (var x = destX; x < destWidth; x += textureWidth) {
                for (var y = destY; y < destHeight; y += textureHeight) {
                    var destW = Math.min(sourceWidth, destWidth - x);
                    var destH = Math.min(sourceHeight, destHeight - y);
                    renderFilter.drawImage(renderContext, data, sourceX, sourceY, sourceWidth, sourceHeight, x, y, destW, destH);
                }
            }
        };

        /**
        * 绘制九宫格位图
        */
        Bitmap.drawScale9GridImage = function (renderContext, data, scale9Grid, destWidth, destHeight) {
            var texture = data._texture_to_render;
            if (!texture || !scale9Grid) {
                return;
            }
            var renderFilter = egret.RenderFilter.getInstance();
            var textureWidth = texture._textureWidth;
            var textureHeight = texture._textureHeight;
            var sourceX = texture._startX;
            var sourceY = texture._startY;
            var sourceWidth = texture._actualWidth || textureWidth;
            var sourceHeight = texture._actualHeight || textureHeight;
            var destX = texture._offsetX;
            var destY = texture._offsetY;

            var s9g = egret.Rectangle.identity.initialize(scale9Grid.x - Math.round(destX), scale9Grid.y - Math.round(destX), scale9Grid.width, scale9Grid.height);
            var roundedDrawX = Math.round(destX);
            var roundedDrawY = Math.round(destY);
            destWidth -= textureWidth - sourceWidth;
            destHeight -= textureHeight - sourceHeight;

            //防止空心的情况出现。
            if (s9g.y == s9g.bottom) {
                if (s9g.bottom < sourceHeight)
                    s9g.bottom++;
                else
                    s9g.y--;
            }
            if (s9g.x == s9g.right) {
                if (s9g.right < sourceWidth)
                    s9g.right++;
                else
                    s9g.x--;
            }

            var sourceX2 = sourceX + s9g.x;
            var sourceX3 = sourceX + s9g.right;
            var sourceRightW = sourceWidth - s9g.right;
            var sourceY2 = sourceY + s9g.y;
            var sourceY3 = sourceY + s9g.bottom;
            var sourceBottomH = sourceHeight - s9g.bottom;

            var destX1 = roundedDrawX + s9g.x;
            var destScaleGridBottom = destHeight - (sourceHeight - s9g.bottom);
            var destScaleGridRight = destWidth - (sourceWidth - s9g.right);

            renderFilter.drawImage(renderContext, data, sourceX, sourceY, s9g.x, s9g.y, roundedDrawX, 0, s9g.x, s9g.y);
            renderFilter.drawImage(renderContext, data, sourceX2, sourceY, s9g.width, s9g.y, destX1, 0, destScaleGridRight - s9g.x, s9g.y);
            renderFilter.drawImage(renderContext, data, sourceX3, sourceY, sourceRightW, s9g.y, roundedDrawX + destScaleGridRight, 0, destWidth - destScaleGridRight, s9g.y);
            renderFilter.drawImage(renderContext, data, sourceX, sourceY2, s9g.x, s9g.height, roundedDrawX, s9g.y, s9g.x, destScaleGridBottom - s9g.y);
            renderFilter.drawImage(renderContext, data, sourceX2, sourceY2, s9g.width, s9g.height, destX1, s9g.y, destScaleGridRight - s9g.x, destScaleGridBottom - s9g.y);
            renderFilter.drawImage(renderContext, data, sourceX3, sourceY2, sourceRightW, s9g.height, roundedDrawX + destScaleGridRight, s9g.y, destWidth - destScaleGridRight, destScaleGridBottom - s9g.y);
            renderFilter.drawImage(renderContext, data, sourceX, sourceY3, s9g.x, sourceBottomH, roundedDrawX, destScaleGridBottom, s9g.x, destHeight - destScaleGridBottom);
            renderFilter.drawImage(renderContext, data, sourceX2, sourceY3, s9g.width, sourceBottomH, destX1, destScaleGridBottom, destScaleGridRight - s9g.x, destHeight - destScaleGridBottom);
            renderFilter.drawImage(renderContext, data, sourceX3, sourceY3, sourceRightW, sourceBottomH, roundedDrawX + destScaleGridRight, destScaleGridBottom, destWidth - destScaleGridRight, destHeight - destScaleGridBottom);
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
