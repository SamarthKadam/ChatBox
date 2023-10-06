import React from 'react'

export default function SenderMessage({content}) {

  return (
    <div className='flex flex-row justify-end my-1'>
      <div className='bg-[#014DFE] rounded-tl-xl font-Roboto rounded-bl-xl rounded-br-xl rouned-bl-xl text-white box-border px-2 py-2 mr-2'>{content}</div>
    </div>
  )
}
