import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { IoCreateOutline, IoPersonCircleSharp } from "react-icons/io5";

function Navbar() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [postNewTweet, setPostNewTweet] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTweetBox, setShowTweetBox] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/user/profile");
      setUserData(res.data.o[0]);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const postTweet = async (e) => {
    e.preventDefault();
    await axios.post("/tweet/posttweet", { tweet: postNewTweet });
    setPostNewTweet("");
    setShowTweetBox(false); // Close the tweet box after posting
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {/* Sidebar for md+ screens */}
      <div className="hidden md:flex flex-col w-[25vw] h-screen bg-green-100 py-6 items-center gap-4 fixed left-0 top-0">
        <h1 className="text-2xl font-bold text-green-600">Tweet Me</h1>

        {/* User Profile Card */}
        <div className="w-[90%] bg-white rounded-lg shadow-md p-4">
          {loading ? (
            <p className="text-center text-green-600">Loading...</p>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 border-4 border-green-600 rounded-full overflow-hidden mb-4">
                <img
                  src={userData.profilePicture}
                  alt="No Picture Added"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg font-semibold text-green-800">{userData.fullname}</p>
              <p className="text-sm text-green-600">@{userData.username}</p>
              <div className="flex justify-around w-full mt-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-green-800">{userData.follower_count}</p>
                  <p className="text-sm text-green-600">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-800">{userData.following_count}</p>
                  <p className="text-sm text-green-600">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-800">{userData.tweet?.length}</p>
                  <p className="text-sm text-green-600">Posts</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Post Tweet Section */}
        <div className="w-[90%]">
          <form onSubmit={postTweet} className="flex flex-col gap-2">
            <textarea
              placeholder="What's happening?"
              value={postNewTweet}
              onChange={(e) => setPostNewTweet(e.target.value)}
              className="w-full h-[20vh] shadow-md outline-none p-3 rounded-lg"
            />
            <button className="text-md font-bold text-white bg-green-600 px-6 py-2 rounded-md shadow-md hover:bg-green-700">
              POST
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-green-100 flex justify-between items-center px-4 py-3 shadow-md">
        <h1 className="text-xl font-bold text-green-600">Tweet Me</h1>

        <div className="flex items-center gap-4">
          <button onClick={() => setShowTweetBox(true)} className="text-green-600 text-2xl">
            <IoCreateOutline />
          </button>
          <button onClick={() => setShowDropdown(!showDropdown)} className="text-green-600 text-2xl">
            <IoPersonCircleSharp />
          </button>
        </div>

        {/* Dropdown for user info on mobile */}
        {showDropdown && (
          <div className="absolute right-4 top-14 bg-white shadow-md p-4 rounded-md">
            {loading ? (
              <p className="text-center text-green-600">Loading...</p>
            ) : (
              <div className="text-center">
                <p className="text-lg font-semibold text-green-800">{userData.fullname}</p>
                <p className="text-sm text-green-600">@{userData.username}</p>
                <div className="flex justify-around w-full mt-2">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-800">{userData.follower_count}</p>
                    <p className="text-sm text-green-600">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-800">{userData.following_count}</p>
                    <p className="text-sm text-green-600">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-800">{userData.tweet?.length}</p>
                    <p className="text-sm text-green-600">Posts</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating "Tweet" Box for Mobile */}
      {showTweetBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-5/6">
            <h2 className="text-lg font-bold text-green-600 mb-2">Post a Tweet</h2>
            <form onSubmit={postTweet} className="flex flex-col gap-3">
              <textarea
                placeholder="What's happening?"
                value={postNewTweet}
                onChange={(e) => setPostNewTweet(e.target.value)}
                className="w-full h-[15vh] shadow-md outline-none p-3 rounded-lg"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowTweetBox(false)}
                  className="text-md font-bold text-red-600 bg-red-100 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-md font-bold text-white bg-green-600 px-6 py-2 rounded-md shadow-md hover:bg-green-700"
                >
                  POST
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export { Navbar };