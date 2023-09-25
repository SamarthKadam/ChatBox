import React from 'react'
import { Avatar } from '@mui/material'
import image from '../../assets/images/user-img.jpg'

export default function SenderMessage() {
  return (
    <div className='flex flex-row justify-end my-1'>
      <div className='bg-[#014DFE] rounded-tl-xl font-Roboto rounded-bl-xl rounded-br-xl rouned-bl-xl text-white box-border px-2 py-2 mr-2'>Hello Sharel how are you?</div>
      <Avatar referrerpolicy="no-referrer" src={image}></Avatar>
    </div>
  )
}
