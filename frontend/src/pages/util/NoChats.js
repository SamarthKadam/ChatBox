import React from 'react'
import img from '../../assets/images/search.png'
import { useNavigate } from 'react-router-dom'

export default function NoChats() {

const navigate=useNavigate();

  return (
    <div className='flex flex-col justify-center h-[100%] items-center'>
        <img className='h-52' src={img}></img>
        <div className='font-Poppins tracking-tighter text-[#2A0E59]'>Your friend list is empty</div>
        <button onClick={()=>{navigate('/home/search')}} className='bg-[#0147FF] text-white px-5 py-1 rounded mt-4'>Search Friends</button>
    </div>
  )
}
