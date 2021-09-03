# React.v17 + Webpack.v5 多路口H5项目模板

## 项目的基础处理方案

* 基于 `Postcss` 的处理
  * `px2rem` 做 px 转 rem
  * `autoprefixer` 自动添加产商前缀
* 基于 `lib-flexible` 做的H5适配方案
* 基于 `babel-loader` 做的jsx处理
* 基于 `mini-css-extract-plugin` 做的css独立抽离

## 关于多入口配置

多入口配置路径在 `config/webpack.utils.js` 中的 `devPages` 配置项，开发阶段配置空数组则会编译 `src/pages` 目录下全部入口模块。

因此建议在开发阶段仅配置需要开发的模块，以提升编译效率。

### devPages参数
`devPages`: `string[]` 参数为 `src/pages` 目录下的每个独立的react项目模块名（`src/pages/***` 文件夹）。

## END
理论上来说 `src/pages` 目录下的项目都是独立的，也可以集成别的项目（比如Vue等），也可在 `src/` 目录下可以存放项目通用组件、工具类通用样式等通用资源。



