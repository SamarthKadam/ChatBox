import React from 'react'
import Title from '../ChatComponents/Title'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';

export default function TopBar({createGroup}) {
  const navigate=useNavigate('');

  const moveToSearchHandler=()=>{
    navigate('/home/search',{replace:true})
  }



  return (
    <div className='flex flex-row px-[5%] items-center justify-between box-border'><Title title='Messages'></Title>
    <div className='flex flex-row'>
    <div onClick={createGroup} className='cursor-pointer hover:bg-gray-200 h-10 w-10 bg-gray-100 flex flex-row items-center rounded-full justify-center'><GroupIcon color="action" /></div>
    <div onClick={moveToSearchHandler}  className='cursor-pointer hover:bg-gray-200 h-10 ml-2 w-10 bg-gray-100 flex flex-row items-center rounded-full justify-center'><SearchOutlinedIcon color="action" /></div>
    </div>
    </div> 
  )
}
