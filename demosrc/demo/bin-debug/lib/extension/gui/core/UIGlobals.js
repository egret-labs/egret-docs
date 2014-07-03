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
    * @class egret.UIGlobals
    * @classdesc
    */
    var UIGlobals = (function () {
        function UIGlobals() {
        }
        Object.defineProperty(UIGlobals, "stage", {
            /**
            * 舞台引用，当第一个UIComponent添加到舞台时此属性被自动赋值
            * @member egret.UIGlobals.stage
            */
            get: function () {
                return UIGlobals._stage;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * 初始化管理器
        * @method egret.UIGlobals._initlize
        * @param stage {Stage}
        */
        UIGlobals._initlize = function (stage) {
            if (UIGlobals.initlized)
                return;
            UIGlobals._stage = stage;
            UIGlobals._layoutManager = new egret.LayoutManager();
            UIGlobals.initlized = true;
        };

        Object.defineProperty(UIGlobals, "uiStage", {
            /**
            * 顶级应用容器
            * @member egret.UIGlobals.uiStage
            */
            get: function () {
                return UIGlobals._uiStage;
            },
            enumerable: true,
            configurable: true
        });
        UIGlobals.initlized = false;
        return UIGlobals;
    })();
    egret.UIGlobals = UIGlobals;
})(egret || (egret = {}));
