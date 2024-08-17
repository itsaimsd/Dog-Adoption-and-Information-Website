import React from 'react'
import {useParams} from 'react-router-dom'
function User() {
    const {userid} = useParams()
  return (
    <div className='text-center bg-gray-900 bg-opacity-70 rouded mx-auto max-w-screen-xl py-2'>User: {userid}</div>
  )
}

export default User