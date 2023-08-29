import React from 'react'
import {BsCheckCircleFill} from 'react-icons/bs'

export default function Card({title,description}) {
  return (
    <div className='flex flex-row gap-2 w-[80%]'>
        <div className='mt-1'><BsCheckCircleFill color='#56D12C' fontSize={22}></BsCheckCircleFill></div>
        <div>
        <div className="font-Roboto font-semibold text-xl">{title}</div>
        <div className='mt-[2%] font-Roboto text-lg'>{description}</div>
        </div>
    </div>
  )
}
