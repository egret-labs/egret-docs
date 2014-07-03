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
    * @class egret.ProgressBar
    * @classdesc
    * 进度条控件。
    * @extends egret.Range
    */
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        /**
        * @method egret.ProgressBar#constructor
        */
        function ProgressBar() {
            _super.call(this);
            this._slideDuration = 500;
            this._direction = egret.ProgressBarDirection.LEFT_TO_RIGHT;
            this.trackResizedOrMoved = false;
            this.hostComponentKey = "egret.ProgressBar";
        }
        Object.defineProperty(ProgressBar.prototype, "labelFunction", {
            /**
            * 进度条文本格式化回调函数。示例：labelFunction(value:Number,maximum:Number):String;
            * @member egret.ProgressBar#labelFunction
            */
            get: function () {
                return this._labelFunction;
            },
            set: function (value) {
                if (this._labelFunction == value)
                    return;
                this._labelFunction = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 将当前value转换成文本
        * @method egret.ProgressBar#valueToLabel
        * @param value {number}
        * @param maximum {number}
        * @returns {string}
        */
        ProgressBar.prototype.valueToLabel = function (value, maximum) {
            if (this.labelFunction != null) {
                return this._labelFunction(value, maximum);
            }
            return value + " / " + maximum;
        };

        Object.defineProperty(ProgressBar.prototype, "slideDuration", {
            /**
            * value改变时调整thumb长度的缓动动画时间，单位毫秒。设置为0则不执行缓动。默认值500。
            * @member egret.ProgressBar#slideDuration
            */
            get: function () {
                return this._slideDuration;
            },
            set: function (value) {
                if (this._slideDuration == value)
                    return;
                this._slideDuration = value;
                if (this.animator && this.animator.isPlaying) {
                    this.animator.stop();
                    this._setValue(this.slideToValue);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ProgressBar.prototype, "direction", {
            /**
            * 进度条增长方向。请使用ProgressBarDirection定义的常量。默认值：ProgressBarDirection.LEFT_TO_RIGHT。
            * @member egret.ProgressBar#direction
            */
            get: function () {
                return this._direction;
            },
            set: function (value) {
                if (this._direction == value)
                    return;
                this._direction = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ProgressBar.prototype, "value", {
            /**
            * 进度条的当前值。
            * 注意：当组件添加到显示列表后，若slideDuration不为0。设置此属性，并不会立即应用。而是作为目标值，开启缓动动画缓慢接近。
            * 若需要立即重置属性，请先设置slideDuration为0，或者把组件从显示列表移除。
            * @member egret.ProgressBar#value
            */
            get: function () {
                return this._getValue();
            },
            set: function (newValue) {
                if (this._getValue() == newValue)
                    return;
                this._setValue(newValue);
                if (this._slideDuration > 0 && this.stage) {
                    this.validateProperties(); //最大值最小值发生改变时要立即应用，防止当前起始值不正确。
                    this.slideToValue = this.nearestValidValue(newValue, this.snapInterval);
                    if (!this.animator) {
                        this.animator = new egret.Animation(this.animationUpdateHandler, this);
                    }
                    if (this.animator.isPlaying) {
                        this.setValue(this.nearestValidValue(this.animator.motionPaths[0].valueTo, this.snapInterval));
                        this.animator.stop();
                    }
                    if (this.slideToValue == this._getValue())
                        return;
                    var duration = this._slideDuration * (Math.abs(this._getValue() - this.slideToValue) / (this.maximum - this.minimum));
                    this.animator.duration = duration === Infinity ? 0 : duration;
                    this.animator.motionPaths = [
                        { prop: "value", from: this._getValue(), to: this.slideToValue }
                    ];
                    this.animator.play();
                }
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 动画播放更新数值
        */
        ProgressBar.prototype.animationUpdateHandler = function (animation) {
            var value = this.nearestValidValue(animation.currentValue["value"], this.snapInterval);
            this.animationValue = Math.min(this.maximum, Math.max(this.minimum, value));
            this.invalidateDisplayList();
        };

        /**
        * @method egret.ProgressBar#setValue
        * @param value {number}
        */
        ProgressBar.prototype.setValue = function (value) {
            _super.prototype.setValue.call(this, value);
            this.invalidateDisplayList();
        };

        /**
        * @method egret.ProgressBar#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        ProgressBar.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            this.updateSkinDisplayList();
        };

        /**
        * @method egret.ProgressBar#partAdded
        * @param partName {string}
        * @param instance {any}
        */
        ProgressBar.prototype.partAdded = function (partName, instance) {
            if (instance == this.track) {
                if (this.track instanceof egret.UIComponent) {
                    this.track.addEventListener(egret.ResizeEvent.RESIZE, this.onTrackResizeOrMove, this);
                    this.track.addEventListener(egret.MoveEvent.MOVE, this.onTrackResizeOrMove, this);
                }
            }
        };

        /**
        * @method egret.ProgressBar#partRemoved
        * @param partName {string}
        * @param instance {any}
        */
        ProgressBar.prototype.partRemoved = function (partName, instance) {
            if (instance == this.track) {
                if (this.track instanceof egret.UIComponent) {
                    this.track.removeEventListener(egret.ResizeEvent.RESIZE, this.onTrackResizeOrMove, this);
                    this.track.removeEventListener(egret.MoveEvent.MOVE, this.onTrackResizeOrMove, this);
                }
            }
        };

        /**
        * track的位置或尺寸发生改变
        */
        ProgressBar.prototype.onTrackResizeOrMove = function (event) {
            this.trackResizedOrMoved = true;
            this.invalidateProperties();
        };

        /**
        * @method egret.ProgressBar#commitProperties
        */
        ProgressBar.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.trackResizedOrMoved) {
                this.trackResizedOrMoved = false;
                this.updateSkinDisplayList();
            }
        };

        /**
        * 更新皮肤部件大小和可见性。
        * @method egret.ProgressBar#updateSkinDisplayList
        */
        ProgressBar.prototype.updateSkinDisplayList = function () {
            this.trackResizedOrMoved = false;
            var currentValue = this.value;
            if (this.animator && this.animator.isPlaying) {
                currentValue = this.animationValue;
            } else {
                currentValue = this.value;
                if (isNaN(currentValue)) {
                    currentValue = 0;
                }
            }
            var maxValue = isNaN(this.maximum) ? 0 : this.maximum;
            if (this.thumb && this.track) {
                var trackWidth = isNaN(this.track.width) ? 0 : this.track.width;
                trackWidth *= this.track.scaleX;
                var trackHeight = isNaN(this.track.height) ? 0 : this.track.height;
                trackHeight *= this.track.scaleY;
                var thumbWidth = Math.round((currentValue / maxValue) * trackWidth);
                if (isNaN(thumbWidth) || thumbWidth < 0 || thumbWidth === Infinity)
                    thumbWidth = 0;
                var thumbHeight = Math.round((currentValue / maxValue) * trackHeight);
                if (isNaN(thumbHeight) || thumbHeight < 0 || thumbHeight === Infinity)
                    thumbHeight = 0;

                var p = this.track.localToGlobal(0, 0);
                var thumbPos = this.globalToLocal(p.x, p.y, egret.Point.identity);
                var thumbPosX = thumbPos.x;
                var thumbPosY = thumbPos.y;

                switch (this._direction) {
                    case egret.ProgressBarDirection.LEFT_TO_RIGHT:
                        this.thumb.width = thumbWidth;
                        this.thumb.height = trackHeight;
                        this.thumb.x = thumbPosX;
                        break;
                    case egret.ProgressBarDirection.RIGHT_TO_LEFT:
                        this.thumb.width = thumbWidth;
                        this.thumb.height = trackHeight;
                        this.thumb.x = thumbPosX + trackWidth - thumbWidth;
                        break;
                    case egret.ProgressBarDirection.TOP_TO_BOTTOM:
                        this.thumb.width = trackWidth;
                        this.thumb.height = thumbHeight;
                        this.thumb.y = thumbPosY;
                        break;
                    case egret.ProgressBarDirection.BOTTOM_TO_TOP:
                        this.thumb.width = trackWidth;
                        this.thumb.height = thumbHeight;
                        this.thumb.y = thumbPosY + trackHeight - thumbHeight;
                        break;
                }
            }
            if (this.labelDisplay) {
                this.labelDisplay.text = this.valueToLabel(currentValue, maxValue);
            }
        };
        return ProgressBar;
    })(egret.Range);
    egret.ProgressBar = ProgressBar;
})(egret || (egret = {}));
