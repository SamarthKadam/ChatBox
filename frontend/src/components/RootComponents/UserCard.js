import React from 'react'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function UserCard() {
  // const data=useSelector((state)=>state.user.userInfo)
  const data=JSON.parse(localStorage.getItem('info'));
  const navigate=useNavigate();

  const logoutHandler=()=>{
    console.log("this is clicked");
    localStorage.removeItem('jwt');
    navigate('/');
  }


  return (
    <div className='flex flex-row  items-center ml-[10%]'>
        <Avatar alt="User-pic" sx={{width:48,height:48}} src={data.pic} />
        <div className='flex flex-col ml-2'>
            <div className='font-bold font-Roboto text-sm'>{data.name}</div>
            <div onClick={logoutHandler} className="text-xs cursor-pointer text-[#979797]">Logout</div>
        </div>
    </div>
  )
}
