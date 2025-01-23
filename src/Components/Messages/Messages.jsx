import React, { useEffect, useState, useContext } from 'react';
import axios from "../../config/axios";
import { UserContext } from '../../context/UserContext';

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [myMessages, setMyMessages] = useState([]);
  const [message, setMessage] = useState();
  const { user } = useContext(UserContext);

  async function fetchConvos() {
    try {
      const res = await axios.get("/user/m/allconversations");
      console.log(res.data.o);
      setConversations(res.data.o);
    } catch (err) {
      console.error("Error fetching conversations", err);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchConvos();
    setLoading(false);
    console.log(user)
  }, []);

  const openSidebar = (conversation) => {
    setSelectedConversation(conversation);
    console.log("id:", conversation._id)
    setSelectedConversationId(conversation._id)
    setSidebarVisible(true);
  };

  const fetchMessages = async () => {
    const res = await axios.get(`/user/m/${selectedConversationId}`)
    setMyMessages(res.data.o)
    console.log(res.data.o)
  }

  const addMessage=async()=>{
    
  }

  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages();
    }
    else {
      console.log("no messages found")
    }
  }, [selectedConversationId])

  const closeSidebar = () => {
    setSidebarVisible(false);
    setSelectedConversation(null);
  };

  return (
    <div className="flex">

      <div className="max-w-[30vw] min-h-screen max-h-screen px-4 py-3 overflow-y-auto">
        <h1 className="text-center text-green-500 font-bold text-lg py-4">MESSAGES</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          conversations.map((item, i) => (
            <div
              key={i}
              className="msg-box min-w-[25vw] max-w-[30vw] flex gap-4 py-2"
            >
              <div className="w-12 h-12 md:w-12 md:h-12 border-2 border-green-600 rounded-full overflow-hidden mb-4">
                <img
                  src={item.profilePicture}
                  alt={"No Picture Added"}
                  className="object-cover"
                />
              </div>
              <button
                className="flex flex-col relative items-center"
                onClick={() => openSidebar(item)}
              >
                <h3 className="text-green-600 text-lg font-semibold">{item.fullname}</h3>
                <h5 className="opacity-50 text-xs absolute top-5">{item.username}</h5>
              </button>
            </div>
          ))
        )}
      </div>

      {sidebarVisible && (
        <div className="sidebar w-[30vw] h-screen bg-gray-100 shadow-lg p-4 fixed right-0 top-0 z-50 flex flex-col">
          <button
            className="text-red-500 font-bold float-right"
            onClick={closeSidebar}
          >
            Close
          </button>
          {selectedConversation && (
            <div className="flex-grow">
              <h2 className="text-green-600 text-lg font-bold">
                Chat with {selectedConversation.fullname}
              </h2>
              <p className="text-gray-600">@{selectedConversation.username}</p>
              {myMessages ? (
                <div>
                  {myMessages.map((item, i) => (
                    <div
                      key={i}
                      className={`p-2 border-b flex ${item.sender === user[0].username ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${item.sender === user[0].username
                            ? "bg-green-100 text-right"
                            : "bg-gray-100 text-left"
                          }`}
                      >
                        <p className="font-semibold text-green-600">
                          {item.sender === user[0].username ? "You" : item.sender}
                        </p>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p>No Messages yet...</p>
                </div>
              )}
            </div>
          )}
          {/* Message Typing Form */}
          <form className="mt-auto flex items-center border-t p-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Messages;
