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
    * @class egret.ToggleButtonBase
    * @classdesc
    * 切换按钮组件基类
    * @extends egret.ButtonBase
    */
    var ToggleButtonBase = (function (_super) {
        __extends(ToggleButtonBase, _super);
        /**
        * @method egret.ToggleButtonBase#constructor
        */
        function ToggleButtonBase() {
            _super.call(this);
            /**
            * 是否根据鼠标事件自动变换选中状态,默认true。仅框架内使用。
            */
            this._autoSelected = true;
        }
        Object.defineProperty(ToggleButtonBase.prototype, "selected", {
            /**
            * 按钮处于按下状态时为 true，而按钮处于弹起状态时为 false。
            * @member egret.ToggleButtonBase#selected
            */
            get: function () {
                return this._selected;
            },
            set: function (value) {
                this._setSelected(value);
            },
            enumerable: true,
            configurable: true
        });


        ToggleButtonBase.prototype._setSelected = function (value) {
            if (value == this._selected)
                return;

            this._selected = value;
            egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.VALUE_COMMIT);
            ;
            this.invalidateSkinState();
        };

        /**
        * @method egret.ToggleButtonBase#getCurrentSkinState
        * @returns {string}
        */
        ToggleButtonBase.prototype.getCurrentSkinState = function () {
            if (!this.selected)
                return _super.prototype.getCurrentSkinState.call(this);
            else
                return _super.prototype.getCurrentSkinState.call(this) + "AndSelected";
        };

        /**
        * @method egret.ToggleButtonBase#buttonReleased
        */
        ToggleButtonBase.prototype.buttonReleased = function () {
            _super.prototype.buttonReleased.call(this);
            if (!this._autoSelected || !this.enabled)
                return;
            this.selected = !this.selected;
            this.dispatchEventWith(egret.Event.CHANGE);
        };
        return ToggleButtonBase;
    })(egret.ButtonBase);
    egret.ToggleButtonBase = ToggleButtonBase;
})(egret || (egret = {}));
