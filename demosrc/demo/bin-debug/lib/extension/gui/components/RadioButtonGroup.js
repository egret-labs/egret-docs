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
    * @class egret.RadioButtonGroup
    * @classdesc
    * 单选按钮组
    * @extends egret.EventDispatcher
    */
    var RadioButtonGroup = (function (_super) {
        __extends(RadioButtonGroup, _super);
        /**
        * 构造函数
        * @method egret.RadioButtonGroup#constructor
        */
        function RadioButtonGroup() {
            _super.call(this);
            /**
            * 单选按钮列表
            */
            this.radioButtons = [];
            this._enabled = true;
            this._name = "_radioButtonGroup" + RadioButtonGroup.groupCount;
            RadioButtonGroup.groupCount++;
        }
        Object.defineProperty(RadioButtonGroup.prototype, "enabled", {
            /**
            * 组件是否可以接受用户交互。默认值为true。设置此属性将影响组内所有单选按钮。
            * @member egret.RadioButtonGroup#enabled
            */
            get: function () {
                return this._enabled;
            },
            set: function (value) {
                if (this._enabled == value)
                    return;

                this._enabled = value;
                for (var i = 0; i < this.numRadioButtons; i++)
                    this.getRadioButtonAt(i).invalidateSkinState();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(RadioButtonGroup.prototype, "numRadioButtons", {
            /**
            * 组内单选按钮数量
            * @member egret.RadioButtonGroup#numRadioButtons
            */
            get: function () {
                return this.radioButtons.length;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(RadioButtonGroup.prototype, "selectedValue", {
            /**
            * 当前被选中的单选按钮的value属性值。注意，此属性仅当目标RadioButton在显示列表时有效。
            * @member egret.RadioButtonGroup#selectedValue
            */
            get: function () {
                if (this.selection) {
                    return this.selection.value != null ? this.selection.value : this.selection.label;
                }
                return null;
            },
            set: function (value) {
                this._selectedValue = value;
                if (value == null) {
                    this._setSelection(null, false);
                    return;
                }
                var n = this.numRadioButtons;
                for (var i = 0; i < n; i++) {
                    var radioButton = this.getRadioButtonAt(i);
                    if (radioButton.value == value || radioButton.label == value) {
                        this.changeSelection(i, false);
                        this._selectedValue = null;
                        egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.VALUE_COMMIT);

                        break;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(RadioButtonGroup.prototype, "selection", {
            /**
            * 当前被选中的单选按钮引用,注意，此属性仅当目标RadioButton在显示列表时有效。
            * @member egret.RadioButtonGroup#selection
            */
            get: function () {
                return this._selection;
            },
            set: function (value) {
                if (this._selection == value)
                    return;
                this._setSelection(value, false);
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 获取指定索引的单选按钮
        * @method egret.RadioButtonGroup#getRadioButtonAt
        * @param index {number} 单选按钮的索引
        * @returns {RadioButton}
        */
        RadioButtonGroup.prototype.getRadioButtonAt = function (index) {
            if (index >= 0 && index < this.numRadioButtons)
                return this.radioButtons[index];

            return null;
        };

        /**
        * 添加单选按钮到组内
        * @method egret.RadioButtonGroup#_addInstance
        * @param instance {RadioButton}
        */
        RadioButtonGroup.prototype._addInstance = function (instance) {
            instance.addEventListener(egret.Event.REMOVED, this.radioButton_removedHandler, this);

            this.radioButtons.push(instance);
            this.radioButtons.sort(this.breadthOrderCompare);
            for (var i = 0; i < this.radioButtons.length; i++)
                this.radioButtons[i]._indexNumber = i;
            if (this._selectedValue)
                this.selectedValue = this._selectedValue;
            if (instance.selected == true)
                this.selection = instance;

            instance._radioButtonGroup = this;
            instance.invalidateSkinState();

            this.dispatchEventWith("numRadioButtonsChanged");
        };

        /**
        * 从组里移除单选按钮
        * @method egret.RadioButtonGroup#_removeInstance
        * @param instance {RadioButton}
        */
        RadioButtonGroup.prototype._removeInstance = function (instance) {
            this.doRemoveInstance(instance, false);
        };

        /**
        * 执行从组里移除单选按钮
        */
        RadioButtonGroup.prototype.doRemoveInstance = function (instance, addListener) {
            if (typeof addListener === "undefined") { addListener = true; }
            if (instance) {
                var foundInstance = false;
                for (var i = 0; i < this.numRadioButtons; i++) {
                    var rb = this.getRadioButtonAt(i);

                    if (foundInstance) {
                        rb._indexNumber = rb._indexNumber - 1;
                    } else if (rb == instance) {
                        if (addListener)
                            instance.addEventListener(egret.Event.ADDED, this.radioButton_addedHandler, this);
                        if (instance == this._selection)
                            this._selection = null;

                        instance._radioButtonGroup = null;
                        instance.invalidateSkinState();
                        this.radioButtons.splice(i, 1);
                        foundInstance = true;
                        i--;
                    }
                }

                if (foundInstance)
                    this.dispatchEventWith("numRadioButtonsChanged");
            }
        };

        /**
        * 设置选中的单选按钮
        * @method egret.RadioButtonGroup#_setSelection
        * @param value {RadioButton}
        * @param fireChange {boolean}
        */
        RadioButtonGroup.prototype._setSelection = function (value, fireChange) {
            if (typeof fireChange === "undefined") { fireChange = true; }
            if (this._selection == value)
                return;

            if (!value) {
                if (this.selection) {
                    this._selection.selected = false;
                    this._selection = null;
                    if (fireChange)
                        this.dispatchEventWith(egret.Event.CHANGE);
                }
            } else {
                var n = this.numRadioButtons;
                for (var i = 0; i < n; i++) {
                    if (value == this.getRadioButtonAt(i)) {
                        this.changeSelection(i, fireChange);
                        break;
                    }
                }
            }
            egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.VALUE_COMMIT);
        };

        /**
        * 改变选中项
        */
        RadioButtonGroup.prototype.changeSelection = function (index, fireChange) {
            if (typeof fireChange === "undefined") { fireChange = true; }
            var rb = this.getRadioButtonAt(index);
            if (rb && rb != this._selection) {
                if (this._selection)
                    this._selection.selected = false;
                this._selection = rb;
                this._selection.selected = true;
                if (fireChange)
                    this.dispatchEventWith(egret.Event.CHANGE);
            }
        };

        /**
        * 显示对象深度排序
        */
        RadioButtonGroup.prototype.breadthOrderCompare = function (a, b) {
            var aParent = a.parent;
            var bParent = b.parent;

            if (!aParent || !bParent)
                return 0;

            var aNestLevel = (a instanceof egret.UIComponent) ? a.nestLevel : -1;
            var bNestLevel = (b instanceof egret.UIComponent) ? b.nestLevel : -1;

            var aIndex = 0;
            var bIndex = 0;

            if (aParent == bParent) {
                if ("getElementIndex" in aParent && "ownerChanged" in a)
                    aIndex = aParent.getElementIndex(a);
                else
                    aIndex = aParent.getChildIndex(a);

                if ("getElementIndex" in bParent && "ownerChanged" in b)
                    bIndex = bParent.getElementIndex(b);
                else
                    bIndex = bParent.getChildIndex(b);
            }

            if (aNestLevel > bNestLevel || aIndex > bIndex)
                return 1;
            else if (aNestLevel < bNestLevel || bIndex > aIndex)
                return -1;
            else if (a == b)
                return 0;
            else
                return this.breadthOrderCompare(aParent, bParent);
        };

        /**
        * 单选按钮添加到显示列表
        */
        RadioButtonGroup.prototype.radioButton_addedHandler = function (event) {
            var rb = (event.target);
            if (rb) {
                rb.removeEventListener(egret.Event.ADDED, this.radioButton_addedHandler, this);
                this._addInstance(rb);
            }
        };

        /**
        * 单选按钮从显示列表移除
        */
        RadioButtonGroup.prototype.radioButton_removedHandler = function (event) {
            var rb = (event.target);
            if (rb) {
                rb.removeEventListener(egret.Event.REMOVED, this.radioButton_removedHandler, this);
                this.doRemoveInstance(rb);
            }
        };
        RadioButtonGroup.groupCount = 0;
        return RadioButtonGroup;
    })(egret.EventDispatcher);
    egret.RadioButtonGroup = RadioButtonGroup;
})(egret || (egret = {}));
