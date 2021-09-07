import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Egg' })
  : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware), // other store enhancers if any
)

export const store = createStore(rootReducer, enhancer)
