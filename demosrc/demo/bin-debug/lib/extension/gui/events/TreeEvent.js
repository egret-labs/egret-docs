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
    * @class egret.TreeEvent
    * @classdesc
    * Tree事件
    * @extends egret.Event
    */
    var TreeEvent = (function (_super) {
        __extends(TreeEvent, _super);
        /**
        * @method egret.TreeEvent#constructor
        * @param type {string}
        * @param bubbles {boolean}
        * @param cancelable {boolean}
        * @param itemIndex {number}
        * @param item {any}
        * @param itemRenderer {ITreeItemRenderer}
        */
        function TreeEvent(type, bubbles, cancelable, itemIndex, item, itemRenderer) {
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = true; }
            if (typeof itemIndex === "undefined") { itemIndex = -1; }
            if (typeof item === "undefined") { item = null; }
            if (typeof itemRenderer === "undefined") { itemRenderer = null; }
            _super.call(this, type, bubbles, cancelable);
            this.item = item;
            this.itemRenderer = itemRenderer;
            this.itemIndex = itemIndex;
        }
        /**
        * 使用指定的EventDispatcher对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
        * @method egret.TreeEvent.dispatchTreeEvent
        */
        TreeEvent.dispatchTreeEvent = function (target, type, itemIndex, item, itemRenderer, opening) {
            if (typeof itemIndex === "undefined") { itemIndex = -1; }
            if (typeof item === "undefined") { item = null; }
            if (typeof itemRenderer === "undefined") { itemRenderer = null; }
            if (typeof opening === "undefined") { opening = false; }
            var eventClass = TreeEvent;
            var props = egret.Event._getPropertyData(eventClass);
            props.itemIndex = itemIndex;
            props.item = item;
            props.itemRenderer = itemRenderer;
            props.opening = opening;
            egret.Event._dispatchByTarget(eventClass, target, type, props);
        };
        TreeEvent.ITEM_CLOSE = "itemClose";

        TreeEvent.ITEM_OPEN = "itemOpen";

        TreeEvent.ITEM_OPENING = "itemOpening";
        return TreeEvent;
    })(egret.Event);
    egret.TreeEvent = TreeEvent;
})(egret || (egret = {}));
