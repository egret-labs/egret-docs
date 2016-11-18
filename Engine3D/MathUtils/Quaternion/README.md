3D基本变换
===============

## 四元数（egret3d.Quaternion） ##

* multiply():两个四元数相乘
	* 两个四元数乘法运算之后的结果，为叠加后的旋转

----------

	var quat1:egret3d.Quaternion = new egret3d.Quaternion(2, 3, 4, 1);
	var quat2:egret3d.Quaternion = new egret3d.Quaternion(4, 6, 8, 1);

	//乘法运算
	quat1.multiply(quat1, quat2);
	
	//quat1
	//w	-57	Number
	//x	6	Number
	//y	9	Number
	//z	12	Number

---------

* normalize():单位化一个四元数;
	* 将四元数的四个分量缩放至长度为指定的标准，默认为1
	
----------

	var quat1:egret3d.Quaternion = new egret3d.Quaternion(2, 3, 4, 1);
	//单位化
	quat1.normalize();
	
	//quat1
	//w	0.18257418583505536	Number
	//x	0.3651483716701107	Number
	//y	0.5477225575051661	Number
	//z	0.7302967433402214	Number

---------

* transformVector():四元数转换一个3D坐标点
	* 按照四元数所描述的规则，对3D点坐标进行旋转，得到旋转后的位置信息
	
----------

	var quat1:egret3d.Quaternion = new egret3d.Quaternion(2, 3, 4, 1);
	var point:egret3d.Vector3D = new egret3d.Vector3D(10, 10, 10, 1);

	//乘法运算
	quat1.normalize();
	quat1.transformVector(point, point);
	
	//point
	//w	1	Number
	//x	1.9999999999999991	Number
	//y	9.999999999999996	Number
	//z	13.999999999999996	Number


---------

* fromAxisAngle(): 创建一个以指定轴旋转一定角度的四元数;
	* 重新设置该四元数的xyzw数据，使其表达的意思为以axis轴为中心旋转angle角
	
----------

	var quat:egret3d.Quaternion = new egret3d.Quaternion();
	var axis:egret3d.Vector3D = new egret3d.Vector3D(10, 10, 10, 1);
	var angle:number = 45 / 180 * Math.PI;
	axis.normalize();
	//赋值四元数
	quat.fromAxisAngle(axis, angle);
	
	//quat
	//w	0.9999765121745486	Number
	//x	0.003957065378313664	Number
	//y	0.003957065378313664	Number
	//z	0.003957065378313664	Number



---------

* toAxisAngle():以指定axis为旋转轴，获得对应旋转角度;

----------

	var quat:egret3d.Quaternion = new egret3d.Quaternion(2, -1, 1, 1);
	var axis:egret3d.Vector3D = new egret3d.Vector3D(10, 10, 10, 1);
	
	axis.normalize();
	quat.normalize();
	//根据传入的旋转轴，获得旋转角度
	var angle:number = quat.toAxisAngle(axis);
	
	//angle: 135.58469140280704

---------

* slerp():两个四元数之间球形插值，插值之间提供旋转恒定角变化率
	* 在四元数a和四元数b之间，输入0-1之间的参数t，获得圆滑变化插值数据
	* 可用于骨骼动画关节旋转的插值
	
----------

	var quat1:egret3d.Quaternion = new egret3d.Quaternion(2, -1, 1, 1);
	var quat2:egret3d.Quaternion = new egret3d.Quaternion(-1, 4, 10, 1);
	
	quat1.normalize();
	quat2.normalize();

	var result:egret3d.Quaternion = new egret3d.Quaternion();
	//做插值计算
	result.slerp(quat1, quat2);

---------

* lerp():两个四元数之间线形插值
 
----------

	var quat1:egret3d.Quaternion = new egret3d.Quaternion(2, -1, 1, 1);
	var quat2:egret3d.Quaternion = new egret3d.Quaternion(-1, 4, 10, 1);
	
	quat1.normalize();
	quat2.normalize();

	var result:egret3d.Quaternion = new egret3d.Quaternion();
	//做插值计算
	result.lerp(quat1, quat2);

---------

* fromEulerAngles():根据传入的x/y/z三轴的旋转(欧拉角)，生成四元数数据
 
----------

	var quat:egret3d.Quaternion = new egret3d.Quaternion();
	var angleX:number = 10;
	var angleY:number = 140;
	var angleZ:number = -20;
	//欧拉角转换成四元数对象
	quat.fromEulerAngles(angleX, angleY, angleZ);
	
---------

* toEulerAngles():转换四元数对象到欧拉角
 
----------

	var quat:egret3d.Quaternion = new egret3d.Quaternion(2, -1, 1, 1);
	var angleVector3D:egret3d.Vector3D = new egret3d.Vector3D();
	quat.normalize();
	//四元数对象转换成欧拉角
	quat.toEulerAngles(angleVector3D);
	//angleVector3D
	//w	0	Number
	//x	146.3099324740202	Number
	//y	-58.99728086612599	Number
	//z	-33.69006752597977	Number

---------

* toMatrix3D():转换这个四元数旋转信息至一个4X4的矩阵中。
 
----------

	var quat:egret3d.Quaternion = new egret3d.Quaternion(2, -1, 1, 1);
	var matrix:egret3d.Matrix4_4 = new egret3d.Matrix4_4();
	quat.normalize();
	//四元数对象转换成3D矩阵
	quat.toMatrix3D(matrix);
	//matrix
	//[0]	0.4285714328289032	Number
	//[1]	-0.2857142984867096	Number
	//[2]	0.8571428656578064	Number
	//[3]	0	Number
	//[4]	-0.8571428656578064	Number
	//[5]	-0.4285714328289032	Number
	//[6]	0.2857142984867096	Number
	//[7]	0	Number
	//[8]	0.2857142984867096	Number
	//[9]	-0.8571428656578064	Number
	//[10]	-0.4285714328289032	Number
	//[11]	0	Number
	//[12]	0	Number
	//[13]	0	Number
	//[14]	0	Number
	//[15]	1	Number


---------

* fromToRotation():计算由一个向量变换到另一个向量的四元数
	* 获得向量a至向量b的变换的旋转信息，用四元数的形式表达
 
----------

	var quat:egret3d.Quaternion = new egret3d.Quaternion();
	var direction1:egret3d.Vector3D = new egret3d.Vector3D(-1,0,2,1);
	var direction2:egret3d.Vector3D = new egret3d.Vector3D(10,5,1,1);
	direction1.normalize();
	direction2.normalize();
	//求出旋转四元数
	quat.fromToRotation(direction1, direction2);
	//quat
	//w	0.5836404565967115	Number
	//x	-0.34131419516801636	Number
	//y	0.7167597945339911	Number
	//z	-0.1706570848183054	Number

	quat.transformVector(direction1, direction1);
	//使用四元数旋转单位化之后的向量1，所得的结果和向量2对比：
	//	direction1
	//	w	1	Number
	//	x	0.8908708047027715	Number
	//	y	0.4454354229276571	Number
	//	z	0.08908706666455851	Number
	//	direction2
	//	w	1	Number
	//	x	0.8908708063747479	Number
	//	y	0.44543540318737395	Number
	//	z	0.0890870806374748	Number

---------
