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
    * @class egret.Skin
    * @classdesc
    * 含有视图状态功能的皮肤基类。注意：为了减少嵌套层级，此皮肤没有继承显示对象，若需要显示对象版本皮肤，请使用Skin。
    * @see org.flexlite.domUI.components.supportClasses.Skin
    * @extends egret.EventDispatcher
    * @implements egret.IStateClient
    * @implements egret.ISkin
    * @implements egret.IContainer
    */
    var Skin = (function (_super) {
        __extends(Skin, _super);
        /**
        * 构造函数
        * @method egret.Skin#constructor
        */
        function Skin() {
            _super.call(this);
            /**
            * 组件的最大测量宽度,仅影响measuredWidth属性的取值范围。
            * @member egret.Skin#maxWidth
            */
            this.maxWidth = 10000;
            /**
            * 组件的最小测量宽度,此属性设置为大于maxWidth的值时无效。仅影响measuredWidth属性的取值范围。
            * @member egret.Skin#minWidth
            */
            this.minWidth = 0;
            /**
            * 组件的最大测量高度,仅影响measuredHeight属性的取值范围。
            * @member egret.Skin#maxHeight
            */
            this.maxHeight = 10000;
            /**
            * 组件的最小测量高度,此属性设置为大于maxHeight的值时无效。仅影响measuredHeight属性的取值范围。
            * @member egret.Skin#minHeight
            */
            this.minHeight = 0;
            /**
            * 组件宽度
            * @member egret.Skin#width
            */
            this.width = NaN;
            /**
            * 组件高度
            * @member egret.Skin#height
            */
            this.height = NaN;
            this._initialized = false;
            this._elementsContent = [];
            //========================state相关函数===============start=========================
            this._states = [];
            this.initialized = false;
        }
        /**
        * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
        * 请务必调用super.createChildren()以完成父类组件的初始化
        * @method egret.Skin#createChildren
        */
        Skin.prototype.createChildren = function () {
        };

        Object.defineProperty(Skin.prototype, "hostComponent", {
            /**
            * @member egret.Skin#hostComponent
            */
            get: function () {
                return this._hostComponent;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                this._setHostComponent(value);
            },
            enumerable: true,
            configurable: true
        });


        Skin.prototype._setHostComponent = function (value) {
            if (this._hostComponent == value)
                return;
            var i;
            if (this._hostComponent) {
                for (i = this._elementsContent.length - 1; i >= 0; i--) {
                    this._elementRemoved(this._elementsContent[i], i);
                }
            }

            this._hostComponent = value;
            if (!this._initialized) {
                this._initialized = true;
                this.createChildren();
            }

            if (this._hostComponent) {
                var n = this._elementsContent.length;
                for (i = 0; i < n; i++) {
                    this._elementAdded(this._elementsContent[i], i);
                }

                this.initializeStates();

                if (this.currentStateChanged) {
                    this.commitCurrentState();
                }
            }
        };

        /**
        * 返回子元素列表
        */
        Skin.prototype._getElementsContent = function () {
            return this._elementsContent;
        };

        Object.defineProperty(Skin.prototype, "elementsContent", {
            /**
            * 设置容器子对象数组 。数组包含要添加到容器的子项列表，之前的已存在于容器中的子项列表被全部移除后添加列表里的每一项到容器。
            * 设置该属性时会对您输入的数组进行一次浅复制操作，所以您之后对该数组的操作不会影响到添加到容器的子项列表数量。
            */
            set: function (value) {
                if (value == null)
                    value = [];
                if (value == this._elementsContent)
                    return;
                if (this._hostComponent) {
                    var i;
                    for (i = this._elementsContent.length - 1; i >= 0; i--) {
                        this._elementRemoved(this._elementsContent[i], i);
                    }

                    this._elementsContent = value.concat();

                    var n = this._elementsContent.length;
                    for (i = 0; i < n; i++) {
                        var elt = this._elementsContent[i];

                        if (elt.parent && "removeElement" in elt.parent)
                            (elt.parent).removeElement(elt);
                        else if (elt.owner && "removeElement" in elt.owner)
                            (elt.owner).removeElement(elt);
                        this._elementAdded(elt, i);
                    }
                } else {
                    this._elementsContent = value.concat();
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Skin.prototype, "numElements", {
            /**
            * @member egret.Skin#numElements
            */
            get: function () {
                return this._elementsContent.length;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.Skin#getElementAt
        * @param index {number}
        * @returns {IVisualElement}
        */
        Skin.prototype.getElementAt = function (index) {
            this.checkForRangeError(index);
            return this._elementsContent[index];
        };

        Skin.prototype.checkForRangeError = function (index, addingElement) {
            if (typeof addingElement === "undefined") { addingElement = false; }
            var maxIndex = this._elementsContent.length - 1;

            if (addingElement)
                maxIndex++;

            if (index < 0 || index > maxIndex)
                throw new RangeError("索引:\"" + index + "\"超出可视元素索引范围");
        };

        /**
        * @method egret.Skin#addElement
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        Skin.prototype.addElement = function (element) {
            var index = this.numElements;

            if (element.owner == this)
                index = this.numElements - 1;

            return this.addElementAt(element, index);
        };

        /**
        * @method egret.Skin#addElementAt
        * @param element {IVisualElement}
        * @param index {number}
        * @returns {IVisualElement}
        */
        Skin.prototype.addElementAt = function (element, index) {
            this.checkForRangeError(index, true);

            var host = element.owner;
            if (host == this) {
                this.setElementIndex(element, index);
                return element;
            } else if (host && "removeElement" in host) {
                host.removeElement(element);
            }

            this._elementsContent.splice(index, 0, element);

            if (this._hostComponent)
                this._elementAdded(element, index);
            else
                element.ownerChanged(this);

            return element;
        };

        /**
        * @method egret.Skin#removeElement
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        Skin.prototype.removeElement = function (element) {
            return this.removeElementAt(this.getElementIndex(element));
        };

        /**
        * @method egret.Skin#removeElementAt
        * @param index {number}
        * @returns {IVisualElement}
        */
        Skin.prototype.removeElementAt = function (index) {
            this.checkForRangeError(index);

            var element = this._elementsContent[index];

            if (this._hostComponent)
                this._elementRemoved(element, index);
            else
                element.ownerChanged(null);
            this._elementsContent.splice(index, 1);

            return element;
        };

        /**
        * @method egret.Skin#getElementIndex
        * @param element {IVisualElement}
        * @returns {number}
        */
        Skin.prototype.getElementIndex = function (element) {
            return this._elementsContent.indexOf(element);
        };

        /**
        * @method egret.Skin#setElementIndex
        * @param element {IVisualElement}
        * @param index {number}
        */
        Skin.prototype.setElementIndex = function (element, index) {
            this.checkForRangeError(index);

            var oldIndex = this.getElementIndex(element);
            if (oldIndex == -1 || oldIndex == index)
                return;

            if (this._hostComponent)
                this._elementRemoved(element, oldIndex, false);

            this._elementsContent.splice(oldIndex, 1);
            this._elementsContent.splice(index, 0, element);

            if (this._hostComponent)
                this._elementAdded(element, index, false);
        };

        /**
        * 添加一个显示元素到容器
        * @method egret.Skin#_elementAdded
        * @param element {IVisualElement}
        * @param index {number}
        * @param notifyListeners {boolean}
        */
        Skin.prototype._elementAdded = function (element, index, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            element.ownerChanged(this);
            if (element instanceof egret.DisplayObject) {
                var childDO = element;
                this._hostComponent._addToDisplayListAt(childDO, index, notifyListeners);
            }

            if (notifyListeners) {
                if (this.hasEventListener(egret.ElementExistenceEvent.ELEMENT_ADD))
                    egret.ElementExistenceEvent.dispatchElementExistenceEvent(this, egret.ElementExistenceEvent.ELEMENT_ADD, element, index);
            }

            this._hostComponent.invalidateSize();
            this._hostComponent.invalidateDisplayList();
        };

        /**
        * 从容器移除一个显示元素
        * @method egret.Skin#_elementRemoved
        * @param element {IVisualElement}
        * @param index {number}
        * @param notifyListeners {boolean}
        */
        Skin.prototype._elementRemoved = function (element, index, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            if (notifyListeners) {
                if (this.hasEventListener(egret.ElementExistenceEvent.ELEMENT_REMOVE))
                    egret.ElementExistenceEvent.dispatchElementExistenceEvent(this, egret.ElementExistenceEvent.ELEMENT_REMOVE, element, index);
            }

            if (element instanceof egret.DisplayObject && element.parent == this._hostComponent) {
                var childDO = element;
                this._hostComponent._removeFromDisplayList(childDO, notifyListeners);
            }

            element.ownerChanged(null);
            this._hostComponent.invalidateSize();
            this._hostComponent.invalidateDisplayList();
        };

        Object.defineProperty(Skin.prototype, "states", {
            /**
            * 为此组件定义的视图状态。
            * @member egret.StateClientHelper#states
            */
            get: function () {
                return this._states;
            },
            set: function (value) {
                this._setStates(value);
            },
            enumerable: true,
            configurable: true
        });

        Skin.prototype._setStates = function (value) {
            if (!value)
                value = [];
            if (typeof (value[0]) == "string") {
                var length = value.length;
                for (var i = 0; i < length; i++) {
                    var state = new egret.State(value[i], []);
                    value[i] = state;
                }
            }

            this._states = value;
            this.currentStateChanged = true;
            this.requestedCurrentState = this._currentState;
            if (!this.hasState(this.requestedCurrentState)) {
                this.requestedCurrentState = this.getDefaultState();
            }
        };

        Object.defineProperty(Skin.prototype, "currentState", {
            /**
            * 组件的当前视图状态。将其设置为 "" 或 null 可将组件重置回其基本状态。
            * @member egret.StateClientHelper#currentState
            */
            get: function () {
                if (this.currentStateChanged)
                    return this.requestedCurrentState;
                return this._currentState ? this._currentState : this.getDefaultState();
            },
            set: function (value) {
                if (!value)
                    value = this.getDefaultState();
                if (value != this.currentState && value && this.currentState) {
                    this.requestedCurrentState = value;
                    this.currentStateChanged = true;
                    if (this._hostComponent) {
                        this.commitCurrentState();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 返回是否含有指定名称的视图状态
        * @method egret.Skin#hasState
        * @param stateName {string}
        * @returns {boolean}
        */
        Skin.prototype.hasState = function (stateName) {
            return (this.getState(stateName) != null);
        };

        /**
        * 返回默认状态
        */
        Skin.prototype.getDefaultState = function () {
            if (this._states.length > 0) {
                return this._states[0].name;
            }
            return null;
        };

        /**
        * 应用当前的视图状态。子类覆盖此方法在视图状态发生改变时执行相应更新操作。
        * @method egret.Skin#commitCurrentState
        */
        Skin.prototype.commitCurrentState = function () {
            if (!this.currentStateChanged)
                return;
            this.currentStateChanged = false;
            var destination = this.getState(this.requestedCurrentState);
            if (!destination) {
                this.requestedCurrentState = this.getDefaultState();
            }
            var oldState = this._currentState ? this._currentState : "";
            if (this.hasEventListener(egret.StateChangeEvent.CURRENT_STATE_CHANGING)) {
                egret.StateChangeEvent.dispatchStateChangeEvent(this, egret.StateChangeEvent.CURRENT_STATE_CHANGING, oldState, this.requestedCurrentState ? this.requestedCurrentState : "");
            }

            this.removeState(this._currentState);
            this._currentState = this.requestedCurrentState;

            if (this._currentState) {
                this.applyState(this._currentState);
            }

            if (this.hasEventListener(egret.StateChangeEvent.CURRENT_STATE_CHANGE)) {
                egret.StateChangeEvent.dispatchStateChangeEvent(this, egret.StateChangeEvent.CURRENT_STATE_CHANGE, oldState, this._currentState ? this._currentState : "");
            }
        };

        /**
        * 通过名称返回视图状态
        */
        Skin.prototype.getState = function (stateName) {
            if (!stateName)
                return null;
            var states = this._states;
            var length = states.length;
            for (var i = 0; i < length; i++) {
                var state = states[i];
                if (state.name == stateName)
                    return state;
            }
            return null;
        };

        /**
        * 移除指定的视图状态以及所依赖的所有父级状态，除了与新状态的共同状态外
        */
        Skin.prototype.removeState = function (stateName) {
            var state = this.getState(stateName);
            if (state) {
                var overrides = state.overrides;
                for (var i = overrides.length - 1; i >= 0; i--)
                    overrides[i].remove(this);
            }
        };

        /**
        * 应用新状态
        */
        Skin.prototype.applyState = function (stateName) {
            var state = this.getState(stateName);
            if (state) {
                var overrides = state.overrides;
                var length = overrides.length;
                for (var i = 0; i < length; i++)
                    overrides[i].apply((this));
            }
        };

        /**
        * 初始化所有视图状态
        * @method egret.StateClientHelper#initializeStates
        */
        Skin.prototype.initializeStates = function () {
            if (this.initialized)
                return;
            this.initialized = true;
            var states = this._states;
            var length = states.length;
            for (var i = 0; i < length; i++) {
                var state = (states[i]);
                state.initialize(this);
            }
        };
        return Skin;
    })(egret.EventDispatcher);
    egret.Skin = Skin;
})(egret || (egret = {}));
