EgretWing使用惰性加载的方式加载插件，当插件需要被激活时才会调用插件定义的 `activate` 方法。通过插件的 [`package.json`](../../../Wing/plugin/configDes/README.md) 的 `activationEvents` 字段，提供一个上下文表示插件何时被激活。目前支持下列的激活事件：

* [`onLanguage:${language}`](#activationeventsonlanguage)
* [`onCommand:${command}`](#activationEvents.onCommand)
* [`workspaceContains:${toplevelfilename}`](#activationeventsworkspacecontains)
* [`*`](#activationEvents.*)

## activationEvents.onLanguage

当打开对应语言的文档时触发该事件，例如

```json
...
"activationEvents": [
	"onLanguage:python"
]
...
```

## activationEvents.onCommand

当一个命令 `command` 被执行时将触发该事件， 例如:

```json
...
"activationEvents": [
	"onCommand:extension.sayHello"
]
...
```

## activationEvents.workspaceContains

当工作空间中包含指定文件时触发该事件，例如：

```json
...
"activationEvents": [
	"workspaceContains:.editorconfig"
]
...
```

## activationEvents.*

当EgretWing启动时将触发该事件， 例如:

```json
...
"activationEvents": [
	"*"
]
...
```