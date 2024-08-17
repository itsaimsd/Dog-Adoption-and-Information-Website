import React, { useEffect, useState } from 'react'
import { getInitials } from '../../Utils/Helper'

function ProfileInfo({userInfo, onLogout}) {

  const[username,setUserName] = useState(null);

  useEffect(() => {
    if (userInfo) {
        setUserName(userInfo.fullname);
        // console.log(userInfo._id);
    }
  }, [userInfo]);

  return (
    <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center rounded-full text-white bg-orange-700 p-2 w-10 h-10 text-xl font-medium font-serif'>
        {getInitials(username)}
        </div>

        <div>
            <p className='text-sm font-medium'></p>
            <button className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>

  )
}

export default ProfileInfo