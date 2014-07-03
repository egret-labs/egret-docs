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
    * @class egret.SliderBase
    * @classdesc
    * 滑块控件基类
    * @extends egret.TrackBase
    */
    var SliderBase = (function (_super) {
        __extends(SliderBase, _super);
        /**
        * 构造函数
        * @method egret.SliderBase#constructor
        */
        function SliderBase() {
            _super.call(this);
            this._showTrackHighlight = true;
            this._pendingValue = 0;
            this._liveDragging = true;
            this.maximum = 10;
        }
        Object.defineProperty(SliderBase.prototype, "showTrackHighlight", {
            /**
            * 是否启用轨道高亮效果。默认值为true。
            * 注意，皮肤里的子部件trackHighlight要同时为非空才能显示高亮效果。
            * @member egret.SliderBase#showTrackHighlight
            */
            get: function () {
                return this._showTrackHighlight;
            },
            set: function (value) {
                if (this._showTrackHighlight == value)
                    return;
                this._showTrackHighlight = value;
                if (this.trackHighlight)
                    this.trackHighlight.visible = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(SliderBase.prototype, "pendingValue", {
            /**
            * 释放鼠标按键时滑块将具有的值。无论liveDragging是否为true，在滑块拖动期间始终更新此属性。
            * 而value属性在当liveDragging为false时，只在鼠标释放时更新一次。
            * @member egret.SliderBase#pendingValue
            */
            get: function () {
                return this._pendingValue;
            },
            set: function (value) {
                if (value == this._pendingValue)
                    return;
                this._pendingValue = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.SliderBase#setValue
        * @param value {number}
        */
        SliderBase.prototype.setValue = function (value) {
            this._pendingValue = value;

            _super.prototype.setValue.call(this, value);
        };

        /**
        * 动画播放更新数值
        */
        SliderBase.prototype.animationUpdateHandler = function (animation) {
            this.pendingValue = animation.currentValue["value"];
        };

        /**
        * 动画播放完毕
        */
        SliderBase.prototype.animationEndHandler = function (animation) {
            this.setValue(this.slideToValue);

            this.dispatchEventWith(egret.Event.CHANGE);
            egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.CHANGE_END);
        };

        /**
        * 停止播放动画
        */
        SliderBase.prototype.stopAnimation = function () {
            this.animator.stop();

            this.setValue(this.nearestValidValue(this.pendingValue, this.snapInterval));

            this.dispatchEventWith(egret.Event.CHANGE);
            egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.CHANGE_END);
        };

        /**
        * @method egret.SliderBase#thumb_mouseDownHandler
        * @param event {TouchEvent}
        */
        SliderBase.prototype.thumb_mouseDownHandler = function (event) {
            if (this.animator && this.animator.isPlaying)
                this.stopAnimation();

            _super.prototype.thumb_mouseDownHandler.call(this, event);
        };

        Object.defineProperty(SliderBase.prototype, "liveDragging", {
            /**
            * 如果为 true，则将在沿着轨道拖动滑块时，而不是在释放滑块按钮时，提交此滑块的值。
            * @member egret.SliderBase#liveDragging
            */
            get: function () {
                return this._liveDragging;
            },
            set: function (value) {
                this._liveDragging = value;
            },
            enumerable: true,
            configurable: true
        });


        /**
        * @method egret.SliderBase#updateWhenMouseMove
        */
        SliderBase.prototype.updateWhenMouseMove = function () {
            if (!this.track)
                return;

            var pos = this.track.globalToLocal(this._moveStageX, this._moveStageY, egret.Point.identity);
            var newValue = this.pointToValue(pos.x - this._clickOffsetX, pos.y - this._clickOffsetY);
            newValue = this.nearestValidValue(newValue, this.snapInterval);

            if (newValue != this.pendingValue) {
                egret.TrackBaseEvent.dispatchTrackBaseEvent(this, egret.TrackBaseEvent.THUMB_DRAG);
                if (this.liveDragging == true) {
                    this.setValue(newValue);
                    this.dispatchEventWith(egret.Event.CHANGE);
                } else {
                    this.pendingValue = newValue;
                }
            }
        };

        /**
        * @method egret.SliderBase#stage_mouseUpHandler
        * @param event {Event}
        */
        SliderBase.prototype.stage_mouseUpHandler = function (event) {
            _super.prototype.stage_mouseUpHandler.call(this, event);
            if ((this.liveDragging == false) && (this.value != this.pendingValue)) {
                this.setValue(this.pendingValue);
                this.dispatchEventWith(egret.Event.CHANGE);
            }
        };

        /**
        * @method egret.SliderBase#track_mouseDownHandler
        * @param event {TouchEvent}
        */
        SliderBase.prototype.track_mouseDownHandler = function (event) {
            if (!this.enabled)
                return;
            var thumbW = (this.thumb) ? this.thumb.width : 0;
            var thumbH = (this.thumb) ? this.thumb.height : 0;
            var offsetX = event.stageX - (thumbW / 2);
            var offsetY = event.stageY - (thumbH / 2);
            var p = this.track.globalToLocal(offsetX, offsetY, egret.Point.identity);

            var newValue = this.pointToValue(p.x, p.y);
            newValue = this.nearestValidValue(newValue, this.snapInterval);

            if (newValue != this.pendingValue) {
                if (this.slideDuration != 0) {
                    if (!this.animator) {
                        this.animator = new egret.Animation(this.animationUpdateHandler, this);
                        this.animator.endFunction = this.animationEndHandler;
                    }
                    if (this.animator.isPlaying)
                        this.stopAnimation();
                    this.slideToValue = newValue;
                    this.animator.duration = this.slideDuration * (Math.abs(this.pendingValue - this.slideToValue) / (this.maximum - this.minimum));
                    this.animator.motionPaths = [{ prop: "value", from: this.pendingValue, to: this.slideToValue }];
                    egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.CHANGE_START);
                    this.animator.play();
                } else {
                    this.setValue(newValue);
                    this.dispatchEventWith(egret.Event.CHANGE);
                }
            }
        };

        /**
        * @method egret.SliderBase#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        SliderBase.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.trackHighlight) {
                this.trackHighlight.touchEnabled = false;
                if (this.trackHighlight instanceof egret.DisplayObjectContainer)
                    (this.trackHighlight).touchChildren = false;
                this.trackHighlight.visible = this._showTrackHighlight;
            }
        };
        return SliderBase;
    })(egret.TrackBase);
    egret.SliderBase = SliderBase;
})(egret || (egret = {}));
