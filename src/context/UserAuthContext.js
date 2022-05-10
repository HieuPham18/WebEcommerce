import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from '../config/firebase'

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState("")
    // sign up
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // Login
    function logIn(email, password) {
        console.log("email: ", email)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //logout
    function logOut() {
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth", currentUser);
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    console.log(user)

    return (
    <userAuthContext.Provider value={{ user, signUp, logIn, logOut }}>
        {children}
    </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}