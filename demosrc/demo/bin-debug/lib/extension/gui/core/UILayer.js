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
var egret;
(function (egret) {
    /**
    * @class egret.UILayer
    * @classdesc
    * UIStage的虚拟子容器
    * @implements egret.IContainer
    */
    var UILayer = (function () {
        /**
        * 构造函数
        * @method egret.UILayer#constructor
        * @param owner {IUIStage}
        * @param lowerBoundReference {string}
        * @param upperBoundReference {strin}
        */
        function UILayer(owner, lowerBoundReference, upperBoundReference) {
            this.raw_getElementAt = "raw_getElementAt";
            this.raw_addElementAt = "raw_addElementAt";
            this.raw_getElementIndex = "raw_getElementIndex";
            this.raw_removeElement = "raw_removeElement";
            this.raw_removeElementAt = "raw_removeElementAt";
            this.raw_setElementIndex = "raw_setElementIndex";
            this.owner = owner;
            this.lowerBoundReference = lowerBoundReference;
            this.upperBoundReference = upperBoundReference;
        }
        Object.defineProperty(UILayer.prototype, "numElements", {
            /**
            * @member egret.UILayer#numElements
            */
            get: function () {
                return this.owner[this.upperBoundReference] - this.owner[this.lowerBoundReference];
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.UILayer#getElementAt
        * @param index {number}
        * @returns {IVisualElement}
        */
        UILayer.prototype.getElementAt = function (index) {
            var retval = this.owner[this.raw_getElementAt](this.owner[this.lowerBoundReference] + index);
            return retval;
        };

        /**
        * @method egret.UILayer#addElement
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        UILayer.prototype.addElement = function (element) {
            var index = this.owner[this.upperBoundReference];
            if (element.parent === this.owner)
                index--;
            this.owner[this.upperBoundReference]++;
            this.owner[this.raw_addElementAt](element, index);
            element.ownerChanged(this);
            return element;
        };

        /**
        * @method egret.UILayer#addElementAt
        * @param element {IVisualElement}
        * @param index {number}
        * @returns {IVisualElement}
        */
        UILayer.prototype.addElementAt = function (element, index) {
            this.owner[this.upperBoundReference]++;
            this.owner[this.raw_addElementAt](element, this.owner[this.lowerBoundReference] + index);
            element.ownerChanged(this);
            return element;
        };

        /**
        * @method egret.UILayer#removeElement
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        UILayer.prototype.removeElement = function (element) {
            var index = this.owner[this.raw_getElementIndex](element);
            if (this.owner[this.lowerBoundReference] <= index && index < this.owner[this.upperBoundReference]) {
                this.owner[this.raw_removeElement](element);
                this.owner[this.upperBoundReference]--;
            }
            element.ownerChanged(null);
            return element;
        };

        /**
        * @method egret.UILayer#removeElementAt
        * @param index {number}
        * @returns {IVisualElement}
        */
        UILayer.prototype.removeElementAt = function (index) {
            index += this.owner[this.lowerBoundReference];
            var element;
            if (this.owner[this.lowerBoundReference] <= index && index < this.owner[this.upperBoundReference]) {
                element = this.owner[this.raw_removeElementAt](index);
                this.owner[this.upperBoundReference]--;
            }
            element.ownerChanged(null);
            return element;
        };

        /**
        * @method egret.UILayer#getElementIndex
        * @param element {IVisualElement}
        * @returns {number}
        */
        UILayer.prototype.getElementIndex = function (element) {
            var retval = this.owner[this.raw_getElementIndex](element);
            retval -= this.owner[this.lowerBoundReference];
            return retval;
        };

        /**
        * @method egret.UILayer#setElementIndex
        * @param element {IVisualElement}
        * @param index {number}
        */
        UILayer.prototype.setElementIndex = function (element, index) {
            this.owner[this.raw_setElementIndex](element, this.owner[this.lowerBoundReference] + index);
        };
        return UILayer;
    })();
    egret.UILayer = UILayer;
})(egret || (egret = {}));
