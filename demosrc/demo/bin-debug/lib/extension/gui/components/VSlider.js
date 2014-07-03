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
    * @class egret.VSlider
    * @classdesc
    * 垂直滑块控件
    * @extends egret.SliderBase
    */
    var VSlider = (function (_super) {
        __extends(VSlider, _super);
        /**
        * 构造函数
        * @method egret.VSlider#constructor
        */
        function VSlider() {
            _super.call(this);
            this.hostComponentKey = "egret.VSlider";
        }
        /**
        * @method egret.VSlider#pointToValue
        * @param x {number}
        * @param y {number}
        * @returns {number}
        */
        VSlider.prototype.pointToValue = function (x, y) {
            if (!this.thumb || !this.track)
                return 0;

            var range = this.maximum - this.minimum;
            var thumbRange = this.track.layoutBoundsHeight - this.thumb.layoutBoundsHeight;
            return this.minimum + ((thumbRange != 0) ? ((thumbRange - y) / thumbRange) * range : 0);
        };

        /**
        * @method egret.VSlider#updateSkinDisplayList
        */
        VSlider.prototype.updateSkinDisplayList = function () {
            if (!this.thumb || !this.track)
                return;

            var thumbHeight = this.thumb.layoutBoundsHeight;
            var thumbRange = this.track.layoutBoundsHeight - thumbHeight;
            var range = this.maximum - this.minimum;
            var thumbPosTrackY = (range > 0) ? thumbRange - (((this.pendingValue - this.minimum) / range) * thumbRange) : 0;
            var thumbPos = this.track.localToGlobal(0, thumbPosTrackY);
            var thumbPosX = thumbPos.x;
            var thumbPosY = thumbPos.y;
            var thumbPosParentY = this.thumb.parent.globalToLocal(thumbPosX, thumbPosY, egret.Point.identity).y;

            this.thumb.setLayoutBoundsPosition(this.thumb.layoutBoundsX, Math.round(thumbPosParentY));
            if (this.showTrackHighlight && this.trackHighlight && this.trackHighlight._parent) {
                var trackHighlightY = this.trackHighlight._parent.globalToLocal(thumbPosX, thumbPosY, egret.Point.identity).y;
                this.trackHighlight.y = Math.round(trackHighlightY + thumbHeight);
                this.trackHighlight.height = Math.round(thumbRange - trackHighlightY);
            }
        };
        return VSlider;
    })(egret.SliderBase);
    egret.VSlider = VSlider;
})(egret || (egret = {}));
