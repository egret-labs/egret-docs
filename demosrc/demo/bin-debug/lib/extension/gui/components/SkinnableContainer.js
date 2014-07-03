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
    * @class egret.SkinnableContainer
    * @classdesc
    * 可设置外观的容器的基类
    * @extends egret.SkinnableComponent
    * @implements egret.IVisualElementContainer
    */
    var SkinnableContainer = (function (_super) {
        __extends(SkinnableContainer, _super);
        /**
        * @method egret.SkinnableContainer#constructor
        */
        function SkinnableContainer() {
            _super.call(this);
            /**
            * contentGroup发生改变时传递的参数
            */
            this.contentGroupProperties = {};
            this.hostComponentKey = "egret.SkinnableContainer";
        }
        /**
        * 获取当前的实体容器
        */
        SkinnableContainer.prototype._getCurrentContentGroup = function () {
            if (this.contentGroup == null) {
                if (this._placeHolderGroup == null) {
                    this._placeHolderGroup = new egret.Group();
                    this._placeHolderGroup.visible = false;
                    this._addToDisplayList(this._placeHolderGroup);
                }
                this._placeHolderGroup.addEventListener(egret.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                this._placeHolderGroup.addEventListener(egret.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this);
                return this._placeHolderGroup;
            } else {
                return this.contentGroup;
            }
        };

        Object.defineProperty(SkinnableContainer.prototype, "elementsContent", {
            /**
            * 设置容器子对象数组 。数组包含要添加到容器的子项列表，之前的已存在于容器中的子项列表被全部移除后添加列表里的每一项到容器。
            * 设置该属性时会对您输入的数组进行一次浅复制操作，所以您之后对该数组的操作不会影响到添加到容器的子项列表数量。
            */
            set: function (value) {
                this._getCurrentContentGroup().elementsContent = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SkinnableContainer.prototype, "numElements", {
            /**
            * @member egret.SkinnableContainer#numElements
            */
            get: function () {
                return this._getCurrentContentGroup().numElements;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.SkinnableContainer#getElementAt
        * @param index {number}
        * @returns {IVisualElement}
        */
        SkinnableContainer.prototype.getElementAt = function (index) {
            return this._getCurrentContentGroup().getElementAt(index);
        };

        /**
        * @method egret.SkinnableContainer#addElement
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        SkinnableContainer.prototype.addElement = function (element) {
            return this._getCurrentContentGroup().addElement(element);
        };

        /**
        * @method egret.SkinnableContainer#addElementAt
        * @param element {IVisualElement}
        * @param index {number}
        * @returns {IVisualElement}
        */
        SkinnableContainer.prototype.addElementAt = function (element, index) {
            return this._getCurrentContentGroup().addElementAt(element, index);
        };

        /**
        * @method egret.SkinnableContainer#removeElement
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        SkinnableContainer.prototype.removeElement = function (element) {
            return this._getCurrentContentGroup().removeElement(element);
        };

        /**
        * @method egret.SkinnableContainer#removeElementAt
        * @param index {number}
        * @returns {IVisualElement}
        */
        SkinnableContainer.prototype.removeElementAt = function (index) {
            return this._getCurrentContentGroup().removeElementAt(index);
        };

        /**
        * @method egret.SkinnableContainer#removeAllElements
        */
        SkinnableContainer.prototype.removeAllElements = function () {
            this._getCurrentContentGroup().removeAllElements();
        };

        /**
        * @method egret.SkinnableContainer#getElementIndex
        * @param element {IVisualElement}
        * @returns {number}
        */
        SkinnableContainer.prototype.getElementIndex = function (element) {
            return this._getCurrentContentGroup().getElementIndex(element);
        };

        /**
        * @method egret.SkinnableContainer#setElementIndex
        * @param element {IVisualElement}
        * @param index {number}
        */
        SkinnableContainer.prototype.setElementIndex = function (element, index) {
            this._getCurrentContentGroup().setElementIndex(element, index);
        };

        /**
        * @method egret.SkinnableContainer#swapElements
        * @param element1 {IVisualElement}
        * @param element2 {IVisualElement}
        */
        SkinnableContainer.prototype.swapElements = function (element1, element2) {
            this._getCurrentContentGroup().swapElements(element1, element2);
        };

        /**
        * @method egret.SkinnableContainer#swapElementsAt
        * @param index1 {number}
        * @param index2 {number}
        */
        SkinnableContainer.prototype.swapElementsAt = function (index1, index2) {
            this._getCurrentContentGroup().swapElementsAt(index1, index2);
        };

        Object.defineProperty(SkinnableContainer.prototype, "layout", {
            /**
            * 此容器的布局对象
            * @member egret.SkinnableContainer#layout
            */
            get: function () {
                return this.contentGroup != null ? this.contentGroup.layout : this.contentGroupProperties.layout;
            },
            set: function (value) {
                if (this.contentGroup != null) {
                    this.contentGroup.layout = value;
                } else {
                    this.contentGroupProperties.layout = value;
                }
            },
            enumerable: true,
            configurable: true
        });


        /**
        * @method egret.SkinnableContainer#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        SkinnableContainer.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.contentGroup) {
                if (this.contentGroupProperties.layout !== undefined) {
                    this.contentGroup.layout = this.contentGroupProperties.layout;
                    this.contentGroupProperties = {};
                }
                if (this._placeHolderGroup) {
                    this._placeHolderGroup.removeEventListener(egret.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                    this._placeHolderGroup.removeEventListener(egret.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this);
                    var sourceContent = this._placeHolderGroup._getElementsContent().concat();
                    for (var i = this._placeHolderGroup.numElements; i > 0; i--) {
                        var element = this._placeHolderGroup.removeElementAt(0);
                        element.ownerChanged(null);
                    }
                    this._removeFromDisplayList(this._placeHolderGroup);
                    this.contentGroup.elementsContent = sourceContent;
                    for (i = sourceContent.length - 1; i >= 0; i--) {
                        element = sourceContent[i];
                        element.ownerChanged(this);
                    }
                    this._placeHolderGroup = null;
                }
                this.contentGroup.addEventListener(egret.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                this.contentGroup.addEventListener(egret.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this);
            }
        };

        /**
        * @method egret.SkinnableContainer#partRemoved
        * @param partName {string}
        * @param instance {any}
        */
        SkinnableContainer.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.contentGroup) {
                this.contentGroup.removeEventListener(egret.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                this.contentGroup.removeEventListener(egret.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this);
                this.contentGroupProperties.layout = this.contentGroup.layout;
                this.contentGroup.layout = null;
                if (this.contentGroup.numElements > 0) {
                    this._placeHolderGroup = new egret.Group;

                    while (this.contentGroup.numElements > 0) {
                        this._placeHolderGroup.addElement(this.contentGroup.getElementAt(0));
                    }
                    this._placeHolderGroup.addEventListener(egret.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                    this._placeHolderGroup.addEventListener(egret.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this);
                }
            }
        };

        /**
        * 容器添加元素事件
        * @method egret.SkinnableContainer#_contentGroup_elementAddedHandler
        * @param event {ElementExistenceEvent}
        */
        SkinnableContainer.prototype._contentGroup_elementAddedHandler = function (event) {
            event.element.ownerChanged(this);
            this.dispatchEvent(event);
        };

        /**
        * 容器移除元素事件
        * @method egret.SkinnableContainer#_contentGroup_elementRemovedHandler
        * @param event {ElementExistenceEvent}
        */
        SkinnableContainer.prototype._contentGroup_elementRemovedHandler = function (event) {
            event.element.ownerChanged(null);
            this.dispatchEvent(event);
        };
        return SkinnableContainer;
    })(egret.SkinnableComponent);
    egret.SkinnableContainer = SkinnableContainer;
})(egret || (egret = {}));
