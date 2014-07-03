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
    * @class egret.ItemRenderer
    * @classdesc
    * 项呈示器基类
    * @extends egret.ButtonBase
    * @implements egret.IItemRenderer
    */
    var ItemRenderer = (function (_super) {
        __extends(ItemRenderer, _super);
        /**
        * @method egret.ItemRenderer#constructor
        */
        function ItemRenderer() {
            _super.call(this);
            this.dataChangedFlag = false;
            this._selected = false;
            this._itemIndex = -1;
            this.touchChildren = true;
        }
        Object.defineProperty(ItemRenderer.prototype, "data", {
            /**
            * @member egret.ItemRenderer#data
            */
            get: function () {
                return this._data;
            },
            set: function (value) {
                //这里不能加if(_data==value)return;的判断，会导致数据源无法刷新的问题
                this._data = value;
                if (this.initialized || this.parent) {
                    this.dataChangedFlag = false;
                    this.dataChanged();
                } else {
                    this.dataChangedFlag = true;
                    this.invalidateProperties();
                }
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 子类复写此方法以在data数据源发生改变时跟新显示列表。
        * 与直接复写_data的setter方法不同，它会确保在皮肤已经附加完成后再被调用。
        * @method egret.ItemRenderer#dataChanged
        */
        ItemRenderer.prototype.dataChanged = function () {
        };

        Object.defineProperty(ItemRenderer.prototype, "selected", {
            /**
            * @member egret.ItemRenderer#selected
            */
            get: function () {
                return this._selected;
            },
            set: function (value) {
                if (this._selected == value)
                    return;
                this._selected = value;
                this.invalidateSkinState();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ItemRenderer.prototype, "itemIndex", {
            /**
            * @member egret.ItemRenderer#itemIndex
            */
            get: function () {
                return this._itemIndex;
            },
            set: function (value) {
                this._itemIndex = value;
            },
            enumerable: true,
            configurable: true
        });


        /**
        * @method egret.ItemRenderer#commitProperties
        */
        ItemRenderer.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.dataChangedFlag) {
                this.dataChangedFlag = false;
                this.dataChanged();
            }
        };

        /**
        * @method egret.ItemRenderer#getCurrentSkinState
        * @returns {string}
        */
        ItemRenderer.prototype.getCurrentSkinState = function () {
            if (this._selected)
                return "down";
            return _super.prototype.getCurrentSkinState.call(this);
        };
        return ItemRenderer;
    })(egret.ButtonBase);
    egret.ItemRenderer = ItemRenderer;
})(egret || (egret = {}));
