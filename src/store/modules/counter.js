// 规范详见README.MD
export const moduleName = 'redux-example'
export const reducerName = 'counter'

// action types
// 命名规则 moduleName/reducerName/actionType
const PLUS = `${moduleName}/${reducerName}/PLUS`
const REDUCE = `${moduleName}/${reducerName}/REDUCE`

// state
const initialState = {
  count: 0,
}

// reducer
// 必须使用 export default 返回的命名为 reducer 的函数
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case PLUS: {
      return {
        count: state.count + 1,
      }
    }
    case REDUCE: {
      return {
        count: state.count - 1,
      }
    }
    default: {
      return state
    }
  }
}

// actions
// 必须用 `export` 输出函数形式的 action creators
export const plus = () => ({ type: PLUS })

export function reduce () {
  return { type: REDUCE }
}

