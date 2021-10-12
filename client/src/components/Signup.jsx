import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation check
        if (passwordRef.current.value !== 
        passwordConfirmRef.current.value){
            return setError('Passwords do not match! Please enter correct confirmation password')
        }

        try {
          setError('')
          setLoading(true) //to prevent user accidentally click multi times
          await signup(emailRef.current.value, passwordRef.current.value)  
          history.push("/")
        } catch (error) {
            setError("Failed to create an account.")
        }
        setLoading(false)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4 mt-2">
                        Sign up
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
                            <Form.Label>Password</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="password" 
                            ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="password" 
                            ref={passwordConfirmRef} required />
    
                        </Form.Group>
                        <Button disabled={loading} className="w-100 text-center mt-3" style={{height:"50px"}} type="submit">
                        Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </>
    )
}

export default Signup
