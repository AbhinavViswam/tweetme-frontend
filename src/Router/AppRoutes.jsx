import { BrowserRouter ,Routes, Route } from "react-router-dom";
import {Login ,Register} from "../Components/index"
import {Home} from "../Components/Home/Home"

function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<Home/>} />
        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes