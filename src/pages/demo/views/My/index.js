import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import DependRequest from '../../components/DependRequest'
import './index.scss'

const BigList = () => {
  const list = Array(10).fill({})

  return (<div>
    <ul>
      {list.map((item, index) => <li key={index}>{index}</li>)}
    </ul>
  </div>)
}

const My = (props) => {

  const id = props.match.params.id

  return (
    <div>
      {
        id
          ? (<Link to='/my'>
            <button>turn to My page</button>
          </Link>)
          : (<Link to='/my/10086'>
            <button>turn to id 10086 page</button>
          </Link>)
      }
      <p>My</p>
      {id && <p>id: {id}</p>}
      <Link to='/'>
        <button>Home</button>
      </Link>
      {/*<DependRequest />*/}
      <BigList />
    </div>
  )
}

My.propTypes = {
  match: PropTypes.object,
}

export default My
