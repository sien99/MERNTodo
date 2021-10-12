import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'



const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    // use firebase to set cUser
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // Return Promise<firebase.auth.UserCredential>
    // to be used in signup.jsx
    // 1. Sign up 
    const signup  = (email, password) => {
      return auth.createUserWithEmailAndPassword(email, password);
    }

    // 2. Login
    const login = (email, password) => {
      return auth.signInWithEmailAndPassword(email, password);
    }

    // 3. Logout
    const logout = () => {
      return auth.signOut();
    }
    
    // 4. Reset Pw
    const resetPassword = (email) => {
      return auth.sendPasswordResetEmail(email)
    }

    // 5. Update Dashboard
    const updateEmail = (email) => {
      return currentUser.updateEmail(email)
    }

    const updatePassword = (password) => {
      return currentUser.updatePassword(password)
    }

    const updateName = (name) => {
      return currentUser.updateProfile({
        displayName: name
      });
    }
    useEffect(() => {
      //onAuthSC return a function to unsub user
      //mount
      const unsubscribe = auth.onAuthStateChanged(user =>{
        setCurrentUser(user)
        setLoading(false)
      });
      //only return when unmount (stop rendering?)
      return unsubscribe;
    
    }, [])

    // render value inside context

    const value ={
      currentUser,
      signup,
      login,
      logout,
      resetPassword,
      updateEmail,
      updatePassword,
      updateName
    }

    return (
      // return currentUser to provider in order to use it anywhere
      // in our app
      <AuthContext.Provider value={value}>
        {/* render children when done loading */}
        {!loading && children}
      </AuthContext.Provider>
    )
}


