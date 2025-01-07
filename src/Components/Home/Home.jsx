import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GetTweet from './GetTweet'

function Home() {
    const navigate=useNavigate()
 useEffect(() => {
    const token= localStorage.getItem('token')
    if(!token){
        navigate("/login")
    }
 }, [])
  return (
    <div>
        <GetTweet/>
    </div>
  )
}

export {Home}