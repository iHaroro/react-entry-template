import React  from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { demoApiServer } from '@/api/demo'
import './index.scss'

const My = (props) => {

  const id = props.match.params.id
  demoApiServer().then(res => {
    console.log('success', res)
  }).catch(err => {
    console.log('error', err)
  }).finally(() => {
    console.log('finally')
  })

  return (
    <div>
      {
        id
          ? (<Link to="/my">
            <button>turn to My page</button>
          </Link>)
          : (<Link to="/my/10086">
            <button>turn to id 10086 page</button>
          </Link>)
      }
      <p>My</p>
      {id && <p>id: {id}</p>}
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  )
}

My.propTypes = {
  match: PropTypes.object,
}

export default My