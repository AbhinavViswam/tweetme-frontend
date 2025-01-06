import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'

import axios from "../config/axios"
import "../index.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/user/login", {
      emailOrUsername: email,
      password
    })
    localStorage.setItem('token', res.data.token)
    navigate("/")
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-bold text-green-600 mb-8">Tweet Me</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold text-green-600 mb-6">Login</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email or Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
      <p className="mt-4 text-green-600">
        Not registered? <Link to="/register" className="text-green-800 underline">Register</Link>
      </p>
    </div>
  )
}

export { Login }
