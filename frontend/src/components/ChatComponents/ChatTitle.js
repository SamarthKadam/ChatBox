import React from 'react'
import image from '../../assets/images/groupimage.jpg'
import { Avatar } from '@mui/material'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

export default function ChatTitle() {
  return (
    <div className='flex flex-row px-[5%] box-border justify-between w-[100%]'>
        <div className='flex flex-row'>
        <Avatar alt="Group-pic" sx={{width:48,height:48}} src={image}></Avatar>
        <div className='flex flex-col ml-3'>
         <div className='text-xl font-Roboto font-semibold'>Odama studios</div>
         <div className="text-xs font-normal  text-[#30C730]">Mamy is typing...</div>
        </div>
        </div>
        <div>
            <MoreHorizOutlinedIcon style={{cursor:"pointer"}} color="action" ></MoreHorizOutlinedIcon>
        </div>
    </div>
  )
}
