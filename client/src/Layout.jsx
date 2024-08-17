import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Outlet, useNavigate} from 'react-router-dom'
import axiosInstance from './Utils/AxiosInstance'

function Layout() {

  const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    // Get User Info
    const getUserInfo = async () => {
        try{
            const response = await axiosInstance.get("/get-user");
            if(response.data && response.data.user){
                setUserInfo(response.data.user);

                // console.log(userInfo.fullname);
            }
        }
        catch (error){
            if(error.response.status == 401){
                localStorage.clear();
                navigate("/login");
            }
        }
        
    };

    

    useEffect(()=>{
        getUserInfo();
        return () => {};
    },[]);

  return (
    <>
    
    <Navbar userInfo={userInfo}/>
    <Outlet />
    {/* <Footer /> */}
    </>
  )
}

export default Layout