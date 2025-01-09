import React, { useEffect, useState } from 'react';
import axios from "../config/axios";


function Navbar() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    
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

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className='w-full md:max-w-[25vw] flex flex-col items-center py-4 mt-4 h-screen bg-green-100'>
            <h1 className='text-2xl mb-4 font-bold text-green-600 font-instagram'>Tweet Me</h1>
            <div className='max-w-[24vw] md:w-full bg-white rounded-lg shadow-md p-4'>
                {loading ? (
                    <p className='text-center text-green-600'>Loading...</p>
                ) : (
                    <div className='flex flex-col items-center'>
                        <div className='w-20 h-20 md:w-24 md:h-24 border-4 border-green-600 rounded-full overflow-hidden mb-4'>
                                <img src={userData.profilePicture} alt={"No Picture Added"} className='w-full h-full object-cover'/>
                        </div>
                        <p className='text-lg font-semibold text-green-800'>{userData.fullname}</p>
                        <p className='text-sm text-green-600'>@{userData.username}</p>
                        <div className='flex justify-around w-full mt-4'>
                            <div className='text-center'>
                                <p className='text-lg font-bold text-green-800'>{userData.follower_count}</p>
                                <p className='text-sm text-green-600'>Followers</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-lg font-bold text-green-800'>{userData.following_count}</p>
                                <p className='text-sm text-green-600'>Following</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-lg font-bold text-green-800'>{userData.tweet.length}</p>
                                <p className='text-sm text-green-600'>Posts</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export { Navbar };