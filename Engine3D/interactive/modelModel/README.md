
## 模型与模型碰撞


### 原理：模型与模型碰撞其实就是检测各个面是否有相交。

这里为了更好的理解，我们将点想象成一个稍微大些的球。

* 未碰撞：

	![image](575cd7d233cc3.png)

* 碰撞：

	![image](575cd7d24143c.png)

### api：

~~~
intersect ( target :egret3d.Bound, intersect :egret3d.Bound ):boolean
~~~

~~~
target:egret3d.Bound — 检测的目标
intersect:egret3d.Bound — 默认参数为null 相交的结果 可以为null
~~~

### 示例：

```
var result:boolean = cube.bound.intersect(ball.bound);

```

```
* cube：一个方形模型
* intersect：检测方法
* ball：球形模型
* result： 是否碰撞，true 碰撞，false 未碰撞

```

