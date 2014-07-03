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
    * @class egret.ViewStack
    * @classdesc
    * 层级堆叠容器,一次只显示一个子对象。
    * @extends egret.Group
    * @implements egret.IViewStack
    * @implements egret.ICollection
    */
    var ViewStack = (function (_super) {
        __extends(ViewStack, _super);
        /**
        * 构造函数
        * @method egret.ViewStack#constructor
        */
        function ViewStack() {
            _super.call(this);
            this._createAllChildren = false;
            /**
            * 在属性提交前缓存选中项索引
            */
            this.proposedSelectedIndex = ViewStack.NO_PROPOSED_SELECTION;
            this._selectedIndex = -1;
            this.notifyTabBar = false;
            /**
            * 子项显示列表顺序发生改变。
            */
            this.childOrderingChanged = false;
            this._setLayout(new egret.BasicLayout());
        }
        Object.defineProperty(ViewStack.prototype, "layout", {
            /**
            * 此容器的布局对象为只读,默认限制为BasicLayout。
            * @member egret.ViewStack#layout
            */
            get: function () {
                return this._layout;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ViewStack.prototype, "createAllChildren", {
            /**
            * 是否立即初始化化所有子项。false表示当子项第一次被显示时再初始化它。默认值false。
            * @member egret.ViewStack#createAllChildren
            */
            get: function () {
                return this._createAllChildren;
            },
            set: function (value) {
                if (this._createAllChildren == value)
                    return;
                this._createAllChildren = value;
                if (this._createAllChildren) {
                    var elements = this._getElementsContent();
                    var length = elements.length;
                    for (var i = 0; i < length; i++) {
                        var element = elements[i];
                        if (element instanceof egret.DisplayObject && element.parent != this) {
                            this.childOrderingChanged = true;
                            this._addToDisplayList(element);
                        }
                    }
                    if (this.childOrderingChanged)
                        this.invalidateProperties();
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ViewStack.prototype, "selectedChild", {
            /**
            * @member egret.ViewStack#selectedChild
            */
            get: function () {
                var index = this.selectedIndex;
                if (index >= 0 && index < this.numElements)
                    return this.getElementAt(index);
                return null;
            },
            set: function (value) {
                var index = this.getElementIndex(value);
                if (index >= 0 && index < this.numElements)
                    this._setSelectedIndex(index);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ViewStack.prototype, "selectedIndex", {
            /**
            * @member egret.ViewStack#selectedIndex
            */
            get: function () {
                return this.proposedSelectedIndex != ViewStack.NO_PROPOSED_SELECTION ? this.proposedSelectedIndex : this._selectedIndex;
            },
            set: function (value) {
                this._setSelectedIndex(value);
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 设置选中项索引
        * @method egret.ViewStack#_setSelectedIndex
        * @param value {number}
        * @param notifyListeners {boolean}
        */
        ViewStack.prototype._setSelectedIndex = function (value, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            if (value == this.selectedIndex) {
                return;
            }

            this.proposedSelectedIndex = value;
            this.invalidateProperties();
            egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.VALUE_COMMIT);
            this.notifyTabBar = this.notifyTabBar || notifyListeners;
        };

        /**
        * 添加一个显示元素到容器
        * @method egret.ViewStack#_elementAdded
        * @param element {IVisualElement}
        * @param index {number}
        * @param notifyListeners {boolean}
        */
        ViewStack.prototype._elementAdded = function (element, index, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            if (this._createAllChildren) {
                if (element instanceof egret.DisplayObject) {
                    var childDO = element;
                    this._addToDisplayListAt(childDO, index, notifyListeners);
                }
            }
            if (notifyListeners) {
                if (this.hasEventListener(egret.ElementExistenceEvent.ELEMENT_ADD))
                    egret.ElementExistenceEvent.dispatchElementExistenceEvent(this, egret.ElementExistenceEvent.ELEMENT_ADD, element, index);
            }

            element.visible = false;
            element.includeInLayout = false;
            if (this.selectedIndex == -1) {
                this._setSelectedIndex(index, false);
            } else if (index <= this.selectedIndex && this.initialized) {
                this._setSelectedIndex(this.selectedIndex + 1);
            }
            this.dispatchCoEvent(egret.CollectionEventKind.ADD, index, -1, [element.name]);
        };

        /**
        * 从容器移除一个显示元素
        * @method egret.ViewStack#_elementRemoved
        * @param element {IVisualElement}
        * @param index {number}
        * @param notifyListeners {boolean}
        */
        ViewStack.prototype._elementRemoved = function (element, index, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            _super.prototype._elementRemoved.call(this, element, index, notifyListeners);
            element.visible = true;
            element.includeInLayout = true;
            if (index == this.selectedIndex) {
                if (this.numElements > 0) {
                    if (index == 0) {
                        this.proposedSelectedIndex = 0;
                        this.invalidateProperties();
                    } else
                        this._setSelectedIndex(0, false);
                } else
                    this._setSelectedIndex(-1);
            } else if (index < this.selectedIndex) {
                this._setSelectedIndex(this.selectedIndex - 1);
            }
            this.dispatchCoEvent(egret.CollectionEventKind.REMOVE, index, -1, [element.name]);
        };

        /**
        * @method egret.ViewStack#commitProperties
        */
        ViewStack.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.proposedSelectedIndex != ViewStack.NO_PROPOSED_SELECTION) {
                this.commitSelection(this.proposedSelectedIndex);
                this.proposedSelectedIndex = ViewStack.NO_PROPOSED_SELECTION;
            }

            if (this.childOrderingChanged) {
                this.childOrderingChanged = false;
                var elements = this._getElementsContent();
                var length = elements.length;
                for (var i = 0; i < length; i++) {
                    var element = elements[i];
                    if (element instanceof egret.DisplayObject && element.parent == this) {
                        this._addToDisplayList(element);
                    }
                }
            }

            if (this.notifyTabBar) {
                this.notifyTabBar = true;
                this.dispatchEventWith("IndexChanged"); //通知TabBar自己的选中项发生改变
            }
        };

        ViewStack.prototype.commitSelection = function (newIndex) {
            var oldIndex = this._selectedIndex;
            if (newIndex >= 0 && newIndex < this.numElements) {
                this._selectedIndex = newIndex;
                if (this._selectedChild && this._selectedChild.parent == this) {
                    this._selectedChild.visible = false;
                    this._selectedChild.includeInLayout = false;
                }
                this._selectedChild = this.getElementAt(this._selectedIndex);
                this._selectedChild.visible = true;
                this._selectedChild.includeInLayout = true;
                if (this._selectedChild.parent != this && this._selectedChild instanceof egret.DisplayObject) {
                    this._addToDisplayList((this._selectedChild));
                    if (!this.childOrderingChanged) {
                        this.childOrderingChanged = true;
                    }
                }
            } else {
                this._selectedChild = null;
                this._selectedIndex = -1;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        };

        Object.defineProperty(ViewStack.prototype, "length", {
            /**
            * @member egret.ViewStack#length
            */
            get: function () {
                return this.numElements;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.ViewStack#getItemAt
        * @param index {number}
        * @returns {any}
        */
        ViewStack.prototype.getItemAt = function (index) {
            var element = this.getElementAt(index);
            if (element)
                return element.name;
            return "";
        };

        /**
        * @method egret.ViewStack#getItemIndex
        * @param item {any}
        * @returns {number}
        */
        ViewStack.prototype.getItemIndex = function (item) {
            var list = this._getElementsContent();
            var length = list.length;
            for (var i = 0; i < length; i++) {
                if (list[i].name === item) {
                    return i;
                }
            }
            return -1;
        };

        /**
        * 抛出事件
        */
        ViewStack.prototype.dispatchCoEvent = function (kind, location, oldLocation, items, oldItems) {
            if (typeof kind === "undefined") { kind = null; }
            if (typeof location === "undefined") { location = -1; }
            if (typeof oldLocation === "undefined") { oldLocation = -1; }
            if (typeof items === "undefined") { items = null; }
            if (typeof oldItems === "undefined") { oldItems = null; }
            egret.CollectionEvent.dispatchCollectionEvent(this, egret.CollectionEvent.COLLECTION_CHANGE, kind, location, oldLocation, items, oldItems);
        };
        ViewStack.NO_PROPOSED_SELECTION = -2;
        return ViewStack;
    })(egret.Group);
    egret.ViewStack = ViewStack;
})(egret || (egret = {}));
