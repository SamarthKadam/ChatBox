import React from 'react'
import { Avatar } from '@mui/material'
import image from '../../assets/images/user-img.jpg'
import { isSameUser } from '../../helper/Reusable'

export default function RecieverMessage({content,messages,index}) {

  if(isSameUser(messages,index))
  {
    return (<div className='flex flex-row justify-start my-1'>
   <div className='bg-[#FFFFFF] rounded-tr-xl ml-[45px] font-Roboto rounded-br-xl rounded-bl-xl box-border px-2 py-2'>{content}</div>
  </div>)
  }

  return (
    <div className='flex flex-row justify-start my-1'>
      <Avatar referrerPolicy="no-referrer" src={image}></Avatar>
     <div className='bg-[#FFFFFF] rounded-tr-xl ml-[1%] font-Roboto rounded-br-xl rounded-bl-xl box-border px-2 py-2'>{content}</div>
    </div>
  )
}
