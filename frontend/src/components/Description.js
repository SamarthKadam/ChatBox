import React from 'react'
import MenImage from '../assets/images/men.jpg'
import WomenImage from '../assets/images/women.jpg'
import design from '../assets/images/design.png'
import whiteball from '../assets/images/white-ball.png'
import orangeball from '../assets/images/orange-ball.png'

export default function Description() {
  return (
    <div className=' h-[85%] grid grid-cols-2'>
        <div className='flex flex-col justify-center '>
        <div className='text-white text-5xl font-semibold font-Poppins '>Chat easy,chat instantly wherever you go</div>
        <p className='mt-10 text-white text-lg font-semibold font-Roboto'>The easiest & fasted way to live chat</p>
        </div>
        <div className='relative'>
            <img alt='men pic' className="h-[40%] rounded-[20px] absolute top-[30%] z-50 translate-y-[-30%] " src={MenImage}></img>
            <img alt='women pic' className="h-[40%] rounded-[20px] absolute top-[84%] translate-y-[-84%] z-30 left-[95%]   translate-x-[-95%]" src={WomenImage}></img>
            <img alt='dots pic' className='h-[30%] absolute top-[84%] translate-y-[-84%] left-[25%] translate-x-[-25%] ' src={design}></img>
            <img alt='ball' className='absolute top-[10%] translate-y-[-10%] left-[25%] translate-x-[-25%]  ' src={whiteball}></img>
            <img alt='ball' className=' absolute top-[84%] translate-y-[-84%] left-[5%] translate-x-[-5%]' src={orangeball}></img>
            <img className=' absolute top-[15%] translate-y-[-15%] left-[95%] translate-x-[-95%]' src={orangeball}></img>
        </div>

    </div>
  )
}
