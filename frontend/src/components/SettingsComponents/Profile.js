import React from 'react'
import { Avatar } from '@mui/material'

export default function Profile() {
    const data=JSON.parse(localStorage.getItem('info'));
  return (
    <div className='flex flex-row items-center  gap-10  mt-[2%]'>
        <Avatar referrerPolicy="no-referrer" alt="User-pic" sx={{width:150,height:150}} src={data.pic} />
        <div className='flex flex-col gap-5'>
            <div className="bg-[#202142] text-white cursor-pointer px-4 py-2 rounded-md font-Roboto tracking-tight">Change picture</div>
            <div className=" font-medium border-[1px] cursor-pointer border-[#000000]  px-4 py-2 rounded-md font-Roboto tracking-tight">Delete picture</div>
        </div>
    </div>
  )
}
