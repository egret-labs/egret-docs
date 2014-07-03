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
    * @class egret.ListEvent
    * @classdesc
    * 列表事件
    * @extends egret.TouchEvent
    */
    var ListEvent = (function (_super) {
        __extends(ListEvent, _super);
        /**
        * @method egret.ListEvent#constructor
        * @param type {string}
        * @param bubbles {boolean}
        * @param cancelable {boolean}
        * @param touchPointID {number}
        * @param stageX {number}
        * @param stageY {number}
        * @param ctrlKey {boolean}
        * @param altKey {boolean}
        * @param shiftKey {boolean}
        * @param buttonDown {boolean}
        * @param itemIndex {number}
        * @param item {any}
        * @param itemRenderer {IItemRenderer}
        */
        function ListEvent(type, bubbles, cancelable, touchPointID, stageX, stageY, ctrlKey, altKey, shiftKey, buttonDown, itemIndex, item, itemRenderer) {
            if (typeof bubbles === "undefined") { bubbles = true; }
            if (typeof cancelable === "undefined") { cancelable = true; }
            if (typeof touchPointID === "undefined") { touchPointID = 0; }
            if (typeof stageX === "undefined") { stageX = 0; }
            if (typeof stageY === "undefined") { stageY = 0; }
            if (typeof ctrlKey === "undefined") { ctrlKey = false; }
            if (typeof altKey === "undefined") { altKey = false; }
            if (typeof shiftKey === "undefined") { shiftKey = false; }
            if (typeof buttonDown === "undefined") { buttonDown = false; }
            if (typeof itemIndex === "undefined") { itemIndex = -1; }
            if (typeof item === "undefined") { item = null; }
            if (typeof itemRenderer === "undefined") { itemRenderer = null; }
            _super.call(this, type, bubbles, cancelable, touchPointID, stageX, stageY, ctrlKey, altKey, shiftKey, buttonDown);

            this.itemIndex = itemIndex;
            this.item = item;
            this.itemRenderer = itemRenderer;
        }
        /**
        * 使用指定的EventDispatcher对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
        * @method egret.ListEvent.dispatchListEvent
        */
        ListEvent.dispatchListEvent = function (target, type, touchEvent, itemIndex, item, itemRenderer) {
            if (typeof touchEvent === "undefined") { touchEvent = null; }
            if (typeof itemIndex === "undefined") { itemIndex = -1; }
            if (typeof item === "undefined") { item = null; }
            if (typeof itemRenderer === "undefined") { itemRenderer = null; }
            var eventClass = ListEvent;
            var props = egret.Event._getPropertyData(eventClass);
            props.touchPointID = touchEvent.touchPointID;
            props._stageX = touchEvent.stageX;
            props._stageY = touchEvent.stageY;
            props.ctrlKey = touchEvent.ctrlKey;
            props.altKey = touchEvent.altKey;
            props.shiftKey = touchEvent.shiftKey;
            props.touchDown = touchEvent.touchDown;
            props.itemIndex = itemIndex;
            props.item = item;
            props.itemRenderer = itemRenderer;
            egret.Event._dispatchByTarget(eventClass, target, type, props);
        };
        ListEvent.ITEM_ROLL_OUT = "itemRollOut";

        ListEvent.ITEM_ROLL_OVER = "itemRollOver";

        ListEvent.ITEM_CLICK = "itemClick";
        return ListEvent;
    })(egret.TouchEvent);
    egret.ListEvent = ListEvent;
})(egret || (egret = {}));
