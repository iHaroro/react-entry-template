import React, { Suspense } from 'react'
import PropType from 'prop-types'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

const CommonRouter = props => {
  const { routes } = props
  return (
    <Router>
      <Suspense fallback="loading">
        <Switch>
          {
            routes.map(route => {
              return route.children
                ? route.children.map(children => {
                  return <Route key={route.children} {...children} />
                })
                : <Route key={route.path} {...route} />
            })
          }
        </Switch>
      </Suspense>
    </Router>
  )
}

CommonRouter.propTypes = {
  routes: PropType.array,
}
CommonRouter.defaultProps = {
  routes: [],
}

export default CommonRouter
