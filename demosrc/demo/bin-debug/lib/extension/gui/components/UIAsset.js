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
    * @class egret.UIAsset
    * @classdesc
    * 素材包装器。<p/>
    * 注意：UIAsset仅在添content时测量一次初始尺寸， 请不要在外部直接修改content尺寸，
    * 若做了引起content尺寸发生变化的操作, 需手动调用UIAsset的invalidateSize()进行重新测量。
    * @extends egret.UIComponent
    * @implements egret.ISkinnableClient
    */
    var UIAsset = (function (_super) {
        __extends(UIAsset, _super);
        /**
        * @method egret.UIAsset#constructor
        * @param source {any} 素材标识符
        */
        function UIAsset(source, autoScale) {
            if (typeof autoScale === "undefined") { autoScale = true; }
            _super.call(this);
            /**
            * 确定位图填充尺寸的方式。默认值：BitmapFillMode.SCALE。
            * 设置为 BitmapFillMode.REPEAT时，位图将重复以填充区域。
            * 设置为 BitmapFillMode.SCALE时，位图将拉伸以填充区域。
            * 注意:此属性仅在source的解析结果为Texture时有效
            * @member {egret.Texture} egret.UIAsset#fillMode
            */
            this.fillMode = "scale";
            this.sourceChanged = false;
            this.createChildrenCalled = false;
            this.contentReused = false;
            /**
            * 是自动否缩放content对象，以符合UIAsset的尺寸。默认值true。
            */
            this.autoScale = true;
            this.touchChildren = false;
            if (source) {
                this.source = source;
            }
            this.autoScale = autoScale;
        }
        Object.defineProperty(UIAsset.prototype, "source", {
            /**
            * 素材标识符。可以为Class,String,或DisplayObject实例等任意类型，具体规则由项目注入的素材适配器决定，
            * 适配器根据此属性值解析获取对应的显示对象，并赋值给content属性。
            * @member egret.UIAsset#source
            */
            get: function () {
                return this._source;
            },
            set: function (value) {
                if (this._source == value)
                    return;
                this._source = value;
                if (this.createChildrenCalled) {
                    this.parseSource();
                } else {
                    this.sourceChanged = true;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(UIAsset.prototype, "content", {
            /**
            * 解析source得到的对象，通常为显示对象或Texture。
            * @member egret.UIAsset#content
            */
            get: function () {
                return this._content;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * @method egret.UIAsset#createChildren
        */
        UIAsset.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.sourceChanged) {
                this.parseSource();
            }
            this.createChildrenCalled = true;
        };

        /**
        * 解析source
        */
        UIAsset.prototype.parseSource = function () {
            this.sourceChanged = false;
            var adapter = UIAsset.assetAdapter;
            if (!adapter) {
                adapter = this.getAdapter();
            }
            if (!this._source) {
                this.contentChanged(null, null);
            } else {
                var reuseContent = this.contentReused ? null : this._content;
                this.contentReused = true;
                adapter.getAsset(this._source, this.contentChanged, this, reuseContent);
            }
        };

        /**
        * 获取资源适配器
        */
        UIAsset.prototype.getAdapter = function () {
            var adapter;
            try  {
                adapter = egret.Injector.getInstance("egret.IAssetAdapter");
            } catch (e) {
                adapter = new egret.DefaultAssetAdapter();
            }
            UIAsset.assetAdapter = adapter;
            return adapter;
        };

        /**
        * 皮肤发生改变
        */
        UIAsset.prototype.contentChanged = function (content, source) {
            if (source !== this._source)
                return;
            var oldContent = this._content;
            this._content = content;
            if (oldContent !== content) {
                if (oldContent instanceof egret.DisplayObject) {
                    this._removeFromDisplayList(oldContent);
                }
                if (content instanceof egret.DisplayObject) {
                    this._addToDisplayListAt(content, 0);
                }
            }
            if (content instanceof egret.Texture && content["scale9Grid"] instanceof egret.Rectangle) {
                this.scale9Grid = content["scale9Grid"];
            }
            this.invalidateSize();
            this.invalidateDisplayList();
            this.contentReused = false;
            if (this.hasEventListener(egret.UIEvent.CONTENT_CHANGED)) {
                egret.UIEvent.dispatchUIEvent(this, egret.UIEvent.CONTENT_CHANGED);
            }
        };

        UIAsset.prototype.measure = function () {
            _super.prototype.measure.call(this);
            var content = this._content;
            if (content instanceof egret.DisplayObject) {
                if ("preferredWidth" in content) {
                    this.measuredWidth = (content).preferredWidth;
                    this.measuredHeight = (content).preferredHeight;
                } else {
                    this.measuredWidth = content.width * content.scaleX;
                    this.measuredHeight = content.height * content.scaleY;
                }
            } else if (content instanceof egret.Texture) {
                this.measuredWidth = content._textureWidth;
                this.measuredHeight = content._textureHeight;
            }
        };

        /**
        * @method egret.UIAsset#updateDisplayList
        * @param unscaledWidth {number}
        * @param unscaledHeight {number}
        */
        UIAsset.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var content = this._content;
            if (this.autoScale && content instanceof egret.DisplayObject) {
                if ("setLayoutBoundsSize" in content) {
                    (content).setLayoutBoundsSize(unscaledWidth, unscaledHeight);
                } else {
                    content.width = unscaledWidth / content.scaleX;
                    content.height = unscaledHeight / content.scaleY;
                }
            }
        };

        UIAsset.prototype._render = function (renderContext) {
            if (this._content instanceof egret.Texture) {
                var texture = this._content;
                this._texture_to_render = texture;
                var w;
                var h;
                if (this.autoScale) {
                    w = this._width;
                    h = this._height;
                } else {
                    w = texture.textureWidth;
                    h = texture.textureHeight;
                }
                egret.Bitmap._drawBitmap(renderContext, w, h, this);
            } else {
                this._texture_to_render = null;
            }
            _super.prototype._render.call(this, renderContext);
        };

        /**
        * @see egret.DisplayObject.measureBounds
        * @returns {Rectangle}
        * @private
        */
        UIAsset.prototype._measureBounds = function () {
            var bounds = _super.prototype._measureBounds.call(this);
            if (this._content instanceof egret.Texture) {
                var texture = this._content;
                var textureW = texture._textureWidth;
                var textureH = texture._textureHeight;
                var w = this.width;
                var h = this.height;
                var x = Math.floor(texture._offsetX * w / textureW);
                var y = Math.floor(texture._offsetY * h / textureH);
                if (x < bounds.x) {
                    bounds.x = x;
                }
                if (y < bounds.y) {
                    bounds.y = y;
                }
                if (x + w > bounds.right) {
                    bounds.right = x + w;
                }
                if (y + h > bounds.bottom) {
                    bounds.bottom = y + h;
                }
            }
            return bounds;
        };

        /**
        * @method egret.UIAsset#addChild
        * @deprecated
        * @param child {DisplayObject}
        * @returns {DisplayObject}
        */
        UIAsset.prototype.addChild = function (child) {
            throw (new Error("addChild()" + UIAsset.errorStr + "addElement()代替"));
        };

        /**
        * @method egret.UIAsset#addChildAt
        * @deprecated
        * @param child {DisplayObject}
        * @param index {number}
        * @returns {DisplayObject}
        */
        UIAsset.prototype.addChildAt = function (child, index) {
            throw (new Error("addChildAt()" + UIAsset.errorStr + "addElementAt()代替"));
        };

        /**
        * @method egret.UIAsset#removeChild
        * @deprecated
        * @param child {DisplayObject}
        * @returns {DisplayObject}
        */
        UIAsset.prototype.removeChild = function (child) {
            throw (new Error("removeChild()" + UIAsset.errorStr + "removeElement()代替"));
        };

        /**
        * @method egret.UIAsset#removeChildAt
        * @deprecated
        * @param index {number}
        * @returns {DisplayObject}
        */
        UIAsset.prototype.removeChildAt = function (index) {
            throw (new Error("removeChildAt()" + UIAsset.errorStr + "removeElementAt()代替"));
        };

        /**
        * @method egret.UIAsset#setChildIndex
        * @deprecated
        * @param child {DisplayObject}
        * @param index {number}
        */
        UIAsset.prototype.setChildIndex = function (child, index) {
            throw (new Error("setChildIndex()" + UIAsset.errorStr + "setElementIndex()代替"));
        };

        /**
        * @method egret.UIAsset#swapChildren
        * @deprecated
        * @param child1 {DisplayObject}
        * @param child2 {DisplayObject}
        */
        UIAsset.prototype.swapChildren = function (child1, child2) {
            throw (new Error("swapChildren()" + UIAsset.errorStr + "swapElements()代替"));
        };

        /**
        * @method egret.UIAsset#swapChildrenAt
        * @deprecated
        * @param index1 {number}
        * @param index2 {number}
        */
        UIAsset.prototype.swapChildrenAt = function (index1, index2) {
            throw (new Error("swapChildrenAt()" + UIAsset.errorStr + "swapElementsAt()代替"));
        };
        UIAsset.errorStr = "在此组件中不可用，若此组件为容器类，请使用";
        return UIAsset;
    })(egret.UIComponent);
    egret.UIAsset = UIAsset;
})(egret || (egret = {}));
