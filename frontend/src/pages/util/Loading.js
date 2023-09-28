import React from 'react'
import { Skeleton } from '@mui/material'
export default function Loading() {
  return (
    <div className='w-[100%]  border-[#acacac] flex flex-col items-center'>
        <Skeleton className='w-[90%]' height={85}  />
        <Skeleton className='w-[90%]' height={85}  />
        <Skeleton className='w-[90%]' height={85}  />
        <Skeleton className='w-[90%]' height={85}  />
        <Skeleton className='w-[90%]' height={85}  />
    </div>
  )
}
