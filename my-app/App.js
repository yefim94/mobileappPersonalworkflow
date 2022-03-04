import { useState } from "react"
import { View } from "react-native"
import {Dashboard} from "./screens/Dashboard"
import  {Login}  from "./screens/Login"
import {  onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";
export default function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
        }
    })
    return unsubscribe
  }, [])
 
  return (
    <>
        {user ?
         <Dashboard /> :
         <Login />}
    </>
    )
}