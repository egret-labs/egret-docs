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
    * @class egret.SkinBasicLayout
    * @classdesc
    * 皮肤简单布局类。
    * @extends egret.HashObject
    */
    var SkinBasicLayout = (function (_super) {
        __extends(SkinBasicLayout, _super);
        /**
        * @method egret.SkinBasicLayout#constructor
        */
        function SkinBasicLayout() {
            _super.call(this);
        }
        Object.defineProperty(SkinBasicLayout.prototype, "target", {
            /**
            * 目标布局对象
            * @member egret.SkinBasicLayout#target
            */
            get: function () {
                return this._target;
            },
            set: function (value) {
                this._target = value;
            },
            enumerable: true,
            configurable: true
        });


        /**
        * 测量组件尺寸大小
        * @method egret.SkinBasicLayout#measure
        */
        SkinBasicLayout.prototype.measure = function () {
            if (this.target == null)
                return;

            var measureW = 0;
            var measureH = 0;

            var skin = this._target.skin;
            var count = this.target.numChildren;
            for (var i = 0; i < count; i++) {
                var layoutElement = this.target.getChildAt(i);
                if (!layoutElement || layoutElement == skin || !layoutElement.includeInLayout)
                    continue;

                var hCenter = layoutElement.horizontalCenter;
                var vCenter = layoutElement.verticalCenter;
                var left = layoutElement.left;
                var right = layoutElement.right;
                var top = layoutElement.top;
                var bottom = layoutElement.bottom;

                var extX;
                var extY;

                if (!isNaN(left) && !isNaN(right)) {
                    extX = left + right;
                } else if (!isNaN(hCenter)) {
                    extX = Math.abs(hCenter) * 2;
                } else if (!isNaN(left) || !isNaN(right)) {
                    extX = isNaN(left) ? 0 : left;
                    extX += isNaN(right) ? 0 : right;
                } else {
                    extX = layoutElement.preferredX;
                }

                if (!isNaN(top) && !isNaN(bottom)) {
                    extY = top + bottom;
                } else if (!isNaN(vCenter)) {
                    extY = Math.abs(vCenter) * 2;
                } else if (!isNaN(top) || !isNaN(bottom)) {
                    extY = isNaN(top) ? 0 : top;
                    extY += isNaN(bottom) ? 0 : bottom;
                } else {
                    extY = layoutElement.preferredY;
                }

                var preferredWidth = layoutElement.preferredWidth;
                var preferredHeight = layoutElement.preferredHeight;

                measureW = Math.ceil(Math.max(measureW, extX + preferredWidth));
                measureH = Math.ceil(Math.max(measureH, extY + preferredHeight));
            }

            this.target.measuredWidth = Math.max(measureW, this.target.measuredWidth);
            this.target.measuredHeight = Math.max(measureH, this.target.measuredHeight);
        };

        /**
        * 更新显示列表
        * @method egret.SkinBasicLayout#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        SkinBasicLayout.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            if (this.target == null)
                return;

            var count = this.target.numChildren;
            var skin = this._target.skin;
            for (var i = 0; i < count; i++) {
                var layoutElement = this.target.getChildAt(i);
                if (layoutElement == null || layoutElement == skin || !layoutElement.includeInLayout)
                    continue;

                var hCenter = layoutElement.horizontalCenter;
                var vCenter = layoutElement.verticalCenter;
                var left = layoutElement.left;
                var right = layoutElement.right;
                var top = layoutElement.top;
                var bottom = layoutElement.bottom;
                var percentWidth = layoutElement.percentWidth;
                var percentHeight = layoutElement.percentHeight;

                var childWidth = NaN;
                var childHeight = NaN;

                if (!isNaN(left) && !isNaN(right)) {
                    childWidth = unscaledWidth - right - left;
                } else if (!isNaN(percentWidth)) {
                    childWidth = Math.round(unscaledWidth * Math.min(percentWidth * 0.01, 1));
                }

                if (!isNaN(top) && !isNaN(bottom)) {
                    childHeight = unscaledHeight - bottom - top;
                } else if (!isNaN(percentHeight)) {
                    childHeight = Math.round(unscaledHeight * Math.min(percentHeight * 0.01, 1));
                }

                layoutElement.setLayoutBoundsSize(childWidth, childHeight);

                var elementWidth = layoutElement.layoutBoundsWidth;
                var elementHeight = layoutElement.layoutBoundsHeight;

                var childX = NaN;
                var childY = NaN;

                if (!isNaN(hCenter))
                    childX = Math.round((unscaledWidth - elementWidth) / 2 + hCenter);
                else if (!isNaN(left))
                    childX = left;
                else if (!isNaN(right))
                    childX = unscaledWidth - elementWidth - right;
                else
                    childX = layoutElement.layoutBoundsX;

                if (!isNaN(vCenter))
                    childY = Math.round((unscaledHeight - elementHeight) / 2 + vCenter);
                else if (!isNaN(top))
                    childY = top;
                else if (!isNaN(bottom))
                    childY = unscaledHeight - elementHeight - bottom;
                else
                    childY = layoutElement.layoutBoundsY;

                layoutElement.setLayoutBoundsPosition(childX, childY);
            }
        };
        return SkinBasicLayout;
    })(egret.HashObject);
    egret.SkinBasicLayout = SkinBasicLayout;
})(egret || (egret = {}));
