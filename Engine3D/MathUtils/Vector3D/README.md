3D基本变换
===============

## 3D向量（Vector3D） ##

该类有x/y/z/w四个成员变量，可用作记录3D坐标/3D向量/四元数。w可用作xyz的缩放分量，或该对象为四元数时候存放第四个数据。

* add():加法运算，用当前数据的x/y/z分别加上输入数据的x/y/z，结果存入target中
	* x/y/z三个分量各自相加

----------
	var vector1:egret3d.Vector3D = new egret3d.Vector3D(1, 0, 0, 0);
	var vector2:egret3d.Vector3D = new egret3d.Vector3D(0, 0, 1, 0);

	var result:egret3d.Vector3D = new egret3d.Vector3D();
	//加法运算后的结果存储在result中。
	vector1.add(vector2, result);

	//result: (1, 0, 1, 0);

---------

* incrementBy():加法运算，将当前数据的x/y/z分别加上输入数据的x/y/z

----------
	var vector1:egret3d.Vector3D = new egret3d.Vector3D(1, 0, 0, 0);
	var vector2:egret3d.Vector3D = new egret3d.Vector3D(0, 0, 1, 0);

	
	//vector1加上vector2数据
	vector1.incrementBy(vector2);

	//vector1: (1, 0, 1, 0);

---------

* subtract():减法运算，用当前数据的x/y/z分别减去输入数据的x/y/z，结果存入target中

----------
	var vector1:egret3d.Vector3D = new egret3d.Vector3D(1, 0, 0, 0);
	var vector2:egret3d.Vector3D = new egret3d.Vector3D(0, 0, 1, 0);

	var result:egret3d.Vector3D = new egret3d.Vector3D();
	//加法运算后的结果存储在result中。
	vector1.subtract(vector2, result);

	//result: (1, 0, -1, 0);

---------

* decrementBy():减法运算，将当前数据的x/y/z分别减去输入数据的x/y/z

----------
	var vector1:egret3d.Vector3D = new egret3d.Vector3D(1, 0, 0, 0);
	var vector2:egret3d.Vector3D = new egret3d.Vector3D(0, 0, 1, 0);

	
	//vector1减去vector2数据
	vector1.decrementBy(vector2);

	//vector1: (1, 0, -1, 0);

---------

* crossProduct():叉乘, a·b=|a|·|b|·cos(a,b),(a,b)表示a,b的夹角;
	* 通过叉乘计算可以获得一个垂直于ab所在平面的方向，在a和b为单位向量的情况下，所得结果也为单位向量。


![](crossProduct.jpg)

----------



	var vector1:egret3d.Vector3D = new egret3d.Vector3D(1, 0, 0, 0);
	var vector2:egret3d.Vector3D = new egret3d.Vector3D(0, 1, 0, 0);
	var result:egret3d.Vector3D = new egret3d.Vector3D();
	
	//vector1加上vector2数据
	vector1.crossProduct(result);

	//result: (0, -1, 0, 1);

---------

* dotProduct():点乘,a*b=ax*bx + ay*by + az*bz;
	* 点积也叫做内积，计算的结果反应出2个向量之间的夹角关系。
	* a和b为单位向量时候，结果为夹角的余弦值。

----------



	var vector1:egret3d.Vector3D = new egret3d.Vector3D(1, 0, 0, 0);
	var vector2:egret3d.Vector3D = new egret3d.Vector3D(0, 1, 0, 0);
		
	//vector1加上vector2数据
	var result:number = vector1.dotProduct(result);

	//result: 0; (vector1和vector2夹角的余弦值为0)

---------


* negate():取反;
	* 取反操作为x/y/z三轴数据各自乘以-1

----------

	var vector1:egret3d.Vector3D = new egret3d.Vector3D(1, 0, 0, 0);
	//取反操作
	vector1.negate();

	//vector1: (-1, 0, 0, 0);

---------


* normalize():标准化
	* 在不改变向量方向的条件下，改变向量长度为指定的值

----------

	var vector1:egret3d.Vector3D = new egret3d.Vector3D(1, 2, 3, 0);
	//标准化
	vector1.normalize(1);
	
	//w	0	Number
	//x	0.2672612419124244	Number
	//y	0.5345224838248488	Number
	//z	0.8017837257372732	Number


---------


* slerp():四元数平滑插值
	* 输入一个0-1之间的参数，在四元数a和四元数b的之间平滑插值获得新的向量
	* 可用于骨骼旋转计算的两个关键帧之间插值运算

----------

	var vector1:egret3d.Vector3D = new egret3d.Vector3D(1, 0, 0, 1);
	var vector2:egret3d.Vector3D = new egret3d.Vector3D(0, 1, 0, 1);
	//插值
	vector1.slerp(vector1, vector2, 0.2);
	
	//w	1	Number
	//x	0.9510565400123596	Number
	//y	0.30901700258255005	Number
	//z	0	Number



---------


* lerp():普通线性插值
	* 在向量a和向量b的之间线性插值获得新的向量，x/y/z三轴各自线性插值

----------

	var vector1:egret3d.Vector3D = new egret3d.Vector3D(1, 0, 0, 1);
	var vector2:egret3d.Vector3D = new egret3d.Vector3D(0, 1, 0, 1);
	//插值
	vector1.slerp(vector1, vector2, 0.2);
	
	//w	1	Number
	//x	0.8	Number
	//y	0.2	Number
	//z	0	Number


---------

* multiply():乘法运算;
	* 将向量a的xyz分量分别乘以向量b的xyz分量，结果存入target中

----------

	var vector1:egret3d.Vector3D = new egret3d.Vector3D(2, 3, 4, 1);
	var vector2:egret3d.Vector3D = new egret3d.Vector3D(4, 6, 8, 1);
	var result:egret3d.Vector3D = new egret3d.Vector3D();
	//乘法运算
	vector1.multiply(vector2, result);
	
	//result: (8, 18, 32, 1)


---------


* divided():除法运算，将向量a的x/y/z分量分别除以向量b的x/y/z分量，结果存入target中

----------

	var vector1:egret3d.Vector3D = new egret3d.Vector3D(2, 3, 4, 1);
	var vector2:egret3d.Vector3D = new egret3d.Vector3D(4, 6, 8, 1);
	var result:egret3d.Vector3D = new egret3d.Vector3D();
	//乘法运算
	vector1.divided(vector2, result);
	
	//result: (0.5, 0.5, 0.5, 1)

---------
