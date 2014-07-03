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
    * @class egret.UIComponent
    * @classdesc
    * 显示对象基类
    * @extends egret.DisplayObjectContainer
    * @implements egret.IUIComponent
    * @implements egret.ILayoutManagerClient
    * @implements egret.ILayoutElement
    * @implements egret.IInvalidating
    * @implements egret.IVisualElement
    */
    var UIComponent = (function (_super) {
        __extends(UIComponent, _super);
        /**
        * 构造函数
        * @method egret.UIComponent#constructor
        */
        function UIComponent() {
            _super.call(this);
            this._updateCompletePendingFlag = false;
            this._initialized = false;
            /**
            * _initialize()方法被调用过的标志。
            */
            this.initializeCalled = false;
            this._nestLevel = 0;
            this._enabled = true;
            this._width = 0;
            this._height = 0;
            this._minWidth = 0;
            this._maxWidth = 10000;
            this._minHeight = 0;
            this._maxHeight = 10000;
            this._measuredWidth = 0;
            this._measuredHeight = 0;
            /**
            * @member egret.UIComponent#_invalidatePropertiesFlag
            */
            this._invalidatePropertiesFlag = false;
            /**
            * @member egret.UIComponent#_invalidateSizeFlag
            */
            this._invalidateSizeFlag = false;
            /**
            * @member egret.UIComponent#_invalidateDisplayListFlag
            */
            this._invalidateDisplayListFlag = false;
            /**
            * @member egret.UIComponent#_validateNowFlag
            */
            this._validateNowFlag = false;
            this._includeInLayout = true;
            /**
            * 父级布局管理器设置了组件的宽度标志，尺寸设置优先级：自动布局>显式设置>自动测量
            * @member egret.UIComponent#_layoutWidthExplicitlySet
            */
            this._layoutWidthExplicitlySet = false;
            /**
            * 父级布局管理器设置了组件的高度标志，尺寸设置优先级：自动布局>显式设置>自动测量
            * @member egret.UIComponent#_layoutHeightExplicitlySet
            */
            this._layoutHeightExplicitlySet = false;
            this.touchEnabled = true;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.checkInvalidateFlag, this);
        }
        /**
        * 添加到舞台
        */
        UIComponent.prototype.onAddedToStage = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
            this._initialize();
            egret.UIGlobals._initlize(this.stage);
            if (this._nestLevel > 0)
                this.checkInvalidateFlag();
        };

        Object.defineProperty(UIComponent.prototype, "id", {
            /**
            * 组件 ID。此值将作为对象的实例名称，因此不应包含任何空格或特殊字符。应用程序中的每个组件都应具有唯一的 ID。
            * @constant egret.UIComponent#id
            */
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIComponent.prototype, "isPopUp", {
            /**
            * @member egret.UIComponent#isPopUp
            */
            get: function () {
                return this._isPopUp;
            },
            set: function (value) {
                this._isPopUp = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "owner", {
            /**
            * @member egret.UIComponent#owner
            */
            get: function () {
                return this._owner ? this._owner : this.parent;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.UIComponent#ownerChanged
        * @param value {any}
        */
        UIComponent.prototype.ownerChanged = function (value) {
            this._owner = value;
        };

        Object.defineProperty(UIComponent.prototype, "updateCompletePendingFlag", {
            /**
            * @member egret.UIComponent#updateCompletePendingFlag
            */
            get: function () {
                return this._updateCompletePendingFlag;
            },
            set: function (value) {
                this._updateCompletePendingFlag = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "initialized", {
            /**
            * @member egret.UIComponent#initialized
            */
            get: function () {
                return this._initialized;
            },
            set: function (value) {
                if (this._initialized == value)
                    return;
                this._initialized = value;
                if (value) {
                    egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.CREATION_COMPLETE);
                }
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 初始化组件
        * @method egret.UIComponent#_initialize
        */
        UIComponent.prototype._initialize = function () {
            if (this.initializeCalled)
                return;
            if (egret.UIGlobals.stage) {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
            }
            this.initializeCalled = true;
            egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.INITIALIZE);
            this.createChildren();
            this.childrenCreated();
        };

        /**
        * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
        * 请务必调用super.createChildren()以完成父类组件的初始化
        * @method egret.UIComponent#createChildren
        */
        UIComponent.prototype.createChildren = function () {
        };

        /**
        * 子项创建完成
        * @method egret.UIComponent#childrenCreated
        */
        UIComponent.prototype.childrenCreated = function () {
            this.invalidateProperties();
            this.invalidateSize();
            this.invalidateDisplayList();
        };

        Object.defineProperty(UIComponent.prototype, "nestLevel", {
            /**
            * @member egret.UIComponent#nestLevel
            */
            get: function () {
                return this._nestLevel;
            },
            set: function (value) {
                if (this._nestLevel == value)
                    return;
                this._nestLevel = value;

                if (this._nestLevel == 0)
                    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.checkInvalidateFlag, this);
                else
                    this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.checkInvalidateFlag, this);

                for (var i = this.numChildren - 1; i >= 0; i--) {
                    var child = (this.getChildAt(i));
                    if (child != null) {
                        child.nestLevel = this._nestLevel + 1;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 添加对象到显示列表,此接口仅预留给框架内部使用
        * 如果需要管理子项，若有，请使用容器的addElement()方法，非法使用有可能造成无法自动布局。
        */
        UIComponent.prototype._addToDisplayList = function (child, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            var index = this.numChildren;

            if (child.parent == this)
                index--;
            this._addingChild(child);
            this._doAddChild(child, index, notifyListeners);
            this._childAdded(child);
            return child;
        };

        /**
        * 添加对象到显示列表,此接口仅预留给框架内部使用
        * 如果需要管理子项，若有，请使用容器的addElementAt()方法，非法使用有可能造成无法自动布局。
        */
        UIComponent.prototype._addToDisplayListAt = function (child, index, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            this._addingChild(child);
            this._doAddChild(child, index, notifyListeners);
            this._childAdded(child);
            return child;
        };

        /**
        * 添加对象到显示列表,此接口仅预留给框架内部使用
        * 如果需要管理子项，若有，请使用容器的removeElement()方法,非法使用有可能造成无法自动布局。
        */
        UIComponent.prototype._removeFromDisplayList = function (child, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            var index = this._children.indexOf(child);
            if (index >= 0) {
                this._doRemoveChild(index, notifyListeners);
                this._childRemoved(child);
                return child;
            } else {
                egret.Logger.fatal("child未被addChild到该parent");
                return null;
            }
        };

        /**
        * 从显示列表移除指定索引的子项,此接口仅预留给框架内部使用
        * 如果需要管理子项，若有，请使用容器的removeElementAt()方法,非法使用有可能造成无法自动布局。
        */
        UIComponent.prototype._removeFromDisplayListAt = function (index, notifyListeners) {
            if (typeof notifyListeners === "undefined") { notifyListeners = true; }
            if (index >= 0 && index < this._children.length) {
                var child = this._doRemoveChild(index, notifyListeners);
                this._childRemoved(child);
                return child;
            } else {
                egret.Logger.fatal("提供的索引超出范围");
                return null;
            }
        };

        /**
        * GUI范围内，请不要调用任何addChild方法，若是容器，请用addElement,若需要包装普通显示对象，请把显示对象赋值给UIAsset.source。
        * @deprecated
        * @method egret.UIComponent#addChild
        * @param child {DisplayObject}
        * @returns {DisplayObject}
        */
        UIComponent.prototype.addChild = function (child) {
            this._addingChild(child);
            _super.prototype.addChild.call(this, child);
            this._childAdded(child);
            return child;
        };

        /**
        * GUI范围内，请不要调用任何addChildAt方法，若是容器，请用addElementAt,若需要包装普通显示对象，请把显示对象赋值给UIAsset.source。
        * @deprecated
        * @method egret.UIComponent#addChildAt
        * @param child {DisplayObject}
        * @param index {number}
        * @returns {DisplayObject}
        */
        UIComponent.prototype.addChildAt = function (child, index) {
            this._addingChild(child);
            _super.prototype.addChildAt.call(this, child, index);
            this._childAdded(child);
            return child;
        };

        /**
        * 即将添加一个子项
        * @method egret.UIComponent#_addingChild
        * @param child {DisplayObject}
        */
        UIComponent.prototype._addingChild = function (child) {
            if (child && "nestLevel" in child) {
                child.nestLevel = this._nestLevel + 1;
            }
        };

        /**
        * 已经添加一个子项
        */
        UIComponent.prototype._childAdded = function (child) {
            if (child instanceof UIComponent) {
                child._initialize();
                child.checkInvalidateFlag();
            }
        };

        /**
        * GUI范围内，请不要调用任何removeChild方法，若是容器，请用removeElement
        * @deprecated
        * @method egret.UIComponent#removeChild
        * @param child {DisplayObject}
        * @returns {DisplayObject}
        */
        UIComponent.prototype.removeChild = function (child) {
            _super.prototype.removeChild.call(this, child);
            this._childRemoved(child);
            return child;
        };

        /**
        * GUI范围内，请不要调用任何removeChildAt方法，若是容器，请用removeElementAt
        * @deprecated
        * @method egret.UIComponent#removeChildAt
        * @param index {number}
        * @returns {DisplayObject}
        */
        UIComponent.prototype.removeChildAt = function (index) {
            var child = _super.prototype.removeChildAt.call(this, index);
            this._childRemoved(child);
            return child;
        };

        /**
        * 已经移除一个子项
        */
        UIComponent.prototype._childRemoved = function (child) {
            if (child && "nestLevel" in child) {
                child.nestLevel = 0;
            }
        };

        /**
        * 检查属性失效标记并应用
        */
        UIComponent.prototype.checkInvalidateFlag = function (event) {
            if (typeof event === "undefined") { event = null; }
            if (!egret.UIGlobals._layoutManager)
                return;
            if (this._invalidatePropertiesFlag) {
                egret.UIGlobals._layoutManager.invalidateProperties(this);
            }
            if (this._invalidateSizeFlag) {
                egret.UIGlobals._layoutManager.invalidateSize(this);
            }
            if (this._invalidateDisplayListFlag) {
                egret.UIGlobals._layoutManager.invalidateDisplayList(this);
            }
            if (this._validateNowFlag) {
                egret.UIGlobals._layoutManager.validateClient(this);
                this._validateNowFlag = false;
            }
        };

        Object.defineProperty(UIComponent.prototype, "enabled", {
            /**
            * @member egret.UIComponent#enabled
            */
            get: function () {
                return this._enabled;
            },
            set: function (value) {
                this._enabled = value;
            },
            enumerable: true,
            configurable: true
        });



        UIComponent.prototype._setWidth = function (value) {
            if (this._width == value && this._explicitWidth == value)
                return;
            _super.prototype._setWidth.call(this, value);
            if (isNaN(value))
                this.invalidateSize();
            else
                this._width = value;
            this.invalidateProperties();
            this.invalidateDisplayList();
            this.invalidateParentSizeAndDisplayList();
        };

        Object.defineProperty(UIComponent.prototype, "width", {
            /**
            * @member egret.UIComponent#width
            */
            get: function () {
                return this._width;
            },
            /**
            * 组件宽度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
            */
            set: function (value) {
                this._setWidth(value);
            },
            enumerable: true,
            configurable: true
        });


        UIComponent.prototype._setHeight = function (value) {
            if (this._height == value && this._explicitHeight == value)
                return;
            _super.prototype._setHeight.call(this, value);
            if (isNaN(value))
                this.invalidateSize();
            else
                this._height = value;
            this.invalidateProperties();
            this.invalidateDisplayList();
            this.invalidateParentSizeAndDisplayList();
        };

        Object.defineProperty(UIComponent.prototype, "height", {
            /**
            * @member egret.UIComponent#height
            */
            get: function () {
                return this._height;
            },
            /**
            * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
            */
            set: function (value) {
                this._setHeight(value);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "scaleX", {
            /**
            * @member egret.UIComponent#scaleX
            */
            get: function () {
                return this._scaleX;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                this._setScaleX(value);
            },
            enumerable: true,
            configurable: true
        });


        UIComponent.prototype._setScaleX = function (value) {
            if (this._scaleX == value)
                return;
            this._scaleX = value;
            this.invalidateParentSizeAndDisplayList();
        };

        Object.defineProperty(UIComponent.prototype, "scaleY", {
            /**
            * @member egret.UIComponent#scaleY
            */
            get: function () {
                return this._scaleY;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                this._setScaleY(value);
            },
            enumerable: true,
            configurable: true
        });


        UIComponent.prototype._setScaleY = function (value) {
            if (this._scaleY == value)
                return;
            this._scaleY = value;
            this.invalidateParentSizeAndDisplayList();
        };

        Object.defineProperty(UIComponent.prototype, "minWidth", {
            /**
            * @member egret.UIComponent#minWidth
            */
            get: function () {
                return this._minWidth;
            },
            set: function (value) {
                if (this._minWidth == value)
                    return;
                this._minWidth = value;
                this.invalidateSize();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "maxWidth", {
            /**
            * @member egret.UIComponent#maxWidth
            */
            get: function () {
                return this._maxWidth;
            },
            set: function (value) {
                if (this._maxWidth == value)
                    return;
                this._maxWidth = value;
                this.invalidateSize();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "minHeight", {
            /**
            * @member egret.UIComponent#minHeight
            */
            get: function () {
                return this._minHeight;
            },
            set: function (value) {
                if (this._minHeight == value)
                    return;
                this._minHeight = value;
                this.invalidateSize();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "maxHeight", {
            /**
            * @member egret.UIComponent#maxHeight
            */
            get: function () {
                return this._maxHeight;
            },
            set: function (value) {
                if (this._maxHeight == value)
                    return;
                this._maxHeight = value;
                this.invalidateSize();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "measuredWidth", {
            /**
            * 组件的默认宽度（以像素为单位）。此值由 measure() 方法设置。
            * @member egret.UIComponent#measuredWidth
            */
            get: function () {
                return this._measuredWidth;
            },
            set: function (value) {
                this._measuredWidth = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "measuredHeight", {
            /**
            * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
            * @member egret.UIComponent#measuredHeight
            */
            get: function () {
                return this._measuredHeight;
            },
            set: function (value) {
                this._measuredHeight = value;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.UIComponent#setActualSize
        * @param w {number}
        * @param h {number}
        */
        UIComponent.prototype.setActualSize = function (w, h) {
            var change = false;
            if (this._width != w) {
                this._width = w;
                change = true;
            }
            if (this._height != h) {
                this._height = h;
                change = true;
            }
            if (change) {
                this.invalidateDisplayList();
                this.dispatchResizeEvent();
            }
        };

        Object.defineProperty(UIComponent.prototype, "x", {
            /**
            * @constant egret.UIComponent#x
            */
            get: function () {
                return this._x;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (this._x == value)
                    return;
                this._x = value;
                this.invalidateProperties();
                if (this._includeInLayout && this.parent && this.parent instanceof UIComponent)
                    (this.parent)._childXYChanged();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIComponent.prototype, "y", {
            /**
            * @constant egret.UIComponent#y
            */
            get: function () {
                return this._y;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (this._y == value)
                    return;
                this._y = value;
                this.invalidateProperties();
                if (this._includeInLayout && this.parent && this.parent instanceof UIComponent)
                    (this.parent)._childXYChanged();
            },
            enumerable: true,
            configurable: true
        });


        /**
        * @method egret.UIComponent#invalidateProperties
        */
        UIComponent.prototype.invalidateProperties = function () {
            if (!this._invalidatePropertiesFlag) {
                this._invalidatePropertiesFlag = true;

                if (this.parent && egret.UIGlobals._layoutManager)
                    egret.UIGlobals._layoutManager.invalidateProperties(this);
            }
        };

        /**
        * @method egret.UIComponent#validateProperties
        */
        UIComponent.prototype.validateProperties = function () {
            if (this._invalidatePropertiesFlag) {
                this.commitProperties();

                this._invalidatePropertiesFlag = false;
            }
        };

        /**
        * @method egret.UIComponent#invalidateSize
        */
        UIComponent.prototype.invalidateSize = function () {
            if (!this._invalidateSizeFlag) {
                this._invalidateSizeFlag = true;

                if (this.parent && egret.UIGlobals._layoutManager)
                    egret.UIGlobals._layoutManager.invalidateSize(this);
            }
        };

        /**
        * @method egret.UIComponent#validateSize
        * @param recursive {boolean}
        */
        UIComponent.prototype.validateSize = function (recursive) {
            if (typeof recursive === "undefined") { recursive = false; }
            if (recursive) {
                for (var i = 0; i < this.numChildren; i++) {
                    var child = this.getChildAt(i);
                    if ("validateSize" in child)
                        child.validateSize(true);
                }
            }
            if (this._invalidateSizeFlag) {
                var changed = this.measureSizes();
                if (changed) {
                    this.invalidateDisplayList();
                    this.invalidateParentSizeAndDisplayList();
                }
                this._invalidateSizeFlag = false;
            }
        };

        /**
        * 测量组件尺寸，返回尺寸是否发生变化
        */
        UIComponent.prototype.measureSizes = function () {
            var changed = false;

            if (!this._invalidateSizeFlag)
                return changed;

            if (!this.canSkipMeasurement()) {
                this.measure();
                if (this.measuredWidth < this.minWidth) {
                    this.measuredWidth = this.minWidth;
                }
                if (this.measuredWidth > this.maxWidth) {
                    this.measuredWidth = this.maxWidth;
                }
                if (this.measuredHeight < this.minHeight) {
                    this.measuredHeight = this.minHeight;
                }
                if (this.measuredHeight > this.maxHeight) {
                    this.measuredHeight = this.maxHeight;
                }
            }
            if (isNaN(this._oldPreferWidth)) {
                this._oldPreferWidth = this.preferredWidth;
                this._oldPreferHeight = this.preferredHeight;
                changed = true;
            } else {
                if (this.preferredWidth != this._oldPreferWidth || this.preferredHeight != this._oldPreferHeight)
                    changed = true;
                this._oldPreferWidth = this.preferredWidth;
                this._oldPreferHeight = this.preferredHeight;
            }
            return changed;
        };

        /**
        * @method egret.UIComponent#invalidateDisplayList
        */
        UIComponent.prototype.invalidateDisplayList = function () {
            if (!this._invalidateDisplayListFlag) {
                this._invalidateDisplayListFlag = true;

                if (this.parent && egret.UIGlobals._layoutManager)
                    egret.UIGlobals._layoutManager.invalidateDisplayList(this);
            }
        };

        /**
        * @method egret.UIComponent#validateDisplayList
        */
        UIComponent.prototype.validateDisplayList = function () {
            if (this._invalidateDisplayListFlag) {
                var unscaledWidth = 0;
                var unscaledHeight = 0;
                if (this._layoutWidthExplicitlySet) {
                    unscaledWidth = this._width;
                } else if (!isNaN(this.explicitWidth)) {
                    unscaledWidth = this._explicitWidth;
                } else {
                    unscaledWidth = this.measuredWidth;
                }
                if (this._layoutHeightExplicitlySet) {
                    unscaledHeight = this._height;
                } else if (!isNaN(this.explicitHeight)) {
                    unscaledHeight = this._explicitHeight;
                } else {
                    unscaledHeight = this.measuredHeight;
                }
                if (isNaN(unscaledWidth))
                    unscaledWidth = 0;
                if (isNaN(unscaledHeight))
                    unscaledHeight = 0;
                this.setActualSize(unscaledWidth, unscaledHeight);
                this.updateDisplayList(unscaledWidth, unscaledHeight);
                this._invalidateDisplayListFlag = false;
            }
        };

        /**
        * @method egret.UIComponent#validateNow
        * @param skipDisplayList {boolean}
        */
        UIComponent.prototype.validateNow = function (skipDisplayList) {
            if (typeof skipDisplayList === "undefined") { skipDisplayList = false; }
            if (!this._validateNowFlag && egret.UIGlobals._layoutManager != null)
                egret.UIGlobals._layoutManager.validateClient(this, skipDisplayList);
            else
                this._validateNowFlag = true;
        };

        /**
        * 标记父级容器的尺寸和显示列表为失效
        * @method egret.UIComponent#invalidateParentSizeAndDisplayList
        */
        UIComponent.prototype.invalidateParentSizeAndDisplayList = function () {
            if (!this.parent || !this._includeInLayout || !("invalidateSize" in this.parent))
                return;
            var p = (this.parent);
            p.invalidateSize();
            p.invalidateDisplayList();
        };

        /**
        * 更新显示列表
        * @method egret.UIComponent#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        UIComponent.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
        };

        /**
        * 是否可以跳过测量尺寸阶段,返回true则不执行measure()方法
        * @method egret.UIComponent#canSkipMeasurement
        * @returns {boolean}
        */
        UIComponent.prototype.canSkipMeasurement = function () {
            return !isNaN(this._explicitWidth) && !isNaN(this._explicitHeight);
        };

        /**
        * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
        * @method egret.UIComponent#commitProperties
        */
        UIComponent.prototype.commitProperties = function () {
            if (this.oldWidth != this._width || this.oldHeight != this._height) {
                this.dispatchResizeEvent();
            }
            if (this.oldX != this.x || this.oldY != this.y) {
                this.dispatchMoveEvent();
            }
        };

        /**
        * 测量组件尺寸
        * @method egret.UIComponent#measure
        */
        UIComponent.prototype.measure = function () {
            this._measuredHeight = 0;
            this._measuredWidth = 0;
        };

        /**
        *  抛出移动事件
        */
        UIComponent.prototype.dispatchMoveEvent = function () {
            if (this.hasEventListener(egret.MoveEvent.MOVE)) {
                egret.MoveEvent.dispatchMoveEvent(this, this.oldX, this.oldY);
            }
            this.oldX = this.x;
            this.oldY = this.y;
        };

        /**
        * 子项的xy位置发生改变
        */
        UIComponent.prototype._childXYChanged = function () {
        };

        /**
        *  抛出尺寸改变事件
        */
        UIComponent.prototype.dispatchResizeEvent = function () {
            if (this.hasEventListener(egret.ResizeEvent.RESIZE)) {
                egret.ResizeEvent.dispatchResizeEvent(this, this.oldWidth, this.oldHeight);
            }
            this.oldWidth = this._width;
            this.oldHeight = this._height;
        };

        Object.defineProperty(UIComponent.prototype, "includeInLayout", {
            /**
            * @member egret.UIComponent#includeInLayout
            */
            get: function () {
                return this._includeInLayout;
            },
            set: function (value) {
                if (this._includeInLayout == value)
                    return;
                this._includeInLayout = true;
                this.invalidateParentSizeAndDisplayList();
                this._includeInLayout = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "left", {
            /**
            * @member egret.UIComponent#left
            */
            get: function () {
                return this._left;
            },
            set: function (value) {
                if (this._left == value)
                    return;
                this._left = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "right", {
            /**
            * @member egret.UIComponent#right
            */
            get: function () {
                return this._right;
            },
            set: function (value) {
                if (this._right == value)
                    return;
                this._right = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "top", {
            /**
            * @member egret.UIComponent#top
            */
            get: function () {
                return this._top;
            },
            set: function (value) {
                if (this._top == value)
                    return;
                this._top = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "bottom", {
            /**
            * @member egret.UIComponent#bottom
            */
            get: function () {
                return this._bottom;
            },
            set: function (value) {
                if (this._bottom == value)
                    return;
                this._bottom = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "horizontalCenter", {
            /**
            * @member egret.UIComponent#horizontalCenter
            */
            get: function () {
                return this._horizontalCenter;
            },
            set: function (value) {
                if (this._horizontalCenter == value)
                    return;
                this._horizontalCenter = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "verticalCenter", {
            /**
            * @member egret.UIComponent#verticalCenter
            */
            get: function () {
                return this._verticalCenter;
            },
            set: function (value) {
                if (this._verticalCenter == value)
                    return;
                this._verticalCenter = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "percentWidth", {
            /**
            * @member egret.UIComponent#percentWidth
            */
            get: function () {
                return this._percentWidth;
            },
            set: function (value) {
                if (this._percentWidth == value)
                    return;
                this._percentWidth = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "percentHeight", {
            /**
            * @member egret.UIComponent#percentHeight
            */
            get: function () {
                return this._percentHeight;
            },
            set: function (value) {
                if (this._percentHeight == value)
                    return;
                this._percentHeight = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.UIComponent#setLayoutBoundsSize
        * @param layoutWidth {number}
        * @param layoutHeight {number}
        */
        UIComponent.prototype.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            if (isNaN(layoutWidth)) {
                this._layoutWidthExplicitlySet = false;
                layoutWidth = this.preferredWidth;
            } else {
                this._layoutWidthExplicitlySet = true;
            }
            if (isNaN(layoutHeight)) {
                this._layoutHeightExplicitlySet = false;
                layoutHeight = this.preferredHeight;
            } else {
                this._layoutHeightExplicitlySet = true;
            }

            this.setActualSize(layoutWidth / this._scaleX, layoutHeight / this._scaleY);
        };

        /**
        * @method egret.UIComponent#setLayoutBoundsPosition
        * @param x {number}
        * @param y {number}
        */
        UIComponent.prototype.setLayoutBoundsPosition = function (x, y) {
            if (this._scaleX < 0) {
                x += this.layoutBoundsWidth;
            }
            if (this._scaleY < 0) {
                y += this.layoutBoundsHeight;
            }
            var changed = false;
            if (this._x != x) {
                this._x = x;
                changed = true;
            }
            if (this._y != y) {
                this._y = y;
                changed = true;
            }
            if (changed) {
                this.dispatchMoveEvent();
            }
        };

        Object.defineProperty(UIComponent.prototype, "preferredWidth", {
            /**
            * @member egret.UIComponent#preferredWidth
            */
            get: function () {
                var w = this._hasWidthSet ? this._explicitWidth : this._measuredWidth;
                var scaleX = this._scaleX;
                if (scaleX < 0) {
                    scaleX = -scaleX;
                }
                return w * scaleX;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "preferredHeight", {
            /**
            * @member egret.UIComponent#preferredHeight
            */
            get: function () {
                var h = this._hasHeightSet ? this._explicitHeight : this._measuredHeight;
                var scaleY = this._scaleY;
                if (scaleY < 0) {
                    scaleY = -scaleY;
                }
                return h * scaleY;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "preferredX", {
            /**
            * @member egret.UIComponent#preferredX
            */
            get: function () {
                if (this._scaleX >= 0) {
                    return this._x;
                }
                var w = this.preferredWidth;
                return this._x - w;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "preferredY", {
            /**
            * @member egret.UIComponent#preferredY
            */
            get: function () {
                if (this._scaleY >= 0) {
                    return this._y;
                }
                var h = this.preferredHeight;
                return this._y - h;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "layoutBoundsX", {
            /**
            * @member egret.UIComponent#layoutBoundsX
            */
            get: function () {
                if (this._scaleX >= 0) {
                    return this._x;
                }
                var w = this.layoutBoundsWidth;
                return this._x - w;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "layoutBoundsY", {
            /**
            * @member egret.UIComponent#layoutBoundsY
            */
            get: function () {
                if (this._scaleY >= 0) {
                    return this._y;
                }
                var h = this.layoutBoundsHeight;
                return this._y - h;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "layoutBoundsWidth", {
            /**
            * @member egret.UIComponent#layoutBoundsWidth
            */
            get: function () {
                var w = 0;
                if (this._layoutWidthExplicitlySet) {
                    w = this._width;
                } else if (this._hasWidthSet) {
                    w = this._explicitWidth;
                } else {
                    w = this._measuredWidth;
                }
                var scaleX = this._scaleX;
                if (scaleX < 0) {
                    scaleX = -scaleX;
                }
                return w * scaleX;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(UIComponent.prototype, "layoutBoundsHeight", {
            /**
            * 组件的布局高度,常用于父级的updateDisplayList()方法中
            * 按照：布局高度>外部显式设置高度>测量高度 的优先级顺序返回高度
            * @member egret.UIComponent#layoutBoundsHeight
            */
            get: function () {
                var h = 0;
                if (this._layoutHeightExplicitlySet) {
                    h = this._height;
                } else if (this._hasHeightSet) {
                    h = this._explicitHeight;
                } else {
                    h = this._measuredHeight;
                }
                var scaleY = this.scaleY;
                if (scaleY < 0) {
                    scaleY = -scaleY;
                }
                return h * scaleY;
            },
            enumerable: true,
            configurable: true
        });
        return UIComponent;
    })(egret.DisplayObjectContainer);
    egret.UIComponent = UIComponent;
})(egret || (egret = {}));
