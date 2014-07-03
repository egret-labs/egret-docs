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
    * @class egret.TileLayout
    * @classdesc
    * 格子布局
    * @extends egret.LayoutBase
    */
    var TileLayout = (function (_super) {
        __extends(TileLayout, _super);
        /**
        * 构造函数
        * @method egret.TileLayout#constructor
        */
        function TileLayout() {
            _super.call(this);
            /**
            * 标记horizontalGap被显式指定过
            */
            this.explicitHorizontalGap = NaN;
            this._horizontalGap = 6;
            /**
            * 标记verticalGap被显式指定过
            */
            this.explicitVerticalGap = NaN;
            this._verticalGap = 6;
            this._columnCount = -1;
            this._requestedColumnCount = 0;
            this._rowCount = -1;
            this._requestedRowCount = 0;
            /**
            * 外部显式指定的列宽
            */
            this.explicitColumnWidth = NaN;
            this._columnWidth = NaN;
            /**
            * 外部显式指定的行高
            */
            this.explicitRowHeight = NaN;
            this._rowHeight = NaN;
            this._padding = 0;
            this._paddingLeft = NaN;
            this._paddingRight = NaN;
            this._paddingTop = NaN;
            this._paddingBottom = NaN;
            this._horizontalAlign = egret.HorizontalAlign.JUSTIFY;
            this._verticalAlign = egret.VerticalAlign.JUSTIFY;
            this._columnAlign = egret.ColumnAlign.LEFT;
            this._rowAlign = egret.RowAlign.TOP;
            this._orientation = egret.TileOrientation.ROWS;
            /**
            * 缓存的最大子对象宽度
            */
            this.maxElementWidth = 0;
            /**
            * 缓存的最大子对象高度
            */
            this.maxElementHeight = 0;
            /**
            * 当前视图中的第一个元素索引
            */
            this.startIndex = -1;
            /**
            * 当前视图中的最后一个元素的索引
            */
            this.endIndex = -1;
            /**
            * 视图的第一个和最后一个元素的索引值已经计算好的标志
            */
            this.indexInViewCalculated = false;
        }
        Object.defineProperty(TileLayout.prototype, "horizontalGap", {
            /**
            * 列之间的水平空间（以像素为单位）。
            * @member egret.TileLayout#horizontalGap
            */
            get: function () {
                return this._horizontalGap;
            },
            set: function (value) {
                if (value == this._horizontalGap)
                    return;
                this.explicitHorizontalGap = value;

                this._horizontalGap = value;
                this.invalidateTargetSizeAndDisplayList();
                if (this.hasEventListener("gapChanged"))
                    this.dispatchEventWith("gapChanged");
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "verticalGap", {
            /**
            * 行之间的垂直空间（以像素为单位）。
            * @member egret.TileLayout#verticalGap
            */
            get: function () {
                return this._verticalGap;
            },
            set: function (value) {
                if (value == this._verticalGap)
                    return;
                this.explicitVerticalGap = value;

                this._verticalGap = value;
                this.invalidateTargetSizeAndDisplayList();
                if (this.hasEventListener("gapChanged"))
                    this.dispatchEventWith("gapChanged");
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "columnCount", {
            /**
            * 实际列计数。
            * @member egret.TileLayout#columnCount
            */
            get: function () {
                return this._columnCount;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TileLayout.prototype, "requestedColumnCount", {
            /**
            * 要显示的列数。设置为0表示自动确定列计数,默认值0。<br/>
            * 注意:当orientation为TileOrientation.COLUMNS(逐列排列元素)且taget被显式设置宽度时，此属性无效。
            * @member egret.TileLayout#requestedColumnCount
            */
            get: function () {
                return this._requestedColumnCount;
            },
            set: function (value) {
                if (this._requestedColumnCount == value)
                    return;
                this._requestedColumnCount = value;
                this._columnCount = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "rowCount", {
            /**
            * 实际行计数。
            * @member egret.TileLayout#rowCount
            */
            get: function () {
                return this._rowCount;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TileLayout.prototype, "requestedRowCount", {
            /**
            * 要显示的行数。设置为0表示自动确定行计数,默认值0。<br/>
            * 注意:当orientation为TileOrientation.ROWS(即逐行排列元素,此为默认值)且target被显式设置高度时，此属性无效。
            * @member egret.TileLayout#requestedRowCount
            */
            get: function () {
                return this._requestedRowCount;
            },
            set: function (value) {
                if (this._requestedRowCount == value)
                    return;
                this._requestedRowCount = value;
                this._rowCount = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "columnWidth", {
            /**
            * 实际列宽（以像素为单位）。 若未显式设置，则从根据最宽的元素的宽度确定列宽度。
            * @member egret.TileLayout#columnWidth
            */
            get: function () {
                return this._columnWidth;
            },
            /**
            *  @private
            */
            set: function (value) {
                if (value == this._columnWidth)
                    return;
                this.explicitColumnWidth = value;
                this._columnWidth = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "rowHeight", {
            /**
            * 行高（以像素为单位）。 如果未显式设置，则从元素的高度的最大值确定行高度。
            * @member egret.TileLayout#rowHeight
            */
            get: function () {
                return this._rowHeight;
            },
            /**
            *  @private
            */
            set: function (value) {
                if (value == this._rowHeight)
                    return;
                this.explicitRowHeight = value;
                this._rowHeight = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "padding", {
            /**
            * 四个边缘的共同内边距。若单独设置了任一边缘的内边距，则该边缘的内边距以单独设置的值为准。
            * 此属性主要用于快速设置多个边缘的相同内边距。默认值：0。
            * @member egret.TileLayout#padding
            */
            get: function () {
                return this._padding;
            },
            set: function (value) {
                if (this._padding == value)
                    return;
                this._padding = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TileLayout.prototype, "paddingLeft", {
            /**
            * 容器的左边缘与布局元素的左边缘之间的最少像素数,若为NaN将使用padding的值，默认值：NaN。
            * @member egret.TileLayout#paddingLeft
            */
            get: function () {
                return this._paddingLeft;
            },
            set: function (value) {
                if (this._paddingLeft == value)
                    return;

                this._paddingLeft = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "paddingRight", {
            /**
            * 容器的右边缘与布局元素的右边缘之间的最少像素数,若为NaN将使用padding的值，默认值：NaN。
            * @member egret.TileLayout#paddingRight
            */
            get: function () {
                return this._paddingRight;
            },
            set: function (value) {
                if (this._paddingRight == value)
                    return;

                this._paddingRight = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "paddingTop", {
            /**
            * 容器的顶边缘与第一个布局元素的顶边缘之间的像素数,若为NaN将使用padding的值，默认值：NaN。
            * @member egret.TileLayout#paddingTop
            */
            get: function () {
                return this._paddingTop;
            },
            set: function (value) {
                if (this._paddingTop == value)
                    return;

                this._paddingTop = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "paddingBottom", {
            /**
            * 容器的底边缘与最后一个布局元素的底边缘之间的像素数,若为NaN将使用padding的值，默认值：NaN。
            * @member egret.TileLayout#paddingBottom
            */
            get: function () {
                return this._paddingBottom;
            },
            set: function (value) {
                if (this._paddingBottom == value)
                    return;

                this._paddingBottom = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "horizontalAlign", {
            /**
            * 指定如何在水平方向上对齐单元格内的元素。
            * 支持的值有 HorizontalAlign.LEFT、HorizontalAlign.CENTER、
            * HorizontalAlign.RIGHT、HorizontalAlign.JUSTIFY。
            * 默认值：HorizontalAlign.JUSTIFY
            * @member egret.TileLayout#horizontalAlign
            */
            get: function () {
                return this._horizontalAlign;
            },
            set: function (value) {
                if (this._horizontalAlign == value)
                    return;

                this._horizontalAlign = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "verticalAlign", {
            /**
            * 指定如何在垂直方向上对齐单元格内的元素。
            * 支持的值有 VerticalAlign.TOP、VerticalAlign.MIDDLE、
            * VerticalAlign.BOTTOM、VerticalAlign.JUSTIFY。
            * 默认值：VerticalAlign.JUSTIFY。
            * @member egret.TileLayout#verticalAlign
            */
            get: function () {
                return this._verticalAlign;
            },
            set: function (value) {
                if (this._verticalAlign == value)
                    return;

                this._verticalAlign = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "columnAlign", {
            /**
            * 指定如何将完全可见列与容器宽度对齐。
            * 设置为 ColumnAlign.LEFT 时，它会关闭列两端对齐。在容器的最后一列和右边缘之间可能存在部分可见的列或空白。这是默认值。
            * 设置为 ColumnAlign.JUSTIFY_USING_GAP 时，horizontalGap 的实际值将增大，
            * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。仅存在一个完全可见列时，
            * horizontalGap 的实际值将增大，这样它会将任何部分可见列推到容器的右边缘之外。
            * 请注意显式设置 horizontalGap 属性不会关闭两端对齐。它仅确定初始间隙值。两端对齐可能会增大它。
            * 设置为 ColumnAlign.JUSTIFY_USING_WIDTH 时，columnWidth 的实际值将增大，
            * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。请注意显式设置 columnWidth 属性不会关闭两端对齐。
            * 它仅确定初始列宽度值。两端对齐可能会增大它。
            * @member egret.TileLayout#columnAlign
            */
            get: function () {
                return this._columnAlign;
            },
            set: function (value) {
                if (this._columnAlign == value)
                    return;

                this._columnAlign = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "rowAlign", {
            /**
            * @member egret.TileLayout#rowAlign
            */
            get: function () {
                return this._rowAlign;
            },
            /**
            * 指定如何将完全可见行与容器高度对齐。
            * 设置为 RowAlign.TOP 时，它会关闭列两端对齐。在容器的最后一行和底边缘之间可能存在部分可见的行或空白。这是默认值。
            *
            * 设置为 RowAlign.JUSTIFY_USING_GAP 时，verticalGap 的实际值会增大，
            * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。仅存在一个完全可见行时，verticalGap 的值会增大，
            * 这样它会将任何部分可见行推到容器的底边缘之外。请注意，显式设置 verticalGap
            * 不会关闭两端对齐，而只是确定初始间隙值。两端对齐接着可以增大它。
            *
            * 设置为 RowAlign.JUSTIFY_USING_HEIGHT 时，rowHeight 的实际值会增大，
            * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。请注意，显式设置 rowHeight
            * 不会关闭两端对齐，而只是确定初始行高度值。两端对齐接着可以增大它。
            */
            set: function (value) {
                if (this._rowAlign == value)
                    return;

                this._rowAlign = value;
                this.invalidateTargetSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TileLayout.prototype, "orientation", {
            /**
            * 指定是逐行还是逐列排列元素。
            * @member egret.TileLayout#orientation
            */
            get: function () {
                return this._orientation;
            },
            set: function (value) {
                if (this._orientation == value)
                    return;

                this._orientation = value;
                this.invalidateTargetSizeAndDisplayList();
                if (this.hasEventListener("orientationChanged"))
                    this.dispatchEventWith("orientationChanged");
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 标记目标容器的尺寸和显示列表失效
        */
        TileLayout.prototype.invalidateTargetSizeAndDisplayList = function () {
            if (this.target) {
                this.target.invalidateSize();
                this.target.invalidateDisplayList();
            }
        };

        /**
        * @method egret.TileLayout#measure
        */
        TileLayout.prototype.measure = function () {
            if (!this.target)
                return;

            var savedColumnCount = this._columnCount;
            var savedRowCount = this._rowCount;
            var savedColumnWidth = this._columnWidth;
            var savedRowHeight = this._rowHeight;

            var measuredWidth = 0;
            var measuredHeight = 0;

            this.calculateRowAndColumn(this.target.explicitWidth, this.target.explicitHeight);
            var columnCount = this._requestedColumnCount > 0 ? this._requestedColumnCount : this._columnCount;
            var rowCount = this._requestedRowCount > 0 ? this._requestedRowCount : this._rowCount;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            if (columnCount > 0) {
                measuredWidth = columnCount * (this._columnWidth + horizontalGap) - horizontalGap;
            }

            if (rowCount > 0) {
                measuredHeight = rowCount * (this._rowHeight + verticalGap) - verticalGap;
            }

            var padding = isNaN(this._padding) ? 0 : this._padding;
            var paddingL = isNaN(this._paddingLeft) ? padding : this._paddingLeft;
            var paddingR = isNaN(this._paddingRight) ? padding : this._paddingRight;
            var paddingT = isNaN(this._paddingTop) ? padding : this._paddingTop;
            var paddingB = isNaN(this._paddingBottom) ? padding : this._paddingBottom;

            var hPadding = paddingL + paddingR;
            var vPadding = paddingT + paddingB;

            this.target.measuredWidth = Math.ceil(measuredWidth + hPadding);
            this.target.measuredHeight = Math.ceil(measuredHeight + vPadding);

            this._columnCount = savedColumnCount;
            this._rowCount = savedRowCount;
            this._columnWidth = savedColumnWidth;
            this._rowHeight = savedRowHeight;
        };

        /**
        * 计算行和列的尺寸及数量
        */
        TileLayout.prototype.calculateRowAndColumn = function (explicitWidth, explicitHeight) {
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            this._rowCount = this._columnCount = -1;
            var numElements = this.target.numElements;
            var count = numElements;
            for (var index = 0; index < count; index++) {
                var elt = (this.target.getElementAt(index));
                if (elt && !elt.includeInLayout) {
                    numElements--;
                }
            }
            if (numElements == 0) {
                this._rowCount = this._columnCount = 0;
                return;
            }

            if (isNaN(this.explicitColumnWidth) || isNaN(this.explicitRowHeight))
                this.updateMaxElementSize();

            if (isNaN(this.explicitColumnWidth)) {
                this._columnWidth = this.maxElementWidth;
            } else {
                this._columnWidth = this.explicitColumnWidth;
            }
            if (isNaN(this.explicitRowHeight)) {
                this._rowHeight = this.maxElementHeight;
            } else {
                this._rowHeight = this.explicitRowHeight;
            }

            var itemWidth = this._columnWidth + horizontalGap;

            //防止出现除数为零的情况
            if (itemWidth <= 0)
                itemWidth = 1;
            var itemHeight = this._rowHeight + verticalGap;
            if (itemHeight <= 0)
                itemHeight = 1;

            var orientedByColumns = (this.orientation == egret.TileOrientation.COLUMNS);
            var widthHasSet = !isNaN(explicitWidth);
            var heightHasSet = !isNaN(explicitHeight);

            var padding = isNaN(this._padding) ? 0 : this._padding;
            var paddingL = isNaN(this._paddingLeft) ? padding : this._paddingLeft;
            var paddingR = isNaN(this._paddingRight) ? padding : this._paddingRight;
            var paddingT = isNaN(this._paddingTop) ? padding : this._paddingTop;
            var paddingB = isNaN(this._paddingBottom) ? padding : this._paddingBottom;

            if (this._requestedColumnCount > 0 || this._requestedRowCount > 0) {
                if (this._requestedRowCount > 0)
                    this._rowCount = Math.min(this._requestedRowCount, numElements);

                if (this._requestedColumnCount > 0)
                    this._columnCount = Math.min(this._requestedColumnCount, numElements);
            } else if (!widthHasSet && !heightHasSet) {
                var side = Math.sqrt(numElements * itemWidth * itemHeight);
                if (orientedByColumns) {
                    this._rowCount = Math.max(1, Math.round(side / itemHeight));
                } else {
                    this._columnCount = Math.max(1, Math.round(side / itemWidth));
                }
            } else if (widthHasSet && (!heightHasSet || !orientedByColumns)) {
                var targetWidth = Math.max(0, explicitWidth - paddingL - paddingR);
                this._columnCount = Math.floor((targetWidth + horizontalGap) / itemWidth);
                this._columnCount = Math.max(1, Math.min(this._columnCount, numElements));
            } else {
                var targetHeight = Math.max(0, explicitHeight - paddingT - paddingB);
                this._rowCount = Math.floor((targetHeight + verticalGap) / itemHeight);
                this._rowCount = Math.max(1, Math.min(this._rowCount, numElements));
            }
            if (this._rowCount == -1)
                this._rowCount = Math.max(1, Math.ceil(numElements / this._columnCount));
            if (this._columnCount == -1)
                this._columnCount = Math.max(1, Math.ceil(numElements / this._rowCount));
            if (this._requestedColumnCount > 0 && this._requestedRowCount > 0) {
                if (this.orientation == egret.TileOrientation.ROWS)
                    this._rowCount = Math.max(1, Math.ceil(numElements / this._requestedColumnCount));
                else
                    this._columnCount = Math.max(1, Math.ceil(numElements / this._requestedRowCount));
            }
        };

        /**
        * 更新最大子对象尺寸
        */
        TileLayout.prototype.updateMaxElementSize = function () {
            if (!this.target)
                return;
            if (this.useVirtualLayout)
                this.updateMaxElementSizeVirtual();
            else
                this.updateMaxElementSizeReal();
        };

        /**
        * 更新虚拟布局的最大子对象尺寸
        */
        TileLayout.prototype.updateMaxElementSizeVirtual = function () {
            var typicalHeight = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22;
            var typicalWidth = this.typicalLayoutRect ? this.typicalLayoutRect.width : 22;
            this.maxElementWidth = Math.max(this.maxElementWidth, typicalWidth);
            this.maxElementHeight = Math.max(this.maxElementHeight, typicalHeight);

            if ((this.startIndex != -1) && (this.endIndex != -1)) {
                for (var index = this.startIndex; index <= this.endIndex; index++) {
                    var elt = (this.target.getVirtualElementAt(index));
                    if (!elt || !elt.includeInLayout)
                        continue;
                    this.maxElementWidth = Math.max(this.maxElementWidth, elt.preferredWidth);
                    this.maxElementHeight = Math.max(this.maxElementHeight, elt.preferredHeight);
                }
            }
        };

        /**
        * 更新真实布局的最大子对象尺寸
        */
        TileLayout.prototype.updateMaxElementSizeReal = function () {
            var numElements = this.target.numElements;
            for (var index = 0; index < numElements; index++) {
                var elt = (this.target.getElementAt(index));
                if (!elt || !elt.includeInLayout)
                    continue;
                this.maxElementWidth = Math.max(this.maxElementWidth, elt.preferredWidth);
                this.maxElementHeight = Math.max(this.maxElementHeight, elt.preferredHeight);
            }
        };

        /**
        * @method egret.TileLayout#clearVirtualLayoutCache
        */
        TileLayout.prototype.clearVirtualLayoutCache = function () {
            _super.prototype.clearVirtualLayoutCache.call(this);
            this.maxElementWidth = 0;
            this.maxElementHeight = 0;
        };

        /**
        * @method egret.TileLayout#scrollPositionChanged
        */
        TileLayout.prototype.scrollPositionChanged = function () {
            _super.prototype.scrollPositionChanged.call(this);
            if (this.useVirtualLayout) {
                var changed = this.getIndexInView();
                if (changed) {
                    this.indexInViewCalculated = true;
                    this.target.invalidateDisplayList();
                }
            }
        };

        /**
        * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
        */
        TileLayout.prototype.getIndexInView = function () {
            if (!this.target || this.target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }

            var numElements = this.target.numElements;
            if (!this.useVirtualLayout) {
                this.startIndex = 0;
                this.endIndex = numElements - 1;
                return false;
            }

            if (isNaN(this.target.width) || this.target.width == 0 || isNaN(this.target.height) || this.target.height == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            var padding = isNaN(this._padding) ? 0 : this._padding;
            var paddingL = isNaN(this._paddingLeft) ? padding : this._paddingLeft;
            var paddingT = isNaN(this._paddingTop) ? padding : this._paddingTop;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            if (this.orientation == egret.TileOrientation.COLUMNS) {
                var itemWidth = this._columnWidth + horizontalGap;
                if (itemWidth <= 0) {
                    this.startIndex = 0;
                    this.endIndex = numElements - 1;
                    return false;
                }
                var minVisibleX = this.target.horizontalScrollPosition;
                var maxVisibleX = this.target.horizontalScrollPosition + this.target.width;
                var startColumn = Math.floor((minVisibleX - paddingL) / itemWidth);
                if (startColumn < 0)
                    startColumn = 0;
                var endColumn = Math.ceil((maxVisibleX - paddingL) / itemWidth);
                if (endColumn < 0)
                    endColumn = 0;
                this.startIndex = Math.min(numElements - 1, Math.max(0, startColumn * this._rowCount));
                this.endIndex = Math.min(numElements - 1, Math.max(0, endColumn * this._rowCount - 1));
            } else {
                var itemHeight = this._rowHeight + verticalGap;
                if (itemHeight <= 0) {
                    this.startIndex = 0;
                    this.endIndex = numElements - 1;
                    return false;
                }
                var minVisibleY = this.target.verticalScrollPosition;
                var maxVisibleY = this.target.verticalScrollPosition + this.target.height;
                var startRow = Math.floor((minVisibleY - paddingT) / itemHeight);
                if (startRow < 0)
                    startRow = 0;
                var endRow = Math.ceil((maxVisibleY - paddingT) / itemHeight);
                if (endRow < 0)
                    endRow = 0;
                this.startIndex = Math.min(numElements - 1, Math.max(0, startRow * this._columnCount));
                this.endIndex = Math.min(numElements - 1, Math.max(0, endRow * this._columnCount - 1));
            }

            return this.startIndex != oldStartIndex || this.endIndex != oldEndIndex;
        };

        /**
        * @method egret.TileLayout#updateDisplayList
        * @param width {number}
        * @param height {number}
        */
        TileLayout.prototype.updateDisplayList = function (width, height) {
            _super.prototype.updateDisplayList.call(this, width, height);
            if (!this.target)
                return;
            var padding = isNaN(this._padding) ? 0 : this._padding;
            var paddingL = isNaN(this._paddingLeft) ? padding : this._paddingLeft;
            var paddingR = isNaN(this._paddingRight) ? padding : this._paddingRight;
            var paddingT = isNaN(this._paddingTop) ? padding : this._paddingTop;
            var paddingB = isNaN(this._paddingBottom) ? padding : this._paddingBottom;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            if (this.indexInViewCalculated) {
                this.indexInViewCalculated = false;
            } else {
                this.calculateRowAndColumn(width, height);
                if (this._rowCount == 0 || this._columnCount == 0) {
                    this.target.setContentSize(paddingL + paddingR, paddingT + paddingB);
                    return;
                }
                this.adjustForJustify(width, height);
                this.getIndexInView();
            }
            if (this.useVirtualLayout) {
                this.calculateRowAndColumn(width, height);
                this.adjustForJustify(width, height);
            }

            if (this.startIndex == -1 || this.endIndex == -1) {
                this.target.setContentSize(0, 0);
                return;
            }
            this.target.setVirtualElementIndicesInView(this.startIndex, this.endIndex);
            var elt;
            var x;
            var y;
            var columnIndex;
            var rowIndex;
            var orientedByColumns = (this.orientation == egret.TileOrientation.COLUMNS);
            var index = this.startIndex;
            for (var i = this.startIndex; i <= this.endIndex; i++) {
                if (this.useVirtualLayout)
                    elt = (this.target.getVirtualElementAt(i));
                else
                    elt = (this.target.getElementAt(i));
                if (elt == null || !elt.includeInLayout)
                    continue;

                if (orientedByColumns) {
                    columnIndex = Math.ceil((index + 1) / this._rowCount) - 1;
                    rowIndex = Math.ceil((index + 1) % this._rowCount) - 1;
                    if (rowIndex == -1)
                        rowIndex = this._rowCount - 1;
                } else {
                    columnIndex = Math.ceil((index + 1) % this._columnCount) - 1;
                    if (columnIndex == -1)
                        columnIndex = this._columnCount - 1;
                    rowIndex = Math.ceil((index + 1) / this._columnCount) - 1;
                }
                x = columnIndex * (this._columnWidth + horizontalGap) + paddingL;
                y = rowIndex * (this._rowHeight + verticalGap) + paddingT;
                this.sizeAndPositionElement(elt, x, y, this._columnWidth, this.rowHeight);
                index++;
            }

            var hPadding = paddingL + paddingR;
            var vPadding = paddingT + paddingB;
            var contentWidth = (this._columnWidth + horizontalGap) * this._columnCount - horizontalGap;
            var contentHeight = (this._rowHeight + verticalGap) * this._rowCount - verticalGap;
            this.target.setContentSize(Math.ceil(contentWidth + hPadding), Math.ceil(contentHeight + vPadding));
        };

        /**
        * 为单个元素布局
        */
        TileLayout.prototype.sizeAndPositionElement = function (element, cellX, cellY, cellWidth, cellHeight) {
            var elementWidth = NaN;
            var elementHeight = NaN;

            if (this.horizontalAlign == egret.HorizontalAlign.JUSTIFY)
                elementWidth = cellWidth;
            else if (!isNaN(element.percentWidth))
                elementWidth = cellWidth * element.percentWidth * 0.01;

            if (this.verticalAlign == egret.VerticalAlign.JUSTIFY)
                elementHeight = cellHeight;
            else if (!isNaN(element.percentHeight))
                elementHeight = cellHeight * element.percentHeight * 0.01;

            element.setLayoutBoundsSize(Math.round(elementWidth), Math.round(elementHeight));

            var x = cellX;
            switch (this.horizontalAlign) {
                case egret.HorizontalAlign.RIGHT:
                    x += cellWidth - element.layoutBoundsWidth;
                    break;
                case egret.HorizontalAlign.CENTER:
                    x = cellX + (cellWidth - element.layoutBoundsWidth) / 2;
                    break;
            }

            var y = cellY;
            switch (this.verticalAlign) {
                case egret.VerticalAlign.BOTTOM:
                    y += cellHeight - element.layoutBoundsHeight;
                    break;
                case egret.VerticalAlign.MIDDLE:
                    y += (cellHeight - element.layoutBoundsHeight) / 2;
                    break;
            }
            element.setLayoutBoundsPosition(Math.round(x), Math.round(y));
        };

        /**
        * 为两端对齐调整间隔或格子尺寸
        */
        TileLayout.prototype.adjustForJustify = function (width, height) {
            var padding = isNaN(this._padding) ? 0 : this._padding;
            var paddingL = isNaN(this._paddingLeft) ? padding : this._paddingLeft;
            var paddingR = isNaN(this._paddingRight) ? padding : this._paddingRight;
            var paddingT = isNaN(this._paddingTop) ? padding : this._paddingTop;
            var paddingB = isNaN(this._paddingBottom) ? padding : this._paddingBottom;

            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            if (!isNaN(this.explicitVerticalGap))
                this._verticalGap = this.explicitVerticalGap;
            if (!isNaN(this.explicitHorizontalGap))
                this._horizontalGap = this.explicitHorizontalGap;
            this._verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            this._horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;

            var itemWidth = this._columnWidth + this._horizontalGap;
            if (itemWidth <= 0)
                itemWidth = 1;
            var itemHeight = this._rowHeight + this._verticalGap;
            if (itemHeight <= 0)
                itemHeight = 1;

            var offsetY = targetHeight - this._rowHeight * this._rowCount;
            var offsetX = targetWidth - this._columnWidth * this._columnCount;
            var gapCount;
            if (offsetY > 0) {
                if (this.rowAlign == egret.RowAlign.JUSTIFY_USING_GAP) {
                    gapCount = Math.max(1, this._rowCount - 1);
                    this._verticalGap = offsetY / gapCount;
                } else if (this.rowAlign == egret.RowAlign.JUSTIFY_USING_HEIGHT) {
                    if (this._rowCount > 0) {
                        this._rowHeight += (offsetY - (this._rowCount - 1) * this._verticalGap) / this._rowCount;
                    }
                }
            }
            if (offsetX > 0) {
                if (this.columnAlign == egret.ColumnAlign.JUSTIFY_USING_GAP) {
                    gapCount = Math.max(1, this._columnCount - 1);
                    this._horizontalGap = offsetX / gapCount;
                } else if (this.columnAlign == egret.ColumnAlign.JUSTIFY_USING_WIDTH) {
                    if (this._columnCount > 0) {
                        this._columnWidth += (offsetX - (this._columnCount - 1) * this._horizontalGap) / this._columnCount;
                    }
                }
            }
        };
        return TileLayout;
    })(egret.LayoutBase);
    egret.TileLayout = TileLayout;
})(egret || (egret = {}));
