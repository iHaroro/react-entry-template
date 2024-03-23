import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { store } from '@/store'
import { vConsoleTools } from '@utils/vConsole'
import App from './App'

import './index.scss'
import 'amfe-flexible'

vConsoleTools()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
