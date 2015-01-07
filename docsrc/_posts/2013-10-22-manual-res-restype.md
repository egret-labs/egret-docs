---
layout: post
title:  "RES内置文件类型解析器"
permalink: post/manual/loader/restype.html
type: manual
element: manualloader
version: Egret引擎 v1.x
---

RES内置支持的文件类型有：

* RES.ResourceItem.TYPE_BIN(bin)：解析为原始的二进制文件
* RES.ResourceItem.TYPE_IMAGE(image)：解析为egret.Texture对象
* RES.ResourceItem.TYPE_TEXT(text)：解析为string变量
* RES.ResourceItem.TYPE_JSON(json)：解析为json对象
* RES.ResourceItem.TYPE_SHEET(sheet)：解析为egret.SpriteSheet对象
* RES.ResourceItem.TYPE_FONT(font)：解析为egret.BitmapTextSpriteSheet对象
* RES.ResourceItem.TYPE_SOUND(sound)：解析为egret.Sound对象
* RES.ResourceItem.TYPE_XML(xml)：解析为egret.Sound对象