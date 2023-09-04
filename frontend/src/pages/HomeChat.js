import React from 'react'
import logo from '../assets/images/send-mail.png'
import Title from '../components/ChatComponents/Title'
import Menu from '../components/ChatComponents/Menu'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import IconBack from '../components/ChatComponents/IconBack';
export default function HomeChat() {

  return (
    <div className='h-[100vh] grid border-solid-[2px] grid-cols-[1fr,1.7fr,2.7fr] grid-rows-[1fr,6fr]'>
      <div className="bg-white flex flex-row justify-center items-center border-[1px] border-[#f5f5f5]">
       <img className="h-7 mr-1" src={logo}></img> <Title title='ChatBox'></Title>
      </div>
      <div className='bg-white border-[1px] border-[#F6F8FC] px-[5%] flex flex-row justify-between items-center'>
        <div className='text-3xl font-Roboto font-extrabold text-[#052BFF]'>Messages</div>
        <div className='flex flex-row'>
          <IconBack>
            <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
          </IconBack>
          <IconBack>
          <SearchOutlinedIcon></SearchOutlinedIcon>
          </IconBack>
        </div>
      </div>
      <div className='bg-white border-[1px] border-[#f5f5f5]'>3</div>
      <div className='bg-white border-[1px] border-[#f5f5f5] px-[5%]'>
        <Menu></Menu>
      </div>
      <div className='bg-white border-[1px] border-[#f5f5f5]'>5</div>
      <div className='bg-white border-[1px] border-[#f5f5f5]'>6</div>
    </div>
  )
}
