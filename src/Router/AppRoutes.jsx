import { BrowserRouter ,Routes, Route } from "react-router-dom";
import {Login ,Register,Navbar} from "../Components/index"
import {Home} from "../Components/Home/Home"
import Messages from "../Components/Messages/Messages";

function AppRoutes(){
    return(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={ 
                <div className="flex gap-3">
                    <Navbar/>
                    <Home/>
                    <Messages/>
                </div>
                } />
        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes