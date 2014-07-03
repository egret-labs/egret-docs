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
    * @class egret.Tree
    * @classdesc
    * 树状列表组件
    * @extends egret.List
    */
    var Tree = (function (_super) {
        __extends(Tree, _super);
        /**
        * 构造函数
        * @method egret.Tree#constructor
        */
        function Tree() {
            _super.call(this);
            /**
            * 图标字段或函数改变标志
            */
            this.iconFieldOrFunctionChanged = false;
            this.hostComponentKey = "egret.Tree";
        }
        /**
        * @method egret.Tree#createChildren
        */
        Tree.prototype.createChildren = function () {
            if (!this.itemRenderer)
                this.itemRenderer = Tree.defaultTreeRendererFactory;
            _super.prototype.createChildren.call(this);
        };

        /**
        * @method egret.Tree#updateRenderer
        * @param renderer {IItemRenderer}
        * @param itemIndex {number}
        * @param data {any}
        * @returns {IItemRenderer}
        */
        Tree.prototype.updateRenderer = function (renderer, itemIndex, data) {
            if ("hasChildren" in renderer && "hasChildren" in this.dataProvider) {
                var treeCollection = (this.dataProvider);
                var treeRenderer = renderer;
                treeRenderer.hasChildren = treeCollection.hasChildren(data);
                treeRenderer.opened = treeCollection.isItemOpen(data);
                treeRenderer.depth = treeCollection.getDepth(data);
                treeRenderer.iconSkinName = this.itemToIcon(data);
            }
            return _super.prototype.updateRenderer.call(this, renderer, itemIndex, data);
        };

        /**
        * 根据数据项返回项呈示器中图标的skinName属性值
        * @method egret.Tree#itemToIcon
        * @param data {any}
        * @returns {any}
        */
        Tree.prototype.itemToIcon = function (data) {
            if (!data)
                return null;

            if (this._iconFunction != null)
                return this._iconFunction(data);

            var skinName;
            if (data instanceof Object) {
                try  {
                    if (data[this.iconField]) {
                        skinName = data[this.iconField];
                    }
                } catch (e) {
                }
            }
            return skinName;
        };

        /**
        * @method egret.Tree#dataGroup_rendererAddHandler
        * @param event {RendererExistenceEvent}
        */
        Tree.prototype.dataGroup_rendererAddHandler = function (event) {
            _super.prototype.dataGroup_rendererAddHandler.call(this, event);
            if (event.renderer && "hasChildren" in event.renderer)
                event.renderer.addEventListener(egret.TreeEvent.ITEM_OPENING, this.onItemOpening, this);
        };

        /**
        * 节点即将打开
        */
        Tree.prototype.onItemOpening = function (event) {
            var renderer = event.itemRenderer;
            var item = event.item;
            var dp = this._getDataProvider();
            if (!renderer || !dp || !("hasChildren" in dp))
                return;
            if (this.dispatchEvent(event)) {
                var opend = !renderer.opened;
                dp.expandItem(item, opend);
                var type = opend ? egret.TreeEvent.ITEM_OPEN : egret.TreeEvent.ITEM_CLOSE;
                egret.TreeEvent.dispatchTreeEvent(this, type, renderer.itemIndex, item, renderer);
            }
        };

        /**
        * @method egret.Tree#dataGroup_rendererRemoveHandler
        * @param event {RendererExistenceEvent}
        */
        Tree.prototype.dataGroup_rendererRemoveHandler = function (event) {
            _super.prototype.dataGroup_rendererRemoveHandler.call(this, event);
            if (event.renderer && "hasChildren" in event.renderer)
                event.renderer.removeEventListener(egret.TreeEvent.ITEM_OPENING, this.onItemOpening, this);
        };

        Object.defineProperty(Tree.prototype, "iconField", {
            /**
            * 数据项中用来确定图标skinName属性值的字段名称。另请参考UIAsset.skinName。
            * 若设置了iconFunction，则设置此属性无效。
            * @member egret.Tree#iconField
            */
            get: function () {
                return this._iconField;
            },
            set: function (value) {
                if (this._iconField == value)
                    return;
                this._iconField = value;
                this.iconFieldOrFunctionChanged = true;
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Tree.prototype, "iconFunction", {
            /**
            * 用户提供的函数，在每个数据项目上运行以确定其图标的skinName值。另请参考UIAsset.skinName。
            * 示例：iconFunction(item:Object):Object
            * @member egret.Tree#iconFunction
            */
            get: function () {
                return this._iconFunction;
            },
            set: function (value) {
                if (this._iconFunction == value)
                    return;
                this._iconFunction = value;
                this.iconFieldOrFunctionChanged = true;
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 打开或关闭一个节点,注意，此操作不会抛出open或close事件。
        * @method egret.Tree#expandItem
        * @param item {any} 要打开或关闭的节点
        * @param open {boolean} true表示打开节点，反之关闭。
        */
        Tree.prototype.expandItem = function (item, open) {
            if (typeof open === "undefined") { open = true; }
            var dp = this._getDataProvider();
            if (!dp || !("hasChildren" in dp))
                return;
            (dp).expandItem(item, open);
        };

        /**
        * 指定的节点是否打开
        * @method egret.Tree#isItemOpen
        * @param item {any}
        * @returns {boolean}
        */
        Tree.prototype.isItemOpen = function (item) {
            var dp = this._getDataProvider();
            if (!dp || !("hasChildren" in dp))
                return false;
            return (dp).isItemOpen(item);
        };

        /**
        * @method egret.Tree#dataProvider_collectionChangeHandler
        * @param event {CollectionEvent}
        */
        Tree.prototype.dataProvider_collectionChangeHandler = function (event) {
            _super.prototype.dataProvider_collectionChangeHandler.call(this, event);
            if (event.kind == egret.CollectionEventKind.OPEN || event.kind == egret.CollectionEventKind.CLOSE) {
                var renderer = this.dataGroup ? (this.dataGroup.getElementAt(event.location)) : null;
                if (renderer) {
                    this.updateRenderer(renderer, event.location, event.items[0]);
                    if (event.kind == egret.CollectionEventKind.CLOSE && this.layout && this.layout.useVirtualLayout) {
                        this.layout.clearVirtualLayoutCache();
                        this.invalidateSize();
                    }
                }
            }
        };

        /**
        * @method egret.Tree#commitProperties
        */
        Tree.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.iconFieldOrFunctionChanged) {
                if (this.dataGroup != null) {
                    var itemIndex;
                    if (this.layout && this.layout.useVirtualLayout) {
                        var list = this.dataGroup.getElementIndicesInView();
                        var length = list.length;
                        for (var i = 0; i < length; i++) {
                            var itemIndex = list[i];
                            this.updateRendererIconProperty(itemIndex);
                        }
                    } else {
                        var n = this.dataGroup.numElements;
                        for (itemIndex = 0; itemIndex < n; itemIndex++) {
                            this.updateRendererIconProperty(itemIndex);
                        }
                    }
                }
                this.iconFieldOrFunctionChanged = false;
            }
        };

        /**
        * 更新指定索引项的图标
        */
        Tree.prototype.updateRendererIconProperty = function (itemIndex) {
            var renderer = (this.dataGroup.getElementAt(itemIndex));
            if (renderer)
                renderer.iconSkinName = this.itemToIcon(renderer.data);
        };
        Tree.defaultTreeRendererFactory = new egret.ClassFactory(egret.TreeItemRenderer);
        return Tree;
    })(egret.List);
    egret.Tree = Tree;
})(egret || (egret = {}));
