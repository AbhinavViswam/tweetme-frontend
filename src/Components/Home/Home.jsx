import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetTweet from './GetTweet'

function Home() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate("/login")
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }, [navigate])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-xl font-semibold">Loading...</div>
    </div>
  }

  return (
    <div className="home-container max-w-[45vw]">
      <GetTweet />
    </div>
  )
}

export { Home }