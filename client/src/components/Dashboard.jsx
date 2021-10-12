import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext' 
import { Link, useHistory } from 'react-router-dom'
import LightbulbIcon from '@mui/icons-material/Lightbulb';



const Dashboard = () => {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth() 
    const [isPointed, setIsPointed] = useState(false)
    
    //*logout from useAuth so easy to replace auth method(firebase) to other
    const { history } = useHistory()

    const handleLogout = async () => {
        //TODO: 
        setError('')

        try { 
          await logout()
          history.push('/login')
        } catch  {
          setError('Failed to log out')
        }
    }
    

    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-3">
                Profile
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Nickname: </strong>{currentUser.displayName}<br />
            <strong>Email: </strong>{currentUser.email}<br />
            <strong>Apps: </strong><br />
            <Link to="/todo-app" 
              className="btn btn-primary mt-2"
              style={{minWidth:"100px", minHeight:"100px", backgroundColor:"#f5ba13", borderColor:"black", marginLeft:"37%",
              color: isPointed? "white":"grey"
              }}
              onMouseOver={()=>setIsPointed(true)}
              onMouseOut={()=>setIsPointed(false)}
              >
              <LightbulbIcon style={{minWidth:"50px",minHeight:"50px", marginTop:"15px"}} 
              />
              <br />Keeper
            </Link>
            <Link to="/update-profile" 
              className="btn btn-primary w-100 mt-3">
                Update Profile
            </Link>

          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
            Log Out</Button>
        </div>

      </>
    )
}

export default Dashboard
