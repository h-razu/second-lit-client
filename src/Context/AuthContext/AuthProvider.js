import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import app from '../../Firebase/Firebase.config';

export const authContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();

    const [loading, setLoading] = useState(true);


    //sign up with email and password
    const signUpWithEmail = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    //for adding profile image and name
    const profileUpdate = (profileInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profileInfo);
    }

    //email pass sign in
    const emailPassSignIn = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    }

    //google sign In
    const googleProvider = new GoogleAuthProvider()

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    //set user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => {
            return unsubscribe();
        }
    }, [])

    const authValue = {
        user,
        loading,
        signUpWithEmail,
        profileUpdate,
        emailPassSignIn,
        googleSignIn,
        logOut
    }


    return (
        <authContext.Provider value={authValue}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;