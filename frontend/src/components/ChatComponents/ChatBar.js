import React from 'react'
import { Avatar } from '@mui/material'
import image from '../../assets/images/user-img.jpg'
import Badge from '../ChatComponents/util/Badge'
import { getSender } from '../../utils/Reusable'
import { useSelector } from 'react-redux'

export default function ChatBar({data,select}) {

  const val=useSelector((state)=>state.chat.activeChat);
  const isGroupChat=data.isGroupChat;
  let user;
  if(isGroupChat)
  {
    user={name:data.chatName}
  }
  else{
    user=getSender(data.users);
  }

  return (
    <div style={{backgroundColor:val&&val._id===data._id?'#F3F4F6':null}} onClick={select.bind(this,data)} className='flex flex-row items-center justify-between rounded-md cursor-pointer mx-[2%] my-[5%] hover:bg-gray-100 px-[5%] py-[2%]'>
      <div className='flex flex-row items-center'>
    <Avatar alt="User-pic" referrerpolicy="no-referrer" sx={{width:48,height:48}} src={user.pic} />
    <div className='flex flex-col ml-2'>
        <div className='font-bold font-Roboto text-sm'>{user.name}</div>
        <div className="text-xs text-[#979797]">Hey how are you?</div>
    </div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='text-xs font-medium cursor-pointer text-[#979797]' >06:11 PM</div>
        <div className='mt-1'>
        <Badge>2</Badge>
        </div>
      </div>
</div>
  )
}
