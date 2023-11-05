import React from 'react'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export default function UserCard() {
  // const data=useSelector((state)=>state.user.userInfo)
  const data=JSON.parse(localStorage.getItem('info'));
  const navigate=useNavigate();

  const logoutHandler=()=>{
    localStorage.removeItem('jwt');
    navigate('/',{replace:true});
  }

  let image=data.pic;
  if(data.pic.startsWith('user'))
  image=`http://127.0.0.1:4000/${data.pic}`


  return (
    <div className='flex flex-row  items-center ml-[10%]'>
        <Avatar referrerPolicy="no-referrer" alt="User-pic" sx={{width:48,height:48}} src={image} />
        <div className='flex flex-col ml-2'>
            <div className='font-bold font-Roboto text-sm'>{data.name}</div>
            <div onClick={logoutHandler} className="text-xs cursor-pointer text-[#979797]">Logout</div>
        </div>
    </div>
  )
}
