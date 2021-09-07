# React.v17 + Webpack.v5 多路口 H5 项目模板

## 项目的基础处理方案

- 基于 `Postcss` 的处理
  - `px2rem` 做 px 转 rem
  - `autoprefixer` 自动添加产商前缀
- 基于 `lib-flexible` 做的 H5 适配方案
- 基于 `babel-loader` 做的 jsx 处理
- 基于 `mini-css-extract-plugin` 做的 css 独立抽离

## 关于多入口配置

多入口配置路径在 `config/webpack.utils.js` 中的 `devPages` 配置项，开发阶段配置空数组则会编译 `src/pages` 目录下全部入口模块。

因此建议在开发阶段仅配置需要开发的模块，以提升编译效率。

### devPages 参数

`devPages`: `string[]` 参数为 `src/pages` 目录下的每个独立的 react 项目模块名（`src/pages/***` 文件夹）。

### redux 采用 ducks 模式

因为每个redux的模块都是按照功能性去划分，而且每次添加`actionTypes`、`actions`、`reducer`这样的组合。

按照不同文件的方式拆分，甚至拆分到不同的文件夹，绝大部分情况下，只有极少部分情况下 reducer/actions 会用到对应的actions，所以将某一模块功能的代码封装于一个文件中会更加的方便。
当然这样的模式一定是要有明确的模块功能划分，以及命名规范，让 `store` 可更容易的抽离。

例子🌰

```javascript
export const moduleName = 'redux-example'
export const reducerName = 'counter'

// action types
const INCREMENT = `${moduleName}/${reducerName}/INCREMENT`

// init state
const initialState = {
  count: 0,
}

// reducer
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      const { count } = state
      return {
        count: count + 1,
      }
    default:
      return state
  }
}

// action creators
export function increment () {
  return { type: INCREMENT }
}

```

#### redux需要遵循以下代码风格

- `reducer` 函数必须用 `export default` 输出名为 `reducer` 的函数
  ```javascript
    export default function reducer (state, action){/*...*/}
  ```
- `action creators` 必须用 `export` 输出函数形式
  ```javascript
    export function increment () {
      return { type: INCREMENT }
    }
  ```
- 必须用 `npm-module-or-app/reducer/ACTION_TYPE` 的命名形式来命名 `action types`，因为到后期很多 `reducer`，防止命名冲突问题
  ```javascript
    const INCREMENT = 'someApp/counter/INCREMENT'
  ```

- 如果有外部的 `reducer` 需要监听这个 `action type` ，或者作为可重用的库发布时， 可以 用 `UPPER_SNAKE_CASE` 形式 `export` 它的 `action types`

## END

理论上来说 `src/pages` 目录下的项目都是独立的，也可以集成别的项目（比如 Vue 等），也可在 `src/` 目录下可以存放项目通用组件、工具类通用样式等通用资源。
