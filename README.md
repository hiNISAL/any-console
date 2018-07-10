# any-console

轻量的用于移动设备真机调试的虚拟控制台。
无需任何修改，无缝接入项目。

Console for mobile devices. Without any modification, just need include `any-console`.

## 安装 Install
`npm i any-console -S`

## 使用 Usage

浏览器中使用 Browser
```
// html
<script src="any-console.js"></script>

// js
new AnyConsole();
```

commonjs
```
const ac = require('any-console');

new ac();
```

es module
```
import ac from 'any-console';

new ac();
```

## 配置项 Options

- defaultPanel
  - 默认显示的面板 The default panel
  - 类型(type) : `string`
  - 默认值(default value) : `console`
  - 有效值(effective values)
    - `console`
    - `network`
    - `cookie`
    - `LocalStorage`
    - `SessionStorage`

- toggleBtnStyle
  - 自定义切换按钮的样式 To custom the toggle button style
  - 类型(type) : `Object`
  - 默认值(default value) : {}
  - 有效值(effective values)
    - Object : (CSS STYLE)

## github

https://github.com/hiNISAL/any-console.git

## 计划 TODOS

- [] Network
- [] Cookie
- [] LocalStorage
- [] SessionStorage
