import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Navbar } from "../Components/index";
import { Home } from "../Components/Home/Home";
import Messages from "../Components/Messages/Messages";
import UserAuth from "../auth/UserAuth";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

function AppRoutes() {
  const [showMessages, setShowMessages] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <UserAuth>
              <div className="flex flex-col md:flex-row gap-3 pt-16 relative md:bg-green-100">
                {/* Navbar */}
                <div className="w-full md:w-[30%]"> {/* Set a fixed width for Navbar */}
                  <Navbar />
                </div>

                {/* Main content layout */}
                <div className="flex w-full md:w-[60%] relative bg-green-100">
                  <div className="w-full md:w-[75%]">
                    <Home />
                  </div>
                  {/* Messages Panel for md and larger screens */}
                  <div className="hidden md:block md:w-[25%]">
                    <Messages />
                  </div>
                </div>
              </div>

              {/* Message toggle button for small screens */}
              <button
                className="block md:hidden fixed top-16 right-4 z-50 p-3 bg-green-500 text-white rounded-full shadow-lg"
                onClick={() => setShowMessages(!showMessages)}
              >
                <MessageCircle size={28} />
              </button>

              {/* Messages Panel for small screens */}
              <div 
                className={`fixed top-0 right-0 w-4/5 sm:w-3/5 h-full bg-white transition-transform transform md:hidden ${
                  showMessages ? "translate-x-0" : "translate-x-full"
                } z-40 shadow-lg overflow-y-auto`}
              >
                <Messages />
              </div>
            </UserAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
