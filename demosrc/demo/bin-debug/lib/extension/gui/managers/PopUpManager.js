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
var egret;
(function (egret) {
    /**
    * @class egret.PopUpManager
    * @classdesc
    * 窗口弹出管理器<p/>
    * 若项目需要自定义弹出框管理器，请实现IPopUpManager接口，
    * 并在项目初始化前调用Injector.mapClass("egret.IPopUpManager",YourPopUpManager)，
    * 注入自定义的弹出框管理器类。
    */
    var PopUpManager = (function () {
        /**
        * 构造函数
        * @method egret.PopUpManager#constructor
        */
        function PopUpManager() {
        }
        /**
        * 获取单例
        */
        PopUpManager.getImpl = function () {
            if (!PopUpManager._impl) {
                try  {
                    PopUpManager._impl = egret.Injector.getInstance("egret.IPopUpManager");
                } catch (e) {
                    PopUpManager._impl = new egret.PopUpManagerImpl();
                }
            }
            return PopUpManager._impl;
        };

        Object.defineProperty(PopUpManager.prototype, "modalColor", {
            /**
            * 模态遮罩的填充颜色
            * @member egret.PopUpManager#modalColor
            */
            get: function () {
                return PopUpManager.getImpl().modalColor;
            },
            set: function (value) {
                PopUpManager.getImpl().modalColor = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PopUpManager.prototype, "modalAlpha", {
            /**
            * 模态遮罩的透明度
            * @member egret.PopUpManager#modalAlpha
            */
            get: function () {
                return PopUpManager.getImpl().modalAlpha;
            },
            set: function (value) {
                PopUpManager.getImpl().modalAlpha = value;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 弹出一个窗口。<br/>
        * @method egret.PopUpManager.addPopUp
        * @param popUp {IVisualElement} 要弹出的窗口
        * @param modal {boolean} 是否启用模态。即禁用弹出窗口所在层以下的鼠标事件。默认false。
        * @param center {boolean} 是否居中窗口。等效于在外部调用centerPopUp()来居中。默认true。
        */
        PopUpManager.addPopUp = function (popUp, modal, center) {
            if (typeof modal === "undefined") { modal = false; }
            if (typeof center === "undefined") { center = true; }
            PopUpManager.getImpl().addPopUp(popUp, modal, center);
            egret.PopUpEvent.dispatchPopUpEvent(PopUpManager.getImpl(), egret.PopUpEvent.ADD_POPUP, popUp, modal);
        };

        /**
        * 移除由addPopUp()方法弹出的窗口。
        * @method egret.PopUpManager.removePopUp
        * @param popUp {IVisualElement} 要移除的窗口
        */
        PopUpManager.removePopUp = function (popUp) {
            PopUpManager.getImpl().removePopUp(popUp);
            egret.PopUpEvent.dispatchPopUpEvent(PopUpManager.getImpl(), egret.PopUpEvent.REMOVE_POPUP, popUp);
        };

        /**
        * 将指定窗口居中显示
        * @method egret.PopUpManager.centerPopUp
        * @param popUp {IVisualElement} 要居中显示的窗口
        */
        PopUpManager.centerPopUp = function (popUp) {
            PopUpManager.getImpl().centerPopUp(popUp);
        };

        /**
        * 将指定窗口的层级调至最前
        * @method egret.PopUpManager.bringToFront
        * @param popUp {IVisualElement} 要最前显示的窗口
        */
        PopUpManager.bringToFront = function (popUp) {
            PopUpManager.getImpl().bringToFront(popUp);
            egret.PopUpEvent.dispatchPopUpEvent(PopUpManager.getImpl(), egret.PopUpEvent.BRING_TO_FRONT, popUp);
        };

        Object.defineProperty(PopUpManager, "popUpList", {
            /**
            * 已经弹出的窗口列表
            * @member egret.PopUpManager.popUpList
            */
            get: function () {
                return PopUpManager.getImpl().popUpList;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 添加事件监听,参考PopUpEvent定义的常量。
        * @method egret.PopUpManager.addEventListener
        * @see org.flexlite.domUI.events.PopUpEvent
        * @param type {string}
        * @param listener {Function}
        * @param thisObject {any}
        * @param useCapture {boolean}
        * @param priority {number}
        */
        PopUpManager.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            if (typeof useCapture === "undefined") { useCapture = false; }
            if (typeof priority === "undefined") { priority = 0; }
            PopUpManager.getImpl().addEventListener(type, listener, this, useCapture, priority);
        };

        /**
        * 移除事件监听,参考PopUpEvent定义的常量。
        * @method egret.PopUpManager.removeEventListener
        * @see org.flexlite.domUI.events.PopUpEvent
        * @param type {string}
        * @param listener {Function}
        * @param thisObject {any}
        * @param useCapture {boolean}
        */
        PopUpManager.removeEventListener = function (type, listener, thisObject, useCapture) {
            if (typeof useCapture === "undefined") { useCapture = false; }
            PopUpManager.getImpl().removeEventListener(type, listener, thisObject, useCapture);
        };
        return PopUpManager;
    })();
    egret.PopUpManager = PopUpManager;
})(egret || (egret = {}));
