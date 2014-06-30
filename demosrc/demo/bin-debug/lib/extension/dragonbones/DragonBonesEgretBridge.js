var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="dragonBones.ts" />
///<reference path="../../egret/display/DisplayObject.ts" />
///<reference path="../../egret/display/DisplayObjectContainer.ts" />
///<reference path="../../egret/display/Bitmap.ts" />
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
var dragonBones;
(function (dragonBones) {
    (function (display) {
        var DragonBonesEgretBridge = (function () {
            function DragonBonesEgretBridge() {
            }
            DragonBonesEgretBridge.prototype.getVisible = function () {
                return this._display ? this._display.visible : false;
            };

            DragonBonesEgretBridge.prototype.setVisible = function (value) {
                if (this._display) {
                    this._display.visible = value;
                }
            };

            DragonBonesEgretBridge.prototype.getDisplay = function () {
                return this._display;
            };

            DragonBonesEgretBridge.prototype.setDisplay = function (value) {
                if (this._display == value) {
                    return;
                }
                if (this._display) {
                    var parent = this._display.parent;
                    if (parent) {
                        var index = parent.getChildIndex(this._display);
                    }
                    this.removeDisplay();
                }
                this._display = value;
                this.addDisplay(parent, index);
            };

            DragonBonesEgretBridge.prototype.dispose = function () {
                this._display = null;
            };

            DragonBonesEgretBridge.prototype.updateTransform = function (matrix, transform) {
                //                this._display.rotation = transform.getRotation() * 180 / Math.PI
                this._display.x = matrix.tx;
                this._display.y = matrix.ty;
                this._display.skewX = transform.skewX * DragonBonesEgretBridge.RADIAN_TO_ANGLE;
                this._display.skewY = transform.skewY * DragonBonesEgretBridge.RADIAN_TO_ANGLE;
                this._display.scaleX = transform.scaleX;
                this._display.scaleY = transform.scaleY;
            };

            DragonBonesEgretBridge.prototype.updateColor = function (aOffset, rOffset, gOffset, bOffset, aMultiplier, rMultiplier, gMultiplier, bMultiplier) {
                if (this._display) {
                    this._display.alpha = aMultiplier;
                    //todo
                }
            };

            DragonBonesEgretBridge.prototype.updateBlendMode = function (blendMode) {
                //                console.log (blendMode);
                if (this._display) {
                    this._display.blendMode = egret.BlendMode.getBlendMode(blendMode);
                }
            };

            DragonBonesEgretBridge.prototype.addDisplay = function (container, index) {
                var parent = container;
                if (parent && this._display) {
                    if (this._display.parent) {
                        this._display.parent.removeChild(this._display);
                    }

                    if (index < 0) {
                        parent.addChild(this._display);
                    } else {
                        parent.addChildAt(this._display, Math.min(index, parent.numChildren));
                    }
                }
            };

            DragonBonesEgretBridge.prototype.removeDisplay = function () {
                if (this._display && this._display.parent) {
                    this._display.parent.removeChild(this._display);
                }
            };
            DragonBonesEgretBridge.RADIAN_TO_ANGLE = 180 / Math.PI;
            return DragonBonesEgretBridge;
        })();
        display.DragonBonesEgretBridge = DragonBonesEgretBridge;
    })(dragonBones.display || (dragonBones.display = {}));
    var display = dragonBones.display;

    (function (textures) {
        var EgretTextureAtlas = (function () {
            function EgretTextureAtlas(texture, textureAtlasRawData, scale) {
                if (typeof scale === "undefined") { scale = 1; }
                this.texture = texture;
                this.textureAtlasRawData = textureAtlasRawData;
                this._textureData = {};
                this.scale = scale;
                this.name = textureAtlasRawData[dragonBones.utils.ConstValues.A_NAME];
                this.parseData(textureAtlasRawData);
                this.spriteSheet = new egret.SpriteSheet(texture.bitmapData);
            }
            EgretTextureAtlas.prototype.getTexture = function (fullName) {
                var result = this.spriteSheet.getTexture(fullName);
                if (!result) {
                    var data = this._textureData[fullName];
                    result = this.spriteSheet.createTexture(fullName, data.x, data.y, data.width, data.height);
                }
                return result;
            };

            EgretTextureAtlas.prototype.dispose = function () {
                this.texture = null;
            };

            EgretTextureAtlas.prototype.getRegion = function (subTextureName) {
                throw new Error("error");
                //return new geom.Rectangle();
            };

            EgretTextureAtlas.prototype.parseData = function (textureAtlasRawData) {
                var l = textureAtlasRawData.SubTexture.length;
                for (var i = 0; i < l; i++) {
                    var data = textureAtlasRawData.SubTexture[i];
                    this._textureData[data.name] = data;
                }
            };
            return EgretTextureAtlas;
        })();
        textures.EgretTextureAtlas = EgretTextureAtlas;
    })(dragonBones.textures || (dragonBones.textures = {}));
    var textures = dragonBones.textures;

    (function (factorys) {
        var EgretFactory = (function (_super) {
            __extends(EgretFactory, _super);
            function EgretFactory() {
                _super.call(this);
            }
            /** @private */
            EgretFactory.prototype._generateArmature = function () {
                var armature = new dragonBones.Armature(new egret.DisplayObjectContainer());
                return armature;
            };

            /** @private */
            EgretFactory.prototype._generateSlot = function () {
                var slot = new dragonBones.Slot(new display.DragonBonesEgretBridge());
                return slot;
            };

            /** @private */
            EgretFactory.prototype._generateDisplay = function (textureAtlas, fullName, pivotX, pivotY) {
                var bitmap1 = new egret.Bitmap();
                bitmap1.texture = textureAtlas.getTexture(fullName);
                bitmap1.anchorOffsetX = pivotX;
                bitmap1.anchorOffsetY = pivotY;
                return bitmap1;
            };
            return EgretFactory;
        })(dragonBones.factorys.BaseFactory);
        factorys.EgretFactory = EgretFactory;
    })(dragonBones.factorys || (dragonBones.factorys = {}));
    var factorys = dragonBones.factorys;
})(dragonBones || (dragonBones = {}));
