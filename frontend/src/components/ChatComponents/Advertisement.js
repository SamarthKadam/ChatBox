import React from 'react'
import img from '../../assets/images/laptop.png'
import logo from '../../assets/images/send-mail.png'

export default function Advertisement() {
  return (
    <div className='h-[100%] w-[100%] flex flex-col justify-center items-center'>
      <div className='relative'>
      <img alt='laptop' className='h-64 max-[1250px]:h-60' src={img}></img>
      <img alt='advertisment' className='h-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' src={logo}></img>
      </div>
      <div className='text-3xl font-semibold max-[1250px]:text-2xl font-Roboto tracking-normal'>Download ChatBox for Windows</div>
      <div className='w-[50%] mt-4 text-center text-[#8696A0] font-Poppins text-sm'>Experience lightning-fast messaging on your Windows device with our app.</div>
      <a href='#' className="px-4 py-2 max-[1250px]:px-3 max-[1250px]:py-1 bg-[#5080FE] mt-4 text-white rounded-3xl transition hover:bg-[#0147FF] cursor-pointer">Get the app</a>
    </div>
  )
}
