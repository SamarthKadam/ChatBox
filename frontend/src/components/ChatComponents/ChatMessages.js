import React, { useEffect } from 'react'
import RecieverMessage from './RecieverMessage'
import SenderMessage from './SenderMessage'
import { useSelector } from 'react-redux';
import Advertisement from './Advertisement';

export default function ChatMessages() {

  const isSet=useSelector((state)=>state.chat.activeChat);

  if(isSet===null)
  return <Advertisement></Advertisement>

  return (
    <div className='w-[100%] h-[88%] px-[3%] py-[2%] box-border flex flex-col'>
        <RecieverMessage></RecieverMessage>
        <SenderMessage></SenderMessage>
        <RecieverMessage></RecieverMessage>
        <RecieverMessage same={true}></RecieverMessage>
    </div>
  )
}
