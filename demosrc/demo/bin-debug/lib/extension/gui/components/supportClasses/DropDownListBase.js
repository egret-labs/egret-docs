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
    * @class egret.DropDownListBase
    * @classdesc
    * 下拉列表控件基类
    * @extends egret.List
    */
    var DropDownListBase = (function (_super) {
        __extends(DropDownListBase, _super);
        /**
        * 构造函数
        * @method egret.DropDownListBase#constructor
        */
        function DropDownListBase() {
            _super.call(this);
            /**
            * 文本改变标志
            */
            this._labelChanged = false;
            this._userProposedSelectedIndex = egret.ListBase.NO_SELECTION;
            this._captureItemRenderer = false;
            this.dropDownController = new egret.DropDownController();
        }
        /**
        * @inheritDoc
        */
        DropDownListBase.prototype._setDataProvider = function (value) {
            if (this.dataProvider === value)
                return;

            _super.prototype._setDataProvider.call(this, value);
            this._labelChanged = true;
            this.invalidateProperties();
        };

        /**
        * @inheritDoc
        */
        DropDownListBase.prototype._setLabelField = function (value) {
            if (this.labelField == value)
                return;

            _super.prototype._setLabelField.call(this, value);
            this._labelChanged = true;
            this.invalidateProperties();
        };

        /**
        * @inheritDoc
        */
        DropDownListBase.prototype._setLabelFunction = function (value) {
            if (this.labelFunction == value)
                return;

            _super.prototype._setLabelFunction.call(this, value);
            this._labelChanged = true;
            this.invalidateProperties();
        };

        Object.defineProperty(DropDownListBase.prototype, "dropDownController", {
            /**
            * 下拉控制器
            * @member egret.DropDownListBase#dropDownController
            */
            get: function () {
                return this._dropDownController;
            },
            set: function (value) {
                if (this._dropDownController == value)
                    return;

                this._dropDownController = value;

                this._dropDownController.addEventListener(egret.UIEvent.OPEN, this._dropDownController_openHandler, this);
                this._dropDownController.addEventListener(egret.UIEvent.CLOSE, this.dropDownController_closeHandler, this);

                if (this.openButton)
                    this._dropDownController.openButton = this.openButton;
                if (this.dropDown)
                    this._dropDownController.dropDown = this.dropDown;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DropDownListBase.prototype, "isDropDownOpen", {
            /**
            * 下拉列表是否已经已打开
            * @member egret.DropDownListBase#isDropDownOpen
            */
            get: function () {
                if (this.dropDownController)
                    return this.dropDownController.isOpen;
                else
                    return false;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.DropDownListBase#commitProperties
        */
        DropDownListBase.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);

            if (this._labelChanged) {
                this._labelChanged = false;
                this.updateLabelDisplay();
            }
        };

        /**
        * @method egret.DropDownListBase#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        DropDownListBase.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);

            if (instance == this.openButton) {
                if (this.dropDownController)
                    this.dropDownController.openButton = this.openButton;
            } else if (instance == this.dropDown && this.dropDownController) {
                this.dropDownController.dropDown = this.dropDown;
            }
        };

        /**
        * @method egret.DropDownListBase#partRemoved
        * @param partName {string}
        * @param instance {any}
        */
        DropDownListBase.prototype.partRemoved = function (partName, instance) {
            if (this.dropDownController) {
                if (instance == this.openButton)
                    this.dropDownController.openButton = null;

                if (instance == this.dropDown)
                    this.dropDownController.dropDown = null;
            }

            _super.prototype.partRemoved.call(this, partName, instance);
        };

        /**
        * @method egret.DropDownListBase#getCurrentSkinState
        * @returns {string}
        */
        DropDownListBase.prototype.getCurrentSkinState = function () {
            return !this.enabled ? "disabled" : this.isDropDownOpen ? "open" : "normal";
        };

        /**
        * @method egret.DropDownListBase#commitSelection
        * @param dispatchChangedEvents {boolean}
        * @returns {boolean}
        */
        DropDownListBase.prototype.commitSelection = function (dispatchChangedEvents) {
            if (typeof dispatchChangedEvents === "undefined") { dispatchChangedEvents = true; }
            var retVal = _super.prototype.commitSelection.call(this, dispatchChangedEvents);
            this.updateLabelDisplay();
            return retVal;
        };

        /**
        * @method egret.DropDownListBase#_isItemIndexSelected
        * @param index {number}
        * @returns {boolean}
        */
        DropDownListBase.prototype._isItemIndexSelected = function (index) {
            return this._userProposedSelectedIndex == index;
        };

        /**
        * 打开下拉列表并抛出UIEvent.OPEN事件。
        * @method egret.DropDownListBase#openDropDown
        */
        DropDownListBase.prototype.openDropDown = function () {
            this.dropDownController.openDropDown();
        };

        /**
        * 关闭下拉列表并抛出UIEvent.CLOSE事件。
        * @method egret.DropDownListBase#closeDropDown
        * @param commit {boolean}
        */
        DropDownListBase.prototype.closeDropDown = function (commit) {
            this.dropDownController.closeDropDown(commit);
        };

        /**
        * 更新选中项的提示文本
        * @method egret.DropDownListBase#updateLabelDisplay
        * @param displayItem {any}
        */
        DropDownListBase.prototype.updateLabelDisplay = function (displayItem) {
            if (typeof displayItem === "undefined") { displayItem = undefined; }
        };

        /**
        * 改变高亮的选中项
        * @method egret.DropDownListBase#_changeHighlightedSelection
        * @param newIndex {number}
        * @param scrollToTop {boolean}
        */
        DropDownListBase.prototype._changeHighlightedSelection = function (newIndex, scrollToTop) {
            if (typeof scrollToTop === "undefined") { scrollToTop = false; }
            this.itemSelected(this._userProposedSelectedIndex, false);
            this._userProposedSelectedIndex = newIndex;
            this.itemSelected(this._userProposedSelectedIndex, true);
        };

        /**
        * @method egret.DropDownListBase#dataProvider_collectionChangeHandler
        * @param event {CollectionEvent}
        */
        DropDownListBase.prototype.dataProvider_collectionChangeHandler = function (event) {
            _super.prototype.dataProvider_collectionChangeHandler.call(this, event);

            this._labelChanged = true;
            this.invalidateProperties();
        };

        /**
        * @method egret.DropDownListBase#item_mouseDownHandler
        * @param event {TouchEvent}
        */
        DropDownListBase.prototype.item_mouseDownHandler = function (event) {
            _super.prototype.item_mouseDownHandler.call(this, event);

            var itemRenderer = (event.currentTarget);
            this._dispatchListEvent(event, egret.ListEvent.ITEM_CLICK, itemRenderer);

            this._userProposedSelectedIndex = this.selectedIndex;
            this.closeDropDown(true);
        };

        /**
        * 控制器抛出打开列表事件
        * @method egret.DropDownListBase#_dropDownController_openHandler
        * @param event {UIEvent}
        */
        DropDownListBase.prototype._dropDownController_openHandler = function (event) {
            this.addEventListener(egret.UIEvent.UPDATE_COMPLETE, this._open_updateCompleteHandler, this);
            this._userProposedSelectedIndex = this.selectedIndex;
            this.invalidateSkinState();
        };

        /**
        * 打开列表后组件一次失效验证全部完成
        * @method egret.DropDownListBase#_open_updateCompleteHandler
        * @param event {UIEvent}
        */
        DropDownListBase.prototype._open_updateCompleteHandler = function (event) {
            this.removeEventListener(egret.UIEvent.UPDATE_COMPLETE, this._open_updateCompleteHandler, this);
            egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.OPEN);
        };

        /**
        * 控制器抛出关闭列表事件
        * @method egret.DropDownListBase#dropDownController_closeHandler
        * @param event {UIEvent}
        */
        DropDownListBase.prototype.dropDownController_closeHandler = function (event) {
            this.addEventListener(egret.UIEvent.UPDATE_COMPLETE, this.close_updateCompleteHandler, this);
            this.invalidateSkinState();

            if (!event.isDefaultPrevented()) {
                this._setSelectedIndex(this._userProposedSelectedIndex, true);
            } else {
                this._changeHighlightedSelection(this.selectedIndex);
            }
        };

        /**
        * 关闭列表后组件一次失效验证全部完成
        */
        DropDownListBase.prototype.close_updateCompleteHandler = function (event) {
            this.removeEventListener(egret.UIEvent.UPDATE_COMPLETE, this.close_updateCompleteHandler, this);
            egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.CLOSE);
        };
        DropDownListBase.PAGE_SIZE = 5;
        return DropDownListBase;
    })(egret.List);
    egret.DropDownListBase = DropDownListBase;
})(egret || (egret = {}));
