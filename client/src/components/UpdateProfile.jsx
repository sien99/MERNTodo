import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
const supervillains = require("supervillains")

const UpdateProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const displayNameRef = useRef()
    const { currentUser, updateEmail, updatePassword, updateName } = useAuth()
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

        const promises = []
        setLoading(true)
        setError('')

        if (displayNameRef.current.value !== currentUser.displayName){
            promises.push(updateName(displayNameRef.current.value))
        }

        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
          history.push('/')
        }).catch(()=>{
          setError('Failed to update account')
        }).finally(()=>{
            setLoading(false)
        })

    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        Update Profile
                    </h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="displayName">
                            <Form.Label>Name</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="displayName" 
                            defaultValue={currentUser.displayName}
                            placeholder="Please enter your name"
                            ref={displayNameRef} />
                        </Form.Group>                    
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="email" 
                            defaultValue={currentUser.email}
                            ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="password" 
                            placeholder="Leave blank to keep the same"
                            ref={passwordRef} />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            {/* ref for POST value */}
                            <Form.Control type="password" 
                            placeholder="Leave blank to keep the same"
                            ref={passwordConfirmRef} />
    
                        </Form.Group>
                        <Button disabled={loading} className="w-100 text-center mt-2" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}


export default UpdateProfile
