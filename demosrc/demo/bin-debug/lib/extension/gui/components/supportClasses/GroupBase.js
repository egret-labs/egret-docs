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
    * @class egret.GroupBase
    * @classdesc
    * 自动布局容器基类
    * @extends egret.UIComponent
    * @implements egret.IViewport
    */
    var GroupBase = (function (_super) {
        __extends(GroupBase, _super);
        /**
        * @method egret.GroupBase#constructor
        */
        function GroupBase() {
            _super.call(this);
            this._contentWidth = 0;
            this._contentHeight = 0;
            this._clipAndEnableScrolling = false;
            this._horizontalScrollPosition = 0;
            this._verticalScrollPosition = 0;
            /**
            * 在更新显示列表时是否需要更新布局标志
            * @member egret.GroupBase#_layoutInvalidateDisplayListFlag
            */
            this._layoutInvalidateDisplayListFlag = false;
            /**
            * 在测量尺寸时是否需要测量布局的标志
            * @member egret.GroupBase#_layoutInvalidateSizeFlag
            */
            this._layoutInvalidateSizeFlag = false;
            this.touchEnabled = false;
        }
        /**
        * @method egret.GroupBase#createChildren
        */
        GroupBase.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (!this._layout) {
                this.layout = new egret.BasicLayout;
            }
        };

        Object.defineProperty(GroupBase.prototype, "contentWidth", {
            /**
            * @member egret.GroupBase#contentWidth
            */
            get: function () {
                return this._contentWidth;
            },
            enumerable: true,
            configurable: true
        });

        GroupBase.prototype.setContentWidth = function (value) {
            if (value == this._contentWidth)
                return;
            var oldValue = this._contentWidth;
            this._contentWidth = value;
            if (this.hasEventListener("propertyChange"))
                egret.PropertyChangeEvent.dispatchPropertyChangeEvent(this, egret.PropertyChangeEventKind.UPDATE, "contentWidth", oldValue, value, this);
        };

        Object.defineProperty(GroupBase.prototype, "contentHeight", {
            /**
            * @member egret.GroupBase#contentHeight
            */
            get: function () {
                return this._contentHeight;
            },
            enumerable: true,
            configurable: true
        });

        GroupBase.prototype.setContentHeight = function (value) {
            if (value == this._contentHeight)
                return;
            var oldValue = this._contentHeight;
            this._contentHeight = value;
            if (this.hasEventListener("propertyChange"))
                egret.PropertyChangeEvent.dispatchPropertyChangeEvent(this, egret.PropertyChangeEventKind.UPDATE, "contentHeight", oldValue, value, this);
        };

        /**
        * 设置 contentWidth 和 contentHeight 属性，此方法由Layout类调用
        * @method egret.GroupBase#setContentSize
        * @private
        *
        * @param width {number}
        * @param height {number}
        */
        GroupBase.prototype.setContentSize = function (width, height) {
            if ((width == this._contentWidth) && (height == this._contentHeight))
                return;
            this.setContentWidth(width);
            this.setContentHeight(height);
        };

        Object.defineProperty(GroupBase.prototype, "layout", {
            /**
            * 此容器的布局对象
            * @member egret.GroupBase#layout
            */
            get: function () {
                return this._layout;
            },
            set: function (value) {
                this._setLayout(value);
            },
            enumerable: true,
            configurable: true
        });


        GroupBase.prototype._setLayout = function (value) {
            if (this._layout == value)
                return;
            if (this._layout) {
                this._layout.target = null;
            }

            this._layout = value;

            if (this._layout) {
                this._layout.target = this;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
            this.dispatchEventWith("layoutChanged");
        };

        Object.defineProperty(GroupBase.prototype, "clipAndEnableScrolling", {
            /**
            * 如果为 true，指定将子代剪切到视区的边界。如果为 false，则容器子代会从容器边界扩展过去，而不管组件的大小规范。默认false
            * @member egret.GroupBase#clipAndEnableScrolling
            */
            get: function () {
                return this._clipAndEnableScrolling;
            },
            set: function (value) {
                if (value == this._clipAndEnableScrolling)
                    return;
                this._clipAndEnableScrolling = value;
                if (this._clipAndEnableScrolling) {
                    this.scrollRect = new egret.Rectangle(this._horizontalScrollPosition, this._verticalScrollPosition, this.width, this.height);
                } else {
                    this.scrollRect = null;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(GroupBase.prototype, "horizontalScrollPosition", {
            /**
            * 可视区域水平方向起始点
            * @member egret.GroupBase#horizontalScrollPosition
            */
            get: function () {
                return this._horizontalScrollPosition;
            },
            set: function (value) {
                if (value == this._horizontalScrollPosition)
                    return;
                var oldValue = this._horizontalScrollPosition;
                this._horizontalScrollPosition = value;
                this.scrollPositionChanged();
                egret.PropertyChangeEvent.dispatchPropertyChangeEvent(this, egret.PropertyChangeEventKind.UPDATE, "horizontalScrollPosition", oldValue, value, this);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(GroupBase.prototype, "verticalScrollPosition", {
            /**
            * 可视区域竖直方向起始点
            * @member egret.GroupBase#verticalScrollPosition
            */
            get: function () {
                return this._verticalScrollPosition;
            },
            set: function (value) {
                if (value == this._verticalScrollPosition)
                    return;
                var oldValue = this._verticalScrollPosition;
                this._verticalScrollPosition = value;
                this.scrollPositionChanged();
                egret.PropertyChangeEvent.dispatchPropertyChangeEvent(this, egret.PropertyChangeEventKind.UPDATE, "verticalScrollPosition", oldValue, value, this);
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 滚动条位置改变
        */
        GroupBase.prototype.scrollPositionChanged = function () {
            if (!this._clipAndEnableScrolling) {
                return;
            }
            this.updateScrollRect(this.width, this.height);
            this._invalidateDisplayListExceptLayout();
            if (this._layout) {
                this._layout.scrollPositionChanged();
            }
        };

        /**
        * 更新可视区域
        * @param w {number}
        * @param h {number}
        */
        GroupBase.prototype.updateScrollRect = function (w, h) {
            var rect = this._scrollRect;
            if (this._clipAndEnableScrolling) {
                if (rect) {
                    rect.x = this._horizontalScrollPosition;
                    rect.y = this._verticalScrollPosition;
                    rect.width = w;
                    rect.height = h;
                } else {
                    this._scrollRect = new egret.Rectangle(this._horizontalScrollPosition, this._verticalScrollPosition, w, h);
                }
            } else if (rect) {
                this._scrollRect = null;
            }
        };

        /**
        * @method egret.GroupBase#measure
        */
        GroupBase.prototype.measure = function () {
            if (!this._layout || !this._layoutInvalidateSizeFlag)
                return;
            _super.prototype.measure.call(this);
            this._layout.measure();
        };

        /**
        * 标记需要更新显示列表但不需要更新布局
        * @method egret.GroupBase#_invalidateDisplayListExceptLayout
        */
        GroupBase.prototype._invalidateDisplayListExceptLayout = function () {
            _super.prototype.invalidateDisplayList.call(this);
        };

        /**
        * @method egret.GroupBase#invalidateDisplayList
        */
        GroupBase.prototype.invalidateDisplayList = function () {
            _super.prototype.invalidateDisplayList.call(this);
            this._layoutInvalidateDisplayListFlag = true;
        };

        /**
        * @method egret.GroupBase#_childXYChanged
        */
        GroupBase.prototype._childXYChanged = function () {
            this.invalidateSize();
            this.invalidateDisplayList();
        };

        /**
        * 标记需要更新显示列表但不需要更新布局
        * @method egret.GroupBase#_invalidateSizeExceptLayout
        */
        GroupBase.prototype._invalidateSizeExceptLayout = function () {
            _super.prototype.invalidateSize.call(this);
        };

        /**
        * @method egret.GroupBase#invalidateSize
        */
        GroupBase.prototype.invalidateSize = function () {
            _super.prototype.invalidateSize.call(this);
            this._layoutInvalidateSizeFlag = true;
        };

        /**
        * @method egret.GroupBase#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        GroupBase.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            if (this._layoutInvalidateDisplayListFlag && this._layout) {
                this._layoutInvalidateDisplayListFlag = false;
                this._layout.updateDisplayList(unscaledWidth, unscaledHeight);
                this.updateScrollRect(unscaledWidth, unscaledHeight);
            }
        };

        Object.defineProperty(GroupBase.prototype, "numElements", {
            /**
            * 此容器中的可视元素的数量。
            * @member egret.GroupBase#numElements
            */
            get: function () {
                return -1;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 返回指定索引处的可视元素。
        * @method egret.GroupBase#getElementAt
        * @param index {number} 要检索的元素的索引。
        * @throws RangeError 如果在子列表中不存在该索引位置。
        * @returns {IVisualElement}
        */
        GroupBase.prototype.getElementAt = function (index) {
            return null;
        };

        /**
        * 返回可视元素的索引位置。若不存在，则返回-1。
        * @method egret.GroupBase#getElementIndex
        * @param element {IVisualElement} 可视元素。
        * @returns {number}
        */
        GroupBase.prototype.getElementIndex = function (element) {
            return -1;
        };

        /**
        * 返回在容器可视区域内的布局元素索引列表,此方法忽略不是布局元素的普通的显示对象
        * @method egret.GroupBase#getElementIndicesInView
        * @returns {number}
        */
        GroupBase.prototype.getElementIndicesInView = function () {
            var visibleIndices = [];
            var index;
            if (!this.scrollRect) {
                for (index = 0; index < this.numChildren; index++) {
                    visibleIndices.push(index);
                }
            } else {
                for (index = 0; index < this.numChildren; index++) {
                    var layoutElement = (this.getChildAt(index));
                    if (!layoutElement)
                        continue;
                    var eltR = new egret.Rectangle();
                    eltR.x = layoutElement.layoutBoundsX;
                    eltR.y = layoutElement.layoutBoundsY;
                    eltR.width = layoutElement.layoutBoundsWidth;
                    eltR.height = layoutElement.layoutBoundsHeight;
                    if (this.scrollRect.intersects(eltR))
                        visibleIndices.push(index);
                }
            }
            return visibleIndices;
        };

        /**
        * 在支持虚拟布局的容器中，设置容器内可见的子元素索引范围。此方法在不支持虚拟布局的容器中无效。
        * 通常在即将连续调用getVirtualElementAt()之前需要显式设置一次，以便容器提前释放已经不可见的子元素。
        * @method egret.GroupBase#setVirtualElementIndicesInView
        * @param startIndex {number} 可视元素起始索引
        * @param endIndex {number} 可视元素结束索引
        */
        GroupBase.prototype.setVirtualElementIndicesInView = function (startIndex, endIndex) {
        };

        /**
        * 支持useVirtualLayout属性的布局类在updateDisplayList()中使用此方法来获取“处于视图中”的布局元素
        * @method egret.GroupBase#getVirtualElementAt
        * @param index {number} 要检索的元素的索引。
        * @returns {IVisualElement}
        */
        GroupBase.prototype.getVirtualElementAt = function (index) {
            return this.getElementAt(index);
        };
        return GroupBase;
    })(egret.UIComponent);
    egret.GroupBase = GroupBase;
})(egret || (egret = {}));
