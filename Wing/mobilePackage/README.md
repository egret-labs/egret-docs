
## 打包工具说明

### 功能简介：
- 该插件可以快速方便地在对应移动平台下进行工程<font color=red>打包</font>
- 是对Egret EDN中[iOS APP打包方案](../../../Engine2D/publish/publishIOS/README.md), [Android APP打包](../../../Engine2D/publish/publishAndroid/README.md)中打包过程的集成
- 可导出<font color=red>测试包</font>和<font color=red>发行包</font>，前提是用户提供<font color=red>签名文件</font>。
- <font color=red>需先进行测试，验证无误后才能导出发行包。不经过测试直接导出发行包会被默认拒绝。</font>
- Debug打包：
  - 将egret项目转化成android／ios对应的native项目
  - 对native项目进行构建
   - android项目会得到.apk文件
   - ios项目会得到可在模拟器中运行的.app文件
  - android打包完成后会<font color=red>自动</font>去查找可连接的设备,多台设备会以列表形式排列，<font color=red>点击即可安装</font>
  - ios会自动启动<font color=red>模拟器</font>，在模拟器中运行。
- Release打包:
 - 会在Debug打包基础上，<font color=red>重新打包并签名</font>。
### 如何打开
![image](where.png)
### 使用说明
 ![image](android.png)
 
 * 1.选择目标平台，android（android studio、eclipse）和 ios
 	> ios 只能在 Mac 下才可以选择。
 * 2.选择操作类型，debug 和 release，其中仅提供android版本的release，ios在debug和release时请在执行完后在xcode中进行后续的操作
 * 3.对应的项目名称
 * 4.android sdk路径，设置到sdk即可。例：/Users/helloca/Documents/androidSDK/adt-bundle-mac-x86_64-20140702/sdk
 * 5.gradle路径，设置到bin即可。例：/Users/helloca/Documents/gradle-2.12/bin
	> 注：eclipse平台对应的是设置ant路径，设置到bin即可。例：/Users/helloca/Documents/apache-ant-1.9.7/bin
 * 6.android studio版本的support路径。例：/Users/helloca/Documents/egret-android-support-as
	> 注：eclipse平台对应的是eclipse版本的support路径
 * 7.签名文件所在路径，android发布时使用。
 * 8.签名文件的别名，android发布时使用。
 * 9.签名文件的key password，android发布时使用。
 * 10.签名文件的store password，android发布时使用。
 * 11.zipalign工具的路径，只需指明到其父路径即可，android发布时使用。例：/Users/helloca/Documents/androidSDK/adt-bundle-mac-x86_64-20140702/sdk/build-tools/22.0.1
 * 12.开始按钮，点击后开始执行相应的debug或者release操作
 * android工程debug时，会在构建完后自动查找连接的设备。如果查找到会自动安装apk文件。请确认设备是否连接并打开了usb调试功能，如果没有请在构建完成后手动安装。


![image](ios.png)

 * 1.选择对应的操作，debug、release
 * 2.ios版本的support路径
 
#### 注：
   * 路径中不能含有中文或者空格。
   * windows系统不建议将各项依赖放置在系统盘下。
   * ios构建完成后请使用xcode打开ios的项目，然后在xcode里点击测试或正式发布。
   * xcode测试建议直接连接真机测试。现在真机测试是免费的，不需要购买苹果开发者账号。
   * xcode正式发布时需提供正式的开发者账号和证书，请自行购买。

### 强制覆盖选项

![image](override.png)

* 当把项目拷贝到其他的电脑或者位置时，想继续进行打包测试。旧版本需要手动删除已有的项目记录，新增功能可自动删除已有记录，然后重新生成对应的工程。
* 导出时请关闭所有对native工程目录和文件的访问，以防止出现因占用而无法写入或者无法删除的情况，特别是windows下。
* 强制覆盖会将文件夹连同文件夹下内容全部删除，请慎重使用该功能。

### 设置导出项目路径和导出项目名

![image](output_help.png)

* 自行设置native项目的导出路径和导出名
> 导出前请确认指定目录下是否已有同名资源或者项目，以免引起资源误删
* 新增查看帮助文档按钮
> 说明:点击之后会在浏览器中打开帮助文档的链接

   
## 依赖条件：
### Android
#### 必需：
* 1.最新版egret engine [点击下载](http://www.egret.com/products/engine.html) 
* 2.android sdk [mac版下载](http://pan.baidu.com/s/1dD8WUL7) [windows版下载](http://pan.baidu.com/s/1gdsDRn9)
* 3.java sdk [mac版下载](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) [windows版下载](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

#### 以下两种方式任选其一：
* eclipse打包方式
	* 1.ant [点击下载](http://ant.apache.org/bindownload.cgi)
	
	* 2.eclipse版的egret-android-support [点击下载](http://www.egret.com/products/products-others.html#egret-support)
	
	
* android studio打包方式
	* 1.gradle [点击下载](https://services.gradle.org/distributions)
	
	* 2.android studio版本的egret-android-support [点击下载](http://www.egret.com/products/products-others.html#egret-support)

### iOS
* 1.egret engine [点击下载](http://www.egret.com/products/engine.html) 
* 2.egret-ios-support [点击下载](http://www.egret.com/products/products-others.html#egret-support)
* 3.xcode
 

## 使用流程:
# Debug模式
* 1.设置项目构建所依赖工具的路径。
 - android studio工程需要设置Gradle、Android Sdk、android stuido版本的support
 - eclipse工程需要设置 Android Sdk、Ant、eclipse版本的support
* ![image](1.png)
* ![image](2.png)
* 2.选择对应的版本构建选项 [<font color=red>eclipse</font>] or [<font color=red>android studio</font>]
* 3.生成<font color=red>debug</font>版本后测试




## 注意：
- 强烈建议在配置环境时不使用带有中文字符或带有空格的路径。
- 由于不同版本之间存在诸如api level匹配之类的问题，如出现不匹配时请自行设置。
- 使用<font color=red>wing</font>创建egret游戏后，执行命令会在<font color=red>同目录下</font>生成对应的android和ios项目(<font color=red>请在创建之前确认没有重名文件夹</font>)，目录结构如下：
 - --helloworld
 - --helloworld_android
   - android_studio
     - helloworld
   - eclipse
     - helloworld
 - --helloworld_ios
 - - helloworld


#### android
- android调试请<font color=red>打开usb调试</font>功能，否则电脑无法正确发现android设备并完成安装（某些android设备连接电脑时还需要在手机上确认哦）。
- android调试，工程编译完成后会<font color=red>自动</font>去检索设备，并在你选择的设备上自动安装app。你只需选择需要安装的设备即可。
  - ![image](577dcc5a98c4d.png)
  
#### ios
- 由于ios开发的特殊性，为了避免大家纠结在开发者证书，策略文件等的配置上，插件在Debug模式下只生成可以在模拟器中运行的app文件（此文件不可在真机安装，因为没有签名）。
- 插件生成app文件后会自动启动模拟器加载app文件（请确保安装模拟器）。
   
# Release模式
- 在Debug模式下通过测试，没问题之后才能执行Release
- 根据需要，选择不同的Release目标。
 - ![image](577dcc675a292.png)
##### android
 - android有两种模板：eclipse和android studio，请选择对应的发布模板。
 - ![image](577dcc676790f.png)
 - ![image](577dcc677bb4a.png)
##### ios
 - 请在装有Xcode的Mac电脑上使用该功能
 - ![image](577dcc678840d.png)
 ##### 说明:
  - signingIdentity:为开发者证书标识，
  ##### 获取方式:
   - Keychain Access->Certificates->选中证书后右键弹出菜单->Get Info->Common Name。
  类似于 iPhone Distribution:Company name Co.Ltd (xxxxxxxxxx)。<font color=red>包括括号里面那串字符</font>
  - provisonProfile:为策略文件的identifier。
  ##### 获取方式:
   - Xcode->Preferences->选中申请开发者证书的Apple ID->选中开发者证书->View Details->选中所需的mobileprovision文件
   ->右键菜单->Show in Finder->找到该文件后，除了该文件后缀名的字符串就是所需的identifier。
   - 在终端里执行以下命令，也可以查看其identifier。
   ```
   // -i后面是你自己的文件路径
   echo `/usr/libexec/PlistBuddy -c "Print UUID" /dev/stdin <<< $(/usr/bin/security cms -D -i /Users/helloca/Documents/iOS_Team_Provisioning_Profile_.mobileprovision)`
   ```
   
# Q&A
#### 在使用过程中，如果遇到问题，请到论坛发帖或联系相关人员(QQ：815612516)
## 下面是有同学遇到了的问题：
- ![image](577dcc763c91a.png)
  - 这可能是因为手动删除了项目，导致IDE在按照已有记录的路径去查找项目时失败。
    #### 解决方法：
      - 打开源项目，找到egretProperties.json文件，查看里面native字段下是否有android_path／ios_path
      - 如果有,将对应行删除掉，保存，然后重新按照流程导出即可。
        - ![image](577dcc7e6a4c4.png)
      - 也有可能是环境配置没有配好。请新建一个测试项目，按照流程走一次，看能否成功导出。
  - 有同学说：我并没有删除项目。
    #### 解决办法:
      - 请重启电脑再试着导出一下。（极特殊情况下，重启电脑之后就好了。）

- ![image](577dcc7e5a343.png)
  - 这是因为java环境变量配置不对引起的
    #### 解决方法：
    - 正确配置java环境变量，可参考博文:[http://jingyan.baidu.com/article/f96699bb8b38e0894e3c1bef.html](http://jingyan.baidu.com/article/f96699bb8b38e0894e3c1bef.html)




 
 



