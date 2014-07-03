/**
* Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
* to any person obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom
* the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
* PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
* FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
* ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RES;
(function (RES) {
    /**
    * StarlingSwfSpriteSheet解析器
    */
    var StarlingSwfSheetAnalyzer = (function (_super) {
        __extends(StarlingSwfSheetAnalyzer, _super);
        function StarlingSwfSheetAnalyzer() {
            _super.apply(this, arguments);
        }
        StarlingSwfSheetAnalyzer.prototype.parseSpriteSheet = function (texture, data) {
            var frames = data.frames;
            if (!frames) {
                return;
            }
            var spriteSheet = new egret.SpriteSheet(texture._bitmapData);
            for (var name in frames) {
                var config = frames[name];
                var texture = spriteSheet.createTexture(name, config.x, config.y, config.w, config.h);
                texture._offsetX = -config.offX || 0;
                texture._offsetY = -config.offY || 0;
            }
            return spriteSheet;
        };
        return StarlingSwfSheetAnalyzer;
    })(RES.SheetAnalyzer);
    RES.StarlingSwfSheetAnalyzer = StarlingSwfSheetAnalyzer;
})(RES || (RES = {}));
