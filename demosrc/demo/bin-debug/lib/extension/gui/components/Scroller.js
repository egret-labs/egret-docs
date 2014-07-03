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
    * @class egret.Scroller
    * @classdesc
    * 滚动条组件
    * @extends egret.UIComponent
    * @implements egret.IVisualElementContainer
    */
    var Scroller = (function (_super) {
        __extends(Scroller, _super);
        /**
        * 构造函数
        * @method egret.Scroller#constructor
        */
        function Scroller() {
            _super.call(this);
            this._verticalScrollPolicy = "auto";
            this._horizontalScrollPolicy = "auto";
            this.ignoreTouchBegin = false;
            this._velocityX = 0;
            this._velocityY = 0;
            this._previousVelocityX = [];
            this._previousVelocityY = [];
        }
        /**
        * @method egret.Scroller#measure
        */
        Scroller.prototype.measure = function () {
            if (!this._viewport)
                return;
            this.measuredWidth = this._viewport.preferredWidth;
            this.measuredHeight = this._viewport.preferredHeight;
        };

        /**
        * @method egret.Scroller#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        Scroller.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            this._viewport.setLayoutBoundsSize(unscaledWidth, unscaledHeight);
        };

        Object.defineProperty(Scroller.prototype, "verticalScrollPolicy", {
            /**
            * 垂直滚动条显示策略，参见ScrollPolicy类定义的常量。
            * @member egret.Scroller#verticalScrollPolicy
            */
            get: function () {
                return this._verticalScrollPolicy;
            },
            set: function (value) {
                this._verticalScrollPolicy = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Scroller.prototype, "horizontalScrollPolicy", {
            /**
            * 水平滚动条显示策略，参见ScrollPolicy类定义的常量。
            * @member egret.Scroller#horizontalScrollPolicy
            */
            get: function () {
                return this._horizontalScrollPolicy;
            },
            set: function (value) {
                this._horizontalScrollPolicy = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Scroller.prototype, "viewport", {
            /**
            * 要滚动的视域组件。
            * @member egret.Scroller#viewport
            */
            get: function () {
                return this._viewport;
            },
            set: function (value) {
                if (value == this._viewport)
                    return;

                this.uninstallViewport();
                this._viewport = value;
                this.installViewport();
                this.dispatchEventWith("viewportChanged");
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 安装并初始化视域组件
        */
        Scroller.prototype.installViewport = function () {
            if (this.viewport) {
                this.viewport.clipAndEnableScrolling = true;
                this.viewport.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.viewport.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                this.viewport.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                this._addToDisplayListAt(this.viewport, 0);
            }
        };

        /**
        * 卸载视域组件
        */
        Scroller.prototype.uninstallViewport = function () {
            if (this.viewport) {
                this.viewport.clipAndEnableScrolling = false;
                this.viewport.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.viewport.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                this.viewport.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                this._removeFromDisplayList(this.viewport);
            }
        };

        Scroller.prototype.onTouchEndCapture = function (event) {
            if (!this.delayTouchBeginEvent) {
                return;
            }
            event.stopPropagation();
            var evt = this.cloneTouchEvent(event);
            this.delayTouchEndEvent = evt;
            this.onTouchBeginTimer();
            if (!this.touchEndTimer) {
                this.touchEndTimer = new egret.Timer(100, 1);
                this.touchEndTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTouchEndTimer, this);
            }
            this.touchEndTimer.start();
        };

        Scroller.prototype.onTouchEndTimer = function (e) {
            this.touchEndTimer.stop();
            var event = this.delayTouchEndEvent;
            this.delayTouchEndEvent = null;
            this.dispatchPropagationEvent(event);
        };

        Scroller.prototype.dispatchPropagationEvent = function (event) {
            var list = [];

            var target = event._target;
            while (target) {
                list.push(target);
                target = target.parent;
            }

            var viewport = this._viewport;
            for (var i = 1; ; i += 2) {
                target = list[i];
                if (!target || target === viewport) {
                    break;
                }
                list.unshift(target);
            }
            var targetIndex = list.indexOf(event._target);
            this._dispatchPropagationEvent(event, list, targetIndex);
        };

        /**
        * 若这个Scroller可以滚动，阻止当前事件，延迟100ms再抛出。
        */
        Scroller.prototype.onTouchBeginCapture = function (event) {
            var canScroll = this.checkScrollPolicy();
            if (!canScroll) {
                return;
            }

            var target = event.target;
            while (target != this) {
                if (target instanceof Scroller) {
                    canScroll = target.checkScrollPolicy();
                    if (canScroll) {
                        return;
                    }
                }
                target = target.parent;
            }
            if (this.delayTouchEndEvent) {
                this.delayTouchEndEvent = null;
                this.touchEndTimer.stop();
            }
            event.stopPropagation();
            var evt = this.cloneTouchEvent(event);
            this.delayTouchBeginEvent = evt;
            if (!this.touchBeginTimer) {
                this.touchBeginTimer = new egret.Timer(100, 1);
                this.touchBeginTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTouchBeginTimer, this);
            }
            this.touchBeginTimer.start();
            this.onTouchBegin(event);
        };

        Scroller.prototype.cloneTouchEvent = function (event) {
            var evt = new egret.TouchEvent(event._type, event._bubbles, event.cancelable);
            evt.touchPointID = event.touchPointID;
            evt._stageX = event._stageX;
            evt._stageY = event._stageY;
            evt.ctrlKey = event.ctrlKey;
            evt.altKey = event.altKey;
            evt.shiftKey = event.shiftKey;
            evt.touchDown = event.touchDown;
            evt._isDefaultPrevented = false;
            evt._target = event._target;
            return evt;
        };

        Scroller.prototype.onTouchBeginTimer = function (e) {
            this.touchBeginTimer.stop();
            var event = this.delayTouchBeginEvent;
            this.delayTouchBeginEvent = null;
            this.dispatchPropagationEvent(event);
        };

        /**
        * 检查当前滚动策略，若有一个方向可以滚动，返回true。
        */
        Scroller.prototype.checkScrollPolicy = function () {
            var viewport = this._viewport;
            var hCanScroll;
            switch (this._horizontalScrollPolicy) {
                case "auto":
                    if (viewport.contentWidth > viewport.width) {
                        hCanScroll = true;
                    } else {
                        hCanScroll = false;
                    }
                    break;
                case "on":
                    hCanScroll = true;
                    break;
                case "off":
                    hCanScroll = false;
                    break;
            }
            this._horizontalCanScroll = hCanScroll;

            var vCanScroll;
            switch (this._verticalScrollPolicy) {
                case "auto":
                    if (viewport.contentHeight > viewport.height) {
                        vCanScroll = true;
                    } else {
                        vCanScroll = false;
                    }
                    break;
                case "on":
                    vCanScroll = true;
                    break;
                case "off":
                    vCanScroll = false;
                    break;
            }
            this._verticalCanScroll = vCanScroll;
            return hCanScroll || vCanScroll;
        };

        Scroller.prototype.onTouchBegin = function (event) {
            if (event.isDefaultPrevented()) {
                return;
            }
            var canScroll = this.checkScrollPolicy();
            if (!canScroll) {
                return;
            }
            if (this.verticalAnimator && this.verticalAnimator.isPlaying)
                this.verticalAnimator.stop();
            if (this.horizontalAnimator && this.horizontalAnimator.isPlaying)
                this.horizontalAnimator.stop();
            var viewport = this._viewport;
            var hsp = viewport.horizontalScrollPosition;
            var vsp = viewport.verticalScrollPosition;
            this._offsetPointX = hsp + event.stageX;
            this._offsetPointY = vsp + event.stageY;

            this._velocityX = 0;
            this._velocityY = 0;
            this._previousVelocityX.length = 0;
            this._previousVelocityY.length = 0;
            this._previousTouchTime = egret.getTimer();
            this._previousTouchX = this._startTouchX = this._currentTouchX = event.stageX;
            this._previousTouchY = this._startTouchY = this._currentTouchY = event.stageY;
            this._startHorizontalScrollPosition = hsp;
            this._startVerticalScrollPosition = vsp;

            egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            egret.UIGlobals.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            egret.UIGlobals.stage.addEventListener(egret.Event.LEAVE_STAGE, this.onTouchEnd, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            event.preventDefault();
        };

        Scroller.prototype.onTouchMove = function (event) {
            this._currentTouchX = event.stageX;
            this._currentTouchY = event.stageY;
            if (this.delayTouchBeginEvent) {
                this.delayTouchBeginEvent = null;
                this.touchBeginTimer.stop();
            }
            var viewport = this._viewport;
            if (this._horizontalCanScroll) {
                var hsp = this._offsetPointX - event.stageX;
                if (hsp < 0) {
                    hsp *= 0.5;
                }
                if (hsp > viewport.contentWidth - viewport.width) {
                    hsp = (hsp + viewport.contentWidth - viewport.width) * 0.5;
                }
                viewport.horizontalScrollPosition = hsp;
            }

            if (this._verticalCanScroll) {
                var vsp = this._offsetPointY - event.stageY;
                if (vsp < 0) {
                    vsp *= 0.5;
                }
                if (vsp > viewport.contentHeight - viewport.height) {
                    vsp = (vsp + viewport.contentHeight - viewport.height) * 0.5;
                }
                viewport.verticalScrollPosition = vsp;
            }
        };

        Scroller.prototype.onTouchEnd = function (event) {
            egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            egret.UIGlobals.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            egret.UIGlobals.stage.removeEventListener(egret.Event.LEAVE_STAGE, this.onTouchEnd, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);

            if (this._horizontalCanScroll) {
                this.checkHorizontalScrollPosition();
            }
            if (this._verticalCanScroll) {
                this.checkVerticalScrollPosition();
            }
        };

        Scroller.easeOut = function (ratio) {
            var invRatio = ratio - 1.0;
            return invRatio * invRatio * invRatio + 1;
        };

        Scroller.prototype.enterFrameHandler = function (event) {
            var now = egret.getTimer();
            var maxVelocityCount = 4;
            var timeOffset = now - this._previousTouchTime;
            if (timeOffset > 0) {
                this._previousVelocityX[this._previousVelocityX.length] = this._velocityX;
                if (this._previousVelocityX.length > maxVelocityCount) {
                    this._previousVelocityX.shift();
                }
                this._previousVelocityY[this._previousVelocityY.length] = this._velocityY;
                if (this._previousVelocityY.length > maxVelocityCount) {
                    this._previousVelocityY.shift();
                }
                this._velocityX = (this._currentTouchX - this._previousTouchX) / timeOffset;
                this._velocityY = (this._currentTouchY - this._previousTouchY) / timeOffset;
                this._previousTouchTime = now;
                this._previousTouchX = this._currentTouchX;
                this._previousTouchY = this._currentTouchY;
            }
            var horizontalInchesMoved = Math.abs(this._currentTouchX - this._startTouchX);
            var verticalInchesMoved = Math.abs(this._currentTouchY - this._startTouchY);
            var minimumDragDistance = 0.04;
            if (this._horizontalCanScroll && horizontalInchesMoved >= minimumDragDistance) {
                this._startTouchX = this._currentTouchX;
                this._startHorizontalScrollPosition = this._viewport.horizontalScrollPosition;
            }
            if (this._verticalCanScroll && verticalInchesMoved >= minimumDragDistance) {
                this._startTouchY = this._currentTouchY;
                this._startVerticalScrollPosition = this._viewport.verticalScrollPosition;
            }
        };

        Scroller.prototype.checkHorizontalScrollPosition = function () {
            var viewport = this._viewport;
            var hsp = viewport.horizontalScrollPosition;
            var maxHsp = viewport.contentWidth - viewport.width;
            maxHsp = Math.max(0, maxHsp);

            var sum = this._velocityX * 2.33;
            var velocityCount = this._previousVelocityX.length;
            var totalWeight = 2.33;
            for (var i = 0; i < velocityCount; i++) {
                var weight = Scroller.VELOCITY_WEIGHTS[i];
                sum += this._previousVelocityX.shift() * weight;
                totalWeight += weight;
            }

            var pixelsPerMS = sum / totalWeight;
            var absPixelsPerMS = Math.abs(pixelsPerMS);
            if (absPixelsPerMS <= 0.02) {
                this.finishScrollingHorizontally();
            } else {
                var result = this.getAnimationDatas(pixelsPerMS, hsp, maxHsp);
                this.throwHorizontally(result[0], result[1]);
            }
        };

        Scroller.prototype.checkVerticalScrollPosition = function () {
            var viewport = this._viewport;
            var vsp = viewport.verticalScrollPosition;
            var maxVsp = viewport.contentHeight - viewport.height;

            var sum = this._velocityY * 2.33;
            var velocityCount = this._previousVelocityY.length;
            var totalWeight = 2.33;
            for (var i = 0; i < velocityCount; i++) {
                var weight = Scroller.VELOCITY_WEIGHTS[i];
                sum += this._previousVelocityY.shift() * weight;
                totalWeight += weight;
            }

            var pixelsPerMS = sum / totalWeight;
            var absPixelsPerMS = Math.abs(pixelsPerMS);
            if (absPixelsPerMS <= 0.02) {
                this.finishScrollingVertically();
            } else {
                var result = this.getAnimationDatas(pixelsPerMS, vsp, maxVsp);
                this.throwVertically(result[0], result[1]);
            }
        };

        Scroller.prototype.getAnimationDatas = function (pixelsPerMS, curPos, maxPos) {
            var absPixelsPerMS = Math.abs(pixelsPerMS);
            var extraFricition = 0.95;
            var duration = 0;
            var friction = 0.998;
            var minVelocity = 0.02;
            var posTo = curPos + (pixelsPerMS - minVelocity) / Math.log(friction);
            if (posTo < 0 || posTo > maxPos) {
                posTo = curPos;
                while (Math.abs(pixelsPerMS) > minVelocity) {
                    posTo -= pixelsPerMS;
                    if (posTo < 0 || posTo > maxPos) {
                        pixelsPerMS *= friction * extraFricition;
                    } else {
                        pixelsPerMS *= friction;
                    }
                    duration++;
                }
            } else {
                duration = Math.log(minVelocity / absPixelsPerMS) / Math.log(friction);
            }
            if (!Scroller.animationData) {
                Scroller.animationData = [0, 0];
            }
            var result = Scroller.animationData;
            result[0] = posTo;
            result[1] = duration;
            return result;
        };

        Scroller.prototype.finishScrollingHorizontally = function (animation) {
            var viewport = this._viewport;
            var hsp = viewport.horizontalScrollPosition;
            var maxHsp = viewport.contentWidth - viewport.width;
            var hspTo = hsp;
            if (hsp < 0) {
                hspTo = 0;
            }
            if (hsp > maxHsp) {
                hspTo = maxHsp;
            }
            this.throwHorizontally(hspTo, 300);
        };

        /**
        * 缓动到水平滚动位置
        * @method egret.Scroller#throwHorizontally
        * @param hspTo {number}
        * @param duration {number}
        */
        Scroller.prototype.throwHorizontally = function (hspTo, duration) {
            if (typeof duration === "undefined") { duration = 500; }
            var hsp = this._viewport.horizontalScrollPosition;
            if (hsp == hspTo) {
                return;
            }
            if (!this.horizontalAnimator) {
                this.horizontalAnimator = new egret.Animation(this.horizontalUpdateHandler, this);
                this.horizontalAnimator.endFunction = this.finishScrollingHorizontally;
                this.horizontalAnimator.easerFunction = Scroller.easeOut;
            }
            if (this.horizontalAnimator.isPlaying)
                this.horizontalAnimator.stop();
            this.horizontalAnimator.duration = duration;
            this.horizontalAnimator.motionPaths = [{ prop: "hsp", from: hsp, to: hspTo }];
            this.horizontalAnimator.play();
        };

        /**
        * 更新水平滚动位置
        */
        Scroller.prototype.horizontalUpdateHandler = function (animation) {
            this._viewport.horizontalScrollPosition = animation.currentValue["hsp"];
        };

        Scroller.prototype.finishScrollingVertically = function (animation) {
            var viewport = this._viewport;
            var vsp = viewport.verticalScrollPosition;
            var maxVsp = viewport.contentHeight - viewport.height;
            maxVsp = Math.max(0, maxVsp);
            var vspTo = vsp;
            if (vsp < 0) {
                vspTo = 0;
            }
            if (vsp > maxVsp) {
                vspTo = maxVsp;
            }
            this.throwVertically(vspTo, 300);
        };

        /**
        * 缓动到垂直滚动位置
        * @method egret.Scroller#throwVertically
        * @param vspTo {number}
        * @param duration {number}
        */
        Scroller.prototype.throwVertically = function (vspTo, duration) {
            if (typeof duration === "undefined") { duration = 500; }
            var vsp = this._viewport.verticalScrollPosition;
            if (vsp == vspTo) {
                return;
            }
            if (!this.verticalAnimator) {
                this.verticalAnimator = new egret.Animation(this.verticalUpdateHandler, this);
                this.verticalAnimator.endFunction = this.finishScrollingVertically;
                this.verticalAnimator.easerFunction = Scroller.easeOut;
            }
            if (this.verticalAnimator.isPlaying)
                this.verticalAnimator.stop();
            this.verticalAnimator.duration = duration;
            this.verticalAnimator.motionPaths = [{ prop: "vsp", from: vsp, to: vspTo }];
            this.verticalAnimator.play();
        };

        /**
        * 更新垂直滚动位置
        */
        Scroller.prototype.verticalUpdateHandler = function (animation) {
            this._viewport.verticalScrollPosition = animation.currentValue["vsp"];
        };

        Object.defineProperty(Scroller.prototype, "numElements", {
            /**
            * @member egret.Scroller#numElements
            */
            get: function () {
                return this.viewport ? 1 : 0;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 抛出索引越界异常
        */
        Scroller.prototype.throwRangeError = function (index) {
            throw new RangeError("索引:\"" + index + "\"超出可视元素索引范围");
        };

        /**
        * @method egret.Scroller#getElementAt
        * @param index {number}
        * @returns {IVisualElement}
        */
        Scroller.prototype.getElementAt = function (index) {
            if (this.viewport && index == 0)
                return this.viewport;
            else
                this.throwRangeError(index);
            return null;
        };

        /**
        * @method egret.Scroller#getElementIndex
        * @param element {IVisualElement}
        * @returns {number}
        */
        Scroller.prototype.getElementIndex = function (element) {
            if (element != null && element == this.viewport)
                return 0;
            else
                return -1;
        };

        /**
        * @method egret.Scroller#containsElement
        * @param element {IVisualElement}
        * @returns {boolean}
        */
        Scroller.prototype.containsElement = function (element) {
            if (element != null && element == this.viewport)
                return true;
            return false;
        };

        Scroller.prototype.throwNotSupportedError = function () {
            throw new Error("此方法在Scroller组件内不可用!");
        };

        /**
        * @method egret.Scroller#addElement
        * @deprecated
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        Scroller.prototype.addElement = function (element) {
            this.throwNotSupportedError();
            return null;
        };

        /**
        * @method egret.Scroller#addElementAt
        * @deprecated
        * @param element {IVisualElement}
        * @param index {number}
        * @returns {IVisualElement}
        */
        Scroller.prototype.addElementAt = function (element, index) {
            this.throwNotSupportedError();
            return null;
        };

        /**
        * @method egret.Scroller#removeElement
        * @deprecated
        * @param element {IVisualElement}
        * @returns {IVisualElement}
        */
        Scroller.prototype.removeElement = function (element) {
            this.throwNotSupportedError();
            return null;
        };

        /**
        * @method egret.Scroller#removeElementAt
        * @deprecated
        * @param index {number}
        * @returns {IVisualElement}
        */
        Scroller.prototype.removeElementAt = function (index) {
            this.throwNotSupportedError();
            return null;
        };

        /**
        * @method egret.Scroller#removeAllElements
        * @deprecated
        */
        Scroller.prototype.removeAllElements = function () {
            this.throwNotSupportedError();
        };

        /**
        * @method egret.Scroller#setElementIndex
        * @deprecated
        * @param element {IVisualElement}
        * @param index {number}
        */
        Scroller.prototype.setElementIndex = function (element, index) {
            this.throwNotSupportedError();
        };

        /**
        * @method egret.Scroller#swapElements
        * @deprecated
        * @param element1 {IVisualElement}
        * @param element2 {IVisualElement}
        */
        Scroller.prototype.swapElements = function (element1, element2) {
            this.throwNotSupportedError();
        };

        /**
        * @method egret.Scroller#swapElementsAt
        * @deprecated
        * @param index1 {number}
        * @param index2 {number}
        */
        Scroller.prototype.swapElementsAt = function (index1, index2) {
            this.throwNotSupportedError();
        };

        /**
        * @method egret.Scroller#addChild
        * @deprecated
        * @param child {DisplayObject}
        * @returns {DisplayObject}
        */
        Scroller.prototype.addChild = function (child) {
            this.throwNotSupportedError();
            return null;
        };

        /**
        * @method egret.Scroller#addChildAt
        * @deprecated
        * @param child {DisplayObject}
        * @param index {number}
        * @returns {DisplayObject}
        */
        Scroller.prototype.addChildAt = function (child, index) {
            this.throwNotSupportedError();
            return null;
        };

        /**
        * @method egret.Scroller#removeChild
        * @deprecated
        * @param child {DisplayObject}
        * @returns {DisplayObject}
        */
        Scroller.prototype.removeChild = function (child) {
            this.throwNotSupportedError();
            return null;
        };

        /**
        * @method egret.Scroller#removeChildAt
        * @deprecated
        * @param index {number}
        * @returns {DisplayObject}
        */
        Scroller.prototype.removeChildAt = function (index) {
            this.throwNotSupportedError();
            return null;
        };

        /**
        * @method egret.Scroller#setChildIndex
        * @deprecated
        * @param child {DisplayObject}
        * @param index {number}
        */
        Scroller.prototype.setChildIndex = function (child, index) {
            this.throwNotSupportedError();
        };

        /**
        * @method egret.Scroller#swapChildren
        * @deprecated
        * @param child1 {DisplayObject}
        * @param child2 {DisplayObject}
        */
        Scroller.prototype.swapChildren = function (child1, child2) {
            this.throwNotSupportedError();
        };

        /**
        * @method egret.Scroller#swapChildrenAt
        * @deprecated
        * @param index1 {number}
        * @param index2 {number}
        */
        Scroller.prototype.swapChildrenAt = function (index1, index2) {
            this.throwNotSupportedError();
        };
        Scroller.VELOCITY_WEIGHTS = [1, 1.33, 1.66, 2];
        return Scroller;
    })(egret.UIComponent);
    egret.Scroller = Scroller;
})(egret || (egret = {}));
