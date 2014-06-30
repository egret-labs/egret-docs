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
/// <reference path="../MainContext.ts"/>
/// <reference path="RenderFilter.ts"/>
/// <reference path="RendererContext.ts"/>
/// <reference path="../../display/Texture.ts"/>
/// <reference path="../../geom/Matrix.ts"/>
/// <reference path="../../text/TextField.ts"/>
/// <reference path="../../utils/getTimer.ts"/>
var egret;
(function (egret) {
    /**
    * @class egret.HTML5CanvasRenderer
    * @classdesc
    * @extends egret.RendererContext
    */
    var HTML5CanvasRenderer = (function (_super) {
        __extends(HTML5CanvasRenderer, _super);
        function HTML5CanvasRenderer(canvas) {
            this.canvas = canvas;
            this.canvasContext = canvas.getContext("2d");
            var f = this.canvasContext.setTransform;
            var that = this;
            this.canvasContext.setTransform = function (a, b, c, d, tx, ty) {
                that._matrixA = a;
                that._matrixB = b;
                that._matrixC = c;
                that._matrixD = d;
                that._matrixTx = tx;
                that._matrixTy = ty;
                f.call(that.canvasContext, a, b, c, d, tx, ty);
            };
            this._matrixA = 1;
            this._matrixB = 0;
            this._matrixC = 0;
            this._matrixD = 1;
            this._matrixTx = 0;
            this._matrixTy = 0;

            this._transformTx = 0;
            this._transformTy = 0;
            _super.call(this);
        }
        HTML5CanvasRenderer.prototype.clearScreen = function () {
            this.setTransform(egret.Matrix.identity.identity());
            var list = egret.RenderFilter.getInstance().getDrawAreaList();
            for (var i = 0, l = list.length; i < l; i++) {
                var area = list[i];
                this.clearRect(area.x + this._transformTx, area.y + this._transformTy, area.width, area.height);
            }
            this.renderCost = 0;
        };

        HTML5CanvasRenderer.prototype.clearRect = function (x, y, w, h) {
            this.canvasContext.clearRect(x, y, w, h);
        };

        HTML5CanvasRenderer.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight) {
            sourceX = sourceX / egret.MainContext.instance.rendererContext.texture_scale_factor;
            sourceY = sourceY / egret.MainContext.instance.rendererContext.texture_scale_factor;
            sourceWidth = sourceWidth / egret.MainContext.instance.rendererContext.texture_scale_factor;
            sourceHeight = sourceHeight / egret.MainContext.instance.rendererContext.texture_scale_factor;

            //            if (DEBUG && DEBUG.DRAW_IMAGE) {
            //                DEBUG.checkDrawImage(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            //            }
            var image = texture._bitmapData;
            destX += this._transformTx;
            destY += this._transformTy;
            var beforeDraw = egret.getTimer();
            this.canvasContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            _super.prototype.drawImage.call(this, image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            this.renderCost += egret.getTimer() - beforeDraw;
        };

        HTML5CanvasRenderer.prototype.setTransform = function (matrix) {
            //在没有旋转缩放斜切的情况下，先不进行矩阵偏移，等下次绘制的时候偏移
            if (matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && this._matrixA == 1 && this._matrixB == 0 && this._matrixC == 0 && this._matrixD == 1) {
                this._transformTx = matrix.tx - this._matrixTx;
                this._transformTy = matrix.ty - this._matrixTy;
                return;
            }
            this._transformTx = this._transformTy = 0;
            if (this._matrixA != matrix.a || this._matrixB != matrix.b || this._matrixC != matrix.c || this._matrixD != matrix.d || this._matrixTx != matrix.tx || this._matrixTy != matrix.ty) {
                this.canvasContext.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            }
        };

        HTML5CanvasRenderer.prototype.save = function () {
            //            return;
            this.canvasContext.save();
        };

        HTML5CanvasRenderer.prototype.restore = function () {
            //            return;
            this.canvasContext.restore();
            this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
        };

        HTML5CanvasRenderer.prototype.setAlpha = function (alpha, blendMode) {
            if (alpha != this.canvasContext.globalAlpha) {
                this.canvasContext.globalAlpha = alpha;
            }
            if (blendMode) {
                this.blendValue = blendMode.value;
                this.canvasContext.globalCompositeOperation = blendMode.value;
            } else if (this.blendValue != egret.BlendMode.NORMAL.value) {
                this.blendValue = egret.BlendMode.NORMAL.value;
                this.canvasContext.globalCompositeOperation = egret.BlendMode.NORMAL.value;
            }
        };

        HTML5CanvasRenderer.prototype.setupFont = function (textField) {
            var ctx = this.canvasContext;
            var font = textField.italic ? "italic " : "normal ";
            font += textField.bold ? "bold " : "normal ";
            font += textField.size + "px " + textField.fontFamily;
            ctx.font = font;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
        };

        HTML5CanvasRenderer.prototype.measureText = function (text) {
            var result = this.canvasContext.measureText(text);
            return result.width;
        };

        HTML5CanvasRenderer.prototype.drawText = function (textField, text, x, y, maxWidth) {
            var textColor = textField._textColorString;
            var strokeColor = textField._strokeColorString;
            var outline = textField.stroke;
            var renderContext = this.canvasContext;
            renderContext.fillStyle = textColor;
            renderContext.strokeStyle = strokeColor;
            if (outline) {
                renderContext.lineWidth = outline * 2;
                renderContext.strokeText(text, x + this._transformTx, y + this._transformTy, maxWidth || 0xFFFF);
            }
            renderContext.fillText(text, x + this._transformTx, y + this._transformTy, maxWidth || 0xFFFF);
            _super.prototype.drawText.call(this, textField, text, x, y, maxWidth);
        };

        HTML5CanvasRenderer.prototype.clip = function (x, y, w, h) {
            this.canvasContext.beginPath();
            this.canvasContext.rect(x + this._transformTx, y + this._transformTy, w, h);
            this.canvasContext.clip();
            this.canvasContext.closePath();
        };

        HTML5CanvasRenderer.prototype.strokeRect = function (x, y, w, h, color) {
            this.canvasContext.strokeStyle = color;
            this.canvasContext.strokeRect(x, y, w, h);
        };
        return HTML5CanvasRenderer;
    })(egret.RendererContext);
    egret.HTML5CanvasRenderer = HTML5CanvasRenderer;
})(egret || (egret = {}));
