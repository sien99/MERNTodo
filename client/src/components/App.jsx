import React from 'react'
import PrivateRoute from './PrivateRoute'
import TodoApp from './TodoApp'
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './Auth';

const App = () => {
    return (
      <AuthProvider>
        <Router>
          <Switch>
            
            <PrivateRoute exact strict path="/todo-app" component={TodoApp} />
            <Auth />

          </Switch>  
        </Router>
      </AuthProvider>
    )
}

export default App
