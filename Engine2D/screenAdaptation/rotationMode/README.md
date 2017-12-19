## 2.旋转模式

通过设置旋转模式，可以在浏览器因为重力感应发生旋转的时候，让内容根据要求变化。

![](5639734349718.png)

可以在 index.html 里的 body 部分修改 `data-orientation` 属性

也可以在项目代码里随时修改，如：
```
this.stage.orientation = egret.OrientationMode.AUTO;
```

旋转模式目前有4种。

### 2.1.auto 模式
![](563973426403f.png)

auto 模式：不管横屏还是竖屏，都是从上到下的显示内容。

### 2.2.portrait 模式
![](563973427ed9a.png)
portrait 模式：始终以竖屏状态下手机的左上角为起点显示内容

### 2.3.landscape 模式
![](563973428c02c.png)
landscape 模式和 portrait 模式 类似，是始终以竖屏状态下手机的右上角为起点显示内容。

### 2.4.landscapeFlipped 模式
![](563973429935d.png)
landscapeFlipped 模式比较特殊，横屏状态下和 landscape 起点相同，竖屏状态下起点位置和 landscape 相反，从右上方变成了左下方。

landscape 和 landscapeFlipped 这两种模式，一般用于横屏游戏，但需要提示用户关闭重力感应锁，锁定屏幕方向。