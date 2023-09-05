import React from 'react'
import { Avatar } from '@mui/material'
import image from '../../assets/images/user-img.jpg'
export default function UserCard() {
  return (
    <div className='flex flex-row items-center ml-[10%]'>
        <Avatar alt="User-pic" sx={{width:48,height:48}} src={image} />
        <div className='flex flex-col ml-2'>
            <div className='font-bold font-Roboto text-sm'>Mark ZukerBerg</div>
            <div className="text-xs cursor-pointer text-[#979797]">Logout</div>
        </div>
    </div>
  )
}
