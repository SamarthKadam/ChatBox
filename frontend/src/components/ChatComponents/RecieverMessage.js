import React from 'react'
import { Avatar } from '@mui/material'
import { isSameUser } from '../../helper/Reusable'
import Tooltip from '@mui/material/Tooltip';

export default function RecieverMessage({img,content,messages,index,name,isGroupChat}) {

  if(isSameUser(messages,index)&&isGroupChat)
  {
    return (<div className='flex flex-row justify-start my-1'>
   <div className='bg-[#FFFFFF]  rounded-tr-xl ml-[45px] font-Roboto rounded-br-xl rounded-bl-xl box-border px-2 py-2'>{content}</div>
  </div>)
  }


  return (
    <div className='w-[60%]'>
    <div className='flex flex-row justify-start my-1'>
      {isGroupChat&&(
      <Tooltip title={name} arrow placement="top-start">
     <Avatar referrerPolicy="no-referrer" src={img}></Avatar>
      </Tooltip>)}
     <div className='bg-[#FFFFFF]  rounded-tr-xl ml-[1%] font-Roboto rounded-br-xl rounded-bl-xl box-border px-2 py-2'>{content}</div>
    </div>
    </div>
  )
}
