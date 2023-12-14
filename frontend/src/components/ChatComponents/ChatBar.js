import React from 'react'
import { Avatar } from '@mui/material'
import Badge from '../ChatComponents/util/Badge'
import { getSender } from '../../helper/Reusable'
import { useSelector } from 'react-redux'
import groupLogo from '../../assets/images/group.png'

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

  const latestMessage=data.latestMessage?data.latestMessage.content.slice(0,35):'';
  let isExcedding=false;
  if(data.latestMessage&&data.latestMessage.content.length>35)
    isExcedding=true;

  
    const dateObject = new Date(data.updatedAt);


  return (
    <div style={{backgroundColor:val&&val._id===data._id?'#F3F4F6':null}} onClick={select.bind(this,data)} className=' flex flex-row items-center justify-between rounded-md cursor-pointer mx-[2%] my-[5%] hover:bg-gray-100 px-[5%] py-[2%]'>
      <div className='flex flex-row items-center'>
    <Avatar  alt="User-pic" referrerPolicy="no-referrer"
     style={{
      width: '48px', // Default width
      height: '48px', // Default height
    }} 
    src={isGroupChat?groupLogo:(user.pic.startsWith('user')?`${process.env.REACT_APP_API_URL}/${user.pic}`:user.pic)} />
    <div className='flex flex-col ml-2'>
        <div className='font-bold font-Roboto text-sm'>{user.name}</div>
        <div className="text-xs text-[#979797]">{latestMessage}{isExcedding?'.....':''}</div>
    </div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='text-xs max-[800px]:hidden font-medium cursor-pointer text-[#979797]' >{`${String(dateObject.getHours()%12).padStart(2,'0')}:${String(dateObject.getMinutes()).padStart(2,'0')} ${dateObject.getHours()>=12?'PM':'AM'}`}</div>
        <div className='mt-1'>
        {data.notify&&<Badge>1</Badge>}
        </div>
      </div>
</div>
  )
}
