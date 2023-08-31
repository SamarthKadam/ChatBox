import React from 'react'
export default function Input({text}) {

  return (
    <div className='mt-3 '>
          <div className='font-poppiins font-medium mb-2 text-[#BFBFBF] '>{text}</div>
          <input className='outline-0 border-[1px] rounded-md w-[100%] px-2 py-3  font-poppins border-[#BFBFBF]'></input>
        </div>
  )
}
