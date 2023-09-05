import React from 'react'
import Title from '../ChatComponents/Title'
import { Button, ButtonBase } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

export default function TopBar() {
  return (
    <div className='flex flex-row px-[5%] items-center justify-between box-border'><Title title='Messages'></Title>
    <div className='flex flex-row'>
    <div className='cursor-pointer hover:bg-gray-200 h-10 w-10 bg-gray-100 flex flex-row items-center rounded-full justify-center'><ModeEditOutlineOutlinedIcon color="action" /></div>
    <div className='cursor-pointer hover:bg-gray-200 h-10 ml-2 w-10 bg-gray-100 flex flex-row items-center rounded-full justify-center'><SearchOutlinedIcon color="action" /></div>
    </div>
    </div> 
  )
}
