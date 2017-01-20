## 必要环境

- EgretWing v3.2.5或者以上
- EgretEngine v3.2.3或者以上

## 快速开始

下面通过一个简单的缓动动画来说明如何使用动画功能。

![](http://xzper.qiniudn.com/2016/12/animation/17.gif)

### 创建EUI项目和皮肤文件

从项目创建向导中选择创建一个Egret EUI项目。

创建一个AnimationSkin.exml的皮肤文件。设置皮肤的类名为"skins.AnimationSkin"

![](http://xzper.qiniudn.com/2016/12/animation/18.png)

在**设计模式**下拖拽添加一个新的按钮到皮肤文件中。

![](http://xzper.qiniudn.com/2016/12/animation/01.png)

由于动画涉及到改变组件的旋转属性，建议将锚点设置到中心，设置按钮的宽高和描点属性。

![](http://xzper.qiniudn.com/2016/12/animation/19.png)


**TIPS:** 尽量不要给要添加动画的目标对象设置自动布局(left, right, top, bottom, horizontalCenter，verticalCenter)属性。这些属性可能会使对象的x, y, widht, height属性失效，如果动画里面涉及到改变这些属性的值，那么动画的表现也会出现异常。


### 切换到动画模式

EgretWing v3.2.5的EXML编辑器新增了一个动画模式。 动画模式的入口在编辑器的模式切换按钮组上。

![](http://xzper.qiniudn.com/2016/12/animation/02.png)

在动画模式下，下面的Panel面板中会多一个动画面板。

![](http://xzper.qiniudn.com/2016/12/animation/03.png)

请记住这个重要的面板，动画的添加，编辑和预览都将在这个面板上完成。

**TIPS:** 一些行为在动画模式下将会被禁用或者限制。 例如在动画模式下，无法删除/复制/粘贴显示对象，对应的快捷键也会失效。 在**非关键帧状态下**也无法设置显示对象的位置, 大小等属性。 如果要对显示对象进行操作请**切换到设计模式**或者**在关键帧下操作属性**。


### 添加动画组和动画

动画是以**组为单位**进行播放的，每个动画组可以为**多个显示对象**设置动画属性。

首先使用动画面板左下角的'+'按钮，添加一个动画组，并设置动画组的id，这里设置id为tweenGroup。

![](http://xzper.qiniudn.com/2016/12/animation/04.png)

接下来为动画组添加第一个动画。 但是可以发现动画那一栏的添加按钮是灰色不可用的。 在添加动画之前需要先选中一个显示对象，指定动画对应的目标才能添加动画。 

这里以刚刚添加的按钮为例，先在编辑区选中该按钮。

![](http://xzper.qiniudn.com/2016/12/animation/05.png)

此时动画面板上动画那一栏的添加按钮已经可以操作了。

![](http://xzper.qiniudn.com/2016/12/animation/06.png)

点击添加按钮将会为该对象添加一个动画。

![](http://xzper.qiniudn.com/2016/12/animation/07.png)

“button”是这个按钮的id。 如果目标对象没有设置id属性则会自动创建一个，否则使用用户设置的id。 

### 编辑动画属性

每个动画对应一个动画时间轴，通过在时间轴上**添加关键帧**和**缓动行为**来改变目标对象在不同时刻的属性。 此时时间轴上还没有关键帧和动画行为。

![](http://xzper.qiniudn.com/2016/12/animation/08.png)

#### 添加关键帧

首先在时间轴上1s的位置点击右键选择“添加关键帧”。

![](http://xzper.qiniudn.com/2016/12/animation/09.png)

添加完成后时间轴上会使用 “■” 符号表示这是一个关键帧。

![](http://xzper.qiniudn.com/2016/12/animation/10.png)

在关键帧的位置可以设置对象的大小，位置，缩放，旋转，透明度等属性。 与设计模式类似，可以**在编辑区操作显示对象**或者**在右侧的属性面板**中可以设置关键帧属性。

![](http://xzper.qiniudn.com/2016/12/animation/11.png)

这里我们根据动画的在该时刻的状态，设置了Y，缩放，透明度，旋转，缓动函数等属性。 注意：如果关键帧的属性不填留空则表示不对该属性做改变。

![](http://xzper.qiniudn.com/2016/12/animation/12.png)

#### 创建补间动画

有了关键帧还不够，动画在关键帧的时候会直接将目标属性设置成关键帧的值。 如果要让目标对象”动“起来，需要添加一个补间动画。

在关键帧的位置或者之前的某一时刻右键选择“创建补间动画”。

![](http://xzper.qiniudn.com/2016/12/animation/13.png)

时间轴上将会使用“●”标记补间动画的开头和结束，“→”标记这一段是补间动画。

![](http://xzper.qiniudn.com/2016/12/animation/14.png)

由于在添加补间动画的位置之前没有其他的关键帧，所以该段补间动画的开头是开始0时刻的位置。

这样就创建了一个持续1s的补间动画，动画会不停设置目标的属性动起来。

#### 修改关键帧位置和补间动画时间

如果要改变关键帧或者补间动画的起始位置或者持续时间，可以直接在时间轴上左右拖拽关键帧的位置。

![](http://xzper.qiniudn.com/2016/12/animation/15.gif)

### 预览动画

动画编辑完成后可以通过**拖拽时间轴上的时间戳**或者**直接点击时间轴下方的播放按钮**预览动画。

![](http://xzper.qiniudn.com/2016/12/animation/16.png)

### 代码中调用

最终的皮肤文件：

AnimationSkin.exml

    <?xml version="1.0" encoding="utf-8"?>
	<e:Skin class="skins.AnimationSkin" width="400" height="300" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" xmlns:tween="egret.tween.*">
		<w:Declarations>
			<tween:TweenGroup id="tweenGroup">
				<tween:TweenItem target="{button}">
					<tween:Wait duration="500"/>
					<tween:To duration="500">
						<tween:props>
							<e:Object y="{200}" scaleX="{1.5}" scaleY="{1.5}" rotation="{180}" alpha="{0.5}"/>
						</tween:props>
					</tween:To>
				</tween:TweenItem>
			</tween:TweenGroup>
		</w:Declarations>
		<e:Button id="button" label="按钮" x="193" y="35" width="100" height="50" anchorOffsetX="50" anchorOffsetY="25"/>
	</e:Skin>


在项目中，通过以下代码，当用户点击按钮的时候播放该动画组中的动画：

AnimationPanel.ts

	class AnimationPanel extends eui.Component {
		constructor() {
			super();
			// 设置当前面板的皮肤
			this.skinName = skins.AnimationSkin;
		}
	
		/**
		 * EXML中对应id为tweenGroup的动画组对象
		 */
		public tweenGroup: egret.tween.TweenGroup;
	
		/**
		 * EXML中对应id为button的按钮对象
		 */
		public button: eui.Button;
	
		/**
		 * 动画组播放完成
		 */
		private onTweenGroupComplete(): void {
			console.log('TweenGroup play completed.');
		}
	
		/**
		 * 动画组中的一项播放完成
		 */
		private onTweenItemComplete(event: egret.Event): void {
			const item = event.data as egret.tween.TweenItem;
			console.log(item.target);
			console.log('TweenItem play completed.');
		}
	
		/**
		 * 当点击按钮时播放动画
		 */
		private onButtonClick(): void {
			this.tweenGroup.play();
			//this.tweenGroup.play(0);从头播放
		}
	
		protected createChildren(): void {
			super.createChildren();
			this.tweenGroup.addEventListener('complete', this.onTweenGroupComplete, this);
			this.tweenGroup.addEventListener('itemComplete', this.onTweenItemComplete, this);
			this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		}
	}


最后如果对动画的实现感兴趣可以研究下EXML中关于动画的部分，以及在GitHub上可以找到动画实现的源代码：

https://github.com/egret-labs/egret-core/blob/master/src/extension/tween/TweenWrapper.ts

