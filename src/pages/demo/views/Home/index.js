import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Toast } from 'zarm'
import { plus, reduce } from '@/store/modules/counter'
import { useToggle, useUpdate, useMount, useUnmount, useUpdateEffect } from 'ahooks'
import './index.scss'
import 'highlight.js/styles/atom-one-dark.css'

const Home = props => {
  const [toggleState, { toggle }] = useToggle(false)

  return (
    <div data-components="HomePageComponents" className="page-content">
      {/* ROUTER DEMO */}
      <Link to="/my">
        <button className="btn">turn to My page</button>
      </Link>
      {/* REDUX DEMO */}
      <p>count is: {props.count}</p>
      <button className="btn m-r-10" onClick={props.plus}>plus</button>
      <button className="btn m-r-10" onClick={props.reduce}>reduce</button>
      {/* ali hooks DEMO */}
      <button className="btn m-r-10" onClick={() => {
        toggle()
      }}>
        toggle components
      </button>
      {toggleState && <DemoComponent />}
      {/* CSS PX2REM DEMO */}
      <p>移动端</p>
      <div className="px-2-rem-item bg-gray w-375">375px</div>
      <div className="px-2-rem-item bg-gray w-750">750px</div>
      <div className="px-2-rem-item bg-gray w-100 h-100">100*100</div>
    </div>
  )
}

const DemoComponent = () => {
  const update = useUpdate()

  // 组件首次渲染时
  useMount(() => {
    Toast.show('组件挂载')
  })

  // 组件被卸载时
  useUnmount(() => {
    Toast.show('组件卸载')
  })

  // 依赖更新时（组件首次渲染时，不触发）
  useUpdateEffect(() => {
    Toast.show('组件依赖更新')
  })

  return (
    <div style={{ background: 'red' }}>
      <div>component, now date: {Date.now()}</div>
      <button className="btn" onClick={update}>force update date</button>
    </div>
  )
}

Home.propTypes = {
  count: PropTypes.number,
  plus: PropTypes.func,
  reduce: PropTypes.func,
}

const mapStateToProps = state => ({
  'count': state.counter.count,
})

const mapDispatchToProps = dispatch => ({
  plus: () => dispatch(plus()),
  reduce: () => dispatch(reduce()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
