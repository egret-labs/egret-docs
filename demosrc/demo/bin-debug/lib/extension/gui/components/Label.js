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
    * @class egret.Label
    * @classdesc
    * 一行或多行不可编辑的文本控件
    * @extends egret.TextBase
    */
    var Label = (function (_super) {
        __extends(Label, _super);
        /**
        * @method egret.Label#constructor
        */
        function Label() {
            _super.call(this);
            this._maxDisplayedLines = 0;
            /**
            * 上一次测量的宽度
            */
            this.lastUnscaledWidth = NaN;
            this._padding = 0;
            this._paddingLeft = NaN;
            this._paddingRight = NaN;
            this._paddingTop = NaN;
            this._paddingBottom = NaN;
            this.addEventListener(egret.UIEvent.UPDATE_COMPLETE, this.updateCompleteHandler, this);
        }
        /**
        * 一个验证阶段完成
        */
        Label.prototype.updateCompleteHandler = function (event) {
            this.lastUnscaledWidth = NaN;
        };

        Object.defineProperty(Label.prototype, "maxDisplayedLines", {
            /**
            * 最大显示行数,0或负值代表不限制。
            * @member egret.Label#maxDisplayedLines
            */
            get: function () {
                return this._maxDisplayedLines;
            },
            set: function (value) {
                if (this._maxDisplayedLines == value)
                    return;
                this._maxDisplayedLines = value;
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Label.prototype, "padding", {
            /**
            * 四个边缘的共同内边距。若单独设置了任一边缘的内边距，则该边缘的内边距以单独设置的值为准。
            * 此属性主要用于快速设置多个边缘的相同内边距。默认值：0。
            * @member egret.Label#padding
            */
            get: function () {
                return this._padding;
            },
            set: function (value) {
                if (this._padding == value)
                    return;
                this._padding = value;
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Label.prototype, "paddingLeft", {
            /**
            * 文字距离左边缘的空白像素,若为NaN将使用padding的值，默认值：NaN。
            * @member egret.Label#paddingLeft
            */
            get: function () {
                return this._paddingLeft;
            },
            set: function (value) {
                if (this._paddingLeft == value)
                    return;

                this._paddingLeft = value;
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Label.prototype, "paddingRight", {
            /**
            * 文字距离右边缘的空白像素,若为NaN将使用padding的值，默认值：NaN。
            * @member egret.Label#paddingRight
            */
            get: function () {
                return this._paddingRight;
            },
            set: function (value) {
                if (this._paddingRight == value)
                    return;

                this._paddingRight = value;
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Label.prototype, "paddingTop", {
            /**
            * 文字距离顶部边缘的空白像素,若为NaN将使用padding的值，默认值：NaN。
            * @member egret.Label#paddingTop
            */
            get: function () {
                return this._paddingTop;
            },
            set: function (value) {
                if (this._paddingTop == value)
                    return;

                this._paddingTop = value;
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Label.prototype, "paddingBottom", {
            /**
            * 文字距离底部边缘的空白像素,若为NaN将使用padding的值，默认值：NaN。
            * @member egret.Label#paddingBottom
            */
            get: function () {
                return this._paddingBottom;
            },
            set: function (value) {
                if (this._paddingBottom == value)
                    return;

                this._paddingBottom = value;
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        /**
        * @method egret.Label#measure
        */
        Label.prototype.measure = function () {
            //先提交属性，防止样式发生改变导致的测量不准确问题。
            if (this._invalidatePropertiesFlag)
                this.validateProperties();
            if (this.isSpecialCase()) {
                if (isNaN(this.lastUnscaledWidth)) {
                    this._oldPreferWidth = NaN;
                    this._oldPreferHeight = NaN;
                } else {
                    this.measureUsingWidth(this.lastUnscaledWidth);
                    return;
                }
            }

            var availableWidth;

            if (!isNaN(this.explicitWidth))
                availableWidth = this.explicitWidth;
            else if (this.maxWidth != 10000)
                availableWidth = this.maxWidth;

            this.measureUsingWidth(availableWidth);
        };

        /**
        * 特殊情况，组件尺寸由父级决定，要等到父级UpdateDisplayList的阶段才能测量
        */
        Label.prototype.isSpecialCase = function () {
            return this._maxDisplayedLines != 1 && (!isNaN(this.percentWidth) || (!isNaN(this.left) && !isNaN(this.right))) && isNaN(this.explicitHeight) && isNaN(this.percentHeight);
        };

        /**
        * 使用指定的宽度进行测量
        */
        Label.prototype.measureUsingWidth = function (w) {
            var originalText = this._textField.text;
            if (this._textChanged) {
                this._textField.text = this._text;
            }

            var padding = isNaN(this._padding) ? 0 : this._padding;
            var paddingL = isNaN(this._paddingLeft) ? padding : this._paddingLeft;
            var paddingR = isNaN(this._paddingRight) ? padding : this._paddingRight;
            var paddingT = isNaN(this._paddingTop) ? padding : this._paddingTop;
            var paddingB = isNaN(this._paddingBottom) ? padding : this._paddingBottom;

            this._textField.width = NaN;
            this._textField.height = NaN;
            if (!isNaN(w)) {
                this._textField.width = w - paddingL - paddingR;
                this.measuredWidth = Math.ceil(this._textField.measuredWidth);
                this.measuredHeight = Math.ceil(this._textField.measuredHeight);
            } else {
                this.measuredWidth = Math.ceil(this._textField.measuredWidth);
                this.measuredHeight = Math.ceil(this._textField.measuredHeight);
            }

            if (this._maxDisplayedLines > 0 && this._textField.numLines > this._maxDisplayedLines) {
                var size = this._textField.size;
                var lineSpacing = this._textField.lineSpacing;
                this.measuredHeight = (size + lineSpacing) * this._maxDisplayedLines - lineSpacing;
            }

            this.measuredWidth += paddingL + paddingR;
            this.measuredHeight += paddingT + paddingB;

            this._textField.text = originalText;
        };

        /**
        * @method egret.Label#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        Label.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            this.$updateDisplayList(unscaledWidth, unscaledHeight);

            var padding = isNaN(this._padding) ? 0 : this._padding;
            var paddingL = isNaN(this._paddingLeft) ? padding : this._paddingLeft;
            var paddingR = isNaN(this._paddingRight) ? padding : this._paddingRight;
            var paddingT = isNaN(this._paddingTop) ? padding : this._paddingTop;
            var paddingB = isNaN(this._paddingBottom) ? padding : this._paddingBottom;

            this._textField.x = paddingL;
            this._textField.y = paddingT;
            if (this.isSpecialCase()) {
                var firstTime = isNaN(this.lastUnscaledWidth) || this.lastUnscaledWidth != unscaledWidth;
                this.lastUnscaledWidth = unscaledWidth;
                if (firstTime) {
                    this._oldPreferWidth = NaN;
                    this._oldPreferHeight = NaN;
                    this.invalidateSize();
                    return;
                }
            }

            //防止在父级validateDisplayList()阶段改变的text属性值，
            //接下来直接调用自身的updateDisplayList()而没有经过measure(),使用的测量尺寸是上一次的错误值。
            if (this._invalidateSizeFlag)
                this.validateSize();

            if (!this._textField.visible)
                this._textField.visible = true;

            this._textField.width = unscaledWidth - paddingL - paddingR;
            var unscaledTextHeight = unscaledHeight - paddingT - paddingB;
            this._textField.height = unscaledTextHeight;

            if (this._maxDisplayedLines > 0 && this._textField.numLines > this._maxDisplayedLines) {
                var size = this._textField.size;
                var lineSpacing = this._textField.lineSpacing;
                var h = (size + lineSpacing) * this._maxDisplayedLines - lineSpacing;
                this._textField.height = Math.min(unscaledTextHeight, h);
            }
        };
        return Label;
    })(egret.TextBase);
    egret.Label = Label;
})(egret || (egret = {}));
