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
    * @class egret.RadioButton
    * @classdesc
    * 单选按钮
    * @extends egret.ToggleButtonBase
    */
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        /**
        * 构造函数
        * @method egret.RadioButton#constructor
        */
        function RadioButton() {
            _super.call(this);
            /**
            * 在RadioButtonGroup中的索引
            * @member egret.RadioButton#_indexNumber
            */
            this._indexNumber = 0;
            /**
            * 所属的RadioButtonGroup
            * @member egret.RadioButton#_radioButtonGroup
            */
            this._radioButtonGroup = null;
            this.groupChanged = false;
            this._groupName = "radioGroup";
            this.hostComponentKey = "egret.RadioButton";
            this.groupName = "radioGroup";
        }
        Object.defineProperty(RadioButton.prototype, "enabled", {
            /**
            * @member egret.RadioButton#enabled
            */
            get: function () {
                if (!this._enabled)
                    return false;
                return !this._radioButtonGroup || this._radioButtonGroup.enabled;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                this._setEnabled(value);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(RadioButton.prototype, "group", {
            /**
            * 此单选按钮所属的组。同一个组的多个单选按钮之间互斥。
            * 若不设置此属性，则根据groupName属性自动创建一个唯一的RadioButtonGroup。
            * @member egret.RadioButton#group
            */
            get: function () {
                if (!this._group && this._groupName) {
                    if (!RadioButton.automaticRadioButtonGroups)
                        RadioButton.automaticRadioButtonGroups = {};
                    var g = RadioButton.automaticRadioButtonGroups[this._groupName];
                    if (!g) {
                        g = new egret.RadioButtonGroup();
                        g._name = this._groupName;
                        RadioButton.automaticRadioButtonGroups[this._groupName] = g;
                    }
                    this._group = g;
                }
                return this._group;
            },
            set: function (value) {
                if (this._group == value)
                    return;
                if (this._radioButtonGroup)
                    this._radioButtonGroup._removeInstance(this);
                this._group = value;
                this._groupName = value ? this.group._name : "radioGroup";
                this.groupChanged = true;

                this.invalidateProperties();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(RadioButton.prototype, "groupName", {
            /**
            * 所属组的名称,具有相同组名的多个单选按钮之间互斥。默认值:"radioGroup"。
            * 可以把此属性当做设置组的一个简便方式，作用与设置group属性相同,。
            * @member egret.RadioButton#groupName
            */
            get: function () {
                return this._groupName;
            },
            set: function (value) {
                if (!value || value == "")
                    return;
                this._groupName = value;
                if (this._radioButtonGroup)
                    this._radioButtonGroup._removeInstance(this);
                this._group = null;
                this.groupChanged = true;

                this.invalidateProperties();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @inheritDoc
        */
        RadioButton.prototype._setSelected = function (value) {
            _super.prototype._setSelected.call(this, value);
            this.invalidateDisplayList();
        };

        Object.defineProperty(RadioButton.prototype, "value", {
            /**
            * 与此单选按钮关联的自定义数据。
            * 当被点击时，所属的RadioButtonGroup对象会把此属性赋值给ItemClickEvent.item属性并抛出事件。
            * @member egret.RadioButton#value
            */
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (this._value == value)
                    return;

                this._value = value;

                if (this.selected && this.group)
                    egret.UIEvent.dispatchUIEvent(this.group, egret.UIEvent.VALUE_COMMIT);
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.RadioButton#commitProperties
        */
        RadioButton.prototype.commitProperties = function () {
            if (this.groupChanged) {
                this.addToGroup();
                this.groupChanged = false;
            }
            _super.prototype.commitProperties.call(this);
        };

        /**
        * @method egret.RadioButton#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        RadioButton.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            if (this.group) {
                if (this.selected)
                    this._group.selection = this;
                else if (this.group.selection == this)
                    this._group.selection = null;
            }
        };

        /**
        * @method egret.RadioButton#buttonReleased
        */
        RadioButton.prototype.buttonReleased = function () {
            if (!this.enabled || this.selected)
                return;
            if (!this._radioButtonGroup)
                this.addToGroup();
            _super.prototype.buttonReleased.call(this);
            this.group._setSelection(this);
        };

        /**
        * 添此单选按钮加到组
        */
        RadioButton.prototype.addToGroup = function () {
            var g = this.group;
            if (g)
                g._addInstance(this);
            return g;
        };
        return RadioButton;
    })(egret.ToggleButtonBase);
    egret.RadioButton = RadioButton;
})(egret || (egret = {}));
