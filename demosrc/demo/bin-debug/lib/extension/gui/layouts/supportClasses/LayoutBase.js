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
    * @class egret.LayoutBase
    * @classdesc
    * 容器布局基类
    * @extends egret.EventDispatcher
    */
    var LayoutBase = (function (_super) {
        __extends(LayoutBase, _super);
        /**
        * @method egret.LayoutBase#constructor
        */
        function LayoutBase() {
            _super.call(this);
            this._useVirtualLayout = false;
        }
        Object.defineProperty(LayoutBase.prototype, "target", {
            /**
            * 目标容器
            * @member egret.LayoutBase#target
            */
            get: function () {
                return this._target;
            },
            set: function (value) {
                if (this._target == value)
                    return;
                this._target = value;
                this.clearVirtualLayoutCache();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(LayoutBase.prototype, "useVirtualLayout", {
            /**
            * 若要配置容器使用虚拟布局，请为与容器关联的布局的 useVirtualLayout 属性设置为 true。
            * 只有布局设置为 VerticalLayout、HorizontalLayout
            * 或 TileLayout 的 DataGroup 或 SkinnableDataContainer
            * 才支持虚拟布局。不支持虚拟化的布局子类必须禁止更改此属性。
            * @member egret.LayoutBase#useVirtualLayout
            */
            get: function () {
                return this._useVirtualLayout;
            },
            set: function (value) {
                if (this._useVirtualLayout == value)
                    return;

                this._useVirtualLayout = value;
                this.dispatchEventWith("useVirtualLayoutChanged");

                if (this._useVirtualLayout && !value)
                    this.clearVirtualLayoutCache();
                if (this.target)
                    this.target.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(LayoutBase.prototype, "typicalLayoutRect", {
            /**
            * 由虚拟布局所使用，以估计尚未滚动到视图中的布局元素的大小。
            * @member egret.LayoutBase#typicalLayoutRect
            */
            get: function () {
                return this._typicalLayoutRect;
            },
            set: function (value) {
                if (this._typicalLayoutRect == value)
                    return;
                this._typicalLayoutRect = value;
                if (this.target)
                    this.target.invalidateSize();
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 滚动条位置改变
        * @method egret.LayoutBase#scrollPositionChanged
        */
        LayoutBase.prototype.scrollPositionChanged = function () {
        };

        /**
        * 清理虚拟布局缓存的数据
        * @method egret.LayoutBase#clearVirtualLayoutCache
        */
        LayoutBase.prototype.clearVirtualLayoutCache = function () {
        };

        /**
        * 在已添加布局元素之后且在验证目标的大小和显示列表之前，由目标调用。
        * 按元素状态缓存的布局（比如虚拟布局）可以覆盖此方法以更新其缓存。
        * @method egret.LayoutBase#elementAdded
        * @param index {number}
        */
        LayoutBase.prototype.elementAdded = function (index) {
        };

        /**
        * 必须在已删除布局元素之后且在验证目标的大小和显示列表之前，由目标调用此方法。
        * 按元素状态缓存的布局（比如虚拟布局）可以覆盖此方法以更新其缓存。
        * @method egret.LayoutBase#elementRemoved
        * @param index {number}
        */
        LayoutBase.prototype.elementRemoved = function (index) {
        };

        /**
        * 测量组件尺寸大小
        * @method egret.LayoutBase#measure
        */
        LayoutBase.prototype.measure = function () {
        };

        /**
        * 更新显示列表
        * @method egret.LayoutBase#updateDisplayList
        * @param width {number}
        * @param height {number}
        */
        LayoutBase.prototype.updateDisplayList = function (width, height) {
        };
        return LayoutBase;
    })(egret.EventDispatcher);
    egret.LayoutBase = LayoutBase;
})(egret || (egret = {}));
