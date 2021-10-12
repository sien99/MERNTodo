import React from 'react'
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TodoApp from './TodoApp'
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';


const Auth = () => {
    return (
      // <AuthProvider>
      //   <Router>
      
      //       {/**exclude App route from Container so Auth css x apply */}
      //       <PrivateRoute exact path="/todo-app" component={TodoApp} /> 
          
            <Container className="d-flex 
              align-items-center justify-content-center" 
              style={{ minHeight: "100vh"}}
              >

              <div className="w-100" style={{ maxWidth: "400px" }}> 

                {/* Must have exact root path else will load all */}
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                
                <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgot-password" component={ForgotPassword} />

                <Route path="*" component={()=>"404 NOT FOUND"} />
              </Switch>  
              </div>
            </Container>
            
    //     </Router>
    //  </AuthProvider>
    )
}

export default Auth
