import React from 'react'
import logo from '../assets/images/send-mail.png'
import Title from '../components/ChatComponents/Title'
import Menu from '../components/RootComponents/Menu'
import { Outlet } from 'react-router-dom';
import UserCard from '../components/RootComponents/UserCard';
export default function Root() {


  return (
    <div className='h-[100vh] flex flex-row'>
    <div className='h-[100vh] w-[20vw] grid grid-rows-[1fr,6fr,0.8fr]'>
    <div className=" flex  flex-row  items-center border-[1px] border-[#f5f5f5]">
      <div className='flex flex-row ml-[15%]  items-center'>
     <img className="h-8 mr-1" src={logo}></img> <Title title='ChatBox'></Title>
      </div>
    </div>
    <div className='border-[1px] border-[#f5f5f5]'><Menu></Menu></div>
    <div className='border-[1px] border-[#f5f5f5] flex item-center'>
      <UserCard></UserCard>
    </div>
    </div>
    <Outlet></Outlet>
    </div>
  )
}
