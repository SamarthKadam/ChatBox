import React from 'react'
import RecieverMessage from './RecieverMessage'
import SenderMessage from './SenderMessage'
export default function ChatMessages() {
  return (
    <div className='w-[100%] h-[88%] px-[3%] py-[2%] box-border flex flex-col'>
        <RecieverMessage></RecieverMessage>
        <SenderMessage></SenderMessage>
        <RecieverMessage></RecieverMessage>
        <RecieverMessage same={true}></RecieverMessage>
    </div>
  )
}
