import React from 'react'
import { MotionAnimate } from 'react-motion-animate'

export default function Chat({message,isMale}) {

  return (
    <MotionAnimate animation="fadeInUp">
       {isMale&&<div className='bg-[#FFAF3A] rounded-t-[20px] rounded-br-[20px] px-4 py-3 my-5 text-black font-Roboto font-bold'>{message}</div>}
       {!isMale&&<div className='bg-[#FFFFFF] rounded-t-[20px] rounded-bl-[20px] px-4 py-3 my-5 text-black font-Roboto font-bold'>{message}</div>}
    </MotionAnimate>
  )
}
