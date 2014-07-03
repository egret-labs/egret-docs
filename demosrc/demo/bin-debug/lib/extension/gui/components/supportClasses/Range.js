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
    * @class egret.Range
    * @classdesc
    * 范围选取组件,该组件包含一个值和这个值所允许的最大最小约束范围。
    * @extends egret.SkinnableComponent
    */
    var Range = (function (_super) {
        __extends(Range, _super);
        /**
        * 构造函数
        * @method egret.Range#constructor
        */
        function Range() {
            _super.call(this);
            this._maximum = 100;
            /**
            * 最大有效值改变标志
            */
            this.maxChanged = false;
            this._minimum = 0;
            /**
            * 最小有效值改变标志
            */
            this.minChanged = false;
            this._stepSize = 1;
            /**
            * 单步大小改变的标志
            */
            this.stepSizeChanged = false;
            this._value = 0;
            this._changedValue = 0;
            /**
            * 此范围的当前值改变标志
            */
            this.valueChanged = false;
            this._snapInterval = 1;
            this.snapIntervalChanged = false;
            this._explicitSnapInterval = false;
        }
        Object.defineProperty(Range.prototype, "maximum", {
            /**
            * 最大有效值
            * @member egret.Range#maximum
            */
            get: function () {
                return this._maximum;
            },
            set: function (value) {
                this._setMaximun(value);
            },
            enumerable: true,
            configurable: true
        });


        Range.prototype._setMaximun = function (value) {
            if (value == this._maximum)
                return;

            this._maximum = value;
            this.maxChanged = true;

            this.invalidateProperties();
        };

        Object.defineProperty(Range.prototype, "minimum", {
            /**
            * 最小有效值
            * @member egret.Range#minimum
            */
            get: function () {
                return this._minimum;
            },
            set: function (value) {
                this._setMinimun(value);
            },
            enumerable: true,
            configurable: true
        });


        Range.prototype._setMinimun = function (value) {
            if (value == this._minimum)
                return;

            this._minimum = value;
            this.minChanged = true;

            this.invalidateProperties();
        };

        Object.defineProperty(Range.prototype, "stepSize", {
            /**
            * 调用 changeValueByStep() 方法时 value 属性更改的单步大小。默认值为 1。<br/>
            * 除非 snapInterval 为 0，否则它必须是 snapInterval 的倍数。<br/>
            * 如果 stepSize 不是倍数，则会将它近似到大于或等于 snapInterval 的最近的倍数。<br/>
            * @member egret.Range#stepSize
            */
            get: function () {
                return this._stepSize;
            },
            set: function (value) {
                if (value == this._stepSize)
                    return;

                this._stepSize = value;
                this.stepSizeChanged = true;

                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Range.prototype, "value", {
            /**
            * 此范围的当前值。
            * @member egret.Range#value
            */
            get: function () {
                return this._getValue();
            },
            set: function (newValue) {
                this._setValue(newValue);
            },
            enumerable: true,
            configurable: true
        });


        Range.prototype._setValue = function (newValue) {
            if (newValue == this.value)
                return;
            this._changedValue = newValue;
            this.valueChanged = true;
            this.invalidateProperties();
        };

        Range.prototype._getValue = function () {
            return (this.valueChanged) ? this._changedValue : this._value;
        };

        Object.defineProperty(Range.prototype, "snapInterval", {
            /**
            * snapInterval 属性定义 value 属性的有效值。如果为非零，则有效值为 minimum 与此属性的整数倍数之和，且小于或等于 maximum。 <br/>
            * 例如，如果 minimum 为 10，maximum 为 20，而此属性为 3，则可能的有效值为 10、13、16、19 和 20。<br/>
            * 如果此属性的值为零，则仅会将有效值约束到介于 minimum 和 maximum 之间（包括两者）。<br/>
            * 此属性还约束 stepSize 属性（如果设置）的有效值。如果未显式设置此属性，但设置了 stepSize，则 snapInterval 将默认为 stepSize。<br/>
            * @member egret.Range#snapInterval
            */
            get: function () {
                return this._snapInterval;
            },
            set: function (value) {
                this._explicitSnapInterval = true;

                if (value == this._snapInterval)
                    return;
                if (isNaN(value)) {
                    this._snapInterval = 1;
                    this._explicitSnapInterval = false;
                } else {
                    this._snapInterval = value;
                }

                this.snapIntervalChanged = true;
                this.stepSizeChanged = true;

                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });


        /**
        * @method egret.Range#commitProperties
        */
        Range.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);

            if (this.minimum > this.maximum) {
                if (!this.maxChanged)
                    this._minimum = this._maximum;
                else
                    this._maximum = this._minimum;
            }

            if (this.valueChanged || this.maxChanged || this.minChanged || this.snapIntervalChanged) {
                var currentValue = (this.valueChanged) ? this._changedValue : this._value;
                this.valueChanged = false;
                this.maxChanged = false;
                this.minChanged = false;
                this.snapIntervalChanged = false;
                this.setValue(this.nearestValidValue(currentValue, this.snapInterval));
            }

            if (this.stepSizeChanged) {
                if (this._explicitSnapInterval) {
                    this._stepSize = this.nearestValidSize(this._stepSize);
                } else {
                    this._snapInterval = this._stepSize;
                    this.setValue(this.nearestValidValue(this._value, this.snapInterval));
                }

                this.stepSizeChanged = false;
            }
        };

        /**
        * 修正stepSize到最接近snapInterval的整数倍
        */
        Range.prototype.nearestValidSize = function (size) {
            var interval = this.snapInterval;
            if (interval == 0)
                return size;

            var validSize = Math.round(size / interval) * interval;
            return (Math.abs(validSize) < interval) ? interval : validSize;
        };

        /**
        * 修正输入的值为有效值
        * @method egret.Range#nearestValidValue
        * @param value {number} 输入值。
        * @param interval {number} snapInterval 的值，或 snapInterval 的整数倍数。
        * @returns {number}
        */
        Range.prototype.nearestValidValue = function (value, interval) {
            if (interval == 0)
                return Math.max(this.minimum, Math.min(this.maximum, value));

            var maxValue = this.maximum - this.minimum;
            var scale = 1;

            value -= this.minimum;
            if (interval != Math.round(interval)) {
                var parts = ((1 + interval).toString()).split(".");
                scale = Math.pow(10, parts[1].length);
                maxValue *= scale;
                value = Math.round(value * scale);
                interval = Math.round(interval * scale);
            }

            var lower = Math.max(0, Math.floor(value / interval) * interval);
            var upper = Math.min(maxValue, Math.floor((value + interval) / interval) * interval);
            var validValue = ((value - lower) >= ((upper - lower) / 2)) ? upper : lower;

            return (validValue / scale) + this.minimum;
        };

        /**
        * 设置当前值。此方法假定调用者已经使用了 nearestValidValue() 方法来约束 value 参数
        * @method egret.Range#setValue
        * @param value {number} value属性的新值
        */
        Range.prototype.setValue = function (value) {
            if (this._value == value)
                return;
            if (isNaN(value))
                value = 0;
            if (!isNaN(this.maximum) && !isNaN(this.minimum) && (this.maximum > this.minimum))
                this._value = Math.min(this.maximum, Math.max(this.minimum, value));
            else
                this._value = value;
            this.valueChanged = false;
        };

        /**
        * 按 stepSize增大或减小当前值
        * @method egret.Range#changeValueByStep
        * @param increase {boolean} 若为 true，则向value增加stepSize，否则减去它。
        */
        Range.prototype.changeValueByStep = function (increase) {
            if (typeof increase === "undefined") { increase = true; }
            if (this.stepSize == 0)
                return;

            var newValue = (increase) ? this.value + this.stepSize : this.value - this.stepSize;
            this.setValue(this.nearestValidValue(newValue, this.snapInterval));
        };
        return Range;
    })(egret.SkinnableComponent);
    egret.Range = Range;
})(egret || (egret = {}));
