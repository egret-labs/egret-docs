# 微端缓存策略

* index.html 不会被缓存，每次都会从服务器读取.
* 不想被缓存的资源，可以通过增加随机值的方法来请求

例如：

```
var xhr = new XMLHttpRequest();
xhr.open('GET', './manifest.json?v=' + Math.random(), true);
```

* 微端支持服务器的缓存策略，比如`Cache-Control:max-age=age`,
微端的资源只有超出了`max-age`设置的过期时间以后，才会向服务器发送资源的更新请求。此外，在过期以后，如果服务器上的资源没有发生变化，微端不会重新下载这个资源。只有资源发生变化时，才会重新下载。

# 将文件的缓存头放到本地
当您把资源放在 app 中之后，可以通过服务器缓存策略来更新本地资源。
比如通过服务器的`Cache-Control` 来更新 `main.min.js` 文件，只需要将一个对应的 `main.min.js_headerFile` 头文件放到 `main.min.js` 同一目录即可。
下面来介绍一下如何获得 `main.min.js_headerFile` 头文件。

## 1. 微端缓存所在的位置

### 1.1 微端游戏的包名

假设在Egret Launcher中生成本地微端工程的时候填入到应用包名的名字为GetHeaderDemo，那么，该应用的完整包名为org.egret.launcher.GetHeaderDemo。

### 1.2. 微端游戏应用在Android上的安装目录

假设微端游戏的完整包名为org.egret.launcher.GetHeaderDemo，那么，该应用在Android上的安装目录为/data/data/org.egret.launcher.GetHeaderDemo/。

### 1.3 微端游戏缓存目录

在微端游戏应用的安装目录下有一个默认的files文件夹；在该文件夹下面，有一个微端创建的games文件夹。games文件夹按照游戏名称将相应的缓存文件保存到该目录下。

游戏名称是根据游戏地址获得的。举例来说，假设游戏地址为http://tool.egret-labs.org/Weiduan/game/index.html，那么，该游戏的名称就为game。由此可知，游戏名称就是游戏地址中最后面那个文件的父级目录的名字。

由此可知，游戏地址为http://tool.egret-labs.org/Weiduan/game/index.html且完整包名为为org.egret.launcher.GetHeaderDemo的游戏应用会将游戏缓存文件保存到如下目录中：/data/data/org.egret.launcher.GetHeaderDemo/files/games/game/。

## 2. 获取游戏缓存头文件

微端会将从服务器请求的资源文件按照URL中的目录关系保存到游戏缓存目录中。使用adb命令，可以从 Android 模拟器上将相应的文件夹中的内容拉取下来。如果想要把/data/data/org.egret.launcher.GetHeaderDemo/files/games/game/ 文件夹拉取下来，其命令如下：

```
adb root
adb pull /data/data/org.egret.launcher.GetHeaderDemo/files/games/game/ ./
```

第一条命令是为了使 adb 处于 root 模式，从而有权限访问微端应用的数据（部分电脑上不需要该命令）。

第二条命令则是将 Android 设备上指定的文件夹拉取到当前目录。

得到相应的文件夹后，进入该文件夹，就可以发现每个文件都对应一个header文件。举例来说，main.min.js文件对应的header文件为main.min.js_headerFile。

**注意**0.1.1版本只能拉取单一的 header 文件。0.1.2版本开始可以拉取整个文件夹。


## 微端支持的服务器缓存策略

## 一、支持的http缓存字段
### 1.1 Cache-Control字段及取值清单

```
Cache-Control:no-cache
Cache-Control:no-store
Cache-Control:max-age=age

```
对于其他取值，微端则会通过下面的Date字段、Expires字段和Last-Modified字段等信息计算缓存是否有效。

其中，

```
Cache-Control:no-cache
```
表示禁用缓存；

```
Cache-Control:no-store
```
表示不存储任何信息；

```
Cache-Control:max-age=age
```
表示缓存在age时间内有效，age的取值为数字，单位为秒。

### 1.2 Pragma字段及取值清单

```
Pragma:no-cache
```
表示禁用缓存，为HTTP1.0的标准优先级低于
```
Cache-Control:no-cache
```
### 1.3 Date字段及取值清单

```
Date:HTTP-date
```
表示响应是在HTTP-date所代表的时间生成的。例如：

```
Date: Tue, 15 Nov 1994 08:12:31 GMT
```
表示的是响应是在Tue, 15 Nov 1994 08:12:31 GMT生成的。

### 1.4 Expires字段及取值清单

```
Expires:HTTP-date
```
表示缓存在HTTP-date所代表的的时间之后失效。例如：

```
Expires: Thu, 01 Dec 1994 16:00:00 GMT
```
表示缓存是在Thu, 01 Dec 1994 16:00:00 GMT之后失效。

如果不存在

```
Cache-Control:max-age=age
```
和
```
Expires:HTTP-date
```
字段，那么，微端会使用Date字段和Last-Modified字段等信息计算缓存是否有效。

### 1.5 Last-Modified字段及取值清单

```
Last-Modified:HTTP-date
```
表示资源在服务器上的最后修改时间。例如：
```
Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT
```
表示资源在服务器上的最后修改时间是Tue, 15 Nov 1994 12:45:26 GMT。

### 1.6 ETag字段及取值清单
```
ETag:entity-tag
```
表示资源在服务器上的唯一标志，entity-tag是一个服务器能够理解的值。

## 二、使用说明

为了合理的利用资源，减少不必要的流量消耗，服务器端应该合理的配置响应头字段，从而使得微端和浏览器能够更加高效的使用缓存资源。

### 2.1 设置缓存的有效期

使用

```
Cache-Control:max-age=age
```
和
```
Expires:HTTP-date
```
都可以设置缓存的有效期，但是，一个是HTTP 1.1标准，一个是HTTP 1.0标准，并且，如果两个同时出现，那么，前者的优先级高于后者。推荐使用前者或者两者同时配置。如果不配置，那么，微端和浏览器就会自己计算有效期，这样的话，不利于实现服务器和客户端的紧密配合。因此，推荐设置缓存的有效期。

### 2.2 设置Last-Modified和ETag

当缓存失效的时候，微端和浏览器会将这两个值加入到请求头中，使服务器能够高效的判断资源是否过期，从而决定是返回304，还是返回200。

推荐配置Last-Modified和ETag。如果两者同时出现，服务器会优先使用ETag进行处理。
