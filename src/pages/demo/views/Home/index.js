import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { plus, reduce } from '@/store/modules/counter'
import './index.scss'

const Home = props => {
  return (
    <div>
      <div className="bg-red w-375">375px</div>
      <div className="bg-red w-750">750px</div>
      <div className="bg-red w-100 h-100">100*100</div>
      <p>count is: {props.count}</p>
      <button className="btn m-r-10" onClick={props.plus}>plus</button>
      <button className="btn m-r-10" onClick={props.reduce}>reduce</button>
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
