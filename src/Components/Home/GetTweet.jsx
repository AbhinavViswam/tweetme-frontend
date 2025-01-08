import React, { useEffect, useState } from 'react'
import axios from "../../config/axios"
import { IoReload } from "react-icons/io5";

function GetTweet() {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTweet = async () => {
    setLoading(true)
    try {
      const res = await axios.get("/tweet")
      const formattedTweets = res.data.tweets.map(tweet => ({
        ...tweet,
        updatedAt: new Date(tweet.updatedAt).toLocaleString(),
      }));
      setTweets(formattedTweets);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTweet();
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen p-4 w-[50vw] max-h-screen overflow-y-auto relative">
      <button className='text-2xl absolute right-0 px-4' onClick={fetchTweet}><IoReload/></button>
      {loading ? (
        <div className="text-center mt-4">Loading...</div>
      ) : (
        tweets.map((tweet, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 mt-12">
            <h3 className="text-green-600 font-bold">{tweet.username}</h3>
            <p className="text-gray-800">{tweet.tweet}</p>
            <p className="text-gray-500 text-sm">{tweet.updatedAt}</p>
            <p className="text-green-500 font-semibold">LIKE: {tweet.likes}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default GetTweet