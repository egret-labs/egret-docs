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
    * @class egret.DepthQueue
    * @classdesc
    * 显示列表嵌套深度排序队列
    */
    var DepthQueue = (function () {
        /**
        * @method egret.DepthQueue#constructor
        */
        function DepthQueue() {
            /**
            * 深度队列
            */
            this.depthBins = [];
            /**
            * 最小深度
            */
            this.minDepth = 0;
            /**
            * 最大深度
            */
            this.maxDepth = -1;
        }
        /**
        * 插入一个元素
        * @method egret.DepthQueue#insert
        * @param client {ILayoutManagerClient}
        */
        DepthQueue.prototype.insert = function (client) {
            var depth = client.nestLevel;
            var hashCode = client.hashCode;
            if (this.maxDepth < this.minDepth) {
                this.minDepth = this.maxDepth = depth;
            } else {
                if (depth < this.minDepth)
                    this.minDepth = depth;
                if (depth > this.maxDepth)
                    this.maxDepth = depth;
            }

            var bin = this.depthBins[depth];

            if (!bin) {
                bin = new DepthBin();
                this.depthBins[depth] = bin;
                bin.items[hashCode] = client;
                bin.length++;
            } else {
                if (bin.items[hashCode] == null) {
                    bin.items[hashCode] = client;
                    bin.length++;
                }
            }
        };

        /**
        * 从队列尾弹出深度最大的一个对象
        * @method egret.DepthQueue#pop
        * @returns {ILayoutManagerClient}
        */
        DepthQueue.prototype.pop = function () {
            var client = null;

            if (this.minDepth <= this.maxDepth) {
                var bin = this.depthBins[this.maxDepth];
                while (!bin || bin.length == 0) {
                    this.maxDepth--;
                    if (this.maxDepth < this.minDepth)
                        return null;
                    bin = this.depthBins[this.maxDepth];
                }
                var items = bin.items;
                for (var key in items) {
                    client = items[key];
                    this.remove(client, this.maxDepth);
                    break;
                }

                while (!bin || bin.length == 0) {
                    this.maxDepth--;
                    if (this.maxDepth < this.minDepth)
                        break;
                    bin = this.depthBins[this.maxDepth];
                }
            }

            return client;
        };

        /**
        * 从队列首弹出深度最小的一个对象
        * @method egret.DepthQueue#shift
        * @returns {ILayoutManagerClient}
        */
        DepthQueue.prototype.shift = function () {
            var client = null;

            if (this.minDepth <= this.maxDepth) {
                var bin = this.depthBins[this.minDepth];
                while (!bin || bin.length == 0) {
                    this.minDepth++;
                    if (this.minDepth > this.maxDepth)
                        return null;
                    bin = this.depthBins[this.minDepth];
                }

                var items = bin.items;
                for (var key in items) {
                    client = items[key];
                    this.remove(client, this.minDepth);
                    break;
                }

                while (!bin || bin.length == 0) {
                    this.minDepth++;
                    if (this.minDepth > this.maxDepth)
                        break;
                    bin = this.depthBins[this.minDepth];
                }
            }

            return client;
        };

        /**
        * 移除大于等于指定组件层级的元素中最大的元素
        * @method egret.DepthQueue#removeLargestChild
        * @param client {ILayoutManagerClient}
        * @returns {any}
        */
        DepthQueue.prototype.removeLargestChild = function (client) {
            var max = this.maxDepth;
            var min = client.nestLevel;
            var hashCode = client.hashCode;
            while (min <= max) {
                var bin = this.depthBins[max];
                if (bin && bin.length > 0) {
                    if (max == client.nestLevel) {
                        if (bin.items[hashCode]) {
                            this.remove(client, max);
                            return client;
                        }
                    } else {
                        var items = bin.items;
                        for (var key in items) {
                            var value = items[key];
                            if ((value instanceof egret.DisplayObject) && (client instanceof egret.DisplayObjectContainer) && client.contains(value)) {
                                this.remove(value, max);
                                return value;
                            }
                        }
                    }

                    max--;
                } else {
                    if (max == this.maxDepth)
                        this.maxDepth--;
                    max--;
                    if (max < min)
                        break;
                }
            }

            return null;
        };

        /**
        * 移除大于等于指定组件层级的元素中最小的元素
        * @method egret.DepthQueue#removeSmallestChild
        * @param client {ILayoutManagerClient}
        * @returns {any}
        */
        DepthQueue.prototype.removeSmallestChild = function (client) {
            var min = client.nestLevel;
            var hashCode = client.hashCode;
            while (min <= this.maxDepth) {
                var bin = this.depthBins[min];
                if (bin && bin.length > 0) {
                    if (min == client.nestLevel) {
                        if (bin.items[hashCode]) {
                            this.remove(client, min);
                            return client;
                        }
                    } else {
                        var items = bin.items;
                        for (var key in items) {
                            var value = items[key];
                            if ((value instanceof egret.DisplayObject) && (client instanceof egret.DisplayObjectContainer) && client.contains(value)) {
                                this.remove(value, min);
                                return value;
                            }
                        }
                    }

                    min++;
                } else {
                    if (min == this.minDepth)
                        this.minDepth++;
                    min++;
                    if (min > this.maxDepth)
                        break;
                }
            }

            return null;
        };

        /**
        * 移除一个元素
        * @method egret.DepthQueue#remove
        * @param client {ILayoutManagerClient}
        * @param level {number}
        * @returns {ILayoutManagerClient}
        */
        DepthQueue.prototype.remove = function (client, level) {
            if (typeof level === "undefined") { level = -1; }
            var depth = (level >= 0) ? level : client.nestLevel;
            var hashCode = client.hashCode;
            var bin = this.depthBins[depth];
            if (bin && bin.items[hashCode] != null) {
                delete bin.items[hashCode];
                bin.length--;
                return client;
            }
            return null;
        };

        /**
        * 清空队列
        * @method egret.DepthQueue#removeAll
        */
        DepthQueue.prototype.removeAll = function () {
            this.depthBins.length = 0;
            this.minDepth = 0;
            this.maxDepth = -1;
        };

        /**
        * 队列是否为空
        * @method egret.DepthQueue#isEmpty
        * @returns {boolean}
        */
        DepthQueue.prototype.isEmpty = function () {
            return this.minDepth > this.maxDepth;
        };
        return DepthQueue;
    })();
    egret.DepthQueue = DepthQueue;

    /**
    * @class egret.DepthBin
    * @classdesc
    * 列表项
    */
    var DepthBin = (function () {
        function DepthBin() {
            /**
            * @member egret.DepthBin#length
            */
            this.length = 0;
            /**
            * @member egret.DepthBin#items
            */
            this.items = [];
        }
        return DepthBin;
    })();
    egret.DepthBin = DepthBin;
})(egret || (egret = {}));
