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
    * @class egret.ElementExistenceEvent
    * @classdesc
    * Group添加或移除元素时分派的事件。
    * @extends egret.Event
    */
    var ElementExistenceEvent = (function (_super) {
        __extends(ElementExistenceEvent, _super);
        /**
        * @member egret.ElementExistenceEvent#constructor
        */
        function ElementExistenceEvent(type, bubbles, cancelable, element, index) {
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = false; }
            if (typeof element === "undefined") { element = null; }
            if (typeof index === "undefined") { index = -1; }
            _super.call(this, type, bubbles, cancelable);

            this.element = element;
            this.index = index;
        }
        /**
        * 使用指定的EventDispatcher对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
        * @method egret.ElementExistenceEvent.dispatchElementExistenceEvent
        */
        ElementExistenceEvent.dispatchElementExistenceEvent = function (target, type, element, index) {
            if (typeof element === "undefined") { element = null; }
            if (typeof index === "undefined") { index = -1; }
            var eventClass = ElementExistenceEvent;
            var props = egret.Event._getPropertyData(eventClass);
            props.element = element;
            props.index = index;
            egret.Event._dispatchByTarget(eventClass, target, type, props);
        };
        ElementExistenceEvent.ELEMENT_ADD = "elementAdd";

        ElementExistenceEvent.ELEMENT_REMOVE = "elementRemove";
        return ElementExistenceEvent;
    })(egret.Event);
    egret.ElementExistenceEvent = ElementExistenceEvent;
})(egret || (egret = {}));
