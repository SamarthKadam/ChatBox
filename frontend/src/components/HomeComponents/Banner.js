import React from 'react'
import microsoft from '../../assets/images/microsoft.svg'


export default function Banner() {
  return (
    <a href='#' className="cursor-pointer max-[1127px]:hidden">
    <div className='flex flex-row bg-black border-[0.2px] border-[#CFCFCF] rounded-md px-2 py-1 mt-6'>
       <img className='w-16' src={microsoft}></img> 
       <div className='flex flex-col text-white justify-center font-Roboto ml-2'>
        <div className='text-[10px] font-light'>Download on the</div>
        <div className='text-xl font-bold'>Windows OS</div>
       </div>
    </div>
    </a>
  )
}
