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
    * @class egret.TitleWindow
    * @classdesc
    * 可移动窗口组件。注意，此窗口必须使用PopUpManager.addPopUp()弹出之后才能移动。
    * @extends egret.Panel
    */
    var TitleWindow = (function (_super) {
        __extends(TitleWindow, _super);
        /**
        * @method egret.TitleWindow#constructor
        */
        function TitleWindow() {
            _super.call(this);
            this._showCloseButton = true;
            this._autoBackToStage = true;
            this.hostComponentKey = "egret.TitleWindow";
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onWindowMouseDown, this, true, 100);
        }
        /**
        * 在窗体上按下时前置窗口
        */
        TitleWindow.prototype.onWindowMouseDown = function (event) {
            if (this.enabled && this.isPopUp && event.target != this.closeButton) {
                egret.PopUpManager.bringToFront(this);
            }
        };

        Object.defineProperty(TitleWindow.prototype, "showCloseButton", {
            /**
            * 是否显示关闭按钮,默认true。
            * @member egret.TitleWindow#showCloseButton
            */
            get: function () {
                return this._showCloseButton;
            },
            set: function (value) {
                if (this._showCloseButton == value)
                    return;
                this._showCloseButton = value;
                if (this.closeButton)
                    this.closeButton.visible = this._showCloseButton;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TitleWindow.prototype, "autoBackToStage", {
            /**
            * 在拖拽窗口时，有可能把窗口完全拖出屏幕外，导致无法点中moveArea而不能拖回屏幕。
            * 此属性为true时，将会在拖拽结束时，自动调整窗口位置，使moveArea可以被再次点中。
            * 反之不调整。默认值为true。
            * @member egret.TitleWindow#autoBackToStage
            */
            get: function () {
                return this._autoBackToStage;
            },
            set: function (value) {
                this._autoBackToStage = value;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.TitleWindow#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        TitleWindow.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);

            if (instance == this.moveArea) {
                this.moveArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.moveArea_mouseDownHandler, this);
            } else if (instance == this.closeButton) {
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButton_clickHandler, this);
                this.closeButton.visible = this._showCloseButton;
            }
        };

        /**
        * @method egret.TitleWindow#partRemoved
        * @param partName {string}
        * @param instance {any}
        */
        TitleWindow.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);

            if (instance == this.moveArea)
                this.moveArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.moveArea_mouseDownHandler, this);
            else if (instance == this.closeButton)
                this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButton_clickHandler, this);
        };

        /**
        * @method egret.TitleWindow#closeButton_clickHandler
        * @param event {TouchEvent}
        */
        TitleWindow.prototype.closeButton_clickHandler = function (event) {
            egret.CloseEvent.dispatchCloseEvent(this, egret.CloseEvent.CLOSE);
        };

        /**
        * 鼠标在可移动区域按下
        * @method egret.TitleWindow#moveArea_mouseDownHandler
        * @param event {TouchEvent}
        */
        TitleWindow.prototype.moveArea_mouseDownHandler = function (event) {
            if (this.enabled && this.isPopUp) {
                var offsetPoint = this.globalToLocal(event.stageX, event.stageY, egret.Point.identity);
                this._offsetPointX = offsetPoint.x;
                this._offsetPointY = offsetPoint.y;
                this._includeInLayout = false;
                egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveArea_mouseMoveHandler, this);
                egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.moveArea_mouseUpHandler, this);
                egret.UIGlobals.stage.addEventListener(egret.Event.LEAVE_STAGE, this.moveArea_mouseUpHandler, this);
            }
        };

        /**
        * 鼠标拖拽时的移动事件
        * @method egret.TitleWindow#moveArea_mouseMoveHandler
        * @param event {TouchEvent}
        */
        TitleWindow.prototype.moveArea_mouseMoveHandler = function (event) {
            var pos = this.globalToLocal(event.stageX, event.stageY, egret.Point.identity);
            this.x += pos.x - this._offsetPointX;
            this.y += pos.y - this._offsetPointY;
        };

        /**
        * 鼠标在舞台上弹起事件
        * @method egret.TitleWindow#moveArea_mouseUpHandler
        * @param event {Event}
        */
        TitleWindow.prototype.moveArea_mouseUpHandler = function (event) {
            egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveArea_mouseMoveHandler, this);
            egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.moveArea_mouseUpHandler, this);
            egret.UIGlobals.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.moveArea_mouseUpHandler, this);
            if (this._autoBackToStage) {
                this.adjustPosForStage();
            }
            egret.LayoutUtil.adjustRelativeByXY(this);
            this.includeInLayout = true;
        };

        /**
        * 调整窗口位置，使其可以在舞台中被点中
        */
        TitleWindow.prototype.adjustPosForStage = function () {
            if (!this.moveArea || !this.stage)
                return;
            var pos = this.moveArea.localToGlobal(0, 0);
            var stageX = pos.x;
            var stageY = pos.y;
            if (pos.x + this.moveArea.width < 35) {
                stageX = 35 - this.moveArea.width;
            }
            if (pos.x > this.stage.stageWidth - 20) {
                stageX = this.stage.stageWidth - 20;
            }
            if (pos.y + this.moveArea.height < 20) {
                stageY = 20 - this.moveArea.height;
            }
            if (pos.y > this.stage.stageHeight - 20) {
                stageY = this.stage.stageHeight - 20;
            }
            this.x += stageX - pos.x;
            this.y += stageY - pos.y;
        };
        return TitleWindow;
    })(egret.Panel);
    egret.TitleWindow = TitleWindow;
})(egret || (egret = {}));
