import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
//https://stackoverflow.com/questions/69241381/property-auth-does-not-exist-on-type-firebaseapp-on-react

/*why use process.env no need require dotenv?
Only variables starting with REACT_APP_ are imported.
https://tacomanator.medium.com/environments-with-create-react-app-7b645312c09d*/
const app = firebase.initializeApp({
    // firebase config
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

// for auth
export const auth = app.auth()
// to use firebase in general project
export default app

