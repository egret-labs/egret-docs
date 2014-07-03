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
    * @class egret.SkinnableDataContainer
    * @classdesc
    * 可设置外观的数据项目容器基类
    * @extends egret.SkinnableComponent
    * @implements egret.IItemRendererOwner
    */
    var SkinnableDataContainer = (function (_super) {
        __extends(SkinnableDataContainer, _super);
        /**
        * 构造函数
        * @method egret.SkinnableDataContainer#constructor
        */
        function SkinnableDataContainer() {
            _super.call(this);
            /**
            * dataGroup发生改变时传递的参数
            */
            this._dataGroupProperties = {};
            this.hostComponentKey = "egret.SkinnableDataContainer";
        }
        /**
        * @method egret.SkinnableDataContainer#updateRenderer
        * @param renderer {IItemRenderer}
        * @param itemIndex {number}
        * @param data {any}
        * @returns {IItemRenderer}
        */
        SkinnableDataContainer.prototype.updateRenderer = function (renderer, itemIndex, data) {
            if ("ownerChanged" in renderer) {
                renderer.ownerChanged(this);
            }
            renderer.itemIndex = itemIndex;
            renderer.label = this.itemToLabel(data);
            renderer.data = data;
            return renderer;
        };

        /**
        * 返回可在项呈示器中显示的 String
        * @method egret.SkinnableDataContainer#itemToLabel
        * @param item {any}
        * @returns {string}
        */
        SkinnableDataContainer.prototype.itemToLabel = function (item) {
            if (item !== null)
                return item.toString();
            else
                return " ";
        };

        Object.defineProperty(SkinnableDataContainer.prototype, "dataProvider", {
            /**
            * 列表数据源，请使用实现了ICollection接口的数据类型，例如ArrayCollection
            * @member egret.SkinnableDataContainer#dataProvider
            */
            get: function () {
                return this._getDataProvider();
            },
            set: function (value) {
                this._setDataProvider(value);
            },
            enumerable: true,
            configurable: true
        });

        SkinnableDataContainer.prototype._getDataProvider = function () {
            return this.dataGroup != null ? this.dataGroup.dataProvider : this._dataGroupProperties.dataProvider;
        };


        SkinnableDataContainer.prototype._setDataProvider = function (value) {
            if (this.dataGroup == null) {
                this._dataGroupProperties.dataProvider = value;
            } else {
                this.dataGroup.dataProvider = value;
                this._dataGroupProperties.dataProvider = true;
            }
        };

        Object.defineProperty(SkinnableDataContainer.prototype, "itemRenderer", {
            /**
            * 用于数据项目的项呈示器。该类必须实现 IItemRenderer 接口。 <br/>
            * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
            * @member egret.SkinnableDataContainer#itemRenderer
            */
            get: function () {
                return (this.dataGroup) ? this.dataGroup.itemRenderer : this._dataGroupProperties.itemRenderer;
            },
            set: function (value) {
                if (this.dataGroup == null) {
                    this._dataGroupProperties.itemRenderer = value;
                } else {
                    this.dataGroup.itemRenderer = value;
                    this._dataGroupProperties.itemRenderer = true;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(SkinnableDataContainer.prototype, "itemRendererSkinName", {
            /**
            * 条目渲染器的可选皮肤标识符。在实例化itemRenderer时，若其内部没有设置过skinName,则将此属性的值赋值给它的skinName。
            * 注意:若itemRenderer不是ISkinnableClient，则此属性无效。
            * @member egret.SkinnableDataContainer#itemRendererSkinName
            */
            get: function () {
                return (this.dataGroup) ? this.dataGroup.itemRendererSkinName : this._dataGroupProperties.itemRendererSkinName;
            },
            set: function (value) {
                if (this.dataGroup == null) {
                    this._dataGroupProperties.itemRendererSkinName = value;
                } else {
                    this.dataGroup.itemRendererSkinName = value;
                    this._dataGroupProperties.itemRendererSkinName = true;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(SkinnableDataContainer.prototype, "itemRendererFunction", {
            /**
            * 为某个特定项目返回一个项呈示器Class的函数。 <br/>
            * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。 <br/>
            * 应该定义一个与此示例函数类似的呈示器函数： <br/>
            * function myItemRendererFunction(item:Object):IFactory
            * @member egret.SkinnableDataContainer#itemRendererFunction
            */
            get: function () {
                return (this.dataGroup) ? this.dataGroup.itemRendererFunction : this._dataGroupProperties.itemRendererFunction;
            },
            set: function (value) {
                if (this.dataGroup == null) {
                    this._dataGroupProperties.itemRendererFunction = value;
                } else {
                    this.dataGroup.itemRendererFunction = value;
                    this._dataGroupProperties.itemRendererFunction = true;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(SkinnableDataContainer.prototype, "layout", {
            /**
            * 布局对象
            * @member egret.SkinnableDataContainer#layout
            */
            get: function () {
                return (this.dataGroup) ? this.dataGroup.layout : this._dataGroupProperties.layout;
            },
            set: function (value) {
                this._setLayout(value);
            },
            enumerable: true,
            configurable: true
        });


        SkinnableDataContainer.prototype._setLayout = function (value) {
            if (this.dataGroup == null) {
                this._dataGroupProperties.layout = value;
            } else {
                this.dataGroup.layout = value;
                this._dataGroupProperties.layout = true;
            }
        };

        /**
        * @method egret.SkinnableDataContainer#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        SkinnableDataContainer.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);

            if (instance == this.dataGroup) {
                var newDataGroupProperties = {};

                if (this._dataGroupProperties.layout !== undefined) {
                    this.dataGroup.layout = this._dataGroupProperties.layout;
                    newDataGroupProperties.layout = true;
                }

                if (this._dataGroupProperties.dataProvider !== undefined) {
                    this.dataGroup.dataProvider = this._dataGroupProperties.dataProvider;
                    newDataGroupProperties.dataProvider = true;
                }

                if (this._dataGroupProperties.itemRenderer !== undefined) {
                    this.dataGroup.itemRenderer = this._dataGroupProperties.itemRenderer;
                    newDataGroupProperties.itemRenderer = true;
                }

                if (this._dataGroupProperties.itemRendererSkinName !== undefined) {
                    this.dataGroup.itemRendererSkinName = this._dataGroupProperties.itemRendererSkinName;
                    newDataGroupProperties.itemRendererSkinName = true;
                }

                if (this._dataGroupProperties.itemRendererFunction !== undefined) {
                    this.dataGroup.itemRendererFunction = this._dataGroupProperties.itemRendererFunction;
                    newDataGroupProperties.itemRendererFunction = true;
                }
                this.dataGroup._rendererOwner = this;
                this._dataGroupProperties = newDataGroupProperties;

                if (this.hasEventListener(egret.RendererExistenceEvent.RENDERER_ADD)) {
                    this.dataGroup.addEventListener(egret.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
                }

                if (this.hasEventListener(egret.RendererExistenceEvent.RENDERER_REMOVE)) {
                    this.dataGroup.addEventListener(egret.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this);
                }
            }
        };

        /**
        * @method egret.SkinnableDataContainer#partRemoved
        * @param partName {string}
        * @param instance {any}
        */
        SkinnableDataContainer.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);

            if (instance == this.dataGroup) {
                this.dataGroup.removeEventListener(egret.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
                this.dataGroup.removeEventListener(egret.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this);
                var newDataGroupProperties = {};
                if (this._dataGroupProperties.layout)
                    newDataGroupProperties.layout = this.dataGroup.layout;
                if (this._dataGroupProperties.dataProvider)
                    newDataGroupProperties.dataProvider = this.dataGroup.dataProvider;
                if (this._dataGroupProperties.itemRenderer)
                    newDataGroupProperties.itemRenderer = this.dataGroup.itemRenderer;
                if (this._dataGroupProperties.itemRendererSkinName)
                    newDataGroupProperties.itemRendererSkinName = this.dataGroup.itemRendererSkinName;
                if (this._dataGroupProperties.itemRendererFunction)
                    newDataGroupProperties.itemRendererFunction = this.dataGroup.itemRendererFunction;
                this._dataGroupProperties = newDataGroupProperties;
                this.dataGroup._rendererOwner = null;
                this.dataGroup.dataProvider = null;
                this.dataGroup.layout = null;
            }
        };

        /**
        * @method egret.SkinnableDataContainer#addEventListener
        * @param type {string}
        * @param listener {Function}
        * @param thisObject {any}
        * @param useCapture {boolean}
        * @param priority {number}
        */
        SkinnableDataContainer.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            if (typeof useCapture === "undefined") { useCapture = false; }
            if (typeof priority === "undefined") { priority = 0; }
            _super.prototype.addEventListener.call(this, type, listener, thisObject, useCapture, priority);

            if (type == egret.RendererExistenceEvent.RENDERER_ADD && this.dataGroup) {
                this.dataGroup.addEventListener(egret.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
            }

            if (type == egret.RendererExistenceEvent.RENDERER_REMOVE && this.dataGroup) {
                this.dataGroup.addEventListener(egret.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this);
            }
        };

        /**
        * @method egret.SkinnableDataContainer#removeEventListener
        * @param type {string}
        * @param listener {Function}
        * @param thisObject {any}
        * @param useCapture {boolean}
        */
        SkinnableDataContainer.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
            if (typeof useCapture === "undefined") { useCapture = false; }
            _super.prototype.removeEventListener.call(this, type, listener, thisObject, useCapture);

            if (type == egret.RendererExistenceEvent.RENDERER_ADD && this.dataGroup) {
                if (!this.hasEventListener(egret.RendererExistenceEvent.RENDERER_ADD)) {
                    this.dataGroup.removeEventListener(egret.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
                }
            }

            if (type == egret.RendererExistenceEvent.RENDERER_REMOVE && this.dataGroup) {
                if (!this.hasEventListener(egret.RendererExistenceEvent.RENDERER_REMOVE)) {
                    this.dataGroup.removeEventListener(egret.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this);
                }
            }
        };
        return SkinnableDataContainer;
    })(egret.SkinnableComponent);
    egret.SkinnableDataContainer = SkinnableDataContainer;
})(egret || (egret = {}));
