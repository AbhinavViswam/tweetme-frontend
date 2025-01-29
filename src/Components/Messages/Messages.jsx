import React, { useEffect, useState, useContext } from 'react';
import axios from "../../config/axios";
import { UserContext } from '../../context/UserContext';
import "../../index.css"

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [myMessages, setMyMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const { user } = useContext(UserContext);
  const messagesEndRef = React.useRef(null);
  const chatContainerRef = React.useRef(null); 

  async function fetchConvos() {
    try {
      const res = await axios.get("/user/m/allconversations");
      setConversations(res.data.o);
    } catch (err) {
      console.error("Error fetching conversations", err);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchConvos();
    setLoading(false);
  }, []);

  const openSidebar = (conversation) => {
    setSelectedConversation(conversation);
    setSelectedConversationId(conversation._id);
    setSidebarVisible(true);
  };

  const fetchMessages = async () => {
    const res = await axios.get(`/user/m/${selectedConversationId}`);
    setMyMessages(res.data.o);
  };

  const addMessage = async (e) => {
    e.preventDefault();
    await axios.post(`/user/m/${selectedConversationId}/sent`, {
      Text: message,
    });
    fetchMessages();
    setMessage("");
  };

  useEffect(() => {
    let interval;
    if (selectedConversationId) {
      fetchMessages();
      interval = setInterval(fetchMessages, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [selectedConversationId]);

  const closeSidebar = () => {
    setSidebarVisible(false);
    setSelectedConversation(null);
    setSelectedConversationId(null);
  };

  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [myMessages, autoScroll]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;
      setAutoScroll(isAtBottom); 
    }
  };

  return (
    <div className="flex flex-col md:flex-row overflow-y-auto overflow-x-hidden">
      <div className="max-w-full md:max-w-[30vw] min-h-screen px-4 py-3 overflow-y-auto  overflow-x-hidden">
        <h1 className="text-center text-green-500 font-bold text-lg py-4">
          MESSAGES
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          conversations.map((item, i) => (
            <div
              key={i}
              className="msg-box min-w-full md:min-w-[25vw] max-w-full md:max-w-[30vw] flex gap-4 py-2"
            >
              <div className="w-12 h-12 border-2 border-green-600 rounded-full overflow-hidden mb-4">
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
                <h3 className="text-green-600 text-lg font-semibold">
                  {item.fullname}
                </h3>
                <h5 className="opacity-50 text-xs absolute top-5">
                  {item.username}
                </h5>
              </button>
            </div>
          ))
        )}
      </div>

      {sidebarVisible && (
        <div className="sidebar w-full md:w-[30vw] h-screen bg-gray-100 shadow-lg p-4 fixed right-0 top-0 z-50 flex flex-col">
          <button
            className="text-red-500 font-bold float-right"
            onClick={closeSidebar}
          >
            Close
          </button>
          {selectedConversation && (
            <div className="flex-grow h-screen">
              <h2 className="text-green-600 text-lg font-bold">
                Chat with {selectedConversation.fullname}
              </h2>
              <p className="text-gray-600">@{selectedConversation.username}</p>
              {myMessages ? (
                <div
                  className="border border-green-500 min-h-[75vh] max-h-[75vh] overflow-y-auto"
                  ref={chatContainerRef} 
                  onScroll={handleScroll} 
                >
                  {myMessages.map((item, i) => (
                    <div
                      key={i}
                      className={`p-2 border-b flex ${
                        item.sender === user[0].username
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          item.sender === user[0].username
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
                  <div ref={messagesEndRef}></div>
                </div>
              ) : (
                <div>
                  <p>No Messages yet...</p>
                </div>
              )}
            </div>
          )}
          <form
            className="mt-auto flex items-center border-t p-2"
            onSubmit={addMessage}
          >
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
