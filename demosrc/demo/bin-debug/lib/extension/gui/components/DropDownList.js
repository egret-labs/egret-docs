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
    * @class egret.DropDownList
    * @classdesc
    * 不可输入的下拉列表控件。带输入功能的下拉列表控件，请使用ComboBox。
    * @see org.flexlite.domUI.components.ComboBox
    * @extends egret.DropDownListBase
    */
    var DropDownList = (function (_super) {
        __extends(DropDownList, _super);
        /**
        * 构造函数
        * @method egret.DropDownList#constructor
        */
        function DropDownList() {
            _super.call(this);
            this._prompt = "";
            this.hostComponentKey = "egret.DropDownList";
        }
        Object.defineProperty(DropDownList.prototype, "prompt", {
            /**
            * 当没有选中项时在DropDownList上要显示的字符串。<p/>
            * 它通常是一个类似于“请选择一项...”的文本。当下拉列表中的某个项目被选中后，会被替换为该选定项目中的文本。
            * @member egret.DropDownList#prompt
            */
            get: function () {
                return this._prompt;
            },
            set: function (value) {
                if (this._prompt == value)
                    return;

                this._prompt = value;
                this._labelChanged = true;
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.DropDownList#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        DropDownList.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);

            if (instance == this.labelDisplay) {
                this._labelChanged = true;
                this.invalidateProperties();
            }
        };

        /**
        * @method egret.DropDownList#updateLabelDisplay
        * @param displayItem {any}
        */
        DropDownList.prototype.updateLabelDisplay = function (displayItem) {
            if (typeof displayItem === "undefined") { displayItem = undefined; }
            if (this.labelDisplay) {
                if (displayItem == undefined)
                    displayItem = this.selectedItem;
                if (displayItem != null && displayItem != undefined)
                    this.labelDisplay.text = this.itemToLabel(displayItem);
                else
                    this.labelDisplay.text = this._prompt;
            }
        };
        return DropDownList;
    })(egret.DropDownListBase);
    egret.DropDownList = DropDownList;
})(egret || (egret = {}));
