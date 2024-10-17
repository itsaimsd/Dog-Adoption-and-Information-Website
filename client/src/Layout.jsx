// src/Layout.jsx
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import axiosInstance from './Utils/AxiosInstance';

function Layout() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    // Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            console.log("User Info Response:", response); // Log the full response
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            console.error("Error in getUserInfo:", error); // Log the error
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.clear();
                    navigate("/login");
                } else {
                    console.error("Error fetching user info:", error.response.data);
                }
            } else {
                console.error("Network error or server not reachable:", error);
            }
        }
    };

    useEffect(() => {
        getUserInfo();
        return () => {};
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} />
            <Outlet />
            {/* <Footer /> */}
        </>
    );
}

export default Layout;
