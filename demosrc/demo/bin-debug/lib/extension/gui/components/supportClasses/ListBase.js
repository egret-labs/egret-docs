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
    * @class egret.ListBase
    * @classdesc
    * 支持选择内容的所有组件的基类。
    * @extends egret.SkinnableDataContainer
    */
    var ListBase = (function (_super) {
        __extends(ListBase, _super);
        /**
        * @method egret.ListBase#constructor
        */
        function ListBase() {
            _super.call(this);
            /**
            * 正在进行所有数据源的刷新操作
            * @member egret.ListBase#_doingWholesaleChanges
            */
            this._doingWholesaleChanges = false;
            this._labelField = "label";
            this._requireSelection = false;
            this.requireSelectionChanged = false;
            /**
            * 在属性提交前缓存真实的选中项的值
            */
            this._proposedSelectedIndex = ListBase.NO_PROPOSED_SELECTION;
            this._selectedIndex = ListBase.NO_SELECTION;
            /**
            * 是否允许自定义的选中项
            * @member egret.ListBase#_allowCustomSelectedItem
            */
            this._allowCustomSelectedItem = false;
            /**
            * 索引改变后是否需要抛出事件
            * @member egret.ListBase#_dispatchChangeAfterSelection
            */
            this._dispatchChangeAfterSelection = false;
            this._useVirtualLayout = false;
            this.selectedIndexAdjusted = false;
        }
        ListBase.prototype._setDataProvider = function (value) {
            if (this.dataProvider)
                this.dataProvider.removeEventListener(egret.CollectionEvent.COLLECTION_CHANGE, this.dataProvider_collectionChangeHandler, this);

            this.dataProviderChanged = true;
            this._doingWholesaleChanges = true;

            if (value)
                value.addEventListener(egret.CollectionEvent.COLLECTION_CHANGE, this.dataProvider_collectionChangeHandler, this);

            _super.prototype._setDataProvider.call(this, value);
            this.invalidateProperties();
        };

        Object.defineProperty(ListBase.prototype, "layout", {
            /**
            * 布局对象
            * @member egret.ListBase#layout
            */
            get: function () {
                return (this.dataGroup) ? this.dataGroup.layout : this._dataGroupProperties.layout;
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                if (value && this.useVirtualLayout)
                    value.useVirtualLayout = true;

                this._setLayout(value);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ListBase.prototype, "labelField", {
            /**
            * 数据项如果是一个对象，此属性为数据项中用来显示标签文字的字段名称。
            * 若设置了labelFunction，则设置此属性无效。
            * @member egret.ListBase#labelField
            */
            get: function () {
                return this._labelField;
            },
            set: function (value) {
                this._setLabelField(value);
            },
            enumerable: true,
            configurable: true
        });


        ListBase.prototype._setLabelField = function (value) {
            if (value == this._labelField)
                return;
            this._labelField = value;
            this.labelFieldOrFunctionChanged = true;
            this.invalidateProperties();
        };

        Object.defineProperty(ListBase.prototype, "labelFunction", {
            /**
            * 用户提供的函数，在每个项目上运行以确定其标签。
            * 示例：function labelFunc(item:Object):String 。
            * @member egret.ListBase#labelFunction
            */
            get: function () {
                return this._labelFunction;
            },
            set: function (value) {
                this._setLabelFunction(value);
            },
            enumerable: true,
            configurable: true
        });


        ListBase.prototype._setLabelFunction = function (value) {
            if (value == this._labelFunction)
                return;

            this._labelFunction = value;
            this.labelFieldOrFunctionChanged = true;
            this.invalidateProperties();
        };

        Object.defineProperty(ListBase.prototype, "requireSelection", {
            /**
            * 如果为 true，则必须始终在控件中选中数据项目。<br/>
            * 如果该值为 true，则始终将 selectedIndex 属性设置为 0 和 (dataProvider.length - 1) 之间的一个值。
            * @member egret.ListBase#requireSelection
            */
            get: function () {
                return this._requireSelection;
            },
            set: function (value) {
                this._setRequireSelection(value);
            },
            enumerable: true,
            configurable: true
        });


        ListBase.prototype._setRequireSelection = function (value) {
            if (value == this._requireSelection)
                return;

            this._requireSelection = value;

            if (value) {
                this.requireSelectionChanged = true;
                this.invalidateProperties();
            }
        };

        Object.defineProperty(ListBase.prototype, "selectedIndex", {
            /**
            * 选中项目的基于 0 的索引。<br/>
            * 或者如果未选中项目，则为-1。设置 selectedIndex 属性会取消选择当前选定的项目并选择指定索引位置的数据项目。 <br/>
            * 当用户通过与控件交互来更改 selectedIndex 属性时，此控件将分派 change 和 changing 事件。<br/>
            * 当以编程方式更改 selectedIndex 属性的值时，此控件不分派 change 和 changing 事件。
            * @member egret.ListBase#selectedIndex
            */
            get: function () {
                return this._getSelectedIndex();
            },
            set: function (value) {
                this._setSelectedIndex(value, false);
            },
            enumerable: true,
            configurable: true
        });

        ListBase.prototype._getSelectedIndex = function () {
            if (this._proposedSelectedIndex != ListBase.NO_PROPOSED_SELECTION)
                return this._proposedSelectedIndex;

            return this._selectedIndex;
        };


        /**
        * 设置选中项
        */
        ListBase.prototype._setSelectedIndex = function (value, dispatchChangeEvent) {
            if (typeof dispatchChangeEvent === "undefined") { dispatchChangeEvent = false; }
            if (value == this.selectedIndex) {
                return;
            }

            if (dispatchChangeEvent)
                this._dispatchChangeAfterSelection = (this._dispatchChangeAfterSelection || dispatchChangeEvent);
            this._proposedSelectedIndex = value;
            this.invalidateProperties();
        };

        Object.defineProperty(ListBase.prototype, "selectedItem", {
            /**
            * 当前已选中的项目。设置此属性会取消选中当前选定的项目并选择新指定的项目。<br/>
            * 当用户通过与控件交互来更改 selectedItem 属性时，此控件将分派 change 和 changing 事件。<br/>
            * 当以编程方式更改 selectedItem 属性的值时，此控件不分派 change 和 changing 事件。
            * @member egret.ListBase#selectedItem
            */
            get: function () {
                if (this._pendingSelectedItem !== undefined)
                    return this._pendingSelectedItem;

                if (this._allowCustomSelectedItem && this.selectedIndex == ListBase.CUSTOM_SELECTED_ITEM)
                    return this._selectedItem;

                if (this.selectedIndex == ListBase.NO_SELECTION || this.dataProvider == null)
                    return undefined;

                return this.dataProvider.length > this.selectedIndex ? this.dataProvider.getItemAt(this.selectedIndex) : undefined;
            },
            set: function (value) {
                this._setSelectedItem(value, false);
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 设置选中项数据源
        * @method egret.ListBase#_setSelectedItem
        * @param value {any}
        * @param dispatchChangeEvent {boolean}
        */
        ListBase.prototype._setSelectedItem = function (value, dispatchChangeEvent) {
            if (typeof dispatchChangeEvent === "undefined") { dispatchChangeEvent = false; }
            if (this.selectedItem === value)
                return;

            if (dispatchChangeEvent)
                this._dispatchChangeAfterSelection = (this._dispatchChangeAfterSelection || dispatchChangeEvent);

            this._pendingSelectedItem = value;
            this.invalidateProperties();
        };

        Object.defineProperty(ListBase.prototype, "useVirtualLayout", {
            /**
            * 是否使用虚拟布局,默认flase
            * @member egret.ListBase#useVirtualLayout
            */
            get: function () {
                return this._getUseVirtualLayout();
            },
            set: function (value) {
                this._setUseVirtualLayout(value);
            },
            enumerable: true,
            configurable: true
        });

        ListBase.prototype._getUseVirtualLayout = function () {
            return (this.layout) ? this.layout.useVirtualLayout : this._useVirtualLayout;
        };


        ListBase.prototype._setUseVirtualLayout = function (value) {
            if (value == this.useVirtualLayout)
                return;

            this._useVirtualLayout = value;
            if (this.layout)
                this.layout.useVirtualLayout = value;
        };

        /**
        * @method egret.ListBase#commitProperties
        */
        ListBase.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);

            if (this.dataProviderChanged) {
                this.dataProviderChanged = false;
                this._doingWholesaleChanges = false;

                if (this.selectedIndex >= 0 && this.dataProvider && this.selectedIndex < this.dataProvider.length)
                    this.itemSelected(this.selectedIndex, true);
                else if (this.requireSelection)
                    this._proposedSelectedIndex = 0;
                else
                    this._setSelectedIndex(-1, false);
            }

            if (this.requireSelectionChanged) {
                this.requireSelectionChanged = false;

                if (this.requireSelection && this.selectedIndex == ListBase.NO_SELECTION && this.dataProvider && this.dataProvider.length > 0) {
                    this._proposedSelectedIndex = 0;
                }
            }

            if (this._pendingSelectedItem !== undefined) {
                if (this.dataProvider)
                    this._proposedSelectedIndex = this.dataProvider.getItemIndex(this._pendingSelectedItem);
                else
                    this._proposedSelectedIndex = ListBase.NO_SELECTION;

                if (this._allowCustomSelectedItem && this._proposedSelectedIndex == -1) {
                    this._proposedSelectedIndex = ListBase.CUSTOM_SELECTED_ITEM;
                    this._selectedItem = this._pendingSelectedItem;
                }

                this._pendingSelectedItem = undefined;
            }

            var changedSelection = false;
            if (this._proposedSelectedIndex != ListBase.NO_PROPOSED_SELECTION)
                changedSelection = this.commitSelection();

            if (this.selectedIndexAdjusted) {
                this.selectedIndexAdjusted = false;
                if (!changedSelection) {
                    egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.VALUE_COMMIT);
                }
            }

            if (this.labelFieldOrFunctionChanged) {
                if (this.dataGroup != null) {
                    var itemIndex;

                    if (this.layout && this.layout.useVirtualLayout) {
                        var list = this.dataGroup.getElementIndicesInView();
                        var length = list.length;
                        for (var i = 0; i < length; i++) {
                            var itemIndex = list[i];
                            this.updateRendererLabelProperty(itemIndex);
                        }
                    } else {
                        var n = this.dataGroup.numElements;
                        for (itemIndex = 0; itemIndex < n; itemIndex++) {
                            this.updateRendererLabelProperty(itemIndex);
                        }
                    }
                }

                this.labelFieldOrFunctionChanged = false;
            }
        };

        /**
        *  更新项呈示器文字标签
        */
        ListBase.prototype.updateRendererLabelProperty = function (itemIndex) {
            var renderer = (this.dataGroup.getElementAt(itemIndex));
            if (renderer)
                renderer.label = this.itemToLabel(renderer.data);
        };

        /**
        * @method egret.ListBase#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        ListBase.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);

            if (instance == this.dataGroup) {
                if (this._useVirtualLayout && this.dataGroup.layout)
                    this.dataGroup.layout.useVirtualLayout = true;

                this.dataGroup.addEventListener(egret.RendererExistenceEvent.RENDERER_ADD, this.dataGroup_rendererAddHandler, this);
                this.dataGroup.addEventListener(egret.RendererExistenceEvent.RENDERER_REMOVE, this.dataGroup_rendererRemoveHandler, this);
            }
        };

        /**
        * @method egret.ListBase#partRemoved
        * @param partName {string}
        * @param instance {any}
        */
        ListBase.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);

            if (instance == this.dataGroup) {
                this.dataGroup.removeEventListener(egret.RendererExistenceEvent.RENDERER_ADD, this.dataGroup_rendererAddHandler, this);
                this.dataGroup.removeEventListener(egret.RendererExistenceEvent.RENDERER_REMOVE, this.dataGroup_rendererRemoveHandler, this);
            }
        };

        /**
        * @method egret.ListBase#updateRenderer
        * @param renderer {IItemRenderer}
        * @param itemIndex {number}
        * @param data {any}
        * @returns {IItemRenderer}
        */
        ListBase.prototype.updateRenderer = function (renderer, itemIndex, data) {
            this.itemSelected(itemIndex, this._isItemIndexSelected(itemIndex));
            return _super.prototype.updateRenderer.call(this, renderer, itemIndex, data);
        };

        /**
        * @method egret.ListBase#itemToLabel
        * @param item {any}
        * @returns {string}
        */
        ListBase.prototype.itemToLabel = function (item) {
            if (this._labelFunction != null)
                return this._labelFunction(item);

            if (typeof (item) == "string")
                return item;

            if (item instanceof egret.XML) {
                try  {
                    if (item[this.labelField].length() != 0)
                        item = item[this.labelField];
                } catch (e) {
                }
            } else if (item instanceof Object) {
                try  {
                    if (item[this.labelField] != null)
                        item = item[this.labelField];
                } catch (e) {
                }
            }

            if (typeof (item) == "string")
                return item;

            try  {
                if (item !== null)
                    return item.toString();
            } catch (e) {
            }

            return " ";
        };

        /**
        * 选中或取消选中项目时调用。子类必须覆盖此方法才可设置选中项。
        * @method egret.ListBase#itemSelected
        * @param index {number} 已选中的项目索引。
        * @param selected {boolean} true为选中，false取消选中
        */
        ListBase.prototype.itemSelected = function (index, selected) {
            if (!this.dataGroup)
                return;
            var renderer = (this.dataGroup.getElementAt(index));
            if (renderer == null)
                return;
            renderer.selected = selected;
        };

        /**
        * 返回指定索引是否等于当前选中索引
        */
        ListBase.prototype._isItemIndexSelected = function (index) {
            return index == this.selectedIndex;
        };

        /**
        * 提交选中项属性，返回是否成功提交，false表示被取消
        * @method egret.ListBase#commitSelection
        * @param dispatchChangedEvents {boolean}
        * @returns {boolean}
        */
        ListBase.prototype.commitSelection = function (dispatchChangedEvents) {
            if (typeof dispatchChangedEvents === "undefined") { dispatchChangedEvents = true; }
            var maxIndex = this.dataProvider ? this.dataProvider.length - 1 : -1;
            var oldSelectedIndex = this._selectedIndex;
            var e;

            if (!this._allowCustomSelectedItem || this._proposedSelectedIndex != ListBase.CUSTOM_SELECTED_ITEM) {
                if (this._proposedSelectedIndex < ListBase.NO_SELECTION)
                    this._proposedSelectedIndex = ListBase.NO_SELECTION;
                if (this._proposedSelectedIndex > maxIndex)
                    this._proposedSelectedIndex = maxIndex;
                if (this.requireSelection && this._proposedSelectedIndex == ListBase.NO_SELECTION && this.dataProvider && this.dataProvider.length > 0) {
                    this._proposedSelectedIndex = ListBase.NO_PROPOSED_SELECTION;
                    this._dispatchChangeAfterSelection = false;
                    return false;
                }
            }

            var tmpProposedIndex = this._proposedSelectedIndex;

            if (this._dispatchChangeAfterSelection) {
                var result = egret.IndexChangeEvent.dispatchIndexChangeEvent(this, egret.IndexChangeEvent.CHANGING, this._selectedIndex, this._proposedSelectedIndex, true);
                if (!result) {
                    this.itemSelected(this._proposedSelectedIndex, false);
                    this._proposedSelectedIndex = ListBase.NO_PROPOSED_SELECTION;
                    this._dispatchChangeAfterSelection = false;
                    return false;
                }
            }

            this._selectedIndex = tmpProposedIndex;
            this._proposedSelectedIndex = ListBase.NO_PROPOSED_SELECTION;

            if (oldSelectedIndex != ListBase.NO_SELECTION)
                this.itemSelected(oldSelectedIndex, false);
            if (this._selectedIndex != ListBase.NO_SELECTION)
                this.itemSelected(this._selectedIndex, true);

            //子类若需要自身抛出Change事件，而不是在此处抛出，可以设置dispatchChangedEvents为false
            if (dispatchChangedEvents) {
                if (this._dispatchChangeAfterSelection) {
                    egret.IndexChangeEvent.dispatchIndexChangeEvent(this, egret.IndexChangeEvent.CHANGE, oldSelectedIndex, this._selectedIndex);
                    this._dispatchChangeAfterSelection = false;
                }
                egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.VALUE_COMMIT);
                ;
            }

            return true;
        };

        /**
        * 仅调整选中索引值而不更新选中项,即在提交属性阶段itemSelected方法不会被调用，也不会触发changing和change事件。
        * @method egret.ListBase#adjustSelection
        * @param newIndex {number} 新索引。
        * @param add {boolean} 如果已将项目添加到组件，则为 true；如果已删除项目，则为 false。
        */
        ListBase.prototype.adjustSelection = function (newIndex, add) {
            if (typeof add === "undefined") { add = false; }
            if (this._proposedSelectedIndex != ListBase.NO_PROPOSED_SELECTION)
                this._proposedSelectedIndex = newIndex;
            else
                this._selectedIndex = newIndex;
            this.selectedIndexAdjusted = true;
            this.invalidateProperties();
        };

        /**
        * 数据项添加
        * @method egret.ListBase#itemAdded
        * @param index {number}
        */
        ListBase.prototype.itemAdded = function (index) {
            if (this._doingWholesaleChanges)
                return;

            if (this.selectedIndex == ListBase.NO_SELECTION) {
                if (this.requireSelection)
                    this.adjustSelection(index, true);
            } else if (index <= this.selectedIndex) {
                this.adjustSelection(this.selectedIndex + 1, true);
            }
        };

        /**
        * 数据项移除
        * @method egret.ListBase#itemRemoved
        * @param index {number}
        */
        ListBase.prototype.itemRemoved = function (index) {
            if (this.selectedIndex == ListBase.NO_SELECTION || this._doingWholesaleChanges)
                return;

            if (index == this.selectedIndex) {
                if (this.requireSelection && this.dataProvider && this.dataProvider.length > 0) {
                    if (index == 0) {
                        this._proposedSelectedIndex = 0;
                        this.invalidateProperties();
                    } else
                        this._setSelectedIndex(0, false);
                } else
                    this.adjustSelection(-1, false);
            } else if (index < this.selectedIndex) {
                this.adjustSelection(this.selectedIndex - 1, false);
            }
        };

        /**
        * 项呈示器被添加
        * @method egret.ListBase#dataGroup_rendererAddHandler
        * @param event {RendererExistenceEvent}
        */
        ListBase.prototype.dataGroup_rendererAddHandler = function (event) {
            var renderer = (event.renderer);

            if (renderer == null)
                return;

            renderer.addEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this.item_mouseEventHandler, this);
            renderer.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.item_mouseEventHandler, this);
        };

        /**
        * 项呈示器被移除
        * @method egret.ListBase#dataGroup_rendererRemoveHandler
        * @param event {RendererExistenceEvent}
        */
        ListBase.prototype.dataGroup_rendererRemoveHandler = function (event) {
            var renderer = (event.renderer);

            if (renderer == null)
                return;

            renderer.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this.item_mouseEventHandler, this);
            renderer.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.item_mouseEventHandler, this);
        };

        /**
        * 项呈示器鼠标事件
        */
        ListBase.prototype.item_mouseEventHandler = function (event) {
            var type = event.type;
            type = ListBase.TYPE_MAP[type];
            if (this.hasEventListener(type)) {
                var itemRenderer = (event.currentTarget);
                this._dispatchListEvent(event, type, itemRenderer);
            }
        };

        /**
        * 抛出列表事件
        * @method egret.ListBase#_dispatchListEvent
        * @param touchEvent {TouchEvent} 相关联的鼠标事件
        * @param type {string} 事件名称
        * @param itemRenderer {IItemRenderer} 关联的条目渲染器实例
        */
        ListBase.prototype._dispatchListEvent = function (touchEvent, type, itemRenderer) {
            var itemIndex = -1;
            if (itemRenderer)
                itemIndex = itemRenderer.itemIndex;
            else
                itemIndex = this.dataGroup.getElementIndex((touchEvent.currentTarget));

            var item = this.dataProvider.getItemAt(itemIndex);
            egret.ListEvent.dispatchListEvent(this, type, touchEvent, itemIndex, item, itemRenderer);
        };

        /**
        * 数据源发生改变
        * @method egret.ListBase#dataProvider_collectionChangeHandler
        * @param event {CollectionEvent}
        */
        ListBase.prototype.dataProvider_collectionChangeHandler = function (event) {
            var items = event.items;
            if (event.kind == egret.CollectionEventKind.ADD) {
                var length = items.length;
                for (var i = 0; i < length; i++) {
                    this.itemAdded(event.location + i);
                }
            } else if (event.kind == egret.CollectionEventKind.REMOVE) {
                length = items.length;
                for (i = length - 1; i >= 0; i--) {
                    this.itemRemoved(event.location + i);
                }
            } else if (event.kind == egret.CollectionEventKind.MOVE) {
                this.itemRemoved(event.oldLocation);
                this.itemAdded(event.location);
            } else if (event.kind == egret.CollectionEventKind.RESET) {
                if (this.dataProvider.length == 0) {
                    this._setSelectedIndex(ListBase.NO_SELECTION, false);
                } else {
                    this.dataProviderChanged = true;
                    this.invalidateProperties();
                }
            } else if (event.kind == egret.CollectionEventKind.REFRESH) {
                this._setSelectedIndex(ListBase.NO_SELECTION, false);
            }
        };
        ListBase.NO_SELECTION = -1;

        ListBase.NO_PROPOSED_SELECTION = -2;

        ListBase.CUSTOM_SELECTED_ITEM = -3;

        ListBase.TYPE_MAP = {
            rollOver: "itemRollOver",
            rollOut: "itemRollOut" };
        return ListBase;
    })(egret.SkinnableDataContainer);
    egret.ListBase = ListBase;
})(egret || (egret = {}));
