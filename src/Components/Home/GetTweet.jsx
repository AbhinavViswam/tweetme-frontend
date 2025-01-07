import React, { useEffect, useState } from 'react'
import axios from "../../config/axios"

function GetTweet() {
  const [tweets,setTweets]=useState([])
  const fetchTweet=async()=>{
    const res=await axios.get("/tweet")
    setTweets(res.data.tweets)
   }
    useEffect(()=>{
     fetchTweet();
    },[])
  return (
    <div>
     {tweets.map((tweet,index)=>(
      <div key={index}>
        <h3>{tweet.username}</h3>
       <p>{tweet.tweet}</p>
        <p>{tweet.updatedAt}</p>
        <p>LIKE:{tweet.likes}</p>
      </div>
     ))}
    </div>
  )
}

export default GetTweet