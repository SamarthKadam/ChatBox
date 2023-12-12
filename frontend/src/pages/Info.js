import React from 'react'

export default function Info() {
  return (
    <div className="grid w-[80vw] relative grid-rows-[1fr,7fr] ">
    <div className="border-[1px] border-[#f5f5f5]"></div>
    <div className="border-[1px] border-[#f5f5f5]">
    <div className="px-[5%] py-[2%]">
          <div className="font-Poppins max-[1024px]:text-xl font-semibold text-2xl">
            About
          </div>
          <div className='mt-[2%] flex flex-col gap-4'>
          <div className=' flex flex-col'>
            <div className="font-Poppins max-[1024px]:text-sm font-bold">
              Build Version
            </div>
            <div className='text-[#9AA3A6] max-[1024px]:text-sm font-Poppins'>
              v1.0.0
            </div>
          </div>
          <div className='w-[50%]'>
          <div className="font-Poppins max-[1024px]:text-sm font-bold">
              Privacy Policy
            </div>
            <div className='text-[#9AA3A6] font-Poppins max-[1024px]:text-sm'>
            We collect minimal user data for app functionality, prioritize security, do not sell personal information, and users have rights to access, update, or delete their data.
            </div>
          </div>
          <div className='w-[50%]'>
          <div className="font-Poppins max-[1024px]:text-sm font-bold">
            Contact
            </div>
            <div className='text-[#9AA3A6] font-Poppins'>
             <div className='max-[1024px]:text-sm'>
              P: +91 9483933877
              </div> 
              <div className='max-[1024px]:text-sm'>
              E: samarthskadam14@gmail.com
              </div>
            </div>
          </div>
          </div>
        </div>
    </div>
  </div>
  )
}
