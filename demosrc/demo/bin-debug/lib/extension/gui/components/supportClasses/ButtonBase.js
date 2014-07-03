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
    * @class egret.ButtonBase
    * @classdesc
    * 按钮组件基类
    * @extends egret.SkinnableComponent
    */
    var ButtonBase = (function (_super) {
        __extends(ButtonBase, _super);
        /**
        * 构造函数
        * @method egret.ButtonBase#constructor
        */
        function ButtonBase() {
            _super.call(this);
            /**
            * 已经开始过不断抛出buttonDown事件的标志
            */
            this._downEventFired = false;
            this._autoRepeat = false;
            this._repeatDelay = 35;
            this._repeatInterval = 35;
            this._hovered = false;
            this._keepDown = false;
            this._label = "";
            this._mouseCaptured = false;
            this._stickyHighlighting = false;
            this.touchChildren = false;
            this.addHandlers();
        }
        Object.defineProperty(ButtonBase.prototype, "autoRepeat", {
            /**
            * 指定在用户按住鼠标按键时是否重复分派 buttonDown 事件。
            * @member egret.ButtonBase#autoRepeat
            */
            get: function () {
                return this._autoRepeat;
            },
            set: function (value) {
                if (value == this._autoRepeat)
                    return;

                this._autoRepeat = value;
                this.checkAutoRepeatTimerConditions(this.isDown());
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ButtonBase.prototype, "repeatDelay", {
            /**
            * 在第一个 buttonDown 事件之后，以及相隔每个 repeatInterval 重复一次 buttonDown 事件之前，需要等待的毫秒数。
            * @member egret.ButtonBase#repeatDelay
            */
            get: function () {
                return this._repeatDelay;
            },
            set: function (value) {
                this._repeatDelay = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ButtonBase.prototype, "repeatInterval", {
            /**
            * 用户在按钮上按住鼠标时，buttonDown 事件之间相隔的毫秒数。
            * @member egret.ButtonBase#repeatInterval
            */
            get: function () {
                return this._repeatInterval;
            },
            set: function (value) {
                this._repeatInterval = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ButtonBase.prototype, "hovered", {
            /**
            * 指示鼠标指针是否位于按钮上。
            * @member egret.ButtonBase#hovered
            */
            get: function () {
                return this._hovered;
            },
            set: function (value) {
                if (value == this._hovered)
                    return;
                this._hovered = value;
                this.invalidateSkinState();
                this.checkButtonDownConditions();
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 强制让按钮停在鼠标按下状态,此方法不会导致重复抛出buttonDown事件,仅影响皮肤State。
        * @method egret.ButtonBase#_keepDown
        * @param down {boolean} 是否按下
        */
        ButtonBase.prototype._setKeepDown = function (down) {
            if (this._keepDown == down)
                return;
            this._keepDown = down;
            this.invalidateSkinState();
        };

        Object.defineProperty(ButtonBase.prototype, "label", {
            /**
            * 要在按钮上显示的文本
            * @member egret.ButtonBase#label
            */
            get: function () {
                return this._getLabel();
            },
            set: function (value) {
                this._setLabel(value);
            },
            enumerable: true,
            configurable: true
        });

        ButtonBase.prototype._getLabel = function () {
            if (this.labelDisplay) {
                return this.labelDisplay.text;
            } else {
                return this._label;
            }
        };


        ButtonBase.prototype._setLabel = function (value) {
            this._label = value;
            if (this.labelDisplay) {
                this.labelDisplay.text = value;
            }
        };

        Object.defineProperty(ButtonBase.prototype, "mouseCaptured", {
            /**
            * 指示第一次分派 MouseEvent.MOUSE_DOWN 时，是否按下鼠标以及鼠标指针是否在按钮上。
            * @member egret.ButtonBase#mouseCaptured
            */
            get: function () {
                return this._mouseCaptured;
            },
            set: function (value) {
                if (value == this._mouseCaptured)
                    return;

                this._mouseCaptured = value;
                this.invalidateSkinState();
                if (!value)
                    this.removeStageMouseHandlers();
                this.checkButtonDownConditions();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ButtonBase.prototype, "stickyHighlighting", {
            /**
            * 如果为 false，则按钮会在用户按下它时显示其鼠标按下时的外观，但在用户将鼠标拖离它时将改为显示鼠标经过的外观。
            * 如果为 true，则按钮会在用户按下它时显示其鼠标按下时的外观，并在用户将鼠标拖离时继续显示此外观。
            * @member egret.ButtonBase#stickyHighlighting
            */
            get: function () {
                return this._stickyHighlighting;
            },
            set: function (value) {
                if (value == this._stickyHighlighting)
                    return;

                this._stickyHighlighting = value;
                this.invalidateSkinState();
                this.checkButtonDownConditions();
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 开始抛出buttonDown事件
        */
        ButtonBase.prototype.checkButtonDownConditions = function () {
            var isCurrentlyDown = this.isDown();
            if (this._downEventFired != isCurrentlyDown) {
                if (isCurrentlyDown) {
                    egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.BUTTON_DOWN);
                }

                this._downEventFired = isCurrentlyDown;
                this.checkAutoRepeatTimerConditions(isCurrentlyDown);
            }
        };

        /**
        * 添加鼠标事件监听
        * @method egret.ButtonBase#addHandlers
        */
        ButtonBase.prototype.addHandlers = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this.mouseEventHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.mouseEventHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseEventHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseEventHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mouseEventHandler, this);
        };

        /**
        * 添加舞台鼠标弹起事件监听
        */
        ButtonBase.prototype.addStageMouseHandlers = function () {
            egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);

            egret.UIGlobals.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
        };

        /**
        * 移除舞台鼠标弹起事件监听
        */
        ButtonBase.prototype.removeStageMouseHandlers = function () {
            egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);

            egret.UIGlobals.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
        };

        /**
        * 按钮是否是按下的状态
        */
        ButtonBase.prototype.isDown = function () {
            if (!this.enabled)
                return false;

            if (this.mouseCaptured && (this.hovered || this.stickyHighlighting))
                return true;
            return false;
        };

        /**
        * 检查需要启用还是关闭重发计时器
        */
        ButtonBase.prototype.checkAutoRepeatTimerConditions = function (buttonDown) {
            var needsTimer = this.autoRepeat && buttonDown;
            var hasTimer = this.autoRepeatTimer != null;

            if (needsTimer == hasTimer)
                return;

            if (needsTimer)
                this.startTimer();
            else
                this.stopTimer();
        };

        /**
        * 启动重发计时器
        */
        ButtonBase.prototype.startTimer = function () {
            this.autoRepeatTimer = new egret.Timer(1);
            this.autoRepeatTimer.delay = this._repeatDelay;
            this.autoRepeatTimer.addEventListener(egret.TimerEvent.TIMER, this.autoRepeat_timerDelayHandler, this);
            this.autoRepeatTimer.start();
        };

        /**
        * 停止重发计时器
        */
        ButtonBase.prototype.stopTimer = function () {
            this.autoRepeatTimer.stop();
            this.autoRepeatTimer = null;
        };

        /**
        * 鼠标事件处理
        * @method egret.ButtonBase#mouseEventHandler
        * @param event {Event}
        */
        ButtonBase.prototype.mouseEventHandler = function (event) {
            var touchEvent = event;
            switch (event.type) {
                case egret.TouchEvent.TOUCH_ROLL_OVER: {
                    if (touchEvent.touchDown && !this.mouseCaptured)
                        return;
                    this.hovered = true;
                    break;
                }

                case egret.TouchEvent.TOUCH_ROLL_OUT: {
                    this.hovered = false;
                    break;
                }

                case egret.TouchEvent.TOUCH_BEGIN: {
                    this.addStageMouseHandlers();
                    if (egret.InteractionMode.mode == egret.InteractionMode.TOUCH)
                        this.hovered = true;
                    this.mouseCaptured = true;
                    break;
                }

                case egret.TouchEvent.TOUCH_END: {
                    if (event.target == this) {
                        this.hovered = true;

                        if (this.mouseCaptured) {
                            this.buttonReleased();
                            this.mouseCaptured = false;
                        }
                    }
                    break;
                }
                case egret.TouchEvent.TOUCH_TAP: {
                    if (!this.enabled)
                        event.stopImmediatePropagation();
                    else
                        this.clickHandler(event);
                    return;
                }
            }
        };

        /**
        * 按钮弹起事件
        * @method egret.ButtonBase#buttonReleased
        */
        ButtonBase.prototype.buttonReleased = function () {
        };

        /**
        * 按钮点击事件
        * @method egret.ButtonBase#clickHandler
        * @param event {TouchEvent}
        */
        ButtonBase.prototype.clickHandler = function (event) {
        };

        /**
        * 舞台上鼠标弹起事件
        */
        ButtonBase.prototype.stage_mouseUpHandler = function (event) {
            if (event.target == this)
                return;

            this.mouseCaptured = false;
        };

        /**
        * 自动重发计时器首次延迟结束事件
        */
        ButtonBase.prototype.autoRepeat_timerDelayHandler = function (event) {
            this.autoRepeatTimer.reset();
            this.autoRepeatTimer.removeEventListener(egret.TimerEvent.TIMER, this.autoRepeat_timerDelayHandler, this);

            this.autoRepeatTimer.delay = this._repeatInterval;
            this.autoRepeatTimer.addEventListener(egret.TimerEvent.TIMER, this.autoRepeat_timerHandler, this);
            this.autoRepeatTimer.start();
        };

        /**
        * 自动重发buttonDown事件
        */
        ButtonBase.prototype.autoRepeat_timerHandler = function (event) {
            egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.BUTTON_DOWN);
        };

        /**
        * @method egret.ButtonBase#getCurrentSkinState
        * @returns {string}
        */
        ButtonBase.prototype.getCurrentSkinState = function () {
            if (!this.enabled)
                return _super.prototype.getCurrentSkinState.call(this);

            if (this.isDown() || this._keepDown)
                return "down";

            if (egret.InteractionMode.mode == egret.InteractionMode.MOUSE && (this.hovered || this.mouseCaptured))
                return "over";

            return "up";
        };

        /**
        * @method egret.ButtonBase#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        ButtonBase.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);

            if (instance == this.labelDisplay) {
                this.labelDisplay.text = this._label;
            }
        };
        return ButtonBase;
    })(egret.SkinnableComponent);
    egret.ButtonBase = ButtonBase;
})(egret || (egret = {}));
