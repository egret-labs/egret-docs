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
    * @class egret.RendererExistenceEvent
    * @classdesc
    * 在DataGroup添加或删除项呈示器时分派的事件。
    * @extends egret.Event
    */
    var RendererExistenceEvent = (function (_super) {
        __extends(RendererExistenceEvent, _super);
        /**
        * @method egret.RendererExistenceEvent#constructor
        * @param type {string}
        * @param bubbles {boolean}
        * @param cancelable {boolean}
        * @param renderer {IItemRenderer}
        * @param index {number}
        * @param data {any}
        */
        function RendererExistenceEvent(type, bubbles, cancelable, renderer, index, data) {
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = false; }
            if (typeof renderer === "undefined") { renderer = null; }
            if (typeof index === "undefined") { index = -1; }
            if (typeof data === "undefined") { data = null; }
            _super.call(this, type, bubbles, cancelable);

            this.renderer = renderer;
            this.index = index;
            this.data = data;
        }
        /**
        * 使用指定的EventDispatcher对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
        * @method egret.RendererExistenceEvent.dispatchRendererExistenceEvent
        */
        RendererExistenceEvent.dispatchRendererExistenceEvent = function (target, type, renderer, index, data) {
            if (typeof renderer === "undefined") { renderer = null; }
            if (typeof index === "undefined") { index = -1; }
            if (typeof data === "undefined") { data = null; }
            var eventClass = RendererExistenceEvent;
            var props = egret.Event._getPropertyData(eventClass);
            props.renderer = renderer;
            props.index = index;
            props.data = data;
            egret.Event._dispatchByTarget(eventClass, target, type, props);
        };
        RendererExistenceEvent.RENDERER_ADD = "rendererAdd";

        RendererExistenceEvent.RENDERER_REMOVE = "rendererRemove";
        return RendererExistenceEvent;
    })(egret.Event);
    egret.RendererExistenceEvent = RendererExistenceEvent;
})(egret || (egret = {}));
