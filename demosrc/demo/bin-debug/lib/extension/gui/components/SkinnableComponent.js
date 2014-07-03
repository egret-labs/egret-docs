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
    * @class egret.SkinnableComponent
    * @classdesc
    * 复杂可设置外观组件的基类，接受ISkin类或任何显示对象作为皮肤。
    * 当皮肤为ISkin时，将自动匹配两个实例内同名的公开属性(显示对象)，
    * 并将皮肤的属性引用赋值到此类定义的同名属性(必须没有默认值)上,
    * 如果要对公共属性添加事件监听或其他操作，
    * 请覆盖partAdded()和partRemoved()方法
    * @extends egret.SkinnableComponent
    */
    var SkinnableComponent = (function (_super) {
        __extends(SkinnableComponent, _super);
        /**
        * 构造函数
        * @method egret.SkinnableComponent#constructor
        */
        function SkinnableComponent() {
            _super.call(this);
            /**
            * 主机组件标识符。用于唯一确定一个组件的名称。
            * 在解析skinName时，会把此属性的值传递给ISkinAdapter.getSkin()方法，以参与皮肤解析的规则判断。
            * 用户自定义的组件若不对此属性赋值，将会继承父级的标识符定义。
            * @member {string} egret.SkinnableComponent#hostComponentKey
            */
            this.hostComponentKey = "egret.SkinnableComponent";
            /**
            * 外部显式设置了皮肤名
            */
            this._skinNameExplicitlySet = false;
            this.createChildrenCalled = false;
            //========================皮肤视图状态=====================start=======================
            this.stateIsDirty = false;
            this._autoMouseEnabled = true;
            /**
            * 外部显式设置的mouseChildren属性值
            */
            this.explicitMouseChildren = true;
            /**
            * 外部显式设置的mouseEnabled属性值
            */
            this.explicitMouseEnabled = true;
        }
        Object.defineProperty(SkinnableComponent.prototype, "skinName", {
            /**
            * 皮肤标识符。可以为Class,String,或DisplayObject实例等任意类型，具体规则由项目注入的素材适配器决定，
            * 适配器根据此属性值解析获取对应的显示对象，并赋值给skin属性。
            * @member egret.SkinnableComponent#skinName
            */
            get: function () {
                return this._skinName;
            },
            set: function (value) {
                if (this._skinName == value)
                    return;
                this._skinName = value;
                this._skinNameExplicitlySet = true;
                if (this.createChildrenCalled) {
                    this.parseSkinName();
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(SkinnableComponent.prototype, "skin", {
            /**
            * 皮肤对象实例。
            * @member egret.SkinnableComponent#skin
            */
            get: function () {
                return this._skin;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.SkinnableComponent#createChildren
        */
        SkinnableComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.parseSkinName();
            this.createChildrenCalled = true;
        };

        /**
        * 解析skinName
        */
        SkinnableComponent.prototype.parseSkinName = function () {
            var adapter = SkinnableComponent.skinAdapter;
            if (!adapter) {
                adapter = this.getSkinAdapter();
            }

            var skin = adapter.getSkin(this._skinName, this.hostComponentKey);
            var oldSkin = this._skin;
            this.detachSkin(oldSkin);
            if (oldSkin instanceof egret.DisplayObject) {
                this._removeFromDisplayList(oldSkin);
            }

            this._skin = skin;
            if (skin instanceof egret.DisplayObject) {
                this._addToDisplayListAt(this._skin, 0);
            }
            this.attachSkin(skin);
            this.invalidateSkinState();
            this.invalidateSize();
            this.invalidateDisplayList();

            if (this.hasEventListener(egret.UIEvent.SKIN_CHANGED)) {
                egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.SKIN_CHANGED);
            }
        };

        /**
        * 获取皮肤适配器
        */
        SkinnableComponent.prototype.getSkinAdapter = function () {
            var adapter;
            try  {
                adapter = egret.Injector.getInstance("egret.ISkinAdapter");
            } catch (e) {
                adapter = new egret.DefaultSkinAdapter();
            }
            SkinnableComponent.skinAdapter = adapter;
            return adapter;
        };

        /**
        * 附加皮肤
        * @method egret.SkinnableComponent#attachSkin
        * @param skin {any}
        */
        SkinnableComponent.prototype.attachSkin = function (skin) {
            if (skin && "hostComponent" in skin) {
                var newSkin = skin;
                newSkin.hostComponent = this;
                this.findSkinParts();
            }
            if (skin && "hostComponent" in skin && skin instanceof egret.DisplayObject)
                this._setSkinLayoutEnabled(false);
            else
                this._setSkinLayoutEnabled(true);
        };

        /**
        * 匹配皮肤和主机组件的公共变量，并完成实例的注入。此方法在附加皮肤时会自动执行一次。
        * 若皮肤中含有延迟实例化的子部件，在子部件实例化完成时需要从外部再次调用此方法,完成注入。
        * @method egret.SkinnableComponent#findSkinParts
        */
        SkinnableComponent.prototype.findSkinParts = function () {
            var skin = this._skin;
            if (skin && "skinParts" in skin) {
                var skinParts = skin.skinParts;
                var length = skinParts.length;
                for (var i = 0; i < length; i++) {
                    var partName = skinParts[i];
                    if ((partName in skin)) {
                        try  {
                            this[partName] = skin[partName];
                            this.partAdded(partName, skin[partName]);
                        } catch (e) {
                        }
                    }
                }
            }
        };

        /**
        * 卸载皮肤
        * @method egret.SkinnableComponent#detachSkin
        * @param skin {any}
        */
        SkinnableComponent.prototype.detachSkin = function (skin) {
            if (skin && "skinParts" in skin) {
                var skinParts = skin.skinParts;
                var length = skinParts.length;
                for (var i = 0; i < length; i++) {
                    var partName = skinParts[i];
                    if (!(partName in this))
                        continue;
                    if (this[partName] != null) {
                        this.partRemoved(partName, this[partName]);
                    }
                    this[partName] = null;
                }
                skin.hostComponent = null;
            }
        };

        /**
        * 若皮肤是ISkin,则调用此方法附加皮肤中的公共部件
        * @method egret.SkinnableComponent#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        SkinnableComponent.prototype.partAdded = function (partName, instance) {
            egret.SkinPartEvent.dispatchSkinPartEvent(this, egret.SkinPartEvent.PART_ADDED, partName, instance);
        };

        /**
        * 若皮肤是ISkin，则调用此方法卸载皮肤之前注入的公共部件
        * @method egret.SkinnableComponent#partRemoved
        * @param partName {string}
        * @param instance {any}
        */
        SkinnableComponent.prototype.partRemoved = function (partName, instance) {
            egret.SkinPartEvent.dispatchSkinPartEvent(this, egret.SkinPartEvent.PART_REMOVED, partName, instance);
        };

        /**
        * 标记当前需要重新验证皮肤状态
        * @method egret.SkinnableComponent#invalidateSkinState
        */
        SkinnableComponent.prototype.invalidateSkinState = function () {
            if (this.stateIsDirty)
                return;

            this.stateIsDirty = true;
            this.invalidateProperties();
        };

        /**
        * 子类覆盖此方法,应用当前的皮肤状态
        * @method egret.SkinnableComponent#validateSkinState
        */
        SkinnableComponent.prototype.validateSkinState = function () {
            var curState = this.getCurrentSkinState();
            var skin = this._skin;
            if (skin && "currentState" in skin) {
                skin.currentState = curState;
            }
            if (this.hasEventListener("stateChanged"))
                this.dispatchEventWith("stateChanged");
        };

        Object.defineProperty(SkinnableComponent.prototype, "autoTouchEnabled", {
            /**
            * 在enabled属性发生改变时是否自动开启或禁用鼠标事件的响应。默认值为true。
            * @member egret.SkinnableComponent#autoTouchEnabled
            */
            get: function () {
                return this._autoMouseEnabled;
            },
            set: function (value) {
                if (this._autoMouseEnabled == value)
                    return;
                this._autoMouseEnabled = value;
                if (this._autoMouseEnabled) {
                    this._touchChildren = this.enabled ? this.explicitMouseChildren : false;
                    this._touchEnabled = this.enabled ? this.explicitMouseEnabled : false;
                } else {
                    this._touchChildren = this.explicitMouseChildren;
                    this._touchEnabled = this.explicitMouseEnabled;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(SkinnableComponent.prototype, "touchChildren", {
            /**
            * @member egret.SkinnableComponent#touchChildren
            */
            get: function () {
                return this._touchChildren;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (this.enabled)
                    this._touchChildren = value;
                this.explicitMouseChildren = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(SkinnableComponent.prototype, "touchEnabled", {
            /**
            * @member egret.SkinnableComponent#touchEnabled
            */
            get: function () {
                return this._touchEnabled;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (this.enabled)
                    this._touchEnabled = value;
                this.explicitMouseEnabled = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(SkinnableComponent.prototype, "enabled", {
            /**
            * @member egret.SkinnableComponent#enabled
            */
            get: function () {
                return this._enabled;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                this._setEnabled(value);
            },
            enumerable: true,
            configurable: true
        });


        SkinnableComponent.prototype._setEnabled = function (value) {
            if (this._enabled == value)
                return;
            this._enabled = value;
            if (this._autoMouseEnabled) {
                this._touchChildren = value ? this.explicitMouseChildren : false;
                this._touchEnabled = value ? this.explicitMouseEnabled : false;
            }
            this.invalidateSkinState();
        };

        /**
        * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
        * @method egret.SkinnableComponent#getCurrentSkinState
        * @returns {string}
        */
        SkinnableComponent.prototype.getCurrentSkinState = function () {
            return this.enabled ? "normal" : "disabled";
        };

        //========================皮肤视图状态===================end========================
        /**
        * @method egret.SkinnableComponent#commitProperties
        */
        SkinnableComponent.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.stateIsDirty) {
                this.stateIsDirty = false;
                this.validateSkinState();
            }
        };

        /**
        * 启用或禁用组件自身的布局。通常用在当组件的皮肤不是ISkinPartHost，又需要自己创建子项并布局时。
        */
        SkinnableComponent.prototype._setSkinLayoutEnabled = function (value) {
            var hasLayout = (this.skinLayout != null);
            if (hasLayout == value)
                return;
            if (value) {
                this.skinLayout = new egret.SkinBasicLayout();
                this.skinLayout.target = this;
            } else {
                this.skinLayout.target = null;
                this.skinLayout = null;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        };

        SkinnableComponent.prototype._childXYChanged = function () {
            if (this.skinLayout) {
                this.invalidateSize();
                this.invalidateDisplayList();
            }
        };

        SkinnableComponent.prototype.measure = function () {
            _super.prototype.measure.call(this);
            var skin = this._skin;
            if (!skin)
                return;
            var isDisplayObject = (skin instanceof egret.DisplayObject);
            if (isDisplayObject) {
                if (skin && "preferredWidth" in skin) {
                    this.measuredWidth = (skin).preferredWidth;
                    this.measuredHeight = (skin).preferredHeight;
                } else {
                    this.measuredWidth = skin.width;
                    this.measuredHeight = skin.height;
                }
            }
            if (this.skinLayout) {
                this.skinLayout.measure();
            }
            if (!isDisplayObject) {
                var measuredW = this.measuredWidth;
                var measuredH = this.measuredHeight;
                try  {
                    if (!isNaN(skin.width))
                        measuredW = Math.ceil(skin.width);
                    if (!isNaN(skin.height))
                        measuredH = Math.ceil(skin.height);
                    if (skin.hasOwnProperty("minWidth") && measuredW < skin.minWidth) {
                        measuredW = skin.minWidth;
                    }
                    if (skin.hasOwnProperty("maxWidth") && measuredW > skin.maxWidth) {
                        measuredW = skin.maxWidth;
                    }
                    if (skin.hasOwnProperty("minHeight") && measuredH < skin.minHeight) {
                        measuredH = skin.minHeight;
                    }
                    if (skin.hasOwnProperty("maxHeight") && measuredH > skin.maxHeight) {
                        measuredH = skin.maxHeight;
                    }
                    this.measuredWidth = measuredW;
                    this.measuredHeight = measuredH;
                } catch (e) {
                }
            }
        };

        /**
        * @method egret.SkinnableComponent#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        SkinnableComponent.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var skin = this._skin;
            if (skin) {
                if ("setLayoutBoundsSize" in skin) {
                    (skin).setLayoutBoundsSize(unscaledWidth, unscaledHeight);
                } else if (skin instanceof egret.DisplayObject) {
                    skin.scaleX = skin.width == 0 ? 1 : unscaledWidth / skin.width;
                    skin.scaleY = skin.height == 0 ? 1 : unscaledHeight / skin.height;
                }
            }
            if (this.skinLayout) {
                this.skinLayout.updateDisplayList(unscaledWidth, unscaledHeight);
            }
        };

        /**
        * @method egret.SkinnableComponent#addChild
        * @deprecated
        * @param child {DisplayObject}
        * @returns {DisplayObject}
        */
        SkinnableComponent.prototype.addChild = function (child) {
            throw (new Error("addChild()" + SkinnableComponent.errorStr + "addElement()代替"));
        };

        /**
        * @method egret.SkinnableComponent#addChildAt
        * @deprecated
        * @param child {DisplayObject}
        * @param index {number}
        * @returns {DisplayObject}
        */
        SkinnableComponent.prototype.addChildAt = function (child, index) {
            throw (new Error("addChildAt()" + SkinnableComponent.errorStr + "addElementAt()代替"));
        };

        /**
        * @method egret.SkinnableComponent#removeChild
        * @deprecated
        * @param child {DisplayObject}
        * @returns {DisplayObject}
        */
        SkinnableComponent.prototype.removeChild = function (child) {
            throw (new Error("removeChild()" + SkinnableComponent.errorStr + "removeElement()代替"));
        };

        /**
        * @method egret.SkinnableComponent#removeChildAt
        * @deprecated
        * @param index {number}
        * @returns {DisplayObject}
        */
        SkinnableComponent.prototype.removeChildAt = function (index) {
            throw (new Error("removeChildAt()" + SkinnableComponent.errorStr + "removeElementAt()代替"));
        };

        /**
        * @method egret.SkinnableComponent#setChildIndex
        * @deprecated
        * @param child {DisplayObject}
        * @param index {number}
        */
        SkinnableComponent.prototype.setChildIndex = function (child, index) {
            throw (new Error("setChildIndex()" + SkinnableComponent.errorStr + "setElementIndex()代替"));
        };

        /**
        * @method egret.SkinnableComponent#swapChildren
        * @deprecated
        * @param child1 {DisplayObject}
        * @param child2 {DisplayObject}
        */
        SkinnableComponent.prototype.swapChildren = function (child1, child2) {
            throw (new Error("swapChildren()" + SkinnableComponent.errorStr + "swapElements()代替"));
        };

        /**
        * @method egret.SkinnableComponent#swapChildrenAt
        * @deprecated
        * @param index1 {number}
        * @param index2 {number}
        */
        SkinnableComponent.prototype.swapChildrenAt = function (index1, index2) {
            throw (new Error("swapChildrenAt()" + SkinnableComponent.errorStr + "swapElementsAt()代替"));
        };
        SkinnableComponent.errorStr = "在此组件中不可用，若此组件为容器类，请使用";
        return SkinnableComponent;
    })(egret.UIComponent);
    egret.SkinnableComponent = SkinnableComponent;
})(egret || (egret = {}));
