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
    * @class egret.PopUpManagerImpl
    * @classdesc
    * 窗口弹出管理器实现类
    * @extends egret.EventDispatcher
    * @implements egret.IPopUpManager
    */
    var PopUpManagerImpl = (function (_super) {
        __extends(PopUpManagerImpl, _super);
        /**
        * 构造函数
        * @method egret.PopUpManagerImpl#constructor
        */
        function PopUpManagerImpl() {
            _super.call(this);
            this._popUpList = [];
            /**
            * 模态窗口列表
            */
            this.popUpDataList = [];
            this._modalColor = 0x000000;
            this._modalAlpha = 0.5;
            this.invalidateModalFlag = false;
        }
        Object.defineProperty(PopUpManagerImpl.prototype, "popUpList", {
            /**
            * 已经弹出的窗口列表
            * @member egret.PopUpManagerImpl#popUpList
            */
            get: function () {
                return this._popUpList.concat();
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 根据popUp获取对应的popUpData
        */
        PopUpManagerImpl.prototype.findPopUpData = function (popUp) {
            var list = this.popUpDataList;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var data = list[i];
                if (data.popUp == popUp)
                    return data;
            }
            return null;
        };

        /**
        * 弹出一个窗口。<br/>
        * @method egret.PopUpManagerImpl#addPopUp
        * @param popUp {IVisualElement} 要弹出的窗口
        * @param modal {boolean} 是否启用模态。即禁用弹出窗口所在层以下的鼠标事件。默认false。
        * @param center {boolean} 是否居中窗口。等效于在外部调用centerPopUp()来居中。默认true。
        */
        PopUpManagerImpl.prototype.addPopUp = function (popUp, modal, center) {
            if (typeof modal === "undefined") { modal = false; }
            if (typeof center === "undefined") { center = true; }
            var uiStage = egret.UIGlobals.uiStage;
            var data = this.findPopUpData(popUp);
            if (data) {
                data.modal = modal;
                popUp.removeEventListener(PopUpManagerImpl.REMOVE_FROM_UISTAGE, this.onRemoved, this);
            } else {
                data = new PopUpData(popUp, modal);
                this.popUpDataList.push(data);
                this._popUpList.push(popUp);
            }
            uiStage.popUpContainer.addElement(popUp);
            if (center)
                this.centerPopUp(popUp);
            if ("isPopUp" in popUp)
                popUp.isPopUp = true;
            if (modal) {
                this.invalidateModal();
            }
            popUp.addEventListener(PopUpManagerImpl.REMOVE_FROM_UISTAGE, this.onRemoved, this);
        };

        /**
        * 从舞台移除
        */
        PopUpManagerImpl.prototype.onRemoved = function (event) {
            var index = 0;
            var list = this.popUpDataList;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var data = list[i];
                if (data.popUp == event.target) {
                    if ("isPopUp" in data.popUp)
                        (data.popUp).isPopUp = false;
                    data.popUp.removeEventListener(PopUpManagerImpl.REMOVE_FROM_UISTAGE, this.onRemoved, this);
                    this.popUpDataList.splice(index, 1);
                    this._popUpList.splice(index, 1);
                    this.invalidateModal();
                    break;
                }
                index++;
            }
        };

        Object.defineProperty(PopUpManagerImpl.prototype, "modalColor", {
            /**
            * 模态遮罩的填充颜色
            * @member egret.PopUpManagerImpl#modalColor
            */
            get: function () {
                return this._modalColor;
            },
            set: function (value) {
                if (this._modalColor == value)
                    return;
                this._modalColor = value;
                this.invalidateModal();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PopUpManagerImpl.prototype, "modalAlpha", {
            /**
            * 模态遮罩的透明度
            * @member egret.PopUpManagerImpl#modalAlpha
            */
            get: function () {
                return this._modalAlpha;
            },
            set: function (value) {
                if (this._modalAlpha == value)
                    return;
                this._modalAlpha = value;
                this.invalidateModal();
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 标记一个UIStage的模态层失效
        */
        PopUpManagerImpl.prototype.invalidateModal = function () {
            if (!this.invalidateModalFlag) {
                this.invalidateModalFlag = true;
                egret.UIGlobals.stage.addEventListener(egret.Event.ENTER_FRAME, this.validateModal, this);
                egret.UIGlobals.stage.addEventListener(egret.Event.RENDER, this.validateModal, this);
                egret.UIGlobals.stage.invalidate();
            }
        };

        PopUpManagerImpl.prototype.validateModal = function (event) {
            this.invalidateModalFlag = false;
            egret.UIGlobals.stage.removeEventListener(egret.Event.ENTER_FRAME, this.validateModal, this);
            egret.UIGlobals.stage.removeEventListener(egret.Event.RENDER, this.validateModal, this);
            this.updateModal(egret.UIGlobals.uiStage);
        };

        /**
        * 更新窗口模态效果
        */
        PopUpManagerImpl.prototype.updateModal = function (uiStage) {
            var popUpContainer = uiStage.popUpContainer;
            var found = false;
            for (var i = popUpContainer.numElements - 1; i >= 0; i--) {
                var element = popUpContainer.getElementAt(i);
                var data = this.findPopUpData(element);
                if (data && data.modal) {
                    found = true;
                    break;
                }
            }
            if (found) {
                if (!this.modalMask) {
                    this.modalMask = new egret.Rect();
                    this.modalMask.touchEnabled = true;
                    this.modalMask.top = this.modalMask.left = this.modalMask.right = this.modalMask.bottom = 0;
                }
                this.modalMask.fillColor = this._modalColor;
                this.modalMask.alpha = this._modalAlpha;
                if (this.modalMask.parent == uiStage) {
                    if (popUpContainer.getElementIndex(this.modalMask) < i)
                        i--;
                    popUpContainer.setElementIndex(this.modalMask, i);
                } else {
                    popUpContainer.addElementAt(this.modalMask, i);
                }
            } else if (this.modalMask && this.modalMask.parent == uiStage) {
                popUpContainer.removeElement(this.modalMask);
            }
        };

        /**
        * 移除由addPopUp()方法弹出的窗口。
        * @method egret.PopUpManagerImpl#removePopUp
        * @param popUp {IVisualElement} 要移除的窗口
        */
        PopUpManagerImpl.prototype.removePopUp = function (popUp) {
            if (popUp && popUp.parent && this.findPopUpData(popUp)) {
                if ("removeElement" in popUp.parent)
                    (popUp.parent).removeElement(popUp);
                else if (popUp.parent instanceof egret.UIComponent)
                    (popUp.parent)._removeFromDisplayList(popUp);
                else if (popUp instanceof egret.DisplayObject)
                    popUp.parent.removeChild(popUp);
            }
        };

        /**
        * 将指定窗口居中显示
        * @method egret.PopUpManagerImpl#centerPopUp
        * @param popUp {IVisualElement} 要居中显示的窗口
        */
        PopUpManagerImpl.prototype.centerPopUp = function (popUp) {
            popUp.top = popUp.bottom = popUp.left = popUp.right = NaN;
            popUp.verticalCenter = popUp.horizontalCenter = 0;
            var parent = popUp.parent;
            if (parent) {
                if ("validateNow" in popUp)
                    popUp.validateNow();
                popUp.x = (parent.width - popUp.layoutBoundsWidth) * 0.5;
                popUp.y = (parent.height - popUp.layoutBoundsHeight) * 0.5;
            }
        };

        /**
        * 将指定窗口的层级调至最前
        * @method egret.PopUpManagerImpl#bringToFront
        * @param popUp {IVisualElement} 要最前显示的窗口
        */
        PopUpManagerImpl.prototype.bringToFront = function (popUp) {
            var data = this.findPopUpData(popUp);
            if (data && popUp.parent && "popUpContainer" in popUp.parent) {
                var uiStage = (popUp.parent);
                uiStage.popUpContainer.setElementIndex(popUp, uiStage.popUpContainer.numElements - 1);
                this.invalidateModal();
            }
        };
        PopUpManagerImpl.REMOVE_FROM_UISTAGE = "removeFromUIStage";
        return PopUpManagerImpl;
    })(egret.EventDispatcher);
    egret.PopUpManagerImpl = PopUpManagerImpl;

    var PopUpData = (function () {
        /**
        * @method egret.PopUpData#constructor
        * @param popUp {IVisualElement}
        * @param modal {boolea}
        */
        function PopUpData(popUp, modal) {
            this.popUp = popUp;
            this.modal = modal;
        }
        return PopUpData;
    })();
})(egret || (egret = {}));
