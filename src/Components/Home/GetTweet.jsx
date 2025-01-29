import React, { useEffect, useState } from 'react';
import axios from "../../config/axios";

function GetTweet() {
  const [tweets, setTweets] = useState([]);
  const [userId, setUserId] = useState("");
  const [tweet_id, setTweet_id] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCommentPanel, setShowCommentPanel] = useState(false);
  const [addComment, setAddComment] = useState("");

  const fetchTweet = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/tweet");
      const formattedTweets = res.data.tweets.map(tweet => ({
        ...tweet,
        updatedAt: new Date(tweet.updatedAt).toLocaleString(),
      }));
      setTweets(formattedTweets);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setLoading(false);
    }
  };

  const showComments = async () => {
    const res = await axios.get(`/tweet/${tweet_id}/comments`);
    setComments(res.data.comments);
    setShowCommentPanel(true);
  };

  const add_Comment = async (e) => {
    e.preventDefault();
    await axios.post("/tweet/comment", {
      tweetId: tweet_id,
      newComment: addComment
    });
    setAddComment("");
    showComments();
  };

  useEffect(() => {
    fetchTweet();
  }, []);

  useEffect(() => {
    if (tweet_id) {
      showComments();
    }
  }, [tweet_id]);

  return (
    <div className="bg-green-100 min-h-screen w-full max-w-[1200px] mx-auto p-4 flex flex-col md:flex-row gap-4">

      {/* Tweet List Section */}
      <div className="flex-grow md:max-w-[60vw] max-h-screen overflow-y-auto">
        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : (
          tweets.map((tweet, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 mt-8 w-full">
              <h3 className="text-green-600 font-bold">{tweet.username}</h3>
              <p className="text-gray-800">{tweet.tweet}</p>
              <p className="text-gray-500 text-sm">{tweet.updatedAt}</p>
              <p className="text-green-500 font-semibold">LIKE: {tweet.likes}</p>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setTweet_id(tweet._id);
                  setUserId(tweet.userid);
                }}
              >
                comments
              </button>
            </div>
          ))
        )}
      </div>

      {/* Comment Panel Section (Pops out from the bottom) */}
      {showCommentPanel && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-50 p-4 shadow-lg w-full md:w-[35vw] max-h-[50vh] flex flex-col gap-1 transform transition-transform duration-300 ease-in-out translate-y-0">
          <button
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            onClick={() => {
              setShowCommentPanel(false);
              setTweet_id("");
            }}
          >
            Close
          </button>
          <h3 className="text-lg font-bold mb-2">Comments</h3>
          <div className="min-h-[31vh] relative overflow-y-auto">
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
              <input
                type="text"
                value={addComment}
                placeholder="Add comments"
                onChange={(e) => setAddComment(e.target.value)}
                className="border-2 border-green-400 p-2 flex-grow rounded-md"
              />
              <button className="border-2 border-green-400 p-2 rounded-md bg-green-500 text-white hover:bg-green-600">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetTweet;
