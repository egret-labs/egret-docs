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
    * @class egret.Alert
    * @classdesc
    * 弹出对话框，可能包含消息、标题、按钮（“确定”、“取消”、“是”和“否”的任意组合)。
    * @extends egret.TitleWindow
    */
    var Alert = (function (_super) {
        __extends(Alert, _super);
        /**
        * 构造函数，请通过静态方法Alert.show()来创建对象实例。
        * @method egret.Alert#constructor
        */
        function Alert() {
            _super.call(this);
            this._firstButtonLabel = "";
            this._secondButtonLabel = "";
            this._contentText = "";
            this.hostComponentKey = "egret.Alert";
        }
        /**
        * 弹出Alert控件的静态方法。在Alert控件中选择一个按钮，将关闭该控件。
        * @method egret.Alert.show
        * @param text {string} 要显示的文本内容字符串。
        * @param title {string} 对话框标题
        * @param closeHandler {Function} 按下Alert控件上的任意按钮时的回调函数。示例:closeHandler(event:CloseEvent);
        * event的detail属性包含 Alert.FIRST_BUTTON、Alert.SECOND_BUTTON和Alert.CLOSE_BUTTON。
        * @param firstButtonLabel {string} 第一个按钮上显示的文本。
        * @param secondButtonLabel {string} 第二个按钮上显示的文本，若为null，则不显示第二个按钮。
        * @param modal {boolean} 是否启用模态。即禁用弹出框以下的鼠标事件。默认true。
        * @param center {boolean} 是否居中。默认true。
        * @returns {Alert}
        */
        Alert.show = function (text, title, closeHandler, firstButtonLabel, secondButtonLabel, modal, center) {
            if (typeof text === "undefined") { text = ""; }
            if (typeof title === "undefined") { title = ""; }
            if (typeof closeHandler === "undefined") { closeHandler = null; }
            if (typeof firstButtonLabel === "undefined") { firstButtonLabel = "确定"; }
            if (typeof secondButtonLabel === "undefined") { secondButtonLabel = ""; }
            if (typeof modal === "undefined") { modal = true; }
            if (typeof center === "undefined") { center = true; }
            var alert = new Alert();
            alert.contentText = text;
            alert.title = title;
            alert._firstButtonLabel = firstButtonLabel;
            alert._secondButtonLabel = secondButtonLabel;
            alert.closeHandler = closeHandler;
            egret.PopUpManager.addPopUp(alert, modal, center);
            return alert;
        };

        Object.defineProperty(Alert.prototype, "firstButtonLabel", {
            /**
            * 第一个按钮上显示的文本
            * @member egret.Alert#firstButtonLabel
            */
            get: function () {
                return this._firstButtonLabel;
            },
            set: function (value) {
                if (this._firstButtonLabel == value)
                    return;
                this._firstButtonLabel = value;
                if (this.firstButton)
                    this.firstButton.label = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Alert.prototype, "secondButtonLabel", {
            /**
            * 第二个按钮上显示的文本
            * @member egret.Alert#secondButtonLabel
            */
            get: function () {
                return this._secondButtonLabel;
            },
            set: function (value) {
                if (this._secondButtonLabel == value)
                    return;
                this._secondButtonLabel = value;
                if (this.secondButton) {
                    if (value == null || value == "")
                        this.secondButton.includeInLayout = this.secondButton.visible = (this._secondButtonLabel != "" && this._secondButtonLabel != null);
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Alert.prototype, "contentText", {
            /**
            * 文本内容
            * @member egret.Alert#contentText
            */
            get: function () {
                return this._contentText;
            },
            set: function (value) {
                if (this._contentText == value)
                    return;
                this._contentText = value;
                if (this.contentDisplay)
                    this.contentDisplay.text = value;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 关闭事件
        */
        Alert.prototype.onClose = function (event) {
            egret.PopUpManager.removePopUp(this);
            if (this.closeHandler != null) {
                var closeEvent = new egret.CloseEvent(egret.CloseEvent.CLOSE);
                switch (event.currentTarget) {
                    case this.firstButton:
                        closeEvent.detail = Alert.FIRST_BUTTON;
                        break;
                    case this.secondButton:
                        closeEvent.detail = Alert.SECOND_BUTTON;
                        break;
                }
                this.closeHandler(closeEvent);
            }
        };

        /**
        * @method egret.Alert#closeButton_clickHandler
        * @param event {TouchEvent}
        */
        Alert.prototype.closeButton_clickHandler = function (event) {
            _super.prototype.closeButton_clickHandler.call(this, event);
            egret.PopUpManager.removePopUp(this);
            var closeEvent = new egret.CloseEvent(egret.CloseEvent.CLOSE, false, false, Alert.CLOSE_BUTTON);
            if (this.closeHandler != null)
                this.closeHandler(closeEvent);
        };

        /**
        * @method egret.Alert#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        Alert.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.contentDisplay) {
                this.contentDisplay.text = this._contentText;
            } else if (instance == this.firstButton) {
                this.firstButton.label = this._firstButtonLabel;
                this.firstButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            } else if (instance == this.secondButton) {
                this.secondButton.label = this._secondButtonLabel;
                this.secondButton.includeInLayout = this.secondButton.visible = (this._secondButtonLabel != "" && this._secondButtonLabel != null);
                this.secondButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            }
        };

        /**
        * @method egret.Alert#partRemoved
        * @param partName {string}
        * @param instance {any}
        */
        Alert.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.firstButton) {
                this.firstButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            } else if (instance == this.secondButton) {
                this.secondButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            }
        };
        Alert.FIRST_BUTTON = "firstButton";

        Alert.SECOND_BUTTON = "secondButton";

        Alert.CLOSE_BUTTON = "closeButton";
        return Alert;
    })(egret.TitleWindow);
    egret.Alert = Alert;
})(egret || (egret = {}));
