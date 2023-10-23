import React from 'react'
import Profile from '../components/SettingsComponents/Profile'
import InputName from '../components/SettingsComponents/InputName'
import InputEmail from '../components/SettingsComponents/InputEmail'
export default function Settings() {
  return (
    <div className="grid w-[80vw] relative grid-rows-[1fr,7fr] ">
      <div className="border-[1px] border-[#f5f5f5]"></div>
      <div className="border-[1px] border-[#f5f5f5]">
        <div className="px-[5%] py-[2%]">
        <div className='font-Poppins font-semibold text-2xl'>Public profile</div>
        <Profile></Profile>
        <div className='mt-[3%] flex flex-col gap-8'>
          <InputName></InputName>
          <InputEmail></InputEmail>
        </div>
        <div className='flex flex-row mt-[2%] gap-2'>
          <div className=' bg-[#202142] text-white font-medium  cursor-pointer border-[#000000]  px-4 py-2 rounded-md font-Roboto tracking-tight'>Update</div>
          <div className=' bg-[#C6CED1] text-white font-medium  cursor-pointer border-[#000000]  px-4 py-2 rounded-md font-Roboto tracking-tight'>Reset</div>
        </div>
        </div>
      </div>
  </div>
  )
}
