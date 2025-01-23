import React, { useEffect, useState } from 'react'
import axios from "../../config/axios"
import { IoReload } from "react-icons/io5";

function GetTweet() {
  const [tweets, setTweets] = useState([])
  const [userId,setUserId]=useState("")
  const [following,setFollowing]=useState([])//the idea is to arrange my followings in this array and then hide follow button of all users who are in the array and also make conversation id if the user follows other....
  const [tweet_id,setTweet_id]=useState("")
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [showCommentPanel, setShowCommentPanel] = useState(false)
  const [addComment,setAddComment]=useState("")

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

  const showComments = async () => {
    const res = await axios.get(`/tweet/${tweet_id}/comments`)
    setComments(res.data.comments)
    setShowCommentPanel(true)
  }

  const add_Comment=async(e)=>{
    e.preventDefault();
    await axios.post("/tweet/comment",{
      tweetId:tweet_id,
      newComment:addComment
    })
    setAddComment("")
    showComments()
  }

  const follow=async(e)=>{
    e.preventDefault();
    await axios("/user/follow",{
      
    })
  }

  useEffect(() => {
    fetchTweet();
  }, [])

  useEffect(()=>{
    if(tweet_id){
      showComments()
    }
  },[tweet_id])

  return (
    <div className="bg-gray-100 min-h-screen p-4 w-[39vw] max-h-screen overflow-y-auto relative">
      <button className='text-2xl absolute right-0 px-4' onClick={fetchTweet}><IoReload /></button>
      {loading ? (
        <div className="text-center mt-4">Loading...</div>
      ) : (
        tweets.map((tweet, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 mt-12 min-w-full min-h-[90vh]">
            <h3 className="text-green-600 font-bold">{tweet.username}</h3>
            <p className="text-gray-800">{tweet.tweet}</p>
            <p className="text-gray-500 text-sm">{tweet.updatedAt}</p>
            <p className="text-green-500 font-semibold">LIKE: {tweet.likes}</p>
            {/* <p>{tweet.userid}</p> */}
            <button className="text-blue-500 hover:underline" onClick={() => {
              setTweet_id(tweet._id)
              setUserId(tweet.userid)
              }}>comments</button>
          </div>
        ))
      )}
      {showCommentPanel && (
        <div className="bg-green-50 fixed bottom-0 p-4 shadow-lg min-h-[50vh] max-h-[50vh] min-w-[39vw] max-w-[39vw] flex flex-col gap-1">
            <button className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => {
              setShowCommentPanel(false)
              setTweet_id("")
            }
            }>Close</button>
            <h3 className="text-lg font-bold mb-2">Comments</h3>
          <div className='min-h-[31vh] relative overflow-y-auto'>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="mb-2 p-2 border-b border-gray-300">
                  <p className="font-semibold">{comment.username}</p>
                  <p className="text-gray-800">{comment.comment}</p>
                  <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No comments available</p>
            )}
          </div>
          <div className="mt-2">
            <form onSubmit={add_Comment} className="flex gap-2">
              <input type="text" value={addComment} placeholder='Add comments' onChange={(e)=>setAddComment(e.target.value)} className='border-2 border-green-400 p-2 flex-grow rounded-md'/>
              <button className='border-2 border-green-400 p-2 rounded-md bg-green-500 text-white hover:bg-green-600'>Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GetTweet