import React from 'react'
import Title from '../components/ChatComponents/Title'
import { Button, ButtonBase } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import TopBar from '../components/ChatComponents/TopBar';
import ChatBar from '../components/ChatComponents/ChatBar';
export default function HomeChat() {
  return (
    <div className='grid w-[80vw] grid-rows-[1fr,7fr] grid-cols-[3.5fr,7fr] '>
    <TopBar></TopBar>
    <div>2</div>
    <div>
    <ChatBar></ChatBar>
    </div>
    <div className='bg-[#F6F8FC]'>4</div> 
    </div>
  )
}
