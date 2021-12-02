import 'amfe-flexible'
import './index.scss'
import { vConsoleTools } from '@/utils/vConsole'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '@/store'

vConsoleTools()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
