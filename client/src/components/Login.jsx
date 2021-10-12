import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'


const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          setError('')
          setLoading(true) //to prevent user accidentally click multi times
          await login(emailRef.current.value, passwordRef.current.value)  
          history.push("/")
        } catch (error) {
            setError("Failed to sign in.")
        }
        setLoading(false)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4 mt-3">
                        Login
                    </h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="email" 
                            ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label className="mt-1">Password</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="password" 
                            ref={passwordRef} required />
                        </Form.Group>

                        <Button disabled={loading} className="w-100 text-center mt-3" style={{height:"50px"}} type="submit">
                        Login
                        </Button>

                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Login
