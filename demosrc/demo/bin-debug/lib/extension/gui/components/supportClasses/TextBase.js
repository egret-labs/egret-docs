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
    * @class egret.TextBase
    * @classdesc
    * 文本基类,实现对文本的自动布局，样式属性设置。
    * @extends egret.UIComponent
    * @implements egret.IDisplayText
    */
    var TextBase = (function (_super) {
        __extends(TextBase, _super);
        /**
        * @method egret.TextBase#constructor
        */
        function TextBase() {
            _super.call(this);
            this._fontFamily = "SimSun";
            this._size = 30;
            this._textAlign = egret.HorizontalAlign.LEFT;
            this._verticalAlign = egret.VerticalAlign.TOP;
            this._lineSpacing = 0;
            this._textColor = 0xFFFFFF;
            this._text = "";
        }
        Object.defineProperty(TextBase.prototype, "fontFamily", {
            /**
            * 字体名称 。默认值：SimSun
            * @member egret.TextBase#fontFamily
            */
            get: function () {
                return this._fontFamily;
            },
            set: function (value) {
                if (this._fontFamily == value)
                    return;
                this._fontFamily = value;
                this.fontFamilyChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextBase.prototype, "size", {
            /**
            * 字号大小,默认值30 。
            * @member egret.TextBase#size
            */
            get: function () {
                return this._size;
            },
            set: function (value) {
                if (this._size == value)
                    return;
                this._size = value;
                this.sizeChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextBase.prototype, "bold", {
            /**
            * 是否显示为粗体，默认false。
            * @member egret.TextBase#bold
            */
            get: function () {
                return this._bold;
            },
            set: function (value) {
                if (this._bold == value)
                    return;
                this._bold = value;
                this.boldChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextBase.prototype, "italic", {
            /**
            * 是否显示为粗体，默认false。
            * @member egret.TextBase#italic
            */
            get: function () {
                return this._italic;
            },
            set: function (value) {
                if (this._italic == value)
                    return;
                this._italic = value;
                this.italicChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextBase.prototype, "textAlign", {
            /**
            * 文字的水平对齐方式 ,请使用TextAlign中定义的常量。
            * 默认值：TextFormatAlign.LEFT。
            * @member egret.TextBase#textAlign
            */
            get: function () {
                return this._textAlign;
            },
            set: function (value) {
                if (this._textAlign == value)
                    return;
                this._textAlign = value;
                this.textAlignChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextBase.prototype, "verticalAlign", {
            /**
            * 文字的垂直对齐方式 ,请使用VerticalAlign中定义的常量。
            * 默认值：VerticalAlign.TOP。
            * @member egret.TextBase#verticalAlign
            */
            get: function () {
                return this._verticalAlign;
            },
            set: function (value) {
                if (this._verticalAlign == value)
                    return;
                this._verticalAlign = value;
                this.verticalAlignChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextBase.prototype, "lineSpacing", {
            /**
            * 行间距
            * @member egret.TextBase#lineSpacing
            */
            get: function () {
                return this._lineSpacing;
            },
            set: function (value) {
                if (this._lineSpacing == value)
                    return;
                this._lineSpacing = value;
                this.lineSpacingChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextBase.prototype, "textColor", {
            /**
            * @member egret.TextBase#textColor
            */
            get: function () {
                return this._textColor;
            },
            set: function (value) {
                if (this._textColor == value)
                    return;
                this._textColor = value;
                this.textColorChanged = true;
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextBase.prototype, "text", {
            /**
            * @member egret.TextBase#text
            */
            get: function () {
                return this._text;
            },
            set: function (value) {
                if (value == this._text)
                    return;
                this._text = value;
                this._textChanged = true;
                this.invalidateProperties();
                this.invalidateSize();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        /**
        * @method egret.TextBase#createChildren
        */
        TextBase.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            if (!this._textField) {
                this.checkTextField();
            }
        };

        /**
        * @method egret.TextBase#commitProperties
        */
        TextBase.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);

            if (!this._textField) {
                this.checkTextField();
            }

            if (this.fontFamilyChanged) {
                this._textField.fontFamily = this._fontFamily;
                this.fontFamilyChanged = false;
            }
            if (this.sizeChanged) {
                this._textField.size = this._size;
                this.sizeChanged = false;
            }
            if (this.boldChanged) {
                this._textField.bold = this._bold;
                this.boldChanged = false;
            }
            if (this.italic) {
                this._textField.italic = this._italic;
                this.italicChanged = false;
            }
            if (this.textAlignChanged) {
                this._textField.textAlign = this._textAlign;
                this.textAlignChanged = false;
            }
            if (this.verticalAlignChanged) {
                this._textField.verticalAlign = this._verticalAlign;
                this.verticalAlignChanged = false;
            }
            if (this.lineSpacingChanged) {
                this._textField.lineSpacing = this._lineSpacing;
                this.lineSpacingChanged = false;
            }
            if (this.textColorChanged) {
                this._textField.textColor = this._textColor;
                this.textColorChanged = false;
            }
            if (this._textChanged) {
                this._textField.text = this._text;
                this._textChanged = false;
            }
        };

        /**
        * 检查是否创建了textField对象，没有就创建一个。
        */
        TextBase.prototype.checkTextField = function () {
            if (!this._textField) {
                this.createTextField();
                this._textField.text = this._text;
                this._textChanged = true;
                this.invalidateProperties();
            }
        };

        TextBase.prototype.createTextField = function () {
            this._textField = new egret.TextField;
            this._textField.fontFamily = this._fontFamily;
            this._textField.size = this._size;
            this._textField.textAlign = this._textAlign;
            this._textField.verticalAlign = this._verticalAlign;
            this._textField.lineSpacing = this._lineSpacing;
            this._textField.textColor = this._textColor;
            this._addToDisplayList(this._textField);
        };

        /**
        * @method egret.TextBase#measure
        */
        TextBase.prototype.measure = function () {
            _super.prototype.measure.call(this);

            this.measuredWidth = TextBase.DEFAULT_MEASURED_WIDTH;
            this.measuredHeight = TextBase.DEFAULT_MEASURED_HEIGHT;
        };

        /**
        * 更新显示列表
        * @method egret.TextBase#$updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        TextBase.prototype.$updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
        };

        /**
        * @method egret.TextBase#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        TextBase.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            this._textField.width = unscaledWidth;
            this._textField.height = unscaledHeight;
        };
        TextBase.DEFAULT_MEASURED_WIDTH = 160;

        TextBase.DEFAULT_MEASURED_HEIGHT = 22;
        return TextBase;
    })(egret.UIComponent);
    egret.TextBase = TextBase;
})(egret || (egret = {}));
