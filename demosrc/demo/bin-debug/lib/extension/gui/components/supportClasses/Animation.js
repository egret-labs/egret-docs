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
    * @class egret.Animation
    * @classdesc
    * 数值缓动工具类
    */
    var Animation = (function () {
        /**
        * 构造函数
        * @method egret.Animation#constructor
        * @param updateFunction {Function} 动画更新时的回调函数,updateFunction(animation:Animation):void
        * @param thisObject {an}
        */
        function Animation(updateFunction, thisObject) {
            /**
            * 此动画的缓动行为。设置为null意味着不使用缓动，默认值为Ease.sineInOut()
            * @member egret.Animation#easerFunction
            */
            this.easerFunction = egret.Ease.sineInOut;
            this._duration = 500;
            this._startDelay = 0;
            this._repeatCount = 1;
            this._repeatDelay = 0;
            /**
            * 随着时间的推移Animation将设置动画的属性和值的列表。对象示例:{p:"x",f:10,t:100}表示，属性名"x"从10改变到100。
            * @member egret.Animation#motionPaths
            */
            this.motionPaths = [];
            this._currentValue = {};
            this.pauseTime = 0;
            this._isPaused = false;
            /**
            * 动画启动时刻
            */
            this.startTime = 0;
            this._started = false;
            /**
            * 已经播放的次数。
            */
            this.playedTimes = 0;
            this.updateFunction = updateFunction;
            this.thisObject = thisObject;
        }
        Object.defineProperty(Animation.prototype, "isPlaying", {
            /**
            * 是否正在播放动画，不包括延迟等待和暂停的阶段
            * @member egret.Animation#isPlaying
            */
            get: function () {
                return this._isPlaying;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Animation.prototype, "duration", {
            /**
            * 动画持续时间,单位毫秒，默认值500
            * @member egret.Animation#duration
            */
            get: function () {
                return this._duration;
            },
            set: function (value) {
                this._duration = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Animation.prototype, "startDelay", {
            /**
            * 动画开始播放前的延时时间,单位毫秒,默认0。
            * @member egret.Animation#startDelay
            */
            get: function () {
                return this._startDelay;
            },
            set: function (value) {
                this._startDelay = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Animation.prototype, "repeatCount", {
            /**
            * 动画重复的次数，0代表无限制重复。默认值为1。
            * @member egret.Animation#repeatCount
            */
            get: function () {
                return this._repeatCount;
            },
            set: function (value) {
                this._repeatCount = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Animation.prototype, "repeatDelay", {
            /**
            * 每次重复播放之间的间隔。第二次及以后的播放开始之前的延迟毫秒数。若要设置第一次之前的延迟时间，请使用startDelay属性。
            * @member egret.Animation#repeatDelay
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


        Object.defineProperty(Animation.prototype, "currentValue", {
            /**
            * 动画到当前时间对应的值。以MotionPath.property为键存储各个MotionPath的当前值。
            * @member egret.Animation#currentValue
            */
            get: function () {
                return this._currentValue;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 开始正向播放动画,无论何时调用都重新从零时刻开始，若设置了延迟会首先进行等待。
        * @method egret.Animation#play
        */
        Animation.prototype.play = function () {
            this.stopAnimation();
            this.start();
        };

        /**
        * 立即跳到指定百分比的动画位置
        */
        Animation.prototype.seek = function (runningTime) {
            runningTime = Math.min(runningTime, this.duration);
            var fraction = runningTime / this.duration;
            this.caculateCurrentValue(fraction);
            this.startTime = egret.getTimer() - runningTime - this._startDelay;
            if (this.updateFunction != null)
                this.updateFunction.call(this.thisObject, this);
        };

        /**
        * 开始播放动画
        */
        Animation.prototype.start = function () {
            this.playedTimes = 0;
            this._started = true;
            this._isPlaying = false;
            this._currentValue = {};
            this.caculateCurrentValue(0);
            this.startTime = egret.getTimer();
            Animation.currentTime = this.startTime;
            this.doInterval();
            Animation.addAnimation(this);
        };

        /**
        * 直接跳到动画结尾
        * @method egret.Animation#end
        */
        Animation.prototype.end = function () {
            if (!this._started) {
                this.caculateCurrentValue(0);
                if (this.startFunction != null) {
                    this.startFunction.call(this.thisObject, this);
                }
                if (this.updateFunction != null) {
                    this.updateFunction.call(this.thisObject, this);
                }
            }
            this.caculateCurrentValue(1);
            if (this.updateFunction != null) {
                this.updateFunction.call(this.thisObject, this);
            }
            this.stopAnimation();
            if (this.endFunction != null) {
                this.endFunction.call(this.thisObject, this);
            }
        };

        /**
        * 停止播放动画
        * @method egret.Animation#stop
        */
        Animation.prototype.stop = function () {
            this.stopAnimation();
            if (this.stopFunction != null)
                this.stopFunction.call(this.thisObject, this);
        };

        /**
        * 仅停止播放动画，而不调用stopFunction。
        */
        Animation.prototype.stopAnimation = function () {
            this.playedTimes = 0;
            this._isPlaying = false;
            this.startTime = 0;
            this._started = false;
            Animation.removeAnimation(this);
        };

        Object.defineProperty(Animation.prototype, "isPaused", {
            /**
            * 正在暂停中
            * @member egret.Animation#isPaused
            */
            get: function () {
                return this._isPaused;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 暂停播放
        * @method egret.Animation#pause
        */
        Animation.prototype.pause = function () {
            if (!this._started)
                return;
            this._isPaused = true;
            this.pauseTime = egret.getTimer();
            this._isPlaying = false;
            Animation.removeAnimation(this);
        };

        /**
        * 继续播放
        * @method egret.Animation#resume
        */
        Animation.prototype.resume = function () {
            if (!this._started || !this._isPaused)
                return;
            this._isPaused = false;
            this.startTime += egret.getTimer() - this.pauseTime;
            this.pauseTime = -1;
            Animation.addAnimation(this);
        };

        Object.defineProperty(Animation.prototype, "started", {
            /**
            * 动画已经开始的标志，包括延迟等待和暂停的阶段。
            * @member egret.Animation#started
            */
            get: function () {
                return this._started;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 计算当前值并返回动画是否结束
        */
        Animation.prototype.doInterval = function () {
            var delay = this.playedTimes > 0 ? this._repeatDelay : this._startDelay;
            var runningTime = Animation.currentTime - this.startTime - delay;
            if (runningTime < 0) {
                return false;
            }
            if (!this._isPlaying) {
                this._isPlaying = true;
                if (this.playedTimes == 0) {
                    if (this.startFunction != null)
                        this.startFunction.call(this.thisObject, this);
                }
            }
            var fraction = this._duration == 0 ? 1 : Math.min(runningTime, this._duration) / this._duration;
            this.caculateCurrentValue(fraction);
            if (this.updateFunction != null)
                this.updateFunction.call(this.thisObject, this);
            var isEnded = runningTime >= this._duration;
            if (isEnded) {
                this.playedTimes++;
                this._isPlaying = false;
                this.startTime = Animation.currentTime;
                if (this._repeatCount == 0 || this.playedTimes < this._repeatCount) {
                    isEnded = false;
                } else {
                    Animation.removeAnimation(this);
                    this._started = false;
                    this.playedTimes = 0;
                }
            }
            if (isEnded && this.endFunction != null) {
                this.endFunction.call(this.thisObject, this);
            }
            return isEnded;
        };

        /**
        * 计算当前值
        */
        Animation.prototype.caculateCurrentValue = function (fraction) {
            if (this.easerFunction)
                fraction = this.easerFunction(fraction);
            var paths = this.motionPaths;
            var length = paths.length;
            for (var i = 0; i < length; i++) {
                var motion = paths[i];
                this.currentValue[motion.prop] = motion.from + (motion.to - motion.from) * fraction;
            }
        };

        /**
        * 添加动画到队列
        */
        Animation.addAnimation = function (animation) {
            if (Animation.activeAnimations.indexOf(animation) == -1) {
                Animation.activeAnimations.push(animation);
                if (!Animation.registered) {
                    Animation.registered = true;
                    egret.Ticker.getInstance().register(Animation.onEnterFrame, null);
                }
            }
        };

        /**
        * 从队列移除动画,返回移除前的索引
        */
        Animation.removeAnimation = function (animation) {
            var index = Animation.activeAnimations.indexOf(animation);
            if (index != -1) {
                Animation.activeAnimations.splice(index, 1);
                if (index <= Animation.currentIntervalIndex)
                    Animation.currentIntervalIndex--;
            }
            if (Animation.activeAnimations.length == 0 && Animation.registered) {
                Animation.registered = false;
                egret.Ticker.getInstance().unregister(Animation.onEnterFrame, null);
            }
        };

        /**
        * 计时器触发函数
        */
        Animation.onEnterFrame = function (frameTime, currentTime) {
            Animation.currentTime = egret.getTimer();
            Animation.currentIntervalIndex = 0;
            while (Animation.currentIntervalIndex < Animation.activeAnimations.length) {
                var animation = Animation.activeAnimations[Animation.currentIntervalIndex];
                var isEnded = animation.doInterval();
                Animation.currentIntervalIndex++;
            }
            Animation.currentIntervalIndex = -1;
            if (Animation.activeAnimations.length == 0 && Animation.registered) {
                Animation.registered = false;
                egret.Ticker.getInstance().unregister(Animation.onEnterFrame, null);
            }
        };
        Animation.currentTime = 0;

        Animation.TIMER_RESOLUTION = 1000 / 60;

        Animation.activeAnimations = [];

        Animation.currentIntervalIndex = -1;
        return Animation;
    })();
    egret.Animation = Animation;
})(egret || (egret = {}));
