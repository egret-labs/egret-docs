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
    * @class egret.UIStage
    * @classdesc
    * 系统管理器，应用程序顶级容器。
    * 通常情况下，一个程序应该只含有唯一的系统管理器,并且所有的组件都包含在它内部。
    * 它负责管理弹窗，鼠标样式，工具提示的显示层级，以及过滤鼠标和键盘事件为可以取消的。
    * @extends egret.Group
    * @implements egret.IUIStage
    */
    var UIStage = (function (_super) {
        __extends(UIStage, _super);
        /**
        * 构造函数
        * @method egret.UIStage#constructor
        */
        function UIStage() {
            _super.call(this);
            this._autoResize = true;
            this._noTopMostIndex = 0;
            this._topMostIndex = 0;
            this._toolTipIndex = 0;
            this._cursorIndex = 0;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }
        /**
        * 添加到舞台
        */
        UIStage.prototype.onAddToStage = function (event) {
            if (typeof event === "undefined") { event = null; }
            if (egret.UIGlobals._uiStage) {
                throw new Error("UIStage是GUI根容器，只能有一个此实例在显示列表中！");
            }
            egret.UIGlobals._uiStage = this;
            if (this._autoResize) {
                this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
                this.onResize();
            }
        };

        /**
        * 从舞台移除
        */
        UIStage.prototype.onRemoveFromStage = function (event) {
            egret.UIGlobals._uiStage = null;
            if (this._autoResize) {
                this.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            }
        };

        /**
        * 舞台尺寸改变
        */
        UIStage.prototype.onResize = function (event) {
            if (typeof event === "undefined") { event = null; }
            this._setWidth(this.stage.stageWidth);
            this._setHeight(this.stage.stageHeight);
        };

        Object.defineProperty(UIStage.prototype, "autoResize", {
            /**
            * 是否自动跟随舞台缩放。当此属性为true时，将强制让UIState始终与舞台保持相同大小。
            * 反之需要外部手动同步大小。默认值为true。
            * @member egret.UIStage#autoResize
            */
            get: function () {
                return this._autoResize;
            },
            set: function (value) {
                if (this._autoResize == value)
                    return;
                this._autoResize = value;
                if (!this.stage)
                    return;
                if (this._autoResize) {
                    this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
                    this.onResize();
                } else {
                    this.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIStage.prototype, "x", {
            //==========================================================================
            //                            禁止外部布局顶级容器
            //==========================================================================
            /**
            * @constant egret.UIStage#x
            */
            get: function () {
                return this._x;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (this._autoResize)
                    return;
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIStage.prototype, "y", {
            /**
            * @constant egret.UIStage#y
            */
            get: function () {
                return this._y;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (this._autoResize)
                    return;
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIStage.prototype, "width", {
            /**
            * @member egret.UIStage#width
            */
            get: function () {
                return this._width;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (this._autoResize)
                    return;
                this._setWidth(value);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIStage.prototype, "height", {
            /**
            * @member egret.UIStage#height
            */
            get: function () {
                return this._height;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (this._autoResize)
                    return;
                this._setHeight(value);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIStage.prototype, "scaleX", {
            /**
            * @member egret.UIStage#scaleX
            */
            get: function () {
                return this._scaleX;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (this._autoResize)
                    return;
                this._setScaleX(value);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIStage.prototype, "scaleY", {
            /**
            * @member egret.UIStage#scaleY
            */
            get: function () {
                return this._scaleY;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (this._autoResize)
                    return;
                this._setScaleY(value);
            },
            enumerable: true,
            configurable: true
        });


        /**
        * @method egret.UIStage#setActualSize
        * @param w {number}
        * @param h {number}
        */
        UIStage.prototype.setActualSize = function (w, h) {
            if (this._autoResize)
                return;
            _super.prototype.setActualSize.call(this, w, h);
        };

        /**
        * @method egret.UIStage#setLayoutBoundsPosition
        * @param x {number}
        * @param y {number}
        */
        UIStage.prototype.setLayoutBoundsPosition = function (x, y) {
            if (this._autoResize)
                return;
            _super.prototype.setLayoutBoundsPosition.call(this, x, y);
        };

        /**
        * @method egret.UIStage#setLayoutBoundsSize
        * @param layoutWidth {number}
        * @param layoutHeight {number}
        */
        UIStage.prototype.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            if (this._autoResize)
                return;
            _super.prototype.setLayoutBoundsSize.call(this, layoutWidth, layoutHeight);
        };

        Object.defineProperty(UIStage.prototype, "layout", {
            /**
            * 布局对象,UIStage只接受BasicLayout
            * @member egret.UIStage#layout
            */
            get: function () {
                return this._layout;
            },
            set: function (value) {
                if (value instanceof egret.BasicLayout)
                    this._setLayout(value);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIStage.prototype, "popUpContainer", {
            /**
            * 弹出窗口层容器。
            * @member egret.UIStage#popUpContainer
            */
            get: function () {
                if (!this._popUpContainer) {
                    this._popUpContainer = new egret.UILayer(this, "noTopMostIndex", "topMostIndex");
                }

                return this._popUpContainer;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIStage.prototype, "toolTipContainer", {
            /**
            * 工具提示层容器。
            * @member egret.UIStage#toolTipContainer
            */
            get: function () {
                if (!this._toolTipContainer) {
                    this._toolTipContainer = new egret.UILayer(this, "topMostIndex", "toolTipIndex");
                }

                return this._toolTipContainer;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIStage.prototype, "cursorContainer", {
            /**
            * 鼠标样式层容器。
            * @member egret.UIStage#cursorContainer
            */
            get: function () {
                if (!this._cursorContainer) {
                    this._cursorContainer = new egret.UILayer(this, "toolTipIndex", "cursorIndex");
                }

                return this._cursorContainer;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIStage.prototype, "noTopMostIndex", {
            /**
            * 弹出窗口层的起始索引(包括)
            */
            get: function () {
                return this._noTopMostIndex;
            },
            set: function (value) {
                var delta = value - this._noTopMostIndex;
                this._noTopMostIndex = value;
                this.topMostIndex += delta;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIStage.prototype, "topMostIndex", {
            /**
            * 弹出窗口层结束索引(不包括)
            */
            get: function () {
                return this._topMostIndex;
            },
            set: function (value) {
                var delta = value - this._topMostIndex;
                this._topMostIndex = value;
                this.toolTipIndex += delta;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIStage.prototype, "toolTipIndex", {
            /**
            * 工具提示层结束索引(不包括)
            */
            get: function () {
                return this._toolTipIndex;
            },
            set: function (value) {
                var delta = value - this._toolTipIndex;
                this._toolTipIndex = value;
                this.cursorIndex += delta;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIStage.prototype, "cursorIndex", {
            /**
            * 鼠标样式层结束索引(不包括)
            */
            get: function () {
                return this._cursorIndex;
            },
            set: function (value) {
                var delta = value - this._cursorIndex;
                this._cursorIndex = value;
            },
            enumerable: true,
            configurable: true
        });


        //==========================================================================
        //                                复写容器操作方法
        //==========================================================================
        /**
        * @method egret.UIStage#addElement
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        UIStage.prototype.addElement = function (element) {
            var addIndex = this._noTopMostIndex;
            if (element.parent == this)
                addIndex--;
            return this.addElementAt(element, addIndex);
        };

        /**
        * @method egret.UIStage#addElementAt
        * @param element {IVisualElement}
        * @param index {number}
        * @returns {IVisualElement}
        */
        UIStage.prototype.addElementAt = function (element, index) {
            if (element.parent == this) {
                var oldIndex = this.getElementIndex(element);
                if (oldIndex < this._noTopMostIndex)
                    this.noTopMostIndex--;
                else if (oldIndex >= this._noTopMostIndex && oldIndex < this._topMostIndex)
                    this.topMostIndex--;
                else if (oldIndex >= this._topMostIndex && oldIndex < this._toolTipIndex)
                    this.toolTipIndex--;
                else
                    this.cursorIndex--;
            }

            if (index <= this._noTopMostIndex)
                this.noTopMostIndex++;
            else if (index > this._noTopMostIndex && index <= this._topMostIndex)
                this.topMostIndex++;
            else if (index > this._topMostIndex && index <= this._toolTipIndex)
                this.toolTipIndex++;
            else
                this.cursorIndex++;

            return _super.prototype.addElementAt.call(this, element, index);
        };

        /**
        * @method egret.UIStage#removeElement
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        UIStage.prototype.removeElement = function (element) {
            return this.removeElementAt(_super.prototype.getElementIndex.call(this, element));
        };

        /**
        * @method egret.UIStage#removeElementAt
        * @param index {number}
        * @returns {IVisualElement}
        */
        UIStage.prototype.removeElementAt = function (index) {
            var element = _super.prototype.removeElementAt.call(this, index);
            if (index < this._noTopMostIndex)
                this.noTopMostIndex--;
            else if (index >= this._noTopMostIndex && index < this._topMostIndex)
                this.topMostIndex--;
            else if (index >= this._topMostIndex && index < this._toolTipIndex)
                this.toolTipIndex--;
            else
                this.cursorIndex--;
            return element;
        };

        /**
        * @method egret.UIStage#removeAllElements
        */
        UIStage.prototype.removeAllElements = function () {
            while (this._noTopMostIndex > 0) {
                _super.prototype.removeElementAt.call(this, 0);
                this.noTopMostIndex--;
            }
        };

        /**
        * @method egret.UIStage#_elementRemoved
        * @param element {IVisualElement}
        * @param index {number}
        * @param notifyListeners {boolean}
        */
        UIStage.prototype._elementRemoved = function (element, index, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            if (notifyListeners) {
                //PopUpManager需要监听这个事件
                egret.Event.dispatchEvent(element, "removeFromUIStage");
            }
            _super.prototype._elementRemoved.call(this, element, index, notifyListeners);
        };

        //==========================================================================
        //                                保留容器原始操作方法
        //==========================================================================
        UIStage.prototype.raw_getElementAt = function (index) {
            return _super.prototype.getElementAt.call(this, index);
        };
        UIStage.prototype.raw_addElement = function (element) {
            var index = this.numElements;
            if (element.parent == this)
                index--;
            return this.raw_addElementAt(element, index);
        };
        UIStage.prototype.raw_addElementAt = function (element, index) {
            if (element.parent == this) {
                var oldIndex = this.getElementIndex(element);
                if (oldIndex < this._noTopMostIndex)
                    this.noTopMostIndex--;
                else if (oldIndex >= this._noTopMostIndex && oldIndex < this._topMostIndex)
                    this.topMostIndex--;
                else if (oldIndex >= this._topMostIndex && oldIndex < this._toolTipIndex)
                    this.toolTipIndex--;
                else
                    this.cursorIndex--;
            }
            return _super.prototype.addElementAt.call(this, element, index);
        };
        UIStage.prototype.raw_removeElement = function (element) {
            return _super.prototype.removeElementAt.call(this, _super.prototype.getElementIndex.call(this, element));
        };
        UIStage.prototype.raw_removeElementAt = function (index) {
            return _super.prototype.removeElementAt.call(this, index);
        };
        UIStage.prototype.raw_removeAllElements = function () {
            while (this.numElements > 0) {
                _super.prototype.removeElementAt.call(this, 0);
            }
        };
        UIStage.prototype.raw_getElementIndex = function (element) {
            return _super.prototype.getElementIndex.call(this, element);
        };
        UIStage.prototype.raw_setElementIndex = function (element, index) {
            _super.prototype.setElementIndex.call(this, element, index);
        };
        UIStage.prototype.raw_swapElements = function (element1, element2) {
            _super.prototype.swapElementsAt.call(this, _super.prototype.getElementIndex.call(this, element1), _super.prototype.getElementIndex.call(this, element2));
        };
        UIStage.prototype.raw_swapElementsAt = function (index1, index2) {
            _super.prototype.swapElementsAt.call(this, index1, index2);
        };
        return UIStage;
    })(egret.Group);
    egret.UIStage = UIStage;
})(egret || (egret = {}));
