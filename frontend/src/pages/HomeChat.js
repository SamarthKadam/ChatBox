import React from 'react'
import TopBar from '../components/ChatComponents/TopBar';
import ChatBar from '../components/ChatComponents/ChatBar';
import ChatTitle from '../components/ChatComponents/ChatTitle';
import ChatMessages from '../components/ChatComponents/ChatMessages';
import Type from '../components/ChatComponents/Type';
import { useSelector } from 'react-redux';
export default function HomeChat() {

  const state=useSelector((state)=>state.chat.AllChats)
  console.log(state);


  return (
    <div className='grid w-[80vw] relative grid-rows-[1fr,7fr] grid-cols-[3.5fr,7fr] '>
    <TopBar></TopBar>
    <div className='flex flex-row items-center  border-[1px] border-[#f5f5f5]'><ChatTitle></ChatTitle></div>
    <div className=' border-[1px] border-[#f5f5f5]'>
    {state.map((data,index)=>{
      return   <ChatBar data={data} key={index}></ChatBar>
    })}
    </div>
    <div className='bg-[#F6F8FC] flex flex-col relative'>
      <ChatMessages></ChatMessages>
      <Type></Type>
      </div> 
    </div>
  )
}