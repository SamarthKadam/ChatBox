import React from 'react'
import { Avatar } from '@mui/material'
import image from '../../assets/images/user-img.jpg'

export default function User() {
  return (
    <div className='flex flex-row box-border cursor-pointer items-center mt-2 hover:bg-gray-100 py-1 px-1'>
        <Avatar alt="User-pic" sx={{width:48,height:48}} src={image} />
        <div className='flex flex-col ml-2'>
            <div className='font-bold font-Roboto text-sm'>Mark ZukerBerg</div>
            <div className="text-xs  text-[#979797]">markzukerberg@gmail.com</div>
        </div>
    </div>
  )
}
