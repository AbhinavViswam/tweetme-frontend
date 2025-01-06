import React, { useEffect } from 'react'
import axios from "../../config/axios"

function GetTweet() {
    useEffect(()=>{
        axios.get("/tweet",{
            
        }).then((res)=>{

        }).catch((err)=>{
            
        })
    },[])
  return (
    <div>

    </div>
  )
}

export default GetTweet