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
    * @class egret.Group
    * @classdesc
    * 自动布局容器
    * @extends egret.GroupBase
    * @implements egret.IVisualElementContainer
    */
    var Group = (function (_super) {
        __extends(Group, _super);
        /**
        * @method egret.Group#constructor
        */
        function Group() {
            _super.call(this);
            /**
            * createChildren()方法已经执行过的标志
            */
            this.createChildrenCalled = false;
            /**
            * elementsContent改变标志
            */
            this.elementsContentChanged = false;
            this._elementsContent = [];
        }
        /**
        * @method egret.Group#createChildren
        */
        Group.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createChildrenCalled = true;
            if (this.elementsContentChanged) {
                this.elementsContentChanged = false;
                this.setElementsContent(this._elementsContent);
            }
        };

        /**
        * 返回子元素列表
        */
        Group.prototype._getElementsContent = function () {
            return this._elementsContent;
        };

        Object.defineProperty(Group.prototype, "elementsContent", {
            /**
            * 设置容器子对象数组 。数组包含要添加到容器的子项列表，之前的已存在于容器中的子项列表被全部移除后添加列表里的每一项到容器。
            * 设置该属性时会对您输入的数组进行一次浅复制操作，所以您之后对该数组的操作不会影响到添加到容器的子项列表数量。
            */
            set: function (value) {
                if (value == null)
                    value = [];
                if (value == this._elementsContent)
                    return;
                if (this.createChildrenCalled) {
                    this.setElementsContent(value);
                } else {
                    this.elementsContentChanged = true;
                    for (var i = this._elementsContent.length - 1; i >= 0; i--) {
                        this._elementRemoved(this._elementsContent[i], i);
                    }
                    this._elementsContent = value;
                }
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 设置容器子对象列表
        */
        Group.prototype.setElementsContent = function (value) {
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
        };

        Object.defineProperty(Group.prototype, "numElements", {
            /**
            * @member egret.Group#numElements
            */
            get: function () {
                return this._elementsContent.length;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.Group#getElementAt
        * @param index {number}
        * @returns {IVisualElement}
        */
        Group.prototype.getElementAt = function (index) {
            this.checkForRangeError(index);
            return this._elementsContent[index];
        };

        Group.prototype.checkForRangeError = function (index, addingElement) {
            if (typeof addingElement === "undefined") { addingElement = false; }
            var maxIndex = this._elementsContent.length - 1;

            if (addingElement)
                maxIndex++;

            if (index < 0 || index > maxIndex)
                throw new RangeError("索引:\"" + index + "\"超出可视元素索引范围");
        };

        /**
        * @method egret.Group#addElement
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        Group.prototype.addElement = function (element) {
            var index = this.numElements;

            if (element.parent == this)
                index = this.numElements - 1;

            return this.addElementAt(element, index);
        };

        /**
        * @method egret.Group#addElementAt
        * @param element {IVisualElement}
        * @param index {number}
        * @returns {IVisualElement}
        */
        Group.prototype.addElementAt = function (element, index) {
            if (element == this)
                return element;

            this.checkForRangeError(index, true);

            var host = element.owner;
            if (host == this) {
                this.setElementIndex(element, index);
                return element;
            } else if (host && "removeElement" in host) {
                (element.owner).removeElement(element);
            }

            this._elementsContent.splice(index, 0, element);

            if (!this.elementsContentChanged)
                this._elementAdded(element, index);

            return element;
        };

        /**
        * @method egret.Group#removeElement
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        Group.prototype.removeElement = function (element) {
            return this.removeElementAt(this.getElementIndex(element));
        };

        /**
        * @method egret.Group#removeElementAt
        * @param index {number}
        * @returns {IVisualElement}
        */
        Group.prototype.removeElementAt = function (index) {
            this.checkForRangeError(index);

            var element = this._elementsContent[index];

            if (!this.elementsContentChanged)
                this._elementRemoved(element, index);

            this._elementsContent.splice(index, 1);

            return element;
        };

        /**
        * @method egret.Group#removeAllElements
        */
        Group.prototype.removeAllElements = function () {
            for (var i = this.numElements - 1; i >= 0; i--) {
                this.removeElementAt(i);
            }
        };

        /**
        * @method egret.Group#getElementIndex
        * @param element {IVisualElement}
        * @returns {number}
        */
        Group.prototype.getElementIndex = function (element) {
            return this._elementsContent.indexOf(element);
        };

        /**
        * @method egret.Group#setElementIndex
        * @param element {IVisualElement}
        * @param index {number}
        */
        Group.prototype.setElementIndex = function (element, index) {
            this.checkForRangeError(index);

            var oldIndex = this.getElementIndex(element);
            if (oldIndex == -1 || oldIndex == index)
                return;

            if (!this.elementsContentChanged)
                this._elementRemoved(element, oldIndex, false);

            this._elementsContent.splice(oldIndex, 1);
            this._elementsContent.splice(index, 0, element);

            if (!this.elementsContentChanged)
                this._elementAdded(element, index, false);
        };

        /**
        * @method egret.Group#swapElements
        * @param element1 {IVisualElement}
        * @param element2 {IVisualElement}
        */
        Group.prototype.swapElements = function (element1, element2) {
            this.swapElementsAt(this.getElementIndex(element1), this.getElementIndex(element2));
        };

        /**
        * @method egret.Group#swapElementsAt
        * @param index1 {number}
        * @param index2 {number}
        */
        Group.prototype.swapElementsAt = function (index1, index2) {
            this.checkForRangeError(index1);
            this.checkForRangeError(index2);

            if (index1 > index2) {
                var temp = index2;
                index2 = index1;
                index1 = temp;
            } else if (index1 == index2)
                return;

            var elementsContent = this._elementsContent;

            var element1 = elementsContent[index1];
            var element2 = elementsContent[index2];
            if (!this.elementsContentChanged) {
                this._elementRemoved(element1, index1, false);
                this._elementRemoved(element2, index2, false);
            }

            elementsContent[index1] = element2;
            elementsContent[index2] = element1;

            if (!this.elementsContentChanged) {
                this._elementAdded(element2, index1, false);
                this._elementAdded(element1, index2, false);
            }
        };

        /**
        * 添加一个显示元素到容器
        * @method egret.Group#_elementAdded
        * @param element {IVisualElement}
        * @param index {number}
        * @param notifyListeners {boolean}
        */
        Group.prototype._elementAdded = function (element, index, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            if (element instanceof egret.DisplayObject) {
                var childDO = element;
                this._addToDisplayListAt(childDO, index, notifyListeners);
            }

            if (notifyListeners) {
                if (this.hasEventListener(egret.ElementExistenceEvent.ELEMENT_ADD))
                    egret.ElementExistenceEvent.dispatchElementExistenceEvent(this, egret.ElementExistenceEvent.ELEMENT_ADD, element, index);
            }

            this.invalidateSize();
            this.invalidateDisplayList();
        };

        /**
        * 从容器移除一个显示元素
        * @method egret.Group#_elementRemoved
        * @param element {IVisualElement}
        * @param index {number}
        * @param notifyListeners {boolean}
        */
        Group.prototype._elementRemoved = function (element, index, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            if (notifyListeners) {
                if (this.hasEventListener(egret.ElementExistenceEvent.ELEMENT_REMOVE))
                    egret.ElementExistenceEvent.dispatchElementExistenceEvent(this, egret.ElementExistenceEvent.ELEMENT_REMOVE, element, index);
            }

            if (element instanceof egret.DisplayObject && element.parent == this) {
                var childDO = element;
                this._removeFromDisplayList(childDO, notifyListeners);
            }

            this.invalidateSize();
            this.invalidateDisplayList();
        };

        /**
        * @method egret.Group#addChild
        * @deprecated
        * @param child {DisplayObject}
        * @returns {DisplayObject}
        */
        Group.prototype.addChild = function (child) {
            throw (new Error("addChild()" + Group.errorStr + "addElement()代替"));
        };

        /**
        * @method egret.Group#addChildAt
        * @deprecated
        * @param child {DisplayObject}
        * @param index {number}
        * @returns {DisplayObject}
        */
        Group.prototype.addChildAt = function (child, index) {
            throw (new Error("addChildAt()" + Group.errorStr + "addElementAt()代替"));
        };

        /**
        * @method egret.Group#removeChild
        * @deprecated
        * @param child {DisplayObject}
        * @returns {DisplayObject}
        */
        Group.prototype.removeChild = function (child) {
            throw (new Error("removeChild()" + Group.errorStr + "removeElement()代替"));
        };

        /**
        * @method egret.Group#removeChildAt
        * @deprecated
        * @param index {number}
        * @returns {DisplayObject}
        */
        Group.prototype.removeChildAt = function (index) {
            throw (new Error("removeChildAt()" + Group.errorStr + "removeElementAt()代替"));
        };

        /**
        * @method egret.Group#setChildIndex
        * @deprecated
        * @param child {DisplayObject}
        * @param index {number}
        */
        Group.prototype.setChildIndex = function (child, index) {
            throw (new Error("setChildIndex()" + Group.errorStr + "setElementIndex()代替"));
        };

        /**
        * @method egret.Group#swapChildren
        * @deprecated
        * @param child1 {DisplayObject}
        * @param child2 {DisplayObject}
        */
        Group.prototype.swapChildren = function (child1, child2) {
            throw (new Error("swapChildren()" + Group.errorStr + "swapElements()代替"));
        };

        /**
        * @method egret.Group#swapChildrenAt
        * @deprecated
        * @param index1 {number}
        * @param index2 {number}
        */
        Group.prototype.swapChildrenAt = function (index1, index2) {
            throw (new Error("swapChildrenAt()" + Group.errorStr + "swapElementsAt()代替"));
        };
        Group.errorStr = "在此组件中不可用，若此组件为容器类，请使用";
        return Group;
    })(egret.GroupBase);
    egret.Group = Group;
})(egret || (egret = {}));
