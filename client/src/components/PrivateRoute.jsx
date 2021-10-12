//* Private Route is to prevent user to enter dashboard without auth
import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

//* Wrapper of current route
const PrivateRoute = ({ component: Component, ...rest }) => {
    
    const { currentUser } = useAuth()
    
    return (
        <Route
          {...rest} /* all of the rest of props routes */
          render={props => {
              return currentUser ? <Component {...props} /> : 
              <Redirect to="/login" />
          }}
        >
        
        </Route>
        
    )
}

export default PrivateRoute
