import React from 'react'

export default function Badge({children}) {
  return (
    <div className='bg-[#FF0000] text-white text-xs h-4 w-4 flex flex-row justify-center items-center rounded-full'>{children}</div>
  )
}
