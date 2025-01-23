import { BrowserRouter ,Routes, Route } from "react-router-dom";
import {Login ,Register,Navbar} from "../Components/index"
import {Home} from "../Components/Home/Home"
import Messages from "../Components/Messages/Messages";
import UserAuth from "../auth/UserAuth";

function AppRoutes(){
    return(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={ <UserAuth>
                <div className="flex gap-3">
                    <Navbar/>
                    <Home/>
                    <Messages/>
                </div>
               </UserAuth> } />
        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes