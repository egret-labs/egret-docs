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
    * @class egret.DropDownController
    * @classdesc
    * 用于处理因用户交互而打开和关闭下拉列表的操作的控制器
    * @extends egret.EventDispatcher
    */
    var DropDownController = (function (_super) {
        __extends(DropDownController, _super);
        /**
        * 构造函数
        * @method egret.DropDownController#constructor
        */
        function DropDownController() {
            _super.call(this);
            this._isOpen = false;
            this._closeOnResize = true;
            this._rollOverOpenDelay = NaN;
        }
        Object.defineProperty(DropDownController.prototype, "openButton", {
            /**
            * 下拉按钮实例
            * @member egret.DropDownController#openButton
            */
            get: function () {
                return this._openButton;
            },
            set: function (value) {
                if (this._openButton === value)
                    return;
                this.removeOpenTriggers();
                this._openButton = value;
                this.addOpenTriggers();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DropDownController.prototype, "dropDown", {
            /**
            * 下拉区域显示对象
            * @member egret.DropDownController#dropDown
            */
            get: function () {
                return this._dropDown;
            },
            set: function (value) {
                if (this._dropDown === value)
                    return;

                this._dropDown = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DropDownController.prototype, "isOpen", {
            /**
            * 下拉列表已经打开的标志
            * @member egret.DropDownController#isOpen
            */
            get: function () {
                return this._isOpen;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DropDownController.prototype, "closeOnResize", {
            /**
            * 如果为 true，则在调整舞台大小时会关闭下拉列表。
            * @member egret.DropDownController#closeOnResize
            */
            get: function () {
                return this._closeOnResize;
            },
            set: function (value) {
                if (this._closeOnResize == value)
                    return;
                if (this.isOpen)
                    this.removeCloseOnResizeTrigger();

                this._closeOnResize = value;

                this.addCloseOnResizeTrigger();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DropDownController.prototype, "rollOverOpenDelay", {
            /**
            * 指定滑过锚点按钮时打开下拉列表要等待的延迟（以毫秒为单位）。
            * 如果设置为 NaN，则下拉列表会在单击时打开，而不是在滑过时打开。默认值NaN
            * @member egret.DropDownController#rollOverOpenDelay
            */
            get: function () {
                return this._rollOverOpenDelay;
            },
            set: function (value) {
                if (this._rollOverOpenDelay == value)
                    return;

                this.removeOpenTriggers();

                this._rollOverOpenDelay = value;

                this.addOpenTriggers();
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 添加触发下拉列表打开的事件监听
        */
        DropDownController.prototype.addOpenTriggers = function () {
            if (this.openButton) {
                if (isNaN(this.rollOverOpenDelay))
                    this.openButton.addEventListener(egret.UIEvent.BUTTON_DOWN, this._openButton_buttonDownHandler, this);
                else
                    this.openButton.addEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this._openButton_rollOverHandler, this);
            }
        };

        /**
        * 移除触发下拉列表打开的事件监听
        */
        DropDownController.prototype.removeOpenTriggers = function () {
            if (this.openButton) {
                if (isNaN(this.rollOverOpenDelay))
                    this.openButton.removeEventListener(egret.UIEvent.BUTTON_DOWN, this._openButton_buttonDownHandler, this);
                else
                    this.openButton.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this._openButton_rollOverHandler, this);
            }
        };

        /**
        * 添加触发下拉列表关闭的事件监听
        */
        DropDownController.prototype.addCloseTriggers = function () {
            if (egret.UIGlobals.stage) {
                if (isNaN(this.rollOverOpenDelay)) {
                    egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stage_mouseDownHandler, this);
                    egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler_noRollOverOpenDelay, this);
                } else {
                    egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
                }

                this.addCloseOnResizeTrigger();
            }
        };

        /**
        * 移除触发下拉列表关闭的事件监听
        */
        DropDownController.prototype.removeCloseTriggers = function () {
            if (egret.UIGlobals.stage) {
                if (isNaN(this.rollOverOpenDelay)) {
                    egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stage_mouseDownHandler, this);
                    egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler_noRollOverOpenDelay, this);
                } else {
                    egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
                    egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
                    egret.UIGlobals.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
                }

                this.removeCloseOnResizeTrigger();
            }
        };

        /**
        * 添加舞台尺寸改变的事件监听
        */
        DropDownController.prototype.addCloseOnResizeTrigger = function () {
            if (this.closeOnResize)
                egret.UIGlobals.stage.addEventListener(egret.Event.RESIZE, this.stage_resizeHandler, this);
        };

        /**
        * 移除舞台尺寸改变的事件监听
        */
        DropDownController.prototype.removeCloseOnResizeTrigger = function () {
            if (this.closeOnResize)
                egret.UIGlobals.stage.removeEventListener(egret.Event.RESIZE, this.stage_resizeHandler, this);
        };

        /**
        * 检查鼠标是否在DropDown或者openButton区域内。
        */
        DropDownController.prototype.isTargetOverDropDownOrOpenButton = function (target) {
            if (target) {
                if (this.openButton && this.openButton.contains(target))
                    return true;
                if (this.hitAreaAdditions != null) {
                    for (var i = 0; i < this.hitAreaAdditions.length; i++) {
                        if (this.hitAreaAdditions[i] == target || ((this.hitAreaAdditions[i] instanceof egret.DisplayObjectContainer) && (this.hitAreaAdditions[i]).contains(target)))
                            return true;
                    }
                }
                if (this.dropDown instanceof egret.DisplayObjectContainer) {
                    if ((this.dropDown).contains(target))
                        return true;
                } else {
                    if (target == this.dropDown)
                        return true;
                }
            }

            return false;
        };

        /**
        * 打开下拉列表
        * @method egret.DropDownController#openDropDown
        */
        DropDownController.prototype.openDropDown = function () {
            this.openDropDownHelper();
        };

        /**
        * 执行打开下拉列表
        */
        DropDownController.prototype.openDropDownHelper = function () {
            if (!this.isOpen) {
                this.addCloseTriggers();

                this._isOpen = true;

                if (this.openButton)
                    this.openButton._setKeepDown(true);
                egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.OPEN);
            }
        };

        /**
        * 关闭下拉列表
        * @method egret.DropDownController#closeDropDown
        * @param commit {boolean}
        */
        DropDownController.prototype.closeDropDown = function (commit) {
            if (this.isOpen) {
                this._isOpen = false;
                if (this.openButton)
                    this.openButton._setKeepDown(false);

                var dde = new egret.UIEvent(egret.UIEvent.CLOSE, false, true);

                if (!commit)
                    dde.preventDefault();

                this.dispatchEvent(dde);

                this.removeCloseTriggers();
            }
        };

        /**
        * openButton上按下鼠标事件
        * @method egret.DropDownController#_openButton_buttonDownHandler
        * @param event {Event}
        */
        DropDownController.prototype._openButton_buttonDownHandler = function (event) {
            if (this.isOpen)
                this.closeDropDown(true);
            else {
                this.mouseIsDown = true;
                this.openDropDownHelper();
            }
        };

        /**
        * openButton上鼠标经过事件
        * @method egret.DropDownController#_openButton_rollOverHandler
        * @param event {TouchEvent}
        */
        DropDownController.prototype._openButton_rollOverHandler = function (event) {
            if (this.rollOverOpenDelay == 0)
                this.openDropDownHelper();
            else {
                this.openButton.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this);
                this.rollOverOpenDelayTimer = new egret.Timer(this.rollOverOpenDelay, 1);
                this.rollOverOpenDelayTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.rollOverDelay_timerCompleteHandler, this);
                this.rollOverOpenDelayTimer.start();
            }
        };

        /**
        * openButton上鼠标移出事件
        */
        DropDownController.prototype.openButton_rollOutHandler = function (event) {
            if (this.rollOverOpenDelayTimer && this.rollOverOpenDelayTimer.running) {
                this.rollOverOpenDelayTimer.stop();
                this.rollOverOpenDelayTimer = null;
            }

            this.openButton.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this);
        };

        /**
        * 到达鼠标移入等待延迟打开的时间。
        */
        DropDownController.prototype.rollOverDelay_timerCompleteHandler = function (event) {
            this.openButton.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this);
            this.rollOverOpenDelayTimer = null;

            this.openDropDownHelper();
        };

        /**
        * 舞台上鼠标按下事件
        * @method egret.DropDownController#stage_mouseDownHandler
        * @param event {Event}
        */
        DropDownController.prototype.stage_mouseDownHandler = function (event) {
            if (this.mouseIsDown) {
                this.mouseIsDown = false;
                return;
            }

            if (!this.dropDown || (this.dropDown && (event.target == this.dropDown || (this.dropDown instanceof egret.DisplayObjectContainer && !(this.dropDown).contains((event.target)))))) {
                var target = (event.target);
                if (this.openButton && target && this.openButton.contains(target))
                    return;

                if (this.hitAreaAdditions != null) {
                    for (var i = 0; i < this.hitAreaAdditions.length; i++) {
                        if (this.hitAreaAdditions[i] == event.target || ((this.hitAreaAdditions[i] instanceof egret.DisplayObjectContainer) && (this.hitAreaAdditions[i]).contains((event.target))))
                            return;
                    }
                }

                this.closeDropDown(true);
            }
        };

        /**
        * 舞台上鼠标移动事件
        * @method egret.DropDownController#stage_mouseMoveHandler
        * @param event {Event}
        */
        DropDownController.prototype.stage_mouseMoveHandler = function (event) {
            var target = (event.target);
            var containedTarget = this.isTargetOverDropDownOrOpenButton(target);

            if (containedTarget)
                return;
            if (event instanceof egret.TouchEvent && event.touchDown) {
                egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
                egret.UIGlobals.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
                return;
            }
            this.closeDropDown(true);
        };

        /**
        * 舞台上鼠标弹起事件
        * @method egret.DropDownController#stage_mouseUpHandler_noRollOverOpenDelay
        * @param event {Event}
        */
        DropDownController.prototype.stage_mouseUpHandler_noRollOverOpenDelay = function (event) {
            if (this.mouseIsDown) {
                this.mouseIsDown = false;
                return;
            }
        };

        /**
        * 舞台上鼠标弹起事件
        * @method egret.DropDownController#stage_mouseUpHandler
        * @param event {Event}
        */
        DropDownController.prototype.stage_mouseUpHandler = function (event) {
            var target = (event.target);
            var containedTarget = this.isTargetOverDropDownOrOpenButton(target);
            if (containedTarget) {
                egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
                egret.UIGlobals.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
                return;
            }

            this.closeDropDown(true);
        };

        /**
        * 舞台尺寸改变事件
        * @method egret.DropDownController#stage_resizeHandler
        * @param event {Event}
        */
        DropDownController.prototype.stage_resizeHandler = function (event) {
            this.closeDropDown(true);
        };

        /**
        * 舞台上鼠标滚轮事件
        */
        DropDownController.prototype.stage_mouseWheelHandler = function (event) {
            if (this.dropDown && !((this.dropDown).contains((event.target)) && event.isDefaultPrevented()))
                this.closeDropDown(false);
        };
        return DropDownController;
    })(egret.EventDispatcher);
    egret.DropDownController = DropDownController;
})(egret || (egret = {}));
