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
    * @class egret.List
    * @classdesc
    * 列表组件
    * @extends egret.ListBase
    */
    var List = (function (_super) {
        __extends(List, _super);
        /**
        * @method egret.List#constructor
        */
        function List() {
            _super.call(this);
            this._allowMultipleSelection = false;
            this._selectedIndices = [];
            /**
            * 是否捕获ItemRenderer以便在MouseUp时抛出ItemClick事件
            */
            this._captureItemRenderer = true;
            this.hostComponentKey = "egret.List";
            this.useVirtualLayout = true;
        }
        /**
        * @method egret.List#createChildren
        */
        List.prototype.createChildren = function () {
            if (!this.itemRenderer)
                this.itemRenderer = egret.DataGroup.defaultRendererFactory;
            _super.prototype.createChildren.call(this);
        };

        Object.defineProperty(List.prototype, "useVirtualLayout", {
            /**
            * 是否使用虚拟布局,默认true
            * @member egret.List#useVirtualLayout
            */
            get: function () {
                return this._getUseVirtualLayout();
            },
            /**
            * @inheritDoc
            */
            set: function (value) {
                this._setUseVirtualLayout(value);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(List.prototype, "allowMultipleSelection", {
            /**
            * 是否允许同时选中多项
            * @member egret.List#allowMultipleSelection
            */
            get: function () {
                return this._allowMultipleSelection;
            },
            set: function (value) {
                this._allowMultipleSelection = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(List.prototype, "selectedIndices", {
            /**
            * 当前选中的一个或多个项目的索引列表
            * @member egret.List#selectedIndices
            */
            get: function () {
                if (this._proposedSelectedIndices)
                    return this._proposedSelectedIndices;
                return this._selectedIndices;
            },
            set: function (value) {
                this._setSelectedIndices(value, false);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(List.prototype, "selectedIndex", {
            /**
            * @member egret.List#selectedIndex
            */
            get: function () {
                if (this._proposedSelectedIndices) {
                    if (this._proposedSelectedIndices.length > 0)
                        return this._proposedSelectedIndices[0];
                    return -1;
                }
                return this._getSelectedIndex();
            },
            set: function (value) {
                this._setSelectedIndex(value);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(List.prototype, "selectedItems", {
            /**
            * 当前选中的一个或多个项目的数据源列表
            * @member egret.List#selectedItems
            */
            get: function () {
                var result = [];
                var list = this.selectedIndices;
                if (list) {
                    var count = list.length;

                    for (var i = 0; i < count; i++)
                        result[i] = this.dataProvider.getItemAt(list[i]);
                }

                return result;
            },
            set: function (value) {
                var indices = [];

                if (value) {
                    var count = value.length;

                    for (var i = 0; i < count; i++) {
                        var index = this.dataProvider.getItemIndex(value[i]);
                        if (index != -1) {
                            indices.splice(0, 0, index);
                        }
                        if (index == -1) {
                            indices = [];
                            break;
                        }
                    }
                }
                this._setSelectedIndices(indices, false);
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 设置多个选中项
        */
        List.prototype._setSelectedIndices = function (value, dispatchChangeEvent) {
            if (typeof dispatchChangeEvent === "undefined") { dispatchChangeEvent = false; }
            if (dispatchChangeEvent)
                this._dispatchChangeAfterSelection = (this._dispatchChangeAfterSelection || dispatchChangeEvent);

            if (value)
                this._proposedSelectedIndices = value;
            else
                this._proposedSelectedIndices = [];
            this.invalidateProperties();
        };

        /**
        * @method egret.List#commitProperties
        */
        List.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this._proposedSelectedIndices) {
                this.commitSelection();
            }
        };

        /**
        * @method egret.List#commitSelection
        * @param dispatchChangedEvents {boolean}
        * @returns {boolean}
        */
        List.prototype.commitSelection = function (dispatchChangedEvents) {
            if (typeof dispatchChangedEvents === "undefined") { dispatchChangedEvents = true; }
            var oldSelectedIndex = this._selectedIndex;
            if (this._proposedSelectedIndices) {
                this._proposedSelectedIndices = this._proposedSelectedIndices.filter(this.isValidIndex);

                if (!this.allowMultipleSelection && this._proposedSelectedIndices.length > 0) {
                    var temp = [];
                    temp.push(this._proposedSelectedIndices[0]);
                    this._proposedSelectedIndices = temp;
                }
                if (this._proposedSelectedIndices.length > 0) {
                    this._proposedSelectedIndex = this._proposedSelectedIndices[0];
                } else {
                    this._proposedSelectedIndex = -1;
                }
            }

            var retVal = _super.prototype.commitSelection.call(this, false);

            if (!retVal) {
                this._proposedSelectedIndices = null;
                return false;
            }

            if (this.selectedIndex > egret.ListBase.NO_SELECTION) {
                if (this._proposedSelectedIndices) {
                    if (this._proposedSelectedIndices.indexOf(this.selectedIndex) == -1)
                        this._proposedSelectedIndices.push(this.selectedIndex);
                } else {
                    this._proposedSelectedIndices = [this.selectedIndex];
                }
            }

            if (this._proposedSelectedIndices) {
                if (this._proposedSelectedIndices.indexOf(oldSelectedIndex) != -1)
                    this.itemSelected(oldSelectedIndex, true);
                this.commitMultipleSelection();
            }

            if (dispatchChangedEvents && retVal) {
                if (this._dispatchChangeAfterSelection) {
                    egret.IndexChangeEvent.dispatchIndexChangeEvent(this, egret.IndexChangeEvent.CHANGE, oldSelectedIndex, this._selectedIndex);
                    this._dispatchChangeAfterSelection = false;
                }
                egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.VALUE_COMMIT);
            }

            return retVal;
        };

        /**
        * 是否是有效的索引
        */
        List.prototype.isValidIndex = function (item, index, v) {
            return this.dataProvider && (item >= 0) && (item < this.dataProvider.length);
        };

        /**
        * 提交多项选中项属性
        * @method egret.List#commitMultipleSelection
        */
        List.prototype.commitMultipleSelection = function () {
            var removedItems = [];
            var addedItems = [];
            var i;
            var count;

            if (this._selectedIndices.length > 0 && this._proposedSelectedIndices.length > 0) {
                count = this._proposedSelectedIndices.length;
                for (i = 0; i < count; i++) {
                    if (this._selectedIndices.indexOf(this._proposedSelectedIndices[i]) == -1)
                        addedItems.push(this._proposedSelectedIndices[i]);
                }
                count = this._selectedIndices.length;
                for (i = 0; i < count; i++) {
                    if (this._proposedSelectedIndices.indexOf(this._selectedIndices[i]) == -1)
                        removedItems.push(this._selectedIndices[i]);
                }
            } else if (this._selectedIndices.length > 0) {
                removedItems = this._selectedIndices;
            } else if (this._proposedSelectedIndices.length > 0) {
                addedItems = this._proposedSelectedIndices;
            }

            this._selectedIndices = this._proposedSelectedIndices;

            if (removedItems.length > 0) {
                count = removedItems.length;
                for (i = 0; i < count; i++) {
                    this.itemSelected(removedItems[i], false);
                }
            }

            if (addedItems.length > 0) {
                count = addedItems.length;
                for (i = 0; i < count; i++) {
                    this.itemSelected(addedItems[i], true);
                }
            }

            this._proposedSelectedIndices = null;
        };

        List.prototype._isItemIndexSelected = function (index) {
            if (this._allowMultipleSelection)
                return this._selectedIndices.indexOf(index) != -1;

            return _super.prototype._isItemIndexSelected.call(this, index);
        };

        /**
        * @method egret.List#dataGroup_rendererAddHandler
        * @param event {RendererExistenceEvent}
        */
        List.prototype.dataGroup_rendererAddHandler = function (event) {
            _super.prototype.dataGroup_rendererAddHandler.call(this, event);

            var renderer = (event.renderer);
            if (renderer == null)
                return;

            renderer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.item_mouseDownHandler, this);

            //由于ItemRenderer.mouseChildren有可能不为false，在鼠标按下时会出现切换素材的情况，
            //导致target变化而无法抛出原生的click事件,所以此处监听MouseUp来抛出ItemClick事件。
            renderer.addEventListener(egret.TouchEvent.TOUCH_END, this.item_mouseUpHandler, this);
        };

        /**
        * @method egret.List#dataGroup_rendererRemoveHandler
        * @param event {RendererExistenceEvent}
        */
        List.prototype.dataGroup_rendererRemoveHandler = function (event) {
            _super.prototype.dataGroup_rendererRemoveHandler.call(this, event);

            var renderer = (event.renderer);
            if (renderer == null)
                return;

            renderer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.item_mouseDownHandler, this);
            renderer.removeEventListener(egret.TouchEvent.TOUCH_END, this.item_mouseUpHandler, this);
        };

        /**
        * 鼠标在项呈示器上按下
        * @method egret.List#item_mouseDownHandler
        * @param event {TouchEvent}
        */
        List.prototype.item_mouseDownHandler = function (event) {
            if (event.isDefaultPrevented())
                return;

            var itemRenderer = (event.currentTarget);
            var newIndex;
            if (itemRenderer)
                newIndex = itemRenderer.itemIndex;
            else
                newIndex = this.dataGroup.getElementIndex((event.currentTarget));
            if (this._allowMultipleSelection) {
                this._setSelectedIndices(this.calculateSelectedIndices(newIndex, event.shiftKey, event.ctrlKey), true);
            } else {
                this._setSelectedIndex(newIndex, true);
            }
            if (!this._captureItemRenderer)
                return;
            this.mouseDownItemRenderer = itemRenderer;
            egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            egret.UIGlobals.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
        };

        /**
        * 计算当前的选中项列表
        */
        List.prototype.calculateSelectedIndices = function (index, shiftKey, ctrlKey) {
            var i;
            var interval = [];
            if (!shiftKey) {
                if (ctrlKey) {
                    if (this._selectedIndices.length > 0) {
                        if (this._selectedIndices.length == 1 && (this._selectedIndices[0] == index)) {
                            if (!this.requireSelection)
                                return interval;

                            interval.splice(0, 0, this._selectedIndices[0]);
                            return interval;
                        } else {
                            var found = false;
                            for (i = 0; i < this._selectedIndices.length; i++) {
                                if (this._selectedIndices[i] == index)
                                    found = true;
                                else if (this._selectedIndices[i] != index)
                                    interval.splice(0, 0, this._selectedIndices[i]);
                            }
                            if (!found) {
                                interval.splice(0, 0, index);
                            }
                            return interval;
                        }
                    } else {
                        interval.splice(0, 0, index);
                        return interval;
                    }
                } else {
                    interval.splice(0, 0, index);
                    return interval;
                }
            } else {
                var start = this._selectedIndices.length > 0 ? this._selectedIndices[this._selectedIndices.length - 1] : 0;
                var end = index;
                if (start < end) {
                    for (i = start; i <= end; i++) {
                        interval.splice(0, 0, i);
                    }
                } else {
                    for (i = start; i >= end; i--) {
                        interval.splice(0, 0, i);
                    }
                }
                return interval;
            }
        };

        /**
        * 鼠标在项呈示器上弹起，抛出ItemClick事件。
        */
        List.prototype.item_mouseUpHandler = function (event) {
            var itemRenderer = (event.currentTarget);
            if (itemRenderer != this.mouseDownItemRenderer)
                return;
            this._dispatchListEvent(event, egret.ListEvent.ITEM_CLICK, itemRenderer);
        };

        /**
        * 鼠标在舞台上弹起
        */
        List.prototype.stage_mouseUpHandler = function (event) {
            egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            egret.UIGlobals.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
            this.mouseDownItemRenderer = null;
        };
        return List;
    })(egret.ListBase);
    egret.List = List;
})(egret || (egret = {}));
