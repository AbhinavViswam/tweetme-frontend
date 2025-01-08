import { BrowserRouter ,Routes, Route } from "react-router-dom";
import {Login ,Register,Navbar} from "../Components/index"
import {Home} from "../Components/Home/Home"

function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={ 
                <div className="flex gap-3">
                    <Navbar/>
                    <Home/>
                </div>
                } />
        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes