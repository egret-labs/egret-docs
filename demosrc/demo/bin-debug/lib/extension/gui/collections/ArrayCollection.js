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
    * @class egret.ArrayCollection
    * @classdesc
    * 数组的集合类数据结构包装器
    * 通常作为列表组件的数据源，使用这种数据结构包装普通数组，
    * 能在数据源发生改变的时候主动通知视图刷新变更的数据项
    * @extends egret.EventDispatcher
    * @implements egret.ICollection
    */
    var ArrayCollection = (function (_super) {
        __extends(ArrayCollection, _super);
        /**
        * 构造函数
        * @method egret.ArrayCollection#constructor
        * @param source {Array<any>} 数据源
        */
        function ArrayCollection(source) {
            if (typeof source === "undefined") { source = null; }
            _super.call(this);
            if (source) {
                this._source = source;
            } else {
                this._source = [];
            }
        }
        Object.defineProperty(ArrayCollection.prototype, "source", {
            /**
            * 数据源
            * 通常情况下请不要直接调用Array的方法操作数据源，否则对应的视图无法收到数据改变的通知。
            * 若对数据源进行了排序或过滤等操作，请手动调用refresh()方法刷新数据。<br/>
            * @member egret.ArrayCollection#source
            */
            get: function () {
                return this._source;
            },
            set: function (value) {
                if (!value)
                    value = [];
                this._source = value;
                this.dispatchCoEvent(egret.CollectionEventKind.RESET);
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 在对数据源进行排序或过滤操作后可以手动调用此方法刷新所有数据,以更新视图。
        * @method egret.ArrayCollection#refresh
        */
        ArrayCollection.prototype.refresh = function () {
            this.dispatchCoEvent(egret.CollectionEventKind.REFRESH);
        };

        /**
        * 是否包含某项数据
        * @method egret.ArrayCollection#contains
        * @param item {any}
        * @returns {boolean}
        */
        ArrayCollection.prototype.contains = function (item) {
            return this.getItemIndex(item) != -1;
        };

        /**
        * 检测索引是否超出范围
        */
        ArrayCollection.prototype.checkIndex = function (index) {
            if (index < 0 || index >= this._source.length) {
                throw new RangeError("索引:\"" + index + "\"超出集合元素索引范围");
            }
        };

        Object.defineProperty(ArrayCollection.prototype, "length", {
            //--------------------------------------------------------------------------
            //
            // ICollection接口实现方法
            //
            //--------------------------------------------------------------------------
            /**
            * @member egret.ArrayCollection#length
            */
            get: function () {
                return this._source.length;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 向列表末尾添加指定项目。等效于 addItemAt(item, length)。
        * @method egret.ArrayCollection#addItem
        * @param item {any}
        */
        ArrayCollection.prototype.addItem = function (item) {
            this._source.push(item);
            this.dispatchCoEvent(egret.CollectionEventKind.ADD, this._source.length - 1, -1, [item]);
        };

        /**
        * 在指定的索引处添加项目。
        * 任何大于已添加项目的索引的项目索引都会增加 1。
        * @method egret.ArrayCollection#addItemAt
        * @throws RangeError 如果索引小于 0 或大于长度。
        * @param item {any}
        * @param index {number}
        */
        ArrayCollection.prototype.addItemAt = function (item, index) {
            if (index < 0 || index > this._source.length) {
                throw new RangeError("索引:\"" + index + "\"超出集合元素索引范围");
            }
            this._source.splice(index, 0, item);
            this.dispatchCoEvent(egret.CollectionEventKind.ADD, index, -1, [item]);
        };

        /**
        * @method egret.ArrayCollection#getItemAt
        * @param index {number}
        * @returns {any}
        */
        ArrayCollection.prototype.getItemAt = function (index) {
            return this._source[index];
        };

        /**
        * @method egret.ArrayCollection#getItemIndex
        * @param item {any}
        * @returns {number}
        */
        ArrayCollection.prototype.getItemIndex = function (item) {
            var length = this._source.length;
            for (var i = 0; i < length; i++) {
                if (this._source[i] === item) {
                    return i;
                }
            }
            return -1;
        };

        /**
        * 通知视图，某个项目的属性已更新。
        * @method egret.ArrayCollection#itemUpdated
        * @param item {any}
        */
        ArrayCollection.prototype.itemUpdated = function (item) {
            var index = this.getItemIndex(item);
            if (index != -1) {
                this.dispatchCoEvent(egret.CollectionEventKind.UPDATE, index, -1, [item]);
            }
        };

        /**
        * 删除列表中的所有项目。
        * @method egret.ArrayCollection#removeAll
        */
        ArrayCollection.prototype.removeAll = function () {
            var items = this._source.concat();
            this._source.length = 0;
            this.dispatchCoEvent(egret.CollectionEventKind.REMOVE, 0, -1, items);
        };

        /**
        * 删除指定索引处的项目并返回该项目。原先位于此索引之后的所有项目的索引现在都向前移动一个位置。
        * @method egret.ArrayCollection#removeItemAt
        * @throws RangeError 如果索引小于 0 或大于长度。
        * @param index {number}
        * @returns {any}
        */
        ArrayCollection.prototype.removeItemAt = function (index) {
            this.checkIndex(index);
            var item = this._source.splice(index, 1)[0];
            this.dispatchCoEvent(egret.CollectionEventKind.REMOVE, index, -1, [item]);
            return item;
        };

        /**
        * 替换在指定索引处的项目，并返回该项目。
        * @method egret.ArrayCollection#replaceItemAt
        * @throws RangeError 如果索引小于 0 或大于长度。
        * @param item {any}
        * @param index {number}
        * @returns {any}
        */
        ArrayCollection.prototype.replaceItemAt = function (item, index) {
            this.checkIndex(index);
            var oldItem = this._source.splice(index, 1, item)[0];
            this.dispatchCoEvent(egret.CollectionEventKind.REPLACE, index, -1, [item], [oldItem]);
            return oldItem;
        };

        /**
        * 用新数据源替换原始数据源，此方法与直接设置source不同，它不会导致目标视图重置滚动位置。
        * @method egret.ArrayCollection#replaceAll
        * @param newSource {Array<any>} 新的数据源
        */
        ArrayCollection.prototype.replaceAll = function (newSource) {
            if (!newSource)
                newSource = [];
            var newLength = newSource.length;
            var oldLenght = this._source.length;
            for (var i = newLength; i < oldLenght; i++) {
                this.removeItemAt(newLength);
            }
            for (i = 0; i < newLength; i++) {
                if (i >= oldLenght)
                    this.addItemAt(newSource[i], i);
                else
                    this.replaceItemAt(newSource[i], i);
            }
            this._source = newSource;
        };

        /**
        * 移动一个项目
        * 在oldIndex和newIndex之间的项目，
        * 若oldIndex小于newIndex,索引会减1
        * 若oldIndex大于newIndex,索引会加1
        * @method egret.ArrayCollection#moveItemAt
        * @param oldIndex {number}
        * @param newIndex {number}
        * @returns {any}
        * @throws RangeError 如果索引小于 0 或大于长度。
        */
        ArrayCollection.prototype.moveItemAt = function (oldIndex, newIndex) {
            this.checkIndex(oldIndex);
            this.checkIndex(newIndex);
            var item = this._source.splice(oldIndex, 1)[0];
            this._source.splice(newIndex, 0, item);
            this.dispatchCoEvent(egret.CollectionEventKind.MOVE, newIndex, oldIndex, [item]);
            return item;
        };

        /**
        * 抛出事件
        */
        ArrayCollection.prototype.dispatchCoEvent = function (kind, location, oldLocation, items, oldItems) {
            if (typeof kind === "undefined") { kind = null; }
            if (typeof location === "undefined") { location = -1; }
            if (typeof oldLocation === "undefined") { oldLocation = -1; }
            if (typeof items === "undefined") { items = null; }
            if (typeof oldItems === "undefined") { oldItems = null; }
            egret.CollectionEvent.dispatchCollectionEvent(this, egret.CollectionEvent.COLLECTION_CHANGE, kind, location, oldLocation, items, oldItems);
        };
        return ArrayCollection;
    })(egret.EventDispatcher);
    egret.ArrayCollection = ArrayCollection;
})(egret || (egret = {}));
