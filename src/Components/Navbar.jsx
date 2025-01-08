import React, { useEffect, useState } from 'react';
import axios from "../config/axios"

function Navbar() {
    const [loading, setLoading] = useState(true);
    const [userData,setUserData]=useState([])
    const fetchUser = async () => {
        setLoading(true)
        try {
            const res = await axios.get("/user/profile");
            setUserData(res.data.o)
        } catch (error) {
            console.error("Error fetching user profile:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);
    console.log(userData)

    return (
        <div className='w-[20vw] flex flex-col items-center py-4 mt-4 h-screen'>
            <h1 className='text-xl mb-4 font-instagram text-green-600'>Tweet Me</h1>
            <div className='w-[19vw] h-screen bg-green-50 rounded-md'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {userData.fullname}
                    </div>
                )}
            </div>
        </div>
    );
}

export { Navbar };