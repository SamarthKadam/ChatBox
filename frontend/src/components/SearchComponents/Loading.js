import React from 'react'
import { Skeleton } from '@mui/material'
export default function Loading() {
  return (
    <div className='dark:bg-gray-700 dark:text-white w-[60%] border-[#acacac] flex flex-col'>
        <Skeleton height={75}  />
        <Skeleton height={75} />
        <Skeleton height={75} />
    </div>
  )
}
