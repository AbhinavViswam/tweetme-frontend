import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Navbar } from "../Components/index";
import { Home } from "../Components/Home/Home";
import Messages from "../Components/Messages/Messages";
import UserAuth from "../auth/UserAuth";

function AppRoutes() {
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
              <div className="flex flex-col md:flex-row gap-3 pt-16">
                {/* Navbar */}
                <div className="w-full md:w-[30%]"> {/* Set a fixed width for Navbar */}
                  <Navbar />
                </div>

                {/* Main content layout with Home (75%) and Messages (25%) */}
                <div className="flex w-full md:w-[50%]">
                  <div className="w-full md:w-[75%]">
                    <Home />
                  </div>
                  <div className="w-full md:w-[25%] mt-10">
                    <Messages />
                  </div>
                </div>
              </div>
            </UserAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
