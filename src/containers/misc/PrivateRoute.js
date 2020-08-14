import { Route, Redirect } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props =>
          true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )
  }
}

PrivateRoute.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  component: PropTypes.func
}

function mapStateToProps(state) {
  return { token: state.keycloak.token }
}

export default connect(mapStateToProps)(PrivateRoute)
